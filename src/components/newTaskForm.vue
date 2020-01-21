<template>
  <div class="new-task-form">
    <h2>Add a new task</h2>
    <div class="form row">
      <div class="group col-sm-6">
        <label for="title">Title:</label>
        <input v-model="newTask.title" type="text" name="title" placeholder="Title">
      </div>
      <div class="group col-sm-6">
        <label for="importance">Importance:</label>
        <select name="importance"
          v-model="newTask.importance">
          <option disabled value="">Please select one</option>
          <option value="0">0 (High)</option>
          <option value="1">1 (Medium)</option>
          <option value="2">2 (Low)</option>
        </select>
      </div>
    </div>
    <div class="form-errors">
      <p v-if="(errors.length !== 0)">Errors:</p>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div class="action">
      <button v-b-modal.discard-modal type="button">Cancel</button>
      <button type="button" @click="addTask">Add Task</button>
    </div>

    <b-modal id="discard-modal" title="Discard task?">
      <p>Would you like to discard this task?</p>
      <template v-slot:modal-footer="{ cancel, discard }">
        <button @click="$bvModal.hide('discard-modal')">
          Cancel
        </button>
        <button @click="discardTask">
          Discard task
        </button>
      </template>
    </b-modal>
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
              this.$emit('updatetasklist', alert);
              this.$emit('discardtask');
            })
            .catch((error) => {
              console.log("Error: " + error);
            });

          let alert = 'Task \"' + this.newTask.title + '\" added successfully';

          this.newTask.title = '';
          this.newTask.importance = '';
        }
      },
      discardTask() {
        this.$emit('discardtask');
      }
    }
  };
</script>
