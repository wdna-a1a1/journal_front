<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" :model="dataForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="dataForm.key" @keyup.enter.native="" placeholder="护理级别" clearable/>
          </el-form-item>
          <el-form-item>
            <el-button @click="getDataList"><i class="el-icon-search"></i> 查询</el-button>
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
            type="index"
            header-align="center"
            align="center"
            width="80px"
            label="序号"
          />
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="护理内容"
          />
          <el-table-column
            prop="cycle"
            header-align="center"
            align="center"
            width="120px"
            label="周期"
          >
          </el-table-column>
          <el-table-column
            prop="times"
            header-align="center"
            align="center"
            width="80px"
            label="执行次数"
          />
          <el-table-column
            prop="desc"
            header-align="center"
            align="center"
            label="护理描述"
          />
          <el-table-column
            prop="remarks"
            header-align="center"
            align="center"
            label="备注"
          />
          <el-table-column
            prop="createtime"
            header-align="center"
            align="center"
            label="最后一次护理时间"
          />
          <el-table-column
            prop="doneTimes"
            header-align="center"
            align="center"
            width="80px"
            label="完成次数"
          />
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="addRecord(scope.row)"><i
                class="el-icon-edit"></i> 已完成护理
              </el-button>
              <el-button type="danger" size="small" @click="deleteRecord(scope.row)"><i class="el-icon-delete"></i>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <!--          <el-col :span="21">
                      <el-pagination
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="pageSize"
                        :total="totalPage"
                        layout="total,  prev, pager, next,sizes"
                        @size-change="sizeChangeHandle"
                        @current-change="currentChangeHandle"
                      />
                    </el-col>-->
          <el-col :span="24">
            <el-button size="mini" type="danger" @click="closeThis" style="float: right"> 返回</el-button>
          </el-col>

        </el-row>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TodayPlan',
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      customerId: '',
      levelId: '',
      dataListLoading: false,
      dataListSelections: [],
    }
  }, mounted () {
    this.customerId = this.$route.params.id
    this.getDataList()
  }, methods: {
    getDataList () {
      if (this.customerId !== undefined) {
        this.$axios.post('/nurse-record/query-plan', {
          id: this.customerId,
          contentName: this.dataForm.key
        }).then(({ data }) => {
          if (data) {
            this.dataList = data
          } else {
            this.dataList = []

          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error({
          message: '查询失败,即将返回护理记录页面!',
          duration: 1500,
          onClose: () => {
            this.closeThis()
          }
        })
      }

    },
    addRecord (row) {
      this.$axios.post('/nurse-record/add', {
        id: 0,
        isDeleted: 1,
        customerid: row.id,
        userid: this.$store.getters.id,
        contentid: row.contentid,
        createtime: this.$moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
        donetimes: 1
      }).then(({ data }) => {
        if (data) {
          this.$message.success({
            message: '操作成功',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        } else {
          this.$message.error('操作失败,请查看是否已经完成此护理次数!')
        }
      })
    },
    deleteRecord (row) {
      this.$axios.post('/nurse-record/del', {
        id: row.rid,
      }).then(({ data }) => {
        if (data) {
          this.$message.success({
            message: '操作成功',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        } else {
          this.$message.error('操作失败,请查看是否已经完成此护理次数!')
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
    }, closeThis () {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push('/nurse_management/nurse-record')

    }
  }
}
</script>

<style scoped>
@import "../../styles/mix.scss";
</style>
