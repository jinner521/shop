<template>
  <div>
    <!-- 专门用于列表渲染 -->
    <el-table :data="getRoleList" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
        <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <!-- 编辑本身存在于当前列表页list，先把编辑传给整个组件role，再把组件传给弹框addrole -->
          <div>
            <!-- 封装edit()方法  edit(item.row.id) id传给父组件 -->
            <el-button type="primary" @click="edit(item.row.id)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteRole } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      //store模块添加了命名空间，所以要修改名字
      getRoleList: "role/getRoleList",
    }),
  },
  mounted() {
    //   当列表渲染触发行动
    this.getRoleListAction();
  },
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction", //获取到的内容渲染到页面
    }),
    //封装编辑事件，传递当前项 id给 role 这个父组件
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("确定删除该数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          deleteRole({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //重新获取列表
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="" scoped>
</style>
