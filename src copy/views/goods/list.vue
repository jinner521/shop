<template>
  <div>
    <!-- 专门用于列表渲染 -->
    <el-table  :data="getGoodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="item">
          <div>
            <img  class="img"
              :src=" item.row.img ? $imgUrl + item.row.img
              :'http://i.shouchaobao.vip/d/file/202003/i5pjz34dpy1.jpg'" alt=""   />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
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
    <!-- 
      分页器 
      background	是否为分页按钮添加背景色	boolean	—	false
page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
total	总条目数	number	—	—
current-change	currentPage 改变时会触发	当前页
      -->
    <el-pagination
      :page-size="getGoodsSize"
      background
      layout="prev, pager, next"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    //store模块添加了命名空间，所以要修改名字
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getGoodsSize: "goods/getGoodsSize",
      getCountNum: "goods/getCountNum",
    }),
  },
  mounted() {
    //组件一加载触发这个获取规格列表的行动
    this.getGoodsListAction();
    //触发总条数行动
    this.getCountAction();
  },
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      changePageAction: "goods/changePageAction",
      getCountAction: "goods/getCountAction",
    }),
    //切换页码触发的事件
    changePage(n) {
      console.log(n, "当前页码数");
      this.changePageAction(n);
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
          getGoodsDelete({
            id,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //删除之后要重新调取列表
              this.getGoodsListAction();
              //重新调取总条数
              this.getCountAction();
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
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
.img{
  width: 100px;
  height: 100px;
}
.el-table{
  text-align: center;
} 
</style>
