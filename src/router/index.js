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
    path: '/shop',
    component: Layout,
    redirect: '/shop/list',
    meta: {
      title: 'shop',
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/shop/shopList'),
        name: 'shopList',
        meta: { title: 'shopList', icon: 'documentation' }
      },
      {
        path: 'reviewShop',
        component: () => import('@/views/shop/reviewShopList'),
        name: 'reviewShop',
        meta: { title: 'reviewShop', icon: 'documentation' }
      }]
  },

  {
    path: '/bf/gm',
    component: Layout,
    redirect: '/bf/gm/warehouseGoodsList',
    meta: {
      title: 'goodsManagement',
      icon: 'goods'
    },
    children: [{
      path: 'goodsList/01',
      component: () => import('@/views/bf/goods/goodsList'),
      name: 'newGoodsList',
      meta: { title: 'newGoodsList', icon: 'component', noCache: true }
    },
    {
      path: 'goodsList/02',
      component: () => import('@/views/bf/goods/goodsList'),
      name: 'oldGoodsList',
      meta: { title: 'oldGoodsList', icon: 'component', noCache: true }
    },
    {
      path: 'recycleGoodsList',
      component: () => import('@/views/bf/goods/recycleGoodsList'),
      name: 'recycleGoodsList',
      meta: { title: 'recycleGoodsList', icon: 'nested', noCache: true }
    },
    {
      path: 'editGoods',
      component: () => import('@/views/bf/goods/editGoods'),
      name: 'editGoods',
      meta: { title: 'editGoods', icon: 'people' }
    },
    {
      path: 'lable',
      component: () => import('@/views/bf/goods/lable'),
      name: 'lable',
      meta: { title: 'lable', icon: 'drag' }
    }]
  },
  {
    path: '/goodsBack',
    component: Layout,
    meta: {
      title: 'goodsBack',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goodsBack/goodsBackList'),
        name: 'GoodsBackList',
        meta: { title: 'GoodsBackList', icon: 'theme' }
      },
      {
        path: 'reviewGoods',
        component: () => import('@/views/goodsBack/reviewGoods'),
        name: 'reviewGoods',
        meta: { title: 'reviewGoods', icon: 'theme' }
      },
      {
        path: 'classifyBackList/01',
        component: () => import('@/views/goodsBack/classifyBackList'),
        name: 'newClassifyBackList',
        meta: { title: 'newClassifyBackList', icon: 'tab' }
      },
      {
        path: 'classifyBackList/02',
        component: () => import('@/views/goodsBack/classifyBackList'),
        name: 'oldClassifyBackList',
        meta: { title: 'oldClassifyBackList', icon: 'tab' }
      },
      {
        path: 'brandBacklist',
        component: () => import('@/views/goodsBack/brandBacklist'),
        name: 'brandBacklist',
        meta: { title: 'brandBacklist', icon: 'list' }
      },
      {
        path: 'specBacklist',
        component: () => import('@/views/goodsBack/specBacklist'),
        name: 'specBacklist',
        meta: { title: 'specBacklist', noCache: true, icon: 'example' }
      },
      {
        path: 'specBackValueList',
        component: () => import('@/views/goodsBack/specBackValueList'),
        name: 'specBackValueList',
        hidden: true,
        meta: { title: 'specBackValueList', noCache: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: {
      title: 'order',
      icon: 'documentation'
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/order/orderList'),
        name: 'orderList',
        meta: { title: 'orderList', icon: 'theme' }
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        name: 'orderDetail',
        hidden: true,
        meta: { title: 'orderDetail' }
      }]
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
      path: 'customerList',
      component: () => import('@/views/user/basic/customerList'),
      name: 'customerList',
      meta: { title: '会员列表' }
    },
    {
      path: 'customerDetail',
      component: () => import('@/views/user/basic/customerDetail'),
      name: 'customerDetail',
      hidden: true,
      meta: { title: '会员详情' }
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
    }]
  },
  {
    path: '/sys',
    component: Layout,
    meta: { title: 'sys', icon: 'documentation' },
    redirect: '/sys/statementList',
    children: [
      {
        path: 'configuration',
        component: () => import('@/views/config/configuration'),
        name: 'configuration',
        meta: { title: '配置表' }
      },
      {
        path: 'thirdParty',
        component: () => import('@/views/config/thirdParty'),
        name: 'thirdParty',
        meta: { title: '第三方平台配置' }
      },
      {
        path: 'statementList',
        component: () => import('@/views/statement/statementList'),
        name: 'statementList',
        meta: { title: 'statementList' }
      },
      {
        path: 'resourceImgs',
        component: () => import('@/views/resource/imgList'),
        name: 'resourceImgs',
        meta: { title: 'resourceImgs' }
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
      },
      {
        path: 'recovery',
        component: () => import('@/views/user/basic/recovery'),
        name: 'recovery',
        meta: { title: 'recovery' }
      },
      {
        path: 'smsList',
        component: () => import('@/views/sms/smsList'),
        name: 'smsList',
        meta: { title: 'smsList' }
      }]
  }
]

