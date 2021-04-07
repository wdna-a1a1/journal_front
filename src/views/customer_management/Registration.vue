<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input class="el-input-long" v-model="dataForm.key" placeholder="输入关键搜索" clearable></el-input>
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
        @selection-change="selectionChangeHandle"
        stripe
        fit
        tooltip-effect="dark"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center','height':'60px'}"
        style="width: 100%;margin-top:40px;margin-bottom: 20px"
      >
        <el-table-column
          prop="id"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="isDeleted"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="customerName"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="customerAge"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="customerSex"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="idcard"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="roomNumber"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="buildingId"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="recordId"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="elderType"
          header-align="center"
          align="center"
          label="活力老人">
        </el-table-column>
        <el-table-column
          prop="checkinDate"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="expirationDate"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="contactTel"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="bedId"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="psychosomaticState"
          header-align="center"
          align="center"
          label="精神状况">
        </el-table-column>
        <el-table-column
          prop="attention"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="birthday"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="height"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="maritalStatus"
          header-align="center"
          align="center"
          label="婚姻状况">
        </el-table-column>
        <el-table-column
          prop="weight"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="bloodType"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          prop="filepath"
          header-align="center"
          align="center"
          label="">
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total,  prev, pager, next,sizes">
      </el-pagination>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>


<script>
import AddOrUpdate from './children-template/customer-add-or-update'

export default {
  name: 'Registration',
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
  components: {
    AddOrUpdate
  },
  activated() {
    //this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$axios.post('', this.$qs.stringify({})).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
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
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('', this.$qs.stringify({}))
          .then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
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
