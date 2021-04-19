<template>
  <div id="app">
    <el-container class="main">
      <el-main class="left">
        <el-button type="primary" style="position: relative;bottom: 20px" @click="addOrUpdateHandle()"><i class="el-icon-circle-plus"></i> 新增
        </el-button>
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
        <el-tabs v-model="activeName" @tab-click="getDataList()">
          <el-tab-pane v-for="i in tab" :label="i.label" :name="i.name">
            <diet-calendar-child :ref="i.ref" @canlendarDel="canlendarDel" @canlendarMod="canlendarMod"/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import DietCalendarChild from '@/views/diet_management/children-template/diet-calendar-child'
import AddOrUpdate from '@/views/diet_management/children-template/food-add-or-update'

export default {
  name: 'DietCalendar',
  components: {
    DietCalendarChild, AddOrUpdate
  },
  data: () => {
    return {
      tab: [{ name: '1', label: '星期一', ref: 'diet1' },
        { name: '2', label: '星期二', ref: 'diet2' },
        { name: '3', label: '星期三', ref: 'diet3' },
        { name: '4', label: '星期四', ref: 'diet4' },
        { name: '5', label: '星期五', ref: 'diet5' },
        { name: '6', label: '星期六', ref: 'diet6' },
        { name: '7', label: '星期日', ref: 'diet7' }],
      activeName: '1',
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.$nextTick(() => {
        const ref = 'diet' + this.activeName
        this.$refs[ref][0].getData(this.activeName)
      })
    },
    canlendarMod (id) {
      this.addOrUpdateHandle(id)
    },
    canlendarDel (id) {
      this.deleteHandle(id)
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.post('/food/del', { id })
          .then(({ data }) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error("操作失败")
            }
          })
      })
    }
  },

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
