webpackJsonp([3],{Luci:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("mvHQ"),o=e.n(n),r=e("o5Dg"),s=e("YLvu"),i={data:function(){return{fromData:{username:"RSjFk5Z",password:"123456"}}},mounted:function(){window.addEventListener("keydown",this.keyDown)},destroyed:function(){window.removeEventListener("keydown",this.keyDown,!1)},methods:{keyDown:function(t){13==t.keyCode&&this.login()},login:function(){var t=this;r.a.login(this.fromData).then(function(a){if(1==a.data.code){var e=a.data.data.data.token;localStorage.setItem("token",e),localStorage.setItem("userInfo",o()(a.data.data.data));var n=a.data.data.data.nav_id;n?r.a.visvitPageList({}).then(function(a){if(200==a.status){var e=a.data.data;console.log(e);var r=[];n.split(",").forEach(function(t){e.forEach(function(a){a.nav_id==t&&r.push(a)})});var i=s.a.transData(r,"nav_id","pid","children");console.log(i,123),localStorage.setItem("menuTree",o()(i)),t.$router.push("/main")}}):t.$message.error("该账号未配置菜单权限")}else t.$message.error(a.data.msg)}).catch(function(t){console.log(t)})}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"wrap"},[e("div",{staticClass:"title"},[t._v("资质审核系统")]),t._v(" "),e("div",{staticClass:"content"},[e("div",[e("el-form",[e("el-form-item",{attrs:{prop:"username"}},[e("el-input",{attrs:{"prefix-icon":"el-icon-user-solid",placeholder:"请输入用户名"},model:{value:t.fromData.username,callback:function(a){t.$set(t.fromData,"username",a)},expression:"fromData.username"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("el-input",{attrs:{"prefix-icon":"el-icon-lock",placeholder:"请输入密码",type:"password"},model:{value:t.fromData.password,callback:function(a){t.$set(t.fromData,"password",a)},expression:"fromData.password"}})],1),t._v(" "),e("el-form-item",[e("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(a){return t.login()}}},[t._v("登录")])],1)],1)],1)])])},staticRenderFns:[]};var l=e("VU/8")(i,c,!1,function(t){e("aUdF")},"data-v-7eb3370a",null);a.default=l.exports},YLvu:function(t,a,e){"use strict";a.a={transData:function(t,a,e,n,o){for(var r=[],s={},i=a,c=e,l=n,d=0,u=0,f=t.length;d<f;d++)s[t[d][i]]=t[d];for(;u<f;u++){var m=t[u],v=s[m[c]];v?(!v[l]&&(v[l]=[]),v[l].push(m)):r.push(m),o&&"1"==m.state&&o.push(m.id)}return r}}},aUdF:function(t,a){}});
//# sourceMappingURL=3.fee9c0295c898f982521.js.map