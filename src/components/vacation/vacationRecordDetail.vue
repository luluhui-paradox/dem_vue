<template>
    <div>
        <mt-header title="测序详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="申请人" v-model="vacationRecordInfo.name"></mt-cell>
        <mt-cell title="申请日期" v-model="vacationRecordInfo.request_date"></mt-cell>
        <mt-cell title="开始日期" v-model="vacationRecordInfo.start_date"></mt-cell>
        <mt-cell title="结束日期" v-model="vacationRecordInfo.end_date"></mt-cell>
        <mt-cell title="审查人" v-model="approvalName"></mt-cell>
        <div v-show="teacherModifing">
            <mt-radio
                    v-show="teacherModifing"
                    title="休假状态"
                    v-model="vacationRecordInfo.status"
                    :options="[{label:'未处理',value:0},{label:'处理中',value:1},{label:'已成功',value:2},{label:'已拒绝',value:3}]">
            </mt-radio>
        </div>
        <p> <mt-button size="large" v-if="studentCanDelete" type="danger" @click="deleteVacationRecord">删除休假申请</mt-button> </p>
        <p> <mt-button size="large" type="danger" v-if="teacherStatus" @click="updateVacationRecord">修改休假申请</mt-button> </p>

    </div>
</template>

<script>
    export default {
        name: "vacationRecordDetail",
        data(){
            let studentCanDelete=localStorage.getItem('status')==0&&this.$route.params.status==0;
            let teacherStatus=localStorage.getItem('status')==1;
            let vacationRecordInfo=this.$route.params;
            return{
                vacationRecordInfo,
                teacherStatus,
                studentCanDelete,
                teacherModifing:false,
                approvalName:null
            }
        },
        methods:{
            deleteVacationRecord(){
                let tt=this;
                this.$messagebox.confirm("确认删除?").then(()=>{tt.doDeleteVacationRecord()});
            },
            doDeleteVacationRecord(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.delete(
                    "http://dem.luluhui.cf/Vacation/vacationRecord/deleteVacationRecordStudent?vacationRecordId="+tt.vacationRecordInfo.Vacation_record_id,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            },
            updateVacationRecord(){
                let tt=this;
                if(this.teacherModifing==false){
                    this.$messagebox.confirm("确认进行修改?").then(()=>{tt.teacherModifing=true});
                }else {
                    this.$messagebox.confirm("确认进行修改?").then(tt.doTeacherModify);
                }
            },
            //教师修改测序单
            doTeacherModify(){
                let tt=this;
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/Vacation/vacationRecord/changeVacationRecord',
                    {
                        vacationRecordId:this.vacationRecordInfo.Vacation_record_id,
                        status:this.vacationRecordInfo.status,
                    },
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){
                            tt.$messagebox.alert("修改成功").then(()=>{tt.$router.back()});
                        } else {
                            tt.$messagebox.alert("修改失败");
                        }
                    },()=>{tt.$messagebox.alert("修改失败");})
            }
        },
        created() {
            let tt=this;
            this.$indicator.open('加载中');
            setTimeout(function () {
                tt.$indicator.close();
            },2000);
            //获取审查人信息
            let urlString='http://dem.luluhui.cf/user/selectUserNameById?userId='+this.$route.params.approval_people_id;
            this.$http.get(urlString,
                {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    tt.approvalName=res.bodyText;
                },function () {
                    this.$toast("我加载了，加载不出来，有什么好说的")
                });
        }
    }
</script>

<style scoped>

</style>