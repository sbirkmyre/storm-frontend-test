<template>
  <div class="new-task-form">
    <h2>Add a new task</h2>
    <div class="form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="newTask.title" type="text" name="title" placeholder="Title">
      </div>
      <div class="form-group">
        <label for="importance">Importance:</label>
        <select name="importance"
          v-model="newTask.importance">
          <option disabled value="">Please select one</option>
          <option value="0">0 (High)</option>
          <option value="1">1 (Medium)</option>
          <option value="2">2 (Low)</option>
        </select>
      </div>
      <div class="form-action">
        <button type="button" @click="cancelAdd">Cancel</button>
        <button type="button" @click="addTask">Add Task</button>
      </div>
    </div>
    <div class="form-errors">
      <p v-if="(errors.length !== 0)">Errors:</p>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "AddTask",
    data() {
      return {
        newTask: {
          title: '',
          importance: ''
        },
        errors: []
      }
    },
    methods: {
      addTask() {
        this.errors= [];

        if(this.newTask.title === '') {
          this.errors.push("Please add a task title.");
        }
        if(this.newTask.importance === '') {
          this.errors.push("Please specify a task importance.");
        }

        if((this.newTask.title !== '') && (this.newTask.importance !== '')){
          axios.post('http://localhost:4000/api/task', {'title':this.newTask.title, 'importance':this.newTask.importance})
            .then((response) => {
              this.$emit('updatetasklist');
              this.$emit('canceladd');
            })
            .catch((error) => {
              console.log("Error: " + error);
            });

          this.newTask.title = '';
          this.newTask.importance = '';
        }
      },
      cancelAdd() {
        var discard = confirm("Would you like to discard this task?");

        if (discard == true) {
          this.$emit('canceladd');
        }
      }
    }
  };
</script>
