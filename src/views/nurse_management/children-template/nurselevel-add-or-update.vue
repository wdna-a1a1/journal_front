<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :width="dialogWidthCal"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px"
             @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="护理级别名称" prop="levelName">
        <el-input v-model="dataForm.levelName" placeholder="护理级别名称"/>
      </el-form-item>


      <el-form-item label="护理级别状态" prop="levelStatus">
        <el-select v-model="dataForm.levelStatus" placeholder="请选择护理级别状态:"
        >
          <el-option v-for="(item, index) in [{label: '启用',value: 1},{label: '停用',value: 2}]" :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="护理级别备注" prop="remarks">
        <el-input type="textarea" v-model="dataForm.remarks" placeholder="备注"/>
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
      dialogWidth: '30%',
      visible: false,
      dataForm: {
        id: 0,
        idDeleted: '',
        levelName: '',
        levelStatus: '',
        remarks: ''
      },
      dataRule: {
        levelName: [
          { required: true, message: '护理级别名称不能为空', trigger: 'blur' }
        ],
        levelStatus: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        remarks: [
          {  message: '不能为空', trigger: 'blur' }
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
          this.$axios.post(`nurse-level/get-by-id`, { id: this.dataForm.id },).then(({ data }) => {
            if (data) {
              this.dataForm.idDeleted = data.nurseLevel.idDeleted
              this.dataForm.levelName = data.nurseLevel.levelName
              this.dataForm.levelStatus = data.nurseLevel.levelStatus
              this.dataForm.remarks = data.nurseLevel.remarks
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/nurse-level/${!this.dataForm.id ? 'add' : 'update'}`, {
            'id': this.dataForm.id || undefined,
            'idDeleted': this.dataForm.idDeleted,
            'levelName': this.dataForm.levelName,
            'levelStatus': this.dataForm.levelStatus,
            'remarks': this.dataForm.remarks,
          }).then(({ data }) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
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
    },

  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 32 + '%'
      return this.dialogWidth
    }
  },
}
</script>

<style scoped>
@import "../../../styles/mix.scss";
</style>
