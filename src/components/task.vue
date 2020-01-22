<template>
  <div class="task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
    <input type="checkbox"
      v-model="task.isDone"
      true-value="true"
			false-value="false"
      @click="taskIsDoneStatusChange"
      @keyup.enter="taskIsDoneStatusChange">
    {{ task.title }}
    <button @click="showDeleteModal">
      Delete
    </button>
  </div>
</template>

<script>
	export default {
    name: "Task",
    props: {
        task: {}
    },
    methods: {
      taskIsDoneStatusChange() {
        this.$emit('taskisdonestatuschange', this.task.id, this.task.title, this.task.isDone);
      },
      showDeleteModal() {
        this.$emit('showdeletemodal', this.task.id, this.task.title);
      }
    }
  };
</script>
