<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <el-table-column label="创建时间" width="100">
        <template slot-scope="scope">
          <!-- scope指的是本条数据对象 -->
          <span>{{ scope.row.createdAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <!-- scope指的是本条数据对象 -->
          <img
            :src="scope.row.avatar | handleImgPath"
            width="100"
            height="100"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edituser(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deluser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total
    >
    </el-pagination>
    <!-- 修改信息弹框 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://lanlianhua.work:8888/api/v1/common/file_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, xiugaiuser, shanchuuser } from "../../api/user";
export default {
  name: "UserList",
  components: {},
  filters: {
    // 时间过滤器
    dateFormat(dateStr, pattern = "yyyy-mm-dd") {
      var dt = new Date(dateStr);
      // yyyy-mm-dddd
      var y = dt.getFullYear();
      var m = dt.getMonth() + 1;
      var d = dt.getDate();

      if (pattern && pattern.toLowerCase() == "yyyy-mm-dd") {
        return `${y} - ${m} - ${d}`;
      } else {
        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();
        return `${y} ${m} ${d} ${hh}:${mm}:${ss}`;
      }
    },
    // 图片过滤器
    handleImgPath(str) {
      if (str) {
        if (str.startsWith("http") || str.startsWith("data")) {
          return str;
        } else {
          return "http://lanlianhua.work:8888" + str;
        }
      } else {
        // str没有数据的话，给他一张默认图片
        return "http://www.superslide2.com/demo/images/pic1.jpg";
      }
    },
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false, //用于控制修改用户弹框
      form: {
        name: "",
      },
      formLabelWidth: "120px",
      imageUrl: "", //点击修改按钮回显数据
      id: "", //保存用户的id
      total:'',//分页总条数
      page: 1,//默认页码
      per:10,
    };
  },
  created() {
    this.initUsers();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.per = val;
      this.initUsers();
    },
    handleCurrentChange(val) {//改变页码
      console.log(val);
      this.page = val;
      this.initUsers()
    },
    async initUsers() {
      const result = await getUsers(this.per,this.page);
      console.log(result);
      this.tableData = result.users;
      this.total=result.totalCount
    },
    // 编辑用户弹框
    edituser(user) {
      // 点击后弹出弹框
      this.dialogFormVisible = true;
      this.form.name = user.userName;
      this.imageUrl = this.handleImgPath(user.avatar);
      this.id = user._id;
    },
    // 上传成功后的回调
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = "http://lanlianhua.work:8888" + res.info;
    },
    // 修改后点击确定
    async editsure() {
      // 调接口进行修改
      const result = await xiugaiuser(this.id, {
        userName: this.form.name,
        avatar: this.imageUrl,
      });
      console.log(result);
      this.dialogFormVisible = false; // 修改成功之后关闭弹框
      this.initUsers();
    },
    // 删除用户
    async deluser(user) {
      const result = await shanchuuser(user._id);
      console.log(result);
      this.initUsers(); // 删除成功后再次调用一下接口
    },
    // 过滤图片
    handleImgPath(str) {
      if (str) {
        if (str.startsWith("http") || str.startsWith("data")) {
          return str;
        } else {
          return "http://lanlianhua.work:8888" + str;
        }
      } else {
        // str没有数据的话，给他一张默认图片
        return "http://www.superslide2.com/demo/images/pic1.jpg";
      }
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
