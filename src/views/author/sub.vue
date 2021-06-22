<template>
  <div class="main">
    <div class="left">
      <el-row :gutter="0">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
                 label-position="left">
          <el-col :span="24">
            <el-row>
              <el-col :span="7">
                <el-form-item label="作者姓名" prop="name">
                  <el-input v-model="formData.name" placeholder="请输入作者姓名" readonly clearable
                            :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="日期选择" prop="field104">
                  <el-date-picker v-model="formData.field104" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电话号码" prop="phonenum">
              <el-input v-model="formData.phonenum" placeholder="请输入电话号码" readonly clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="邮箱邮箱" readonly clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :http-request="handsub"
              multiple
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传稿件文件</div>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-form-item label="稿件说明" prop="field109">
              <el-input v-model="formData.field109" type="textarea" placeholder="请输入稿件说明"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <!--            <el-button @click="resetForm">重置</el-button>-->
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        name: undefined,
        field104: "",
        phonenum: undefined,
        email: undefined,
        field105: null,
        field109: undefined,
      },
      rules: {
        name: [],
        field104: [],
        phonenum: [],
        email: [],
        field109: [{
          required: true,
          message: '请输入稿件说明',
          trigger: 'blur'
        }],
      },
      field105fileList: [],
      fileList: []
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    handsub(param) {
      console.log(1)
      let formData = new FormData();
      formData.append('file', param.file)

      this.$axios.post("/file/sub", formData, {
        headers: {
          'stringify': false,
          'Content-Type': "multipart/form-data"
        }
      }).then()
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }

  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

@import "../../styles/mix.scss";
</style>
