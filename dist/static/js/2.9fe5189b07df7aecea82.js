webpackJsonp([2],{B9sm:function(t,e){},fqxG:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAAAAXNSR0IArs4c6QAAAUlJREFUWAljYBhkgBHoHg4gLgRiHSAG8QcC/AdaegWI+5mBhBMQuwPxQDkGaDXYbnEg/Z4JSHwCiQwS8AkUKiDsB8SgKAM5cCDAP6CloCjbNBCWj9o5skKAazB5VxfomDn0dhALDgsdgOLJQAwqOOkKsDkoBOiCILq6AskyZAeB2KlAbIskT3cmzEGgxAuqYLWJdIEWUF0UEPMRqZ6QMlhJvQDkIHYgrgdiWUK6kOQzgWxhJD41mKBK/s5A1V04PQBrcoCirACIQRUsOgBFDTqgWZTBHASyEBR9oKxuD+IgAWwOQpKmLhO5nAElrLNQ40EhAANrYQx60NjSEMgBM4D4Lz0cQIodoCKA7lUHIQeCioRRMBoCQyoEBl03CFQ6mwNx+CAIRlAx8xJUMFKrCUENP/GBHHQIiC8DMajDP1AAZDfIDSC3DC4AAIaIJvXyYHMqAAAAAElFTkSuQmCC"},rbLY:function(t,e){},"sRz/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("o5Dg"),a={data:function(){return{menu:[],defaultActive:""}},props:["isCollapse"],mounted:function(){var t=JSON.parse(localStorage.getItem("menuTree"));this.menu=t,console.log(this.menu);var e=window.location.href.split("/#")[1];this.defaultActive=e},methods:{}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"menu"},[s("el-menu",{staticClass:"frontMenu",attrs:{collapse:t.isCollapse,"default-active":t.defaultActive,"unique-opened":!1,"background-color":"#02152c","text-color":"#fff","active-text-color":"#ffd04b","collapse-transition":!1,router:""}},[t._l(t.menu,function(e){return[e.children?[s("el-submenu",{key:e.nav_id,attrs:{index:e.nav_name}},[s("template",{slot:"title"},[s("i",{staticClass:"iconfont",class:e.icon}),t._v(" "),s("span",{staticStyle:{"margin-left":"8px"}},[t._v(t._s(e.nav_name))])]),t._v(" "),t._l(e.children,function(e){return[e.children?[s("el-submenu",{key:e.nav_id,attrs:{index:e.nav_name}},[s("template",{slot:"title"},[s("span",{staticStyle:{"margin-left":"8px"}},[t._v(t._s(e.nav_name))])]),t._v(" "),s("el-menu-item-group",[t._l(e.children,function(e){return[s("el-menu-item",{key:e.nav_id,attrs:{index:e.path}},[s("span",{staticStyle:{"margin-left":"8px"},attrs:{slot:"title"},slot:"title"},[t._v("\n                        "+t._s(e.nav_name)+"\n                      ")])])]})],2)],2)]:[s("el-menu-item",{key:e.nav_id,attrs:{index:e.path}},[s("span",{staticStyle:{"margin-left":"8px"},attrs:{slot:"title"},slot:"title"},[t._v("\n                  "+t._s(e.nav_name)+"\n                ")])])]]})],2)]:[s("el-menu-item",{key:e.nav_id,attrs:{index:e.path}},[s("i",{staticClass:"iconfont",class:e.icon}),t._v(" "),s("span",{staticStyle:{"margin-left":"8px"},attrs:{slot:"title"},slot:"title"},[t._v("\n            "+t._s(e.nav_name)+"\n          ")])])]]})],2)],1)},staticRenderFns:[]};var l={data:function(){return{isCollapse:!1,userInfo:{},userImg:""}},components:{menus:s("VU/8")(a,i,!1,function(t){s("rbLY")},"data-v-f33043b8",null).exports},mounted:function(){var t=localStorage.getItem("userInfo");this.userInfo=JSON.parse(t),this.userObjDetail()},methods:{logOut:function(){var t=this;this.$confirm("确认退出, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){window.localStorage.clear("token"),window.localStorage.clear("userInfo"),t.$router.push("/login"),t.$message.success("退出成功")}).catch(function(){t.$message.info("取消退出")})},collapseBtn:function(){this.isCollapse=!this.isCollapse},userClick:function(){this.$router.push("/gongsi/gongsi")},userObjDetail:function(){var t=this,e={company_id:JSON.parse(localStorage.getItem("userInfo")).company_id};n.a.userDetail(e).then(function(e){0==e.data.code&&(t.userImg=e.data.data.data.picture)})}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-box"},[n("el-container",[n("el-aside",{attrs:{width:t.isCollapse?"64px":"250px"}},[n("menus",{attrs:{isCollapse:t.isCollapse}})],1),t._v(" "),n("div",{staticClass:"content-right"},[n("div",{staticClass:"headers"},[n("div",{staticClass:"top"},[n("img",{staticClass:"top-left",class:t.isCollapse?"active":"active1",attrs:{src:s("fqxG")},on:{click:t.collapseBtn}}),t._v(" "),n("div",{staticClass:"top-right"},[n("div",{staticClass:"img",on:{click:t.userClick}},[n("img",{attrs:{src:t.userImg,alt:""}})]),t._v(" "),n("div",{staticClass:"user",on:{click:t.userClick}},[t._v(t._s(t.userInfo.username))]),t._v(" "),n("div",{staticClass:"logOut",on:{click:t.logOut}},[t._v("退出")])])])]),t._v(" "),n("el-main",[n("div",{staticClass:"content"},[n("router-view")],1)])],1)],1)],1)},staticRenderFns:[]};var r=s("VU/8")(l,o,!1,function(t){s("B9sm")},"data-v-96e7d91a",null);e.default=r.exports}});
//# sourceMappingURL=2.9fe5189b07df7aecea82.js.map