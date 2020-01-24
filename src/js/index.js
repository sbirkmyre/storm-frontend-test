import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import App from '../components/App.vue';
import '../css/index.scss';

Vue.use(BootstrapVue);

new Vue({
  render: (createEl) => createEl(App)
}).$mount('#app');
