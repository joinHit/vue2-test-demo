import ChildComponent from '@/components/ChildComponent'
import ParentComponent from '@/components/ParentComponent'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted123", async () => {
    const wrapper = mount(ParentComponent)
    await wrapper.getComponent(ChildComponent).vm.$emit('custom', '666')

    /** 输出：
     *  <div>
     *      <div><button>点击</button></div>
     *      <p>Emitted!</p> <span>666</span>
     *  </div>
     */
    console.log(wrapper.html())

    expect(wrapper.html()).toContain('Emitted!')
  })
})
