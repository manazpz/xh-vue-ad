<template>
  <div class="step1">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card>
          <el-table :key='0' :data="classifyCascades1" :row-class-name="tableRowClassName"
                    :row-style="selectedHighlight1" @row-click="rowClick1" :header-cell-style="selectHeadStyle" >
            <el-table-column label="一级分类">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col v-if="isShow2" :span="8">
        <el-card>
          <el-table :data="classifyCascades2" :row-class-name="tableRowClassName"
                    :row-style="selectedHighlight2" @row-click="rowClick2" :header-cell-style="selectHeadStyle">
            <el-table-column label="二级分类">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col v-if="isShow3" :span="8">
        <el-card>
          <el-table :data="classifyCascades3" :row-class-name="tableRowClassName"
                    :row-style="selectedHighlight3" @row-click="rowClick3" :header-cell-style="selectHeadStyle">
            <el-table-column label="三级分类">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24"><div style="background: #FFF8DC;padding: 10px">
        <span>您当前选择的商品类别是： {{text}}</span>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
  import { classifyCascade } from '@/api/goods/goods'
  export default {
    name: 'step1',
    model: {
      prop: 'classify',
      event: 'classify'
    },
    props: {
      classify: ''
    },
    data() {
      return {
        preStep: true,
        nextStep: false,
        publish: false,
        classifyCascades1: !this.classify ? [] : this.classify.history.classifyCascades1,
        classifyCascades2: !this.classify ? [] : this.classify.history.classifyCascades2,
        classifyCascades3: !this.classify ? [] : this.classify.history.classifyCascades3,
        isShow2: !this.classify ? false : this.classify.history.isShow2,
        isShow3: !this.classify ? false : this.classify.history.isShow3,
        getIndex1: !this.classify ? -1 : this.classify.history.getIndex1,
        getIndex2: !this.classify ? -1 : this.classify.history.getIndex2,
        getIndex3: !this.classify ? -1 : this.classify.history.getIndex3,
        step: 1,
        text: !this.classify ? '' : this.classify.history.text
      }
    },
    created() {
      this.getClassifyCascade()
    },
    methods: {
      getClassifyCascade() {
        if (this.classifyCascades1.length < 1) {
          classifyCascade().then(response => {
            this.classifyCascades1 = response.data.items
          })
        }
      },
      handlePreStep() {
        this.step--
        this.goStep(this.step)
        // $('html,body').animate({scrollTop:0},500);
      },
      handleNextStep() {
        this.step++
        this.goStep(this.step)
        // $('html,body').animate({scrollTop:0},500);
      },
      handlePublish() {
        console.log('发布')
      },
      goStep(n) {
        switch (n) {
          case 1 :
            this.preStep = false
            this.nextStep = true
            this.publish = false
            break
          case 2 :
            this.preStep = true
            this.nextStep = true
            this.publish = false
            break
          case 3 :
            this.preStep = true
            this.nextStep = false
            this.publish = true
            break
        }
      },
      selectHeadStyle({ row, column, rowIndex, columnIndex }) {
        return {
          'color': 'rgb(250, 195, 100',
          'font-size': '18px',
          'text-align': 'center'
        }
      },
      tableRowClassName({ row, rowIndex }) {
        row.index = rowIndex
      },
      selectedHighlight1({ row, rowIndex }) {
        if ((this.getIndex1) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      selectedHighlight2({ row, rowIndex }) {
        if ((this.getIndex2) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      selectedHighlight3({ row, rowIndex }) {
        if ((this.getIndex3) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      rowClick1(row) {
        if (row.children.length > 0) {
          this.isShow2 = true
        } else {
          this.isShow2 = false
          this.isShow3 = false
          this.getIndex2 = -1
          this.getIndex3 = -1
        }
        this.text = row.name
        this.getIndex1 = row.index
        this.classifyCascades2 = row.children
        this.$emit('classify', '')
      },
      rowClick2(row) {
        if (row.children.length > 0) {
          this.isShow3 = true
        } else {
          this.isShow3 = false
          this.getIndex3 = -1
        }
        this.text = this.text.split('>')[0] + ' > ' + row.name
        this.getIndex2 = row.index
        this.classifyCascades3 = row.children
        this.$emit('classify', '')
      },
      sendHistoryData(row) {
        row.history = {}
        row.history.isShow2 = this.isShow2
        row.history.isShow3 = this.isShow3
        row.history.classifyCascades1 = this.classifyCascades1
        row.history.classifyCascades2 = this.classifyCascades2
        row.history.classifyCascades3 = this.classifyCascades3
        row.history.getIndex1 = this.getIndex1
        row.history.getIndex2 = this.getIndex2
        row.history.getIndex3 = this.getIndex3
        row.history.text = this.text
      },
      rowClick3(row) {
        this.Index3 = row.index
        this.text = this.text.split('>')[0] + ' > ' + this.text.split('>')[1] + ' > ' + row.name
        this.getIndex3 = row.index
        this.sendHistoryData(row)
        this.$emit('classify', row)
      }
    }
  }
</script>

