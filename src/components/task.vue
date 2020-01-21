<template>
  <div class="task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
    <input type="checkbox"
      @click="updateTask">
    {{ task.title }}
    <button @click="deleteTask(task.id)">
      Delete
    </button>
  </div>
</template>

<script>
  import axios from 'axios';

	export default {
    name: "Task",
    props: {
        task: {}
    },
    methods: {
      updateTask() {
        console.log("A task has been updated!");
      },
      deleteTask(taskID) {
        var d = confirm("Would you like to delete this task?");

        if (d == true) {
          axios.delete('http://localhost:4000/api/task/' + taskID)
            .then((response) => {
              this.$emit('updatetasklist');
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
      }
    }
  };
</script>
