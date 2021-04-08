<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <!--      <el-row :gutter="15">
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>

            </el-row>-->
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="客户姓名:" prop="customerName">
            <el-input class="el-input-middle" v-model="dataForm.customerName" placeholder=""></el-input>
          </el-form-item>
        </el-col>


      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="年龄:" prop="customerAge">
            <el-input class="el-input-short" v-model="dataForm.customerAge" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别:" prop="customerSex">
            <el-select v-model="dataForm.customerSex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">

        <el-col :span="12">
          <el-form-item label="身份证号:" prop="idcard">
            <el-input class="el-input-longer" v-model="dataForm.idcard" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属楼房:" prop="buildingId">
            <el-select v-model="dataForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in buildingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">

        <el-col :span="12">
          <el-form-item label="房间号:" prop="roomNumber">
            <el-select v-model="dataForm.roomNumber" placeholder="请选择">
              <el-option
                v-for="item in roomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="床位号:" prop="buildingId">
            <el-select v-model="dataForm.bedId" placeholder="请选择">
              <el-option
                v-for="item in bedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="档案号:" prop="recordId">
            <el-input class="el-input-long" v-model="dataForm.recordId" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="老人类型:" prop="elderType">
            <el-select v-model="dataForm.elderType" placeholder="请选择">
              <el-option
                v-for="item in elderTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="入住时间:" prop="checkinDate">
            <template slot-scope="scope">
              <el-date-picker
                type="datetime"
                style="width:200px"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                v-model="dataForm.checkinDate"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同到期时间:" prop="expirationDate">
            <template slot-scope="scope">
              <el-date-picker
                type="datetime"
                style="width:200px"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                v-model="dataForm.expirationDate"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="联系电话:" prop="contactTel">
            <el-input class="el-input-long" v-model="dataForm.contactTel" placeholder=""></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="15">
        <el-col :span="18">
          <el-form-item label="注意事项:" prop="attention">
            <el-input class="el-input-longer" v-model="dataForm.attention" type="textarea" placeholder=""></el-input>
          </el-form-item>
        </el-col>


      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      roomOptions: [],
      buildingOptions: [],
      bedOptions: [{label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}],
      elderTypeOption: [{label: '活力老人', value: '活力老人'}, {label: '自理老人', value: '自理老人'}, {label: '护理老人', value: '护理老人'}],
      dataForm: {
        id: 0,
        isDeleted: '',
        customerName: '',
        customerAge: '',
        customerSex: '',
        idcard: '',
        roomNumber: '1',
        buildingId: '1',
        recordId: '',
        elderType: '',
        checkinDate: '',
        expirationDate: '',
        contactTel: '',
        bedId: '',
        psychosomaticState: '',
        attention: '',
        birthday: '',
        height: '',
        maritalStatus: '',
        weight: '',
        bloodType: '',
        filepath: ''
      },
      dataRule: {
        isDeleted: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        customerName: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        customerAge: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        customerSex: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        idcard: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        roomNumber: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        buildingId: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        recordId: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        elderType: [
          {required: true, message: '活力老人不能为空', trigger: 'blur'}
        ],
        checkinDate: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        expirationDate: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        contactTel: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        bedId: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        psychosomaticState: [
          {required: true, message: '精神状况不能为空', trigger: 'blur'}
        ],
        attention: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        height: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        maritalStatus: [
          {required: true, message: '婚姻状况不能为空', trigger: 'blur'}
        ],
        weight: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        bloodType: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        filepath: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post('/customer/get-by-id', {id: this.dataForm.id}).then(({data}) => {
            if (data) {
              this.dataForm.isDeleted = data.customer.isDeleted
              this.dataForm.customerName = data.customer.customerName
              this.dataForm.customerAge = data.customer.customerAge
              this.dataForm.customerSex = data.customer.customerSex
              this.dataForm.idcard = data.customer.idcard
              this.dataForm.roomNumber = data.customer.roomNumber
              this.dataForm.buildingId = data.customer.buildingId
              this.dataForm.recordId = data.customer.recordId
              this.dataForm.elderType = data.customer.elderType
              this.dataForm.checkinDate = data.customer.checkinDate
              this.dataForm.expirationDate = data.customer.expirationDate
              this.dataForm.contactTel = data.customer.contactTel
              this.dataForm.bedId = data.customer.bedId
              this.dataForm.psychosomaticState = data.customer.psychosomaticState
              this.dataForm.attention = data.customer.attention
              this.dataForm.birthday = data.customer.birthday
              this.dataForm.height = data.customer.height
              this.dataForm.maritalStatus = data.customer.maritalStatus
              this.dataForm.weight = data.customer.weight
              this.dataForm.bloodType = data.customer.bloodType
              this.dataForm.filepath = data.customer.filepath
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/customer/${!this.dataForm.id ? 'add' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'customerName': this.dataForm.customerName,
              'customerAge': this.dataForm.customerAge,
              'customerSex': this.dataForm.customerSex,
              'idcard': this.dataForm.idcard,
              'roomNumber': this.dataForm.roomNumber,
              'buildingId': this.dataForm.buildingId,
              'recordId': this.dataForm.recordId,
              'elderType': this.dataForm.elderType,
              'checkinDate': this.dataForm.checkinDate,
              'expirationDate': this.dataForm.expirationDate,
              'contactTel': this.dataForm.contactTel,
              'bedId': this.dataForm.bedId,
              'psychosomaticState': this.dataForm.psychosomaticState,
              'attention': this.dataForm.attention,
              'birthday': this.dataForm.birthday,
              'height': this.dataForm.height,
              'maritalStatus': this.dataForm.maritalStatus,
              'weight': this.dataForm.weight,
              'bloodType': this.dataForm.bloodType,
              'filepath': this.dataForm.filepath

            }).then(({data}) => {
            if (data === true) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped="scoped">
@import "../../../styles/mix.scss";

#app {
}
</style>
