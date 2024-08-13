import indexComponent from '@/components/TodoApp/indexComponent.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 新增的路由
  {
    path: '/',
    component: indexComponent
  },
  {
    path: '/active',
    component: indexComponent
  },
  {
    path: '/completed',
    component: indexComponent
  }
]

const router = new VueRouter({
  routes,
  /**
   * linkActiveClass 是模糊匹配
   * linkExactActiveClass 是精准匹配
   */
  linkActiveClass: 'selected'
})

export default router
