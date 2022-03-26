import Vue from 'vue';
import App from './App.vue';
import store from './store';

import Buefy from 'buefy';

import 'ress/ress.css';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/main.less';

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'mdi',
  defaultDialogConfirmText: '确定',
  defaultDialogCancelText: '取消',
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
