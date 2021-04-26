<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="dataForm.key" class="el-input-long" placeholder="输入关键搜索"
                    @keyup.enter.native="getDataList"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><i class="el-icon-search"></i> 查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 同步信息
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :cell-style="{'text-align':'center','height':'60px'}"
        :data="dataList"
        :header-cell-style="{'text-align':'center'}"
        border
        fit
        max-height="640px"
        stripe
        style="margin-top:40px;margin-bottom: 20px"
        tooltip-effect="dark"
        @selection-change="selectionChangeHandle"
      >
        <el-table-column
          align="center"
          header-align="center"
          label="序号"
          prop="id"
          width="80px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="客户姓名"
          prop="customerName"
          width="120px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="年龄"
          prop="customerAge"
          width="60px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="性别"
          prop="customerSex"
          width="60px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="身份证号"
          prop="idcard"
          width="180px"
        />

        <el-table-column
          align="center"
          header-align="center"
          label="房间号"
          prop="roomNumber"
          width="80px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="床位号"
          prop="bedIdName"
          width="80px"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="档案号"
          prop="recordId"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="老人类型"
          prop="elderType"
          width="100"

        >
          <template slot-scope="scope">
            {{ scope.row.elderType }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="入住时间"
          prop="checkinDate"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="合同到期时间"
          prop="expirationDate"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="联系电话"
          prop="contactTel"
        />

        <el-table-column
          align="center"
          header-align="center"
          label="注意事项:"
          prop="attention"
        />
        <el-table-column
          align="center"
          fixed="right"
          header-align="center"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">

            <el-button size="mini" type="warning" @click="deleteHandle(scope.row.id)"><i class="el-icon-delete"></i>
              查看护理记录
            </el-button>
            <el-button
              size="mini"
              style="position: relative;left: 5px"
              type="primary"
              @click="addOrUpdateHandle(scope.row)"
            ><i class="el-icon-edit"></i> 查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="totalPage"
        layout="total,  prev, pager, next,sizes"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
      />
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </div>
</template>

<script>
import AddOrUpdate from './children-template/customer-add-or-update'

export default {
  name: 'Registration',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    filter(value, row) {
      return row.elder_type === value
    },
    // 获取数据列表
    getDataList() {
      this.$axios.post('/customer/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        name: this.dataForm.key
      }).then(({data}) => {
        if (data) {
          console.log(data)
          this.dataList = data.list
          this.totalPage = data.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row, false)
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.post('/customer/del', {id})
          .then(({data}) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error("操作失败")
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
