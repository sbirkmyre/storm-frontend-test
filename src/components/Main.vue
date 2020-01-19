<template>
  <div class="app">
    <div class="main">
        <task-list :tasks="appData.tasks"></task-list>
    </div>
  </div>
</template>

<script>
	import TaskList from './taskList.vue';
  export default {
    name: "Main",
		data() {
      return {
        appData: this.$root.appData
      }
    },
    components: {
			'task-list': TaskList
		}
  };
</script>
