<template>
  <div>
    <script :id="id" type="text/plain" ></script>
  </div>
</template>

<script>
  export default {
    name: 'UEditor',
    model: {
      prop: 'info',
      event: 'info'
    },
    props: {
      id: {
        type: String
      },
      config: {
        type: Object
      },
      info: ''
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      this.editor = window.UE.getEditor(this.id, this.config)
      var _this = this
      this.editor.addListener('blur', function() {
        _this.$emit('info', _this.editor.getContent())
      })
    },
    destoryed() {
      this.editor.destory()
    },
    methods: {
      getUEContent: function() {
        return this.editor.getContent()
      }
    }
  }
</script>
