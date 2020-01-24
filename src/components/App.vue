<template>
  <div class="app" role="application">
    <my-header ref="header" @addtaskformtoggled="addTaskFormToggled"></my-header>
    <div class="main" role="main" tabindex="0" aria-label="Application main">
      <add-task-form
        ref="addTaskForm"
        v-if="this.view === 'add-task'"
        @addtaskformtoggled="addTaskFormToggled"
        @updatetasklist="updateTaskList"
      ></add-task-form>
      <b-alert
        fade
        :show="alert.dismissCountDown"
        @dismissed="alert.dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        variant="success"
      >{{ alert.message }}</b-alert>
      <div class="spinner-container" role="content">
        <task-list v-if="!loading" :tasks="tasks" @updatetasklist="updateTaskList"></task-list>
        <b-spinner v-else label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "./MyHeader.vue";
  import AddTaskForm from "./AddTaskForm.vue";
  import TaskList from "./TaskList.vue";
  import axios from "axios";

  export default {
    name: "Main",
    components: {
      "my-header": MyHeader,
      "task-list": TaskList,
      "add-task-form": AddTaskForm
    },
    data() {
      return {
        alert: {
          message: "",
          dismissSecs: 5,
          dismissCountDown: 0
        },
        loading: false,
        tasks: {},
        view: "default"
      };
    },
    methods: {
      updateTaskList(message) {
        this.loading = true;
        this.alert.message = "";
        this.alert.dismissCountDown = 0;

        axios
          .get("http://localhost:4000/api/task")
          .then(response => {
            this.tasks = response.data;
            this.loading = false;
            this.alert.message = message;
            this.alert.dismissCountDown = 5;
          })
          .catch(error => {
            console.log("Error: " + error);
          });

          this.$nextTick(function() {
            this.$refs.header.$el.focus();
          });
      },
      addTaskFormToggled() {
        if (this.view === "default") {
          this.view = "add-task";
        } else {
          this.view = "default";
        }
      },
      countDownChanged(dismissCountDown) {
        this.alert.dismissCountDown = dismissCountDown;
      },
      showAlert() {
        this.alert.dismissCountDown = this.alert.dismissSecs;
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
  };
</script>
