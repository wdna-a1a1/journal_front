<template>
  <div id="app">
    <el-row v-for="(i,index) in diet" :gutter="12">
      <el-container>
        <el-aside style="width: 130px">
          <el-tag class="item_info" :type="setColor(index)">{{ setTitle(index) }}</el-tag>
        </el-aside>
        <el-main class="flex" style="margin-top: -24px">
          <div v-for="item in i.val" >
            <div class="item">
              <el-tag class="food_tag" size="mini">{{ item.foodlabel }}</el-tag>
              <el-image fit='cover' class="food_img" :src="item.foodpic"/>
              <div class="food_control">
                <i class="el-icon-edit-outline " @click="mod(item.id)"/>
                <i class="el-icon-delete " @click="del(item.id)"/></div>

              <div class="food_info">
                <el-tag size="small">名称:</el-tag>
                <span class="food_content">{{ item.foodname }}</span>
              </div>
              <div class="food_info">
                <el-tag size="small">类别:</el-tag>
                <span class="food_content">{{ item.foodtype }}</span>
              </div>
              <div class="food_info">
                <el-tag size="small">价格:</el-tag>
                <span class="food_content">{{ item.foodprice }} 元</span>
              </div>
              <div class="food_info">
                <el-tag size="small">是否清真:</el-tag>
                <span class="food_content">{{ item.isMuslim === '1' ? '是' : '否' }}</span>
              </div>
            </div>
          </div>

        </el-main>

      </el-container>


    </el-row>
  </div>

</template>

<script>
export default {
  name: 'DietCalendarChild',
  data () {
    return {
      diet: []
    }
  },
  methods: {
    getData (val) {
      this.$axios.post('/food/get-with-date', { supplyDate: val, key: 4 }).then(res => {
        if (res) {
          this.diet = []
          this.diet.push({ val: res.data['breakFast'] })
          this.diet.push({ val: res.data['lunch'] })
          this.diet.push({ val: res.data['dinner'] })
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    mod (id) {
      this.$emit('canlendarMod', id)
    },
    del (id) {
      this.$emit('canlendarDel', id)
    },
    setTitle (val) {
      val += 1
      switch (val) {
        case 1:
          return '早餐'
        case 2:
          return '午餐'
        case 3:
          return '晚餐'
      }
    },
    setColor (val) {
      val += 1
      switch (val) {
        case 1:
          return 'success'
        case 2:
          return 'primary'
        case 3:
          return 'warning'
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
  width: 120px;
  height: 70px;
  line-height: 50px;
  padding: 6px;
  text-align: center;
  font-size: 48px;
}

.item {
  width: 200px;
  height: 250px;
  margin: 5px 14px 5px 5px;
  border-radius: 4px;
  border: 1px solid #efefef;
  /*box-shadow: 5px 6px 4px #aaaaaa;*/
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

.food_info .el-tag {
  font-size: 14px;
}

.food_content {
  font-size: 18px;
  margin-left: 10px;
}

.food_img {
  width: 110px;
  height: 110px;
  position: relative;
  left: 45px;
  top: 20px;
  z-index: 1;
}
</style>
