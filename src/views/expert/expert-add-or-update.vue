<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="专家姓名" prop="expertName">
        <el-input v-model="dataForm.expertName" placeholder="专家姓名"></el-input>
      </el-form-item>
      <el-form-item label="专家性别" prop="expertSex">
        <el-input v-model="dataForm.expertSex" placeholder="专家性别"></el-input>
      </el-form-item>
      <el-form-item label="专家出生日期" prop="birth">
        <el-input v-model="dataForm.birth" placeholder="专家出生日期"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="expertMajor">
        <el-input v-model="dataForm.expertMajor" placeholder="专业"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="expertEdu">
        <el-input v-model="dataForm.expertEdu" placeholder="学历"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="zhicheng">
        <el-input v-model="dataForm.zhicheng" placeholder="职称"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNum">
        <el-input v-model="dataForm.phoneNum" placeholder="电话号码"></el-input>
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
        expertName: '',
        expertSex: '',
        birth: '',
        expertMajor: '',
        expertEdu: '',
        zhicheng: '',
        phoneNum: '',
        email: ''
      },
      dataRule: {
        expertName: [
          {required: true, message: '专家姓名不能为空', trigger: 'blur'}
        ],
        expertSex: [
          {required: true, message: '专家性别不能为空', trigger: 'blur'}
        ],
        birth: [
          {required: true, message: '专家出生日期不能为空', trigger: 'blur'}
        ],
        expertMajor: [
          {required: true, message: '专业不能为空', trigger: 'blur'}
        ],
        expertEdu: [
          {required: true, message: '学历不能为空', trigger: 'blur'}
        ],
        zhicheng: [
          {required: true, message: '职称不能为空', trigger: 'blur'}
        ],
        phoneNum: [
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
          this.$http({
            url: this.$http.adornUrl(`/generator/expert/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.expertName = data.expert.expertName
              this.dataForm.expertSex = data.expert.expertSex
              this.dataForm.birth = data.expert.birth
              this.dataForm.expertMajor = data.expert.expertMajor
              this.dataForm.expertEdu = data.expert.expertEdu
              this.dataForm.zhicheng = data.expert.zhicheng
              this.dataForm.phoneNum = data.expert.phoneNum
              this.dataForm.email = data.expert.email
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
            url: this.$http.adornUrl(`/generator/expert/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'expertName': this.dataForm.expertName,
              'expertSex': this.dataForm.expertSex,
              'birth': this.dataForm.birth,
              'expertMajor': this.dataForm.expertMajor,
              'expertEdu': this.dataForm.expertEdu,
              'zhicheng': this.dataForm.zhicheng,
              'phoneNum': this.dataForm.phoneNum,
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
