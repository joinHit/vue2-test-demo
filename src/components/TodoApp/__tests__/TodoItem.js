import TodoItem from '@/components/TodoApp/TodoItem.vue'
import { shallowMount } from '@vue/test-utils'

describe('TodoItem.vue', () => {
  /** 加了下面这行注释，才能在vscode中，起到 "typescript 的类型提示" 的功能
   * 如果不加下面这行提示，在 "test 函数" 或 "it 函数" 中，
   *    使用 "wrapper 变量" 时，
   *    就没有 "wrapper 的 属性或者方法" 显示在 vscode中，供用户选择
   */
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(() => {
    const todo = {
      id: 0,
      text: 'eat',
      done: true
    }

    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    })
  })

  // 有关 "文本" 的测试
  it('text', () => {
    // 判断 html 上的 "文本"
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(
      wrapper.vm.todo.text
    )
  })

  // 有关 "多选框 选中" 的测试
  test('done', async () => {
    const todoDoneEle = wrapper.find('[data-testid="todo-done"]')
    const todoItemEle = wrapper.find('[data-testid="todo-item"]')

    // 判断 "多选框" 是否被选中
    expect(todoDoneEle.element.checked).toBeTruthy()

    // 判断 class 类名
    expect(todoItemEle.classes()).toContain('completed')

    /*   // 代表选中
    await todoDoneEle.setChecked()
    // 输出 [ 'completed' ]
    console.log(todoItemEle.classes()) */

    await todoDoneEle.setChecked(false)
    expect(todoItemEle.classes('completed')).toBeFalsy()
  })
})
