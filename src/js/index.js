import Vue from 'vue';
import Main from '../components/Main.vue';
import axios from 'axios';

new Vue({
  render: (createEl) => createEl(Main),
  data() {
    return {
      appData: {
        tasks: {}
      }
    }
  },
  created () {
    axios.get('http://localhost:4000/api/task')
      .then((response) => {
        this.appData.tasks = response.data;
        console.log('Data successfully loaded');
      })
      .catch((error) => {
        console.log('ERROR: Data load failed');
        console.log(error);
      });
    }
}).$mount('#app');
