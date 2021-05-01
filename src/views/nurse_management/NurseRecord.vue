<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form inline :model="dataForm" @submit.native.prevent>

          <el-form-item>
            <el-input v-model="dataForm.key" @keyup.enter.native="getDataListCustomer" placeholder="查询客户" clearable/>
          </el-form-item>


          <el-form-item>
            <el-button @click="getDataListCustomer"><i class="el-icon-search"></i>查询</el-button>
          </el-form-item>


          <el-form-item>
            <el-button type="success" @click="todayNursePlan"><i class="el-icon-search"></i>今日护理安排
            </el-button>
          </el-form-item>

          <el-form-item style="float: right">
            <div>
              <el-button type="primary" @click="handleVisible(1)"><i class="el-icon-circle-plus"></i> 导出清单
              </el-button>
            </div>
          </el-form-item>
          <el-form-item style="float: right">
            <div>
              <el-button type="primary" @click="handleVisible(2)"><i class="el-icon-circle-plus"></i> 导出汇总表
              </el-button>
            </div>
          </el-form-item>

        </el-form>
        <el-container>
          <el-aside width="40%">
            <el-card>
              <div slot="header">
                <span class="title">客户列表</span>
                <el-button size="mini" type="success" style="float: right" @click="getDataListCustomer"><i
                  class="el-icon-refresh"></i></el-button>
              </div>
              <el-table
                :data="dataListCustomer"
                border
                stripe
                fit
                max-height="500px"
                tooltip-effect="dark"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center','height':'60px'}"
                style="margin-bottom: 20px"
                @selection-change="selectionChangeHandleCustomer"
              >
                <el-table-column
                  type="selection"
                  header-align="center"
                  align="center"
                  width="40px"
                />
                <el-table-column
                  prop="id"
                  header-align="center"
                  align="center"
                  width="60px"
                  label="序号"
                />
                <el-table-column
                  prop="customerName"
                  header-align="center"
                  align="center"
                  label="姓名"
                />
                <el-table-column
                  prop="customerSex"
                  header-align="center"
                  align="center"
                  label="性别"
                />
                <el-table-column
                  prop="customerAge"
                  header-align="center"
                  align="center"
                  label="年龄"
                />
                <el-table-column
                  header-align="center"
                  align="center"
                  label="床位"
                  width="120px"
                >
                  <template slot-scope="scope">
                    {{ scope.row.roomNumber + '-' + scope.row.bedIdName }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="levelName"
                  header-align="center"
                  align="center"
                  label="护理等级"
                />
              </el-table>
              <el-pagination
                :current-page="pageIndexCustomer"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="pageSizeCustomer"
                :total="totalPageCustomer"
                layout="total,  prev, pager, next,sizes"
                @size-change="sizeChangeHandleCustomer"
                @current-change="currentChangeHandleCustomer"
              />
            </el-card>
          </el-aside>
          <el-main width="60%" style="padding: 0;">
            <el-card>
              <div slot="header">

                <el-form inline>
                  <el-form-item>
                    <span class="title">护理记录</span>

                  </el-form-item>
                  <el-form-item style="float: right;margin-top: 4px">
                    <el-button size="mini" type="success" style="float: right" @click="getDataListNurse"><i
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
          </el-main>
        </el-container>
        <el-dialog
          title="导出清单"
          :close-on-click-modal="false"
          :visible.sync="visible"
          width="380px"
          top="15vh"
        >
          <el-form label-width="80px" inline
                   @keyup.enter.native="exportRecord2Excel">
            <el-form-item label="开始时间:">
              <el-date-picker type="date" v-model="dataForm.startTime" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择护理日期"
                              clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker type="date" v-model="dataForm.endTime" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择护理日期"
                              clearable></el-date-picker>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="exportRecord2Excel">确定</el-button>
    </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import fileDownload from 'js-file-download'

export default {
  name: 'NurseRecord',
  data () {
    return {
      visible: false,
      dataForm: {
        key: '',
        nurseTime: '',
        startTime: '',
        endTime: ''
      },
      todayNurseList: [],
      dataListCustomer: [],
      pageIndexCustomer: 1,
      pageSizeCustomer: 5,
      totalPageCustomer: 0,

      dataListNurse: [],
      pageIndexNurse: 1,
      pageSizeNurse: 5,
      totalPageNurse: 0,
      nameList: [],
      getExcelUrl: ['/nurse-record/get-person-data-excel', '/nurse-record/get-all-person-data-excel'],
      urlIndex: -1,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.getDataListCustomer()
  },
  methods: {
    handleVisible (key) {
      this.nameList = []
      switch (key) {
        case 1:
          if (this.selectLimit()) {
            this.visible = true
            this.urlIndex = 0
            this.dataListSelections.forEach((value, index, array) => this.nameList.push(value.customerName))
          }
          return
        case 2:
          this.visible = true
          this.urlIndex = 1
          return
        default:
          this.$message.error('')
      }
    },
    selectLimit () {
      if (this.dataListSelections.length === 0) {
        this.$message.error('请选择一个客户!')
      } else if (this.dataListSelections.length > 1) {
        this.$message.error('只允许选择一个客户!')
      } else {
        return true
      }
      return false
    },
    todayNursePlan () {
      this.todayNurseList = []
      if (this.selectLimit()) {
        this.todayPlan()
      }
    },

    getDataListCustomer () {
      this.$axios.post('/customer/query2', {
        currentPage: this.pageIndexCustomer,
        pageSize: this.pageSizeCustomer,
        name: this.dataForm.key
      }).then(({ data }) => {
        if (data) {
          this.dataListCustomer = data.list
          this.totalPageCustomer = data.totalCount
        } else {
          this.dataListCustomer = []
          this.totalPageCustomer = 0
        }
      }).catch(err => {
        console.log(err)
      })
    },
    exportRecord2Excel () {
      if (this.selectLimit()) {
        this.$axios.post(this.getExcelUrl[this.urlIndex], {
            startTime: this.dataForm.startTime,
            endTime: this.dataForm.endTime,
            name: this.nameList.toString()
          },
          {
            responseType: 'blob' //服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'，默认是'json'
          }
        ).then(({ data }) => {
          if (data) {
            fileDownload(data, 'record.xlsx')
            this.visible = false
          }
        }).catch(err => {
          console.log(err)
        })

      }

    },
    // 每页数
    sizeChangeHandleCustomer (val) {
      this.pageSizeCustomer = val
      this.pageIndexCustomer = 1
      this.getDataListCustomer()
    },
    // 当前页
    currentChangeHandleCustomer (val) {
      this.pageIndexCustomer = val
      this.getDataListCustomer()
    },

    getDataListNurse () {
      let nameList = []
      this.dataListSelections.forEach((value, index, array) => nameList.push(value.customerName))

      this.$axios.post('/nurse-record/query', {
        currentPage: this.pageIndexNurse,
        pageSize: this.pageSizeNurse,
        nurseTime: this.dataForm.nurseTime,
        name: nameList.toString()
      }).then(({ data }) => {
        if (data) {
          this.dataListNurse = data.list
          this.totalPageNurse = data.totalCount
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
      this.getDataListNurse()
    },
    // 当前页
    currentChangeHandleNurse (val) {
      this.pageIndexNurse = val
      this.getDataListNurse()
    },
    // 多选
    selectionChangeHandleCustomer (val) {
      this.dataListSelections = val
    },
    todayPlan () {
      this.$router.push({
        name: 'TodayPlan',
        params: {
          id: this.dataListSelections[0].id,
          levelId: this.dataListSelections[0].nurseLevel,
        }
      })
    }
  },
}
</script>

<style scoped>
@import "../../styles/mix.scss";

.title {
  font-size: 24px;
  font-family: "Microsoft Sans Serif", sans-serif
}
</style>
