import TodoHeader from '@/components/TodoApp/TodoHeader.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'
import indexComponent from '@/components/TodoApp/indexComponent.vue'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'

describe('indexComponent.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  // 模拟的列表数据
  const todoList1 = [
    {
      id: 0,
      text: 'eat',
      done: false
    },
    {
      id: 1,
      text: 'play',
      done: true
    },
    {
      id: 2,
      text: 'sleep',
      done: false
    }
  ]

  beforeEach(async () => {
    // 定义 "当前页面的路由"
    const $route = {
      path: '/'
    }

    wrapper = shallowMount(indexComponent, {
      mocks: {
        $route
      }
    })

    // 设置 todoList 的值（方法1）
    /*     wrapper.vm.todoList = todoList1
    await Vue.nextTick() */

    // 设置 todoList 的值（方法2）
    await wrapper.setData({
      todoList: JSON.parse(JSON.stringify(todoList1)),
      id: todoList1.length
    })
  })

  // 调用当前组件的方法
  test('handle new todo', () => {
    // 设置 "子组件（TodoHeader.vue）" 传过来的值
    const text = 'play'

    // 调用当前组件的方法
    wrapper.vm.handleNewTodo(text)

    const todo = wrapper.vm.todoList.find((item) => item.text === text)

    expect(todo).toBeTruthy()
  })

  // 添加 "列表数据"，更新 "列表视图"
  it('todo list', () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(todoList1.length)
  })

  // 模拟调用子组件的方法，更新视图列表(相当于 "前面 2个测试用例")
  test('new todo', async () => {
    // 设置 "子组件（TodoHeader.vue）" 传过来的值
    const text = 'play'

    // 模拟 2次 调用子组件的方法
    await wrapper.getComponent(TodoHeader).vm.$emit('new-todo', text)
    await wrapper.getComponent(TodoHeader).vm.$emit('new-todo', text)

    expect(wrapper.findAllComponents(TodoItem).length).toBe(
      todoList1.length + 2
    )
  })

  // 删除 "某个 todo" 成功
  test('delete todo success', async () => {
    // 存在 "todo 的 id 为 1" 的测试（真实存在的测试，也叫 "正向测试"）
    await wrapper.vm.handleDeleteTodo(1)

    // 因为总共有 "3 个数据"，又删除了id为 "1 的数据"，所以还剩余 "2 个数据"
    expect(wrapper.vm.todoList.length).toBe(2)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2)
  })

  // 删除 "某个 todo" 失败
  test('delete todo fail', async () => {
    // 不存在 "todo 的 id 为 123" 的测试（根本不存在的测试，也叫 "反向测试"）
    await wrapper.vm.handleDeleteTodo(123)

    // 因为总共有 "3 个数据"，又不存在id为 "123 的数据"，所以还剩余 "3 个数据"
    expect(wrapper.vm.todoList.length).toBe(3)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(3)
  })

  // 编辑 "某个 todo"
  test('edit todo', async () => {
    // （异步）从 "todo列表" 中 获取 单项todo
    async function getTodoItem(todo) {
      await wrapper.vm.handleEditTodo(todo)

      return wrapper.vm.todoList.find((item) => item.id === todo.id)
    }

    // （TodoItem.vue）子组件传来的参数
    const emitTodo = {
      id: 2,
      text: 'abc'
    }

    // 正向测试（输入的是：有效数据）
    expect((await getTodoItem(emitTodo))?.text).toBe(emitTodo.text)

    // 反向测试（输入的是：无效数据。即空字符串）
    // （TodoItem.vue）子组件传来的 参数text：置空（代表删除该 item项）
    emitTodo.text = ''
    // expect(await getTodoItem(emitTodo)).toBeFalsy()
    expect(await getTodoItem(emitTodo)).toBeUndefined()
  })

  // 点击 "全选（todo）" 按钮
  test('click toggle all', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')

    // 1、"全部 todo" 选中的情况
    // 相当于: 点击 "全选" 按钮，使其为 "选中" 状态
    await toggleAll.setChecked()
    // 断言 "所有的（todo）子任务" 都被选中了
    wrapper.vm.todoList.forEach((item) => {
      expect(item.done).toBeTruthy()
    })

    // 2、"全部 todo" 未选中的情况
    // 相当于: 点击 "全选" 按钮，使其为 "未选中" 状态
    await toggleAll.setChecked(false)
    // 断言 "所有的（todo）子任务" 都被选中了
    wrapper.vm.todoList.forEach((item) => {
      expect(item.done).toBeFalsy()
    })
  })

  // 点击 "（todoList）列表前的（每一个）选项" 按钮
  test('click item all', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')

    // 1、让所有任务都变成完成状态，
    // 即："每一项 todo 前" 的选项按钮，都要点击一下，让其选上
    wrapper.vm.todoList.forEach((item) => {
      item.done = true
    })
    // （"全选按钮" 的状态变化）需要等待视图更新
    await Vue.nextTick()

    // 断言 "全选按钮" 也选中了
    expect(toggleAll.element.checked).toBeTruthy()

    // 2、取消摸一个任务（置为未完成状态）时，断言 "全选按钮" 未完成
    // 此处为：把 "todo列表中的第0项" 数据的状态，置为 "未完成 状态"
    wrapper.vm.todoList[0].done = false
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeFalsy()
  })

  // 清除 "已完成（代指：已选中）" 的 "todo项"
  test('clear completed todo ', async () => {
    wrapper.vm.handleClearCompleted()
    await Vue.nextTick()

    const todoList2 = todoList1.filter((item) => !item.done)
    expect(wrapper.vm.todoList).toEqual(todoList2)
  })

  // （根据路由）过滤数据
  test('filter todoList', async () => {
    // 1、 将路由导航到 /
    wrapper.vm.$route.path = '/'
    await Vue.nextTick()
    // 断言 filterTodoList  = （todo列表上的）所有todo
    expect(wrapper.vm.filterTodoList).toEqual(todoList1)

    // 2、 将路由导航到 /active
    wrapper.vm.$route.path = '/active'
    await Vue.nextTick()
    // 断言 filterTodoList  = （todo列表上的）所有未完成的todo"
    const todoListActive = todoList1.filter((item) => !item.done)
    expect(wrapper.vm.filterTodoList).toEqual(todoListActive)

    // 3、 将路由导航到 /completed
    wrapper.vm.$route.path = '/completed'
    await Vue.nextTick()
    // 断言 filterTodoList  = （todo列表上的）所有已完成的todo"
    const todoListCompleted = todoList1.filter((item) => item.done)
    expect(wrapper.vm.filterTodoList).toEqual(todoListCompleted)
  })

  // 快照
  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
