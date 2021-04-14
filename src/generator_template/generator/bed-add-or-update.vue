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
      <el-form-item label="" prop="roomNumber">
        <el-input v-model="dataForm.roomNumber" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="bedStatus">
        <el-input v-model="dataForm.bedStatus" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="positionType">
        <el-input v-model="dataForm.positionType" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="" />
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
        roomNumber: '',
        bedStatus: '',
        positionType: '',
        name: '',
        sort: ''
      },
      dataRule: {
        isDeleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        roomNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bedStatus: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        positionType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
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
            url: this.$http.adornUrl(`/generator/bed/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.isDeleted = data.bed.isDeleted
              this.dataForm.roomNumber = data.bed.roomNumber
              this.dataForm.bedStatus = data.bed.bedStatus
              this.dataForm.positionType = data.bed.positionType
              this.dataForm.name = data.bed.name
              this.dataForm.sort = data.bed.sort
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
            url: this.$http.adornUrl(`/generator/bed/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'roomNumber': this.dataForm.roomNumber,
              'bedStatus': this.dataForm.bedStatus,
              'positionType': this.dataForm.positionType,
              'name': this.dataForm.name,
              'sort': this.dataForm.sort
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
