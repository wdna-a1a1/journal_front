<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="nurseLevelId">
      <el-input v-model="dataForm.nurseLevelId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="nurseContentId">
      <el-input v-model="dataForm.nurseContentId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="1-已删除 0未删除" prop="isDeleted">
      <el-input v-model="dataForm.isDeleted" placeholder="1-已删除 0未删除"></el-input>
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
          nurseLevelId: '',
          nurseContentId: '',
          isDeleted: ''
        },
        dataRule: {
          nurseLevelId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          nurseContentId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isDeleted: [
            { required: true, message: '1-已删除 0未删除不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/nurselevelcontent/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.nurseLevelId = data.nurseLevelContent.nurseLevelId
                this.dataForm.nurseContentId = data.nurseLevelContent.nurseContentId
                this.dataForm.isDeleted = data.nurseLevelContent.isDeleted
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
              url: this.$http.adornUrl(`/generator/nurselevelcontent/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'nurseLevelId': this.dataForm.nurseLevelId,
                'nurseContentId': this.dataForm.nurseContentId,
                'isDeleted': this.dataForm.isDeleted
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
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
