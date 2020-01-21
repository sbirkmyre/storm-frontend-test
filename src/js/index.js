import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import Main from '../components/Main.vue';
import axios from 'axios';
import '../css/index.scss';

Vue.use(BootstrapVue);

new Vue({
  render: (createEl) => createEl(Main),
  data() {
    return {
      appData: {
        tasks: {}
      },
      view: "default"
    }
  },
  created () {
    axios.get('http://localhost:4000/api/task')
      .then((response) => {
        this.appData.tasks = response.data;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    }
}).$mount('#app');
