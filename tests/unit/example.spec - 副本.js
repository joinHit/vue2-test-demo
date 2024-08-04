import HelloWorld from '@/components/HelloWorld.vue'
import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
