<template>
  <div class="content">
    <!-- tab -->
    <el-tabs v-model="activeParams" @tab-click="tabClick">
      <el-tab-pane label="草稿" name="0"></el-tab-pane>
      <el-tab-pane label="待处理" name="1"></el-tab-pane>
      <el-tab-pane label="不通过" name="2"></el-tab-pane>
      <el-tab-pane label="已通过" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 检索 -->
    <el-form inline>
      <el-form-item label="资质名称：">
        <el-input
          placeholder="请输入资质名称"
          v-model="searchData.name"
        ></el-input>
      </el-form-item>

      <el-form-item label="保存日期" v-if="activeParams == '0'">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="提交日期" v-if="activeParams == '1'">
        <el-date-picker
          v-model="date2"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="审核日期" v-if="activeParams == '2'">
        <el-date-picker
          v-model="date3"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="通过日期" v-if="activeParams == '3'">
        <el-date-picker
          v-model="date3"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-button type="primary" @click="searchClk">搜索</el-button>
      <el-button
        type="primary"
        @click="addClk"
        v-if="activeParams == '0' && (role_type == '1' || role_type == '2')"
        >新建</el-button
      >
      <el-button class="margin" type="warning" @click="resetClk"
        >重置</el-button
      >
      <el-button type="primary" @click="exportTable">导出</el-button>
      <el-form-item>
        <dataExport
          ref="export"
          filename="资质管理"
          :data="tableData"
        ></dataExport>
      </el-form-item>
      <el-form-item v-if="activeParams == '0'">
        <el-upload
          accept=".xls, .xlsx"
          action="string"
          :http-request="httpRequest"
        >
          <el-button type="primary">导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="activeParams == '0'">
        <el-button type="success" @click="importClick">下载导入模板</el-button>
      </el-form-item>
    </el-form>
    <!-- table表格 -->
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      height="67vh"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="enter_time"
        label="通过时间"
        v-if="activeParams == '3'"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="保存时间"
        v-if="activeParams == '0'"
      ></el-table-column>
      <el-table-column
        prop="submit_time"
        label="提交时间"
        v-if="activeParams == '1'"
      ></el-table-column>
      <el-table-column
        prop="enter_time"
        label="审核时间"
        v-if="activeParams == '2'"
      ></el-table-column>
      <el-table-column prop="name" label="资质名称"></el-table-column>
      <el-table-column
        prop="signed_time"
        label="证书备案日期"
      ></el-table-column>
      <el-table-column prop="viald_time" label="证书有效期"></el-table-column>
      <!-- <el-table-column
        prop="jia_type"
        label="最后操作人"
        v-if="caozuo"
      ></el-table-column> -->
      <el-table-column
        prop="licensed_content"
        label="许可内容"
        v-if="licensed_content"
      ></el-table-column>
      <el-table-column
        prop="no_reject"
        label="不通过原因"
        v-if="no_reject"
      ></el-table-column>
      <el-table-column prop="contacts" label="资质图片">
        <template slot-scope="scope">
          <el-button type="text" @click="lookImgClick(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="
              isButton0 &&
                (role_type == '1' || role_type == '2' || role_type == '3')
            "
            @click="lookClick(scope.row)"
            >查看</el-button
          >
          <el-button
            type="text"
            v-if="isButton1 && (role_type == '1' || role_type == '2')"
            @click="submitClick(scope.row)"
            >提交</el-button
          >
          <el-button
            type="text"
            v-if="isButton2 && (role_type == '1' || role_type == '2')"
            @click="updataClick(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            v-if="isButton3 && role_type == '1'"
            style="color:red;"
            @click="deleteClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建 编辑 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
      width="50%"
      @close="handleClose('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm"
      >
        <el-form-item label="资质名称：" prop="name">
          <el-input width="200px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="服务区域：" prop="service_area">
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
        <el-form-item label="证书备案日期：" prop="signed_time">
          <el-date-picker
            :picker-options="pickerOptions0"
            v-model="ruleForm.signed_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择证书备案日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证书有效期：" prop="viald_time">
          <!-- <el-date-picker
            :picker-options="pickerOptions0"
            v-model="ruleForm.viald_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择证书有效期"
          >
          </el-date-picker> -->
          <el-date-picker
            v-model="ruleForm.viald_time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="请选择证书有效期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证书编号：" prop="certificate_number">
          <el-input v-model="ruleForm.certificate_number"></el-input>
        </el-form-item>
        <el-form-item label="许可内容：" prop="licensed_content">
          <el-input v-model="ruleForm.licensed_content"></el-input>
        </el-form-item>
        <el-form-item label="发证机关：" prop="licence_place">
          <el-input v-model="ruleForm.licence_place"></el-input>
        </el-form-item>
        <el-form-item label="资质照片：" prop="qualification_picture">
          <upload
            :imageUrl="ruleForm.qualification_picture"
            ref="upload"
            @uploadSuccess="uploadSuccess"
          ></upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <el-row :gutter="20">
        <el-col :span="12">资质名称：{{ lookObj.name }}</el-col>
        <el-col :span="12">证书备案日期：{{ lookObj.signed_time }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">证书有效期：{{ lookObj.viald_time }}</el-col>
        <el-col :span="12">证书编号：{{ lookObj.certificate_number }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">许可内容：{{ lookObj.licensed_content }}</el-col>
        <el-col :span="12">发证机关：{{ lookObj.licence_place }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          资质照片：
          <el-image
            v-for="i in imgList"
            :key="i"
            style="width: 100px; height: 100px"
            :src="i"
            :preview-src-list="imgList"
          >
            <div slot="error" style="line-height:100px">
              暂无图片
            </div>
          </el-image>
        </el-col>
      </el-row>
      <div
        v-if="activeParams == '2' || activeParams == '3'"
        class="recordTable"
      >
        <el-table
          ref="table"
          :data="recordList"
          stripe
          border
          height="26vh"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="create_time" label="时间"></el-table-column>
          <el-table-column prop="username" label="修改人"></el-table-column>
          <el-table-column prop="update_data" label="修改项"></el-table-column>
          <el-table-column prop="old_content" label="修改前">
            <template slot-scope="scope">
              <div
                v-if="scope.row.old_content.indexOf('http') > -1"
                style="display:flex"
              >
                <div
                  v-for="(item, index) in scope.row.old_content.split(',')"
                  :key="index"
                >
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="item"
                    :preview-src-list="scope.row.old_content.split(',')"
                  ></el-image>
                </div>
              </div>
              <div v-else>{{ scope.row.old_content }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="new_content" label="修改后">
            <template slot-scope="scope">
              <div
                v-if="scope.row.new_content.indexOf('http') > -1"
                style="display:flex"
              >
                <div
                  v-for="(item, index) in scope.row.new_content.split(',')"
                  :key="index"
                >
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="item"
                    :preview-src-list="scope.row.new_content.split(',')"
                  ></el-image>
                </div>
              </div>
              <div v-else>{{ scope.row.new_content }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 图片查看 -->
    <el-dialog title="资质照片" :visible.sync="imgDialogVisible" width="50%">
      <el-image
        v-for="i in imgList"
        :key="i"
        style="width: 100px; height: 100px"
        :src="i"
        :preview-src-list="imgList"
      >
        <div slot="error" style="line-height:100px">
          暂无图片
        </div>
      </el-image>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgDialogVisible = false"
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
import upload from "@/components/upload";
import selfApi from "@/api/selfApi";
export default {
  components: {
    upload
  },
  data() {
    return {
      role_type: "",
      company_id: "", //公司id
      pickerOptions1: {
        disabledDate(time) {
          var todayYear = new Date().getFullYear();
          var todayMonth = new Date().getMonth();
          var todayDay = new Date().getDate();
          var todayTime = new Date(
            todayYear,
            todayMonth,
            todayDay,
            "23",
            "59",
            "59"
          ).getTime(); // 毫秒
          return time.getTime() > todayTime;
        }
      },
      rules: {
        name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        certificate_number: [
          { required: true, message: "请输入证书编号", trigger: "blur" }
        ],
        licensed_content: [
          { required: true, message: "请填写许可内容", trigger: "blur" }
        ],
        licence_place: [
          { required: true, message: "请填写发证机关", trigger: "blur" }
        ],
        signed_time: [
          { required: true, message: "请选择证书备案日期", trigger: "blur" }
        ],
        viald_time: [
          { required: true, message: "请选择证书有效期", trigger: "blur" }
        ],
        service_area: [
          { required: true, message: "请选择服务区域", trigger: "blur" }
        ]
      },
      selectList: [],
      dialogVisible: false,
      dialogVisible1: false,
      imgDialogVisible: false,
      dialogTitle: "",
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(
              new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            )
          );
        }
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //禁用以前的日期，今天不禁用
          // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },
      ruleForm: {},
      tableData: [],
      options: [
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核失败"
        },
        {
          value: "3",
          label: "已注销"
        }
      ],
      status: "",
      searchData: {
        contractVal: ""
      },
      date1: [],
      date2: [],
      date3: [],
      pageData: {
        page: 1,
        page_size: 10
      },
      total: 0,
      activeParams: "0",
      isYi: true,
      isCause: false,
      isButton0: true,
      isButton1: true,
      isButton2: true,
      isButton3: true,
      no_reject: false,
      licensed_content: false,
      caozuo: true,
      lookObj: {},
      //合同上传
      recordList: [], //修改记录
      oldruleForm: {},
      imgList: [],
      serviceList: []
    };
  },
  methods: {
    //导入
    httpRequest(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("company_id", this.company_id);
      selfApi.importQualification(formData).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.certificationList();
        } else if (res.data.code == 208) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //导出
    exportTable() {
      this.$confirm("本次共导出" + this.total + "条数据是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let para = {
            company_id: this.company_id,
            page: this.pageData.page,
            size: this.pageData.page_size,
            ...this.searchData,
            start_create_time: this.date1[0],
            end_create_time: this.date1[1],
            start_enter_time: this.date3[0],
            end_enter_time: this.date3[1],
            start_submit_time: this.date2[0],
            end_submit_time: this.date2[1],
            status: this.activeParams
          };
          let api = "certificationData";
          let data = {
            data: para,
            api,
            total: this.total
          };
          this.$refs["export"].exportlist(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    //导入模板下载
    importClick() {
      const url =
        "http://filemanager.ztbory.com/v1/file/filedownload/?bucket=qualification&path=20210302&filename=93e7eeb535bb4661b3d78f2ff5a32d0b.xlsx";
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "资质模板");
      document.body.appendChild(link);
      console.log(link);
      link.click();
    },
    tabClick(e) {
      if (e.name === "0") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = true;
        this.isButton2 = true;
        this.isButton3 = true;
        this.licensed_content = false;
        this.no_reject = false;
        this.caozuo = true;
        this.certificationList();
      }
      if (e.name === "1") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = false;
        this.isButton3 = false;
        this.licensed_content = true;
        this.caozuo = false;
        this.no_reject = false;
        this.certificationList();
      }
      if (e.name === "2") {
        this.isYi = false;
        this.isCause = true;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.licensed_content = false;
        this.caozuo = false;
        this.no_reject = true;
        this.certificationList();
      }
      if (e.name === "3") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.licensed_content = true;
        this.no_reject = false;
        this.caozuo = false;
        this.certificationList();
      }
    },
    //提交
    submitClick(row) {
      if (!row.qualification_picture) {
        this.$message.warning("请完善资质信息");
        return;
      }
      this.$confirm("确认提交, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            status: 1,
            qualificate_id: row.qualificate_id,
            company_id: this.company_id
          };
          selfApi.submitCertification(row.id, data).then(res => {
            if (res.data.code == 0) {
              this.$message.success("提交成功!");
              this.certificationList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消提交");
        });
    },
    //新增 编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.ruleForm.qualification_picture) {
          this.$message.warning("请上传资质照片");
          return;
        }
        if (valid) {
          if (this.ruleForm.id) {
            console.log(this.ruleForm, 11);
            let objData = {
              status: this.ruleForm.status,
              qualificate_id: this.ruleForm.qualificate_id
            };
            for (let item in this.ruleForm) {
              for (let obj in this.oldruleForm) {
                if (
                  item == obj &&
                  this.ruleForm[item] != this.oldruleForm[obj]
                ) {
                  console.log(item);
                  objData[item] = this.ruleForm[item];
                }
              }
            }
            objData.viald_time = JSON.stringify(objData.viald_time);
            selfApi.updataCertification(this.ruleForm.id, objData).then(res => {
              if (res.data.code == 0) {
                this.$message.success("编辑成功!");
                this.certificationList();
                this.dialogVisible1 = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let para = {
              ...this.ruleForm
            };
            para.viald_time = JSON.stringify(para.viald_time);
            selfApi.addCertification(para).then(res => {
              if (res.data.code == 0) {
                this.$message.success("新增成功!");
                this.certificationList();
                this.dialogVisible1 = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(ruleForm) {
      this.$refs["ruleForm"].resetFields();
      this.$refs.upload.clearFiles();
    },
    //新建打开弹窗
    addClk() {
      this.dialogTitle = "新建";
      this.dialogVisible1 = true;
    },
    //编辑打开弹窗
    updataClick(row) {
      console.log(row);
      this.dialogTitle = "修改";
      this.dialogVisible1 = true;
      this.oldruleForm = { ...row };
      this.ruleForm = { ...row };
    },
    //删除
    deleteClick(row) {
      console.log(row);
      let data = {
        status: row.status,
        qualificate_id: row.qualificate_id
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.delCertification(row.id, data).then(res => {
            this.$message.success("删除成功!");
            this.certificationList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //查看
    lookClick(row) {
      this.lookObj = row;
      this.imgList = [...(row.qualification_picture || "").split(",")];
      this.dialogVisible = true;
      //修改记录
      let data = {
        status: row.status,
        qualificate_id: row.qualificate_id
      };
      selfApi.recordCertification(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.recordList = res.data.data;
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageData.page_size = val;
      this.certificationList();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.certificationList();
    },
    //资质上传
    uploadSuccess(arr) {
      this.ruleForm.qualification_picture = arr.join(",");
    },
    //图片查看
    lookImgClick(row) {
      this.imgDialogVisible = true;
      this.imgList = [...(row.qualification_picture || "").split(",")];
    },
    //搜索
    searchClk() {
      this.pageData.page = 1;
      this.certificationList();
    },
    //重置
    resetClk() {
      this.pageData.page = 1;
      this.pageData.page_size = 10;
      this.date1 = [];
      this.date2 = [];
      this.date3 = [];
      this.status = "";
      this.searchData = {};
      this.certificationList();
    },
    certificationList() {
      let params = {
        company_id: this.company_id,
        page: this.pageData.page,
        size: this.pageData.page_size,
        ...this.searchData,
        start_create_time: this.date1[0],
        end_create_time: this.date1[1],
        start_enter_time: this.date3[0],
        end_enter_time: this.date3[1],
        start_submit_time: this.date2[0],
        end_submit_time: this.date2[1],
        status: this.activeParams
      };
      selfApi.certificationData(params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data.results;
          this.total = res.data.data.data.count;
        }
      });
    },
    //获取服务区域
    serviceData() {
      let data = {
        company_id: this.company_id
      };
      selfApi.quCheZizhiData(data).then(res => {
        if (res.data.code == 0) {
          this.serviceList = res.data.data.data;
        }
      });
    }
  },
  mounted() {
    //获取公司id
    let userInfo = localStorage.getItem("userInfo");
    let user = JSON.parse(userInfo);
    this.ruleForm.company_id = user.company_id;
    this.company_id = user.company_id;
    this.role_type = user.role_type;
    this.certificationList();
    this.serviceData();
  }
};
</script>

<style scoped>
.content >>> .el-upload-list__item-name {
  display: none;
}
.content >>> .el-upload.el-upload--text {
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
.el-col {
  line-height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.demo-ruleForm >>> .el-input__inner {
  width: 300px;
}
</style>
