<template>
  <div class="block">
    <excel-export
      :bookType="bookType"
      :filename="filename"
      :sheet="sheet"
      :on-error="onError"
      :manual="true"
      ref="excelExport"
    >
    </excel-export>
    <!-- <el-button type="primary" @click="exportTable">导出</el-button> -->

    <!-- 导出弹框 -->
    <el-dialog
      title="导出"
      :close-on-click-modal="false"
      :show-close="true"
      :visible.sync="dialogVisibleExport"
      width="600px"
    >
      <div style="width: 100%">
        <div v-if="parent_data.total" class="flex">
          <img v-if="!isTrue" src="@/assets/loading_ing.gif" alt="" />
          <img v-else src="@/assets/loading_success.gif" alt="" />
          <h3 v-if="!isTrue">正在加载导出数据</h3>
          <h3 v-else>加载完成</h3>
        </div>
        <div v-else>当前无导出数据</div>
        <el-progress
          v-if="parent_data.total"
          :percentage="percentage"
          :format="format"
        ></el-progress>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="parent_data.total"
          type="primary"
          :disabled="!isTrue"
          @click="exportFn(export_list)"
          >下载文件</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ExcelExport } from "pikaz-excel-js";
import tableName from "@/common/tableName.js";
import selfApi from "@/api/selfApi";
import { format } from "@/common/common.js";

export default {
  props: {
    filename: {
      type: String,
      default: "Excel导出",
    },
    title: {
      type: String,
      default: "Excel导出",
    },
  },
  data() {
    return {
      /////导出
      file_name: "",
      bookType: "xlsx",
      sheet: [
        {
          // title: "",
          tHeader: [],
          table: [],
          keys: [],
          sheetName: "插件信息",
          // cellStyle: [
          //   {
          //     cell: "A1",
          //     font: {
          //       name: "宋体",
          //       sz: 14,
          //       color: { rgb: "#fff" },
          //       bold: true,
          //     },
          //     fill: {
          //       fgColor: { rgb: "ffffff" },
          //     },
          //   },
          // ],
        },
      ],
      dialogVisibleExport: false,
      format(percentage) {
        return percentage === 100 ? "100%" : `${percentage}%`;
      },
      percentage: 0,
      export_list: [],
      isTrue: false,
      parent_data: [],
      tableName: {},
    };
  },
  mounted() {},
  methods: {
    exportlist(data) {
      this.tableName = tableName[data.excellType];
      console.log(this.tableName);
      this.parent_data = data;
      this.export_list = [];
      this.dialogVisibleExport = true;
      // this.parent_data.total = 234;
      this.exportloading();
    },
    exportloading() {
      let len = this.export_list.length;
      let num = (len * 100) / this.parent_data.total;
      this.percentage = parseInt(num);
      if (len >= this.parent_data.total) {
        //加载完成
        this.isTrue = true;
        return;
      }
      let para = this.parent_data.data;
      if (this.parent_data.total >= 10000) {
        para.size = 100;
      } else {
        para.size = 20;
      }
      para.un_loding = true;
      selfApi[this.parent_data.api](para).then((res) => {
        if (res.data.code == 200) {
          // if (res.data.data.results && res.data.data.results.length) {
          //   this.export_list = [...this.export_list, ...res.data.data.results];
          //   this.parent_data.data.page++;
          // }
          if (res.data.data.data.results && res.data.data.data.results.length) {
            this.export_list = [
              ...this.export_list,
              ...res.data.data.data.results,
            ];
            this.parent_data.data.page++;
          }
        }
        this.exportloading();
      });
    },
    //导出错误
    onError(err) {
      console.log(err);
    },
    //手动导出
    exportTable() {
      this.$confirm("确定要导出吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportFn();
          this.$message({
            type: "success",
            message: "导出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
    },
    exportFn(data) {
      let datalist = [];

      data.map((v, i) => {
        datalist.push({});
        for (let key in v) {
          if (this.tableName.length > 0) {
            this.tableName.forEach((item) => {
              for (let name in item) {
                if (key == name) {
                  if (name == "create_time" || name == "into_factory_time") {
                    datalist[i][key] = format(
                      v[key] * 1000,
                      "yyyy-MM-dd HH:mm:ss"
                    );
                  } else {
                    datalist[i][key] = v[key];
                  }
                }
              }
            });
          } else {
            this, $message.warning("该页面暂未配置导出字段");
          }
        }
      });

      data = [...datalist];

      let arr = [];
      this.tableName.forEach((item) => {
        for (let name in item) {
          arr.push(name);
        }
      });
      // arr = arr.sort();
      let header = [...arr];
      let tHeader = [];

      arr.map((v, i) => {
        this.tableName.forEach((item) => {
          for (let k in item) {
            if (v == k) header[i] = item[k];
          }
        });
      });

      arr.map((v, i) => {
        this.tableName.forEach((item) => {
          for (let k in item) {
            if (v == k) tHeader.push(item[k]);
          }
        });
      });
      this.sheet[0].keys = arr;
      this.sheet[0].tHeader = tHeader;
      this.sheet[0].table = data;
      this.$refs.excelExport.pikaExportExcel();
      this.dialogVisibleExport = false;
    },
  },
  components: {
    ExcelExport,
  },
  watch: {
    dialogVisibleExport(val) {
      if (!val) {
        this.isTrue = false;
        this.export_list = [];
        this.parent_data.total = 0;
        this.percentage = 0;
      }
    },
  },
};
</script>

<style scoped>
.block {
  display: inline-block;
}
.flex {
  /* width: 100%; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
