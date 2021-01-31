<template>
  <div>
    <!-- 专门用于列表渲染 -->
    <el-table :data="getManagerList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
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
            <el-button type="primary" @click="edit(item.row.uid)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
        <!-- 
      分页器 
      background	是否为分页按钮添加背景色	boolean	—	false
page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
total	总条目数	number	—	—
current-change	currentPage 改变时会触发	当前页
      -->
    <el-pagination :page-size='getManagerSize' 
    background layout="prev, pager, next"
     :total="getCountNum" 
    @current-change='changePage' >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块
import { deleteManager } from "../../util/axios";
export default {
  data() {
    return {};
  },
 computed: {
    //store模块添加了命名空间，所以要修改名字
    ...mapGetters({
      getManagerList: "manager/getManagerList",
      getManagerSize:'manager/getManagerSize',
      getCountNum:'manager/getCountNum'
    })
  },
  mounted() {
    //组件一加载触发这个获取用户列表的行动
    this.getManagerListAction();
    //触发总条数行动
    this.getCountAction()
  },
  methods: {
    ...mapActions({
      getManagerListAction: "manager/getManagerListAction",
      getCountAction:'manager/getCountAction',
      changePageAction:'manager/changePageAction'
    }),
     //切换页码触发的事件
    changePage(n){
      console.log(n,'当前页码数');
      this.changePageAction(n)
    },
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
          deleteManager({ uid:id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
             //删除之后要重新调取列表
              this.getManagerListAction();
              //重新调取总条数
              this.getCountAction()
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
.el-pagination{
  float: right;
  margin: 20px 35px 0 0;

}
</style>
