import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserPage from '@/components/UserPage'
import WorkHistory from '@/components/WorkHistory'
import WorkSpace from '@/components/WorkSpace'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WorkSpace',
      component: WorkSpace
    },
    {
      path: '/user',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/workhistory',
      name: 'WorkHistory',
      component: WorkHistory
    },
    {
      path: '/workspace',
      name: 'WorkSpace',
      component: WorkSpace
    }
  ]
})
