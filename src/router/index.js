import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },

  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', img: process.env.RESOURCE_URL + '/favicon.jpg', noCache: true }
    }]
  },

  {
    path: '/bf/gm',
    component: Layout,
    redirect: '/bf/gm/warehouseGoodsList',
    meta: {
      title: 'goodsManagement',
      icon: 'people'
    },
    children: [{
      path: 'warehouseGoodsList',
      component: () => import('@/views/bf/goods/warehouseGoodsList'),
      name: 'warehouseGoodsList',
      meta: { title: 'warehouseGoodsList', icon: 'people', noCache: true }
    },
    {
      path: 'sellGoodsList',
      component: () => import('@/views/bf/goods/sellGoodsList'),
      name: 'sellGoodsList',
      meta: { title: 'sellGoodsList', icon: 'people', noCache: true }
    },
    {
      path: 'recycleGoodsList',
      component: () => import('@/views/bf/goods/recycleGoodsList'),
      name: 'recycleGoodsList',
      meta: { title: 'recycleGoodsList', icon: 'people', noCache: true }
    },
    {
      path: 'editGoods',
      component: () => import('@/views/bf/goods/editGoods'),
      name: 'editGoods',
      onlyShow: true,
      meta: { title: 'editGoods', icon: 'people' }
    }]
  },
  {
    path: '/goodsBack',
    component: Layout,
    redirect: '/goodsBack/list',
    alwaysShow: true,
    meta: {
      title: 'goodsBack',
      icon: 'people'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goodsBack/goodsBackList'),
        name: 'goodsBackList',
        meta: { title: 'goodsBackList' }
      },
      {
        path: 'classifyBackList',
        component: () => import('@/views/goodsBack/classifyBackList'),
        name: 'classifyBackList',
        meta: { title: 'classifyBackList' }
      },
      {
        path: 'brandBacklist',
        component: () => import('@/views/goodsBack/brandBacklist'),
        name: 'brandBacklist',
        meta: { title: 'brandBacklist' }
      },
      {
        path: 'specBacklist',
        component: () => import('@/views/goodsBack/specBacklist'),
        name: 'specBacklist',
        meta: { title: 'specBacklist', noCache: true }
      },
      {
        path: 'specBackValueList',
        component: () => import('@/views/goodsBack/specBackValueList'),
        name: 'specBacklist',
        hidden: true,
        meta: { title: 'specBackValueList', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/um',
    component: Layout,
    redirect: '/um/userList',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'userManagement',
      icon: 'people',
      roles: ['AM', 'UM']
    },
    children: [{
      path: 'userList',
      component: () => import('@/views/user/basic/userList'),
      name: 'userList',
      meta: { title: 'userList' }
    },
    {
      path: 'permissionList',
      component: () => import('@/views/user/permission/permissionList'),
      name: 'permissionList',
      meta: { title: 'permissionList' }
    },
    {
      path: 'assignPermissions',
      component: () => import('@/views/user/permission/assignPermissions'),
      hidden: true,
      name: 'assignPermissions',
      meta: { title: 'assignPermissions' }
    },
    {
      path: 'changePwd',
      component: () => import('@/views/user/basic/changePwd'),
      hidden: true,
      name: 'changePwd',
      meta: { title: 'changePwd' }
    },
    {
      path: 'logoUpload',
      component: () => import('@/views/user/basic/logoUpload'),
      name: 'logoUpload',
      meta: { title: 'logoUpload' }
    },
    {
      path: 'webSwitch',
      component: () => import('@/views/user/basic/webSwitch'),
      name: 'webSwitch',
      meta: { title: 'webSwitch' }
    }]
  }
]

