<template>
  <div class="app">
    <my-header @addtaskformtoggled="addtaskformtoggled"></my-header>
    <div class="main">
        <add-task-form
          v-if="(this.view === 'add-task')"
          @addtaskformtoggled="addtaskformtoggled"
          @updatetasklist="updatetasklist">
        </add-task-form>
        <b-alert
          fade
          :show="alert.dismissCountDown"
          @dismissed="alert.dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
          variant="success">{{ alert.message }}</b-alert>
          <div class="spinner-container">
            <task-list v-if="!($root.loading)" :tasks="$root.tasks"
              @updatetasklist="updatetasklist">
            </task-list>
            <b-spinner v-else
              label="Loading...">
            </b-spinner>
          </div>
    </div>
  </div>
</template>

<script>
	import MyHeader from './myHeader.vue';
	import AddTaskForm from './addTaskForm.vue'
	import TaskList from './taskList.vue';
  import axios from 'axios';

  export default {
    name: "Main",
		data() {
      return {
        alert: {
          message: '',
          dismissSecs: 5,
          dismissCountDown: 0
        },
        view: "default"
      }
    },
    methods: {
      updatetasklist(message) {
        this.$root.loading = true;
        this.alert.message = '';
        this.alert.dismissCountDown = 0;

        axios.get('http://localhost:4000/api/task')
          .then((response) => {
            this.$root.tasks = response.data;
            this.$root.loading = false;
            this.alert.message = message;
            this.alert.dismissCountDown = 5;
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },
      addtaskformtoggled() {
        if(this.view === "default") {
          this.view = "add-task";
        }
        else {
          this.view = "default";
        }
      },
      countDownChanged(dismissCountDown) {
        this.alert.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.alert.dismissCountDown = this.alert.dismissSecs
      }
    },
    components: {
			'my-header': MyHeader,
			'task-list': TaskList,
			'add-task-form': AddTaskForm
		}
  };
</script>
