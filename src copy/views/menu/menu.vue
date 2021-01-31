<template>
  <div class="menu">
    <el-bread></el-bread>
    <el-button @click='toOpen' type="primary" plain size="small">添加</el-button>
    <!-- 用到了子传父 -->
    <v-dialog @cancel='cancel' ref="vAdd" :addInfo ='addInfo'></v-dialog> 
    <!-- 列表 -->
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
import vTable from "./list";
import vDialog from './addInfo'
export default {
  data() {
    return {
      addInfo:{
        isShow:false ,//控制弹框显示隐藏 true显示  false隐藏
        isAdd:true,//控制添加或者编辑 true添加 false编辑
      },
       //父传子
    }
  },
  components: {
    vTable,
    vDialog
  },
  methods: {
    //点击添加按钮，出现弹框
    toOpen(){
      // 打开弹框
      this.addInfo.isShow = true   //父传子
      // 告诉弹框自己是true添加
      this.addInfo.isAdd = true   //父传子
    },
    cancel(e){
      console.log(e,'子组件修改父组件的值');
      // this.addInfo.isShow  =e //用到了子传父
      this.addInfo =e
    },
    // 封装一个编辑事件
    edit(e){
      console.log(this.$refs.vAdd,'子组件的实例');
      // 打开编辑弹框
      this.addInfo.isShow=true,
        // 告诉弹框自己是false 编辑
      this.addInfo.isAdd=false
      this.$refs.vAdd.lookOne(e)
    }
  },
};
</script>

<style lang="stylus" scoped>
.menu
  text-align left 
  overflow hidden
  .el-button
    display block
    margin-bottom 20px
</style>
