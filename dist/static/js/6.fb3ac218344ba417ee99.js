webpackJsonp([6],{khcY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Gu7T"),l=a.n(i),r=a("mvHQ"),s=a.n(r),o=a("Dd8w"),n=a.n(o),c=a("hYS1"),u=a("o5Dg"),d={components:{upload:c.a},data:function(){return{role_type:"",company_id:"",pickerOptions1:{disabledDate:function(t){var e=(new Date).getFullYear(),a=(new Date).getMonth(),i=(new Date).getDate(),l=new Date(e,a,i,"23","59","59").getTime();return t.getTime()>l}},contractList:[{con_type:"1",label:"收运合同"},{con_type:"2",label:"运输合同"}],jiaTypeList:[{jia_type:"1",label:"街道"}],zizhiList:[],selectList:[],dialogVisible:!1,dialogTitle:"",dialogVisible1:!1,imgDialogVisible:!1,pickerOptions:{disabledDate:function(t){return t.getTime()>new Date(new Date((new Date).toLocaleDateString()).getTime()+864e5-1)}},pickerOptions0:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},ruleForm:{},tableData:[],searchData:{name:"",jia_type:""},dates1:[],dates2:"",dates3:[],dates:[],datetime:[],pageData:{page:1,page_size:10},total:0,activeParams:"0",isYi:!0,isCause:!1,isButton0:!0,isButton1:!0,isButton2:!0,isButton3:!0,rules:{name:[{required:!0,message:"请输入合同名称",trigger:"blur"}],yi:[{required:!0,message:"请输入乙方",trigger:"blur"}],content:[{required:!0,message:"请填写备注",trigger:"blur"}],con_type:[{required:!0,message:"请选择合同类型",trigger:"change"}],street_coding:[{required:!0,message:"请选择甲方",trigger:"change"}],jia_type:[{required:!0,message:"请选择甲方类型",trigger:"change"}],jia:[{required:!0,message:"请选择甲方",trigger:"change"}],signed_time:[{required:!0,message:"请选择签订时间",trigger:"blur"}],viald_time:[{required:!0,message:"请选择合同有效期",trigger:"blur"}]},lookObj:{},recordList:[],oldruleForm:{},hetongList:[],zizhiListSelect:[]}},methods:{httpRequest:function(t){var e=this,a=new FormData;a.append("file",t.file),a.append("company_id",this.company_id),u.a.importContract(a).then(function(t){200==t.data.code?(e.$message.success(t.data.msg),e.contractData()):208==t.data.code?e.$message.warning(t.data.msg):e.$message.error(t.data.msg)})},exportTable:function(){var t=this;this.$confirm("本次共导出"+this.total+"条数据是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={data:n()({company_id:t.company_id,page:t.pageData.page,size:t.pageData.page_size,start_create_time:t.dates1[0],end_create_time:t.dates1[1],start_signed_time:t.dates2[0],end_signed_time:t.dates2[1],start_viald_time:t.dates3[0],end_viald_time:t.dates3[1],start_submit_time:t.dates[0],end_submit_time:t.dates[1],start_enter_time:t.datetime[0],end_enter_time:t.datetime[1]},t.searchData,{status:t.activeParams}),api:"contractList",total:t.total};t.$refs.export.exportlist(e)}).catch(function(){t.$message({type:"info",message:"已取消导出"})})},tabClick:function(t){console.log(this.activeParams),"0"===t.name&&(this.isYi=!0,this.isCause=!1,this.isButton0=!0,this.isButton1=!0,this.isButton2=!0,this.isButton3=!0,this.contractData()),"1"===t.name&&(this.isYi=!0,this.isCause=!1,this.isButton0=!0,this.isButton1=!1,this.isButton2=!1,this.isButton3=!1,this.contractData()),"2"===t.name&&(this.isYi=!1,this.isCause=!0,this.isButton0=!0,this.isButton1=!1,this.isButton2=!0,this.isButton3=!0,this.contractData()),"3"===t.name&&(this.isYi=!0,this.isCause=!1,this.isButton0=!0,this.isButton1=!1,this.isButton2=!0,this.isButton3=!0,this.contractData())},importClick:function(){var t=document.createElement("a");t.style.display="none",t.href="http://filemanager.ztbory.com/v1/file/filedownload/?bucket=qualification&path=20210316&filename=937e88b82be344fa959df0add9f86e1d.xlsx",t.setAttribute("download","合同模板"),document.body.appendChild(t),t.click()},submitClick:function(t){var e=this;t.qualification_picture?t.qua_type?this.$confirm("确认提交, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={status:1,contract_id:t.contract_id,company_id:e.company_id};u.a.submitContract(t.id,a).then(function(t){0==t.data.code?(e.$message.success("提交成功!"),e.contractData()):e.$message.error(t.data.msg)})}).catch(function(){e.$message.info("已取消提交")}):this.$message.error("请选择所需资质"):this.$message.warning("请完善合同信息")},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(e.ruleForm.contract_picture)if(e.ruleForm.qualification_picture){if(!t)return console.log("error submit!!"),!1;if(e.ruleForm.id){var a={status:e.ruleForm.status,contract_id:e.ruleForm.contract_id};for(var i in e.ruleForm)for(var l in e.oldruleForm)i==l&&e.ruleForm[i]!=e.oldruleForm[l]&&(console.log(i),a[i]=e.ruleForm[i]);a.viald_time=s()(a.viald_time),u.a.updataContract(e.ruleForm.id,a).then(function(t){0==t.data.code?(e.$message.success("编辑成功!"),e.contractData(),e.dialogVisible1=!1):e.$message.error(t.data.msg)})}else{var r=n()({},e.ruleForm);r.viald_time=s()(r.viald_time),u.a.addContract(r).then(function(t){0==t.data.code?(e.$message.success("新增成功!"),e.contractData(),e.dialogVisible1=!1):e.$message.error(t.data.msg)})}}else e.$message.warning("请上传资质照片");else e.$message.warning("请上传合同照片")})},handleClose:function(t){this.$refs.ruleForm.resetFields(),this.$refs.upload1.clearFiles(),this.$refs.upload2.clearFiles(),this.ruleForm={jia:""},this.ruleForm.company_id=this.company_id},addClk:function(){this.dialogTitle="新建",this.dialogVisible1=!0,this.imageUrl="",this.imageUrl1=""},updataClick:function(t){this.changeSelect(t.jia_type),this.dialogTitle="修改",this.dialogVisible1=!0,this.oldruleForm=n()({},t),this.ruleForm=n()({},t)},deleteClick:function(t){var e=this,a={status:t.status,contract_id:t.contract_id};this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){u.a.deleteContract(t.id,a).then(function(t){e.$message.success("删除成功!"),e.contractData()})}).catch(function(){e.$message.info("已取消删除")})},lookClick:function(t){var e=this;this.hetongList=[].concat(l()((t.contract_picture||"").split(","))),this.zizhiList=[].concat(l()((t.qualification_picture||"").split(","))),this.lookObj=t,this.dialogVisible=!0;var a={status:t.status,contract_id:t.contract_id};u.a.amendContract(a).then(function(t){0==t.data.code&&(console.log(t),e.recordList=t.data.data)})},lookImgClick:function(t){console.log(t),this.imgDialogVisible=!0,this.hetongList=[].concat(l()((t.contract_picture||"").split(","))),this.zizhiList=[].concat(l()((t.qualification_picture||"").split(",")))},changeSelect:function(t){var e=this,a={company_id:this.company_id};"1"==t&&u.a.quList(a).then(function(t){0==t.data.code&&(e.selectList=t.data.data.data)}),"2"==t&&u.a.moduanList(a).then(function(t){0==t.data.code&&t.data.data.data.length>0&&(e.selectList=t.data.data.data)})},changeSelect1:function(t){var e=this;this.selectList.find(function(a){a.coding==t&&(e.ruleForm.street_coding=a.coding,e.ruleForm.jia=a.name)})},handleSizeChange:function(t){this.pageData.page_size=t,this.contractData()},handleCurrentChange:function(t){this.pageData.page=t,this.contractData()},uploadSuccess:function(t){this.ruleForm.contract_picture=t.join(",")},uploadSuccess1:function(t){this.ruleForm.qualification_picture=t.join(",")},searchClk:function(){this.pageData.page=1,this.contractData()},resetClk:function(){this.pageData.page=1,this.pageData.page_size=10,this.dates1=[],this.dates2="",this.dates3=[],this.datetime=[],this.dates=[],this.status="",this.searchData={},this.contractData()},contractData:function(){var t=this,e=n()({company_id:this.company_id,page:this.pageData.page,size:this.pageData.page_size,start_create_time:this.dates1[0],end_create_time:this.dates1[1],start_signed_time:this.dates2,start_viald_time:this.dates3[0],end_viald_time:this.dates3[1],start_submit_time:this.dates[0],end_submit_time:this.dates[1],start_enter_time:this.datetime[0],end_enter_time:this.datetime[1]},this.searchData,{status:this.activeParams});u.a.contractList(e).then(function(e){200==e.data.code&&(t.tableData=e.data.data.data.results,t.total=e.data.data.data.count)})},zizhiData:function(){var t=this,e={company_id:this.company_id};u.a.certification(e).then(function(e){0==e.data.code&&(t.zizhiListSelect=e.data.data.data)})}},mounted:function(){var t=localStorage.getItem("userInfo"),e=JSON.parse(t);this.ruleForm.company_id=e.company_id,this.company_id=e.company_id,this.role_type=e.role_type,this.contractData(),this.zizhiData()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-tabs",{on:{"tab-click":t.tabClick},model:{value:t.activeParams,callback:function(e){t.activeParams=e},expression:"activeParams"}},[a("el-tab-pane",{attrs:{label:"草稿",name:"0"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"待处理",name:"1"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"不通过",name:"2"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"已通过",name:"3"}})],1),t._v(" "),a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"合同名称："}},[a("el-input",{attrs:{placeholder:"请输入合同名称"},model:{value:t.searchData.name,callback:function(e){t.$set(t.searchData,"name",e)},expression:"searchData.name"}})],1),t._v(" "),"0"==t.activeParams?a("el-form-item",{attrs:{label:"保存日期："}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"picker-options":t.pickerOptions1,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dates1,callback:function(e){t.dates1=e},expression:"dates1"}})],1):t._e(),t._v(" "),"1"==t.activeParams?a("el-form-item",{attrs:{label:"提交日期："}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"picker-options":t.pickerOptions1,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}})],1):t._e(),t._v(" "),"2"==t.activeParams?a("el-form-item",{attrs:{label:"审核日期："}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"picker-options":t.pickerOptions1,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.datetime,callback:function(e){t.datetime=e},expression:"datetime"}})],1):t._e(),t._v(" "),"3"==t.activeParams?a("el-form-item",{attrs:{label:"通过日期："}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"picker-options":t.pickerOptions1,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.datetime,callback:function(e){t.datetime=e},expression:"datetime"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"签订日期："}},[a("el-date-picker",{attrs:{"picker-options":t.pickerOptions,type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期签订日期"},model:{value:t.dates2,callback:function(e){t.dates2=e},expression:"dates2"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"甲方类型："}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:t.searchData.jia_type,callback:function(e){t.$set(t.searchData,"jia_type",e)},expression:"searchData.jia_type"}},[a("el-option",{attrs:{value:"全部"}}),t._v(" "),t._l(t.jiaTypeList,function(t){return a("el-option",{key:t.jia_type,attrs:{label:t.label,value:t.jia_type}})})],2)],1),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searchClk}},[t._v("搜索")]),t._v(" "),"0"!=t.activeParams||"1"!=t.role_type&&"2"!=t.role_type?t._e():a("el-button",{attrs:{type:"primary"},on:{click:t.addClk}},[t._v("新建")]),t._v(" "),a("el-button",{staticClass:"margin",attrs:{type:"warning"},on:{click:t.resetClk}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.exportTable}},[t._v("导出")]),t._v(" "),a("el-form-item",[a("dataExport",{ref:"export",attrs:{filename:"合同管理",data:t.tableData}})],1),t._v(" "),"0"==t.activeParams?a("el-form-item",[a("el-upload",{attrs:{accept:".xls, .xlsx",action:"string","http-request":t.httpRequest}},[a("el-button",{attrs:{type:"primary"}},[t._v("导入")])],1)],1):t._e(),t._v(" "),"0"==t.activeParams?a("el-form-item",[a("el-button",{attrs:{type:"success"},on:{click:t.importClick}},[t._v("下载导入模板")])],1):t._e()],1),t._v(" "),a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:"",border:"",height:"62vh"}},[a("el-table-column",{attrs:{type:"index",label:"序号"}}),t._v(" "),"2"==t.activeParams?a("el-table-column",{attrs:{prop:"enter_time",label:"审核时间"}}):t._e(),t._v(" "),"0"==t.activeParams?a("el-table-column",{attrs:{prop:"create_time",label:"保存时间"}}):t._e(),t._v(" "),"1"==t.activeParams?a("el-table-column",{attrs:{prop:"submit_time",label:"提交时间"}}):t._e(),t._v(" "),"3"==t.activeParams?a("el-table-column",{attrs:{prop:"enter_time",label:"通过时间"}}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"合同名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"signed_time",label:"签订时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"viald_time",label:"合同有效期"}}),t._v(" "),a("el-table-column",{attrs:{label:"甲方类型"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.jia_type?a("div",[t._v("街道")]):t._e(),t._v(" "),"2"==e.row.jia_type?a("div",[t._v("末端厂")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"jia",label:"甲方"}}),t._v(" "),t.isYi?a("el-table-column",{attrs:{prop:"yi",label:"乙方"}}):t._e(),t._v(" "),t.isCause?a("el-table-column",{attrs:{prop:"no_reject",label:"不通过原因"}}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"contacts",label:"合同照片"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.lookImgClick(e.row)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[!t.isButton0||"1"!=t.role_type&&"2"!=t.role_type&&"3"!=t.role_type?t._e():a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.lookClick(e.row)}}},[t._v("查看")]),t._v(" "),!t.isButton1||"1"!=t.role_type&&"2"!=t.role_type?t._e():a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.submitClick(e.row)}}},[t._v("提交")]),t._v(" "),!t.isButton2||"1"!=t.role_type&&"2"!=t.role_type?t._e():a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.updataClick(e.row)}}},[t._v("修改")]),t._v(" "),t.isButton3&&"1"==t.role_type?a("el-button",{staticStyle:{color:"red"},attrs:{type:"text"},on:{click:function(a){return t.deleteClick(e.row)}}},[t._v("删除")]):t._e()]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible1,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.dialogVisible1=e},close:function(e){return t.handleClose("ruleForm")}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"160px"}},[a("el-form-item",{attrs:{label:"合同名称：",prop:"name"}},[a("el-input",{attrs:{width:"200px"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"合同类型：",prop:"con_type"}},[a("el-select",{attrs:{placeholder:"请选择合同类型"},model:{value:t.ruleForm.con_type,callback:function(e){t.$set(t.ruleForm,"con_type",e)},expression:"ruleForm.con_type"}},t._l(t.contractList,function(t){return a("el-option",{key:t.con_type,attrs:{label:t.label,value:t.con_type}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"签订时间：",prop:"signed_time"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"请选择签订时间"},model:{value:t.ruleForm.signed_time,callback:function(e){t.$set(t.ruleForm,"signed_time",e)},expression:"ruleForm.signed_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"合同有效期：",prop:"viald_time"}},[a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",placeholder:"请选择合同有效期"},model:{value:t.ruleForm.viald_time,callback:function(e){t.$set(t.ruleForm,"viald_time",e)},expression:"ruleForm.viald_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"甲方类型：",prop:"jia_type"}},[a("el-select",{attrs:{placeholder:"请选择甲方类型"},on:{change:t.changeSelect},model:{value:t.ruleForm.jia_type,callback:function(e){t.$set(t.ruleForm,"jia_type",e)},expression:"ruleForm.jia_type"}},t._l(t.jiaTypeList,function(t){return a("el-option",{key:t.jia_type,attrs:{label:t.label,value:t.jia_type}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"甲方：",prop:"street_coding"}},[a("el-select",{attrs:{placeholder:"请选择甲方"},on:{change:t.changeSelect1},model:{value:t.ruleForm.street_coding,callback:function(e){t.$set(t.ruleForm,"street_coding",e)},expression:"ruleForm.street_coding"}},t._l(t.selectList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.coding}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"乙方：",prop:"yi"}},[a("el-input",{model:{value:t.ruleForm.yi,callback:function(e){t.$set(t.ruleForm,"yi",e)},expression:"ruleForm.yi"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所需资质：",prop:"qua_type"}},[a("el-select",{attrs:{placeholder:"请选择所需资质"},model:{value:t.ruleForm.qua_type,callback:function(e){t.$set(t.ruleForm,"qua_type",e)},expression:"ruleForm.qua_type"}},t._l(t.zizhiListSelect,function(t,e){return a("el-option",{key:e,attrs:{label:t,value:t}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注：",prop:"content"}},[a("el-input",{model:{value:t.ruleForm.content,callback:function(e){t.$set(t.ruleForm,"content",e)},expression:"ruleForm.content"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"合同照片：",prop:"contract_picture"}},[a("upload",{ref:"upload1",attrs:{imageUrl:t.ruleForm.contract_picture},on:{uploadSuccess:t.uploadSuccess}})],1),t._v(" "),a("el-form-item",{attrs:{label:"资质照片：",prop:"qualification_picture"}},[a("upload",{ref:"upload2",attrs:{imageUrl:t.ruleForm.qualification_picture},on:{uploadSuccess:t.uploadSuccess1}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible1=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("确定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[t._v("合同名称："+t._s(t.lookObj.name))]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("\n        合同类型：\n        "),"1"==t.lookObj.con_type?a("span",[t._v("收运合同")]):t._e(),t._v(" "),"2"==t.lookObj.con_type?a("span",[t._v("运输合同")]):t._e()])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[t._v("签订时间："+t._s(t.lookObj.signed_time))]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("合同有效期："+t._s(t.lookObj.viald_time))])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[t._v("甲方类型：\n        "),"1"==t.lookObj.jia_type?a("span",[t._v("街道")]):t._e(),t._v(" "),"2"==t.lookObj.jia_type?a("span",[t._v("末端厂")]):t._e()]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("乙方："+t._s(t.lookObj.yi||""))])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[t._v("备注："+t._s(t.lookObj.content||""))]),t._v(" "),a("el-col",{attrs:{span:12}})],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[t._v("\n        合同照片：\n        "),t._l(t.hetongList,function(e,i){return a("el-image",{key:i+"-i",staticStyle:{width:"100px",height:"100px"},attrs:{src:e,"preview-src-list":t.hetongList}},[a("div",{staticStyle:{"line-height":"100px"},attrs:{slot:"error"},slot:"error"},[t._v("\n            暂无图片\n          ")])])})],2),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("\n        资质照片：\n        "),t._l(t.zizhiList,function(e){return a("el-image",{key:e,staticStyle:{width:"100px",height:"100px"},attrs:{src:e,"preview-src-list":t.zizhiList}},[a("div",{staticStyle:{"line-height":"100px"},attrs:{slot:"error"},slot:"error"},[t._v("\n            暂无图片\n          ")])])})],2)],1),t._v(" "),"2"==t.activeParams||"3"==t.activeParams?a("div",{staticClass:"recordTable"},[a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:t.recordList,stripe:"",border:"",height:"26vh"}},[a("el-table-column",{attrs:{type:"index",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"username",label:"修改人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"update_data",label:"修改项"}}),t._v(" "),a("el-table-column",{attrs:{prop:"old_content",label:"修改前"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.old_content.indexOf("http")>-1?a("div",{staticStyle:{display:"flex"}},t._l(e.row.old_content.split(","),function(t,i){return a("div",{key:i},[a("el-image",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t,"preview-src-list":e.row.old_content.split(",")}})],1)}),0):a("div",[t._v(t._s(e.row.old_content))])]}}],null,!1,2285074851)}),t._v(" "),a("el-table-column",{attrs:{prop:"new_content",label:"修改后"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.new_content.indexOf("http")>-1?a("div",{staticStyle:{display:"flex"}},t._l(e.row.new_content.split(","),function(t,i){return a("div",{key:i},[a("el-image",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t,"preview-src-list":e.row.new_content.split(",")}})],1)}),0):a("div",[t._v(t._s(e.row.new_content))])]}}],null,!1,1125431811)})],1)],1):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"合同照片 资质照片",visible:t.imgDialogVisible,width:"50%"},on:{"update:visible":function(e){t.imgDialogVisible=e}}},[a("div",{staticClass:"imgTitle"},[t._v("合同照片：")]),t._v(" "),t._l(t.hetongList,function(e,i){return a("el-image",{key:i+"-i",staticStyle:{width:"100px",height:"100px"},attrs:{src:e,"preview-src-list":t.hetongList}},[a("div",{staticStyle:{"line-height":"100px"},attrs:{slot:"error"},slot:"error"},[t._v("\n        暂无图片\n      ")])])}),t._v(" "),a("div",{staticClass:"imgTitle"},[t._v("资质照片：")]),t._v(" "),t._l(t.zizhiList,function(e){return a("el-image",{key:e,staticStyle:{width:"100px",height:"100px"},attrs:{src:e,"preview-src-list":t.zizhiList}},[a("div",{staticStyle:{"line-height":"100px"},attrs:{slot:"error"},slot:"error"},[t._v("\n        暂无图片\n      ")])])}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgDialogVisible=!1}}},[t._v("取 消")])],1)],2),t._v(" "),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{"current-page":t.pageData.page,"page-size":t.pageData.page_size,"page-sizes":[10,20,30,40],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,p,!1,function(t){a("qBne")},"data-v-91e2263e",null);e.default=m.exports},qBne:function(t,e){}});
//# sourceMappingURL=6.fb3ac218344ba417ee99.js.map