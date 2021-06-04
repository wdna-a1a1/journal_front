
<template>
  <div class="dashboard-text">期刊稿件管理系统
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
        require('../../image/1.jpg'),
        require('../../image/1.jpg'),
        require('../../image/1.jpg'),
        require('../../image/1.jpg'),
        require('../../image/1.jpg'),
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



.dashboard-text {
  font-size: 30px;
  line-height: 80px;
  text-align: center;
}
</style>
