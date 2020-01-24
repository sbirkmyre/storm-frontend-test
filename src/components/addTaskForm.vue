<template>
  <div class="add-task-form" role="form" aria-label="Add task form" tabindex="0">
    <h2>Add a new task</h2>
    <div v-if="(errors.length !== 0)" class="form-errors" ref="errors" aria-label="Errors from form submission" tabindex="0">
      <p tabindex="0">Please correct the following errors:</p>
      <ul tabindex="0">
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div class="form row">
      <div class="group col-sm-6">
        <label for="task-title">Title:*</label>
        <input
          id="task-title"
          aria-required="true"
          type="text"
          placeholder="Title"
          v-model="newTask.title">
      </div>
      <div class="group col-sm-6">
        <label for="task-importance">Importance:*</label>
        <select
          id="task-importance"
          aria-required="true"
          v-model="newTask.importance">
          <option disabled value="">Please select one</option>
          <option value="0">0 (High)</option>
          <option value="1">1 (Medium)</option>
          <option value="2">2 (Low)</option>
        </select>
      </div>
    </div>
    <div class="action">
      <button
        type="button"
        @click="addTask"
        aria-label="Add new task">Add Task</button>
      <button
        type="button"
        v-b-modal.discard-modal
        aria-label="Discard new task">Cancel</button>
    </div>

    <b-modal id="discard-modal" centered>
      <template v-slot:modal-header="{ close }">
        <h2>Discard task?</h2>
        <b-button @click="close()" aria-label="Close discard task model and return to form">
          x
        </b-button>
      </template>

      <template v-slot:default="{ hide }">
        <p>Would you like to discard this task?</p>
      </template>

      <template v-slot:modal-footer="{ cancel, discard }">
        <button
          type="button"
          @click="discardTask">
          Discard task
        </button>
        <button
          type="button"
          @click="$bvModal.hide('discard-modal')"
          aria-label="Cancel discarding of task and return to form">
          Cancel
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
          this.errors.push("Task title is required.");
        }
        if(this.newTask.importance === '') {
          this.errors.push("Ttask importance is required.");
        }

        if(this.errors.length !== '0') {
          this.$nextTick(function(){
            this.$refs.errors.focus();
          });
        }

        if((this.newTask.title !== '') && (this.newTask.importance !== '')){

          axios.post('http://localhost:4000/api/task', {'title':this.newTask.title, 'importance':this.newTask.importance})
            .then((response) => {
              this.$emit('updatetasklist', alert);
              this.$emit('addtaskformtoggled');
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
        this.$emit('addtaskformtoggled');
      }
    }
  };
</script>
