<template>
  <div id="app">
    <el-container class="main">
      <el-main class="left">
        <el-button type="primary" style="position: relative;bottom: 20px"><i class="el-icon-circle-plus"></i> 添加
        </el-button>
        <el-tabs v-model="activeName" type="border-card" @tab-click="init()">
          <el-tab-pane :label="i.label" :name="i.name" v-for="i in tab">
            <diet-calendar-child :ref="i.ref"></diet-calendar-child>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import DietCalendarChild from "@/views/diet_management/children-template/DietCalendarChild";

export default {
  name: 'DietCalendar',
  components: {
    DietCalendarChild
  },
  data: () => {
    return {
      tab: [{name: "1", label: "星期一", ref: "diet1"},
        {name: "2", label: "星期二", ref: "diet2"},
        {name: "3", label: "星期三", ref: "diet3"},
        {name: "4", label: "星期四", ref: "diet4"},
        {name: "5", label: "星期五", ref: "diet5"},
        {name: "6", label: "星期六", ref: "diet6"},
        {name: "7", label: "星期日", ref: "diet7"}],
      activeName: "1",
    }
  },
  mounted() {
    this.init()
  },
  methods: {

    init() {
      this.$nextTick(() => {
        let ref = 'diet' + this.activeName
        console.log(this.$refs)
        this.$refs[ref][0].getData(this.activeName)
      })

    }
  }
}
</script>

<style scoped="scoped">
@import "../../styles/mix.scss";

.main {
  margin: 10px 0 40px 0;
}

#app {
}
</style>
