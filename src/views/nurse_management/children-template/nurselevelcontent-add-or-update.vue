<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :width="dialogWidthCal"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
             @keyup.enter.native="dataFormSubmit()">

      <el-row :gutter="20" type="flex" justify="start" align="top">
        <el-col :span="12">
          <el-form-item label="护理项目:" prop="nurseContentId">
            <el-select v-model="dataForm.nurseContentId" placeholder="请选择护理项目:" filterable clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in nurseContentIdOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="护理周期" prop="cycle">
            <el-select v-model="dataForm.cycle" placeholder="请选择护理周期" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in cycleOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" align="top">
        <el-col :span="8">
          <el-form-item label="护理次数" prop="field120">
            <el-input v-model="dataForm.times" placeholder="请输入护理次数" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="dataForm.sort" placeholder="请输入排序" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row type="flex" justify="start" align="top">
        <el-col :span="16">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="dataForm.remarks" type="textarea" placeholder="请输入备注" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['contentList', 'nurseLevelId'],
  data () {
    let validateSort = (rule, value, callback) => {
      const check = () => {
        let flag = true
        for (let i = 0; i < this.contentList.length; i++) {
          if (value === this.contentList[i].sort.toString()) {
            flag = false
            break
          }
        }
        return flag
      }
      if (!check()) {
        callback(new Error('排序冲突'))
      } else {
        callback()
      }
    }
    return {
      dialogWidth: '40%',
      visible: false,
      dataForm: {
        id: 0,
        isDeleted: '',
        nurselLevelId: '',
        nurseContentId: '',
        remarks: '无',
        cycle: '',
        times: '',
        sort: '',
      },
      dataRule: {
        nurseLevelId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ], nurseContentId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ], remarks: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ], cycle: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ], times: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ], sort: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateSort, trigger: 'blur' }
        ],

      },
      nurseContentIdOptions: [],
      cycleOptions: [
        { label: '每15分钟', value: '每15分钟' },
        { label: '每半小时', value: '每半小时' },
        { label: '每小时', value: '每小时' },
        { label: '每天', value: '每天' },
        { label: '每星期', value: '每星期' },
        { label: '每月', value: '每月' },

      ]
    }
  },
  mounted () {
    this.dataForm.nurselLevelId = this.nurseLevelId
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.getNurseContent()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post(`nurse-level-content/get-by-id`, { id: this.dataForm.id },).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.nurseLevelContent.isDeleted,
                this.dataForm.nurselLevelId = data.nurseLevelContent.nurseLevelId,
                this.dataForm.nurseContentId = data.nurseLevelContent.nurseContentId,
                this.dataForm.remarks = data.nurseLevelContent.remarks,
                this.dataForm.cycle = data.nurseLevelContent.cycle,
                this.dataForm.times = data.nurseLevelContent.times,
                this.dataForm.sort = data.nurseLevelContent.sort
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      console.log(this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/nurse-level-content/${!this.dataForm.id ? 'add' : 'update'}`, {
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'nurseLevelId': this.dataForm.nurselLevelId,
              'nurseContentId': this.dataForm.nurseContentId,
              'remarks': this.dataForm.remarks,
              'cycle': this.dataForm.cycle,
              'times': this.dataForm.times,
              'sort': this.dataForm.sort,
            }
          ).then(({ data }) => {
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
    }
    ,
    getNurseContent () {
      this.$axios.post('/nurse-content/get-nurse-content-selector').then(res => {
        if (res.data) {
          this.nurseContentIdOptions = res.data
        }
      })
    },

  },
  computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 45 + '%'
      return this.dialogWidth
    }
  }
  ,
  watch: {}
}
</script>


<style scoped>

</style>
