<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      screen: {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      },
      timer: false
    }
  },
  watch: {
    screen: {
      handler() {
        const self = this
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.timer = true
          setTimeout(() => {
            self.$store.state.innerWH.innerWidth = self.screen.screenWidth
            self.$store.state.innerWH.innerHeight = self.screen.screenHeight
            self.timer = false
            // console.log(self.$store.state.innerWH.innerWidth, self.$store.state.innerWH.innerHeight)
          }, 100)
        }
      },
      deep: true
    }
  },
  mounted() {
    const self = this
    window.screenWidth = window.innerWidth
    window.screenHeight = window.innerHeight
    self.screen.screenWidth = window.screenWidth
    self.screen.screenHeight = window.screenHeight
    self.$store.state.innerWH.innerWidth = self.screen.screenWidth
    self.$store.state.innerWH.innerHeight = self.screen.screenHeight

    window.onresize = () => {
      return (() => {
        window.screenWidth = window.innerWidth
        window.screenHeight = window.innerHeight
        self.screen.screenWidth = window.screenWidth
        self.screen.screenHeight = window.screenHeight
      })()
    }
  }
}
</script>
