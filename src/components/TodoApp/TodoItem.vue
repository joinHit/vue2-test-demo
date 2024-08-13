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
    :class="{
      completed: checkboxStatus,
      editing: isEditing
    }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        data-testid="todo-done"
        v-model="checkboxStatus"
      />
      <label data-testid="todo-text" @dblclick="isEditing = true">{{
        todo.text
      }}</label>
      <button
        class="destroy"
        data-testid="delete-todo"
        @click="$emit('delete-todo', todo.id)"
      ></button>
    </div>
    <input
      class="edit"
      data-testid="todo-edit"
      @blur="isEditing = false"
      v-focus123="isEditing"
      :value="todo.text"
      @keyup.enter="handleEditTodo"
      @keyup.esc="handleCancelEditTodo"
    />
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
  directives: {
    focus123(element, binding) {
      /** 编辑状态下，自动获得焦点
       *
       * binding.value 的值为 "isEditing 的值"
       * element 的值为 "（含有 v-focus123的）html元素"
       *
       * 解释：
       * html上，有这么一段代码 v-focus123="isEditing"
       */
      if (binding.value) {
        element.focus()
      }
    }
  },
  computed: {
    checkboxStatus: {
      // 更新 "todo项 的选中" 状态
      get() {
        return this.todo.done
      },
      // 改变 "todo项 的选中" 状态
      set(isChecked) {
        this.$emit('change-todo-done', {
          id: this.todo.id,
          done: isChecked
        })
      }
    }
  },
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    // 按下 "回车键" 时，处理 "编辑中的 todo项"
    handleEditTodo(e) {
      this.$emit('edit-todo', {
        id: this.todo.id,
        text: e.target.value
      })

      // 取消 "编辑状态"
      this.handleCancelEditTodo()
    },

    // （按下 "ESC 键"）取消 "编辑中的 todo项"
    handleCancelEditTodo() {
      this.isEditing = false
    }
  }
}
</script>
