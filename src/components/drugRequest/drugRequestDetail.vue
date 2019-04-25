<template>
    <div>
        <mt-header title="药品领用单详情">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-cell title="药品领用单编号">{{drugRequestInfo.drugRequestFormId}}</mt-cell>
            <mt-cell title="药品编号">{{drugRequestInfo.drugId}}</mt-cell>
            <mt-cell title="药品名称">{{drugName}}</mt-cell>
            <mt-cell title="申请数量">{{drugRequestInfo.number}}</mt-cell>
            <mt-cell title="申请人">{{drugRequestInfo.requestPeopleName}}</mt-cell>
            <mt-cell title="审查人">{{drugRequestInfo.scrutinyName}}</mt-cell>
            <mt-cell title="申请日期">{{drugRequestInfo.requestDate}}</mt-cell>
            <mt-field label="收货日期" type="date" v-model="drugRequestInfo.receiveDate"></mt-field>
            <mt-field label="出库人" v-if="teacherModifing" v-model="drugRequestInfo.outInventoryPeople"></mt-field>
            <mt-field label="注释" type="textarea" rows="3" v-model="drugRequestInfo.comments"></mt-field>
            <mt-radio
                    v-show="teacherModifing"
                    title="领用单状态"
                    v-model="drugRequestInfo.status"
                    :options="[{label:'未处理',value:0},{label:'处理中',value:1},{label:'已成功',value:2},{label:'已拒绝',value:3}]">
            </mt-radio>
        </div>
        <mt-button size="large" type="danger" v-if="studentCanDelete" @click="studentDelete">删除领用单</mt-button>
        <mt-button size="large" type="danger" v-if="teacherCanModify" @click="changeTeacherModify">修改领用单</mt-button>
    </div>
</template>

<script>
    export default {
        name: "drugRequestDetail",
        data(){
            let teacherStatus=localStorage.getItem("status")==1;
            let drugRequestInfo=this.$route.params;
            let studentCanDelete=localStorage.getItem('status')==0&&drugRequestInfo.status==0;
            return{
                drugName:null,
                teacherStatus,
                teacherModifing:false,
                drugRequestInfo,
                studentCanDelete,
                teacherCanModify:teacherStatus&&drugRequestInfo.status<2
            }
        },
        methods:{
            cancle(){this.$router.back();},
            changeTeacherModify(){
                let tt=this;
                if(this.teacherModifing==false){
                    this.$messagebox.confirm("确认进行修改?").then(()=>{tt.teacherModifing=true});
                }else {
                    this.$messagebox.confirm("确认进行修改?").then(tt.doTeacherModify);
                }
            },
            studentDelete(){
                let tt=this;
                this.$messagebox.confirm("确认删除?").then(()=>{tt.doStudentDelete()});
            },
            doStudentDelete(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.delete(
                    "http://dem.luluhui.cf/drug/deleteDrugRequestById?drugRequestId="+tt.drugRequestInfo.drugRequestFormId,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            },
            doTeacherModify(){
                let tt=this;
                //日期初始化
                this.drugRequestInfo.requestDate=this.drugRequestInfo.requestDate.slice(0,10);
                this.drugRequestInfo.receiveDate=this.drugRequestInfo.receiveDate.slice(0,10);
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/drug/proceedDrugRequest',
                    {
                        drugRequestFormId:this.drugRequestInfo.drugRequestFormId,
                        status:this.drugRequestInfo.status,
                        outPeople:this.drugRequestInfo.outInventoryPeople,
                        receiveDate:this.drugRequestInfo.receiveDate,
                        comments:this.drugRequestInfo.comments
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
        },created() {
            let tt=this;
            this.$http.get("http://dem.luluhui.cf/hidden/selectDrugById?drugId="+this.drugRequestInfo.drugId,
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    tt.drugName=res.data.name;
                },()=>{})
        }
    }
</script>

<style scoped>

</style>