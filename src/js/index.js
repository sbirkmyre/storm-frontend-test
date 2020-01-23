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
      tasks: {},
      loading: false
    }
  },
  created () {
    this.loading = true;
    axios.get('http://localhost:4000/api/task')
      .then((response) => {
        this.tasks = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    }
}).$mount('#app');
