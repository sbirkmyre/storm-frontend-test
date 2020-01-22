<template>
  <div class="task-list">
    <p v-if="(tasks.length === 0)">{{ noTasksMessage }}</p>
    <task
      v-else v-for="(task) in tasks"
      :key="tasks.id"
      :task="task"
      @checktask="checktask"
      @showdeletemodal="showdeletemodal"
      ></task>

    <b-modal id="delete-modal" title="Delete task?" v-model="modalShow">
      <p>Would you like to delete this task?</p>
      <template v-slot:modal-footer="{ cancel, remove }">
        <button @click="hideDeleteModal">
          Cancel
        </button>
        <button @click="deleteTask">
          Delete task
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
	import Task from './task.vue';
  import axios from 'axios';

  export default {
    name: "TaskList",
    data() {
      return {
        noTasksMessage: 'You don\'t have any tasks. Why don\'t you add one using the \"Add task\" button?',
        modalShow: false,
        deletedTaskId: '',
        deletedTaskTitle: ''
      }
    },
    props: {
      tasks: {}
    },
    methods: {
      checktask(taskID, taskTitle, taskIsDone) {
      let alert = '';
        if (taskIsDone === "false") {
          axios.patch('http://localhost:4000/api/task/' + taskID, {'isDone':"true"})
            .then((response) => {
              alert = 'Task \"' + taskTitle + '\" marked as done!';
              this.$emit('updatetasklist', alert);
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
        else {
          axios.patch('http://localhost:4000/api/task/' + taskID, {'isDone':"false"})
            .then((response) => {
              alert = 'Task \"' + taskTitle + '\" marked as still to be done!';
              this.$emit('updatetasklist', alert);
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
      },
      showdeletemodal(taskID, taskTitle) {
        this.modalShow = true;
        this.deletedTaskId = taskID;
        this.deletedTaskTitle = taskTitle;
      },
      hideDeleteModal() {
        this.modalShow = false;
      },
      deleteTask() {
        let alert = '';
        axios.delete('http://localhost:4000/api/task/' + this.deletedTaskId)
          .then((response) => {
            alert = 'Task \"' + this.deletedTaskTitle + '\" deleted successfully';
            this.$emit('updatetasklist', alert);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });

          this.modalShow = false;
      }
    },
    components: {
			'task': Task,
		}
  };
</script>
