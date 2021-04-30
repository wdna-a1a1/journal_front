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
          <el-button type="primary" @click="getDataList"><i class="el-icon-circle-plus"></i> 同步信息
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

            <el-button size="mini" type="warning" @click="getDataListNurse(scope.row.customerName)"><i
              class="el-icon-delete"></i>
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
    <el-dialog
      title="护理记录"
      :close-on-click-modal="false"
      :visible.sync="visible"
      center
      :width="dialogWidthCal"
      top="5vh"
    >
      <el-card>
        <div slot="header">

          <el-form inline>
            <el-form-item>
              <span class="title">护理记录</span>

            </el-form-item>
            <el-form-item style="float: right;margin-top: 4px">
              <el-button size="mini" type="success" style="float: right"
                         @click="getDataListNurse(dataForm.customerName)"><i
                class="el-icon-refresh"></i></el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-date-picker type="date" v-model="dataForm.nurseTime" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择护理日期"
                              clearable></el-date-picker>
            </el-form-item>


          </el-form>

        </div>
        <el-table
          :data="dataListNurse"
          border
          stripe
          fit
          max-height="500px"
          tooltip-effect="dark"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center','height':'60px'}"
          style="margin-bottom: 20px"

        >
          <el-table-column
            type="index"
            header-align="center"
            align="center"
            width="60px"
            label="序号"
          />
          <el-table-column
            prop="customerName"
            header-align="center"
            align="center"
            width="80px"
            label="客户姓名"
          />
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="护理项目"
          >

          </el-table-column>
          <el-table-column
            prop="createtime"
            header-align="center"
            align="center"
            label="护理时间"
          />
          <el-table-column
            prop="description"
            header-align="center"
            align="center"
            label="护理内容"
          />
          <el-table-column
            prop="nickname"
            header-align="center"
            align="center"
            width="80px"
            label="护理人员"
          />
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                style="position: relative;left: 5px"
                @click=""
              ><i class="el-icon-edit"></i> 修改
              </el-button>
              <el-button type="warning" size="mini" @click=""><i
                class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageIndexNurse"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSizeNurse"
          :total="totalPageNurse"
          layout="total,  prev, pager, next,sizes"
          @size-change="sizeChangeHandleNurse"
          @current-change="currentChangeHandleNurse"
        />
      </el-card>

    </el-dialog>
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
  data () {
    return {
      dialogWidth: '40%',
      dataForm: {
        key: '',
        nurseTime: '',
        customerName: '',
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      visible: false,
      dataListNurse: [],
      pageIndexNurse: 1,
      pageSizeNurse: 5,
      totalPageNurse: 0,
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    filter (value, row) {
      return row.elder_type === value
    },
    // 获取数据列表
    getDataList () {
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
      }).catch(err => {
        console.log(err)
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
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row, false)
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
              this.$message.error('操作失败')
            }
          })
      })
    },
    getDataListNurse (val) {
      this.visible = true
      this.dataForm.customerName = val
      this.$axios.post('/nurse-record/query', {
        currentPage: this.pageIndexNurse,
        pageSize: this.pageSizeNurse,
        nurseTime: this.dataForm.nurseTime,
        name: this.dataForm.customerName
      }).then(({ data }) => {
        if (data) {
          this.dataListNurse = data.list
          this.totalPageNurse = data.totalCount
          this.dataForm.nurseTime = ''
        } else {
          this.dataListNurse = []
          this.totalPageNurse = 0
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 每页数
    sizeChangeHandleNurse (val) {
      this.pageSizeNurse = val
      this.pageIndexNurse = 1
      this.getDataListNurse(this.dataForm.customerName)
    },
    // 当前页
    currentChangeHandleNurse (val) {
      this.pageIndexNurse = val
      this.getDataListNurse(this.dataForm.customerName)
    },
  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 50 + '%'
      return this.dialogWidth
    }
  }
}
</script>

<style scoped="scoped">
@import "../../styles/mix.scss";

#app {
}
</style>
