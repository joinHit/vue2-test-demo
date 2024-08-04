import ChildComponent from '@/components/ChildComponent.vue'
import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'

describe('ChildComponent.vue', () => {
  it('show', async () => {
    const love = 'run!'

    const wrapper = shallowMount(ChildComponent, {
      propsData: {
        hobby: love
      }
    })

    /** 输出：
     *  <div><button>点击</button>
     *      <p>run!</p>
     *  </div>
     *
     */
    // console.log(wrapper.html())

    expect(wrapper.text()).toMatch('run!')
  })
})
