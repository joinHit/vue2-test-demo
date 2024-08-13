import TodoFooter from '@/components/TodoApp/TodoFooter.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'

// 在当前文件里创建 "本地vue"，因此，不会影响别的文件
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  // 因为在 "路由注册" 中有该配置，所以jest中，也要加上该配置
  linkActiveClass: 'selected'
})

describe('', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

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

  beforeEach(() => {
    wrapper = mount(TodoFooter, {
      propsData: {
        todoList: JSON.parse(JSON.stringify(todoList1))
      },
      localVue,
      router
    })
  })

  test('done todo count', () => {
    const count = wrapper.vm.todoList.filter((item) => !item.done).length
    const doneTodoCountEle = wrapper.find(
      'strong[data-testid="done-todo-count"]'
    )
    expect(Number.parseInt(doneTodoCountEle.text())).toBe(count)
  })

  test('show clear completed button', async () => {
    let clearCompletedBtn = wrapper.find(
      'button[data-testid="clear-completed"]'
    )

    /** 1、显示 "clear completed button"
     * 因为 "beforeEach 函数" 里，有一个 "completed" 的 "todo项"
     *
     * 备注：
     *  "（html中的）v-if" 对应 "（jest中的）clearCompletedBtn.exists()"
     *  "（html中的）v-show" 对应 "（jest中的）clearCompletedBtn.isVisible()"
     */
    expect(clearCompletedBtn.exists()).toBeTruthy()

    // +++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++

    // 2、隐藏 "clear completed button"

    /* // 2.1、此种方法行不通，因为 todoList 是 "当前组件的 props属性"
    // "vue官方" 是不允许直接修改 "props属性" 的

    // 清除所有任务的完成状态，判断 "clear completed button" 不存在
    wrapper.vm.todoList.forEach((item) => {
      item.done = false
    })
    await Vue.nextTick()
    expect(clearCompletedBtn.exists()).toBeFalsy() */

    // 2.2 重新挂载 "props属性"（当前方法ok）
    // 新的挂载数据
    const todoList2 = todoList1.map((item) => ({
      ...item,
      done: false
    }))

    /** 此处也需要挂载 "localVue 和 router"，也需要改为 "mount"
     *
     * 因为
     * 1、"前面的 shallowMount" 挂载了 "localVue 和 router"
     * 2、"前面的 shallowMount" 改为了 "mount"
     * 为了不出差错，保持前后 一致/统一
     */
    wrapper = mount(TodoFooter, {
      propsData: {
        todoList: todoList2
      },
      localVue,
      router
    })
    // 重新挂载后，需要重新查找元素（不能使用 "挂载前 定义的变量"）
    clearCompletedBtn = wrapper.find('button[data-testid="clear-completed"]')
    expect(clearCompletedBtn.exists()).toBeFalsy()
  })

  test('click clear completed button', async () => {
    const clearCompletedBtn = wrapper.find(
      'button[data-testid="clear-completed"]'
    )
    await clearCompletedBtn.trigger('click')

    expect(wrapper.emitted()['clear-completed']).toBeTruthy()
  })

  // 路由激活样式类名
  test('router link activeClass', async () => {
    // 找到所有 "router-link 标签的" 元素
    const linkEles = wrapper.findAllComponents({ name: 'RouterLink' })

    // 1、假设路由为 "/active"（即：点击 "Active 按钮" 后跳转的页面）
    router.push('/active')
    /** 使用 "本地的vue（即：localVue）"
     *
     * 因为前面路由刚刚push（即：路由跳转），
     * 此时页面还没来得及更新，所以需要加上这句 await localVue.nextTick()
     */
    await localVue.nextTick()

    for (let i = 0, len = linkEles.length; i < len; i++) {
      // 每一项 "router-link 标签的" 元素
      const itemWrapper = linkEles.at(i)

      if (itemWrapper.vm.to === '/active') {
        /** 输出
         * <a href="#/active" class="router-link-exact-active selected"
         *    aria-current="page">Active</a>
         * 备注：此时使用的是 "mount 挂载"
         *
         *
         * 如果使用 "shallowMount 挂载"，那么就会输出：
         * <router-link-stub to="/active" tag="a" exact="true"
         *    ariacurrentvalue="page" event="click">Active</router-link-stub>
         * 但这样拿不到 "classes() 方法"，无法断言class了
         * 所以需要改为使用 "mount 挂载"
         */
        // console.log(itemWrapper.html())
        expect(itemWrapper.classes()).toContain('selected')
      } else {
        expect(itemWrapper.classes('selected')).toBeFalsy()
      }
    }

    // ++++++++++++++++++

    // 2、假设路由为 "/completed"（即：点击 "Completed 按钮" 后跳转的页面）
    router.push('/completed')
    await localVue.nextTick()

    for (let i = 0, len = linkEles.length; i < len; i++) {
      const itemWrapper = linkEles.at(i)

      if (itemWrapper.vm.to === '/completed') {
        expect(itemWrapper.classes()).toContain('selected')
      } else {
        expect(itemWrapper.classes('selected')).toBeFalsy()
      }
    }

    // ++++++++++++++++++

    // 3、假设路由为 "/"（即：点击 "All 按钮" 后跳转的页面）
    router.push('/')
    await localVue.nextTick()

    for (let i = 0, len = linkEles.length; i < len; i++) {
      const itemWrapper = linkEles.at(i)

      if (itemWrapper.vm.to === '/') {
        expect(itemWrapper.classes()).toContain('selected')
      } else {
        expect(itemWrapper.classes('selected')).toBeFalsy()
      }
    }
  })

  // 快照
  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
