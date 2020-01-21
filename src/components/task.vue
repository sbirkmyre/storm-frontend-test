<template>
  <div class="task"
    :class="{ 'high-priority': task.importance === 0,
              'medium-priority': task.importance === 1,
              'low-priority': task.importance === 2 }">
    <input type="checkbox"
      v-model="task.isDone"
      true-value="true"
			false-value="false"
      @click="updateTask">
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
      updateTask() {
        if(this.task.isDone !== "true") {
          this.$emit('checktask', this.task.id, this.task.title);
        }
      },
      showDeleteModal() {
        this.$emit('showdeletemodal', this.task.id, this.task.title);
      }
    }
  };
</script>
