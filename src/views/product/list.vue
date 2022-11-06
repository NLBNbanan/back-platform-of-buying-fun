<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120"> </el-table-column>
      <el-table-column label="主图" width="120">
        <template slot-scope="scope">
          <img
            :src="scope.row.coverImg | handleImgPath"
            width="80"
            height="80"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="库存"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editproduct(scope.row)"
>修改</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="form.descriptions"></el-input>
              </el-form-item>
              <el-form-item label="库存">
                <el-input v-model="form.quantity"></el-input>
              </el-form-item>
              <el-form-item label="说明">
                <el-input v-model="form.content"></el-input>
              </el-form-item>
              <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
              </el-form-item>

              <el-form-item label="商品分类">
                <el-select
                  v-model="form.productCategory"
                  placeholder="请选择分类"
                >
                  <el-option
                    :label="item.name"
                    :value="item._id"
                    v-for="item in categorys"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 图片上传 -->
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
              <el-button type="primary" @click="upload">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
          <!-- <EditProduct /> -->
          <el-button type="danger" @click="delProduct(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="page"
      @current-change="changepage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      @size-change="changepagesize"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  loadcategorys,
  loadproducts,
  saveProductAPI,
  delProductAPI,
} from "@/api/product";
// import qs from 'qs'
// import EditProduct from "./components/editProduct.vue";
export default {
  name: "ProductList",
  components: {},
  filters: {},
  data() {
    return {
      tableData: [],
      page: 1, // 控制页面
      total: 0,
      pagesize: 10,
      dialogFormVisible: false,
      form: {
        name: "",
        descriptions: "",
        quantity: "",
        content: "",
        price: "",
        productCategory: "",
        id: "",
      },
      categorys: [],
      imageUrl: "", // 控制图片的
      formLabelWidth: "120px",
    };
  },
  created() {
    this.initProducts();
  },
  methods: {
    async initProducts() {
      const result = await loadproducts({
        page: this.page,
        per: this.pagesize,
      });
      // console.log(result);
      this.tableData = result.products;
      this.total = result.totalCount; // 总条数
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = "http://lanlianhua.work:8888" + res.info;
    },
    // 点击页面
    changepage(page) {
      // console.log(page);
      this.page = page;
      this.initProducts();
    },
    changepagesize(pagesize) {
      // console.log(pagesize);
      this.pagesize = pagesize;
      this.initProducts();
    },
    //点击修改获取信息
    editproduct(value) {
      this.dialogFormVisible = true;
      console.log(value);
      this.getcategorys();
      this.form.name = value.name;
      this.form.price = value.price;
      this.form.descriptions = value.descriptions;
      this.form.quantity = value.quantity;
      this.form.content = value.content;
      this.form.productCategory = value.productCategory.name;
      this.form.id = value._id;
      this.imageUrl = value.coverImg;
    },
    //修改后点击确定
    async upload() {
      console.log(this.form.id);
      const res = await saveProductAPI(
        this.form.id,
        this.form.name,
        this.form.price,
        this.form.descriptions,
        this.form.quantity,
        this.imageUrl,
        this.form.productCategory
      );
      console.log(res);
      this.dialogFormVisible = false;
      this.initProducts();
    },
    //删除商品
    async delProduct(value) {
      const result = await delProductAPI(value._id);
      console.log(result);
      this.initProducts(); // 删除成功后再次调用一下接口
    },
    async getcategorys() {
      const result = await loadcategorys();
      console.log(result);
      this.categorys = result.categories;
    },
  },
};
</script>

<style scoped></style>
