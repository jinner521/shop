<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="标题："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :auto-upload='false'
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change ='onChange'
            :file-list='fileList'
            :limit='1'
            :on-exceed='handleExceed'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
  
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerForm.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取消通过控制isshow成false  用到了子传父 -->
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="update('ruleForm')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入接口文档
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      //分类添加表单
      bannerForm: {
        title: '' ,//轮播图名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2到 20 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px", //label宽度
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList:[],//文件列表
    };
  },
  computed: {
    ...mapGetters({
     
    }),
  },
  methods: {
     ...mapActions({
      getBannerListAction: "banner/getBannerListAction"
    }),
    // 文件上传的限制
     handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 1 个文件，本次选择了
           ${files.length} 个文件，共选择了 
           ${files.length + fileList.length} 个文件`);
      },
    //当文件改变时，触发的函数方法
    onChange(file) {
      console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
   
    cancel() {
      //用到了子传父 取消去改变父组件的数据
      this.$emit("cancel", { isShow: false, isAdd: this.addInfo.isAdd });
      this.reset();
    },
    // 封装重置函数
    reset() {
      this.bannerForm = {
        title: '' ,//轮播图名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList=[];
    },
    //封装一个查看一条数据的事件
    lookOne(id) {
      //  调取查看一条数据的接口
      getBannerInfo({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.bannerForm = res.data.list;
          this.bannerForm.id = id;
          // 当查询数据调取接口 给filelist数组赋值
          this.fileList=this.bannerForm.img ? [{url:this.$imgUrl+this.bannerForm.img}] : []
        }
      });
    },
    /* 
    enctype 类型： 
      application/x-www-form-urlencoded	在发送前编码所有字符（默认）
      multipart/form-data	不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。

      如果我们有上传文件，那么我们的编码格式，就必须是formData格式，否则浏览器无法解析
    */
    //封装添加分类事件
    add(formName) {
       console.log(this.bannerForm, "表单体");
      // 验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.bannerForm.img = this.imgUrl
           getBannerAdd(this.bannerForm) //接口
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                //成功之后关闭弹框以及重置
                this.cancel();
                // 重新调取接口列表
                this.getBannerListAction();
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

    //封装修改分类事件
    update(formName) {
      //验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 针对于图片进行判断
         //this.imgUrl 它是图片对象配置。如果你修改的时候，修改了它，那么把它重新传到接口中，
        //  如果本次修改你没有修改它，那么就沿用上一次数据库的值
          //this.imgUrl = this.imgUrl ?this.imgUrl : this.bannerForm.img
          this.bannerForm.img = this.imgUrl ? this.imgUrl : this.bannerForm.img;
          //对于有上传文件的数据，我们要用构造函数FormData去转化
          let file = new FormData();
          //FormData 数据的添加只能用append ,获取值也只能用get方式获取
          //循环添加 对象 转化成了 FormData这种格式
          for (let i in this.bannerForm) {
            file.append(i,  this.bannerForm[i]);
          }
          getBannerEdit(file) //接口
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                //成功之后关闭弹框以及重置
                this.cancel();
                // 重新调取接口列表
                this.getBannerListAction();
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
  props: ["addInfo"], //父传子
};
</script>

<style lang="" scoped></style>
