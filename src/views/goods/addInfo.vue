<template>
  <div>
    <!-- opened	Dialog 打开动画结束时的回调 -->
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.first_cateid"
            @change="changeCate(false)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
       <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称："
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格：" prop="price" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格："
          prop="market_price"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsid"
            @change="changeSpecs(false)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <!-- multiple  可多选属性 -->
          <el-select
          multiple
            v-model="goodsForm.specsattr"
            placeholder="请选择"
          >
            <el-option
              v-for="item in specsArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
// 引入富文本编译器插件
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块a
import { getGoodsAdd, getGoodsEdit, getGoodsInfo } from "../../util/axios";
export default {
  data() {
    return {
      goodsForm: {
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsname: "", //商品名称
        price: 0, //价格
        market_price: 0, //市场价格
        img: "", //图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品 1新品 2否
        ishot: 1, //是否热卖 1热卖 2否
        status: 1, //1正常 2禁用
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择分类名称", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择分类", trigger: "change" },
         ],
        goodsname: [
          { required: true, message: "请填写商品名称", trigger: "change" },
          { min: 2, max: 20, message: "长度在 2到 20 个字符", trigger: "blur" },
          ],
        price: [
          { required: true, message: "请填写价格", trigger: "change" },
          ],
        market_price: [
          { required: true, message: "请填写价格", trigger: "change" },
        ],
        status: [{ required: true}],
        description: [{ required: true, message: "必填", trigger: "blur" }],
        specsid: [{ required: true, message: "必选", trigger: "blur" }],
         specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
        isnew: [{ required: true, message: "必选", trigger: "blur" }],
        ishot: [{ required: true, message: "必选", trigger: "blur"  }],
      },
      editor: null, // editor 初始值为空
      formLabelWidth: "120px", //label宽度
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
      secondCate: [], //二级分类空数组
      specsArr: [], //规格属性
    };
  },
  computed: {
    ...mapGetters({
      // 分类列表
      getCateList: "cate/getCateList",
      // 规格列表
      getSpecsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    //商品列表一触发就调用列表
    //分类列表行动
 
      this.getCateListAction();
   
    
    //规格列表行动

    this.getSpecsListAction();
    this.getCountAction();
  },
  props: ["addInfo"],
  methods: {
    //打开弹框之后再创建编辑器
    createEditor() {
      console.log(new E("#editor"), "插件的配置项");
      //实例化富文本编辑器
      this.editor = new E("#editor");
      //创建并初始化 把des 初识描述属性赋值
      this.editor.create();
      //初始化之后每次都重新赋空
      this.editor.txt.html(this.goodsForm.description);
      //取值 this.editor.txt.html()
    },
    changeCate(n) {
      console.log(this.goodsForm.first_cateid, "一级分类id");
      let index = this.getCateList.findIndex(
        item => this.goodsForm.first_cateid == item.id
      );
      
      this.secondCate = this.getCateList[index].children;
      if(!n) {
        this.goodsForm.second_cateid = "";
      }
    },
    //封装一个规格属性列表切换事件
    changeSpecs(n) {
      console.log(this.goodsForm.specsid, "商品规格编号");
      let index = this.getSpecsList.findIndex(
        item => this.goodsForm.specsid == item.id
      );
      this.specsArr = this.getSpecsList[index].attrs;
      console.log(this.specsArr, "规格属性");
      //当用户切换规格的时候，把双向数据绑定规格属性置空
      console.log(this.goodsForm.specsattr, "商品规格属性的双向数据绑定");
       if(!n) {
          this.goodsForm.specsattr = [];
      }
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction",
    }),
    // 文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了
           ${files.length} 个文件，共选择了 
           ${files.length + fileList.length} 个文件`
      );
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
      this.goodsForm = {
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsname: "", //商品名称
        price: 0, //价格
        market_price: 0 ,//市场价格
        img: "", //图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr:[], //商品规格属性
        isnew: "", //是否新品 1新品 2否
        ishot: "", //是否热卖 1热卖 2否
        status: "", //1正常 2禁用
      },
      this.fileList=[],
      // 重置规则验证
      this.$refs["ruleForm"].resetFields();
    },
    // 封装一个添加事件
    add(formName) {
      //  调取添加接口，触发validate验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 图片
          this.goodsForm.img = this.imgUrl;
          // 富文本域
          console.log(this.goodsForm.specsattr, "规格属性的多选项");
          //把富文本编辑器的内容直接赋值给 商品描述
          //this.editor.txt.html()  取出富文本编辑器的内容
          this.goodsForm.description = this.editor.txt.html();
         // 规格
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(","): ""; 
          console.log(this.goodsForm, "提交的表单体");
          //调取添加接口
          getGoodsAdd(this.goodsForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //关闭弹框  并重置
              this.cancel();
              //重新获取管理员列表
              this.getGoodsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } 
        else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 封装一个查询一条数据的事件 从父组件调用函数把id传过来
    lookOne(id) {
      // 调取查询接口
      getGoodsInfo({ id }).then((res) => {
        console.log(res, "查询商品一条数据结果");
        if (res.data.code === 200) {
          
          this.goodsForm = res.data.list;
          this.goodsForm.id=id;
          this.fileList=this.goodsForm.img ? [{url:this.$imgUrl+this.goodsForm.img}] : []
            this.goodsForm.specsattr = res.data.list.specsattr.split(','); 
          this.editor.txt.html(this.goodsForm.description);
          // 重新执行一级分类
          this.changeCate(true)
          // 重新执行规格属性
          this.changeSpecs(true)   
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
     update(formName) {
      //  触发validate验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 图片
            this.goodsForm.img = this.imgUrl ? this.imgUrl : this.goodsForm.img;
          // 富文本域
          console.log(this.goodsForm.specsattr, "规格属性的多选项");
          //把富文本编辑器的内容直接赋值给 商品描述
          //this.editor.txt.html()  取出富文本编辑器的内容
          this.goodsForm.description = this.editor.txt.html();
         // 规格
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(","): ""; 
          console.log(this.goodsForm, "提交的表单体");
          //调取修改接口
         getGoodsEdit(this.goodsForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //关闭弹框  并重置
              this.cancel();
              //重新获取管理员列表
              this.getGoodsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } 
        else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="" scoped>
.inp {
  width: 75%;
}
</style>
