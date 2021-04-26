<!--<template>-->

<!--  <div class="dashboard-container" >-->
<!--    <div class="dashboard-text">上实瑞慈颐养中心</div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'Dashboard',-->
<!--  mounted() {-->
<!--    console.log(this.$store.state.user)-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.dashboard-container{-->
<!--  background: url('../../image/yyzx.jpg') center;-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--  background-size: cover;-->
<!--  position: fixed;-->
<!--}-->
<!--img{-->
<!--  width: 100%;-->
<!--  height: 100vh;-->

<!--  background-size: 100% 100%;-->
<!--  position: fixed;//固定定位-->
<!--}-->

<!--.dashboard {-->

<!--  &-container {-->
<!--  }-->

<!--  &-text {-->
<!--    font-size: 30px;-->
<!--    line-height: 80px;-->
<!--    text-align: center;-->
<!--  }-->
<!--}-->
<!--</style>-->
<template>
  <div class="dashboard-text">上实瑞慈颐养中心
    <el-carousel :interval="4000" height="600px" type="card">

      <el-carousel-item v-for="item in ima" :key="item" autoplay>
        <el-image
          :src="item"
          style="width: 100%; height: 600px"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ima: [
        require('../../image/yyzx.jpg'),
        require('../../image/1.jpg'),
        require('../../image/2.jpg'),
        require('../../image/3.jpg'),
        require('../../image/4.jpg'),
      ]
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  align-content: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.dashboard-text {
  font-size: 30px;
  line-height: 80px;
  text-align: center;
}
</style>
