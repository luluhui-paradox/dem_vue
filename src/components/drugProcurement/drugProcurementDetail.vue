<template>
    <div>
        <mt-header title="药品采购单详情">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-cell title="药品采购单编号">{{drugProcurementInfo.drugProcurementFormId}}</mt-cell>
            <mt-cell title="药品编号">{{drugProcurementInfo.drugId}}</mt-cell>
            <mt-cell title="药品名称">{{drugName}}</mt-cell>
            <mt-cell title="申请数量">{{drugProcurementInfo.number}}</mt-cell>
            <mt-cell title="申请人">{{drugProcurementInfo.requestPeopleName}}</mt-cell>
            <mt-cell title="审查人">{{drugProcurementInfo.scrutinyName}}</mt-cell>
            <mt-cell title="申请日期">{{drugProcurementInfo.requestDate.slice(0,10)}}</mt-cell>
            <mt-cell title="采购人" v-if="!teacherModifing" v-model="drugProcurementInfo.procurementPeople"></mt-cell>
            <mt-cell title="采购日期" v-if="!teacherModifing">{{drugProcurementInfo.procurementDate.slice(0,10)}}</mt-cell>
            <mt-cell title="收货人" v-if="!teacherModifing" v-model="drugProcurementInfo.recievePeople"></mt-cell>
            <mt-cell title="收货日期" v-if="!teacherModifing">{{drugProcurementInfo.receiveDate.slice(0,10)}}</mt-cell>
            <mt-cell title="注释" rows="3" v-model="drugProcurementInfo.comments"></mt-cell>
            <div v-show="teacherModifing">
                <mt-radio
                        v-show="teacherModifing"
                        title="采购单状态"
                        v-model="drugProcurementInfo.status"
                        :options="[{label:'未处理',value:0},{label:'处理中',value:1},{label:'已成功',value:2},{label:'已拒绝',value:3}]">
                </mt-radio>
                <mt-field label="采购人" v-if="teacherModifing" v-model="drugProcurementInfo.procurementPeople"></mt-field>
                <mt-field label="采购日期" type="date" v-if="teacherModifing" v-model="drugProcurementInfo.procurementDate"></mt-field>
                <mt-field label="收货人" v-if="teacherModifing" v-model="drugProcurementInfo.recievePeople"></mt-field>
                <mt-field label="收货日期" type="date" v-if="teacherModifing" v-model="drugProcurementInfo.receiveDate"></mt-field>
            </div>

        </div>
        <mt-button size="large" type="danger" v-if="studentCanDelete" @click="studentDelete">删除采购单</mt-button>
        <mt-button size="large" type="danger" v-if="teacherCanModify" @click="changeTeacherModify">修改采购单</mt-button>
    </div>
</template>

<script>
    export default {
        name: "drugRequestDetail",
        data(){
            let teacherStatus=localStorage.getItem("status")==1;
            let drugProcurementInfo=this.$route.params;
            let studentCanDelete=localStorage.getItem('status')==0&&drugProcurementInfo.status==0;
            return{
                drugName:null,
                teacherStatus,
                teacherModifing:false,
                drugProcurementInfo,
                studentCanDelete,
                teacherCanModify:teacherStatus&&drugProcurementInfo.status<2
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
                    "http://dem.luluhui.cf/drug/deleteDrugProcurementById?drugProcurementId="+tt.drugProcurementInfo.drugProcurementFormId,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            },
            doTeacherModify(){
                let tt=this;
                this.$indicator.open("提交中")
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/drug/proceedDrugProcurement',
                    {
                        drugProcurementFormId:this.drugProcurementInfo.drugProcurementFormId,
                        status:this.drugProcurementInfo.status,
                        procurementPeople:this.drugProcurementInfo.procurementPeople,
                        procurementDate:this.drugProcurementInfo.procurementDate,
                        recievePeople:this.drugProcurementInfo.recievePeople,
                        receieveDate:this.drugProcurementInfo.receiveDate,
                        comments:this.drugProcurementInfo.comments
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
            //日期格式化
            this.drugProcurementInfo.requestDate=this.drugProcurementInfo.requestDate.slice(0,10);
            this.drugProcurementInfo.receiveDate=this.drugProcurementInfo.receiveDate.slice(0,10);
            this.drugProcurementInfo.procurementDate=this.drugProcurementInfo.procurementDate.slice(0,10);
            this.$http.get("http://dem.luluhui.cf/hidden/selectDrugById?drugId="+this.drugProcurementInfo.drugId,
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    tt.drugName=res.data.name;
                },()=>{})
        }
    }
</script>

<style scoped>

</style>