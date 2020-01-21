<template>
  <div class="task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
    <input type="checkbox"
      @keyup.enter="updateTask">
    {{ task.title }}
  </div>
</template>

<script>
	export default {
    name: "Task",
    props: {
        task: {}
    },
    methods: {
      updateTask() {
        console.log("A task has been updated!");
      }
    }
  };
</script>
