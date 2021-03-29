<template>
  <div class="content-box">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <el-menu
          class="frontMenu"
          :collapse="isCollapse"
          :default-active="defaultActive"
          :unique-opened="false"
          background-color="#02152c"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          router
        >
          <template v-for="item in menu">
            <template v-if="item.children">
              <el-submenu :key="item.nav_id" :index="item.nav_name">
                <template slot="title">
                  <i class="iconfont" :class="item.icon"></i>
                  <span style="margin-left: 8px;">{{ item.nav_name }}</span>
                </template>
                <template v-for="item in item.children">
                  <template v-if="item.children">
                    <el-submenu :key="item.nav_id" :index="item.nav_name">
                      <template slot="title">
                        <!-- <i class="iconfont" :class="item.icon"></i> -->
                        <span style="margin-left: 8px;">{{
                          item.nav_name
                        }}</span>
                      </template>
                      <el-menu-item-group>
                        <template v-for="child in item.children">
                          <el-menu-item
                            :key="child.nav_id"
                            :index="child.path"
                            >{{ child.nav_name }}</el-menu-item
                          >
                        </template>
                      </el-menu-item-group>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :key="item.nav_id" :index="item.path">
                      <!-- <i class="el-icon-setting"></i> -->
                      <span style="margin-left: 8px;" slot="title">{{
                        item.nav_name
                      }}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :key="item.nav_id" :index="item.path">
                <i :class="item.icon"></i>
                <span style="margin-left: 8px;" slot="title">
                  {{ item.nav_name }}
                </span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <div class="content-right">
        <div class="header">
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
          <!-- <div class="bottom">刘书坤</div> -->
        </div>
        <el-main>
          <!-- <transition name="transitionRouter"> -->
          <router-view class="router-view"></router-view>
          <!-- </transition> -->
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
// import { menu } from "@/common/menus.js";
import selfApi from "@/api/selfApi";
export default {
  data() {
    return {
      userInfo: {},
      menu: [],
      isCollapse: false,
      defaultActive: "",
      userImg: ""
    };
  },
  mounted() {
    let menu = JSON.parse(localStorage.getItem("menuTree"));
    console.log(menu, 8989);
    this.menu = menu;
    let url = window.location.href;
    let routeUrl = url.split("/#")[1];
    // console.log(routeUrl);
    this.defaultActive = routeUrl;
    let user = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(user);
    this.userObjDetail();
  },
  methods: {
    logOut() {
      this.$confirm("确认退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
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
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.userDetail(data).then(res => {
        if (res.data.code == 0) {
          this.userImg = res.data.data.data.picture;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.4s;
}
.transitionRouter-enter,
.transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}
.router-view {
  height: 100%;
}
.content-box {
  box-sizing: border-box;
}
.frontMenu {
  height: 100%;
  text-align: left;
}
.header {
  width: 100%;
  height: 48px;
  background: #fff;
  .top {
    height: 48px;
    width: 100%;
    display: flex;
    background: #ffffff;
    width: 100%;
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
  .bottom {
    height: 52px;
    line-height: 52px;
    padding-left: 24px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    text-align: left;
  }
}

.content-box {
  display: flex;
  width: 100% !important;
  background: #f0f2f5;
  .content-right {
    width: 100%;
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

.el-menu-item.is-active {
  background: rgb(3, 60, 114) !important;
}
.el-menu-item:hover {
  background: rgb(3, 60, 114) !important;
}
.el-submenu__title:hover {
  background: rgb(3, 60, 114) !important;
}
.el-submenu__title.is-active {
  background: rgb(3, 60, 114) !important;
}
</style>
<style scoped>
.content-box >>> .el-main {
  width: 99.6% !important;
}
</style>
