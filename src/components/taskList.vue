<template>
  <div class="task-list">
    <p v-if="(tasks.length === 0)">{{ noTasksMessage }}</p>
    <task
      v-else v-for="(task) in tasks"
      :key="tasks.id"
      :task="task"
      @taskisdonestatuschange="taskisdonestatuschange"
      @showdeletemodal="showdeletemodal"
      ></task>

    <b-modal id="delete-modal" title="Delete task?" v-model="modalShow">
      <p>Would you like to delete this task?</p>
      <template v-slot:modal-footer="{ cancel, remove }">
        <button
          role="button"
          type="button"
          @click="hideDeleteModal">
          Cancel
        </button>
        <button
          role="button"
          type="button"
          @click="deleteTask">
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
        taskToBeDeleted: {
          id: '',
          title: ''
        }
      }
    },
    props: {
      tasks: {}
    },
    methods: {
      taskisdonestatuschange(id, title, isDone) {
        let alert = '';
        if (isDone === "false") {
          axios.patch('http://localhost:4000/api/task/' + id, {'isDone':"true"})
            .then((response) => {
              alert = 'Task \"' + title + '\" marked as done!';
              this.$emit('updatetasklist', alert);
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
        else {
          axios.patch('http://localhost:4000/api/task/' + id, {'isDone':"false"})
            .then((response) => {
              alert = 'Task \"' + title + '\" marked as still to be done!';
              this.$emit('updatetasklist', alert);
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
      },
      showdeletemodal(taskID, taskTitle) {
        this.modalShow = true;
        this.taskToBeDeleted.id = taskID;
        this.taskToBeDeleted.title = taskTitle;
      },
      hideDeleteModal() {
        this.modalShow = false;
      },
      deleteTask() {
        let alert = '';
        axios.delete('http://localhost:4000/api/task/' + this.taskToBeDeleted.id)
          .then((response) => {
            alert = 'Task \"' + this.taskToBeDeleted.title + '\" deleted successfully';
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
