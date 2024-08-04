<template>
  <!-- <li class="completed">
      <div class="view">
        <input class="toggle" type="checkbox" checked />
        <label>Taste JavaScript</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template" />
    </li> -->
  <li
    data-testid="todo-item"
    class="abc"
    :class="{
      completed: checkboxStatus
    }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        v-model="checkboxStatus"
        data-testid="todo-done"
      />
      <label data-testid="todo-text">{{ todo.text }}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web" />
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checkboxStatus: this.todo.done
    }
  }
}
</script>
