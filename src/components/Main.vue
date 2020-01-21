<template>
  <div class="app">
    <my-header @viewtoggled="viewtoggled"></my-header>
    <div class="main">
        <new-task-form
          v-if="(this.view === 'add-task')"
          @discardtask="discardtask"
          @updatetasklist="updatetasklist">
        </new-task-form>
        <b-alert
          :show="dismissCountDown"
          dismissible
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
          variant="success">{{ alertMessage }}</b-alert>
        <task-list :tasks="appData.tasks" @updatetasklist="updatetasklist"></task-list>
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
        alertMessage: '',
        alertVariant: '',
        dismissSecs: 5,
        dismissCountDown: 0,
        view: this.$root.view
      }
    },
    methods: {
      updatetasklist(message) {
        axios.get('http://localhost:4000/api/task')
          .then((response) => {
            this.appData.tasks = response.data;
            this.alertMessage = message;
            this.dismissCountDown = 5;
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
      discardtask() {
        if(this.view === "add-task") {
          this.view = "default";
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    },
    components: {
			'my-header': MyHeader,
			'task-list': TaskList,
			'new-task-form': NewTaskForm
		}
  };
</script>
