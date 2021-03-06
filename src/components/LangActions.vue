<template>
  <div class="lang-actions">
    <div class="wrapper">
      <!-- 顶部操作栏 -->
      <template v-if="position === 'top'">

        <b-button
          type="is-info"
          @click="selectFile()"
        >添加文件</b-button>
        <input
          ref="inputFile"
          type="file"
          class="input-file"
          accept=".json,.lang"
          @change="getLangFile($event)"
        />

        <b-button
          type="is-success"
          :disabled="!isSetLangCode"
          @click="exportFile()"
        >保存文件</b-button>

        <b-button
          type="is-danger"
          @click="resetData()"
        >重置数据</b-button>

        <b-tooltip
          label="保存格式"
          position="is-left"
          type="is-dark"
        >
          <b-select v-model="saveType" class="type-select">
            <option value="json">JSON</option>
            <option value="lang">LANG</option>
          </b-select>
        </b-tooltip>

        <div class="lang-select">

          <b-tooltip
            label="来源语言"
            position="is-left"
            type="is-dark"
          >
            <b-select v-model="langCodeSrc">
              <option value="">无</option>
              <option
                v-for="value in langCodes"
                :key="value"
                :value="value"
              >{{ value }}</option>
            </b-select>
          </b-tooltip>

          <b-tooltip
            label="编辑语言"
            position="is-left"
            type="is-dark"
          >
            <b-select v-model="langCodeEdit">
              <option value="">无</option>
              <option
                v-for="value in langCodes"
                :key="value"
                :value="value"
              >{{ value }}</option>
            </b-select>
          </b-tooltip>

          <b-tooltip
            class="lang-transfer"
            label="互换"
            position="is-left"
            type="is-dark"
          >
            <b-button
              type="is-info"
              icon-right="arrow-left-right"
              @click="transferLangCode()"
            />
          </b-tooltip>

        </div>

        <b-button
          type="is-light"
          @click="$emit('unicode-convert', 'encode')"
        >Unicode 编码</b-button>

        <b-button
          type="is-light"
          @click="$emit('unicode-convert', 'decode')"
        >Unicode 解码</b-button>

      </template>
      <!-- 顶部操作栏 -->
      <!-- 底部操作栏 -->
      <template v-else-if="position === 'bottom'">

        <b-pagination
          v-show="isSetLangCode"
          v-model="pageNum"
          :per-page="pageSize"
          :total="totalSize"
          :range-before="2"
          :range-after="2"
          :debounce-page-input="500"
          order="is-centered"
          page-input-position="is-input-right"
          page-input
        />

        <b-select v-model="pageSize">
          <option
            v-for="value in pageSizeList"
            :key="value"
            :value="value"
          >{{ value }} 条 / 页</option>
        </b-select>

      </template>
      <!-- 底部操作栏 -->

    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import { mapState } from 'vuex';

import JSON5 from 'json5';

import utils from '@/assets/js/utils';
import store from '@/store/index';

export default {
  name: 'LangActions',
  props: {

    /** 所在位置：top / bottom */
    position: {
      type: String,
      default: 'top'
    },

  },
  data() {
    return {

      pageSizeList: [
        10, 20, 30, 40, 50, 100, 200, 500, 1000,
      ],

      /** @type {'json'|'lang'} */
      saveType: 'json',

    }
  },
  computed: {

    ...mapState([
      'langCodes',
      'langItemsEdit',
      'totalSize',
    ]),

    /** 是否已选择 Language Code */
    isSetLangCode(vm) {
      return (vm.langCodeEdit && vm.langCodeSrc);
    },

    /** 来源的 Language Code */
    langCodeSrc: {
      get() {
        return store.state.langCodeSrc;
      },
      set(value) {
        store.commit('setLangCode', {
          type: 'src',
          code: value,
        });
      }
    },

    /** 编辑的 Language Code */
    langCodeEdit: {
      get() {
        return store.state.langCodeEdit;
      },
      set(value) {
        store.commit('setLangCode', {
          type: 'edit',
          code: value,
        });
      }
    },

    /** 当前页数 */
    pageNum: {
      get() {
        return store.state.pageNum;
      },
      set(value) {
        store.commit('changePageNum', value);
      }
    },

    /** 每页条数 */
    pageSize: {
      get() {
        return store.state.pageSize;
      },
      set(value) {
        store.commit('changePageSize', value);
      }
    },

  },
  methods: {

    /** 导出编辑的语言文件 */
    exportFile() {

      const {
        langCodeEdit,
        langItemsEdit,
        saveType,
      } = this;

      const datas = {};

      for (let key in langItemsEdit) {
        const str = langItemsEdit[key][langCodeEdit];
        str && (datas[key] = str);
      }

      try {
        if (saveType === 'json') {

          const content = JSON.stringify(datas, null, 4);
          const replaced = content.replace(/\\\\u/g, '\\u');
          const blob = new Blob([replaced], {
            type: 'application/json;charset=utf-8'
          });
          saveAs(blob, `${langCodeEdit}.json`);

        } else if (saveType == 'lang') {

          let content = '';
          for (let key in datas) {
            content += `${key}=${datas[key]}\n`;
          }
          const blob = new Blob([content], {
            type: 'text/plain;charset=utf-8'
          });
          saveAs(blob, `${langCodeEdit}.lang`);

        }
      } catch (error) {
        console.error('[保存失败]', error);
        utils.toast({
          duration: 3000,
          message: '保存失败！',
          type: 'is-danger',
        });
      }

    },

    /** 读取选择的文件 */
    getLangFile(ev) {
      utils.readFileAsText(ev, true).then((res) => {

        let data = res[0];

        if (!data) {
          return;
        }

        // 正则：匹配文件扩展名
        const extReg = new RegExp(/(\.json|\.lang)$/);

        // 正则：匹配 Unicode 编码前缀字符串
        const slashReg = new RegExp(/\\u/, 'g');

        const fileName = data.name.toLowerCase();
        const fileExtCheck = fileName.match(extReg);
        const fileExtStr = fileExtCheck?.[0];

        let langCode = '';
        let contentStr = null;
        let contentParsed = null;

        // 识别 Language Code
        try {
          langCode = fileName.replace(extReg, '');
        } catch (error) {
          console.warn('[Language Code 识别失败]', error);
        }

        // 检测文件扩展名
        if (!fileExtStr) {
          utils.toast({
            duration: 5000,
            message: '文件扩展名错误，应为 .json 或 .lang。',
            type: 'is-danger',
          });
          return;
        }

        // 转义 Unicode 编码
        try {
          contentStr = data.content.replace(slashReg, '\\\\u');
        } catch (error) {
          console.error('[转义]', error);
          utils.toast({
            duration: 5000,
            message: '转义 Unicode 编码失败！',
            type: 'is-danger',
          });
        }

        // 根据文件扩展名选择对应的解析方式
        if (fileExtStr === '.json') {

          // JSON
          try {
            contentParsed = JSON5.parse(contentStr);
          } catch (error) {
            const msg = (`JSON 解析失败（${String(error)}）`);
            utils.toast({
              duration: 5000,
              message: msg,
              type: 'is-danger',
            });
            return;
          }

        } else if (fileExtStr === '.lang') {

          // LANG
          contentParsed = utils.lang2json(contentStr);

          if (!contentParsed) {
            utils.toast({
              duration: 5000,
              message: 'LANG 文件解析失败！',
              type: 'is-danger',
            });
            return;
          }

        } else {
          console.error('解析方式匹配失败！');
          return;
        }

        const fnHandleRes = (res) => {
          utils.toast({
            duration: 3000,
            message: res.msg,
            type: (res.success ? 'is-success' : 'is-warning'),
          });
        };
        const fnAddItem = (value) => {
          this.$store.dispatch('addLangItem', {
            langCode: value,
            content: contentParsed,
          }).then(fnHandleRes);
        };

        this.$buefy.dialog.prompt({
          message: '当前文件的 Language Code',
          inputAttrs: {
            maxlength: 16,
            placeholder: '例：en_us、zh_cn',
            value: langCode,
          },
          onConfirm: fnAddItem,
        });

      });
    },

    /** 打开文件选择对话框 */
    selectFile() {
      const el = this.$refs['inputFile'];
      el && el.click();
    },

    /** 重置数据 */
    resetData() {

      const fnReset = () => {
        this.$store.commit('resetLangItems');
        utils.toast({
          message: '已重置',
          type: 'is-success',
        });
      };

      this.$buefy.dialog.confirm({
        // title: '',
        message: '确定要重置编辑器的数据吗？',
        onConfirm: fnReset,
      });

    },

    /** 互换“来源”和“编辑”的 Language Code */
    transferLangCode() {

      const { langCodeEdit, langCodeSrc } = this;

      store.commit('setLangCode', {
        type: 'edit',
        code: langCodeSrc,
      });

      store.commit('setLangCode', {
        type: 'src',
        code: langCodeEdit,
      });

    },

  },
}
</script>

<style lang="less" scoped>
.lang-actions {
  position: relative;
  z-index: 100;
  padding: 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}

.wrapper {
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0.5rem 0;
  width: 100%;
  max-width: var(--max-width);
  overflow-x: auto;

  > *:not(:first-child) {
    margin-left: 0.25rem;
  }
}

.input-file {
  display: none;
}

.type-select {
  width: 6rem;
}

.lang-select {
  display: flex;
  flex-shrink: 0;
  width: 18rem;

  > div {
    flex-grow: 1;
  }

  > div:not(:first-child) {
    margin-left: 0.25rem;
  }

  .lang-transfer {
    flex-grow: 0;
  }
}

.pagination {
  flex-grow: 1;
  margin: 0 !important;
  width: 0;
}
</style>
