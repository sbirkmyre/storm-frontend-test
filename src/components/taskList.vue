<template>
  <div class="task-list">
    <p v-if="(tasks.length === 0)">{{ noTasksMessage }}</p>
    <task
      v-else v-for="(task) in tasks"
      :key="tasks.id"
      :task="task"
      @updatetasklist="updatetasklist"
      @checktask="checktask"
      @showdeletemodal="showdeletemodal"
      ></task>

    <b-modal id="delete-modal" title="Delete task?" v-model="modalShow">
      <p>Would you like to delete this task?</p>
      <template v-slot:modal-footer="{ cancel, remove }">
        <button @click="hideDeletemodal">
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
      updatetasklist(message) {
        this.$emit('updatetasklist', message);
      },
      checktask(taskID, taskTitle) {
        let alert = '';
        axios.patch('http://localhost:4000/api/task/' + taskID)
          .then((response) => {
            alert = 'Task \"' + this.taskTitle + '\" marked as done!';
            this.$emit('updatetasklist', alert);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },
      showdeletemodal(taskID, taskTitle) {
        this.modalShow = true;
        this.deletedTaskId = taskID;
        this.deletedTaskTitle = taskTitle;
      },
      hideDeletemodal() {
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
