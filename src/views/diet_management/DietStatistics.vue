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
                       :style="{marginLeft:'5px'}">
              <el-option v-for="(item, index) in supplyTypeOptions" :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="chartsType" placeholder="请选择" @change="triggerType">
              <el-option
                v-for="item in chartsSelections"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="getData()"><i class="el-icon-search"></i> 查询</el-button>
          </el-form-item>

        </el-form>

        <div v-if="foodQuantityList.tags.length<=0" style="text-align: center;margin-top: 220px">
          <span style="font-family: Lexend-B,sans-serif;font-size: 160px;color: rgba(231,231,231,0.66)">No Data!</span>

        </div>
        <div>

          <el-row>
            <el-col :xs="24" :sm="24" :lg="11" v-for="item in tags"
                    style="margin:0 2% 40px 2%;border-radius: 9px;border: 4px dashed #f8f8f8">
              <div>
                <food-statistics-charts :charts-type="chartsType" :chart-data="handleData(foodQuantityList[item])"
                                        ref="foodStatisticsCharts" :title="item"></food-statistics-charts>
              </div>
            </el-col>
          </el-row>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
import FoodStatisticsCharts from '@/components/Charts/FoodStatisticsCharts'

export default {
  name: 'DietStatistics',
  components: { FoodStatisticsCharts },
  data: () => {
    return {
      dataForm: {
        date: '',
        type: '',
      },
      debounce: false,
      chartsType: 'pie',
      chartsSelections: [
        {
          'label': '饼图',
          'value': 'pie',

        }, {
          'label': '柱状图',
          'value': 'bar',

        }, {
          'label': '折线图',
          'value': 'line',

        }
      ],
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
          this.foodQuantityList = res.data
          this.tags = res.data['tags']
          this.flush()
        }
      })
    },
    handleData (val) {
      if (this.chartsType === 'bar' || this.chartsType === 'line') {
        let data = [[], []]
        val.forEach(item => {
          data[0].push(item.foodname)
          data[1].push(item.quantity)
        })
        return data
      } else if (this.chartsType === 'pie') {
        let data = []
        val.forEach(item => {
          data.push({ name: item.foodname, value: item.quantity })
        })
        return data
      } else {
      }

    },
    triggerType () {
      this.flush()
    },
    flush () {
      this.$nextTick(() => {
        for (var i = 0; i < this.tags.length; i++) {
          this.$refs.foodStatisticsCharts[i].initChart()
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
