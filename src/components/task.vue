<template>
  <div class="task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
    <label for="isDone">
      <input type="checkbox"
        title="Task completion status"
        name="isDone"
        role="checkbox"
        v-model="task.isDone"
        true-value="true"
  			false-value="false"
        aria-checked="false"
        @click="taskIsDoneStatusChange"
        @keyup.enter="taskIsDoneStatusChange">
      {{ task.title }}
    </label>
    <button
      role="button"
      type="button"
      @click="showDeleteModal">
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
