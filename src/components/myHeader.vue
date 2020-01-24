<template>
  <div class="header" role="banner" tabindex="0" aria-label="Application header">
    <h1 tabindex="0">Todo list</h1>
    <button
      type="button"
      @click="addTaskFormToggle"
      aria-label="Add a new task">
        + Add task
    </button>
  </div>
</template>

<script>
	export default {
    name: "MyHeader",
    methods: {
      addTaskFormToggle() {
        this.$emit('addtaskformtoggled');
      }
    }
  };
</script>
