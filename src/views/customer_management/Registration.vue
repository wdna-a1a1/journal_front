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
        max-height="640px"
        tooltip-effect="dark"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center','height':'60px'}"
        style="margin-top:40px;margin-bottom: 20px"
      >
        <el-table-column
          prop="id"
          header-align="center"
          align="center"
          width="80px"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="customer_name"
          header-align="center"
          align="center"
          width="120px"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="customer_age"
          header-align="center"
          align="center"
          width="60px"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="customer_sex"
          header-align="center"
          align="center"
          width="60px"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="idcard"
          header-align="center"
          align="center"
          width="180px"
          label="身份证号">
        </el-table-column>
        <el-table-column
          prop="building_id"
          header-align="center"
          align="center"
          width="120"
          label="所属楼房">
        </el-table-column>
        <el-table-column
          prop="room_number"
          header-align="center"
          align="center"
          width="80px"
          label="房间号">
        </el-table-column>
        <el-table-column
          prop="bed_id_name"
          header-align="center"
          align="center"
          width="80px"
          label="床位号">
        </el-table-column>
        <el-table-column
          prop="record_id"
          header-align="center"
          align="center"
          label="档案号">
        </el-table-column>
        <el-table-column
          prop="elder_type"
          label="老人类型"
          header-align="center"
          align="center"
          width="100"
          :filters="[{ text: '活力老人', value: '活力老人' }, { text: '自理老人', value: '自理老人' },{ text: '护理老人', value: '护理老人' }]"
          :filter-method="filter"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            {{ scope.row.elder_type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="checkin_date"
          header-align="center"
          align="center"
          label="入住时间">
        </el-table-column>
        <el-table-column
          prop="expiration_date"
          header-align="center"
          align="center"
          label="合同到期时间">
        </el-table-column>
        <el-table-column
          prop="contact_tel"
          header-align="center"
          align="center"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="attention"
          header-align="center"
          align="center"
          label="注意事项:">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="100"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row)"
                       style="position: relative;left: 5px">修改
            </el-button>
            <el-button type="warning" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 20, 50]"
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
  mounted() {
    this.getDataList()
  },
  methods: {
    filter(value, row) {
      return row.elder_type === value;
    },
    // 获取数据列表
    getDataList() {
      this.$axios.post('/customer/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        name: this.dataForm.key,
      }).then(({data}) => {
        if (data) {
          console.log(data);
          this.dataList = data.list
          this.totalPage = data.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
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
        cancelButtonText: '取消',
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
