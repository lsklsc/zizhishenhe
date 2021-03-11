<template>
  <div class="content">
    <!-- tab -->
    <el-tabs v-model="activeParams" @tab-click="tabClick">
      <el-tab-pane label="草稿" name="0"></el-tab-pane>
      <el-tab-pane label="待处理" name="1"></el-tab-pane>
      <el-tab-pane label="不通过" name="2"></el-tab-pane>
      <el-tab-pane label="已通过" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 检索 -->
    <el-form inline>
      <el-form-item label="车牌号：">
        <el-input
          placeholder="请输入车牌号"
          v-model="searchData.car_num"
        ></el-input>
      </el-form-item>
      <el-form-item label="保存日期" v-if="activeParams == '0'">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="提交日期：" v-if="activeParams == '1'">
        <el-date-picker
          v-model="dates"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="车辆类型：">
        <el-select v-model="searchData.car_type_id" placeholder="全部">
          <el-option
            v-for="item in cheList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="searchClk">搜索</el-button>
      <el-button
        type="primary"
        @click="addClk"
        v-if="activeParams == '0' && (role_type == '1' || role_type == '2')"
        >新建</el-button
      >
      <el-button type="warning" @click="resetClk">重置</el-button>
      <el-button type="primary" @click="exportTable">导出</el-button>
      <el-form-item>
        <dataExport
          ref="export"
          filename="车辆管理"
          :data="tableData"
        ></dataExport>
      </el-form-item>
      <el-form-item v-if="activeParams == '0'">
        <el-upload
          accept=".xls, .xlsx"
          action="string"
          :http-request="httpRequest"
        >
          <el-button type="primary">导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="activeParams == '0'">
        <el-button type="success" @click="importClick">下载导入模板</el-button>
      </el-form-item>
    </el-form>
    <!-- table表格 -->
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      height="60vh"
      style="width: 100%;margin-top:13px;"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="enter_time"
        label="审核时间"
        v-if="activeParams == '2'"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="保存时间"
        v-if="activeParams == '0'"
      ></el-table-column>
      <el-table-column
        prop="submit_time"
        label="提交时间"
        v-if="activeParams == '1'"
      ></el-table-column>
      <el-table-column
        prop="enter_time"
        label="通过时间"
        v-if="activeParams == '3'"
      ></el-table-column>
      <el-table-column prop="car_num" label="车牌号"></el-table-column>
      <el-table-column prop="car_type_name" label="车辆类型"></el-table-column>
      <el-table-column prop="area_name" label="服务区域"></el-table-column>
      <el-table-column prop="jia" label="车身照片">
        <template slot-scope="scope">
          <el-button type="text" @click="lookCart(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="no_reject"
        label="不通过原因"
        v-if="isCause"
      ></el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="
              isButton0 &&
                (role_type == '1' || role_type == '2' || role_type == '3')
            "
            @click="lookClick(scope.row)"
            >查看</el-button
          >
          <el-button
            type="text"
            v-if="isButton1 && (role_type == '1' || role_type == '2')"
            @click="submitClick(scope.row)"
            >提交</el-button
          >
          <el-button
            type="text"
            v-if="isButton2 && (role_type == '1' || role_type == '2')"
            @click="updataClick(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            v-if="isButton3 && role_type == '1'"
            style="color:red;"
            @click="deleteClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建 编辑 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
      width="990px"
      @close="handleClose('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        size="mini"
        class="add-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号：" prop="car_num">
              <el-input v-model="ruleForm.car_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收运类型：" prop="transport_type">
              <el-select
                v-model="ruleForm.transport_type"
                placeholder="请选择收运类型"
              >
                <el-option
                  v-for="item in shouyunList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆类型：" prop="car_type_id">
              <el-select
                v-model="ruleForm.car_type_id"
                placeholder="请选择车辆类型"
              >
                <el-option
                  v-for="item in cheList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆资产编号：" prop="facility_num">
              <el-input v-model="ruleForm.facility_num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆动力类型：" prop="power_type">
              <el-select
                v-model="ruleForm.power_type"
                placeholder="请选择车辆动力类型"
              >
                <el-option
                  v-for="item in dongliList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="燃油类型：" prop="oil_type">
              <el-select
                v-model="ruleForm.oil_type"
                placeholder="请选择燃油类型"
              >
                <el-option
                  v-for="item in ranyouList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="尾气排放标准：" prop="car_emission_grade">
              <el-select
                v-model="ruleForm.car_emission_grade"
                placeholder="请选择尾气排放标准"
              >
                <el-option
                  v-for="item in weiqiList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整车重量：" prop="car_weight">
              <el-input v-model="ruleForm.car_weight" placeholder="kg"
                ><template slot="append">kg</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="核载人数：" prop="carry_person_num">
              <el-input v-model="ruleForm.carry_person_num" placeholder="个"
                ><template slot="append">人</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="核载重量：" prop="carry_weight">
              <el-input v-model="ruleForm.carry_weight" placeholder="kg"
                ><template slot="append">kg</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总质量：" prop="total_weight">
              <el-input v-model="ruleForm.total_weight" placeholder="kg"
                ><template slot="append">kg</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6">
                <el-form-item label="车辆外观尺寸：" prop="car_size_length">
                  <el-input
                    v-model="ruleForm.car_size_length"
                    placeholder="长"
                    style="width:100px"
                    ><template slot="append">米</template></el-input
                  >
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="car_size_width">
                  <el-input
                    v-model="ruleForm.car_size_width"
                    placeholder="宽"
                    style="width:100px"
                    ><template slot="append">米</template></el-input
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生产日期：" prop="new_date">
              <el-date-picker
                v-model="ruleForm.new_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择生产日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指标状况：" prop="facility_status">
              <el-select
                v-model="ruleForm.facility_status"
                placeholder="请选择指标状况"
              >
                <el-option
                  v-for="item in zhibiaoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报废日期：" prop="del_date">
              <el-date-picker
                :picker-options="pickerOptions0"
                v-model="ruleForm.del_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择报废日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记日期：" prop="reg_date">
              <el-date-picker
                :picker-options="pickerOptions0"
                v-model="ruleForm.reg_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择登记日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购置费用：" prop="cost">
              <el-input v-model="ruleForm.cost" placeholder="万元"
                ><template slot="append">万元</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接管日期：" prop="receive_date">
              <el-date-picker
                :picker-options="pickerOptions0"
                v-model="ruleForm.receive_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择接管日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌型号：" prop="brand">
              <el-input v-model="ruleForm.brand"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营年限：" prop="run_year">
              <el-input v-model="ruleForm.run_year" placeholder="年"
                ><template slot="append">年</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定处理厂1：" prop="plant1">
              <el-select
                v-model="ruleForm.plant1"
                placeholder="请选择绑定处理厂1"
              >
                <el-option
                  v-for="item in moduanList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有能力作业：" prop="is_runing">
              <el-select
                v-model="ruleForm.is_runing"
                placeholder="请选择是否有能力作业"
              >
                <el-option
                  v-for="item in zuoyeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定处理厂2：" prop="plant2">
              <el-select
                v-model="ruleForm.plant2"
                placeholder="请选择绑定处理厂2"
              >
                <el-option
                  v-for="item in moduanList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contacts">
              <el-input v-model="ruleForm.contacts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定处理厂3：" prop="plant3">
              <el-select
                v-model="ruleForm.plant3"
                placeholder="请选择绑定处理厂3"
              >
                <el-option
                  v-for="item in moduanList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定处理厂4：" prop="plant4">
              <el-select
                v-model="ruleForm.plant4"
                placeholder="请选择绑定处理厂4"
              >
                <el-option
                  v-for="item in moduanList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营单位：" prop="operate_unit">
              <el-input v-model="ruleForm.operate_unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定处理厂5：" prop="plant5">
              <el-select
                v-model="ruleForm.plant5"
                placeholder="请选择绑定处理厂5"
              >
                <el-option
                  v-for="item in moduanList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理单位：" prop="manage_unit">
              <el-input v-model="ruleForm.manage_unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否安装gps：" prop="is_gps">
              <el-select
                v-model="ruleForm.is_gps"
                placeholder="请选择是否安装gps"
              >
                <el-option
                  v-for="item in gpsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否安装计量称重设备：" prop="is_weight">
              <el-select
                v-model="ruleForm.is_weight"
                placeholder="请选择是否安装计量称重设备"
              >
                <el-option
                  v-for="item in gpsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务区域：" prop="service_area">
              <el-select
                v-model="ruleForm.service_area"
                placeholder="请选择服务区域"
              >
                <el-option
                  v-for="item in serviceList"
                  :key="item.coding"
                  :label="item.name"
                  :value="item.coding"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否涂装：" prop="is_self">
              <el-select
                v-model="ruleForm.is_self"
                placeholder="请选择是否涂装"
              >
                <el-option
                  v-for="item in zuoyeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="公司名称：" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="车辆颜色：" prop="car_color">
              <el-select
                v-model="ruleForm.car_color"
                placeholder="请选择车辆颜色"
              >
                <el-option
                  v-for="(i, idx) in colorList"
                  :key="idx"
                  :label="i.label"
                  :value="i.car_color"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="请上传车身前照片：" prop="picture_before">
          <upload
            :imageUrl="ruleForm.picture_before"
            ref="upload1"
            :uploadLimit="limt"
            @uploadSuccess="uploadSuccess"
          ></upload>
        </el-form-item>
        <el-form-item label="请上传车身左照片：">
          <upload
            :imageUrl="ruleForm.picture_left"
            ref="upload2"
            :uploadLimit="limt"
            @uploadSuccess="uploadSuccess1"
          ></upload>
        </el-form-item>
        <el-form-item label="请上传车身右照片：">
          <upload
            :imageUrl="ruleForm.picture_right"
            ref="upload3"
            :uploadLimit="limt"
            @uploadSuccess="uploadSuccess2"
          ></upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog
      @close="clearCartList"
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="ditail">
        <el-row>
          <el-col :span="12">车牌号：{{ detailObj.car_num }}</el-col>
          <el-col :span="12">车辆颜色：{{ detailObj.car_color }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">车辆类型：{{ detailObj.car_type_name }}</el-col>
          <el-col :span="12">
            收运类型：
            <span v-if="detailObj.transport_type === '1'">收集</span>
            <span v-if="detailObj.transport_type === '2'">直运</span>
            <span v-if="detailObj.transport_type === '3'">转运</span>
            <span v-if="detailObj.transport_type === '4'">清运</span>
            <span v-if="detailObj.transport_type === '5'">直收直运</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >车辆动力类型：{{ detailObj.power_type }}
            <!-- <span v-if="detailObj.power_type == '1'">燃油</span>
            <span v-if="detailObj.power_type == '2'">混动</span>
            <span v-if="detailObj.power_type == '3'">新能源</span> -->
          </el-col>
          <el-col :span="12">车辆资产编号：{{ detailObj.facility_num }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >尾气排放标准：{{ detailObj.car_emission_grade }}</el-col
          >
          <el-col :span="12">燃油类型：{{ detailObj.oil_type }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >核载人数：{{ detailObj.carry_person_num }}人</el-col
          >
          <el-col :span="12">整车重量：{{ detailObj.car_weight }}kg</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">总质量：{{ detailObj.total_weight }}kg</el-col>
          <el-col :span="12">核载重量：{{ detailObj.carry_weight }}kg</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">生产日期：{{ detailObj.new_date }}</el-col>
          <el-col :span="12"
            >车辆外观尺寸：长{{ detailObj.car_size_length }}米 ， 宽{{
              detailObj.car_size_width
            }}米</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">报废日期：{{ detailObj.del_date }}</el-col>
          <el-col :span="12"
            >指标状况：
            <span v-if="detailObj.facility_status == '1'">审核中</span>
            <span v-if="detailObj.facility_status == '2'">审核通过</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">购置费用：{{ detailObj.cost }}万元</el-col>
          <el-col :span="12">登记日期：{{ detailObj.reg_date }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">品牌型号：{{ detailObj.brand }}</el-col>
          <el-col :span="12">接管日期：{{ detailObj.receive_date }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">绑定处理厂1：{{ detailObj.plant1 }}</el-col>
          <el-col :span="12">运营年限：{{ detailObj.run_year }}年</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">绑定处理厂2：{{ detailObj.plant2 }}</el-col>
          <el-col :span="12">
            是否有能力作业：
            <span v-if="detailObj.is_runing == '0'">否</span>
            <span v-if="detailObj.is_runing == '1'">是</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">绑定处理厂3：{{ detailObj.plant3 }}</el-col>
          <el-col :span="12">联系人：{{ detailObj.contacts }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">绑定处理厂4：{{ detailObj.plant4 }}</el-col>
          <el-col :span="12">联系电话：{{ detailObj.phone }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">绑定处理厂5：{{ detailObj.plant5 }}</el-col>
          <el-col :span="12">运营单位：{{ detailObj.operate_unit }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >是否安装gps：
            <span v-if="detailObj.is_gps == '0'">否</span>
            <span v-if="detailObj.is_gps == '1'">是</span>
          </el-col>
          <el-col :span="12">管理单位：{{ detailObj.manage_unit }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">服务区域：{{ detailObj.area_name }}</el-col>
          <el-col :span="12">
            是否安装计量称重设备：
            <span v-if="detailObj.is_weight == '0'">否</span>
            <span v-if="detailObj.is_weight == '1'">是</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            是否安装涂装：
            <span v-if="detailObj.is_self == '0'">否</span>
            <span v-if="detailObj.is_self == '1'">是</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="el">
            车身照片：
            <el-image
              style="width: 100px; height: 100px"
              v-for="(i, index) in cartList"
              :key="index"
              :src="i"
              :preview-src-list="cartList"
            >
              <div slot="error" style="line-height:100px">
                暂无图片
              </div>
            </el-image>
          </el-col>
        </el-row>
      </div>
      <div
        v-if="activeParams == '2' || activeParams == '3'"
        class="recordTable"
      >
        <el-table
          ref="table"
          :data="recordList"
          stripe
          border
          height="26vh"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="create_time" label="时间"></el-table-column>
          <el-table-column prop="username" label="修改人"></el-table-column>
          <el-table-column prop="update_data" label="修改项"></el-table-column>
          <el-table-column prop="old_content" label="修改前">
            <template slot-scope="scope">
              <div
                v-if="scope.row.old_content.indexOf('http') > -1"
                style="display:flex"
              >
                <div
                  v-for="(item, index) in scope.row.old_content.split(',')"
                  :key="index"
                >
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="item"
                    :preview-src-list="scope.row.old_content.split(',')"
                  ></el-image>
                </div>
              </div>
              <div v-else>{{ scope.row.old_content }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="new_content" label="修改后">
            <template slot-scope="scope">
              <div
                v-if="scope.row.new_content.indexOf('http') > -1"
                style="display:flex"
              >
                <div
                  v-for="(item, index) in scope.row.new_content.split(',')"
                  :key="index"
                >
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="item"
                    :preview-src-list="scope.row.new_content.split(',')"
                  ></el-image>
                </div>
              </div>
              <div v-else>{{ scope.row.new_content }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 查看车身照片 -->
    <el-dialog
      @close="clearCartList"
      title="车身照片"
      :visible.sync="cartDialogVisible"
      width="50%"
    >
      <div class="imgs">
        <el-image
          v-for="(i, index) in cartList"
          :key="index"
          style="width: 100px; height: 100px"
          :src="i"
          :preview-src-list="cartList"
        >
          <div slot="error" style="line-height:100px">
            暂无图片
          </div>
        </el-image>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cartDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-size="pageData.page_size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import upload from "@/components/upload";
import selfApi from "@/api/selfApi";
export default {
  components: {
    upload
  },
  data() {
    return {
      role_type: "",
      company_id: "", //公司id
      limt: 1,
      pickerOptions1: {
        disabledDate(time) {
          var todayYear = new Date().getFullYear();
          var todayMonth = new Date().getMonth();
          var todayDay = new Date().getDate();
          var todayTime = new Date(
            todayYear,
            todayMonth,
            todayDay,
            "23",
            "59",
            "59"
          ).getTime(); // 毫秒
          return time.getTime() > todayTime;
        }
      },
      rules: {
        car_color: [
          { required: true, message: "请选择车辆颜色", trigger: "change" }
        ],
        car_num: [{ required: true, message: "请填车牌号", trigger: "blur" }],
        transport_type: [
          { required: true, message: "请选择收运类型", trigger: "change" }
        ],
        car_type_id: [
          { required: true, message: "请选择车辆类型", trigger: "change" }
        ],
        facility_num: [
          { required: true, message: "请选择填写资产编号", trigger: "change" }
        ],
        power_type: [
          { required: true, message: "请选择车辆动力类型", trigger: "change" }
        ],
        oil_type: [
          { required: true, message: "请选择燃油类型", trigger: "change" }
        ],
        car_emission_grade: [
          { required: true, message: "请选择尾气排放标准", trigger: "change" }
        ],
        car_weight: [
          { required: true, message: "请选择填写整车重量", trigger: "blur" }
        ],
        carry_person_num: [
          { required: true, message: "请选择填写核载人数", trigger: "blur" }
        ],
        carry_weight: [
          { required: true, message: "请选择填写核载重量", trigger: "blur" }
        ],
        total_weight: [
          { required: true, message: "请选择填写总质量", trigger: "blur" }
        ],
        car_size_length: [
          { required: true, message: "请选择填写车辆长度", trigger: "blur" }
        ],
        car_size_width: [
          { required: true, message: "请选择填写车辆宽度", trigger: "blur" }
        ],
        new_date: [
          { required: true, message: "请选择生产日期", trigger: "blur" }
        ],
        facility_status: [
          { required: true, message: "请选择指标状况", trigger: "change" }
        ],
        del_date: [
          { required: true, message: "请选择报废日期", trigger: "blur" }
        ],
        reg_date: [
          { required: true, message: "请选择登记日期", trigger: "blur" }
        ],
        cost: [
          { required: true, message: "请选择填写购置费用", trigger: "blur" }
        ],
        receive_date: [
          { required: true, message: "请选择接管日期", trigger: "blur" }
        ],
        brand: [
          { required: true, message: "请选择填品牌型号", trigger: "blur" }
        ],
        run_year: [
          { required: true, message: "请选择填写运营年限", trigger: "blur" }
        ],
        plant1: [
          { required: true, message: "请选择绑定处理厂1", trigger: "change" }
        ],
        is_runing: [
          { required: true, message: "请选择是否有能力作业", trigger: "change" }
        ],
        // plant2: [
        //   { required: true, message: "请选择绑定处理厂2", trigger: "change" }
        // ],
        contacts: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        // plant3: [
        //   { required: true, message: "请选择绑定处理厂3", trigger: "change" }
        // ],
        phone: [
          { required: true, message: "手机号不能为空" },
          {
            type: "number",
            message: "手机号格式不正确",
            trigger: "blur",
            transform(value) {
              var phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
              if (!phonereg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ],
        // plant4: [
        //   { required: true, message: "请选择绑定处理厂4", trigger: "change" }
        // ],
        operate_unit: [
          { required: true, message: "请填写运营单位", trigger: "blur" }
        ],
        // plant5: [
        //   { required: true, message: "请选择绑定处理厂5", trigger: "change" }
        // ],
        manage_unit: [
          { required: true, message: "请填写管理单位", trigger: "blur" }
        ],
        is_gps: [
          { required: true, message: "请选择是否安装gps", trigger: "change" }
        ],
        is_weight: [
          {
            required: true,
            message: "请选择是否安装计量称重设备",
            trigger: "change"
          }
        ],
        service_area: [
          { required: true, message: "请选择服务区域", trigger: "change" }
        ],
        is_self: [
          { required: true, message: "请选择是否涂装", trigger: "change" }
        ]
        // picture_before: [
        //   { required: true, message: "请选上传车身前照", trigger: "blur" }
        // ]
      },
      //车辆颜色
      colorList: [
        {
          car_color: "红",
          label: "红"
        },
        {
          car_color: "黄",
          label: "黄"
        },
        {
          car_color: "蓝",
          label: "蓝"
        },
        {
          car_color: "绿",
          label: "绿"
        },
        {
          car_color: "白",
          label: "白"
        },
        {
          car_color: "橙",
          label: "橙"
        }
      ],
      //收运类型
      shouyunList: [
        {
          value: "1",
          label: "收集 "
        },
        {
          value: "2",
          label: "直运"
        },
        {
          value: "3",
          label: "转运"
        },
        {
          value: "4",
          label: "清运"
        },
        {
          value: "5",
          label: "直收直运"
        }
      ],
      //车辆类型
      cheList: [
        {
          value: "54ca8f16bff811eaa8a9000c29d3cc31",
          label: "密闭式压缩车 "
        },
        {
          value: "a80ae89cc0de11eaa8a9000c29d3cc31",
          label: "厨余垃圾车"
        },
        {
          value: "a826fa5ac0de11eaa8a9000c29d3cc31",
          label: "其他垃圾车"
        },
        {
          value: "a838398cc0de11eaa8a9000c29d3cc31",
          label: "转运车"
        },
        {
          value: "a84386fcc0de11eaa8a9000c29d3cc31",
          label: "粪便运输车"
        },
        {
          value: "a84c546cc0de11eaa8a9000c29d3cc31",
          label: "水罐车"
        },
        {
          value: "bebab964ca3411eab56c485f99c1b734",
          label: "单臂吊车"
        },
        {
          value: "01738800ca3511eaafc6485f99c1b734",
          label: "餐厨垃圾车"
        }
      ],
      //车辆动力类型
      dongliList: [
        {
          value: "1",
          label: "燃油"
        },
        {
          value: "2",
          label: "混动"
        },
        {
          value: "3",
          label: "新能源"
        }
      ],
      //燃油类型
      ranyouList: [
        {
          value: "1",
          label: "汽油"
        },
        {
          value: "2",
          label: "柴油"
        }
        // {
        //   value: "3",
        //   label: "新能源"
        // },
      ],
      //尾气排放标准
      weiqiList: [
        {
          value: "1",
          label: "国I"
        },
        {
          value: "2",
          label: "国II"
        },
        {
          value: "3",
          label: "国III"
        },
        {
          value: "4",
          label: "国IV"
        },
        {
          value: "5",
          label: "国V"
        },
        {
          value: "6",
          label: "国Vl"
        }
      ],
      //指标状况
      zhibiaoList: [
        {
          value: "1",
          label: "审核中"
        },
        {
          value: "2",
          label: "审核通过"
        }
      ],
      //是否安装gps 是否按照称重计量设备
      gpsList: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      //是否又能力作业 是否涂装
      zuoyeList: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      //服务区域列表
      serviceList: [],
      cartList: [], //车身照片
      dialogVisible: false,
      dialogTitle: "",
      dialogVisible1: false,
      cartDialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(
              new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            )
          );
        }
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //禁用以前的日期，今天不禁用
          // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },
      ruleForm: {},
      tableData: [],
      moduanList: [], //末端厂列表
      searchData: {
        car_num: "",
        service_area: "",
        car_type_id: ""
      },
      date1: [],
      dates: [],
      pageData: {
        page: 1,
        page_size: 10
      },
      total: 0,
      activeParams: "0",
      isYi: true,
      isCause: false,
      isButton0: true,
      isButton1: true,
      isButton2: true,
      isButton3: true,
      detailObj: {},
      cartList: [],
      recordList: [], //修改记录
      oldruleForm: {}
    };
  },
  methods: {
    //导入
    httpRequest(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("company_id", this.company_id);
      selfApi.importCart(formData).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.carData();
        } else if (res.data.code == 208) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //导出
    exportTable() {
      this.$confirm("本次共导出" + this.total + "条数据是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let para = {
            company_id: this.company_id,
            page: 1,
            size: this.total,
            start_create_time: this.date1[0],
            end_create_time: this.date1[1],
            start_submit_time: this.dates[0],
            end_submit_time: this.dates[1],
            ...this.searchData,
            status: this.activeParams
          };
          let api = "carList";
          let data = {
            data: para,
            api,
            total: this.total
          };
          this.$refs["export"].exportlist(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    //导入模板下载
    importClick() {
      const url =
        "http://filemanager.ztbory.com/v1/file/filedownload/?bucket=qualification&path=20210302&filename=583929c4595544d080cb88980b8b74c9.xlsx";
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "车辆模板");
      document.body.appendChild(link);
      link.click();
    },
    //车身前照
    uploadSuccess(arr) {
      this.ruleForm.picture_before = arr.join(",");
    },
    //车身左照
    uploadSuccess1(arr) {
      this.ruleForm.picture_left = arr.join(",");
    },
    //车身右照
    uploadSuccess2(arr) {
      this.ruleForm.picture_right = arr.join(",");
    },
    //车身照片查看
    lookCart(row) {
      console.log(row);
      this.cartDialogVisible = true;
      this.cartList = [
        ...(row.picture_before || "").split(","),
        ...(row.picture_left || "").split(","),
        ...(row.picture_right || "").split(",")
      ];
    },
    //监听弹框关闭清除车身照片数组
    clearCartList() {
      this.cartList = [];
    },
    tabClick(e) {
      if (e.name === "0") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = true;
        this.isButton2 = true;
        this.isButton3 = true;
        this.carData();
      }
      if (e.name === "1") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = false;
        this.isButton3 = false;
        this.carData();
      }
      if (e.name === "2") {
        this.isYi = false;
        this.isCause = true;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.carData();
      }
      if (e.name === "3") {
        this.isYi = true;
        this.isCause = false;
        this.isButton0 = true;
        this.isButton1 = false;
        this.isButton2 = true;
        this.isButton3 = true;
        this.carData();
      }
    },
    //提交
    submitClick(row) {
      console.log(row);
      if (!row.picture_before) {
        this.$message.warning("请完善车辆信息");
        return;
      }
      this.$confirm("确认提交, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            status: 1,
            car_id: row.car_id,
            company_id: this.company_id
          };
          selfApi.submitCar(row.id, data).then(res => {
            this.$message.success("提交成功!");
            this.carData();
          });
        })
        .catch(() => {
          this.$message.info("已取消提交");
        });
    },
    //新增 编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.ruleForm.picture_before) {
          this.$message.warning("请上传车身前照片");
          return;
        }
        if (!this.ruleForm.picture_left) {
          this.$message.warning("请上传车身左照片");
          return;
        }
        if (!this.ruleForm.picture_right) {
          this.$message.warning("请上传车身右照片");
          return;
        }
        if (valid) {
          if (this.ruleForm.id) {
            let objData = {
              status: this.ruleForm.status,
              car_id: this.ruleForm.car_id
            };
            for (let item in this.ruleForm) {
              for (let obj in this.oldruleForm) {
                if (
                  item == obj &&
                  this.ruleForm[item] != this.oldruleForm[obj]
                ) {
                  console.log(item);
                  objData[item] = this.ruleForm[item];
                }
              }
            }
            console.log(objData);
            selfApi.updataCar(this.ruleForm.id, objData).then(res => {
              console.log(res);
              if (res.data.code == 0) {
                this.$message.success("编辑成功!");
                this.carData();
                this.dialogVisible1 = false;
              } else {
                this.$message.warning(res.data.msg);
              }
            });
          } else {
            selfApi.addCar(this.ruleForm).then(res => {
              if (res.data.code == 0) {
                this.$message.success("新增成功!");
                this.dialogVisible1 = false;
                this.carData();
              } else {
                this.$message.warning(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(ruleForm) {
      this.$refs["ruleForm"].resetFields();
      this.$refs.upload1.clearFiles();
      this.$refs.upload2.clearFiles();
      this.$refs.upload3.clearFiles();
      this.ruleForm = {};
      this.ruleForm.company_id = this.company_id;
    },
    //新建打开弹窗
    addClk() {
      this.dialogTitle = "新建";
      this.dialogVisible1 = true;
    },
    //编辑打开弹窗
    updataClick(row) {
      console.log(row);
      this.dialogTitle = "修改";
      this.dialogVisible1 = true;
      this.oldruleForm = { ...row };
      this.ruleForm = { ...row };
    },
    //删除
    deleteClick(row) {
      let data = {
        status: row.status,
        car_id: row.car_id
      };
      console.log(row);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selfApi.delCar(row.id, data).then(res => {
            this.$message.success("删除成功!");
            this.carData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //查看
    lookClick(row) {
      console.log(row);
      this.dialogVisible = true;
      this.detailObj = row;
      this.cartList = [
        ...(row.picture_before || "").split(","),
        ...(row.picture_left || "").split(","),
        ...(row.picture_right || "").split(",")
      ];
      //修改记录
      let data = {
        status: row.status,
        car_id: row.car_id
      };
      selfApi.amendRecordCar(data).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.recordList = res.data.data;
        }
      });
    },
    //监听弹框关闭清除车身照片数组
    clearCartList() {
      this.cartList = [];
    },
    //分页
    handleSizeChange(val) {
      this.pageData.page_size = val;
      this.carData();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.carData();
    },
    //搜索
    searchClk() {
      this.pageData.page = 1;
      this.carData();
    },
    //重置
    resetClk() {
      this.pageData.page = 1;
      this.pageData.page_size = 10;
      // this.activeParams = "0";
      this.date1 = [];
      this.dates = [];
      this.searchData = {};
      this.status = "";
      this.carData();
    },
    carData() {
      let params = {
        company_id: this.company_id,
        page: this.pageData.page,
        size: this.pageData.page_size,
        start_create_time: this.date1[0],
        end_create_time: this.date1[1],
        start_submit_time: this.dates[0],
        end_submit_time: this.dates[1],
        ...this.searchData,
        status: this.activeParams
      };
      selfApi.carList(params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data.results;
          this.total = res.data.data.data.count;
        }
      });
    },
    //获取末端厂
    muduanData() {
      let data = {
        company_id: JSON.parse(localStorage.getItem("userInfo")).company_id
      };
      selfApi.moduanList(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.moduanList = res.data.data.data;
        }
      });
    },
    //获取服务区域
    serviceData() {
      let data = {
        company_id: this.company_id
      };
      selfApi.quCheZizhiData(data).then(res => {
        if (res.data.code == 0) {
          console.log(res);
          this.serviceList = res.data.data.data;
        }
      });
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    let user = JSON.parse(userInfo);
    this.company_id = user.company_id;
    this.ruleForm.company_id = user.company_id;
    this.role_type = user.role_type;
    this.muduanData();
    this.serviceData();
    this.carData();
  }
};
</script>

<style scoped>
.content >>> .el-upload.el-upload--text {
  border: 1px dashed #ccc;
}
.content >>> .el-upload-list__item-name {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-col {
  font-size: 12px;
  display: flex;
  align-items: center;
}
.imgs >>> .el-image {
  margin: 20px;
}
.ditail >>> .el-row {
  line-height: 30px;
}
.el-row >>> .el-col {
  font-size: 16px;
}
.el {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.el >>> .el-image {
  margin: 10px;
}

.add-ruleForm >>> .el-input {
  width: 220px;
}
.add-ruleForm >>> .el-input-group__append {
  padding: 0 8px;
}
</style>
