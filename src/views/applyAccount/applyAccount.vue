<template>
  <div class="content">
    <div class="left">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item>
          <div class="title">收运单位账号申请</div>
        </el-form-item>
        <div style="display:flex">
          <el-form-item prop="name">
            <span style="color:red;">*</span>公司名称：
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="admin">
            <span style="color:red;">*</span>负责人/法人姓名：
            <el-input v-model="ruleForm.admin"></el-input>
          </el-form-item>
        </div>
        <div style="display:flex">
          <el-form-item prop="id_card">
            <span style="color:red;">*</span>负责人身份证：
            <el-input v-model="ruleForm.id_card"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <span style="color:red;">*</span>负责人联系电话：
            <el-input maxlength="11" v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </div>
        <div style="display:flex">
          <el-form-item prop="address">
            <span style="color:red;">*</span>地址：
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item prop="credit_code">
            <span style="color:red;">*</span>社会统一信用代码：
            <el-input v-model="ruleForm.credit_code"></el-input>
          </el-form-item>
        </div>
        <div style="display:flex">
          <el-form-item prop="email">
            <div><span style="color:red;">*</span>邮箱：</div>
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="service_area" style="width:100%">
            <div><span style="color:red;">*</span>服务区域：</div>
            <el-select
              v-model="ruleForm.service_area"
              placeholder="请选择服务区域"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.coding"
                :label="item.name"
                :value="item.coding"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item prop="quali_file">
          <span style="color:red;">*</span>资质附件：
          <upload
            :imageUrl="ruleForm.quali_file"
            ref="upload"
            @uploadSuccess="uploadSuccess"
          ></upload>
        </el-form-item>
        <el-form-item prop="contract_file">
          <span style="color:red;">*</span>合同附件：
          <upload
            :imageUrl="ruleForm.contract_file"
            ref="upload"
            @uploadSuccess="uploadSuccess1"
          ></upload>
        </el-form-item>
        <el-form-item label="" prop="company_picture">
          <span style="color:red;">*</span>营业执照：
          <upload
            :imageUrl="ruleForm.company_picture"
            ref="upload"
            @uploadSuccess="uploadSuccess2"
          ></upload>
        </el-form-item>
        <el-button
          class="submitBtn"
          type="primary"
          @click="submitForm('ruleForm')"
          >提交申请</el-button
        >
      </el-form>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import upload from "@/components/upload";
import selfApi from "@/api/selfApi";
export default {
  components: { upload },
  data() {
    return {
      ruleForm: {},
      serviceList: [],
      rules: {
        name: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        admin: [
          { required: true, message: "请输入负责人/法人", trigger: "blur" }
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
          { required: true, message: "请输入手机号", trigger: "change" }
          // { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "change" }],
        credit_code: [
          {
            required: true,
            message: "请输入社会统一信用代码",
            trigger: "change"
          }
        ],
        service_area: [
          { required: true, message: "请选择服务区域", trigger: "change" }
        ],
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.ruleForm.quali_file) {
          this.$message.warning("请上传资质附件");
          return;
        }
        if (!this.ruleForm.contract_file) {
          this.$message.warning("请上传合同附件");
          return;
        }
        if (!this.ruleForm.company_picture) {
          this.$message.warning("请上传营业执照");
          return;
        }
        if (valid) {
          selfApi.addCompany(this.ruleForm).then(res => {
            if (res.data.code == 0) {
              this.$notify({
                title: "提交成功!",
                type: "success",
                offset: 100
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              this.$notify({
                title: res.data.msg,
                type: "error",
                offset: 100
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //资质附件
    uploadSuccess(arr) {
      this.ruleForm.quali_file = arr.join(",");
    },
    //合同附件
    uploadSuccess1(arr) {
      this.ruleForm.contract_file = arr.join(",");
    },
    //营业执照
    uploadSuccess2(arr) {
      this.ruleForm.company_picture = arr.join(",");
    },
    //获取服务区域
    serviceData() {
      selfApi.serviceData().then(res => {
        if (res.data.code == 0) {
          this.serviceList = res.data.data.data;
        }
      });
    }
  },
  mounted() {
    this.serviceData();
  }
};
</script>

<style scoped>
.content {
  display: flex;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}
.left {
  width: 50%;
}
.left >>> .title {
  font-size: 26px;
  display: flex;
  font-weight: 600;
  color: #291667;
  align-items: center;
}
.left >>> .el-form-item__content {
  font-size: 16px;
  color: #291667;
  font-weight: 600;
}
.left >>> .el-input__inner {
  border: 1px solid #ceced9;
}
.left >>> .el-select {
  width: 100%;
}
.left >>> .el-select > .el-input {
  width: 100%;
}
.right {
  flex: 1;
  background: url("../../../static/bg1.png");
  background-size: 100% 100%;
  background-position: center center;
}
.el-form-item {
  margin-bottom: 6px;
  width: 100% !important;
}
.el-input {
  line-height: 20px;
  width: 100%;
}
.left >>> .submitBtn {
  width: 160px;
  height: 40px;
  display: flex;
  margin: 0px auto;
  margin-bottom: 10px;
  justify-content: center;
  /* margin-top: 3px; */
}
.content /deep/ .el-upload.el-upload--text {
  border: 1px dashed #ccc;
}
</style>
