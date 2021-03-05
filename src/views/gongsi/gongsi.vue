<template>
  <div class="content">
    <el-tabs>
      <el-tab-pane label="公司信息">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-button type="primary" @click="goBack">返回首页</el-button>
          </el-col>
          <el-col :span="18">
            <div class="title">公司信息</div>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="160px"
            >
              <el-form-item label="公司名称：" prop="name">
                <el-input disabled v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="负责人/法人姓名：" prop="admin">
                <el-input v-model="ruleForm.admin"></el-input>
              </el-form-item>
              <el-form-item label="负责人身份证：" prop="id_card">
                <el-input v-model="ruleForm.id_card"></el-input>
              </el-form-item>
              <el-form-item label="负责人联系电话：" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="地址：" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="社会统一信用代码：" prop="credit_code">
                <el-input v-model="ruleForm.credit_code"></el-input>
              </el-form-item>
              <el-form-item label="服务区域" prop="service_area">
                <el-select
                  v-model="ruleForm.service_area"
                  placeholder="请选择服务区域"
                  disabled
                >
                  <el-option
                    v-for="(item, index) in selectList"
                    :key="index"
                    :label="item.name"
                    :value="item.coding"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="营业执照：">
                <upload
                  :imageUrl="ruleForm.company_picture"
                  ref="upload"
                  @uploadSuccess="uploadSuccess"
                ></upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  @click="resetForm()"
                  v-if="role_type == '1'"
                  >注销账号</el-button
                >
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  v-if="role_type == '1'"
                  >更新信息</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="个人信息">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-button type="primary" @click="goBack">返回首页</el-button>
          </el-col>
          <el-col :span="18">
            <div class="title">个人信息</div>
            <el-form :rules="rules" label-width="160px">
              <el-form-item label="姓名：">
                <el-input disabled v-model="userObj.nickname"></el-input>
              </el-form-item>
              <el-form-item label="登录账号：">
                <el-input disabled v-model="userObj.username"></el-input>
              </el-form-item>
              <el-form-item label="角色：">
                <el-input disabled v-model="userObj.role"></el-input>
              </el-form-item>
              <el-form-item label="头像：">
                <upload
                  :imageUrl="userObj.picture"
                  :uploadLimit="limt"
                  ref="upload"
                  @uploadSuccess="uploadSuccess1"
                ></upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="imgClick()"
                  >确认修改</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import upload from "@/components/upload";
import { baseUrl } from "@/common/common";
import selfApi from "@/api/selfApi";
export default {
  components: {
    upload
  },
  data() {
    return {
      role_type: "",
      c_id: "",
      company_id: "",
      ruleForm: {}, //公司信息
      userObj: {}, //个人信息
      selectList: [],
      limt: 1,
      //合同上传
      baseUrl: "",
      companyInfo: {},
      rules: {
        name: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        admin: [
          { required: true, message: "请输入负责人/法人姓名", trigger: "blur" }
        ],
        id_card: [
          {
            required: true,
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入负责人联系电话", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        email: [
          {
            required: true,
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //公司编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.ruleForm.company_picture) {
          this.$message.warning("请上传营业执照");
          return;
        }
        if (valid) {
          this.$confirm("确认提交, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              selfApi.updataCompany(this.c_id, this.ruleForm).then(res => {
                console.log(res);
                if (res.data.code == 0) {
                  this.$message.success("更新成功");
                  this.companyObj();
                } else {
                  this.$message.console.error(res.data.msg);
                }
              });
            })
            .catch(() => {
              this.$message.info("已取消更新");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //公司注销
    resetForm() {
      this.$confirm("确认提交, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.updataCompany(this.c_id).then(res => {
            if (res.data.code == 0) {
              this.$message.success("注销成功");
              this.companyObj();
            } else {
              this.$message.console.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消注销");
        });
    },
    //营业执照上传 
    uploadSuccess(arr) {
      this.ruleForm.company_picture = arr.join(",");
    },
    //头像上传
    uploadSuccess1(arr) { 
      this.userObj.picture = arr.join(",");
    },
    //头像修改
    imgClick() {
      this.$confirm("确认提交, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            picture: this.userObj.picture
          };
          selfApi.accountStatus(this.userObj.id, data).then(res => {
            if (res.data.code == 0) {
              this.$message.success("修改成功");
              this.userObjDetail();
            } else {
              this.$message.console.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消修改");
        });
    },
    goBack() {
      this.$router.back(1);
    },
    //公司信息
    companyObj() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.detailCompany(data).then(res => {
        if (res.data.code == 200) {
          this.ruleForm = res.data.data.data.results[0];
          this.imageUrl = `${this.baseUrl}/${res.data.data.data.results[0].company_picture}`;
        }
      });
    },
    //个人信息
    userObjDetail() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.userDetail(data).then(res => {
        if (res.data.code == 0) {
          this.userObj = res.data.data.data;
        }
      });
    },
    //服务区域列表
    serviceList() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.serviceData(data).then(res => {
        if (res.data.code == 0) {
          this.selectList = res.data.data.data;
        }
      });
    }
  },
  mounted() {
    this.baseUrl = baseUrl;
    this.company_id = JSON.parse(localStorage.getItem("userInfo")).company_id;
    this.c_id = JSON.parse(localStorage.getItem("userInfo")).c_id;
    this.role_type = JSON.parse(localStorage.getItem("userInfo")).role_type;
    this.companyObj();
    this.serviceList();
    this.userObjDetail();
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 28px;
  font-weight: 600;
}
.el-input {
  line-height: 28px;
  width: 400px;
}
.content /deep/ .el-upload.el-upload--text {
  border: 1px dashed #ccc;
}
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
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
