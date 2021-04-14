<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="isDeleted">
        <el-input v-model="dataForm.isDeleted" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="customerName">
        <el-input v-model="dataForm.customerName" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="customerAge">
        <el-input v-model="dataForm.customerAge" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="customerSex">
        <el-input v-model="dataForm.customerSex" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="idcard">
        <el-input v-model="dataForm.idcard" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="roomNumber">
        <el-input v-model="dataForm.roomNumber" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="buildingId">
        <el-input v-model="dataForm.buildingId" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="recordId">
        <el-input v-model="dataForm.recordId" placeholder="" />
      </el-form-item>
      <el-form-item label="活力老人" prop="elderType">
        <el-input v-model="dataForm.elderType" placeholder="活力老人" />
      </el-form-item>
      <el-form-item label="" prop="checkinDate">
        <el-input v-model="dataForm.checkinDate" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="expirationDate">
        <el-input v-model="dataForm.expirationDate" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="contactTel">
        <el-input v-model="dataForm.contactTel" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="bedId">
        <el-input v-model="dataForm.bedId" placeholder="" />
      </el-form-item>
      <el-form-item label="精神状况" prop="psychosomaticState">
        <el-input v-model="dataForm.psychosomaticState" placeholder="精神状况" />
      </el-form-item>
      <el-form-item label="" prop="attention">
        <el-input v-model="dataForm.attention" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="birthday">
        <el-input v-model="dataForm.birthday" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="height">
        <el-input v-model="dataForm.height" placeholder="" />
      </el-form-item>
      <el-form-item label="婚姻状况" prop="maritalStatus">
        <el-input v-model="dataForm.maritalStatus" placeholder="婚姻状况" />
      </el-form-item>
      <el-form-item label="" prop="weight">
        <el-input v-model="dataForm.weight" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="bloodType">
        <el-input v-model="dataForm.bloodType" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="filepath">
        <el-input v-model="dataForm.filepath" placeholder="" />
      </el-form-item>
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
      dataForm: {
        id: 0,
        isDeleted: '',
        customerName: '',
        customerAge: '',
        customerSex: '',
        idcard: '',
        roomNumber: '',
        buildingId: '',
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
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerAge: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerSex: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        roomNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        buildingId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        recordId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        elderType: [
          { required: true, message: '活力老人不能为空', trigger: 'blur' }
        ],
        checkinDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        expirationDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bedId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        psychosomaticState: [
          { required: true, message: '精神状况不能为空', trigger: 'blur' }
        ],
        attention: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: '婚姻状况不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bloodType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filepath: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
          this.$http({
            url: this.$http.adornUrl(`/generator/customer/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
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
          this.$http({
            url: this.$http.adornUrl(`/generator/customer/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
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
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
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
