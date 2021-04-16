<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.buildingId" class="el-input-short" placeholder="输入楼房编号" clearable />
          <el-input v-model="dataForm.roomNumber" class="el-input-short" placeholder="输入房间号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><i class="el-icon-search"></i> 查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 新增
          </el-button>
          <el-button type="primary" @click="transferHandle()">床位对调</el-button>
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
        :cell-style="{'text-align':'center','height':'60px','font-size':'18px' }"
        style="margin-top:40px;margin-bottom: 20px;"
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
          prop="buildingId"
          header-align="center"
          align="center"
          label="所属楼房"
        />
        <el-table-column
          prop="roomNumber"
          header-align="center"
          align="center"
          sortable
          label="房间号"
        />
        <el-table-column
          prop="name"
          header-align="center"
          align="center"
          label="床位名"
        />
        <el-table-column
          prop="bedStatus"
          header-align="center"
          align="center"
          :filters="[
            {text: '有人', value: '有人'},
            {text: '空闲', value: '空闲'},
            {text: '外出', value: '外出'}]"
          :filter-method="filterTag"
          label="床位状态"
        />
        <!--        <el-table-column
                  prop="positionType"
                  header-align="center"
                  align="center"
                  label="位置类型">
                </el-table-column>-->
        <!--        <el-table-column
                  prop="sort"
                  header-align="center"
                  align="center"
                  sortable
                  label="排序">
                </el-table-column>-->
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
    <transfer v-if="transferVisible" ref="Transfer" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './children_template/bed-add-or-update'
import Transfer from './children_template/bed-transfer'

export default {

  name: 'BedManagement',
  components: {
    AddOrUpdate, Transfer
  },
  data() {
    return {
      dataForm: {
        roomNumber: '',
        buildingId: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      transferVisible: false
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    filterTag(value, row) {
      return row.bedStatus === value
    },
    // 获取数据列表
    getDataList() {
      this.$axios.post('/bed/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        buildingId: this.dataForm.buildingId,
        roomNumber: this.dataForm.roomNumber
      }).then(({ data }) => {
        if (data) {
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
    }, transferHandle() {
      this.transferVisible = true
      this.$nextTick(() => {
        this.$refs.Transfer.init()
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
        this.$axios.post('/bed/del', { id })
          .then(({ data }) => {
            console.log(data)
            if (data === true) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error('删除失败,请检查此床位上是否还有老人!')
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
