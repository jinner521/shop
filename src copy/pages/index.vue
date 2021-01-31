<template>
  <div>
    <el-container>
      <el-header>
        <h2>小U商城后台管理系统</h2>
      </el-header>
      <el-container>
        <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/vNav";
export default {
  data() {
    return {};
  },
  components: {
    vNav
  },
};
</script>

<style lang="stylus" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  height: 60px !important;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6 !important;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
