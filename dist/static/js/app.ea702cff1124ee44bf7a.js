webpackJsonp([15],{"4FU0":function(t,n){},"5BXs":function(t,n,e){var a={"./login":["Luci",0,3],"./login.vue":["Luci",0,3]};function i(t){var n=a[t];return n?Promise.all(n.slice(1).map(e.e)).then(function(){return e(n[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}i.keys=function(){return Object.keys(a)},i.id="5BXs",t.exports=i},"6t4u":function(t,n,e){"use strict";var a=e("zL8q");e.n(a);n.a={hint:function(t){Object(a.Message)(t)},succ:function(t){Object(a.Message)({message:t,type:"success"})},warn:function(t){Object(a.Message)({message:t,type:"warning"})},erro:function(t){a.Message.error(t)}}},AnRD:function(t,n,e){t.exports=e.p+"static/img/loading_success.da5a0aa.gif"},"F+jZ":function(t,n,e){"use strict";e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i});e("6t4u");var a="https://api.ztbory.com/v3/qualification",i="https://api.ztbory.com/v3/qualification"},IcnI:function(t,n,e){"use strict";var a=e("/5sW"),i=e("NYxO");a.default.use(i.a);new a.default;var o=new i.a.Store({state:{},mutations:{},actions:{}});n.a=o},MWF8:function(t,n,e){var a={"./applyAccount/applyAccount":["KPNA",0,12],"./applyAccount/applyAccount.vue":["KPNA",0,12],"./caozuo/caozuo":["jf8x",7],"./caozuo/caozuo.vue":["jf8x",7],"./cheliang/che":["F6BQ",0,9],"./cheliang/che.vue":["F6BQ",0,9],"./dianzi/dianzi":["8BsC",13],"./dianzi/dianzi.vue":["8BsC",13],"./gongsi/gongsi":["5DlU",0,8],"./gongsi/gongsi.vue":["5DlU",0,8],"./gongzuotai/gongzuo":["f2qx",1],"./gongzuotai/gongzuo.vue":["f2qx",1],"./hetong/hetong":["khcY",0,10],"./hetong/hetong.vue":["khcY",0,10],"./main":["sRz/",2],"./main.vue":["sRz/",2],"./renyuan/renyuan":["uxAk",0,6],"./renyuan/renyuan.vue":["uxAk",0,6],"./zhanghu/juese":["icfI",4],"./zhanghu/juese.vue":["icfI",4],"./zhanghu/zhanghu":["PgHr",5],"./zhanghu/zhanghu.vue":["PgHr",5],"./zizhi/zizhi":["TVyp",0,11],"./zizhi/zizhi.vue":["TVyp",0,11]};function i(t){var n=a[t];return n?Promise.all(n.slice(1).map(e.e)).then(function(){return e(n[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}i.keys=function(){return Object.keys(a)},i.id="MWF8",t.exports=i},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("/5sW"),i={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var o=e("VU/8")(null,i,!1,function(t){e("a+dj")},null,null).exports,r=e("/ocq");a.default.use(r.a);var u,c,s=function(t){return function(){return e("MWF8")("./"+t)}},l=new r.a({routes:[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:(u="login",function(){return e("5BXs")("./"+u)})},{path:"/main",name:"main",component:s("main"),children:[{path:"/",redirect:"/gongzuotai/gongzuo"},{path:"/gongzuotai/gongzuo",name:"gongzuo",component:s("gongzuotai/gongzuo")},{path:"/cheliang/che",name:"che",component:s("cheliang/che")},{path:"/renyuan/renyuan",name:"renyuan",component:s("renyuan/renyuan")},{path:"/zizhi/zizhi",name:"zizhi",component:s("zizhi/zizhi")},{path:"/hetong/hetong",name:"hetong",component:s("hetong/hetong")},{path:"/dianzi/dianzi",name:"dianzi",component:s("dianzi/dianzi")},{path:"/caozuo/caozuo",name:"caozuo",component:s("caozuo/caozuo")},{path:"/zhanghu/zhanghu",name:"zhanghu",component:s("zhanghu/zhanghu")},{path:"/zhanghu/juese",name:"juese",component:s("zhanghu/juese")}]},{path:"/gongsi/gongsi",name:"gongsi",component:s("gongsi/gongsi")},{path:"/applyAccount/applyAccount",name:"applyAccount",component:s("applyAccount/applyAccount")}]}),f=e("XLwt"),p=e.n(f),d=e("zL8q"),m=e.n(d),h=(e("tvR6"),e("Y81h")),g=e.n(h),_=(e("UVIz"),e("4FU0"),e("IcnI")),z=e("fZjL"),v=e.n(z),x=e("Gu7T"),y=e.n(x),b=e("SaKj"),q=e("bOdI"),w=e.n(q),j={tableName1:(c={car_num:"车牌号",car_type_name:"车辆类型",is_weight_name:"是否安装计量称重设备",is_self_name:"是否涂装",is_gps_name:"是否安装gps",plant1:"绑定处理厂1",plant2:"绑定处理厂2",plant3:"绑定处理厂3",plant4:"绑定处理厂4",plant5:"绑定处理厂5",car_color:"车辆颜色",transport_type_name:"收运类型",power_type:"车辆动力类型",facility_num:"车辆资产编号",car_emission_grade:"尾气排放标准",oil_type:"燃油类型",carry_person_num:"核载人数(人)"},w()(c,"power_type","车辆动力类型"),w()(c,"total_weight","总质量(kg)"),w()(c,"carry_weight","核载重量(kg)"),w()(c,"car_weight","整车重量(kg)"),w()(c,"new_date","生产日期"),w()(c,"car_size_length","车辆外观尺寸长(米)"),w()(c,"car_size_width","车辆外观尺寸宽(米)"),w()(c,"del_date","报废日期"),w()(c,"facility_status_name","指标状况"),w()(c,"cost","购置费用(万元)"),w()(c,"reg_date","登记日期"),w()(c,"brand","品牌型号"),w()(c,"receive_date","接管日期"),w()(c,"run_year","运营年限(年)"),w()(c,"is_runing_name","是否有作业能力"),w()(c,"contacts","联系人"),w()(c,"phone","联系电话"),w()(c,"operate_unit","运营单位"),w()(c,"manage_unit","管理单位"),c),tableName2:{work_name:"人员姓名",phone:"联系方式",job:"职务",sex:"性别",age:"年龄"},tableName3:{name:"资质名称",signed_time:"证书备案日期",viald_time:"证书有效期",certificate_number:"证书编号",licensed_content:"许可内容",licence_place:"发证机关"},tableName4:{con_name:"合同名称",con_type_name:"合同类型",signed_time:"签订时间",con_viald_time:"合同有效期",content:"备注"}},k=e("o5Dg"),C={props:{filename:{type:String,default:"Excel导出"},title:{type:String,default:"Excel导出"}},data:function(){return{file_name:"",bookType:"xlsx",tableName:{},sheet:[{title:"",tHeader:[],table:[],keys:[],sheetName:"插件信息",cellStyle:[{cell:"A1",font:{name:"宋体",sz:14,color:{rgb:"ffffff"},bold:!0},fill:{fgColor:{rgb:"#fff"}}}]}],dialogVisibleExport:!1,format:function(t){return 100===t?"100%":t+"%"},percentage:0,export_list:[],isTrue:!1}},mounted:function(){console.log(j)},methods:{exportlist:function(t){this.parent_data=t,this.export_list=[],this.dialogVisibleExport=!0,this.exportloading()},exportloading:function(){var t=this,n=this.export_list.length;if(this.percentage=parseInt(n/this.parent_data.total*100),n>=this.parent_data.total)this.isTrue=!0;else{var e=this.parent_data.data;this.parent_data.size>=1e4?e.size=100:e.size=20,e.un_loding=!0,k.a[this.parent_data.api](e).then(function(n){200==n.data.code&&n.data.data.data.results&&n.data.data.data.results.length&&(t.export_list=[].concat(y()(t.export_list),y()(n.data.data.data.results)),t.parent_data.data.page++),t.exportloading()})}},onError:function(t){console.log(t)},exportTable:function(){var t=this;this.$confirm("确定要导出吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.exportFn(),t.$message({type:"success",message:"导出成功!"})}).catch(function(){t.$message({type:"info",message:"已取消导出"})})},exportFn:function(t){var n=this;"车辆管理"==this.filename&&(this.tableName=j.tableName1),"人员管理"==this.filename&&(this.tableName=j.tableName2),"资质管理"==this.filename&&(this.tableName=j.tableName3),"合同管理"==this.filename&&(this.tableName=j.tableName4);var e=[];t.map(function(t,a){for(var i in e.push({}),t)for(var o in n.tableName)i==o&&(e[a][i]=t[i])});var a=[];(t=[].concat(e)).map(function(t,n){if(0==n)for(var e in t)a.push(e)}),a=a.sort();var i=[].concat(y()(a));a.map(function(t,e){for(var a in n.tableName)t==a&&(i[e]=n.tableName[a])});var o=[];a.map(function(t,e){for(var a in n.tableName)t==a&&o.push(n.tableName[a])}),t.map(function(t){return function(t){for(var n=v()(t).sort(),e={},a=0;a<n.length;a++)e[n[a]]=t[n[a]];return e}(t)}),this.sheet[0].keys=a,this.sheet[0].tHeader=o,this.sheet[0].table=t,this.$refs.excelExport.pikaExportExcel(),this.dialogVisibleExport=!1}},components:{ExcelExport:b.ExcelExport},watch:{dialogVisibleExport:function(t){t||(this.isTrue=!1,this.export_list=[],this.percentage=0)}}},N={render:function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"block"},[a("excel-export",{ref:"excelExport",attrs:{bookType:t.bookType,filename:t.filename,sheet:t.sheet,"on-error":t.onError,manual:!0}}),t._v(" "),a("el-dialog",{attrs:{title:"导出","close-on-click-modal":!1,"show-close":!0,visible:t.dialogVisibleExport,width:"600px"},on:{"update:visible":function(n){t.dialogVisibleExport=n}}},[a("div",{staticStyle:{width:"100%"}},[a("div",{staticClass:"flex"},[t.isTrue?a("img",{attrs:{src:e("AnRD"),alt:""}}):a("img",{attrs:{src:e("vn24"),alt:""}}),t._v(" "),t.isTrue?a("h3",[t._v("加载完成")]):a("h3",[t._v("正在加载导出数据")])]),t._v(" "),a("el-progress",{attrs:{percentage:t.percentage,format:t.format}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:!t.isTrue},on:{click:function(n){return t.exportFn(t.export_list)}}},[t._v("下载文件")])],1)])],1)},staticRenderFns:[]};var E=e("VU/8")(C,N,!1,function(t){e("T6Y6")},"data-v-6342d56a",null).exports;a.default.component("dataExport",E),a.default.use(m.a),a.default.config.productionTip=!1,a.default.prototype.$echarts=p.a,window.APP_INFO=Object({NODE_ENV:"production"}).APP_INFO;var T=["applyAccount","login"];l.beforeEach(function(t,n,e){return g.a.start(),window.localStorage.getItem("token")||-1!==T.indexOf(t.name)?e():(a.default.prototype.$message.error("请先登录"),g.a.done(),e({name:"login"}))}),l.afterEach(function(){setTimeout(function(){g.a.done()})}),a.default.config.productionTip=!1,a.default.prototype.$store=_.a;var A=new a.default({el:"#app",store:_.a,router:l,render:function(t){return t(o)}}).$mount("#app");window.app=A},T6Y6:function(t,n){},UVIz:function(t,n){},"a+dj":function(t,n){},o5Dg:function(t,n,e){"use strict";var a=e("bOdI"),i=e.n(a),o=e("//Fk"),r=e.n(o),u=e("mtWM"),c=e.n(u),s={},l=e("F+jZ").b;s.ajax=c.a.create({baseURL:l,timeout:5e4}),s.newAjax=c.a.create({baseURL:"http://ljflbasedata.ztbory.com",timeout:5e4}),s.api=l,s.oauthUrl=l;var f,p=s,d=e("mw3O"),m=e.n(d),h=(e("/5sW"),e("zL8q")),g=e("6t4u");e("IcnI");p.ajax.defaults.headers.common={"X-Requested-With":"XMLHttpRequest"},p.ajax.interceptors.request.use(function(t){t.params&&t.params.un_loding||(f=h.Loading.service({lock:!0,text:"正在加载...",background:"rgba(0, 0, 0, 0.7)"}));var n=localStorage.getItem("token");return n&&(t.headers.Authorization="Token "+n),t},function(t){return r.a.reject(t)}),p.ajax.interceptors.response.use(function(t){return f.close(),t},function(t){f.close();var n=t.response;if(n){if(400===n.status)return g.a.erro("错误的请求!");if(401===n.status)return localStorage.setItem("token",null),void(location.href="/#/login");if(403===n.status)return g.a.erro("禁止访问!");404===n.status||n.status}return console.error(n),r.a.reject(n)});var _,z=function(t,n){return p.ajax({method:"post",url:t,data:m.a.stringify(n),timeout:3e4,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}})},v=function(t,n){return p.ajax({method:"get",url:t,params:n})},x=function(t,n){return p.ajax({method:"delete",url:t,params:n})},y=function(t,n){return p.ajax({method:"put",url:t,data:m.a.stringify(n),timeout:3e4,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}})},b=function(t,n){return p.ajax({method:"patch",url:t,data:n,timeout:3e4})},q=function(t,n){return p.ajax({method:"post",url:t,data:n,timeout:3e4,headers:{"Content-Type":"multipart/form-data"}})};n.a=(_={login:function(t){return z("/login/",t)},statisticsData:function(t){return v("/qualification/status_all_num/",t)},timeData:function(t){return v("/qualification/status_num/",t)},accountList:function(t){return v("/user/list/",t)},addAccount:function(t){return z("/user/list/",t)},delAccount:function(t){return x("/user/list/"+t+"/")},roleList:function(t){return v("/user/role_list/",t)},accountStatus:function(t,n){return b("/user/list/"+t+"/",n)},updataPassword:function(t){return z("/user/update/password/",t)},roleData:function(t){return v("/user/role/",t)},adRole:function(t){return z("/user/role/",t)},upRole:function(t,n){return y("/user/role/"+t+"/",n)},updataRoleStatus:function(t,n){return b("/user/role/"+t+"/",n)},deleteRole:function(t,n){return x("/user/role/"+t+"/",n)},visvitPageList:function(t){return v("/user/nav_list/",t)},quList:function(t){return v("/qualification/street_list/",t)},moduanList:function(t){return v("/qualification/plant_list/",t)},contractList:function(t){return v("/qualification/contract/",t)},certification:function(t){return v("/qualification/zizhi_list/",t)},addContract:function(t){return z("/qualification/contract/",t)},updataContract:function(t,n){return b("/qualification/contract/"+t+"/",n)},deleteContract:function(t,n){return x("/qualification/contract/"+t+"/",n)},submitContract:function(t,n){return b("/qualification/contract/"+t+"/",n)},amendContract:function(t){return v("/qualification/contract_operate/",t)},certificationData:function(t){return v("/qualification/qualif/",t)}},i()(_,"certificationData",function(t){return v("/qualification/qualif/",t)}),i()(_,"addCertification",function(t){return z("/qualification/qualif/",t)}),i()(_,"updataCertification",function(t,n){return b("/qualification/qualif/"+t+"/",n)}),i()(_,"delCertification",function(t,n){return x("/qualification/qualif/"+t+"/",n)}),i()(_,"submitCertification",function(t,n){return b("/qualification/qualif/"+t+"/",n)}),i()(_,"recordCertification",function(t){return v("/qualification/qualif_operate/",t)}),i()(_,"importPerson",function(t){return z("/qualification/contract_push/",t)}),i()(_,"personData",function(t){return v("/qualification/worker/",t)}),i()(_,"addPerson",function(t){return z("/qualification/worker/",t)}),i()(_,"redactPerson",function(t,n){return b("/qualification/worker/"+t+"/",n)}),i()(_,"delPerson",function(t,n){return x("/qualification/worker/"+t+"/",n)}),i()(_,"submitPerson",function(t,n){return b("/qualification/worker/"+t+"/",n)}),i()(_,"recordPerson",function(t){return v("/qualification/worker_operate/",t)}),i()(_,"addCompany",function(t){return z("/qualification/company/",t)}),i()(_,"detailCompany",function(t){return v("/qualification/company/",t)}),i()(_,"userDetail",function(t){return v("/user/user_detail/",t)}),i()(_,"updataCompany",function(t,n){return y("/qualification/company/"+t+"/",n)}),i()(_,"delCompany",function(t,n){return x("/qualification/company/"+t+"/",n)}),i()(_,"serviceData",function(t){return v("/qualification/coding_list/",t)}),i()(_,"quCheZizhiData",function(t){return v("/qualification/company_area_list/",t)}),i()(_,"carList",function(t){return v("/qualification/car/",t)}),i()(_,"addCar",function(t){return z("/qualification/car/",t)}),i()(_,"submitCar",function(t,n){return b("/qualification/car/"+t+"/",n)}),i()(_,"updataCar",function(t,n){return b("/qualification/car/"+t+"/",n)}),i()(_,"delCar",function(t,n){return x("/qualification/car/"+t+"/",n)}),i()(_,"amendRecordCar",function(t){return v("/qualification/car_operate/",t)}),i()(_,"operationLog",function(t){return v("/qualification/operate_log/",t)}),i()(_,"operatorData",function(t){return v("/qualification/log_user/",t)}),i()(_,"importCart",function(t){return q("/qualification/car_push/",t)}),i()(_,"importStaff",function(t){return q("/qualification/worker_push/",t)}),i()(_,"importQualification",function(t){return q("/qualification/quali_push/",t)}),i()(_,"importContract",function(t){return q("/qualification/contract_push/",t)}),i()(_,"exportCart",function(t){return v("/qualification/car_excel/",t)}),_)},tvR6:function(t,n){},vn24:function(t,n,e){t.exports=e.p+"static/img/loading_ing.76e43ad.gif"}},["NHnr"]);
//# sourceMappingURL=app.ea702cff1124ee44bf7a.js.map