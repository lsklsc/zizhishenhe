<template>
  <div class="wrap">
    <div class="title">资质审核系统</div>
    <div class="content">
      <div>
        <el-form>
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
              v-model="fromData.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="fromData.password"
              type="password"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="login()"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import selfApi from "@/api/selfApi";
import treeFormat from "@/common/treeFormat";

export default {
  data() {
    return {
      fromData: {
        username: "", //tz13911111111
        password: "",
      },
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      if (e.keyCode == 13) {
        this.login();
      }
    },
    login() {
      selfApi
        .login(this.fromData)
        .then((res) => {
          if (res.data.code == 1) {
            let token = res.data.data.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.data.data)
            );
            let nav_id = res.data.data.data.nav_id;
            if (nav_id) {
              selfApi.visvitPageList({}).then((res) => {
                if (res.status == 200) {
                  let allRrr = res.data.data;
                  console.log(allRrr);
                  let menu = [];
                  let arr = nav_id.split(",");
                  arr.forEach((o) => {
                    allRrr.forEach((item) => {
                      if (item.nav_id == o) {
                        menu.push(item);
                      }
                    });
                  });
                  let menuTree = treeFormat.transData(
                    menu,
                    "nav_id",
                    "pid",
                    "children"
                  );
                  console.log(menuTree, 123);
                  localStorage.setItem("menuTree", JSON.stringify(menuTree));
                  this.$router.push("/main");
                }
              });
            } else {
              this.$message.error("该账号未配置菜单权限");
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((ref) => {
          console.log(ref);
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 100vh;
  background: url("/static/bg.png");
  background-size: cover;
  position: relative;
}
.title {
  text-align: center;
  font-weight: 500;
  color: #61b7ff;
  line-height: 280px;
  letter-spacing: 6px;
  font-size: 52px;
  user-select: none;
}
.content {
  width: 731px;
  height: 510px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: rgba(9, 25, 52, 0.78);
  border: 3px solid rgba(24, 90, 145, 0.51);
}
.content >>> .el-input {
  width: 572px;
  height: 91px;
  background: #0f3a63;
  font-size: 26px;
}
.content >>> .el-input__inner {
  height: 100%;
  background: #0f3a63 !important;
  color: #2782cd !important;
  text-indent: 16px;
}
.content >>> .el-input__inner::-webkit-input-placeholder {
  color: #2782cd !important;
}
.content >>> .el-icon-user-solid,
.content >>> .el-icon-lock {
  margin-top: 23px !important;
  color: #61b7ff;
  font-size: 31px;
}
.btn {
  width: 572px;
  height: 91px;
  background: #0f7af8;
  margin: auto;
  font-size: 28px;
}
</style>
