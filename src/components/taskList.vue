<template>
  <div class="task-list">
    <task v-for="task in tasks" :key="tasks.id" :task="task"></task>
  </div>
</template>

<script>
	import Task from './task.vue';
  export default {
    name: "TaskList",
    props: {
      componentKey: '',
      tasks: {}
    },
    components: {
			'task': Task,
		}
  };
</script>
