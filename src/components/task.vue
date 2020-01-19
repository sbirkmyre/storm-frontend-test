<template>
  <div class="task">
    {{ task.title }}
  </div>
</template>

<script>
	export default {
    name: "Task",
    props: {
        task: {}
    }
  };
</script>
