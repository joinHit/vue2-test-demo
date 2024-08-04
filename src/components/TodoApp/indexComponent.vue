<template>
  <section class="todoapp">
    <todo-header @new-todo="handleNewTodo"></todo-header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem v-for="todo in todoList" :key="todo.id" :todo="todo" />
      </ul>
    </section>

    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter />
  </section>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoItem from './TodoItem.vue'

export default {
  name: 'indexComponent',
  components: {
    TodoHeader,
    TodoFooter,
    TodoItem
  },
  data() {
    return {
      // 下拉列表
      todoList: [],
      // 下拉列表中的 "每一项 id"
      id: 0
    }
  },
  methods: {
    handleNewTodo(text) {
      this.todoList.push({
        id: this.id,
        text,
        done: false
      })

      this.id++
    }
  }
}
</script>
