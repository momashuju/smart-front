import Vue from 'vue'
import Router from 'vue-router'
import TaskInfo from '@/components/Common/TaskInfo'
import Login from '@/components/Login'
import User from '@/components/User/User'
import Admin from '@/components/Admin/Admin'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path:"/taskinfo",
      name:'TaskInfo',
      component:TaskInfo
    }
  ]
})
