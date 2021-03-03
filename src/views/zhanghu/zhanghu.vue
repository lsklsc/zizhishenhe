<template>
  <div class="content">
    <!-- 检索 -->
    <el-form inline>
      <el-form-item label="登录账号：">
        <el-input
          placeholder="请输入角色名称"
          v-model="searchData.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-select v-model="searchData.role_id" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.obj_id"
            :label="item.role_name"
            :value="item.obj_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        @click="addAccount"
        v-if="role_type == '1' || role_type == '2'"
        >新增</el-button
      >
      <el-button type="primary" @click="searchClk">搜索</el-button>
      <el-button class="margin" type="warning" @click="resetClk"
        >重置</el-button
      >
    </el-form>
    <!-- table表格 -->
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      height="73vh"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="nickname" label="姓名"></el-table-column>
      <el-table-column prop="username" label="登陆账号"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="contacts" label="账号状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.user_status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchClick(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updataClick(scope.row)"
            >重置密码</el-button
          >
          <el-button
            type="text"
            style="color:red;"
            v-if="role_type == '1'"
            @click="delAccount(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog
      title="新建"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="handleClose('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名：" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role_id">
          <el-select v-model="ruleForm.role_id" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.obj_id"
              :label="item.role_name"
              :value="item.obj_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色状态：" prop="role_status">
          <el-radio-group v-model="ruleForm.user_status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >创建</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-size="pageData.page_size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import selfApi from "@/api/selfApi";
export default {
  data() {
    return {
      role_type: "",
      company_id: "",
      dialogVisible: false,
      tableData: [],
      ruleForm: {},
      options: [
        {
          value: 1,
          name: "管理员"
        },
        {
          value: 2,
          name: "编辑"
        },
        {
          value: 3,
          name: "查看"
        }
      ],
      status: "",
      roleList: [],
      searchData: {
        role_id: "",
        username: ""
      },
      pageData: {
        page: 1,
        page_size: 10
      },
      total: 0,
      rules: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [{ required: true, message: "请填写账号", trigger: "blur" }],
        user_status: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        role_id: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //新增
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          selfApi.addAccount(this.ruleForm).then(res => {
            if (res.data.code == 0) {
              this.$message.success("新增成功!");
              this.listData();
              this.dialogVisible = false;
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
    handleClose(ruleForm) {
      this.$refs["ruleForm"].resetFields();
    },
    //新增打开弹窗
    addAccount() {
      this.dialogVisible = true;
    },
    //修改状态
    switchClick(row) {
      let data = {
        user_status: row.user_status
      };
      selfApi.accountStatus(row.id, data).then(res => {
        if (row.user_status == 1) {
          this.$message.success("已启用!");
        } else {
          this.$message.info("已禁用!");
        }
        this.listData();
      });
    },
    //重置密码
    updataClick(row) {
      console.log(row);
      let data = {
        id: row.id,
        news_password: "123456"
      };
      this.$confirm("此操作将密码重置为 123456, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.updataPassword(data).then(res => {
            this.$message.success("重置成功!");
            this.listData();
          });
        })
        .catch(() => {
          this.$message.info("已取消重置");
        });
    },
    //删除账号
    delAccount(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.delAccount(row.id).then(res => {
            if (res.data.code == 204) {
              this.$message.success("删除成功!");
              this.listData();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //分页
    handleSizeChange(val) {
      this.pageData.page_size = val;
      this.listData();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.listData();
    },
    //搜索
    searchClk() {
      this.pageData.page = 1;
      this.listData();
    },
    //重置
    resetClk() {
      this.pageData.page = 1;
      this.pageData.page_size = 10;
      this.searchData = {};
      this.listData();
    },
    listData() {
      let params = {
        company_uid: this.company_id,
        page: this.pageData.page,
        size: this.pageData.page_size,
        ...this.searchData
      };
      selfApi.accountList(params).then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data.data.results;
          this.total = res.data.data.data.count;
        }
      });
    },
    //角色权限下拉列表
    roleData() {
      let data = {
        company_uid: this.company_id
      };
      selfApi.roleList(data).then(res => {
        if (res.status == 200) {
          this.roleList = res.data.data.data.results;
        }
      });
    }
  },
  mounted() {
    //获取公司id
    this.role_type = JSON.parse(localStorage.getItem("userInfo")).role_type;
    let userInfo = localStorage.getItem("userInfo");
    let user = JSON.parse(userInfo);
    this.company_id = user.company_id;
    this.ruleForm.company_uid = user.company_id;
    this.listData();
    this.roleData();
  }
};
</script>

<style scoped></style>
