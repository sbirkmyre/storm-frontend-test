<template>
  <div class="task-list">
    <p v-if="(tasks.length === 0)">{{ noTasksMessage }}</p>
    <task v-else v-for="task in tasks" :key="tasks.id" :task="task" @updatetasklist="updatetasklist" ></task>
  </div>
</template>

<script>
	import Task from './task.vue';
  export default {
    name: "TaskList",
    data() {
      return {
        noTasksMessage: 'You don\'t have any tasks.'
      }
    },
    props: {
      tasks: {}
    },
    methods: {
      updatetasklist() {
        this.$emit('updatetasklist');
      }
    },
    components: {
			'task': Task,
		}
  };
</script>
