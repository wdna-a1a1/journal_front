<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="idDeleted">
      <el-input v-model="dataForm.idDeleted" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="护理级别名称" prop="levelName">
      <el-input v-model="dataForm.levelName" placeholder="护理级别名称"></el-input>
    </el-form-item>
    <el-form-item label="1:启用  2 停用" prop="levelStatus">
      <el-input v-model="dataForm.levelStatus" placeholder="1:启用  2 停用"></el-input>
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
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          idDeleted: '',
          levelName: '',
          levelStatus: ''
        },
        dataRule: {
          idDeleted: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          levelName: [
            { required: true, message: '护理级别名称不能为空', trigger: 'blur' }
          ],
          levelStatus: [
            { required: true, message: '1:启用  2 停用不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/nurselevel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.idDeleted = data.nurseLevel.idDeleted
                this.dataForm.levelName = data.nurseLevel.levelName
                this.dataForm.levelStatus = data.nurseLevel.levelStatus
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/nurselevel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'idDeleted': this.dataForm.idDeleted,
                'levelName': this.dataForm.levelName,
                'levelStatus': this.dataForm.levelStatus
              })
            }).then(({data}) => {
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
