<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="name">
      <el-input v-model="dataForm.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="price">
      <el-input v-model="dataForm.price" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="desc">
      <el-input v-model="dataForm.desc" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="是否增值服务 1-是 0-不是 " prop="isAdd">
      <el-input v-model="dataForm.isAdd" placeholder="是否增值服务 1-是 0-不是 "></el-input>
    </el-form-item>
    <el-form-item label="1-启用 0-不启用" prop="status">
      <el-input v-model="dataForm.status" placeholder="1-启用 0-不启用"></el-input>
    </el-form-item>
    <el-form-item label="0-已删除 1未删除" prop="idDeleted">
      <el-input v-model="dataForm.idDeleted" placeholder="0-已删除 1未删除"></el-input>
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
          name: '',
          price: '',
          desc: '',
          isAdd: '',
          status: '',
          idDeleted: ''
        },
        dataRule: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isAdd: [
            { required: true, message: '是否增值服务 1-是 0-不是 不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '1-启用 0-不启用不能为空', trigger: 'blur' }
          ],
          idDeleted: [
            { required: true, message: '0-已删除 1未删除不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/nursecontent/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.nurseContent.name
                this.dataForm.price = data.nurseContent.price
                this.dataForm.desc = data.nurseContent.desc
                this.dataForm.isAdd = data.nurseContent.isAdd
                this.dataForm.status = data.nurseContent.status
                this.dataForm.idDeleted = data.nurseContent.idDeleted
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
              url: this.$http.adornUrl(`/generator/nursecontent/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'price': this.dataForm.price,
                'desc': this.dataForm.desc,
                'isAdd': this.dataForm.isAdd,
                'status': this.dataForm.status,
                'idDeleted': this.dataForm.idDeleted
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
