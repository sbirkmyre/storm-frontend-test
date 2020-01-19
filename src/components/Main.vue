<template>
  <div class="app">
    <my-header></my-header>
    <div class="main">
        <task-list :tasks="appData.tasks"></task-list>
    </div>
  </div>
</template>

<script>
	import MyHeader from './myHeader.vue';
	import TaskList from './taskList.vue';
  export default {
    name: "Main",
		data() {
      return {
        appData: this.$root.appData
      }
    },
    components: {
			'my-header': MyHeader,
			'task-list': TaskList
		}
  };
</script>
