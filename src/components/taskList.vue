<template>
  <div class="task-list" tabindex="0" aria-label="Task list">
    <p v-if="(tasks.length === 0)">{{ noTasksMessage }}</p>
    <task
      v-else
      v-for="(task, id) in tasks"
      :key="id"
      :task="task"
      @taskisdonestatuschange="taskIsDoneStatusChange"
      @showdeletemodal="showDeleteModal"
    ></task>

    <b-modal id="delete-modal" centered v-model="modalShow">
      <template v-slot:modal-header="{ close }">
        <h2>Delete task?</h2>
        <b-button @click="close()" aria-label="Close delete task modal and return to the task">x</b-button>
      </template>

      <template v-slot:default="{ hide }" tabindex="0">
        <p>Would you like to delete this task?</p>
      </template>

      <template v-slot:modal-footer="{ cancel, remove }">
        <button type="button" @click="deleteTask">Delete task</button>
        <button
          type="button"
          @click="hideDeleteModal"
          aria-label="Cancel deletion of task and close delete task modal and return to the task"
        >Cancel</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import Task from "./Task.vue";
  import axios from "axios";

  export default {
    name: "TaskList",
    components: {
      task: Task
    },
    props: {
      tasks: {}
    },
    data() {
      return {
        noTasksMessage:
          "You don't have any tasks. Why don't you add one using the \"Add task\" button?",
        modalShow: false,
        taskToBeDeleted: {
          id: "",
          title: ""
        }
      };
    },
    methods: {
      taskIsDoneStatusChange(id, title, isDone) {
        let alert = "";
        if (isDone === "false") {
          axios
            .patch("http://localhost:4000/api/task/" + id, { isDone: "true" })
            .then(response => {
              alert = 'Task "' + title + '" marked as done!';
              this.$emit("updatetasklist", alert);
            })
            .catch(error => {
              console.log("Error: " + error);
            });
        } else {
          axios
            .patch("http://localhost:4000/api/task/" + id, { isDone: "false" })
            .then(response => {
              alert = 'Task "' + title + '" marked as still to be done!';
              this.$emit("updatetasklist", alert);
            })
            .catch(error => {
              console.log("Error: " + error);
            });
        }
      },
      showDeleteModal(taskID, taskTitle) {
        this.modalShow = true;
        this.taskToBeDeleted.id = taskID;
        this.taskToBeDeleted.title = taskTitle;
      },
      hideDeleteModal() {
        this.modalShow = false;
        this.taskToBeDeleted.id = "";
        this.taskToBeDeleted.title = "";
      },
      deleteTask() {
        let alert = "";
        axios
          .delete("http://localhost:4000/api/task/" + this.taskToBeDeleted.id)
          .then(response => {
            alert =
              'Task "' + this.taskToBeDeleted.title + '" deleted successfully';
            this.$emit("updatetasklist", alert);
          })
          .catch(error => {
            console.log("Error: " + error);
          });

        this.modalShow = false;
      }
    }
  };
</script>
