webpackJsonp([12],{PgHr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),s=a.n(r),l=a("o5Dg"),o={data:function(){return{role_type:"",company_id:"",dialogVisible:!1,tableData:[],ruleForm:{},options:[{value:1,name:"管理员"},{value:2,name:"编辑"},{value:3,name:"查看"}],status:"",roleList:[],searchData:{role_id:"",username:""},pageData:{page:1,page_size:10},total:0,rules:{nickname:[{required:!0,message:"请输入姓名",trigger:"blur"}],username:[{required:!0,message:"请填写账号",trigger:"blur"}],user_status:[{required:!0,message:"请选择角色状态",trigger:"change"}],password:[{required:!0,message:"请填写密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}],role_id:[{required:!0,message:"请选择活动区域",trigger:"change"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;l.a.addAccount(t.ruleForm).then(function(e){0==e.data.code?(t.$message.success("新增成功!"),t.listData(),t.dialogVisible=!1):t.$message.error(e.data.msg)})})},handleClose:function(e){this.$refs.ruleForm.resetFields()},addAccount:function(){this.dialogVisible=!0},switchClick:function(e){var t=this,a={user_status:e.user_status};l.a.accountStatus(e.id,a).then(function(a){1==e.user_status?t.$message.success("已启用!"):t.$message.info("已禁用!"),t.listData()})},updataClick:function(e){var t=this;console.log(e);var a={id:e.id,news_password:"123456"};this.$confirm("此操作将密码重置为 123456, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.a.updataPassword(a).then(function(e){t.$message.success("重置成功!"),t.listData()})}).catch(function(){t.$message.info("已取消重置")})},delAccount:function(e){var t=this;console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.a.delAccount(e.id).then(function(e){204==e.data.code?(t.$message.success("删除成功!"),t.listData()):t.$message.error(e.data.msg)})}).catch(function(){t.$message.info("已取消删除")})},handleSizeChange:function(e){this.pageData.page_size=e,this.listData()},handleCurrentChange:function(e){this.pageData.page=e,this.listData()},searchClk:function(){this.pageData.page=1,this.listData()},resetClk:function(){this.pageData.page=1,this.pageData.page_size=10,this.searchData={},this.listData()},listData:function(){var e=this,t=s()({company_uid:this.company_id,page:this.pageData.page,size:this.pageData.page_size},this.searchData);l.a.accountList(t).then(function(t){200==t.status&&(e.tableData=t.data.data.data.results,e.total=t.data.data.data.count)})},roleData:function(){var e=this,t={company_uid:this.company_id};l.a.roleList(t).then(function(t){200==t.status&&(e.roleList=t.data.data.data.results)})}},mounted:function(){this.role_type=JSON.parse(localStorage.getItem("userInfo")).role_type;var e=localStorage.getItem("userInfo"),t=JSON.parse(e);this.company_id=t.company_id,this.ruleForm.company_uid=t.company_id,this.listData(),this.roleData()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"登录账号："}},[a("el-input",{attrs:{placeholder:"请输入角色名称"},model:{value:e.searchData.username,callback:function(t){e.$set(e.searchData,"username",t)},expression:"searchData.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色："}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.searchData.role_id,callback:function(t){e.$set(e.searchData,"role_id",t)},expression:"searchData.role_id"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.roleList,function(e){return a("el-option",{key:e.obj_id,attrs:{label:e.role_name,value:e.obj_id}})})],2)],1),e._v(" "),"1"==e.role_type||"2"==e.role_type?a("el-button",{attrs:{type:"primary"},on:{click:e.addAccount}},[e._v("新增")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.searchClk}},[e._v("搜索")]),e._v(" "),a("el-button",{staticClass:"margin",attrs:{type:"warning"},on:{click:e.resetClk}},[e._v("重置")])],1),e._v(" "),a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"",border:"",height:"73vh"}},[a("el-table-column",{attrs:{type:"index",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"登陆账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"role_name",label:"角色"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contacts",label:"账号状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(a){return e.switchClick(t.row)}},model:{value:t.row.user_status,callback:function(a){e.$set(t.row,"user_status",a)},expression:"scope.row.user_status"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.updataClick(t.row)}}},[e._v("重置密码")]),e._v(" "),"1"==e.role_type?a("el-button",{staticStyle:{color:"red"},attrs:{type:"text"},on:{click:function(a){return e.delAccount(t.row)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"新建",visible:e.dialogVisible,width:"50%","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},close:function(t){return e.handleClose("ruleForm")}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"姓名：",prop:"nickname"}},[a("el-input",{model:{value:e.ruleForm.nickname,callback:function(t){e.$set(e.ruleForm,"nickname",t)},expression:"ruleForm.nickname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"登录账号：",prop:"username"}},[a("el-input",{model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色：",prop:"role_id"}},[a("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.ruleForm.role_id,callback:function(t){e.$set(e.ruleForm,"role_id",t)},expression:"ruleForm.role_id"}},e._l(e.roleList,function(e){return a("el-option",{key:e.obj_id,attrs:{label:e.role_name,value:e.obj_id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"角色状态：",prop:"role_status"}},[a("el-radio-group",{model:{value:e.ruleForm.user_status,callback:function(t){e.$set(e.ruleForm,"user_status",t)},expression:"ruleForm.user_status"}},[a("el-radio",{attrs:{label:1}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("禁用")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"密码：",prop:"password"}},[a("el-input",{model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("创建")])],1)],1),e._v(" "),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{"current-page":e.pageData.page,"page-size":e.pageData.page_size,"page-sizes":[10,20,30,40],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var i=a("VU/8")(o,n,!1,function(e){a("u9aU")},"data-v-251fa1d8",null);t.default=i.exports},u9aU:function(e,t){}});
//# sourceMappingURL=12.dc0f7050330128aae8cf.js.map