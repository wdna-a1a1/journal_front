<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" :model="dataForm"  @submit.native.prevent>
          <el-form-item>
            <el-input v-model="dataForm.key" @keyup.enter.native="getDataList()" placeholder="护理内容" clearable/>
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
            prop="name"
            header-align="center"
            align="center"
            width="300px"
            label="护理内容名称"
          />
          <el-table-column
            prop="desc"
            header-align="center"
            align="center"
            width="600px"
            label="护理内容详细"
          />
          <el-table-column
            prop="price"
            header-align="center"
            align="center"
            width="120px"
            label="价格(元/次)"
          />
          <el-table-column
            prop="isAdd"
            header-align="center"
            align="center"
            width="120px"
            label="是否为增值服务"

          >
            <template scope="scope">
              <el-tag :type="scope.row.isAdd===1?'success':'danger'">
                {{ scope.row.isAdd === 1 ? '是' : '否' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            width="120px"
            label="状态"
          >
            <template scope="scope">
              <el-tag :type="scope.row.status===1?'success':'danger'">
                {{ scope.row.status === 1 ? '启用' : '停用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="addOrUpdateHandle(scope.row.id)"><i class="el-icon-edit"></i> 修改</el-button>
              <el-button type="danger" size="small" @click="deleteHandle(scope.row.id)"><i class="el-icon-delete"></i> 删除</el-button>
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


        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>

      </div>
    </div>
  </div>
</template>

<script>


import AddOrUpdate from './children-template/nursecontent-add-or-update'

export default {
  components: {
    AddOrUpdate
  },
  name: 'NurseContent',
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      nurseLevelId: '',
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.$axios.post('/nurse-content/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        name: this.dataForm.key
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
        this.$axios.post('/nurse-content/del', { id })
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

<style scoped>
@import "../../styles/mix.scss";
</style>
