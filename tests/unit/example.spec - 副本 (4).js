import ParentComponent from '@/components/ParentComponent'
import { describe, it } from '@jest/globals'
import { mount, shallowMount } from '@vue/test-utils'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted123", async () => {
    const shallowMountWrapper = shallowMount(ParentComponent)
    const mountWrapper = mount(ParentComponent)

    /** shallowMount 是浅渲染
     *
     * 输出
     * <div>
     *    <child-component-stub></child-component-stub>
     *    <!----> <span></span>
     * </div>
     */
    console.log(shallowMountWrapper.html())

    console.log('+++++++++++++++++++++++++++++++++++')

    /** mount 是深渲染（会将 "组件的html" 完整的渲染出来）
     *
     * 输出
     * <div>
     *    <div><button>点击</button></div>
     *    <!----> <span></span>
     * </div>
     */
    console.log(mountWrapper.html())
  })
})
