import TodoHeader from '@/components/TodoApp/TodoHeader.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'
import indexComponent from '@/components/TodoApp/indexComponent.vue'
import { shallowMount } from '@vue/test-utils'
// import Vue from 'vue'

describe('indexComponent.vue', () => {
  // 调用当前组件的方法
  test('handle new todo', () => {
    const wrapper = shallowMount(indexComponent)

    // 设置 "子组件（TodoHeader.vue）" 传过来的值
    const text = 'play'

    // 调用当前组件的方法
    wrapper.vm.handleNewTodo(text)

    const todo = wrapper.vm.todoList.find((item) => item.text === text)

    expect(todo).toBeTruthy()
  })

  // 添加 "列表数据"，更新 "列表视图"
  it('todo list', async () => {
    const wrapper = shallowMount(indexComponent)

    // 模拟的列表数据
    const todoList = [
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

    // 设置 todoList 的值（方法1）
    /*     wrapper.vm.todoList = todoList
    await Vue.nextTick() */

    // 设置 todoList 的值（方法2）
    await wrapper.setData({
      todoList
    })

    expect(wrapper.findAllComponents(TodoItem).length).toBe(todoList.length)
  })

  // 模拟调用子组件的方法，更新视图列表(相当于 "前面 2个测试用例")
  test('new todo', async () => {
    const wrapper = shallowMount(indexComponent)

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

    await wrapper.setData({
      todoList: JSON.parse(JSON.stringify(todoList1)),
      id: todoList1.length
    })

    // 设置 "子组件（TodoHeader.vue）" 传过来的值
    const text = 'play'

    // 模拟 2次 调用子组件的方法
    await wrapper.getComponent(TodoHeader).vm.$emit('new-todo', text)
    await wrapper.getComponent(TodoHeader).vm.$emit('new-todo', text)

    expect(wrapper.findAllComponents(TodoItem).length).toBe(
      todoList1.length + 2
    )
  })
})
