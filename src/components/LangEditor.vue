<template>
  <div class="lang-editor">

    <div v-if="isDebug" class="editor-debug">
      <b-button
        type="is-light"
        @click="pullEditDatas()"
      >拉取 state</b-button>
      <b-button
        type="is-light"
        @click="pushEditDatas(true)"
      >推送 state</b-button>
    </div>

    <div
      ref="editorContent"
      class="editor-content"
      @click="handleClickContent($event)"
    >
      <template v-if="showLangItems">

        <div
          v-for="(langItem, langKey, langIndex) in editDatasPage"
          :key="langKey"
          :class="{
            'is-add': (!langItem[langCodeSrc] && langItem[langCodeEdit]),
            'is-del': (langItem[langCodeSrc] && !langItem[langCodeEdit]),
          }"
          class="lang-item"
        >
          <!-- key -->
          <div class="lang-key">
            <span class="info-label"></span>
            <span class="info-value">{{ langKey }}</span>
            <div class="item-actions">
              <b-tooltip
                label="复制到剪贴板"
                position="is-left"
                type="is-dark"
              >
                <b-icon
                  class="btn"
                  icon="content-copy"
                  @click.native="copyToClipboard(langIndex)"
                ></b-icon>
              </b-tooltip>
              <b-tooltip
                label="复制到编辑区"
                position="is-left"
                type="is-dark"
              >
                <b-icon
                  class="btn"
                  icon="content-duplicate"
                  @click.native="copyToEdit(langItem)"
                ></b-icon>
              </b-tooltip>
            </div>
          </div>
          <!-- 来源语言 -->
          <b-field :label="langNameSrc">
            <b-input
              v-model="langItem[langCodeSrc]"
              readonly
            ></b-input>
          </b-field>
          <!-- 编辑语言 -->
          <b-field :label="langNameEdit">
            <b-input
              v-model="langItem[langCodeEdit]"
              type="textarea"
              custom-class="is-info"
              :data-key="langKey"
              lazy
            ></b-input>
          </b-field>
        </div>

      </template>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

import langCodes from '@/assets/js/lang-codes';
import utils from '@/assets/js/utils';

export default {
  name: 'LangEditor',
  data() {
    return {

      /**
       * @description 本地的 langItemsEdit 数据
       * @type { import('@/types').LangItemList }
       */
      editDatas: null,

      /**
       * @description 本地的 langItemsEdit 数据（分页）
       * @type { import('@/types').LangItemList }
       */
      editDatasPage: null,

      /** 当前编辑项的 key */
      langKeyEditing: '',

      /** 最后一次推送编辑器数据的时间戳 */
      lastPushTimestamp: 0,

      /** 翻页防抖 */
      paginationDebounce: null,

    }
  },
  computed: {

    ...mapState([
      'isDebug',
      'langCodeSrc',
      'langCodeEdit',
      'langItemsEdit',
      'langItemsUpdates',
      'pageNum',
      'pageSize',
    ]),

    /** 编辑语言的名称 */
    langNameEdit(vm) {

      const code = vm.langCodeEdit;
      const label = langCodes[code]?.label;

      return (label ? `${code} [${label}]` : code);

    },

    /** 来源语言的名称 */
    langNameSrc(vm) {

      const code = vm.langCodeSrc;
      const label = langCodes[code]?.label;

      return (label ? `${code} [${label}]` : code);

    },

    showLangItems(vm) {
      const { langCodeSrc, langCodeEdit, editDatasPage } = vm;
      return (langCodeSrc && langCodeEdit && editDatasPage);
    },

  },
  watch: {

    /** 自动更新本地的编辑数据 */
    langItemsUpdates: {
      handler() {
        console.log('[更新] langItemsUpdates');
        this.pullEditDatas();
      },
    },

    /** 自动获取对应页数的内容 */
    pageNum: {
      handler() {
        console.log('[更新] pageNum');
        this.getPageDatas();
      },
    },

    /** 自动获取对应页数的内容 */
    pageSize: {
      handler() {
        console.log('[更新] pageSize');
        this.getPageDatas();
      },
    },

  },
  methods: {

    /**
     * @description 复制“来源语言”文本到剪贴板
     * @param {number} index 当前元素的下标
     */
    copyToClipboard(index = 0) {

      /** @type {HTMLDivElement} */
      const editorContent = this.$refs['editorContent'];

      if (!editorContent) {
        console.error('复制失败，编辑区元素不存在！');
        return;
      }

      const inputs = editorContent.querySelectorAll('.lang-item input');
      const el = inputs[index];

      if (el) {
        el.focus();
        el.select();
        document.execCommand('copy');
      } else {
        console.error('复制失败，找不到对应的输入框元素元素！');
      }

    },

    /**
     * @description 复制“来源语言”到“编辑语言”
     * @param { import('@/types').LangItem } langItem
     */
    copyToEdit(langItem = {}) {
      const { langCodeEdit, langCodeSrc } = this;
      const editStr = langItem[langCodeEdit];

      langItem[langCodeEdit] = (langItem[langCodeSrc] || '');

      // 若复制前不存在编辑字符串，则强制刷新
      if (typeof editStr !== 'string') {
        this.$forceUpdate();
      }
    },

    /** 获取当前分页的语言数据 */
    getPageDatas() {
      clearTimeout(this.paginationDebounce);
      this.paginationDebounce = setTimeout(() => {

        console.log('[更新] getPageDatas');

        const result = utils.objPagination({
          obj: this.editDatas,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        });

        if (result) {
          this.editDatasPage = result.obj;
          this.$store.commit('changeTotalSize', result.maxSize);
        }

      }, 200);
    },

    /**
     * @description 处理点击编辑器内容区域
     * @param {PointerEvent} ev 点击事件对象
     */
    handleClickContent(ev) {

      /** @type {HTMLElement} */
      const el = ev.target;
      const key = el.dataset.key;

      // 更新 key
      this.langKeyEditing = (typeof key === 'string' ? key : '');
      // 推送数据
      this.pushEditDatas();

    },

    /** 拉取 state 中的编辑数据到本地 */
    pullEditDatas() {
      this.editDatas = JSON.parse(JSON.stringify(this.langItemsEdit));
      this.getPageDatas();
    },

    /** 推送本地的编辑数据到 state */
    pushEditDatas(isForce = false) {

      const { editDatas } = this;

      // 没有数据，取消推送
      if (!editDatas) {
        return;
      }

      const lastTS = this.lastPushTimestamp;
      const currTS = new Date().getTime();
      const minOffset = (10000);

      if (isForce || (currTS - lastTS >= minOffset)) {
        // 可以推送
        console.log('[更新] 推送编辑器数据到 state');
      } else {
        // 未达到最小间隔，取消推送
        return;
      }

      const datas = JSON.parse(JSON.stringify(editDatas));

      this.$store.commit('syncLangItems', datas);
      this.lastPushTimestamp = currTS;

    },

    /**
     * @description 对选中的文本进行 Unicode 转换操作
     * @param {'decode'|'encode'} type
     */
    unicodeConvert(type) {

      if (typeof window.getSelection === 'undefined') {
        utils.toast({
          duration: 3000,
          message: '操作失败，当前浏览器不支持 getSelection()。',
          type: 'is-warning',
        });
        return;
      }

      const {
        editDatas,
        langCodeEdit,
        langKeyEditing,
      } = this;

      const selStr = String(window.getSelection());

      if (!(langKeyEditing && selStr)) {
        utils.toast({
          duration: 3000,
          message: '请先选中编辑文本。',
          type: 'is-warning',
        });
        return;
      }

      const langItem = editDatas[langKeyEditing];
      const strBefore = langItem[langCodeEdit];

      if (type === 'decode') {

        const decoded = utils.uniDecode(selStr);
        const strAfter = strBefore.replace(selStr, decoded);

        langItem[langCodeEdit] = strAfter;

      } else if (type === 'encode') {

        const encoded = utils.uniEncode(selStr);
        const strAfter = strBefore.replace(selStr, encoded);

        langItem[langCodeEdit] = strAfter;

      } else {
        console.error('操作失败，该 type 不存在。');
      }

    },

  },
}
</script>

<style lang="less" scoped>
.lang-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 1rem;
  width: 100%;
  background-color: #FFF;

  > div {
    width: 100%;
    max-width: var(--max-width);
  }
}

.editor-debug {
  padding: 1rem 0;
}

.editor-content {
  flex-grow: 1;
  height: 0;
  overflow-y: auto;
}

.lang-item {
  padding: 0.5rem;
  padding-left: 1rem;
  border-bottom: 0.0625rem solid #DDD;
  border-left: 0.25rem solid #DDD;

  &:first-child {
    border-top: 0.0625rem solid #DDD;
  }

  &.is-add {
    border-left-color: #2196F3;
  }

  &.is-del {
    border-left-color: #F44336;
  }

  > div {
    margin: 0.5rem 0;
  }

  /deep/ .textarea {
    height: 3em;
    min-height: 3em !important;
  }
}

.lang-key {
  display: flex;
  align-items: center;
  font-family: monospace;
  user-select: text;

  .info-label {
    flex-shrink: 0;
    width: 0.25em;
    height: 1.25em;
    background-color: #167DF0;
  }

  .info-value {
    flex-grow: 1;
    margin: 0 0.5em;
    word-break: break-all;
    color: #167DF0;
  }

  .item-actions {
    flex-shrink: 0;
  }

  .btn {
    margin: 0 0.25em;
    cursor: pointer;
  }
}
</style>
