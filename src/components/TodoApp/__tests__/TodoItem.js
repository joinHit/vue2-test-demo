import TodoItem from '@/components/TodoApp/TodoItem.vue'
import { shallowMount } from '@vue/test-utils'

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

// 和 "编辑（列表的）todo成员" 无关的组
describe('TodoItem.vue', () => {
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

    // 是否有触发 "emitted 事件"
    expect(wrapper.emitted()['change-todo-done']).toBeTruthy()
    // "emitted 事件" 的参数判断
    expect(wrapper.emitted()['change-todo-done'][0][0].done).toBeFalsy()
    // expect(todoItemEle.classes('completed')).toBeFalsy()
  })

  // 删除 "列表的 todo成员"
  test('delete todo', async () => {
    const deleteTodo = wrapper.find('button[data-testid="delete-todo"]')
    await deleteTodo.trigger('click')

    expect(wrapper.emitted()['delete-todo']).toBeTruthy()
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id)
  })
})

// 和 "编辑（列表的）todo成员" 有关的组
describe('edit todo', () => {
  let inputEle = null

  beforeEach(async () => {
    inputEle = wrapper.find('input[data-testid="todo-edit"]')
    const labelEle = wrapper.find('label[data-testid="todo-text"]')

    // label 聚焦（双击 "label" 时，进入聚焦）
    await labelEle.trigger('dblclick')
  })

  // 编辑 "列表的 todo成员"
  test('edit todo', async () => {
    const liEle = wrapper.find('li[data-testid="todo-item"]')

    // expect(liEle.classes('editing')).toBeTruthy()
    expect(liEle.classes()).toContain('editing')

    // input 失焦（单击 "input 外的空白区域" 时，失去焦点）
    await inputEle.trigger('blur')
    expect(liEle.classes('editing')).toBeFalsy()
  })

  // 保存 "编辑后的（列表）todo成员"
  test('save edit todo', async () => {
    // 进入编辑时，html上的 "文本输入框中的内容" 为 "data数据里的 todo.text"
    expect(inputEle.element.value).toBe(wrapper.vm.todo.text)

    // 文本框的值
    const inputText = 'hello'
    // 修改文本框的值
    await inputEle.setValue(inputText)
    // 触发回车保存事件
    await inputEle.trigger('keyup.enter')
    /** 断言数据被修改了
     *
     * 因为，在当前（子）组件去更新todo数据不太合适
     * 需要在父组件去修改 todo数据
     * 所以此处只需要断言 "（向父组件发送）emit事件" 即可
     */
    // expect(wrapper.vm.todo.text).toBe(inputText)
    expect(wrapper.emitted()['edit-todo']).toBeTruthy()
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({
      id: wrapper.vm.todo.id,
      text: inputText
    })
    // 取消 "编辑状态"
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  // 取消 "编辑中的（列表）todo成员"
  test('cancel edit todo', async () => {
    // 备份 "修改之前 的文本"
    const textBackup = wrapper.vm.todo.text
    // 修改 "input 输入框" 的值为 bbb
    await inputEle.setValue('bbb')

    // 触发 "取消 输入框" 事件
    await inputEle.trigger('keyup.esc')

    // 验证 "字段" 没有被修改
    expect(wrapper.vm.todo.text).toBe(textBackup)
    // 验证 "编辑 状态" 被取消
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  // 删除 "编辑中的（列表）todo成员"
  // 实际上就是：在编辑时，清空文字。这种操作，相当于 "删除 todo成员"
  test.skip('delete edit todo', async () => {})

  // 快照
  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
