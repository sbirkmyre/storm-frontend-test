<template>
  <div class="app">
    <my-header @viewtoggled="viewtoggled"></my-header>
    <div class="main">
        <new-task-form @canceladd="canceladd" @updatetasklist="updatetasklist" v-if="(this.view === 'add-task')"></new-task-form>
        <task-list :tasks="appData.tasks"></task-list>
    </div>
  </div>
</template>

<script>
	import MyHeader from './myHeader.vue';
	import NewTaskForm from './newTaskForm.vue'
	import TaskList from './taskList.vue';
  import axios from 'axios';

  export default {
    name: "Main",
		data() {
      return {
        appData: this.$root.appData,
        view: this.$root.view
      }
    },
    methods: {
      updatetasklist() {
        axios.get('http://localhost:4000/api/task')
          .then((response) => {
            this.appData.tasks = response.data;
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },
      viewtoggled() {
        if(this.view === "default") {
          this.view = "add-task";
        }
      },
      canceladd() {
        if(this.view === "add-task") {
          this.view = "default";
        }
      }
    },
    components: {
			'my-header': MyHeader,
			'task-list': TaskList,
			'new-task-form': NewTaskForm
		}
  };
</script>
