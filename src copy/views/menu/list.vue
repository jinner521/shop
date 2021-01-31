<template>
  <div>
    <!-- 专门用于列表渲染
    default-expand-all 是否默认展开所有行，当 Table包含展开行存在或者为
    树形表格时有效
     tree-props 渲染欣套数据的配置选项object - { haschiLdren:' hasChiLdren ' , children: 'chiLdren’}
      row-key行数据的Key，用来优化 Table 的渲染;在使用
      reserve-seLection功能与显示树形数据时，该属性是必填的。类型为string
      时，支持多层访问: user.info.id，但不支持user.info[0].id，此种情况诗使用Function
     -->
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      default-expand-all
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
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
          <div>
            <!-- {{item.row}} -->
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
// 调用辅助函数
import { mapActions, mapGetters } from "vuex";
// 引入接口文档
import { deleteMenu } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //当列表渲染触发行动 methods里getMenuList()函数
    this.getMenuList();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      // getMenuListActio行动名称 改名  getMenuList行动函数
      getMenuList: "menu/getMenuListAction",
    }),
    // 封装编辑事件
    edit(id) {
      // 告诉父组件，要打开编辑弹框 ，并且传一个id
      this.$emit("edit", id);
    },
    // 封装删除事件
    del(id) {
      this.$confirm("确定删除该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteMenu({
            id,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //  当列表删除成功触发刷新
              this.getMenuList();
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

<style lang="stylus" scoped></style>
