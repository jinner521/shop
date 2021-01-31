<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          text-color="#000"
          active-text-color="#ffd04b"
          :default-active="defaultActive"
          router
        >
          <el-menu-item index="/home">
            <template slot="title">
              <i class="el-icon-menu"></i>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
            </template>
          </el-menu-item>
          <el-submenu
            v-for="item in getUserInfo.menus"
            :index="item.id.toString()"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="list in item.children"
              :key="list.id"
              :index="list.url"
              >{{ list.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
      // navList:[]
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.defaultActive = this.$route.path;
    // if(sessionStorage.getItem('loginInfo'))
    // {
    //   this.navList = JSON.parse(sessionStorage.getItem('loginInfo')).menus
    // }
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 90vh;
}
</style>
