<template>
  <div class="login">
    <el-form
      :model="loginList"
      label-width="100px"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginList.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password clearable v-model="loginList.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入封装好的接口模块
import { userLogin } from "../util/axios";
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loginList: {
        username: "", //用户名
        password: "",
      },
      rules: {
        //规则验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    //封装一个登录事件
    login(formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate((valid) => {
        console.log(valid, "validvalidvalidvalid");
        if (valid) {
         userLogin(this.loginList)
         .then(res=>{
           console.log(res,"登陆结果");
            if(res.data.code===200){
                this.$message.success(res.data.msg)
                //把登录结果存储到会话存储中 转字符串
                // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
              //  把信息存储到vuex中
              this.changeUserInfoAction(res.data.list)
               //跳转到首页
                this.$router.push('/home')
              }else{
                this.$message.error(res.data.msg)
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $oneBgColor;
  overflow: hidden;

  .el-form {
    width: 400px;
    height: 250px;
    margin: 150px auto;
  }
}
</style>
