<template>
  <div class="content">
    <el-tabs>
      <el-tab-pane label="操作日志"></el-tab-pane>
    </el-tabs>
    <!-- 检索 -->
    <el-form inline>
      <el-form-item label="日期选择：">
        <el-date-picker
          :picker-options="pickerOptions"
          v-model="date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作用户：">
        <el-select v-model="searchData.username" placeholder="请选择操作用户">
          <el-option
            v-for="item in userList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="searchClk">搜索</el-button>
      <el-button type="warning" @click="resetClk">重置</el-button>
    </el-form>

    <div class="box">
      <el-timeline>
        <el-timeline-item
          v-for="(i, index) in listData"
          :key="index"
          :timestamp="i.create_time"
          color="#0bbd87"
          placement="top"
        >
          <el-card>
            <p class="P">{{ i.username }} {{ i.operate_data }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import selfApi from "@/api/selfApi";
export default {
  data() {
    return {
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
      company_id: "", //公司id
      date: "",
      date1: "",
      userList: [],
      listData: [],
      searchData: {
        username: ""
      }
    };
  },
  methods: {
    //重置
    resetClk() {
      this.searchData = {};
      this.date = this.date1;
      this.operationLogList();
    },
    //搜索
    searchClk() {
      this.operationLogList();
    },
    //操作日志
    operationLogList() {
      let data = {
        company_id: this.company_id,
        start_create_time: this.date,
        ...this.searchData
      };
      selfApi.operationLog(data).then(res => {
        if (res.data.code == 0) {
          this.listData = res.data.data;
        }
      });
    },
    //操作人列表
    operatorList() {
      let data = {
        company_id: this.company_id
      };
      selfApi.operatorData(data).then(res => {
        if (res.data.code == 200) {
          this.userList = res.data.data.data;
        }
      });
    }
  },
  mounted() {
    this.company_id = JSON.parse(localStorage.getItem("userInfo")).company_id;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.date = `${year}-${month}-${day}`;
    this.date1 = `${year}-${month}-${day}`;
    this.operationLogList();
    this.operatorList();
  }
};
</script>

<style scoped>
.box {
  margin-top: 15px;
  height: 640px;
  overflow-y: auto;
  padding: 3px;
}
.P {
  font-size: 15px;
}
</style>
