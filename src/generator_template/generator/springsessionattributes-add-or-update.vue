<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="attributeName">
      <el-input v-model="dataForm.attributeName" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="attributeBytes">
      <el-input v-model="dataForm.attributeBytes" placeholder=""></el-input>
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
          sessionPrimaryId: 0,
          attributeName: '',
          attributeBytes: ''
        },
        dataRule: {
          attributeName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          attributeBytes: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.sessionPrimaryId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.sessionPrimaryId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/springsessionattributes/info/${this.dataForm.sessionPrimaryId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.attributeName = data.springSessionAttributes.attributeName
                this.dataForm.attributeBytes = data.springSessionAttributes.attributeBytes
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
              url: this.$http.adornUrl(`/generator/springsessionattributes/${!this.dataForm.sessionPrimaryId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'sessionPrimaryId': this.dataForm.sessionPrimaryId || undefined,
                'attributeName': this.dataForm.attributeName,
                'attributeBytes': this.dataForm.attributeBytes
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
