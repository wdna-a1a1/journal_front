<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :width="dialogWidthCal"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="90px">
      <el-container>
        <el-aside width="45%">
          <el-form-item label="客户姓名:" prop="customerid">
            <el-select v-model="dataForm.customerid" placeholder="客户姓名" filterable clearable >
              <el-option v-for="(item, index) in customerList" :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="膳食名称:" prop="foodid">
            <el-input v-model="dataForm.foodid" disabled placeholder="膳食名称"></el-input>
          </el-form-item>
          <el-form-item label="膳食日期:" prop="fooddate">
            <el-date-picker
              v-model="dataForm.fooddate"
              type="date"
              style="width: 93%"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="fooddateChangeHandle"

            />
          </el-form-item>
          <el-form-item label="膳食星期:" prop="foodweek">
            <el-select v-model="dataForm.foodweek" placeholder="供应星期" clearable >
              <el-option v-for="(item, index) in weekOptions" disabled :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="膳食类型:">
            <el-select v-model="foodtype" placeholder="供应类型" clearable @change="foodtypeSelectHandle"
                       >
              <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注:" prop="remarks">
            <el-input v-model="dataForm.remarks" type="textarea" placeholder=""/>
          </el-form-item>
        </el-aside>
        <el-container class="flex">
          <el-main style="padding: 10px;width: 100%;height: 140px" class="flex">
            <el-checkbox-group v-model="checkList" :max="maxChoose">
              <el-checkbox
                v-for="item in foodList" :key="item.id" :label="item.id" style="margin-top: 5px" size="mini">
                <span style="font-size: 16px">{{ item.foodname }}</span>
                <el-tag size="mini" style="font-size: 12px;margin-left: 6px">{{
                    item.foodlabel
                  }}
                </el-tag>
                <el-tag size="mini" type="warning" style="font-size: 12px;margin-left: 6px">{{
                    item.foodprice + '元'
                  }}
                </el-tag>
              </el-checkbox>
            </el-checkbox-group>
          </el-main>
          <el-main>


            <el-form-item label="平时喜好:" prop="likes">
              <el-input v-model="dataForm.likes" type="textarea" placeholder=""/>
            </el-form-item>


            <el-form-item label="注意事项:" prop="attention">
              <el-input v-model="dataForm.attention" type="textarea" placeholder=""/>
            </el-form-item>

          </el-main>
        </el-container>
      </el-container>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: ['weekOptions', 'typeOptions'],
  data () {
    return {
      dialogWidth: '45%',
      visible: false,
      dataForm: {
        id: 0,
        isDeleted: '',
        customerid: '',
        foodid: '',
        fooddate: '',
        foodweek: '',
        likes: '',
        attention: '',
        remarks: '',
      },
      foodtype: '',
      maxChoose: 5,
      checkList: [],
      foodList: [],
      customerList: [],
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
      //初始化数据
      this.getCustomerList()
      this.foodtype = ''
      this.foodList = []

      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post(`/customer-food/get-by-id`, { id: this.dataForm.id }
          ).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.customerFood.isDeleted
              this.dataForm.customerid = data.customerFood.customerid
              this.dataForm.foodid = data.customerFood.foodid
              this.dataForm.fooddate = data.customerFood.fooddate
              this.dataForm.foodweek = data.customerFood.foodweek
              this.dataForm.likes = data.customerFood.likes
              this.dataForm.attention = data.customerFood.attention
              this.dataForm.remarks = data.customerFood.remarks
              this.foodtype = data.customerFood.supplyType
              this.getFoodList()
              this.checkList = data.customerFood.foodid.split(',').map(item => parseInt(item))
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        let formData = {
          'id': this.dataForm.id,
          'isDeleted': this.dataForm.isDeleted,
          'customerid': this.dataForm.customerid,
          'foodid': this.dataForm.foodid,
          'fooddate': this.dataForm.fooddate,
          'foodweek': this.dataForm.foodweek,
          'likes': this.dataForm.likes,
          'attention': this.dataForm.attention,
          'remarks': this.dataForm.remarks,
        }
        let customerFoods = []

        /*   for (let i = 0; i < this.checkList.length; i++) {
             console.log(this.checkList[i])
             let temp = formData
             temp.foodid = this.checkList[i]
             console.log(temp)
             customerFoods.push(JSON.parse(JSON.stringify(temp)))
           }*/
        let temp = formData
        temp.foodid = this.checkList.toString()
        customerFoods.push(JSON.parse(JSON.stringify(temp)))

        if (valid) {
          this.$axios.post(`/customer-food/${!this.dataForm.id ? 'add' : 'update'}`, customerFoods, { headers: { stringify: false } }).then(({ data }) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList', 1)
                }
              })
              this.foodList = []
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    getCustomerList () {
      this.$axios.post('/customer/get-customer-selector').then(res => {
        if (res.data) {
          this.customerList = res.data
        }
      })
    },
    getFoodList () {

      let typeList = ['breakFast', 'lunch', 'dinner']
      if (this.dataForm.foodweek !== null && this.dataForm.foodweek > -1
        && this.dataForm.foodweek.toString().length !== 0
        && this.foodtype !== null && this.foodtype > -1
        && this.foodtype.toString().length !== 0) {
        this.$axios.post('/food/get-with-date', {
          supplyDate: this.dataForm.foodweek,
          key: this.foodtype
        }).then(res => {
          if (res.data) {
            this.foodList = res.data[typeList[this.foodtype - 1]]
          }
        })
      }
    },
    foodtypeSelectHandle () {
      this.checkList = []
      this.getFoodList()
    },
    fooddateChangeHandle () {
      let week = [7, 1, 2, 3, 4, 5, 6]
      const myDate = new Date(Date.parse(this.dataForm.fooddate.replace(/-/g, '/')))
      this.dataForm.foodweek = week[myDate.getDay()]
      this.checkList = []
      this.getFoodList()
    },

  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 45 + '%'
      return this.dialogWidth
    }
  }, watch: {

    checkList: function (newVal, oldVal) {
      this.dataForm.foodid = this.checkList.toString()
      if (newVal.length === this.maxChoose) {
        this.$message.warning({
          message: '最多可选择' + this.maxChoose + '项',
          center: true
        })
      }
    }
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
