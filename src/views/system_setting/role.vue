<template>
  <div>
    <el-table ref="mytable1" :data="roleList" style="width: 100%" @expand-change="handleExpandChange">
      <el-table-column type="expand">
        <template slot-scope="{ row, $index }">
          <el-row
            v-for="(item1, i1) in row.children"
            :key="item1.id"
            :class="['vcenter', 'bdbottom', i1 === 0 ? 'bdtop' : '']"
          >
            <el-col :span="5">
              <el-tag closable @close="handleDelRight(row, $index, item1.id)">{{
                  item1.authname
                }}
              </el-tag
              >
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row
                v-for="(item2, i2) in item1.children"
                :key="item2.id"
                :class="['vcenter', i2 === 0 ? '' : 'bdtop']"
              >
                <el-col :span="5">
                  <el-tag
                    closable
                    type="success"
                    @close="handleDelRight(row, $index, item2.id)"
                  >{{ item2.authname }}
                  </el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19" class="row3">
                  <el-tag
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    closable
                    type="warning"
                    @close="handleDelRight(row, $index, item3.id)"
                  >{{ item3.authname }}
                  </el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="角色ID" prop="id" width="180"></el-table-column>
      <el-table-column label="角色名称" prop="rolename" width="180">
      </el-table-column>
      <el-table-column label="角色描述" prop="roledesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button
          >
          <el-button
            icon="el-icon-setting"
            size="mini"
            type="warning"
            @click="handleFenpeiQuanxian(scope.row,scope.$index)"
          >分配权限
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--分配权限对话框  -->
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="分配权限"
      width="30%"
      @opened="handleDialogOpen"
    >
      <el-tree ref="mytree" :data="rightList" :default-checked-keys="defaultCheckedKeys" :props="treeProps"
               default-expand-all node-key="id" show-checkbox></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightList: [],
      roleList: [],
      dialogVisible: false,
      treeProps: {
        children: 'children',
        label: 'authname'
      },
      defaultCheckedKeys: [],   //  默认选中的node节点数组-->当前这个角色所具有的权限id数组
      current_role: {}, //当前操作的角色对象
      current_index: -1,
      expand_ids: []   //已经展开的行的id属性数组
    }
  },
  methods: {
    //表格展开行的状态发生变化
    handleExpandChange (row, expandedRows) {
      this.expand_ids = expandedRows.map(v => v.id)
      this.expand_ids = Array.from(new Set(this.expand_ids))
      console.log(this.expand_ids)
    },

    //点击对话框中的确定按钮--修改权限
    async handleDialogOk () {
      this.dialogVisible = false
      //发请求，修改权限
      let arr = this.$refs.mytree.getCheckedNodes(false, true).map(v => v.id)
      arr.unshift(this.current_role.id)

      let res = await this.$axios.post('roleRightR/fenpei', arr, {
        headers: {
          stringify: false
        }
      })

      this.current_role = res.data
      this.roleList[this.current_index] = res.data

      let pos = this.expand_ids.indexOf(this.current_role.id)
      // console.log("当前角色id:"+this.current_role.id+",在展开行数组中地位置是："+pos)
      if (pos >= 0) {
        this.$refs.mytable1.toggleRowExpansion(this.roleList[this.current_index], true)
      }

    },
    //递归查找权限id
    getLeafKeys (node, arr) {
      //console.log(node.children)
      if (!node.children) {
        return arr.push(node.id)
      } else {

        node.children.forEach(element => {
          this.getLeafKeys(element, arr)
        })
      }
    },
    //分配权限
    handleFenpeiQuanxian (row, index) {
      this.dialogVisible = true
      this.current_role = row
      this.current_index = index
    },
    //对话框打开事件
    handleDialogOpen () {
      //获取当前角色的权限id
      let arr = []
      this.getLeafKeys(this.current_role, arr)
      this.defaultCheckedKeys = arr
      this.$refs.mytree.setCheckedKeys(arr, true)
    },
    //分配权限对话框关闭之前的事件
    handleClose () {},
    //删除权限
    async handleDelRight (row, index, rightid) {
      let params = { roleid: row.id, rightid: rightid }
      let res = await this.$axios.post(
        'roleRightR/del',
        this.$qs.stringify(params)
      )
      this.$msg.success({ message: '操作成功' })
      this.roleList[index] = res.data
      row = res.data
      this.$refs.mytable1.toggleRowExpansion(row, true)
    },

    handleEdit (index, row) {

    },
    handleDelete (index, row) {

    },

    //获取角色列表
    async getRoleList () {
      let { data: res } = await this.$axios.get('role/getall')
      this.roleList = res
      console.log(res)
    },
    //获取权限列表
    async getRightList () {
      let { data: res } = await this.$axios.get('rights/getallrights')
      this.rightList = res
      console.log(this.rightList)
    },
  },
  created () {
    this.getRoleList()
    this.getRightList()
  },
}
</script>

<style scoped>
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

.el-tag {
  margin: 10px;
}
</style>
