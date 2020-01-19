<template>
  <div class="task">
    <input type="checkbox">
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
