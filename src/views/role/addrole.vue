<template>
  <div>
    <el-dialog
      center
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="role" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="role.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item left label="角色权限" :label-width="formLabelWidth">
          <!-- check-strictly	在显示复选框的情况下，是否严格的遵循父子不互
          相关联的做法，默认为 false	boolean	—	false -->
          <!-- 角色权限的树结构应该获取的是我们菜单列表的树结构列表 -->
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{
              children: 'children', //树形层级
              label: 'title', //展示的内容  title指得的是菜单名称
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="role.status"
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
//引入封装好的添加接口
import { addRole, RoleInfo, editRole } from "../../util/axios";
export default {
  data() {
    return {
      role: {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    //角色列表一触发就调用菜单列表
    this.getMenuListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction", //获取菜单列表
      getRoleListAction: "role/getRoleListAction", //获取到的内容渲染到页面
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
      this.role = {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
      //重置角色权限树结构
      this.$refs.tree.setCheckedKeys([]);
    },
    // 封装一个添加事件
    add(formName) {
      // console.log(this.$refs.tree.getCheckedKeys(), "通过key获取节点");
    //  调取添加接口，触发validate验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
           //this.$refs.tree.getCheckedKeys()//取出来的值是[1,2,3]数组格式，我们要的是"1,2,3"通过join(",")拼接
          //菜单权限要求的格式是菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]' 菜单权限 存放的是菜单编号，用逗号隔开
           this.role.menus = this.$refs.tree.getCheckedKeys().join(",");
            // console.log(this.role, "角色表单对象");
          addRole(this.role).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //关闭弹框  并重置
              this.cancel();
              //重新获取列表
              this.getRoleListAction();
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
      RoleInfo({ id }).then((res) => {
        console.log(res, "查询角色一条数据结果");
        if (res.data.code === 200) {
          this.role = res.data.list;
          //把menus的返回值设置给角色权限
          this.$refs.tree.setCheckedKeys(this.role.menus.split(","));
          this.role.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
   update(formName) {
    //  调取添加接口，触发validate验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取修改接口
       this.role.menus = this.$refs.tree.getCheckedKeys().join(",");
         //调取修改接口
          editRole(this.role).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //关闭弹框  并重置
              this.cancel();
              //重新获取列表
              this.getRoleListAction();
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
  },
};
</script>

<style lang="" scoped>
</style>
