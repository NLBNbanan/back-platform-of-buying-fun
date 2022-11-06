<template>
  <el-row type="flex" justify="center" :gutter="20">
    <el-col :span="12"
      ><div class="grid-content bg-purple-dark">
        <el-form :model="form">
          <!-- 分类名字 -->
          <el-form-item label="分类名字" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 分类简介 -->
          <el-form-item label="分类简介" :label-width="formLabelWidth">
            <el-input v-model="form.descriptions" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 分类主图 -->
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
            <el-button type="primary" :plain="true" @click="onSubmit"
              >立即创建</el-button
            >
            
          </el-form-item>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { addProductCategoryAPI } from "@/api/productCategory";
export default {
  data() {
    return {
      form: {
        name: "",
        descriptions: "",
      },
      imageUrl: "",
      formLabelWidth: "120px",
    };
  },
  methods: {
    async onSubmit() {
      const res = await addProductCategoryAPI({
        name: this.form.name,
        descriptions: this.form.descriptions,
        coverImg: this.imageUrl,
      });
      console.log(res);
      this.$message({
        message: "分类创建成功",
        type: "success",
      });
      this.form.name = "";
      this.form.descriptions = "";
      this.imageUrl = "";
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = "http://lanlianhua.work:8888" + res.info;
    },
  },
};
</script>

