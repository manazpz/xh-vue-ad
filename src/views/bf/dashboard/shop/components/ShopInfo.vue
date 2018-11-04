<template>
  <el-row style="padding-bottom: 5px">
    <el-col :span="2">
      <img v-if="info.img != null" :src=" info.img " style="width: 100px;height: 100px">
    </el-col>
    <el-col :span="19">
      <p>no.{{info.no}}</p>
      <p>{{info.name}}</p>
      <p>{{info.address}}</p>
      <p>{{info.phone}}</p>
    </el-col>
    <el-col :span="3">
      <el-rate
        v-model="info.credit"
        disabled
        text-color="#ff9900">
      </el-rate>
      <p>{{info.foundingTime}}</p>
    </el-col>
  </el-row>
</template>

<script>
  import { shopInfo } from '@/api/shop/shop'
  import store from '@/store'
  export default {
    data() {
      return {
        info: {}
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        shopInfo().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getInfo()
            })
          }
          if (response.code === 200) {
            this.info = response.data.items[0]
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
