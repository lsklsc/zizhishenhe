<template>
  <div class="content">
    <!-- 检索 -->
    <el-form inline>
      <el-form-item label="角色名称：">
        <el-input
          placeholder="请输入角色名称"
          v-model="searchData.role_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色权限：">
        <el-select v-model="searchData.role_type" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
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
      <el-table-column prop="role_name" label="角色名称"></el-table-column>
      <el-table-column prop="role_name" label="角色权限">
        <template slot-scope="scope">
          <span v-if="scope.row.role_type == 1">管理员</span>
          <span v-if="scope.row.role_type == 2">编辑</span>
          <span v-if="scope.row.role_type == 3">查看</span>
        </template>
      </el-table-column>
      <el-table-column prop="role_content" label="角色说明"></el-table-column>
      <el-table-column prop="contacts" label="角色状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.role_status"
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
          <el-button type="text" @click="lookClick(scope.row)">查看</el-button>
          <el-button
            type="text"
            v-if="role_type == '1' || role_type == '2'"
            @click="updataClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            style="color:red;"
            v-if="role_type == '1'"
            @click="deleteRoleClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 编辑 -->
    <el-dialog
      :title="title"
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
        <el-form-item label="角色名称：" prop="role_name">
          <el-input v-model="ruleForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="角色权限：" prop="role_type">
          <el-select v-model="ruleForm.role_type" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色说明：">
          <el-input v-model="ruleForm.role_content"></el-input>
        </el-form-item>
        <el-form-item label="角色状态：" prop="role_status">
          <el-radio-group v-model="ruleForm.role_status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="访问页面：">
          <el-tree
            :data="visvitList"
            :props="defaultProps"
            show-checkbox
            :default-expand-all="false"
            ref="tree"
            node-key="nav_id"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog
      title="查看"
      :visible.sync="lookDialogVisible"
      width="50%"
      @close="clearCartList"
    >
      <el-row>
        <el-col>角色名称：{{ lookObj.role_name }}</el-col>
      </el-row>
      <el-row>
        <el-col
          >角色权限：
          <span v-if="lookObj.role_type == '1'">管理员</span>
          <span v-if="lookObj.role_type == '2'">编辑</span>
          <span v-if="lookObj.role_type == '3'">查看</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          角色状态：
          <span v-if="lookObj.role_status == '1'"> 启用</span>
          <span v-if="lookObj.role_status == '0'"> 禁用</span>
        </el-col>
      </el-row>
      <div class="group_name">
        <span>访问页面：</span>
        <span class="span" v-for="(i, idx) in lookObj.group_name" :key="idx">{{
          i + " / "
        }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookDialogVisible = false"
          >取 消</el-button
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
import treeFormat from "@/common/treeFormat";
export default {
  data() {
    return {
      role_type: "",
      company_id: "",
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        role_status: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ],
        role_type: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ]
      },
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
      value: [],
      dialogVisible: false,
      title: "",
      lookDialogVisible: false,
      tableData: [],
      ruleForm: {},
      status: "",
      searchData: {
        role_name: "",
        role_type: ""
      },
      pageData: {
        page: 1,
        page_size: 10
      },
      total: 0,
      lookObj: {},
      defaultProps: {
        value: "nav_id",
        label: "nav_name",
        children: "children"
      },
      visvitList: []
    };
  },
  methods: {
    //新增 编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.obj_id) {
            this.updataRole();
          } else {
            this.addRole();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增角色
    addRole() {
      let list = this.$refs.tree.getCheckedNodes();
      console.log(list);
      let temp = [];
      list.forEach(item => {
        temp.push(item.nav_id);
        if (item.parentId && temp.indexOf(item.parentId) == -1) {
          temp.push(item.parentId);
        }
      });
      this.ruleForm.role_group = temp.join(",");
      if (list.length == 0) {
        this.$message.error("请先为该角色分配菜单");
        return;
      }
      selfApi.adRole(this.ruleForm).then(res => {
        if (res.data.code == 0) {
          this.$message.success("新增成功!");
          this.listData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //编辑角色
    updataRole() {
      let list = this.$refs.tree.getCheckedNodes();
      let temp = [];
      list.forEach(item => {
        temp.push(item.nav_id);
        if (item.parentId && temp.indexOf(item.parentId) == -1) {
          temp.push(item.parentId);
        }
      });
      this.ruleForm.role_group = temp.join(",");
      if (list.length == 0) {
        this.$message.error("请先为该角色分配菜单");
        return;
      }
      selfApi.upRole(this.ruleForm.obj_id, this.ruleForm).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功!");
          this.listData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleClose(ruleForm) {
      this.$refs["ruleForm"].resetFields();
      this.ruleForm = {};
    },
    //编辑打开弹窗
    updataClick(row) {
      this.title = "编辑角色";
      this.ruleForm = { ...row };
      let list = row.role_group.split(",");
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(list);
      });
      this.dialogVisible = true;
    },
    //新增打开弹窗
    addAccount() {
      this.ruleForm.company_uid = this.company_id;
      this.title = "添加角色";
      this.dialogVisible = true;
    },
    //查看
    lookClick(row) {
      console.log(row);
      this.lookObj = { ...row };
      this.lookDialogVisible = true;
    },
    //修改状态
    switchClick(row) {
      let data = {
        role_status: row.role_status
      };
      selfApi.updataRoleStatus(row.obj_id, data).then(res => {
        if (row.role_status == 1) {
          this.$message.success("已启用!");
        } else {
          this.$message.info("已禁用!");
        }
        this.listData();
      });
    },
    //删除角色
    deleteRoleClick(row) {
      console.log(row);
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.deleteRole(row.obj_id).then(res => {
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
    clearCartList() {
      this.lookObj = {};
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
      selfApi.roleData(params).then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data.data.results;
          this.total = res.data.data.data.count;
        }
      });
    },
    //访问页面列表
    getVisvitList() {
      selfApi.visvitPageList().then(res => {
        if (res.status == 200) {
          this.visvitList = treeFormat.transData(
            res.data.data,
            "nav_id",
            "pid",
            "children"
          );
          console.log(this.visvitList);
        }
      });
    }
  },
  mounted() {
    this.role_type = JSON.parse(localStorage.getItem("userInfo")).role_type;
    this.company_id = JSON.parse(localStorage.getItem("userInfo")).company_id;
    this.ruleForm.company_uid = JSON.parse(
      localStorage.getItem("userInfo")
    ).company_id;
    this.listData();
    this.getVisvitList();
  }
};
</script>

<style scoped>
.el-col {
  line-height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.demo-ruleForm {
  height: 600px;
}
.group_name {
  font-size: 16px;
}
.span {
  display: inline-block;
  line-height: 30px;
}
.showBtn {
  display: block;
}
.noneBtn {
  display: none;
}
</style>
