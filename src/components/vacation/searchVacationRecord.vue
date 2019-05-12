<template>
    <div>
        <mt-header title="休假申请查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-radio
                    title="休假记录状态"
                    v-model="vacationRecordInfo.status"
                    :options="statusList">
            </mt-radio>
            <mt-field label="姓名" v-if="teacherStatus==1" v-model="vacationRecordInfo.name" placeholder="请输入姓名"></mt-field>
            <mt-field label="年份" v-model="vacationRecordInfo.year" placeholder="请输入年份"></mt-field>
            <p>
                <mt-button size="large" type="primary" @click="searchVacationRecord">查询</mt-button>
            </p>
        </div>
        <div>
            <el-table v-if="teacherStatus==1" :data="vacationRecordList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="name" label="申请人" ></el-table-column>
                <el-table-column prop="request_date" label="申请日期"></el-table-column>
                <el-table-column prop="start_date" label="开始日期"></el-table-column>
                <el-table-column prop="end_date" label="结束日期"></el-table-column>
            </el-table>
            <el-table v-if="teacherStatus==0" :data="vacationRecordList" @row-click="rowClickStudent" style="width: 100%">
                <el-table-column label="申请人">{{username}}</el-table-column>
                <el-table-column prop="requestDate" label="申请日期"></el-table-column>
                <el-table-column prop="startDate" label="开始日期"></el-table-column>
                <el-table-column prop="endDate" label="结束日期"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==0" @click="newVacationRecord">添加新休假申请</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "searchVacationRecord",
        data(){
            let teacherStatus=localStorage.getItem("status");
            let username=localStorage.getItem("name");
            return{
                teacherStatus,
                username,
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
                vacationRecordInfo:{
                    status:null,
                    name:null,
                    year:null,
                },
                vacationRecordList:[]
            }
        },
        methods:{
            newVacationRecord(){
                let tt=this;
                this.$messagebox.confirm("确认提交新申请?").then(()=>{
                    tt.$router.push('/vacation/addVacationRecord');
                });
            },
            searchVacationRecord(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url=this.teacherStatus==1?"http://dem.luluhui.cf/Vacation/vacationRecord/selectVacationRecordTeacher":"http://dem.luluhui.cf/Vacation/vacationRecord/selectVacationRecordByCondition";
                this.$http.post(url,this.vacationRecordInfo,{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.vacationRecordList=res.data;
                        if(tt.teacherStatus==0){
                            //日期格式处理
                            for(let i=0;i<tt.vacationRecordList.length;i++){
                                tt.vacationRecordList[i].requestDate=tt.vacationRecordList[i].requestDate.slice(0,10);
                                tt.vacationRecordList[i].startDate=tt.vacationRecordList[i].startDate.slice(0,10);
                                tt.vacationRecordList[i].endDate=tt.vacationRecordList[i].endDate.slice(0,10);
                            }
                        }
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'vacationRecordDetail',
                    params:row
                });
            },
            rowClickStudent(row){
                let wdnmd={
                    Vacation_record_id:row.vacationRecordId,
                    name:row.name,
                    UserPeople_id:row.userpeopleId,
                    approval_people_id:row.approvalPeopleId,
                    status:row.status,
                    start_date:row.startDate.slice(0,10),
                    end_date:row.endDate.slice(0,10),
                    request_date:row.requestDate.slice(0,10)
                };
                this.$router.push({
                    name:'vacationRecordDetail',
                    params:wdnmd
                });
            }

        },
    }
</script>

<style scoped>

</style>