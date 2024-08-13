<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"
      ><strong data-testid="done-todo-count">{{ doneTodoCount }}</strong> item
      left</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <!-- <a class="selected" href="#/">All</a> -->
        <router-link to="/" exact>All</router-link>
      </li>
      <li>
        <!-- <a href="#/active">Active</a> -->
        <router-link to="/active" exact>Active</router-link>
      </li>
      <li>
        <!-- <a href="#/completed">Completed</a> -->
        <router-link to="/completed" exact>Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      class="clear-completed"
      data-testid="clear-completed"
      v-if="showClearCompletedButton"
      @click="$emit('clear-completed')"
    >
      <!-- v-show="showClearCompletedButton"
      wrapper.find('p').isVisible() -->
      Clear completed
    </button>
  </footer>
</template>

<script>
export default {
  name: 'TodoFooter',
  props: {
    todoList: {
      type: Array,
      required: true
    }
  },
  computed: {
    doneTodoCount() {
      return this.todoList.filter((item) => !item.done).length
    },
    showClearCompletedButton() {
      // 只要有1个todo的状态是 "done/完成"，就显示 "clear completed 按钮"
      return this.todoList.some((item) => item.done)
    }
  }
}
</script>
