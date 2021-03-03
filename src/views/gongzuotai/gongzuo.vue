<template>
  <div class="content">
    <el-card class="box-card">
      <div class="headers">
        <div class="logo">
          <img :src="userImg" alt="" />
        </div>
        <div class="title">
          <div class="bold">早上好，祝您开心每一天</div>
          <div class="txt">后台管理系统</div>
        </div>
      </div>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="15">
        <div class="elCol">
          <div class="card">
            <div class="card-top">
              <div class="img"><img src="../../../static/1.png" alt="" /></div>
              <div>待处理</div>
            </div>
            <div class="card-bottom">
              <div class="num">{{ numObj.sum_dai }}</div>
            </div>
          </div>
          <div class="card card1">
            <div class="card-top">
              <div class="img"><img src="../../../static/2.png" alt="" /></div>
              <div>未通过</div>
            </div>
            <div class="card-bottom">
              <div class="num">{{ numObj.sum_wei }}</div>
            </div>
          </div>
          <div class="card card1">
            <div class="card-top">
              <div class="img"><img src="../../../static/3.png" alt="" /></div>
              <div>已通过</div>
            </div>
            <div class="card-bottom">
              <div class="num">{{ numObj.sum_tong }}</div>
            </div>
          </div>
        </div>
        <div class="time">
          <div>数据直报</div>
          <div>
            选择日期：
            <el-date-picker
              v-model="newDate"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              @change="changeDate"
            ></el-date-picker>
          </div>
        </div>
        <div class="echartsBox">
          <div id="main" style="width: 100%;height: 480px;"></div>
        </div>
      </el-col>
      <el-col :span="9">
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
                <!-- <h4>{{ i.username }}登陆了系统</h4> -->
                <p class="P">{{ i.username }} {{ i.operate_data }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import selfApi from "@/api/selfApi";
export default {
  data() {
    return {
      company_id: "",
      userImg: "",
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
      newDate: "",
      dateTime: "",
      listData: [],
      echartsData: {},
      numObj: {} //待处理 已通过 未通过
    };
  },
  methods: {
    changeDate(e) {
      this.newDate = e;
      this.timeList();
    },
    drawChart() {
      let listData = [];
      for (let item in this.echartsData) {
        listData.push(this.echartsData[item]);
      }
      let tongguoList = [];
      let weitongguo = [];
      listData.forEach(i => {
        tongguoList.push(i.tong_count);
        weitongguo.push(i.wei_count);
      });
      let myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        // title: {
        //   text: "",
        //   subtext: ""
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 30,
          right: 0,
          borderWidth: 1
        },
        legend: {
          data: ["已通过", "未通过"]
        },
        toolbox: {
          show: true,
          feature: {
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["合同", "车辆", "资质", "人员"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "已通过",
            type: "bar",
            data: tongguoList,
            color: "#ff8080"
          },
          {
            name: "未通过",
            type: "bar",
            data: weitongguo,
            color: "#63b9f8"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    timeList() {
      let data = {
        strat_date: this.newDate,
        company_id: this.company_id
      };
      selfApi.timeData(data).then(res => {
        if (res.data.code == 200) {
          this.echartsData = res.data.data.sum;
          this.drawChart();
        }
      });
    },
    //审核状态统计
    statisticsList() {
      let data = {
        company_id: this.company_id
      };
      selfApi.statisticsData(data).then(res => {
        if (res.data.code == 200) {
          this.numObj = res.data.data.sum;
        }
      });
    },
    //操作日志
    operationLogList() {
      let data = {
        company_id: this.company_id,
        start_create_time: this.dateTime
      };
      selfApi.operationLog(data).then(res => {
        if (res.data.code == 0) {
          this.listData = res.data.data;
        }
      });
    },
    userObjDetail() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.userDetail(data).then(res => {
        if (res.data.code == 0) {
          this.userImg = res.data.data.data.picture;
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
    this.newDate = `${year}-${month}-${day}`;
    this.dateTime = `${year}-${month}-${day}`;
    this.timeList();
    this.statisticsList();
    this.operationLogList();
    this.userObjDetail();
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
.left {
  background: red !important;
}

.content >>> .box-card {
  margin-bottom: 6px;
}
.headers {
  display: flex;
  padding: 10px 0;
}
.logo {
  width: 60px;
  height: 60px;
}
.logo >>> img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.title {
  margin-left: 50px;
}
.bold {
  font-weight: bold;
  font-size: 20px;
}
.txt {
  margin-top: 8px;
}
.content >>> .elCol {
  display: flex;
  /* justify-content: space-around; */
}
.card1 {
  margin-left: 130px;
  text-align: center;
}
.content >>> .card {
  width: 280px;
  height: 120px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.card-top {
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: center;
}
.card-top .img {
  width: 40px;
  height: 40px;
  padding-right: 8px;
}
.card-top .img img {
  width: 100%;
  height: 100%;
  user-select: none;
}
.card-bottom {
  /* float: right; */
  display: flex;
  justify-content: center;
  line-height: 50px;
}
.num {
  font-weight: bold;
  font-size: 20px;
}
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}
.echartsBox {
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
