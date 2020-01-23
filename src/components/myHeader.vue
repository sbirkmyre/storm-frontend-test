<template>
  <div class="header">
    <h1>Todo list</h1>
    <button
      role="button"
      type="button"
      @click="addTaskFormToggle">
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
