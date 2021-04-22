<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="dataForm.key" @keyup.enter.native="getDataList" class="el-input-long" placeholder="输入关键搜索" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><i class="el-icon-search"></i> 查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 新增
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
          width="120px"
          label="客户姓名"
        />
        <el-table-column
          prop="customerAge"
          header-align="center"
          align="center"
          width="60px"
          label="年龄"
        />
        <el-table-column
          prop="customerSex"
          header-align="center"
          align="center"
          width="60px"
          label="性别"
        />
        <el-table-column
          prop="idcard"
          header-align="center"
          align="center"
          width="180px"
          label="身份证号"
        />
        <el-table-column
          prop="buildingId"
          header-align="center"
          align="center"
          width="120"
          label="所属楼房"
        />
        <el-table-column
          prop="roomNumber"
          header-align="center"
          align="center"
          width="80px"
          label="房间号"
        />
        <el-table-column
          prop="bedIdName"
          header-align="center"
          align="center"
          width="80px"
          label="床位号"
        />
        <el-table-column
          prop="recordId"
          header-align="center"
          align="center"
          label="档案号"
        />
        <el-table-column
          prop="elderType"
          label="老人类型"
          header-align="center"
          align="center"
          width="100"
          :filters="[{ text: '活力老人', value: '活力老人' }, { text: '自理老人', value: '自理老人' },{ text: '护理老人', value: '护理老人' }]"
          :filter-method="filter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            {{ scope.row.elderType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="checkinDate"
          header-align="center"
          align="center"
          label="入住时间"
        />
        <el-table-column
          prop="expirationDate"
          header-align="center"
          align="center"
          label="合同到期时间"
        />
        <el-table-column
          prop="contactTel"
          header-align="center"
          align="center"
          label="联系电话"
        />
        <el-table-column
          prop="foodAttention"
          header-align="center"
          align="center"
          label="饮食注意事项:"
        />
        <el-table-column
          prop="attention"
          header-align="center"
          align="center"
          label="注意事项:"
        />
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
              @click="addOrUpdateHandle(scope.row)"
            ><i class="el-icon-edit"></i> 修改
            </el-button>
            <el-button type="warning" size="mini" @click="deleteHandle(scope.row.id)"><i class="el-icon-delete"></i> 删除</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
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
      }).then(({ data }) => {
        if (data) {
          console.log(data)
          this.dataList = data.list
          this.totalPage = data.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      }).catch(err=>{
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
        this.$refs.addOrUpdate.init(row)
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
