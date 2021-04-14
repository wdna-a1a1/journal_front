<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :rules="dataRule" ref="dataForm" :model="dataForm" @submit.native.prevent>
        <el-form-item prop="key">
          <el-tag style="font-size: 18px;margin-right: 5px" type="danger">必填属性:</el-tag>
          <el-input v-model="dataForm.key" @keyup.enter.native="getDataList(0)" class="el-input-middle"
                    placeholder="输入客户名搜索"/>
        </el-form-item>
        <el-form-item>
          <el-tag style="font-size: 18px;margin-right: 5px" type="warning">可选属性:</el-tag>
          <el-select v-model="dataForm.date" placeholder="供应星期" clearable :style="{width: '30%'}">
            <el-option v-for="(item, index) in supplyDateOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="dataForm.type" placeholder="供应类型" clearable
                     :style="{width: '30%',marginLeft:'5px'}">
            <el-option v-for="(item, index) in supplyTypeOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()">新增
          </el-button>
        </el-form-item>

      </el-form>
      <el-table
        :data="dataList"
        border
        stripe
        fit
        max-height="640px"
        tooltip-effect="dark"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center','height':'60px'}"
        style="margin-top:40px;margin-bottom: 20px"
        @selection-change="selectionChangeHandle"
      >
        <el-table-column
          prop="id"
          header-align="center"
          align="center"
          width="80px"
          label="序号"
        />
        <el-table-column
          prop="customerName"
          header-align="center"
          align="center"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="customerSex"
          header-align="center"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="customerAge"
          header-align="center"
          align="center"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="foodid"
          header-align="center"
          align="center"
          label="膳食ID (点击查看详细)">
          <template slot-scope="scope">
            <el-popover
              trigger="click"
              visible-arrow="false"
              @show="getFoodInfo(scope.row.foodid)"
            >
              <el-table :data="foodInfo" v-loading="vloading" :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center','height':'60px'}">
                <el-table-column width="150" property="foodname" label="膳食名称"></el-table-column>
                <el-table-column width="100" property="foodtype" label="膳食类型"></el-table-column>
                <el-table-column width="100" property="foodlabel" label="膳食标签"></el-table-column>
                <el-table-column width="100" property="foodprice" label="膳食价格"></el-table-column>
                <el-table-column width="100" property="isMuslim" label="是否清真"></el-table-column>
                <el-table-column width="100" property="supplyDate" label="供应日期"></el-table-column>
                <el-table-column width="100" property="supplyType" label="供应类型"></el-table-column>
                <el-table-column width="200" property="foodpic" label="膳食图片">
                  <template scope="r">
                    <el-image :src="r.row.foodpic" style="width: 80px;height: 80px" fit="cover"></el-image>
                  </template>
                </el-table-column>
              </el-table>

              <div slot="reference">
                <div class="text">{{ scope.row.foodid }}</div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="fooddate"
          header-align="center"
          align="center"
          label="膳食日期">

        </el-table-column>
        <el-table-column
          prop="foodweek"
          header-align="center"
          align="center"
          label="膳食星期">
          <template scope="r">
            {{ weekDay[parseInt(r.row.foodweek) - 1] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="likes"
          header-align="center"
          align="center"
          label="平时喜好">
        </el-table-column>
        <el-table-column
          prop="attention"
          header-align="center"
          align="center"
          label="注意事项:"
        />
        <el-table-column
          prop="remarks"
          header-align="center"
          align="center"
          label="备注">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="100"
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="position: relative;left: 5px"
              @click="addOrUpdateHandle(scope.row.id)"
            >修改
            </el-button>
            <el-button type="warning" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total,  prev, pager, next,sizes"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
      />
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList(1)"
                   :weekOptions="supplyDateOptions" :typeOptions="supplyTypeOptions"/>
  </div>
</template>

<script>
import AddOrUpdate from '@/views/diet_management/children-template/customerfood-add-or-update'

export default {
  name: 'DietManagement',
  components: {
    AddOrUpdate
  },
  data () {
    return {
      dataForm: {
        key: '',
        date: '',
        type: '',
      },
      dataRule: {
        key: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      dataList: [],
      foodInfo: [],
      weekDay: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天',],
      type: ['早餐', '午餐', '晚餐',],
      supplyDateOptions: [{
        'label': '星期一',
        'value': 1
      }, {
        'label': '星期二',
        'value': 2
      }, {
        'label': '星期三',
        'value': 3
      }, {
        'label': '星期四',
        'value': 4
      }, {
        'label': '星期五',
        'value': 5
      }, {
        'label': '星期六',
        'value': 6
      }, {
        'label': '星期日',
        'value': 7
      }],
      supplyTypeOptions: [{
        'label': '早餐',
        'value': 1
      }, {
        'label': '午餐',
        'value': 2
      }, {
        'label': '晚餐',
        'value': 3
      }],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      vloading: false
    }
  },
  mounted () {
    this.getDataList(1)
  },
  methods: {
    // 获取数据列表
    getDataList (pass) {
      if (pass === 1) {
        this.getData()
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.getData()
          }
        })
      }
    },
    getData () {
      this.$axios.post('/customer-food/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        name: this.dataForm.key,
        date: this.dataForm.date,
        type: this.dataForm.type
      }).then(({ data }) => {
        if (data) {
          console.log(data)
          this.dataList = data.list
          this.totalPage = data.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
    },
    getFoodInfo (id) {
      this.vloading = true
      this.foodInfo = []
      this.$axios.post('food/get-by-id', { id: id }, { headers: { showLoading: false } }).then(res => {
        if (res.data) {
          let temp = res.data.food
          temp.isMuslim = '1' ? '是' : '否'
          temp.supplyDate = this.weekDay[temp.supplyDate - 1]
          temp.supplyType = this.type[temp.supplyType - 1]

          let self = this
          setTimeout(() => {
            self.vloading = false
            self.foodInfo.push(temp)
          }, 500)

        }
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.post('/customer/del', { id })
          .then(({ data }) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
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
