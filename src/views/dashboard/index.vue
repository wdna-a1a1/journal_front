<template>

  <div class="dashboard-container">
    <div class="dashboard-text">上实瑞慈颐养中心</div>
    <div class="dashboard-text">By Hwwwww</div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  mounted() {
    console.log(this.$store.state.user)
  }
}
</script>

<style lang="scss" scoped>
img {
  margin-left: 42%;
}

.dashboard {

  &-container {
  }

  &-text {
    font-size: 30px;
    line-height: 80px;
    text-align: center;
  }
}
</style>
