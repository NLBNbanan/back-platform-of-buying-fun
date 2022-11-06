<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品类别" width="120">
      </el-table-column>
      <el-table-column prop="province" label="主图">
        <template slot-scope="scope">
          <img
            :src="scope.row.coverImg | handleImgPath"
            width="80"
            height="80"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="editproductcategories(scope.row)"
            >修改</el-button
          >
          <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <!-- 修改分类名字 -->
              <el-form-item label="分类名字" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 修改分类简介 -->
              <el-form-item label="分类简介" :label-width="formLabelWidth">
                <el-input v-model="form.descriptions" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 修改分类主图 -->
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="http://lanlianhua.work:8888/api/v1/common/file_upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    class="avatar"
                    width="100"
                    height="100"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" :plain="true" @click="upload">确 定</el-button>
            </div>
          </el-dialog>
          <!-- <EditProduct /> -->
          <el-button type="danger" :plain="true" @click="delProductCategory(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { loadcategorys } from "@/api/product";
import { getcategorysAPI, saveProductCategoryAPI,delProductCategoryAPI } from "@/api/productCategory";
export default {
  name: "ProductCategoryList",
  components: {},
  filters: {},
  data() {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pagesize: 10,
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        descriptions:'',
        //需要上传的图片路径
        coverImg: "",
      },
      categorys: [],
      imageUrl: "", // 控制图片的
      formLabelWidth: "120px",
    };
  },
  created() {
    this.initProCategories();
  },
  methods: {
    async initProCategories() {
      const res = await loadcategorys();
      // console.log(res);
      this.tableData = res.categories;
      this.page = res.pages;
      this.total = res.totalCount;
      this.imageUrl = res.coverImg
    },
    //点击修改分类信息,要根据ID获取一下商品分类信息
    editproductcategories(value) {
      console.log(value);
      this.dialogFormVisible = true;
      this.getProCategories(value._id);
      this.imageUrl = value.coverImg
      
      console.log(this.imageUrl);
    },
    async getProCategories(id) {
      const res = await getcategorysAPI(id);
      // console.log(res);
      this.form.name = res.category.name;
      this.form.coverImg = res.category.coverImg;
      this.form.id = res.category._id;
      this.form.descriptions =res.category.descriptions;
    },
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = "http://lanlianhua.work:8888" + res.info;
    },
    // 点击修改保存
    async upload() {
      const res = await saveProductCategoryAPI(
        this.form.id,
        this.form.name,
        this.form.descriptions,
        this.imageUrl
      );
      this.form.name = res.name;
      this.form.imageUrl = res.coverImg;
      // console.log(res.coverImg)
      this.initProCategories();
      this.dialogFormVisible = false;
      this.$message({
          message: '修改分类成功',
          type: 'success'
        });
    },
     async delProductCategory(value) {
      const result = await delProductCategoryAPI(value._id);
      this.$message({
          message: '删除分类成功',
          type: 'success'
        });
      this.initProCategories(); // 删除成功后再次调用一下接口
    },
  },
};
</script>

<style scoped>
.el-dialog {
  z-index: 3000;
}
</style>
