<template>
  <div class="header">
    <h1>Todo list</h1>
    <button
      @click="toggleView">
        + Add task
    </button>
  </div>
</template>

<script>
	export default {
    name: "MyHeader",
    methods: {
      toggleView() {
        this.$emit('viewtoggled');
      }
    }
  };
</script>
