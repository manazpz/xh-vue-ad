<template>
  <div class="components-container">

    <pan-thumb :image="image"></pan-thumb>

    <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">上传LOGO
    </el-button>

    <image-cropper :width="300" :height="300" :url="url" @close='close' @crop-upload-success="cropSuccess" langType="en"
                   :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
  </div>
</template>

<script>
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    name: 'avatarUpload-demo',
    components: { ImageCropper, PanThumb },
    data() {
      return {
        url: process.env.BASE_API + '/sys/uploadLoge',
        imagecropperShow: false,
        imagecropperKey: 0,
        image: process.env.RESOURCE_URL + '/favicon.jpg'
      }
    },
    methods: {
      cropSuccess(resData) {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
        this.image = resData.logo
        location.reload()
      },
      close() {
        this.imagecropperShow = false
      }
    }
  }
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

