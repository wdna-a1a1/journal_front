<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="!dataForm.id ? '新增' : '修改'"
    :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
             @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-input v-model="dataForm.birth" placeholder="出生日期"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phonenum">
        <el-input v-model="dataForm.phonenum" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
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
        name: '',
        sex: '',
        birth: '',
        phonenum: '',
        email: ''
      },
      dataRule: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '性别不能为空', trigger: 'blur'}
        ],
        birth: [
          {required: true, message: '出生日期不能为空', trigger: 'blur'}
        ],
        phonenum: [
          {required: true, message: '电话号码不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
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
          this.$axios.get('/author/info', {id: id}).then(({data}) => {
            console.log(data);
            if (data && data.code === 0) {
              this.dataForm.name = data.author.name
              this.dataForm.sex = data.author.sex
              this.dataForm.birth = data.author.birth
              this.dataForm.phonenum = data.author.phonenum
              this.dataForm.email = data.author.email
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
            url: this.$http.adornUrl(`/generator/author/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'sex': this.dataForm.sex,
              'birth': this.dataForm.birth,
              'phonenum': this.dataForm.phonenum,
              'email': this.dataForm.email
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
