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
      <div style="width:100%;">
        <div class="flex">
          <img v-if="!isTrue" src="@/assets/loading_ing.gif" alt="" />
          <img v-else src="@/assets/loading_success.gif" alt="" />
          <h3 v-if="!isTrue">正在加载导出数据</h3>
          <h3 v-else>加载完成</h3>
        </div>
        <el-progress :percentage="percentage" :format="format"></el-progress>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
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

export default {
  props: {
    filename: {
      type: String,
      default: "Excel导出"
    },
    title: {
      type: String,
      default: "Excel导出"
    }
  },
  data() {
    return {
      //导出
      file_name: "",
      bookType: "xlsx",
      tableName: {},
      sheet: [
        {
          title: "",
          tHeader: [],
          table: [],
          keys: [],
          sheetName: "插件信息",
          cellStyle: [
            {
              cell: "A1",
              font: {
                name: "宋体",
                sz: 14,
                color: { rgb: "ffffff" },
                bold: true
              },
              fill: {
                fgColor: { rgb: "#fff" }
              }
            }
          ]
        }
      ],
      dialogVisibleExport: false,
      format(percentage) {
        return percentage === 100 ? "100%" : `${percentage}%`;
      },
      percentage: 0,
      export_list: [],
      isTrue: false
    };
  },
  mounted() {
    console.log(tableName);
  },
  methods: {
    exportlist(data) {
      this.parent_data = data;
      this.export_list = [];
      this.dialogVisibleExport = true;
      // this.parent_data.total = 234;
      this.exportloading();
    },
    exportloading() {
      let len = this.export_list.length;
      this.percentage = parseInt((len / this.parent_data.total) * 100);
      if (len >= this.parent_data.total) {
        //加载完成
        this.isTrue = true;
        return;
      }
      let para = this.parent_data.data;
      if (this.parent_data.size >= 10000) {
        para.size = 100;
      } else {
        para.size = 20;
      }
      para.un_loding = true;
      selfApi[this.parent_data.api](para).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.data.results && res.data.data.data.results.length) {
            this.export_list = [
              ...this.export_list,
              ...res.data.data.data.results
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
        type: "warning"
      })
        .then(() => {
          this.exportFn();
          this.$message({
            type: "success",
            message: "导出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    exportFn(data) {
      if (this.filename == "车辆管理") {
        this.tableName = tableName.tableName1;
      }
      if (this.filename == "人员管理") {
        this.tableName = tableName.tableName2;
      }
      if (this.filename == "资质管理") {
        this.tableName = tableName.tableName3;
      }
      if (this.filename == "合同管理") {
        this.tableName = tableName.tableName4;
      }
      let datalist = [];
      data.map((v, i) => {
        datalist.push({});
        for (let key in v) {
          for (let name in this.tableName) {
            if (key == name) {
              datalist[i][key] = v[key];
            }
          }
        }
      });
      data = [...datalist];
      function objKeySort(obj) {
        var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {
          //遍历newkey数组
          newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj; //返回排好序的新对象
      }
      let arr = [];
      data.map((v, i) => {
        if (i == 0) {
          for (let k in v) {
            arr.push(k);
          }
        }
        return;
      });
      // arr = arr.sort();
      let header = [...arr];
      arr.map((v, i) => {
        for (let k in this.tableName) {
          if (v == k) header[i] = this.tableName[k];
        }
      });

      let tHeader = [];
      arr.map((v, i) => {
        for (let k in this.tableName) {
          if (v == k) tHeader.push(this.tableName[k]);
        }
      });
      data.map(v => (v = objKeySort(v)));
      this.sheet[0].keys = arr;
      this.sheet[0].tHeader = tHeader;
      this.sheet[0].table = data;
      this.$refs.excelExport.pikaExportExcel();
      this.dialogVisibleExport = false;
    }
  },
  components: {
    ExcelExport
  },
  watch: {
    dialogVisibleExport(val) {
      if (!val) {
        this.isTrue = false;
        this.export_list = [];
        this.percentage = 0;
      }
    }
  }
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
