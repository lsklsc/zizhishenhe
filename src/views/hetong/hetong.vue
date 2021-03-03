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
      <el-form-item label="合同名称：">
        <el-input
          placeholder="请输入合同名称"
          v-model="searchData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="保存日期：" v-if="activeParams == '0'">
        <el-date-picker
          v-model="dates1"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="提交日期：" v-if="activeParams == '1'">
        <el-date-picker
          v-model="dates"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="审核日期：" v-if="activeParams == '2'">
        <el-date-picker
          v-model="datetime"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="通过日期：" v-if="activeParams == '3'">
        <el-date-picker
          v-model="datetime"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="签订日期：">
        <el-date-picker
          v-model="dates2"
          :picker-options="pickerOptions"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期签订日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="有效期：">
        <el-date-picker
          v-model="dates3"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item label="甲方类型：">
        <el-select v-model="searchData.jia_type" placeholder="全部">
          <el-option value="全部"></el-option>
          <el-option
            v-for="item in jiaTypeList"
            :key="item.jia_type"
            :label="item.label"
            :value="item.jia_type"
          >
          </el-option>
        </el-select>
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
      <dataExport
        ref="export"
        filename="合同管理"
        :data="tableData"
      ></dataExport>
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
      height="62vh"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="enter_time"
        label="审核时间"
        v-if="activeParams == '2'"
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
        label="通过时间"
        v-if="activeParams == '3'"
      ></el-table-column>
      <el-table-column prop="name" label="合同名称"></el-table-column>
      <el-table-column prop="signed_time" label="签订时间"></el-table-column>
      <el-table-column prop="viald_time" label="合同有效期"></el-table-column>
      <el-table-column label="甲方类型">
        <template slot-scope="scope">
          <div v-if="scope.row.jia_type == '1'">街道</div>
          <div v-if="scope.row.jia_type == '2'">末端厂</div>
        </template>
      </el-table-column>
      <el-table-column prop="jia" label="甲方"></el-table-column>
      <el-table-column prop="yi" v-if="isYi" label="乙方"></el-table-column>
      <el-table-column
        prop="no_reject"
        label="不通过原因"
        v-if="isCause"
      ></el-table-column>
      <el-table-column prop="contacts" label="合同照片">
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
        <el-form-item label="合同名称：" prop="name">
          <el-input width="200px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="合同类型：" prop="con_type">
          <el-select v-model="ruleForm.con_type" placeholder="请选择合同类型">
            <el-option
              v-for="item in contractList"
              :key="item.con_type"
              :label="item.label"
              :value="item.con_type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签订时间：" prop="signed_time">
          <el-date-picker
            :picker-options="pickerOptions0"
            v-model="ruleForm.signed_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择签订时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同有效期：" prop="viald_time">
          <el-date-picker
            v-model="ruleForm.viald_time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="请选择合同有效期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="甲方类型：" prop="jia_type">
          <el-select
            v-model="ruleForm.jia_type"
            placeholder="请选择甲方类型"
            @change="changeSelect"
          >
            <el-option
              v-for="item in jiaTypeList"
              :key="item.jia_type"
              :label="item.label"
              :value="item.jia_type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="甲方：" prop="street_coding">
          <el-select
            v-model="ruleForm.street_coding"
            @change="changeSelect1"
            placeholder="请选择甲方"
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
        <el-form-item label="乙方：" prop="yi">
          <el-input v-model="ruleForm.yi"></el-input>
        </el-form-item>
        <el-form-item label="所需资质：" prop="qua_type">
          <el-select v-model="ruleForm.qua_type" placeholder="请选择所需资质">
            <el-option
              v-for="(item, index) in zizhiListSelect"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="合同照片：" prop="contract_picture">
          <upload
            :imageUrl="ruleForm.contract_picture"
            ref="upload1"
            @uploadSuccess="uploadSuccess"
          ></upload>
        </el-form-item>
        <el-form-item label="资质照片：" prop="qualification_picture">
          <upload
            :imageUrl="ruleForm.qualification_picture"
            ref="upload2"
            @uploadSuccess="uploadSuccess1"
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
        <el-col :span="12">合同名称：{{ lookObj.name }}</el-col>
        <el-col :span="12">
          合同类型：
          <span v-if="lookObj.con_type == '1'">收运合同</span>
          <span v-if="lookObj.con_type == '2'">运输合同</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">签订时间：{{ lookObj.signed_time }}</el-col>
        <el-col :span="12">合同有效期：{{ lookObj.viald_time }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          >甲方类型：
          <span v-if="lookObj.jia_type == '1'">街道</span>
          <span v-if="lookObj.jia_type == '2'">末端厂</span>
        </el-col>
        <el-col :span="12">乙方：{{ lookObj.yi || "" }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">备注：{{ lookObj.content || "" }}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          合同照片：
          <el-image
            v-for="(i, index) in hetongList"
            :key="index + '-i'"
            style="width: 100px; height: 100px"
            :src="i"
            :preview-src-list="hetongList"
          >
            <div slot="error" style="line-height:100px">
              暂无图片
            </div>
          </el-image>
        </el-col>
        <el-col :span="12">
          资质照片：
          <el-image
            v-for="i in zizhiList"
            :key="i"
            style="width: 100px; height: 100px"
            :src="i"
            :preview-src-list="zizhiList"
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
    <el-dialog
      title="合同照片 资质照片"
      :visible.sync="imgDialogVisible"
      width="50%"
    >
      <div class="imgTitle">合同照片：</div>
      <el-image
        v-for="(i, index) in hetongList"
        :key="index + '-i'"
        style="width: 100px; height: 100px"
        :src="i"
        :preview-src-list="hetongList"
      >
        <div slot="error" style="line-height:100px">
          暂无图片
        </div>
      </el-image>
      <div class="imgTitle">资质照片：</div>
      <el-image
        v-for="i in zizhiList"
        :key="i"
        style="width: 100px; height: 100px"
        :src="i"
        :preview-src-list="zizhiList"
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
      contractList: [
        {
          con_type: "1",
          label: "收运合同"
        },
        {
          con_type: "2",
          label: "运输合同"
        }
      ],
      jiaTypeList: [
        {
          jia_type: "1",
          label: "街道"
        }
        // {
        //   jia_type: "2",
        //   label: "末端厂",
        //   disabled: false
        // }
      ],
      zizhiList: [],
      selectList: [],
      dialogVisible: false,
      dialogTitle: "",
      dialogVisible1: false,
      imgDialogVisible: false,
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
      searchData: {
        name: "",
        jia_type: ""
      },
      dates1: [],
      dates2: "",
      dates3: [],
      dates: [],
      datetime: [],
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
      rules: {
        name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        yi: [{ required: true, message: "请输入乙方", trigger: "blur" }],
        content: [{ required: true, message: "请填写备注", trigger: "blur" }],
        con_type: [
          { required: true, message: "请选择合同类型", trigger: "change" }
        ],
        street_coding: [
          { required: true, message: "请选择甲方", trigger: "change" }
        ],
        jia_type: [
          { required: true, message: "请选择甲方类型", trigger: "change" }
        ],
        jia: [{ required: true, message: "请选择甲方", trigger: "change" }],
        signed_time: [
          { required: true, message: "请选择签订时间", trigger: "blur" }
        ],
        viald_time: [
          { required: true, message: "请选择合同有效期", trigger: "blur" }
        ]
      },
      lookObj: {},
      recordList: [], //修改记录
      oldruleForm: {},
      hetongList: [],
      zizhiListSelect: []
    };
  },
  methods: {
    //导入
    httpRequest(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("company_id", this.company_id);
      selfApi.importContract(formData).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.contractData();
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
            start_create_time: this.dates1[0],
            end_create_time: this.dates1[1],
            start_signed_time: this.dates2[0],
            end_signed_time: this.dates2[1],
            start_viald_time: this.dates3[0],
            end_viald_time: this.dates3[1],
            start_submit_time: this.dates[0],
            end_submit_time: this.dates[1],
            start_enter_time: this.datetime[0],
            end_enter_time: this.datetime[1],
            ...this.searchData,
            status: this.activeParams
          };
          let api = "contractList";
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
    tabClick(e) {
      console.log(this.activeParams);
      if (e.name === "0") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = true;
        this.isButton2 = true;
        this.isButton3 = true;
        this.contractData();
      }
      if (e.name === "1") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = false;
        this.isButton3 = false;
        this.contractData();
      }
      if (e.name === "2") {
        this.isYi = false;
        this.isCause = true;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.contractData();
      }
      if (e.name === "3") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.contractData();
      }
    },
    //导入模板下载
    importClick() {
      const url =
        "http://filemanager.ztbory.com/v1/file/filedownload/?bucket=qualification&path=20210302&filename=33a072958e0c4ee0a8019ddfcaef521a.xlsx";
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "合同模板");
      document.body.appendChild(link);
      link.click();
    },
    //提交
    submitClick(row) {
      if (!row.qualification_picture) {
        this.$message.warning("请完善合同信息");
        return;
      }
      if (!row.qua_type) {
        this.$message.error("请选择所需资质");
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
            contract_id: row.contract_id,
            company_id: this.company_id
          };
          selfApi.submitContract(row.id, data).then(res => {
            if (res.data.code == 0) {
              this.$message.success("提交成功!");
              this.contractData();
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
        if (!this.ruleForm.contract_picture) {
          this.$message.warning("请上传合同照片");
          return;
        }
        if (!this.ruleForm.qualification_picture) {
          this.$message.warning("请上传资质照片");
          return;
        }
        if (valid) {
          // 编辑
          if (this.ruleForm.id) {
            let objData = {
              status: this.ruleForm.status,
              contract_id: this.ruleForm.contract_id
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
            selfApi.updataContract(this.ruleForm.id, objData).then(res => {
              if (res.data.code == 0) {
                this.$message.success("编辑成功!");
                this.contractData();
                this.dialogVisible1 = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            // 新增
            let para = {
              ...this.ruleForm
            };
            para.viald_time = JSON.stringify(para.viald_time);
            selfApi.addContract(para).then(res => {
              if (res.data.code == 0) {
                this.$message.success("新增成功!");
                this.contractData();
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
      this.$refs.upload1.clearFiles();
      this.$refs.upload2.clearFiles();
      this.ruleForm = {
        jia: ""
      };
      this.ruleForm.company_id = this.company_id;
    },
    //新建打开弹窗
    addClk() {
      this.dialogTitle = "新建";
      this.dialogVisible1 = true;
      this.imageUrl = "";
      this.imageUrl1 = "";
    },
    //编辑打开弹窗
    updataClick(row) {
      this.changeSelect(row.jia_type);
      this.dialogTitle = "修改";
      this.dialogVisible1 = true;
      this.oldruleForm = { ...row };
      this.ruleForm = { ...row };
    },
    //删除
    deleteClick(row) {
      let data = {
        status: row.status,
        contract_id: row.contract_id
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.deleteContract(row.id, data).then(res => {
            this.$message.success("删除成功!");
            this.contractData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //查看
    lookClick(row) {
      this.hetongList = [...(row.contract_picture || "").split(",")]; //合同照片
      this.zizhiList = [...(row.qualification_picture || "").split(",")]; //合同照片
      this.lookObj = row;

      this.dialogVisible = true;
      //修改记录
      let data = {
        status: row.status,
        contract_id: row.contract_id
      };
      selfApi.amendContract(data).then(res => {
        if (res.data.code == 0) {
          console.log(res);
          this.recordList = res.data.data;
        }
      });
    },
    //图片查看
    lookImgClick(row) {
      console.log(row);
      this.imgDialogVisible = true;
      this.hetongList = [...(row.contract_picture || "").split(",")]; //合同照片
      this.zizhiList = [...(row.qualification_picture || "").split(",")]; //合同照片
    },
    changeSelect(e) {
      let data = {
        company_id: this.company_id
      };
      if (e == "1") {
        //街道
        selfApi.quList(data).then(res => {
          if (res.data.code == 0) {
            this.selectList = res.data.data.data;
          }
        });
      }
      if (e == "2") {
        //末端
        selfApi.moduanList(data).then(res => {
          if (res.data.code == 0) {
            if (res.data.data.data.length > 0) {
              this.selectList = res.data.data.data;
            }
          }
        });
      }
    },
    changeSelect1(e) {
      this.selectList.find(item => {
        if (item.coding == e) {
          this.ruleForm.street_coding = item.coding;
          this.ruleForm.jia = item.name;
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageData.page_size = val;
      this.contractData();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.contractData();
    },
    //合同上传
    uploadSuccess(arr) {
      this.ruleForm.contract_picture = arr.join(",");
    },
    //资质上传
    uploadSuccess1(arr) {
      this.ruleForm.qualification_picture = arr.join(",");
    },
    //搜索
    searchClk() {
      this.pageData.page = 1;
      this.contractData();
    },
    //重置
    resetClk() {
      this.pageData.page = 1;
      this.pageData.page_size = 10;
      this.dates1 = [];
      this.dates2 = "";
      this.dates3 = [];
      this.datetime = [];
      this.dates = [];
      this.status = "";
      this.searchData = {};
      this.contractData();
    },
    contractData() {
      let params = {
        company_id: this.company_id,
        page: this.pageData.page,
        size: this.pageData.page_size,
        start_create_time: this.dates1[0],
        end_create_time: this.dates1[1],
        start_signed_time: this.dates2,
        start_viald_time: this.dates3[0],
        end_viald_time: this.dates3[1],
        start_submit_time: this.dates[0],
        end_submit_time: this.dates[1],
        start_enter_time: this.datetime[0],
        end_enter_time: this.datetime[1],
        ...this.searchData,
        status: this.activeParams
      };
      selfApi.contractList(params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data.results;
          this.total = res.data.data.data.count;
        }
      });
    },
    //所需资质
    zizhiData() {
      let data = {
        company_id: this.company_id
      };
      selfApi.certification(data).then(res => {
        if (res.data.code == 0) {
          this.zizhiListSelect = res.data.data.data;
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
    this.contractData();
    this.zizhiData();
  }
};
</script>

<style scoped>
.content >>> .el-upload.el-upload--text {
  border: 1px dashed #ccc;
}
.content >>> .el-upload-list__item-name {
  display: none;
}
.imgTitle {
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
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
  font-size: 20px;
  display: flex;
  align-items: center;
}
.demo-ruleForm >>> .el-input__inner {
  width: 300px;
}
</style>
