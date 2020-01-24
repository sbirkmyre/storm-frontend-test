<template>
  <div class="task" tabindex="0" aria-label="Task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
      <div tabindex="0" aria-label="Task information">
        <h2 class="title" tabindex="0">{{ task.title }}</h2>
        <div class="info">
          <p v-if="task.importance === 0" tabindex="0">Importance: High</p>
          <p v-if="task.importance === 1" tabindex="0">Importance: Medium</p>
          <p v-if="task.importance === 2" tabindex="0">Importance: Low</p>
          <p v-if="task.isDone === 'true'" tabindex="0">Status: Done</p>
          <p v-else tabindex="0">Status: Still to be done</p>
        </div>
      </div>
      <input
        type="checkbox"
        v-model="task.isDone"
        true-value="true"
  			false-value="false"
        @click="taskIsDoneStatusChange"
        @keyup.enter="taskIsDoneStatusChange"
        aria-label="Update task is done status">
    <button
      type="button"
      @click="showDeleteModal"
      aria-label="Delete task">
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
