<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
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
            <el-select v-model="form.productCategory" placeholder="请选择分类">
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { loadcategorys, addproduct } from "@/api/product";
export default {
  name: "CreateProduct",
  components: {},
  data() {
    return {
      form: {
        name: "2",
        descriptions: "22",
        quantity: "2",
        content: "2",
        price: "2",
        productCategory: "",
      },
      categorys: [],
      imageUrl: "", // 控制图片的
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getcategorys();
  },
  methods: {
    async getcategorys() {
      const result = await loadcategorys();
      console.log(result);
      this.categorys = result.categories;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = "http://lanlianhua.work:8888" + res.info;
    },
    async onSubmit() {
      const result = await addproduct({
        name: this.form.name,
        descriptions: this.form.descriptions,
        quantity: this.form.quantity,
        content: this.form.content,
        price: this.form.price,
        productCategory: this.form.productCategory,
        coverImg: this.imageUrl,
      });
      console.log(result);
      this.$router.push("/product/list");
    },
  },
};
</script>
