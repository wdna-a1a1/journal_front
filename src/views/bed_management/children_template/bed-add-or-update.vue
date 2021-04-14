<template>

  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    :width="dialogWidthCal"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-position="top"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="14">
          <el-form-item label="房间号:" prop="roomNumber">
            <el-input v-model="dataForm.roomNumber" placeholder="" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="床位状态:" prop="bedStatus">
            <el-select v-model="dataForm.bedStatus" placeholder="请选择">
              <el-option
                v-for="item in bedStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="14">
          <el-form-item label="床位号:" prop="name">
            <el-input v-model="dataForm.name" placeholder="" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="床位位置:" prop="bedStatus">
            <el-select v-model="dataForm.positionType" placeholder="请选择">
              <el-option
                v-for="item in positionTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="10">
          <el-form-item label="排序:" prop="sort">
            <el-select v-model="dataForm.sort" placeholder="请选择">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
  data() {
    return {
      dialogWidth: '30%',
      visible: false,
      dataForm: {
        id: 0,
        roomNumber: '',
        bedStatus: '',
        positionType: '',
        name: '',
        sort: ''
      }, bedStatusOptions: [
        { label: '有人', value: '有人' },
        { label: '空闲', value: '空闲' },
        { label: '外出', value: '外出' }],
      positionTypeOptions: [{ label: '0', value: '0' }, { label: '1', value: '1' }, { label: '2', value: '2' }],
      sortOptions: [{ label: '0', value: '0' }, { label: '1', value: '1' }, { label: '2', value: '2' }],
      dataRule: {
        roomNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bedStatus: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        positionType: [
          { message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  }, computed: {
    dialogWidthCal() {
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 30 + '%'
      return this.dialogWidth
    }
  },
  methods: {
    init(info) {
      this.dataForm.id = info !== undefined ? info.id : ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post('/bed/get-by-id', { id: this.dataForm.id }).then(({ data }) => {
            if (data) {
              this.dataForm.roomNumber = data.bed.roomNumber
              this.dataForm.bedStatus = data.bed.bedStatus
              this.dataForm.positionType = data.bed.positionType
              this.dataForm.name = data.bed.name
              this.dataForm.sort = data.bed.sort
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/bed/${!this.dataForm.id ? 'add' : 'update'}`, {
            'id': this.dataForm.id || undefined,
            'roomNumber': this.dataForm.roomNumber,
            'bedStatus': this.dataForm.bedStatus,
            'positionType': this.dataForm.positionType,
            'name': this.dataForm.name,
            'sort': this.dataForm.sort
          }).then(({ data }) => {
            if (data === true) {
              this.$message.success({
                message: '操作成功',
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
