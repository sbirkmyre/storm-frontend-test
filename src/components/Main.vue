<template>
  <div class="app">
    <my-header @viewtoggled="viewtoggled"></my-header>
    <div class="main">
        <new-task-form @canceladd="canceladd" @forcererender="forcererender" v-if="(this.view === 'add-task')"></new-task-form>
        <task-list :tasks="appData.tasks" :componentKey="componentKey"></task-list>
    </div>
  </div>
</template>

<script>
	import MyHeader from './myHeader.vue';
	import NewTaskForm from './newTaskForm.vue'
	import TaskList from './taskList.vue';

  export default {
    name: "Main",
		data() {
      return {
        appData: this.$root.appData,
        componentKey: 0,
        view: this.$root.view
      }
    },
    methods: {
      forcererender() {
        this.componentKey += 1;
      },
      viewtoggled() {
        if(this.view === "default") {
          this.view = "add-task";
        }
      },
      canceladd() {
        if(this.view === "add-task") {
          this.view = "default";
        }
      }
    },
    components: {
			'my-header': MyHeader,
			'task-list': TaskList,
			'new-task-form': NewTaskForm
		}
  };
</script>
