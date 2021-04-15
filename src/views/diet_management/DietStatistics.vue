<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" ref="dataForm" :model="dataForm" @submit.native.prevent>
          <el-tag style="font-size: 18px;margin-right: 5px" type="warning">可选属性:</el-tag>
          <el-form-item>

            <el-date-picker
              v-model="dataForm.date"
              type="date"
              :style="{width: '50%'}"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
            <el-select v-model="dataForm.type" placeholder="供应类型" clearable
                       :style="{width: '30%',marginLeft:'5px'}">
              <el-option v-for="(item, index) in supplyTypeOptions" :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="getData()">查询</el-button>
          </el-form-item>

        </el-form>

        <div v-if="foodQuantityList.tags.length<=0" style="text-align: center;margin-top: 220px">
          <span style="font-family: Lexend-B,sans-serif;font-size: 160px;color: rgba(231,231,231,0.66)">No Data!</span>

        </div>
        <el-row v-for="item in tags" style="margin-bottom: 40px">
          <el-table
            :data="foodQuantityList[item]"
            border
            stripe
            fit
            tooltip-effect="dark"
            :header-cell-style="{'text-align':'center','height':'80px','background-color':'#e3e3e3','font-size':'22px','color':'#6f6f6f'}"
            :cell-style="{'text-align':'center','height':'60px','font-size':'18px'}"
          >
            <el-table-column
              prop="foodname"
              header-align="center"
              align="center"
              :label="item">
            </el-table-column>
            <el-table-column
              prop="quantity"
              header-align="center"
              align="center"
              label="数量">
            </el-table-column>

          </el-table>
        </el-row>


      </div>
    </div>
  </div>
</template>

<script>
import food from '@/generator_template/generator/food'

export default {
  name: 'DietStatistics',
  data: () => {
    return {
      dataForm: {
        date: '',
        type: '',
      },
      supplyTypeOptions: [{
        'label': '早餐',
        'value': 1,
        'tag': 'success',
      }, {
        'label': '午餐',
        'value': 2,
        'tag': 'primary'
      }, {
        'label': '晚餐',
        'value': 3,
        'tag': 'warning'
      }],
      foodQuantityList: [],
      tags: [],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.post('/food/get-quantity', this.dataForm).then(res => {
        if (res.data) {
          console.log(res.data)
          this.foodQuantityList = res.data
          this.tags = res.data['tags']
        }
      })
    }
  }
}
</script>

<style scoped="scoped">
@import "../../styles/mix.scss";

#app {
}
</style>
