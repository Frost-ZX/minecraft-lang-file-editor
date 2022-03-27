import Vue from 'vue';
import Vuex from 'vuex';

function getCurrMS() {
  return new Date().getTime();
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    /** @type {string[]} */
    langCodes: [],

    langCodeEdit: '',
    langCodeSrc: '',

    /** @type { import('@/types').LangItemList } */
    langItemsDefault: {},

    /** @type { import('@/types').LangItemList } */
    langItemsEdit: {},

    langItemsUpdates: getCurrMS(),

    pageNum: 1,
    pageSize: 20,
    totalSize: 0,

  },
  getters: {},
  mutations: {

    /**
     * @description 更改当前的页数
     * @param {number} [payload]
     */
    changePageNum(state, payload) {
      if (typeof payload === 'number') {
        state.pageNum = payload;
      } else {
        state.pageNum = 1;
      }
    },

    /**
     * @description 更改每页显示的条数
     * @param {null|number} [payload]
     */
    changePageSize(state, payload) {
      if (typeof payload === 'number') {
        state.pageSize = payload;
      } else {
        state.pageSize = 20;
      }
    },

    /**
     * @description 更新数据总条数
     * @param {number} [payload]
     */
    changeTotalSize(state, payload) {
      if (typeof payload === 'number') {
        state.totalSize = payload;
      } else {
        state.totalSize = 0;
      }
    },

    /** 重置语言文件数据 */
    resetLangItems(state) {
      state.langCodeEdit = '';
      state.langCodeSrc = '';
      state.langCodes = [];
      state.pageNum = 1;
      state.totalSize = 0;
      state.langItemsDefault = {};
      state.langItemsEdit = {};
      state.langItemsUpdates = getCurrMS();
    },

    /** 设置 Language Code */
    setLangCode(state, payload = {}) {

      const {
        type,
        code,
      } = payload;

      const isValid = (
        typeof type === 'string' &&
        typeof code === 'string'
      );

      if (!isValid) {
        console.error('设置失败，参数格式错误！');
        return false;
      }

      if (type === 'src') {
        state.langCodeSrc = code;
      } else if (type === 'edit') {
        state.langCodeEdit = code;
      } else {
        console.error('设置失败，type 不存在。');
        return false;
      }

      return true;

    },

    /** 同步编辑器语言文件数据到 state */
    syncLangItems(state, payload) {
      if (payload && payload.constructor === Object) {
        state.langItemsEdit = payload;
      } else {
        console.error('同步失败，参数格式错误！');
      }
    },

  },
  actions: {

    /**
     * @description 添加语言文件
     * @param {object} payload
     * @param {string} payload.langCode
     * @param {Object.<string, string>} payload.content
     */
    addLangItem(store, payload = {}) {

      const result = {
        success: false,
        msg: '',
      };

      const { state } = store;
      const { langCode, content } = payload;

      const isValid = (
        typeof langCode === 'string' &&
        typeof content !== 'undefined' &&
        content.constructor === Object
      );

      if (!isValid) {
        result.msg = '添加失败，参数格式错误！';
        return result;
      }

      const {
        langCodes,
        langItemsDefault,
        langItemsEdit,
      } = state;

      if (langCodes.includes(langCode)) {
        result.msg = '当前 Language Code 已存在，取消添加';
        return result;
      }

      for (let key in content) {
        const str = content[key];

        if (typeof str !== 'string') {
          result.msg = '文件内容格式错误，添加失败。';
          return result;
        }

        !langItemsDefault[key] && (langItemsDefault[key] = {});
        !langItemsEdit[key] && (langItemsEdit[key] = {});

        langItemsDefault[key][langCode] = str;
        langItemsEdit[key][langCode] = str;
      }

      // 记录 Language Code
      langCodes.push(langCode);

      // 触发更新
      state.langItemsUpdates = getCurrMS();

      result.success = true;
      result.msg = '添加成功';

      return result;

    },

  },
  modules: {}
});
