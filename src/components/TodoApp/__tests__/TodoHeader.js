import TodoHeader from '@/components/TodoApp/TodoHeader.vue'
import { shallowMount } from '@vue/test-utils'

describe('TodoHeader.vue', () => {
  it('new todo', async () => {
    const wrapper = shallowMount(TodoHeader)
    const inputEle = wrapper.find('input[data-testid="new-todo"]')

    // 设置 "input框 输入值"
    const text = 'play'
    await inputEle.setValue(text)

    // 触发 "回车" 事件
    await inputEle.trigger('keyup.enter')

    // 是否有触发 "emitted 事件"
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    // "emitted 事件" 的参数判断
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    // "回车" 后，是否清空了 "输入框的值"
    // 如果清空了的话，那 "输入框的值" 就应该是 "空字符串"
    expect(inputEle.element.value).toBe('')
  })
})
