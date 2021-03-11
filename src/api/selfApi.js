import fetch from './fetch'

export default {
  // 登录
  login(data) {
    return fetch.post('/login/', data)
  },
  //工作台审核状态统计
  statisticsData(data) {
    return fetch.get('/qualification/status_all_num/', data)
  },
  //工作台审核状态按时间统计 echarts
  timeData(data) {
    return fetch.get('/qualification/status_num/', data)
  },
  //账号列表
  accountList(data) {
    return fetch.get('/user/list/', data)
  },
  //账号添加
  addAccount(data) {
    return fetch.post('/user/list/', data)
  },
  //账号删除
  delAccount(id) {
    return fetch.delete(`/user/list/${id}/`)
  },
  //角色权限下拉列表
  roleList(data) {
    return fetch.get(`/user/role_list/`, data)
  },
  //账号状态编辑
  accountStatus(id, data) {
    return fetch.patch(`/user/list/${id}/`, data)
  },
  //重置密码
  updataPassword(data) {
    return fetch.post(`/user/update/password/`, data)
  },
  //角色权限列表
  roleData(data) {
    return fetch.get(`/user/role/`, data)
  },
  //角色添加
  adRole(data) {
    return fetch.post(`/user/role/`, data)
  },
  //角色编辑
  upRole(id, data) {
    return fetch.put(`/user/role/${id}/`, data)
  },
  //角色状态编辑
  updataRoleStatus(id, data) {
    return fetch.patch(`/user/role/${id}/`, data)
  },
  //角色权限删除
  deleteRole(id, data) {
    return fetch.delete(`/user/role/${id}/`, data)
  },
  //访问页面列表 menu侧边栏菜单
  visvitPageList(data) {
    return fetch.get('/user/nav_list/', data)
  },

  //区域下街道名称下拉列表
  quList(data) {
    return fetch.get(`/qualification/street_list/`, data)
  },
  //区下末端厂下拉列表
  moduanList(data) {
    return fetch.get(`/qualification/plant_list/`, data)
  },

  //合同列表
  contractList(data) {
    return fetch.get(`/qualification/contract/`, data)
  },
  //所需资质
  certification(data) {
    return fetch.get(`/qualification/zizhi_list/`, data)
  },
  //合同新建
  addContract(data) {
    return fetch.post(`/qualification/contract/`, data)
  },
  //合同编辑
  updataContract(id, data) {
    return fetch.patch(`/qualification/contract/${id}/`, data)
  },
  //合同删除
  deleteContract(id, data) {
    return fetch.delete(`/qualification/contract/${id}/`, data)
  },
  //草稿合同提交
  submitContract(id, data) {
    return fetch.patch(`/qualification/contract/${id}/`, data)
  },
  //合同修改记录
  amendContract(data) {
    return fetch.get(`/qualification/contract_operate/`, data)
  },
  //资质信息
  certificationData(data) {
    return fetch.get(`/qualification/qualif/`, data)
  },
  //资质
  certificationData(data) {
    return fetch.get(`/qualification/qualif/`, data)
  },
  //资质添加
  addCertification(data) {
    return fetch.post(`/qualification/qualif/`, data)
  },
  //资质编辑
  updataCertification(id, data) {
    return fetch.patch(`/qualification/qualif/${id}/`, data)
  },
  //资质删除
  delCertification(id, data) {
    return fetch.delete(`/qualification/qualif/${id}/`, data)
  },
  //资质草稿提交
  submitCertification(id, data) {
    return fetch.patch(`/qualification/qualif/${id}/`, data)
  },
  //资质修改记录
  recordCertification(data) {
    return fetch.get(`/qualification/qualif_operate/`, data)
  },
  //人员导入
  importPerson(data) {
    return fetch.post(`/qualification/contract_push/`, data)
  },
  //人员列表
  personData(data) {
    return fetch.get(`/qualification/worker/`, data)
  },
  //人员添加
  addPerson(data) {
    return fetch.post(`/qualification/worker/`, data)
  },
  //人员编辑
  redactPerson(id, data) {
    return fetch.patch(`/qualification/worker/${id}/`, data)
  },
  //人员删除
  delPerson(id, data) {
    return fetch.delete(`/qualification/worker/${id}/`, data)
  },
  //人员提交
  submitPerson(id, data) {
    return fetch.patch(`/qualification/worker/${id}/`, data)
  },
  //人员修改记录
  recordPerson(data) {
    return fetch.get(`/qualification/worker_operate/`, data)
  },
  //公司添加
  addCompany(data) {
    return fetch.post(`/qualification/company/`, data)
  },
  //公司信息
  detailCompany(data) {
    return fetch.get(`/qualification/company/`, data)
  },
  //个人信息
  userDetail(data) {
    return fetch.get(`/user/user_detail/`, data)
  },
  //公司信息编辑
  updataCompany(id, data) {
    return fetch.put(`/qualification/company/${id}/`, data)
  },
  //公司注销
  delCompany(id, data) {
    return fetch.delete(`/qualification/company/${id}/`, data)
  },
  //服务区域
  serviceData(data) {
    return fetch.get(`/qualification/coding_list/`, data)
  },
  //车辆、人、资质：获取公司绑定服务区域列表
  quCheZizhiData(data) {
    return fetch.get(`/qualification/company_area_list/`, data)
  },
  //车辆信息
  carList(data) {
    return fetch.get(`/qualification/car/`, data)
  },
  //车辆添加
  addCar(data) {
    return fetch.post(`/qualification/car/`, data)
  },
  //车辆提交
  submitCar(id, data) {
    return fetch.patch(`/qualification/car/${id}/`, data)
  },
  //车辆编辑
  updataCar(id, data) {
    return fetch.patch(`/qualification/car/${id}/`, data)
  },
  //车辆删除
  delCar(id, data) {
    return fetch.delete(`/qualification/car/${id}/`, data)
  },
  //车辆修改记录
  amendRecordCar(data) {
    return fetch.get(`/qualification/car_operate/`, data)
  },
  //操作日志
  operationLog(data) {
    return fetch.get(`/qualification/operate_log/`, data)
  },
  //操作人列表
  operatorData(data) {
    return fetch.get(`/qualification/log_user/`, data)
  },

  //导入接口 //车辆
  importCart(data) {
    return fetch.importPost(`/qualification/car_push/`, data)
  },
  //人员
  importStaff(data) {
    return fetch.importPost(`/qualification/worker_push/`, data)
  },
  //资质
  importQualification(data) {
    return fetch.importPost(`/qualification/quali_push/`, data)
  },
  //合同
  importContract(data) {
    return fetch.importPost(`/qualification/contract_push/`, data)
  },
  exportCart(data) {
    return fetch.get(`/qualification/car_excel/`, data)
  },

}
