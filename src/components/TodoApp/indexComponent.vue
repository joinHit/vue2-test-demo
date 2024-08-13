<template>
  <section class="todoapp">
    <todo-header @new-todo="handleNewTodo"></todo-header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        data-testid="toggle-all"
        v-model="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem
          v-for="todo in filterTodoList"
          :key="todo.id"
          :todo="todo"
          @delete-todo="handleDeleteTodo"
          @edit-todo="handleEditTodo"
          @change-todo-done="changeTodoDone"
        />
      </ul>
    </section>

    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter :todoList="todoList" @clear-completed="handleClearCompleted" />
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
    const todoList = [
      {
        id: 0,
        text: '00',
        done: false
      },
      {
        id: 1,
        text: '01',
        done: true
      },
      {
        id: 2,
        text: '02',
        done: false
      }
    ]

    return {
      // 下拉列表
      todoList,
      // 下拉列表中的 "每一项 id"
      id: todoList.length
    }
  },
  computed: {
    toggleAll: {
      get() {
        /** 设置 toggleAll 的选中状态
         *
         * 此处特别注意一下：
         *  this.todoList为空数组时，经过every方法，也会返回true。
         *  但这样就会造成 "web界面" 的 "全选 按钮" 是 "选中 状态"（不符合我们的认知）
         *     我们的认知是：有选项且全部选中时，"全选 按钮" 才 "选中"。
         *     但现在是 "没有1个 todo选项" 的情况下，"全选 按钮" 也被选中了
         *  所以需要加上 this.todoList.length 判断（是否为空数组）
         */
        return this.todoList.length && this.todoList.every((item) => item.done)
      },
      /** 点击 "全选的 复选框" 时，可以拿到 "isChecked参数
       * 该参数代表：全选框，是否被选中
       */
      set(isChecked) {
        this.todoList.forEach((item) => {
          item.done = isChecked
        })
      }
    },

    // （根据路由）过滤数据
    filterTodoList() {
      // 获取路由路径
      const path = this.$route.path

      // 根据路由路径，过滤数据
      // 路径 /           代表 "（todo列表上的）所有todo"
      // 路径 /active     代表 "（todo列表上的）所有未完成的todo"
      // 路径 /completed  代表 "（todo列表上的）所有已完成的todo"
      switch (path) {
        case '/':
          return this.todoList
        case '/active':
          return this.todoList.filter((item) => !item.done)
        case '/completed':
          return this.todoList.filter((item) => item.done)
        default:
          return this.todoList
      }
    }
  },
  methods: {
    // 添加 todo列表
    handleNewTodo(text) {
      this.todoList.push({
        id: this.id,
        text,
        done: false
      })

      this.id++
    },

    // 删除某个 todo
    handleDeleteTodo(todoId) {
      this.todoList = this.todoList.filter((item) => item.id !== todoId)
    },

    // 按下 "回车键" 时，处理 "编辑中的 todo项"
    handleEditTodo(todo) {
      const { id, text } = todo
      const findTodo = this.todoList.find((item) => item.id === id)

      if (!findTodo) {
        return
      }

      // 执行删除操作
      if (text.trim().length === 0) {
        this.handleDeleteTodo(id)
      }

      // 执行修改操作
      findTodo.text = text
    },

    // 改变 "todo项 的选中" 状态
    changeTodoDone(todo) {
      const findTodo = this.todoList.find((item) => item.id === todo.id)

      if (findTodo) {
        findTodo.done = todo.done
      }
    },

    // 清除 "选中的 clear completed" 的 "todo项"
    handleClearCompleted() {
      this.todoList = this.todoList.filter((item) => !item.done)
    }
  }
}
</script>
