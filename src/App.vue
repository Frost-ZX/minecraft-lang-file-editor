<template>
  <div id="app">

    <lang-actions
      position="top"
      @unicode-convert="handleUnicodeConvert"
    />

    <lang-editor ref="langEditor" />

    <lang-actions position="bottom" />

  </div>
</template>

<script>
import LangActions from '@/components/LangActions.vue';
import LangEditor from '@/components/LangEditor.vue';

export default {
  name: 'App',
  components: {
    LangActions,
    LangEditor,
  },
  data() {
    return {

    }
  },
  methods: {

    /** 事件处理 */
    handleUnicodeConvert(type = '') {

      const el = this.$refs['langEditor'];
      const fnName = 'unicodeConvert';

      if (el && el[fnName]) {
        el[fnName](type);
      } else {
        console.error('处理失败，元素或函数不存在！');
      }

    },

  },
}
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
}

.lang-actions {
  flex-shrink: 0;
}

.lang-editor {
  flex-grow: 1;
  height: 0;
}
</style>
