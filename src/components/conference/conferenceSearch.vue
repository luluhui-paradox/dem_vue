<template>
    <div>
        <mt-header title="组会日程查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-cell title="组会是否完成"><mt-switch v-model="conferenceInfo.status"></mt-switch></mt-cell>
            <mt-field label="主题" v-model="conferenceInfo.subject" placeholder="请输入主题"></mt-field>
            <mt-field label="报告人" v-model="conferenceInfo.recordPeople" placeholder="请输入报告人"></mt-field>
            <p>
                <mt-button size="large" type="primary" @click="searchConference">查询</mt-button>
            </p>
        </div>
        <div>
            <el-table :data="conferenceList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="conferenceId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="subject" label="主题"></el-table-column>
                <el-table-column prop="recordPeople" label="报告人" ></el-table-column>
                <el-table-column prop="conferenceDate" label="日期" ></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==1" @click="newConference">添加组会日程</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "conferenceSearch",
        data(){
            let teacherStatus=localStorage.getItem("status");
            return{
                teacherStatus,
                conferenceInfo:{
                    status:false,
                    recordPeople:null,
                    subject:null
                },
                conferenceList:[]
            }
        },
        methods:{
            newConference(){
                let tt=this;
                this.$messagebox.confirm("确认提交新申请?").then(()=>{
                    tt.$router.push('/conference/addNewConference');
                });
            },
            searchConference(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url="http://dem.luluhui.cf/Conference/selectByCondition";
                this.$http.post(url,this.conferenceInfo,{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.conferenceList=res.data;
                        tt.initConferenceList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'conferenceDetail',
                    params:row
                });
            },
            initConferenceList(){
                let tt=this;
                for(let item=0;item<tt.conferenceList.length;item++){
                    if(tt.conferenceList[item].conferenceDate!=null)
                        tt.conferenceList[item].conferenceDate=tt.conferenceList[item].conferenceDate.slice(0,10);
                }
            }
        },
    }
</script>

<style scoped>

</style>