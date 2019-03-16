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

  { path: '/register', component: () => import('@/views/register/register'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      roles: ['AD']
    },
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
      icon: 'documentation',
      roles: ['AD']
    },
    children: [
      {
        path: 'shopList',
        component: () => import('@/views/shop/shopList'),
        name: 'shopList',
        meta: { title: 'shopList', icon: 'documentation' }
      },
      {
        path: 'shopEdit',
        component: () => import('@/views/shop/shopEdit'),
        name: 'shopEdit',
        meta: { title: '店铺编辑', icon: 'documentation' }
      },
      {
        path: 'reviewShop',
        component: () => import('@/views/shop/reviewShopList'),
        name: 'reviewShop',
        meta: { title: 'reviewShop', icon: 'documentation' }
      },
      {
        path: 'settlementList',
        component: () => import('@/views/shop/settlementList'),
        name: 'settlementList',
        meta: { title: '结算账单', icon: 'documentation' }
      }]
  },

  {
    path: '/goodsBack',
    component: Layout,
    meta: {
      title: 'goodsBack',
      icon: 'form',
      roles: ['AD']
    },
    children: [
      {
        path: 'GoodsBackList',
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
        path: 'brandBackClasslist',
        component: () => import('@/views/goodsBack/brandBackClasslist'),
        name: 'brandBackClasslist',
        meta: { title: 'brandBackClasslist', icon: 'list' }
      },
      {
        path: 'specBacklist/01',
        component: () => import('@/views/goodsBack/specBacklist'),
        name: 'newSpecBacklist',
        meta: { title: 'newSpecBacklist', noCache: true, icon: 'example' }
      },
      {
        path: 'specBacklist/02',
        component: () => import('@/views/goodsBack/specBacklist'),
        name: 'oldSpecBacklist',
        meta: { title: 'oldSpecBacklist', noCache: true, icon: 'example' }
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
      title: '订单管理后台',
      icon: 'documentation',
      roles: ['AD']
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/order/orderList'),
        name: 'orderList',
        meta: { title: '订单管理后台', icon: 'theme' }
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        name: 'orderDetail',
        hidden: true,
        meta: { title: 'orderDetail' }
      }]
  },
  {
    path: '/report',
    component: Layout,
    meta: {
      title: '报表中心',
      icon: 'report',
      roles: ['AD']
    },
    children: [{
      path: 'customerReport',
      component: () => import('@/views/report/customerReport'),
      name: 'customerReport',
      meta: { title: '会员报表', icon: 'report' }
    }]
  },

  {
    path: '',
    component: Layout,
    redirect: '/bfdashboard',
    meta: {
      roles: ['SD']
    },
    children: [{
      path: 'bfdashboard',
      component: () => import('@/views/bf/dashboard/index'),
      name: 'bfdashboard',
      meta: { title: 'dashboard', img: process.env.RESOURCE_URL + '/favicon.jpg', noCache: true }
    }]
  },

  {
    path: '/bf/gm',
    component: Layout,
    redirect: '/bf/gm/goodsList/01',
    meta: {
      title: 'goodsManagement',
      icon: 'goods',
      roles: ['SD']
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
      path: 'editGoods/01',
      component: () => import('@/views/bf/goods/editGoods'),
      name: 'editNewGoods',
      meta: { title: 'editNewGoods', icon: 'people' }
    },
    {
      path: 'editGoods/02',
      component: () => import('@/views/bf/goods/editGoods'),
      name: 'editOldGoods',
      meta: { title: 'editOldGoods', icon: 'people' }
    },
    {
      path: 'forecast',
      component: () => import('@/views/bf/goods/forecast'),
      name: 'forecast',
      meta: { title: '价格预测', icon: 'drag' }
    },
    {
      path: 'forecastMain',
      component: () => import('@/views/bf/goods/forecastMain'),
      name: 'forecastMain',
      meta: { title: '预测属性', icon: 'drag' }
    },
    {
      path: 'lableGoods',
      component: () => import('@/views/bf/goods/lableGoods'),
      name: 'lableGoods',
      meta: { title: '标签商品', icon: 'drag' }
    },
    {
      path: 'lable',
      component: () => import('@/views/bf/goods/lable'),
      name: 'lable',
      meta: { title: 'lable', icon: 'drag' }
    }]
  },

  // {
  //   path: '/bf/cm',
  //   component: Layout,
  //   redirect: '/bf/cm/couponList',
  //   meta: {
  //     title: 'couponManagement',
  //     icon: 'goods',
  //     roles: ['AD']
  //   },
  //   children: [{
  //     path: 'couponBfList',
  //     component: () => import('@/views/bf/coupon/couponList'),
  //     name: 'couponBfList',
  //     meta: { title: '优惠券管理', icon: 'component', noCache: true }
  //   }]
  // },

  {
    path: '/bf/od',
    component: Layout,
    redirect: '/bf/od/list',
    meta: {
      title: 'order',
      icon: 'documentation',
      roles: ['SD']
    },
    children: [
      {
        path: 'orderBfList',
        component: () => import('@/views/bf/order/orderList'),
        name: 'orderBfList',
        meta: { title: 'orderList', icon: 'theme' }
      },
      {
        path: 'orderBfReturnList',
        component: () => import('@/views/bf/order/orderReturnList'),
        name: 'orderBfReturnList',
        meta: { title: 'orderReturnList', icon: 'theme' }
      },
      {
        path: 'orderBfDetail',
        component: () => import('@/views/bf/order/orderDetail'),
        name: 'orderBfDetail',
        hidden: true,
        meta: { title: 'orderDetail' }
      },
      {
        path: 'invoiceBf',
        component: () => import('@/views/bf/order/invoice'),
        name: 'invoiceBf',
        meta: { title: '发票', icon: 'theme' }
      }]
  },
  {
    path: '/bf/coupon',
    component: Layout,
    meta: {
      title: 'couponManagement',
      icon: 'goods',
      roles: ['SD']
    },
    children: [{
      path: 'couponList',
      component: () => import('@/views/coupon/couponList'),
      name: 'couponList',
      meta: { title: '优惠券后台', icon: 'component', noCache: true }
    }]
  },

  {
    path: '/bf/shop',
    component: Layout,
    redirect: '/bf/shop/setting',
    meta: { title: '店铺管理', icon: 'theme', roles: ['SD'] },
    children: [{
      path: 'bfSetting',
      component: () => import('@/views/bf/shop/setting'),
      name: 'bfSetting',
      meta: { title: '店铺设置', icon: 'theme' }
    },
    {
      path: 'bfSettlementList',
      component: () => import('@/views/bf/shop/settlementList'),
      name: 'bfSettlementList',
      meta: { title: '结算账单', icon: 'theme' }
    },
    {
      path: 'resourceImgs',
      component: () => import('@/views/bf/resource/imgList'),
      name: 'resourceImgs',
      meta: { title: 'Banner设置', icon: 'theme' }
    }]
  },
  {
    path: '/bf/news',
    component: Layout,
    redirect: '/bf/news/imNews',
    meta: { title: '消息管理', icon: 'theme', roles: ['SD'] },
    children: [{
      path: 'bfImNews',
      component: () => import('@/views/bf/news/imNews'),
      name: 'bfImNews',
      meta: { title: 'IM消息', icon: 'theme' }
    },
    {
      path: 'bfComment',
      component: () => import('@/views/bf/news/comment'),
      name: 'bfComment',
      meta: { title: '评论', icon: 'theme' }
    }]
  },
  {
    path: '/um',
    component: Layout,
    redirect: '/um/userList',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'userManagement',
      icon: 'people',
      roles: ['AD']
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
      path: 'roleList',
      component: () => import('@/views/user/role/roleList'),
      name: 'roleList',
      meta: { title: '角色列表' }
    },
    {
      path: 'changePwd',
      component: () => import('@/views/user/basic/changePwd'),
      hidden: true,
      name: 'changePwd',
      meta: { title: 'changePwd' }
    },
    {
      path: 'suggestionList',
      component: () => import('@/views/user/basic/suggestionList'),
      name: 'suggestionList',
      meta: { title: 'suggestionList' }
    }]
  },

  {
    path: '/sys',
    component: Layout,
    meta: { title: 'sys', icon: 'documentation', roles: ['AD'] },
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
        path: 'homeLabel',
        component: () => import('@/views/config/homeLabel'),
        name: 'homeLabel',
        meta: { title: '首页标签配置' }
      },
      {
        path: 'statementList',
        component: () => import('@/views/statement/statementList'),
        name: 'statementList',
        meta: { title: 'statementList' }
      },
      // {
      //   path: 'resourceImgs',
      //   component: () => import('@/views/resource/imgList'),
      //   name: 'resourceImgs',
      //   meta: { title: 'resourceImgs' }
      // },
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
      },
      {
        path: 'dataBase',
        component: () => import('@/views/dataBase/index'),
        name: 'dataBase',
        meta: { title: '数据库' }
      }]
  }
]

