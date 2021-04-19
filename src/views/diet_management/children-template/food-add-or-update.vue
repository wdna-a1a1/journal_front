<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :width="dialogWidthCal"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" size="medium">
      <el-row :gutter="10" type="flex" justify="start" align="top">
        <el-col :span="12">
          <el-form-item label="膳食名称:" prop="foodname">
            <el-input v-model="dataForm.foodname" placeholder="请输入膳食名称:" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别:" prop="foodtype">
            <el-select v-model="dataForm.foodtype" placeholder="请选择膳食类别:" filterable clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in foodtypeOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" justify="start" align="top">
        <el-col :span="12">
          <el-form-item label="膳食价格:" prop="foodprice">
            <el-input v-model="dataForm.foodprice" placeholder="请输入膳食价格:" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="膳食标签:" prop="foodlabel">
            <el-select v-model="dataForm.foodlabel" placeholder="请选择膳食标签:" filterable clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in foodlabelOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" justify="start" align="top">
        <el-col :span="12">
          <el-form-item label="供应星期:" prop="supplyDate">
            <el-select v-model="dataForm.supplyDate" placeholder="请选择供应星期:" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in supplyDateOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应类型:" prop="supplyType">
            <el-select v-model="dataForm.supplyType" placeholder="请选择供应类型:" filterable clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in supplyTypeOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="flex" justify="start" align="top">
        <el-col :span="6">
          <el-form-item label="是否清真" prop="isMuslim" required>
            <el-switch v-model="dataForm.isMuslim" active-color="#00CF5D" inactive-color="#FF0000"
                       :active-value='1' :inactive-value='0'></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="膳食样例图:">
            <el-image fit='cover' style="width: 200px;height: 200px" :src="dataForm.foodpic"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上传膳食样例图:" prop="foodpic">
            <el-upload ref="upload"
                       :on-change="uploadChange"
                       :file-list="foodpicfileList"
                       :http-request="submitUpload"
                       :action="foodpicAction"
                       :auto-upload="false" :limit=1
                       list-type="picture-card"
                       accept="image/*">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的image/*文件</div>
            </el-upload>
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
      dialogWidth: '40%',
      visible: false,
      dataForm: {
        id: 0,
        isDeleted: '',
        foodname: '',
        foodtype: '',
        foodlabel: '',
        foodprice: '',
        isMuslim: 0,
        supplyDate: '',
        supplyType: '',
        foodpic: ''
      },
      foodpicAction: 'http://localhost:8181/food/uploads',
      foodpicfileList: [],
      foodtypeOptions: [],
      foodlabelOptions: [],
      supplyDateOptions: [{
        'label': '星期一',
        'value': 1
      }, {
        'label': '星期二',
        'value': 2
      }, {
        'label': '星期三',
        'value': 3
      }, {
        'label': '星期四',
        'value': 4
      }, {
        'label': '星期五',
        'value': 5
      }, {
        'label': '星期六',
        'value': 6
      }, {
        'label': '星期日',
        'value': 7
      }],
      supplyTypeOptions: [{
        'label': '早餐',
        'value': 1
      }, {
        'label': '午餐',
        'value': 2
      }, {
        'label': '晚餐',
        'value': 3
      }],

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
          { message: '图片地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {this.getFoodType()},
  methods: {
    init (id) {
      this.dataForm.id = id !== undefined ? id : ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post(`/food/get-by-id`, { id: this.dataForm.id }
          ).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.food.isDeleted
              this.dataForm.foodname = data.food.foodname
              this.dataForm.foodtype = data.food.foodtype
              this.dataForm.foodlabel = data.food.foodlabel
              this.dataForm.foodprice = data.food.foodprice
              this.dataForm.isMuslim = parseInt(data.food.isMuslim)
              this.dataForm.supplyDate = data.food.supplyDate
              this.dataForm.supplyType = data.food.supplyType
              this.dataForm.foodpic = data.food.foodpic
            }
          })
        }
      })
    },
    getFoodType () {
      this.$axios.post(`/food-type/get-food-type`, {}, { headers: { showLoading: false } }).then(res => {
        if (res.data) this.foodtypeOptions = res.data
      })
      this.$axios.post(`/food-type/get-food-label`, {}, { headers: { showLoading: false } }).then(res => {
        if (res.data) this.foodlabelOptions = res.data
      })
    },
    // 表单提交
    dataFormSubmit () {
      console.log(this.foodpicfileList.length)
      if (this.foodpicfileList.length !== 0) {
        this.$refs['upload'].submit()
      } else {
        this.dataFormSubmit2()
      }

    },
    dataFormSubmit2 () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/food/${!this.dataForm.id ? 'add' : 'update'}`,
            {
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
    },
    uploadChange (file, fileList) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      console.log(file)
      if (isRightSize) {
        this.foodpicfileList.push(file)
      }
    },
    submitUpload (params) {
      let path
      switch (this.dataForm.supplyType) {
        case 1:
          path = 'Food/breakFast/'
          break
        case 2:
          path = 'Food/lunch/'
          break
        case 3:
          path = 'Food/dinner/'
          break
      }
      let formData = new FormData()
      formData.append('file', params.file)
      formData.append('path', path)
      this.$axios.post(this.foodpicAction, formData, { headers: { stringify: false } }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('图片上传成功!')
          this.dataForm.foodpic = res.data.pic_path
          this.foodpicfileList = []
          this.dataFormSubmit2()
          return true
        } else {
          this.$message.error('图片上传失败!')
        }
      }).catch(err => {})
      return false
    },
  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 45 + '%'
      return this.dialogWidth
    }
  },
}
</script>


<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}

.el-upload--picture-card {
  width: 108px !important;
  height: 108px !important;
}

.el-upload__tip {
  line-height: 1.2;
  width: 200px;
}
</style>
