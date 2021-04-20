<template>
  <div class="main">
    <div class="left">
      <el-form :inline="true" :model="dataForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="dataForm.key" @keyup.enter.native="getDataList" class="el-input-long"
                    placeholder="输入关键搜索"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><i class="el-icon-search"></i> 查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 登记
          </el-button>
          <el-button type="success" @click="auditVisibleHandle"><i class="el-icon-circle-plus"></i> 审批
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
          type="selection"
          header-align="center"
          align="center"
          :selectable="checkSelectable"
          width="50"
        />
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
          label="客户姓名"
        />
        <el-table-column
          prop="customerAge"
          header-align="center"
          align="center"
          label="年龄"
        />
        <el-table-column
          prop="customerSex"
          header-align="center"
          align="center"
          label="性别"
        />
        <el-table-column
          prop="outgoingReason"
          header-align="center"
          align="center"
          label="外出原因"
        />
        <el-table-column
          prop="outgoingTime"
          header-align="center"
          align="center"
          label="外出时间"
        />
        <el-table-column
          prop="expectedReturnTime"
          header-align="center"
          align="center"
          label="预计回来时间"
        />
        <el-table-column
          prop="actualReturnTime"
          header-align="center"
          align="center"
          label="实际回来时间"
        />
        <el-table-column
          prop="escorted"
          header-align="center"
          align="center"
          label="陪同人"
        />
        <el-table-column
          prop="relation"
          header-align="center"
          align="center"
          label="与客户关系"
        />
        <el-table-column
          prop="escortedTel"
          header-align="center"
          align="center"
          label="陪同人电话"
        />
        <el-table-column
          prop="auditStatus"
          header-align="center"
          align="center"
          label="审批状态"
        />
        <el-table-column
          prop="auditPerson"
          header-align="center"
          align="center"
          label="审批人"
        />
        <el-table-column
          prop="auditTime"
          header-align="center"
          align="center"
          label="审批时间"
        />
        <el-table-column
          header-align="center"
          align="center"
          width="310"
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              style="position: relative;left: 5px"
              @click="addOrUpdateHandle(scope.row)"
            ><i class="el-icon-edit"></i> 修改
            </el-button>
            <el-button type="danger" size="small" @click="deleteHandle(scope.row.id)"><i class="el-icon-delete"></i> 删除
            </el-button>
            <el-button :disabled="timeButtomHandle(scope.row)" type="warning" size="small"
                       @click="timeHandle(scope.row)"><i class="el-icon-edit"></i>
              登记回来时间
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
    </div>
    <el-dialog
      ref="auditDialog"
      title="审批"
      width="500px"
      :close-on-click-modal="false"
      :visible.sync="auditVisible"
        top="5vh"
    >
      <div v-for="(item,index) in dataListSelections" style="margin-bottom: 20px">
         <el-divider>{{ index + 1 }}</el-divider>
        <el-row>
          <el-tag style="margin-right: 10px">客户姓名:{{ item.customerName }}</el-tag>
          <el-tag style="margin-right: 10px">客户年龄:{{ item.customerAge }}</el-tag>
          <el-tag style="margin-right: 10px">客户性别:{{ item.customerSex }}</el-tag>
        </el-row>
        <el-select v-model="item.auditStatus" placeholder="请选择审批结果"
                   :style="{width: '100%'}">
          <el-option v-for="(item, index) in auditStatusOptions" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="auditVisible = false">取消</el-button>
      <el-button type="primary" @click="auditHandle">确定</el-button>
    </span>
    </el-dialog>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </div>
</template>

<script>
import AddOrUpdate from './children-template/outgoing-add-or-update'

export default {
  name: 'OutGoing',
  components: {
    AddOrUpdate
  },
  data () {
    return {
      auditVisible: false,
      dataForm: {
        key: ''
      },
      dataList: [],
      auditStatusOptions: [{
        'label': '审批通过',
        'value': '审批通过'
      }, {
        'label': '审批拒绝',
        'value': '审批拒绝'
      }, {
        'label': '待商讨',
        'value': '待商讨'
      }],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
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
      this.$axios.post('/out-going/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        username: this.dataForm.key
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
    auditHandle () {
      for (let i = 0; i < this.dataListSelections.length; i++) {
        this.dataListSelections[i].auditPerson = 'Nike'
        this.dataListSelections[i].auditTime = this.$moment(new Date()).format('yyyy-MM-DD HH:mm:ss').toString()
      }
      this.$axios.post('/out-going/audit', this.dataListSelections, { headers: { stringify: false } }).then(res => {
        if (res.data === true) {
          this.$message.success({
            message: '操作成功',
            duration: 500,
            onClose: () => {
              this.auditVisible = false
              this.getDataList()
            }
          })
        } else {
          this.$message.error('操作失败')
        }

      })
    },
    checkSelectable (row) {
      return row.actualReturnTime === undefined
    },
    auditVisibleHandle () {
      if (this.dataListSelections.length === 0) {
        this.$message.error('您还未选择需要审批的客户!')
      } else {
        this.auditVisible = true
      }
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
        this.$refs.addOrUpdate.init(row, 1)
      })
    },
    timeButtomHandle (row) {
      return (row.auditStatus === '审批拒绝' || row.auditStatus === '待商讨' || row.auditStatus === '' || row.auditStatus.length === 0)

    },

    timeHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row, 2)
      })
    },
    // 删除
    deleteHandle (id) {
      let ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.post('/out-going/del', { id })
          .then(({ data }) => {
            if (data === true) {
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
    }
  }
}
</script>

<style scoped="scoped">
@import "../../styles/mix.scss";

#app {
}
</style>
