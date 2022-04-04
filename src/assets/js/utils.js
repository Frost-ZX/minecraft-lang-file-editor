import { ToastProgrammatic as Toast } from 'buefy';

/**
 * @typedef ColorType
 * @type {'is-white'|'is-black'|'is-light'|'is-dark'|'is-primary'|'is-info'|'is-success'|'is-warning'|'is-danger'}
 */

class Utils {

  constructor() { }

  /**
   * @description 将 .lang 文件内容转换为 JSON
   * @param {string} content 文件文本内容
   */
  lang2json(content = null) {

    if (content === '') {
      return {};
    }

    if (typeof content !== 'string') {
      console.error('转换失败，参数格式错误！');
      return null;
    }

    const replaced = content.replace(/\r/g, '');
    const rows = replaced.split('\n');
    const result = {};

    rows.forEach((row) => {

      // 排除空行和注释
      if (!row || row.startsWith('#')) {
        return;
      }

      const kv = row.split('=');

      result[kv[0]] = (kv[1] || '');

    });

    return result;

  }

  /**
   * @description 分页获取对象数据
   * @param {object} options
   * @param {Object.<string, *>} options.obj
   * @param {number} [options.pageNum]
   * @param {number} [options.pageSize]
   */
  objPagination(options) {

    const {
      obj = null,
      pageNum = 1,
      pageSize = 20,
    } = options;

    const isValid = (
      obj && obj.constructor === Object &&
      typeof pageNum === 'number' &&
      typeof pageSize === 'number'
    );

    if (!isValid) {
      console.error('获取数据失败，参数格式错误！');
      return null;
    }

    // 起始下标
    const startIndex = (pageNum - 1) * pageSize;
    // 结束下标（需要 +1）
    const endIndex = startIndex + pageSize;

    const allKeys = Object.keys(obj);
    const useKeys = allKeys.slice(startIndex, endIndex);
    const maxSize = allKeys.length;
    const currSize = useKeys.length;

    const newObj = {};

    useKeys.forEach((key) => {
      newObj[key] = obj[key];
    });

    return {
      obj: newObj,
      maxPage: Math.ceil(maxSize / pageSize),
      currPage: pageNum,
      startPos: startIndex + 1,
      endPos: endIndex,
      maxSize,
      currSize,
    };

  }

  /**
   * @typedef {object} ReadFileTextReturnItem
   * @property {string} name 文件名
   * @property {string} content 文件内容
   */

  /**
   * @description 以文本方式读取文件（异步）
   * @param {Event} ev 输入框 change 事件对象
   * @param {boolean} resetValue 是否自动重置输入框 value 属性
   * @returns {Promise<ReadFileTextReturnItem[]>}
   */
  readFileAsText(ev, resetValue) {
    const blank = [];

    /** @type {HTMLInputElement} */
    const el = ev.currentTarget;

    /** @type {FileList} */
    const files = el.files;

    if (!files || files.length === 0) {
      return Promise.resolve(blank);
    }

    const fnProc = (procResolve, procReject) => {
      const reads = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const fnRead = (readResolve, readReject) => {
          // 成功
          reader.onload = () => {
            readResolve({
              name: (file.name || 'unknown'),
              content: reader.result,
            });
          };
          // 失败
          reader.onerror = () => {
            readReject({
              name: (file.name || 'unknown'),
              content: null,
            });
          };
          // 读取
          reader.readAsText(file);
        };

        reads.push(new Promise(fnRead));
      }

      Promise.all(reads).then((res) => {
        // [成功]
        procResolve(res);
        resetValue && (el['value'] = '');
      }).catch(() => {
        // [失败]
        procReject(blank);
      });
    };

    return new Promise(fnProc);
  }


  /**
   * @description Toast
   * @param {object} options
   * @param {number} [options.duration] 时长（毫秒）
   * @param {boolean} [options.indefinite] 无限时长
   * @param {string} options.message 消息内容
   * @param {ColorType} [options.type] 消息类型
   */
  toast(options) {
    const {
      duration = 2000,
      indefinite = false,
      message = '',
      type = 'is-info',
    } = options;

    return Toast.open({
      duration,
      indefinite,
      message,
      pauseOnHover: true,
      type,
    });
  }

  /**
   * @description Unicode（\u 开头）转字符串
   * @param {string} codes 需要转换的 Unicode 编码字符串
   * @returns {string} 转换结果
   */
  uniDecode(codes = '') {

    if (typeof codes !== 'string') {
      console.error('转换失败，参数数据类型错误！');
      return null;
    }

    if (codes === '') {
      return '';
    }

    const reg = new RegExp('\\\\u', 'g');
    const converted = codes.replace(reg, '%u');

    try {
      return unescape(converted);
    } catch (error) {
      console.error('转换失败', error);
      return null;
    }

  }

  /**
   * @description 字符串转 Unicode（\u 开头）
   * @param {string} str 需要转换的字符串
   * @returns {string} 转换结果
   */
  uniEncode(str = '') {

    if (typeof str !== 'string') {
      console.error('转换失败，参数数据类型错误！');
      return null;
    }

    if (str === '') {
      return '';
    }

    const codes = [];

    for (let i = 0; i < str.length; i++) {
      codes.push((str.charCodeAt(i).toString(16).padStart(4, '0')));
    }

    return ('\\u' + codes.join('\\u'));

  }

}

const utils = new Utils();

export default utils;
