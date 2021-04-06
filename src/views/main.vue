<template>
  <div class="content-box">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <menus :isCollapse="isCollapse"></menus>
      </el-aside>
      <div class="content-right">
        <div class="headers">
          <div class="top">
            <img
              src="../assets/icon.png"
              class="top-left"
              :class="isCollapse ? 'active' : 'active1'"
              @click="collapseBtn"
            />
            <div class="top-right">
              <div class="img" @click="userClick">
                <img :src="userImg" alt="" />
              </div>
              <div class="user" @click="userClick">{{ userInfo.username }}</div>
              <div class="logOut" @click="logOut">退出</div>
            </div>
          </div>
        </div>
        <el-main>
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import selfApi from "@/api/selfApi";
import menus from "@/components/menu/menu";
export default {
  data() {
    return {
      isCollapse: false,
      userInfo: {},
      userImg: "",
    };
  },
  components: {
    menus,
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(user);
    this.userObjDetail();
  },
  methods: {
    logOut() {
      this.$confirm("确认退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.clear("token");
          window.localStorage.clear("userInfo");
          this.$router.push("/login");
          this.$message.success("退出成功");
        })
        .catch(() => {
          this.$message.info("取消退出");
        });
    },
    collapseBtn() {
      this.isCollapse = !this.isCollapse;
    },
    userClick() {
      this.$router.push("/gongsi/gongsi");
    },
    userObjDetail() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id,
      };
      selfApi.userDetail(data).then((res) => {
        if (res.data.code == 0) {
          this.userImg = res.data.data.data.picture;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content-box {
  display: flex;
  box-sizing: border-box;
  background: #f0f2f5;
  width: 100%;
  .content-right {
    width: 100%;
    overflow-x: hidden;
  }
}
.content {
  background: #fff;
  height: calc(100vh - 100px);
  width: 100%;
  // padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.headers {
  width: 100%;
  height: 60px;
  background: #fff;
  .top {
    height: 60px;
    width: 100%;
    display: flex;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    padding: 0 20px;
    box-sizing: border-box;
    .top-left {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .top-right {
      display: flex;
      align-items: center;
      .data {
        cursor: pointer;
        font-size: 14px;
        color: #409eff;
      }
      .logOut {
        color: #ff4b31;
        font-size: 14px;
        font-weight: 400;
        margin: 0 28px 0 15px;
        cursor: pointer;
      }
      .user {
        margin-left: 8px;
        margin-right: 8px;
        color: #2c2c2c;
        font-size: 14px;
        cursor: pointer;
      }
      .img {
        color: #bfbfbf;
        font-size: 24px;
        margin-left: 30px;
        display: flex;
        cursor: pointer;
        align-items: center;
        border-radius: 50%;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
  }
}

.active {
  transform: rotate(180deg);
  transition: 0.6s;
}
.active1 {
  transform: rotate(360deg);
  transition: 0.6s;
}
</style>
