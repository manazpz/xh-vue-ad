<template>
  <div class="app-container">

  </div>
</template>

<script>
  export default {
    name: 'imNews',
    directives: {
    },
    data() {
      return {
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        var tar = this
        this.$nextTick(function() {
          layui.use('layim', function() {
            // 建立WebSocket通讯
            var socket = new WebSocket('ws://localhost:8083?link=111111')
            var layim = layui.layim
            // 基础配置
            layim.config({
              brief: true, // 是否简约模式（如果true则不显示主面板）
              init: {
                // 设置我的基础信息
                mine: { 'username': '在线客服', 'id': '111111', 'status': 'online', 'remark': '', 'avatar': 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
                }
              }
            })
            socket.onmessage = function(res) {
              if (res.data !== '') {
                var data = JSON.parse(res.data)
                var fromid = data.fromid.split('[')[1].split(']')[0]
                layim.getMessage({
                  username: data.username, type: 'friend', avatar: data.avatar, id: fromid, content: data.content, time: data.time
                })
              }
            }
            layim.on('sendMessage', function(res) {
              var s = JSON.stringify(res)
              socket.send(s)
            })
          })
        })
      }
    }
  }
</script>
