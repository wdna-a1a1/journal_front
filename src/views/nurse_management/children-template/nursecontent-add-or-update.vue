<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    top="5vh"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px"
             @keyup.enter.native="dataFormSubmit()">
      <el-row type="flex" justify="start" align="top">
        <el-col :span="9">
          <el-form-item label="护理内容名称:" prop="name">
            <el-input v-model="dataForm.name" placeholder="请选择护理内容名称:">

            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="价格(元/次):" prop="price">
            <el-input v-model="dataForm.price" placeholder="请输入价格(元/次):" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="护理内容描述:" prop="desc">
          <el-input v-model="dataForm.desc" type="textarea" placeholder="请输入护理内容描述:"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="start" align="top">
        <el-col :span="9">
          <el-form-item label="是否为增值服务:" label-width="140px" prop="isAdd">
            <el-select v-model="dataForm.isAdd" placeholder="请选择是否为增值服务:" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in isAddOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="状态" prop="status">
            <el-select v-model="dataForm.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
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
        name: [{
          required: true,
          message: '请输入护理内容名称:',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入价格(元/次):',
          trigger: 'blur'
        }],
        desc: [{
          required: true,
          message: '请输入护理内容描述:',
          trigger: 'blur'
        }],
        isAdd: [{
          required: true,
          message: '请选择是否为增值服务:',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
      },
      nameOptions: [{
        'label': '早餐',
        'value': 1
      }, {
        'label': '午餐',
        'value': 2
      }, {
        'label': '晚餐',
        'value': 3
      }],
      isAddOptions: [{
        'label': '是',
        'value': 1
      }, {
        'label': '否',
        'value': 0
      }],
      statusOptions: [{
        'label': '启用',
        'value': 1
      }, {
        'label': '停用',
        'value': 0
      }],

    }
  }
  ,
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post(`nurse-content/get-by-id`, { id: this.dataForm.id },).then(({ data }) => {
            if (data) {
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
    }
    ,
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`nurse-content/${!this.dataForm.id ? 'add' : 'update'}`, {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'price': this.dataForm.price,
              'desc': this.dataForm.desc,
              'isAdd': this.dataForm.isAdd,
              'status': this.dataForm.status,
              'idDeleted': this.dataForm.idDeleted
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
  }
}
</script>
