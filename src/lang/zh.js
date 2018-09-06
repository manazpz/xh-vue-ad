export default {
  route: {
    ms: '管理系统',
    dashboard: '首页',
    logoUpload: 'LOGO上传',
    avatarUpload: '头像上传',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    i18n: '国际化',
    userManagement: '用户管理',
    user: '用户管理',
    goodsBack: '商品后台管理',
    goodsBackList: '商品列表',
    classifyBackList: '商品分类',
    brandBacklist: '商品品牌',
    specBacklist: '商品规格',
    specBackValueList: '商品规格值',
    orderList: '订单列表',
    changePwd: '修改密码',
    userList: '用户列表',
    permissionList: '权限列表',
    assignPermissions: '分配权限',
    assignRole: '分配角色',
    webSwitch: 'web站点',
    // 商家端
    goodsManagement: '商品管理',
    goodsList: '商品列表',
    recycleGoodsList: '商品回收站',
    sendGoods: '发布商品',
    editGoods: '编辑商品',
    lable: '标签'
    // 商家端
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    screenfull: '全屏',
    changePwd: '修改密码',
    headImg: '上传头像',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    usernameerror: '用户名不为空！！！',
    passworderror: '密码至少6位！！！'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限',
    type: '触发类型',
    module: '模块',
    name: '名称',
    depict: '描述',
    extend: '过滤条件',
    createTime: '创建时间'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  user: {
    nickName: '昵称',
    userName: '用户名',
    password: '密码',
    phone: '手机号',
    name: '名字',
    idCard: '身份证',
    statusName: '身份',
    createTime: '创建时间',
    updateTime: '修改时间',
    changePwd: '修改密码',
    resetPwd: '重置密码',
    oldPwd: '旧密码',
    newPwd: '新密码',
    save: '保存'
  },
  table: {
    no: '序号',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    recovery: '恢复',
    delete: '删除',
    noEnable: '无效',
    save: '保存',
    cancel: '取 消',
    confirm: '确 定',
    name: '名字',
    type: '类型',
    on: '开启',
    off: '关闭',
    createTime: '创建时间',
    updateTime: '修改时间',
    stock: '库存',
    xj: '下架',
    sj: '上架'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
