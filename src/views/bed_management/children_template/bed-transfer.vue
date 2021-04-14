<template>
  <el-dialog
    title="床位调换"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    :width="dialogWidthCal"
  >
    <el-form :model="dataForm">
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-tag>老人信息-1</el-tag>
            <el-select v-model="dataForm.v1" filterable placeholder="请选择">
              <el-option
                v-for="item1 in dataList"
                :key="item1.id"
                :label="item1.customerName+'-'+item1.roomNumber+'-'+item1.bedId"
                :value="item1.id"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-tag>老人信息-2</el-tag>
            <el-select v-model="dataForm.v2" filterable placeholder="请选择">
              <el-option
                v-for="item2 in dataList"
                :key="item2.id"
                :label="item2.customerName+'-'+item2.roomNumber+'-'+item2.bedId"
                :value="item2.id"
              />
            </el-select>
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click=" dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BedTransfer',
  data() {
    return {
      dialogWidth: '35%',
      visible: false,

      dataForm: {
        v1: '',
        v2: ''
      },
      dataList: []
    }
  }, computed: {
    dialogWidthCal() {
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 35 + '%'
      return this.dialogWidth
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$axios.post('customer/get-bed-info').then(res => {
        if (res.data) {
          this.dataList = res.data
        }
      }).catch(err => {
      })
    },
    dataFormSubmit() {
      if (this.dataForm.v1 !== this.dataForm.v2) {
        this.$axios.post('customer/transfer-bed',
          {
            v1: this.dataForm.v1,
            v2: this.dataForm.v2
          }).then(res => {
          console.log(res)
          if (res.data) {
            this.$message.success({
              message: '操作成功',
              duration: 500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          }
        }).catch(err => {
        })
      } else {
        this.$message.error('不允许调换同一个人的床位!')
      }
    }

  }
}
</script>

<style scoped>

</style>
