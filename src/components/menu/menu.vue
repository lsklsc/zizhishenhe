<template>
  <div class="menu">
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
              <span style="margin-left: 8px">{{ item.nav_name }}</span>
            </template>
            <template v-for="item in item.children">
              <template v-if="item.children">
                <el-submenu :key="item.nav_id" :index="item.nav_name">
                  <template slot="title">
                    <!-- <i class="iconfont" :class="item.icon"></i> -->
                    <span style="margin-left: 8px">{{ item.nav_name }}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="child in item.children">
                      <el-menu-item :key="child.nav_id" :index="child.path">
                        <span style="margin-left: 8px" slot="title">
                          {{ child.nav_name }}
                        </span>
                      </el-menu-item>
                    </template>
                  </el-menu-item-group>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :key="item.nav_id" :index="item.path">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span style="margin-left: 8px" slot="title">
                    {{ item.nav_name }}
                  </span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.nav_id" :index="item.path">
            <i class="iconfont" :class="item.icon"></i>
            <span style="margin-left: 8px" slot="title">
              {{ item.nav_name }}
            </span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { menu } from "../../common/menus";
export default {
  data() {
    return {
      menu: [],
      defaultActive: "",
    };
  },
  props: ["isCollapse"],
  mounted() {
    let menu = JSON.parse(localStorage.getItem("menuTree"));
    this.menu = menu;
    console.log(this.menu);
    let url = window.location.href;
    let routeUrl = url.split("/#")[1];
    // console.log(routeUrl);
    this.defaultActive = routeUrl;
  },
  methods: {},
};
</script>

<style scoped>
.frontMenu {
  height: 100%;
  /* padding-top: 30px; */
  box-sizing: border-box;
  text-align: left;
}
.menu {
  height: 100%;
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
