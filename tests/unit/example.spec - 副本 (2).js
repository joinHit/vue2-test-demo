import HelloWorld from '@/components/HelloWorld.vue'
import { expect, test } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
// import Vue from "vue";

test('HelloWorld.vue toMatch', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: '你好'
    }
  })

  const emitBtn2 = wrapper.find('[data-emitid="btn2"]')

  //  输出  [Object: null prototype] {}
  console.log(wrapper.emitted())

  await emitBtn2.trigger('click')

  //  输出  [Object: null prototype] { emitEvent: [ [ 123 ] ] }
  //  "对象的值 (即: [ [ 123 ] ])" 为何是数组呢？
  //  因为可以模拟多次点击，所以jest里采用了数组存储的方式
  console.log(wrapper.emitted())

  //  判断 "自定义的 emitEvent事件" 是否被调用过
  //  也就是 判断是否有值
  //  即：如果有值，那么就代表（向 "父组件" 传递的） "自定义的 emitEvent事件" 被调用过
  expect(wrapper.emitted().emitEvent).toBeTruthy()

  // 判断 "自定义的 emitEvent事件" 传的值，是否正确
  expect(wrapper.emitted().emitEvent[0][0]).toBe(123)
})
