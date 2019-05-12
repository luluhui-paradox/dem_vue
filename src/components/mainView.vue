<template>
  <div id="mainView">
    <mt-header title="主页" style="background-color:#eaeaea;color: #222222"></mt-header>
    <div>
      <div ref="qiezi">
        <!--主页面-->
        <el-row style="background-image: url('../assets/background/bg_longStrip.jpg')" type="flex" justify="center" >
          <el-col span="4">
            <p><img src="../assets/headshot/qz.jpg" class="round_icon" alt="quit"></p>
          </el-col>
          <el-col span="2"></el-col>
          <el-col span="12">
            <p><b>欢迎您：{{username}}</b></p>
            <p>当前余额：0元   <mt-button type="primary" @click="()=>{this.$router.push('/pay')}" size="small">点击充值</mt-button></p>
          </el-col>
        </el-row>
      </div>
      <mt-tab-container v-model="selectItem">
        <mt-tab-container-item id="mainWebView">
          <mt-cell title="当前药品申请单" to="/drugRequest/drugRequestSearch" is-link>{{listNumber.drugRequestNumber}}份</mt-cell>
          <mt-cell title="当前引物申请" to="/primer/primerSearch" is-link>{{listNumber.primerNumber}}份</mt-cell>
          <mt-cell title="当前测序申请" to="/sequence/sequenceSearch" is-link>{{listNumber.sequenceNumber}}份</mt-cell>
          <mt-cell title="组会日程" to="/conference/conferenceSearch" is-link value="更多"></mt-cell>
          <el-table :data="listNumber.conferenceList">
            <el-table-column prop="subject" label="项目名称"></el-table-column>
            <el-table-column prop="recordPeople" label="报告人"></el-table-column>
            <el-table-column prop="conferenceDate" label="日期"></el-table-column>
          </el-table>
          <mt-cell title="未还书籍" to="/bookLend/bookLendSearch" is-link>{{listNumber.bookNumber}}本</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="functionView">
          <!-- 功能模块 学生端-->
          <div ref="studentFunction" style="text-align: center" v-if="this.status==0">
            <mt-cell title="药品模块">
              <mt-button icon="more" @click="openDrug" ></mt-button>
            </mt-cell>
            <mt-cell title="引物模块">
              <mt-button icon="more" @click="openPrimer" ></mt-button>
            </mt-cell>
            <mt-cell title="测序模块">
              <mt-button icon="more" @click="openSequence" ></mt-button>
            </mt-cell>
            <mt-cell title="组会日程">
              <mt-button icon="more" @click="openConference" ></mt-button>
            </mt-cell>
            <mt-cell title="书籍借阅">
              <mt-button icon="more" @click="openBook"></mt-button>
            </mt-cell>
            <mt-cell title="休假管理">
              <mt-button icon="more" @click="openVacation" ></mt-button>
            </mt-cell>
          </div>
          <!--功能模块，教师端-->
          <div ref="teacherFunction" style="text-align: center" v-if="this.status==1">
            <mt-cell title="药品模块">
              <mt-button icon="more" @click="openDrugTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="引物模块">
              <mt-button icon="more" @click="openPrimerTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="测序模块">
              <mt-button icon="more" @click="openSequenceTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="组会日程">
              <mt-button icon="more" @click="openConferenceTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="书籍管理">
              <mt-button icon="more" @click="openBookTeacher"></mt-button>
            </mt-cell>
            <mt-cell title="休假管理">
              <mt-button icon="more" @click="openVacationTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="设备管理">
              <mt-button icon="more" @click="openDeviceTeacher" ></mt-button>
            </mt-cell>
            <mt-cell title="用户管理">
              <mt-button icon="more" @click="openUserTeacher" ></mt-button>
            </mt-cell>
          </div>
          <div ref="studentListView">
            <mt-popup v-model="studentFunctionList.drugStatus">
              <mt-cell to="/drug/queryDrug" is-link title="药品查询"></mt-cell>
              <mt-cell to="/drug/addNewDrug" is-link title="添加药品"></mt-cell>
              <mt-cell to="/drugRequest/drugRequestSearch" is-link title="药品领用"></mt-cell>
              <mt-cell to="/drugProcurement/drugProcurementSearch" is-link title="药品采购"></mt-cell>
            </mt-popup>
            <mt-popup v-model="studentFunctionList.primerStatus">
              <mt-cell to="/primer/primerSearch" is-link title="引物申请查询"></mt-cell>
              <mt-cell to="/primer/addNewPrimer" is-link title="添加引物申请"></mt-cell>
            </mt-popup>
            <mt-popup v-model="studentFunctionList.sequenceStatus">
              <mt-cell to="/sequence/sequenceSearch" is-link title="测序申请查询"></mt-cell>
              <mt-cell to="/sequence/addNewSequence" is-link title="添加测序申请"></mt-cell>
            </mt-popup>
            <mt-popup v-model="studentFunctionList.conferenceStatus">
              <mt-cell to="/conference/conferenceSearch" is-link title="组会日程查询"></mt-cell>
            </mt-popup>
            <mt-popup v-model="studentFunctionList.bookStatus">
              <mt-cell to="/bookManage/bookSearch" is-link title="书籍查询"></mt-cell>
              <mt-cell to="/bookLend/bookLendSearch" is-link title="借阅记录"></mt-cell>
            </mt-popup>
            <mt-popup v-model="studentFunctionList.vacationStatus">
              <mt-cell to="/vacation/searchVacationInfo" is-link title="休假信息查询"></mt-cell>
              <mt-cell to="/vacation/searchVacationRecord" is-link title="休假记录查询"></mt-cell>
              <mt-cell to="/vacation/addVacationRecord" is-link title="申请新休假"></mt-cell>
            </mt-popup>
          </div>
          <div ref="teacherListView">
            <mt-popup v-model="teacherFunctionList.drugStatus">
              <mt-cell to="/drug/queryDrug" is-link title="药品查询"></mt-cell>
              <mt-cell to="/drug/addNewDrug" is-link title="添加药品"></mt-cell>
              <mt-cell to="/drugRequest/drugRequestSearch" is-link title="药品领用处理"></mt-cell>
              <mt-cell to="/drugProcurement/drugProcurementSearch" is-link title="药品采购处理"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.primerStatus">
              <mt-cell to="/primer/primerSearch" is-link title="引物申请处理"></mt-cell>
              <mt-cell to="/primer/primerSearch" is-link title="引物申请查询"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.sequenceStatus">
              <mt-cell to="/sequence/sequenceSearch" is-link title="测序申请处理"></mt-cell>
              <mt-cell to="/sequence/sequenceSearch" is-link title="测序申请查询"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.conferenceStatus">
              <mt-cell to="/conference/conferenceSearch" is-link title="组会日程查询"></mt-cell>
              <mt-cell to="/conference/conferenceSearch" is-link title="组会日程处理"></mt-cell>
              <mt-cell to="/conference/addNewConference" is-link title="创建新组会"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.bookStatus">
              <mt-cell to="/bookManage/bookSearch" is-link title="书籍查询"></mt-cell>
              <mt-cell to="/bookManage/addNewBook" is-link title="添加新书籍"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.vacationStatus">
              <mt-cell to="/vacation/searchVacationInfo" is-link title="休假信息查询"></mt-cell>
              <mt-cell to="/vacation/searchVacationRecord" is-link title="休假记录查询"></mt-cell>
              <mt-cell to="/vacation/addVacationInfo" is-link title="添加休假信息"></mt-cell>
              <mt-cell to="/vacation/searchVacationRecord" is-link title="休假记录处理"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.deviceStatus">
              <mt-cell to="/device/deviceSearch" is-link title="设备查询"></mt-cell>
              <mt-cell to="/device/addNewDevice" is-link title="添加新设备"></mt-cell>
            </mt-popup>
            <mt-popup v-model="teacherFunctionList.userStatus">
              <mt-cell to="/userManage/addNewUser" is-link title="添加新用户"></mt-cell>
            </mt-popup>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="myInfoView">
          <!-- ‘我的‘界面-->
          <mt-cell title="账户:">{{UserInfo.userAccount}}</mt-cell>
          <mt-cell title="用户名:">{{UserInfo.userName}}</mt-cell>
          <mt-cell title="邮箱:">{{UserInfo.email}}</mt-cell>
          <mt-cell title="手机号:">{{UserInfo.phoneNumber}}</mt-cell>
          <mt-cell title="身份:">{{UserInfo.status}}</mt-cell>
          <mt-cell title="性别:">{{UserInfo.sex}}</mt-cell>
          <p><mt-button size="large" type="primary" @click="passwordModify">修改密码</mt-button></p>
          <p><mt-button size="large" type="danger" @click="wdnmdQuit">退出登录</mt-button></p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div>
      <mt-tabbar fixed="true" v-model="selectItem">
        <mt-tab-item id="mainWebView" style="height: 30px">首页</mt-tab-item>
        <mt-tab-item id="functionView" style="height: 30px" >功能</mt-tab-item>
        <mt-tab-item id="myInfoView" style="height: 30px;text-align: center">我的</mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  methods:{
    //学生端列表控制器
    openDrug(){this.studentFunctionList.drugStatus=true},
    openPrimer(){this.studentFunctionList.primerStatus=true},
    openSequence(){this.studentFunctionList.sequenceStatus=true},
    openConference(){this.studentFunctionList.conferenceStatus=true},
    openBook(){this.studentFunctionList.bookStatus=true},
    openVacation(){this.studentFunctionList.vacationStatus=true},
    //教师端列表控制器
    openDrugTeacher(){this.teacherFunctionList.drugStatus=true},
    openPrimerTeacher(){this.teacherFunctionList.primerStatus=true},
    openSequenceTeacher(){this.teacherFunctionList.sequenceStatus=true},
    openConferenceTeacher(){this.teacherFunctionList.conferenceStatus=true},
    openBookTeacher(){this.teacherFunctionList.bookStatus=true},
    openVacationTeacher(){this.teacherFunctionList.vacationStatus=true},
    openDeviceTeacher(){this.teacherFunctionList.deviceStatus=true},
    openUserTeacher(){this.teacherFunctionList.userStatus=true},
    //按钮点击方法
    passwordModify(){this.$router.push('/passwordModify');},
    wdnmdQuit(){
      let tt=this;
      this.$messagebox.confirm("确定要退出?","退出当前账号").then(()=>{
        localStorage.clear();tt.$router.replace('/login');
      })
    }
  },
  data(){
    return{
      username:localStorage.getItem('name'),
      status:localStorage.getItem('status'),
      selectItem:'mainWebView',
      listNumber:{
        drugRequestNumber:0,
        primerNumber:0,
        sequenceNumber:0,
        conferenceList:[],
        bookNumber:0
      },
      studentFunctionList:{
        drugStatus:false,
        primerStatus:false,
        sequenceStatus:false,
        conferenceStatus:false,
        bookStatus:false,
        vacationStatus:false,
      },
      teacherFunctionList:{
        drugStatus:false,
        primerStatus:false,
        sequenceStatus:false,
        conferenceStatus:false,
        bookStatus:false,
        vacationStatus:false,
        deviceStatus:false,
        userStatus:false
      },
      UserInfo:{
        userAccount:localStorage.getItem("accountNumber"),
        userName:localStorage.getItem("name"),
        email:localStorage.getItem("email"),
        phoneNumber:localStorage.getItem("phoneNumber"),
        status:localStorage.getItem("status")==0?"学生":"教师",
        sex:localStorage.getItem("sex")==0?"男":"女"
      }
    }
  },
  created(){
    let rootDom=this;
    rootDom.$indicator.open('数据加载中');
    if(!localStorage.getItem("token")) {
      this.$toast("您尚未登录，请重新登录");
      window.console.log("没token");
      this.$router.replace('/login');
    }else{
      let curso=false;
      this.$http.post('http://dem.luluhui.cf/drug/selectDrugRequestFormStudent',
              {status:0},
              {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
              .then(function(res){
                this.listNumber.drugRequestNumber=res.data.length;
              }, function () {curso=true});

      this.$http.get('http://dem.luluhui.cf/primer/selectPrimerStudent?status=0',
              {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
              .then(function(res){
                this.listNumber.primerNumber=res.data.length;
              }, function () {curso=true});

      this.$http.get('http://dem.luluhui.cf/sequence/selectByConditionStudent?status=0',
              {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
              .then(function(res){
                this.listNumber.sequenceNumber=res.data.length;
              }, function () {curso=true});

      this.$http.get('http://dem.luluhui.cf/Conference/selectByCondition?status=0',
              {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
              .then(function(res){
                let jsonList=0;let conferList;
                for (let item in res.data){
                  if (jsonList<4){
                    conferList.add(item);
                    jsonList++;
                  }
                }
                this.listNumber.conferenceList=conferList;
              }, function () {curso=true});

      this.$http.get('http://dem.luluhui.cf/bookLend/selectLendBook',
              {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
              .then(function(res){
                this.listNumber.bookNumber=res.data.length;
              }, function () {curso=true});
      if(curso){this.$toast('数据加载失败')}
    }
    setTimeout(function () {
      rootDom.$indicator.close();
    },3000);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .round_icon{
    width: 80px;
    height: 80px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
