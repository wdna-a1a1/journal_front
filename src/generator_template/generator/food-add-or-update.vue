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
      <el-form-item label="" prop="foodname">
        <el-input v-model="dataForm.foodname" placeholder="" />
      </el-form-item>
      <el-form-item label="类别" prop="foodtype">
        <el-input v-model="dataForm.foodtype" placeholder="类别" />
      </el-form-item>
      <el-form-item label="食品标签" prop="foodlabel">
        <el-input v-model="dataForm.foodlabel" placeholder="食品标签" />
      </el-form-item>
      <el-form-item label="" prop="foodprice">
        <el-input v-model="dataForm.foodprice" placeholder="" />
      </el-form-item>
      <el-form-item label="是否清真 1-是 0-否" prop="isMuslim">
        <el-input v-model="dataForm.isMuslim" placeholder="是否清真 1-是 0-否" />
      </el-form-item>
      <el-form-item label="供应星期" prop="supplyDate">
        <el-input v-model="dataForm.supplyDate" placeholder="供应星期" />
      </el-form-item>
      <el-form-item label="供应类型 1：早餐；2午餐；3晚餐" prop="supplyType">
        <el-input v-model="dataForm.supplyType" placeholder="供应类型 1：早餐；2午餐；3晚餐" />
      </el-form-item>
      <el-form-item label="图片地址" prop="foodpic">
        <el-input v-model="dataForm.foodpic" placeholder="图片地址" />
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
        foodname: '',
        foodtype: '',
        foodlabel: '',
        foodprice: '',
        isMuslim: '',
        supplyDate: '',
        supplyType: '',
        foodpic: ''
      },
      dataRule: {
        isDeleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        foodname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        foodtype: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        foodlabel: [
          { required: true, message: '食品标签不能为空', trigger: 'blur' }
        ],
        foodprice: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        isMuslim: [
          { required: true, message: '是否清真 1-是 0-否不能为空', trigger: 'blur' }
        ],
        supplyDate: [
          { required: true, message: '供应星期不能为空', trigger: 'blur' }
        ],
        supplyType: [
          { required: true, message: '供应类型 1：早餐；2午餐；3晚餐不能为空', trigger: 'blur' }
        ],
        foodpic: [
          { required: true, message: '图片地址不能为空', trigger: 'blur' }
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
            url: this.$http.adornUrl(`/generator/food/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.food.isDeleted
              this.dataForm.foodname = data.food.foodname
              this.dataForm.foodtype = data.food.foodtype
              this.dataForm.foodlabel = data.food.foodlabel
              this.dataForm.foodprice = data.food.foodprice
              this.dataForm.isMuslim = data.food.isMuslim
              this.dataForm.supplyDate = data.food.supplyDate
              this.dataForm.supplyType = data.food.supplyType
              this.dataForm.foodpic = data.food.foodpic
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
            url: this.$http.adornUrl(`/generator/food/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'foodname': this.dataForm.foodname,
              'foodtype': this.dataForm.foodtype,
              'foodlabel': this.dataForm.foodlabel,
              'foodprice': this.dataForm.foodprice,
              'isMuslim': this.dataForm.isMuslim,
              'supplyDate': this.dataForm.supplyDate,
              'supplyType': this.dataForm.supplyType,
              'foodpic': this.dataForm.foodpic
            })
          }).then(({ data }) => {
            if (data) {
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
              this.$message.error("操作失败")
            }
          })
        }
      })
    }
  }
}
</script>
