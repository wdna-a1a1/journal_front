<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" :model="dataForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="dataForm.key" @keyup.enter.native="getDataList()" placeholder="员工编号/员工用户名" clearable/>
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
            prop="userCode"
            header-align="center"
            align="center"
            label="员工编号"
          />
          <el-table-column
            prop="nickname"
            header-align="center"
            align="center"
            label="昵称"
          />
          <el-table-column
            prop="username"
            header-align="center"
            align="center"
            label="用户名"
          />
          <el-table-column
            prop="password"
            header-align="center"
            align="center"
            label="密码"
            v-if="false"
          />
          <el-table-column
            prop="sex"
            header-align="center"
            align="center"
            label="性别"
          >
            <template scope="scope">

              {{ scope.row.sex === 1 ? '男' : '女' }}

            </template>

          </el-table-column>
          <el-table-column
            prop="email"
            header-align="center"
            align="center"
            label="电子邮件"
          />
          <el-table-column
            prop="phoneNumber"
            header-align="center"
            align="center"
            label="电话号码"
          />

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="addOrUpdateHandle(scope.row.id)"><i
                class="el-icon-edit"></i> 修改
              </el-button>
              <el-button type="danger" size="small" @click="deleteHandle(scope.row.id)"><i class="el-icon-delete"></i>
                删除
              </el-button>
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


import AddOrUpdate from './children-template/user-add-or-update'
import rsa from '@/utils/rsa'

export default {
  components: {
    AddOrUpdate
  },
  name: 'StaffManagement',
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
      this.$axios.post('/user/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        username: this.dataForm.key,
        user_code: this.dataForm.key
      }).then(({ data }) => {
        if (data) {
          this.dataList =data.list
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
        this.$axios.post('/user/del', { id })
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

<style scoped>
@import "../../styles/mix.scss";
</style>
