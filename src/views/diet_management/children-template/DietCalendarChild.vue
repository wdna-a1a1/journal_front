<template>
  <div id="app">
    <el-row :gutter="12" class="flex" v-for="(i,index) in diet">
      <el-tag class="item_info" :type="setColor(index)" >{{ setTitle(index) }}</el-tag>
      <div v-for="item in i.val">
        <div class="item">
          <el-tag class="food_tag" size="mini">{{ item.foodlabel }}</el-tag>
          <el-image class="food_img"></el-image>
          <div class="food_control">
            <i class="el-icon-edit-outline "></i>
            <i class="el-icon-delete "></i></div>
          <div class="food_info">
            <el-tag size="small">类别:</el-tag>
            {{ item.foodtype }}
          </div>
          <div class="food_info">
            <el-tag size="small">名称:</el-tag>
            {{ item.foodname }}
          </div>
          <div class="food_info">
            <el-tag size="small">价格:</el-tag>
            {{ item.foodprice }}元
          </div>
          <div class="food_info">
            <el-tag size="small">是否清真:</el-tag>
            {{ item.isMuslim === "1" ? '是' : '否' }}
          </div>
        </div>
      </div>
    </el-row>
  </div>


</template>

<script>
export default {
  name: "DietCalendarChild",
  data() {
    return {
      diet: [],
    }
  },
  methods: {
    getData(val) {
      this.$axios.post("/food/get-with-date", {supplyDate: val}).then(res => {
        if (res) {
          this.diet = []
          console.log(res)
          this.diet.push({val: res.data['breakFast']})
          this.diet.push({val: res.data['lunch']})
          this.diet.push({val: res.data['dinner']})
        }
      }).catch(err => {

      })
    },
    setTitle(val) {
      val += 1
      switch (val) {
        case 1:
          return '早餐';
        case 2:
          return '午餐';
        case 3:
          return '晚餐';
      }
    },
    setColor(val) {
      val += 1
      switch (val) {
        case 1:
          return 'success';
        case 2:
          return 'primary';
        case 3:
          return 'warning';
      }
    }

  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}

.item_info {
  width: 200px;
  height: 100px;
  line-height: 80px;
  padding: 6px;
  text-align: center;
  font-size: 72px;
}

.item {
  width: 200px;
  height: 240px;
  margin: 5px 5px 5px 5px;
  border-radius: 4px;
  border: 1px solid #c3c3c3;
  box-shadow: 5px 6px 4px #aaaaaa;
}

.food_control {
  float: right;
  margin: 4px;
  z-index: 3;
}

.food_tag {
  font-size: 12px;
  margin: 4px;
  position: absolute;
  z-index: 2;
}

.food_info {
  position: relative;
  top: 20px;
  left: 30px;
  margin-top: 2px;
  z-index: 3;
}

.food_img {
  width: 100px;
  height: 100px;
  position: relative;
  left: 50px;
  top: 20px;
  z-index: 1;
}
</style>
