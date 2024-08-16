<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      data-testid="new-todo"
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  methods: {
    handleNewTodo(e) {
      const value = e.target.value.trim()
      // 没有输入内容（就回车），应该被拦截
      if (value.length === 0) {
        return
      }

      this.$emit('new-todo', value)
      e.target.value = ''
    }
  }
}
</script>
