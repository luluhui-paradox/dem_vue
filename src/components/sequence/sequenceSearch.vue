<template>
    <div>
        <mt-header title="测序申请查询">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-radio
                    title="测序单状态"
                    v-model="sequenceInfo.status"
                    :options="statusList">
            </mt-radio>
            <mt-field label="测序名称" v-model="sequenceInfo.name" placeholder="请输入测序名称"></mt-field>
            <mt-field label="测序机构名称" v-model="sequenceInfo.companyName" placeholder="请输入测序机构名称"></mt-field>
            <mt-cell title="是否双向测序"><mt-switch v-model="sequenceInfo.isBothWay"></mt-switch> </mt-cell>
            <mt-cell title="是否支付"><mt-switch v-model="sequenceInfo.isCost"></mt-switch> </mt-cell>
            <p>
                <mt-button size="large" type="primary" @click="searchSequence">查询</mt-button>
            </p>
        </div>
        <div>
            <el-table :data="sequenceList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="sequencingRequestFormId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="price" label="价格" width="70px" ></el-table-column>
                <el-table-column prop="requestPeopleName" label="申请人" ></el-table-column>
                <el-table-column prop="scrutinyName" label="审查人"></el-table-column>
                <el-table-column prop="requestDate" label="申请日期"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==0" @click="newSequence">添加引物单</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sequenceSearch",
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
                sequenceInfo:{
                    status:null,
                    name:null,
                    companyName:null,
                    isBothWay:false,
                    isCost:false
                },
                scrutinyMap:[],
                studentMap:[],
                sequenceList:[]
            }
        },
        methods:{
            newSequence(){
                let tt=this;
                this.$messagebox.confirm("确认提交新申请?").then(()=>{
                    tt.$router.push('/sequence/addNewSequence');
                });
            },
            cancle(){this.$router.back()},
            searchSequence(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url=this.teacherStatus==1?"http://dem.luluhui.cf/sequence/selectByConditionTeacher":"http://dem.luluhui.cf/sequence/selectByConditionStudent";
                this.$http.post(url,this.sequenceInfo,{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.sequenceList=res.data;
                        tt.initSequenceList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'sequenceDetail',
                    params:row
                });
            },
            initSequenceList(){
                let tt=this;
                for(let i=0; i<this.sequenceList.length; i++){
                    for(let j=0;j<tt.scrutinyMap.length;j++){
                        if (tt.scrutinyMap[j].value==tt.sequenceList[i].scrutinyPeopleId){
                            tt.sequenceList[i].scrutinyName=tt.scrutinyMap[j].label;
                        }
                        break;
                    }
                    for(let j=0;j<tt.studentMap.length;j++){
                        if (tt.studentMap[j].value==tt.sequenceList[i].requestPeopleId){
                            tt.sequenceList[i].requestPeopleName=tt.studentMap[j].label;
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
            this.$http.get("http://dem.luluhui.cf/user/selectUserIdAndNameByCondition?status=1",
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
            this.$http.get("http://dem.luluhui.cf/user/selectUserIdAndNameByCondition?status=0",
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