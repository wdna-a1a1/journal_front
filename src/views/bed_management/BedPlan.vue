<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <el-form :inline="true" :model="dataForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="dataForm.key" @keyup.enter.native="getDataList" :readonly="dataForm.searchType===0"
                      class="el-input-longer"
                      :placeholder="tips">
              <template slot="prepend">
                <el-select v-model="dataForm.searchType" style="width: 120px">
                  <el-option v-for="(item, index) in searchTypeOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>


              </template>

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="dataForm.key" placeholder="请选择楼层" v-if="dataForm.searchType===0" clearable
                       :style="{width: '80%'}">
              <el-option v-for="(item, index) in floorOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDataList()"><i class="el-icon-search"></i> 查询</el-button>
          </el-form-item>
        </el-form>


        <el-row :gutter="12">
          <el-container>
            <el-main class="flex" style="margin-top: -24px">
              <div v-for="(item,index) in dataList" @dblclick="clickBedInfoHandle(index)">
                <div class="item">
                  <el-image fit='cover' class="bedInfo_img" src="http://localhost:8181/images/bed.jpg"/>

                  <div class="bedInfo_info" @click="clickBedInfoHandle(index)">
                    <el-tag size="small">信息:</el-tag>
                    <span class="bedInfo_content">{{ item.roomNumber + '-' + item.name }}</span>
                  </div>
                  <div class="bedInfo_info">
                    <el-tag size="small">状态:</el-tag>
                    <span class="bedInfo_content">
                      <el-tag :color="setColor(item.bedStatus)" style="color: #fff;font-size: 18px;font-weight: bold"> {{
                          item.bedStatus
                        }}</el-tag>
                     </span>
                  </div>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-row>
        <el-dialog
          title="客户信息"
          :visible.sync="visible"
          top="5vh"
          center
          :width="dialogWidthCal">
          <el-form style="font-size: 24px" label-width="100px" label-position="right">
            <!--    客户基本信息      -->
            <el-divider>客户基本信息</el-divider>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名:">
                  <span class="bed-info-content">{{ customer.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别:">
                  <span class="bed-info-content">{{ customer.customerSex }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="护理等级:">
                  <span class="bed-info-content">{{ customer.levelName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="护士:">
                  <span class="bed-info-content">{{ customer.nurse }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="护工:">
                  <span class="bed-info-content">{{ customer.nursingWorkers }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="医生:">
                  <span class="bed-info-content"> {{ customer.doctor }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="床位状态:">
                  <span class="bed-info-content"> {{ customer.bedStatus }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <!--    客户监测数据      -->
            <el-divider>客户监测数据</el-divider>
            <el-row>
              <el-col :span="8">
                <el-form-item label="心律:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="血压:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="脉搏:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="血氧:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="睡眠:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="血糖:">
                  <span class="bed-info-content"> </span>
                </el-form-item>
              </el-col>
            </el-row>
            <!--    客户护理内容      -->
            <el-divider>客户护理内容</el-divider>
            <el-row>
              <el-table
                :data="nurseContentList"
                border
                stripe
                fit
                max-height="640px"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center','height':'60px'}"
                style="margin-top:40px;margin-bottom: 20px"
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
              </el-table>

            </el-row>
            <!--    客户膳食情况      -->
            <el-divider>客户膳食情况</el-divider>
            <el-row>
              <el-col :span="24">
                <el-form-item label="膳食情况:">
                  <el-input v-model="customer.foodAttention" type="textarea" style="width: 100%" readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--    客户注意事项      -->
            <el-divider>客户注意事项</el-divider>
            <el-row>
              <el-col :span="24">
                <el-form-item label="注意事项:">
                  <el-input v-model="customer.attention" type="textarea" style="width: 100%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="visible = false">关闭</el-button>
    </span>
        </el-dialog>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'BedPlan',
  data: () => {
    return {
      dialogWidth: '40%',
      visible: false,
      dataForm: {
        key: '',
        searchType: ''
      },
      customer: {},
      nurseContentList: [],
      dataList: [],

      searchTypeOptions: [
        {
          'label': '按楼层',
          'value': 0
        }, {
          'label': '客户姓名',
          'value': 1
        }, {
          'label': '房间号',
          'value': 2
        }, {
          'label': '床位号',
          'value': 3
        },],

      floorOptions: [{
        'label': '一楼',
        'value': 1
      }, {
        'label': '二楼',
        'value': 2
      }, {
        'label': '三楼',
        'value': 3
      }, {
        'label': '四楼',
        'value': 4
      }, {
        'label': '五楼',
        'value': 5
      }, {
        'label': '',
        'value': ''
      }],
    }
  },
  mounted () {

  },
  methods: {
    // 获取数据列表
    getDataList () {
      if (this.dataForm.searchType.length <= 0) {
        this.$message.error('请输入搜索内容')
        return
      }
      this.$axios.post('/bed-info/get-bed-info', {
        key: this.dataForm.key,
        searchType: this.dataForm.searchType
      }).then(({ data }) => {
        if (data) {
          this.dataList = data
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
    },
    clickBedInfoHandle (index) {
      if (this.dataList[index].bedStatus === '空闲') {
        this.$message.error('此床位没有老人!')
      } else {
        this.getCustomerByBedId(this.dataList[index].id)
        this.visible = true

      }

    },
    getCustomerByBedId (id) {
      this.$axios.post('/bed-info/get-person-info', {
        id
      }).then(({ data }) => {
        if (data) {
          this.customer = data.customer
          this.nurseContentList = data.nurseContent

        } else {

        }
      })
    },
    setColor (status) {
      switch (status) {
        case '有人':
          return '#00a6ff'
        case '外出':
          return '#ff5100'
        case '空闲':
          return '#01c10d'
      }

    },

  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 50 + '%'
      return this.dialogWidth
    },
    tips () {
      this.dataForm.key = undefined
      switch (this.dataForm.searchType) {
        case 0:
          return '请在后方选择楼层即可'
        case 1:
          return '请输入客户的姓名  e. 张三'
        case 2:
          return '请输入房间号  e. 101'
        case 3:
          return '请输入床位号  e. 101-1号床'
      }
    }
  }
}
</script>

<style scoped="scoped">
@import "../../styles/mix.scss";

#app {
}


.flex {
  display: flex;
  flex-wrap: wrap;
}


.item {
  width: 180px;
  height: 220px;
  margin: 5px 14px 25px 14px;
  border-radius: 4px;
  border: 1px solid #efefef;
  box-shadow: 5px 6px 4px #aaaaaa;
}


.bedInfo_info {
  position: relative;
  top: 20px;
  left: 10px;
  margin-top: 10px;

}

.bedInfo_info .el-tag {
  font-size: 14px;
}

.bedInfo_content {
  font-size: 18px;
  margin-left: 10px;
}

.bedInfo_img {
  width: 110px;
  height: 110px;
  position: relative;
  border-radius: 4px;
  box-shadow: 6px 4px 4px #aaaaaa;
  left: 35px;
  top: 20px;

}

.bed-info-content {
  font-size: 18px;
}

.el-divider--horizontal {
  height: 2px;
  margin: 24px 0;
}

.el-divider__text {
  font-size: 18px;
}

.el-form-item {
  margin-bottom: 14px;
}
</style>
