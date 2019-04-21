<template>
    <div>
        <mt-header title="药品领用单查询">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-radio
                    title="申请单状态"
                    v-model="drugRequestInfo.status"
                    :options="statusList">
            </mt-radio>
            <span @click="chooseScrutiny" v-if="teacherStatus==0">
                <mt-field
                        type="number" label="审查人编号"
                        placeholder="请选择审查人编号"
                        v-model="drugRequestInfo.scrutinyPeopleId"
                        disabled="true">
                </mt-field>
            </span>
            <p>
                <mt-button size="large" type="primary" @click="searchDrugRequest">查询</mt-button>
            </p>
            <mt-popup v-model="popupValue">
                <mt-radio :options="scrutinyMap" v-model="drugRequestInfo.scrutinyPeopleId"></mt-radio>
            </mt-popup>
        </div>
        <div>
            <el-table :data="requestList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="drugRequestFormId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="drugId" label="药品编号" width="70px" ></el-table-column>
                <el-table-column prop="requestPeopleName" label="申请人" ></el-table-column>
                <el-table-column prop="scrutinyName" label="审查人"></el-table-column>
                <el-table-column prop="number" label="数量" ></el-table-column>
                <el-table-column prop="requestDate" label="申请日期"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==0" @click="newRequest">添加药品领用单</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drugRequestSearch",
        data(){
            let teacherStatus=localStorage.getItem("status");
            return{
                teacherStatus,
                popupValue:false,
                statusList:[
                    {
                        label: '未审核',
                        value: '0'
                    },
                    {
                        label: '进行中',
                        value: '1'
                    },
                    {
                        label: '已成功',
                        value: '2'
                    },
                    {
                        label: '已失败',
                        value: '3'
                    }
                ],
                drugRequestInfo:{
                    status:null,
                    scrutinyPeopleId:null,
                    requestDate:null
                },
                scrutinyMap:[],
                studentMap:[],
                requestList:[]
            }
        },
        methods:{
            newRequest(){
                let tt=this;
                this.$messagebox.confirm("确认提交新药品申请?").then(()=>{
                    tt.$router.push('/drugRequest/addNewDrugRequest');
                });
            },
            cancle(){this.$router.back()},
            chooseScrutiny(){this.popupValue=true;},
            searchDrugRequest(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url=this.teacherStatus==1?"http://dem.luluhui.cf/drug/selectDrugRequestFormTeacher":"http://dem.luluhui.cf/drug/selectDrugRequestFormStudent";
                this.$http.post(url,this.drugRequestInfo,{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.requestList=res.data;
                        tt.initRequestList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'drugRequestDetail',
                    params:row
                });
            },
            initRequestList(){
                let tt=this;
                for(let i=0; i<this.requestList.length; i++){
                    for(let j=0;j<tt.scrutinyMap.length;j++){
                        if (tt.scrutinyMap[j].value==tt.requestList[i].scrutinyPeopleId){
                            tt.requestList[i].scrutinyName=tt.scrutinyMap[j].label;
                        }
                        break;
                    }
                    for(let j=0;j<tt.studentMap.length;j++){
                        if (tt.studentMap[j].value==tt.requestList[i].requestPeopleId){
                            tt.requestList[i].requestPeopleName=tt.studentMap[j].label;
                        }
                        break;
                    }
                }
            }
        },
        created() {
            let tt=this;
            this.$indicator.open('加载中');
            setTimeout(()=>{tt.$indicator.close()},2000);
            this.$http.get("http://dem.luluhui.cf//user/selectUserIdAndNameByCondition?status=1",
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i = 0, len = res.data.length; i < len; i++){
                        let ss={label:"",value:0};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].userPeopleId;
                        tt.scrutinyMap.push(ss);
                    }
                },function () {
                    tt.$toast('数据加载失败');
                })
            this.$http.get("http://dem.luluhui.cf//user/selectUserIdAndNameByCondition?status=0",
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i = 0, len = res.data.length; i < len; i++){
                        let ss={label:"",value:0};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].userPeopleId;
                        tt.studentMap.push(ss);
                    }
                },function () {
                    tt.$toast('数据加载失败');
                })
        }
    }
</script>

<style scoped>

</style>