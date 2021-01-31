<template>
  <div class="menu">
    <el-bread></el-bread>
    <el-button @click="toOpen" type="primary" plain size="small"
      >添加</el-button
    >
    <!-- 弹框渲染 用到了子传父  addrole是role的子组件，给一个ref属性，获取子组件中的属性和方法 -->
    <v-add ref="selectOne" @cancel="cancel" :addInfo="addInfo"></v-add>
    <!-- 列表  -->
    <m-list  @edit="edit"></m-list>
  </div>
</template>

<script>
import MList from "./list";
import vAdd from "./addInfo";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //用于控制子组件弹框的显示隐藏
        isAdd: true, //是否是添加还是编辑
      },
    };
  },
  components: {
    MList,
    vAdd,
  },
  methods: {
    // 点击添加按钮出现弹框
    toOpen() {
      //打开弹框
      this.addInfo.isShow = true; //打开弹框
      //你是一个添加
      this.addInfo.isAdd = true; //true是添加 false是编辑
    },
    //封装一个改变isShow状态的自定义事件
    cancel(e) {
      this.addInfo = e;
    },
    //封装一个编辑事件
    edit(e) {
      //打开编辑弹框
      this.addInfo.isShow = true;
      //你是一个编辑
      this.addInfo.isAdd = false;
      // 调用查询方法
      this.$refs.selectOne.lookOne(e)//e就是id
    },
    
  },
};
</script>

<style  lang="stylus" scoped>
.menu {
  text-align: left;
  overflow: hidden;
  .el-button {
    display: block;
    margin-bottom: 20px;
  }
}
</style>
