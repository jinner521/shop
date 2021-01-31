<template>
  <div>
    <el-dialog
      center
      :title="addInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="managerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select v-model="managerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="managerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="managerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="managerForm.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块a
import { addManager, editManager, managerInfo } from "../../util/axios";
export default {
  data() {
    return {
      managerForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  mounted() {
    //用户列表一触发就调用角色列表
    this.getRoleListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction", //获取角色列表
      getManagerListAction: "manager/getManagerListAction",
      getCountAction: "manager/getCountAction"
    }),
    //封装一个取消事件
    cancel() {
      //子传父
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      // 重置
      this.reset();
    },
    // 封装一个重置
    reset() {
      this.managerForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2禁用
      };
      // 重置规则验证
      this.$refs['ruleForm'].resetFields();
    },
    // 封装一个添加事件
    add(formName) {
      //  调取添加接口，触发validate验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
          addManager(this.managerForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //关闭弹框  并重置
              this.cancel();
              //重新获取管理员列表
              this.getManagerListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //封装一个查询一条数据的事件 从父组件调用函数把id传过来
    lookOne(id) {
      // 调取查询接口
      managerInfo({ uid:id}).then((res) => {
        console.log(res, "查询用户一条数据结果");
        if (res.data.code === 200) {
          this.managerForm = res.data.list;
          this.managerForm.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      //当前密码如果修改就是重新赋值即可，如果为空就是上一次的密码
      //修改方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取修改接口
          editManager(this.managerForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getManagerListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>

<style lang="" scoped>
</style>
