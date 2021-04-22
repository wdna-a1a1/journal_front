<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" :model="dataForm" @submit.native.prevent>
          <el-form-item>
            <el-button type="success" @click="getDataList()" @keyup.enter.native="getDataList()"><i
              class="el-icon-refresh"></i> 刷新
            </el-button>
            <el-button type="primary" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 新增
            </el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-tag v-if="nurseLevelName.length>0" type="danger" style="height: 60px;font-size: 36px;line-height: 54px">
            正在配置 <i class="el-icon-right"></i> 护理级别名称:{{ nurseLevelName }}
          </el-tag>

        </div>

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
            label="护理内容"
          />
          <el-table-column
            prop="cycle"
            header-align="center"
            align="center"
            label="周期"
          >
          </el-table-column>
          <el-table-column
            prop="times"
            header-align="center"
            align="center"
            label="执行次数"
          />
          <el-table-column
            prop="price"
            header-align="center"
            align="center"
            label="价格(元/次)"
          />
          <el-table-column
            prop="remarks"
            header-align="center"
            align="center"
            label="备注"
          />
          <el-table-column
            prop="sort"
            header-align="center"
            align="center"
            label="执行顺序"
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
        <el-row>
          <el-col :span="21">
            <el-pagination
              :current-page="pageIndex"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total,  prev, pager, next,sizes"
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
            />
          </el-col>
          <el-col :span="3">
            <el-button size="mini" type="danger" @click="closeThis" style="float: right"> 返回</el-button>
          </el-col>

        </el-row>

        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" :contentList="dataList" :nurseLevelId="nurseLevelId" ref="addOrUpdate"
                       @refreshDataList="getDataList"/>

      </div>
    </div>
  </div>
</template>

<script>


import AddOrUpdate from './children-template/nurselevelcontent-add-or-update'

export default {
  components: {
    AddOrUpdate
  },
  name: 'NurseConfiguration',
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
      nurseLevelName: '',
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.nurseLevelId = this.$route.params.id
    this.nurseLevelName = this.$route.params.name
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.$axios.post('/nurse-level-content/query', {
        currentPage: this.pageIndex,
        pageSize: this.pageSize,
        id: this.nurseLevelId
      }).then(({ data }) => {
        if (data) {
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
        this.$axios.post('/nurse-level-content/del', { id })
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
    }, closeThis () {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push('/nurse_management/nurse-level')
      /* const latestView = this.$store.state.tagsView.visitedViews.slice(-1)[0]
       if (latestView !== undefined) {
         this.$router.push(latestView.fullPath)
       } else {
         this.$router.push('/nurse_management/nurse-level')
       }*/
    }
  }
}
</script>

<style scoped>
@import "../../styles/mix.scss";
</style>
