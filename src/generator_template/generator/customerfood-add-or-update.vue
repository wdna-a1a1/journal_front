<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="isDeleted">
      <el-input v-model="dataForm.isDeleted" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="客户ID" prop="customerid">
      <el-input v-model="dataForm.customerid" placeholder="客户ID"></el-input>
    </el-form-item>
    <el-form-item label="膳食ID" prop="foodid">
      <el-input v-model="dataForm.foodid" placeholder="膳食ID"></el-input>
    </el-form-item>
    <el-form-item label="膳食日期" prop="fooddate">
      <el-input v-model="dataForm.fooddate" placeholder="膳食日期"></el-input>
    </el-form-item>
    <el-form-item label="膳食星期" prop="foodweek">
      <el-input v-model="dataForm.foodweek" placeholder="膳食星期"></el-input>
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
          isDeleted: '',
          customerid: '',
          foodid: '',
          fooddate: '',
          foodweek: ''
        },
        dataRule: {
          isDeleted: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          customerid: [
            { required: true, message: '客户ID不能为空', trigger: 'blur' }
          ],
          foodid: [
            { required: true, message: '膳食ID不能为空', trigger: 'blur' }
          ],
          fooddate: [
            { required: true, message: '膳食日期不能为空', trigger: 'blur' }
          ],
          foodweek: [
            { required: true, message: '膳食星期不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/customerfood/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.isDeleted = data.customerFood.isDeleted
                this.dataForm.customerid = data.customerFood.customerid
                this.dataForm.foodid = data.customerFood.foodid
                this.dataForm.fooddate = data.customerFood.fooddate
                this.dataForm.foodweek = data.customerFood.foodweek
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
              url: this.$http.adornUrl(`/generator/customerfood/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'isDeleted': this.dataForm.isDeleted,
                'customerid': this.dataForm.customerid,
                'foodid': this.dataForm.foodid,
                'fooddate': this.dataForm.fooddate,
                'foodweek': this.dataForm.foodweek
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
