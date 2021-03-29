<template>
  <div id="app">
    <!-- <transition name="transitionRouter"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}
#app {
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.header {
  text-align: center;
  background: #3a8ee6;
  margin: 0;
  height: 70px;
  width: 100%;
  line-height: 70px;
  font-size: 20px;
  color: #fff;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #ccdeeb;
  text-align: center;
  height: 100vh;
  padding-top: 68px;
  overflow-y: auto;
  background: #02152c;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-menu {
  border-right: none !important;
}
#nprogress .bar {
  background: linear-gradient(180deg, #5d41e8 0%, #5e36d5 100%);
  height: 3px;
  box-shadow: 0px 14px 15px 0px rgba(57, 16, 195, 0.06);
}
</style>
