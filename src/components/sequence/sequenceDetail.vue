<template>
    <div>
        <mt-header title="测序详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="测序编号" v-model="sequenceInfo.sequencingRequestFormId"></mt-cell>
        <mt-cell title="测序名称" v-model="sequenceInfo.name"></mt-cell>
        <mt-cell title="申请人" v-model="sequenceInfo.requestPeopleName"></mt-cell>
        <mt-cell title="申请日期" v-model="sequenceInfo.requestDate"></mt-cell>
        <mt-cell title="审查人" v-model="sequenceInfo.scrutinyName"></mt-cell>
        <mt-cell title="测序机构" v-model="sequenceInfo.companyName"></mt-cell>
        <mt-cell title="生产商" v-model="manufactorDetail.name"></mt-cell>
        <mt-cell title="价格" v-model="sequenceInfo.price"></mt-cell>
        <mt-cell title="反应数" v-model="sequenceInfo.reactionNumber"></mt-cell>
        <mt-cell title="测序数" v-model="sequenceInfo.sequentTimes"></mt-cell>
        <mt-cell title="是否双向测序" ><mt-switch disabled="true" v-model="sequenceInfo.isBothwaySequent"></mt-switch></mt-cell>
        <mt-cell title="是否追加测序" ><mt-switch disabled="true" v-model="sequenceInfo.isAppend"></mt-switch></mt-cell>
        <mt-cell title="是否缴费" ><mt-switch disabled="true" v-model="sequenceInfo.isCost"></mt-switch></mt-cell>
        <mt-cell title="失败原因" v-if="sequenceInfo.status==3" v-model="sequenceInfo.failReason"></mt-cell>
        <div v-show="teacherModifing">
            <mt-radio
                    v-show="teacherModifing"
                    title="测序状态"
                    v-model="sequenceInfo.status"
                    :options="[{label:'未处理',value:0},{label:'处理中',value:1},{label:'已成功',value:2},{label:'已拒绝',value:3}]">
            </mt-radio>
            <mt-cell title="是否双向测序" ><mt-switch v-model="sequenceInfo.isBothwaySequent"></mt-switch></mt-cell>
            <mt-cell title="是否缴费" ><mt-switch v-model="sequenceInfo.isCost"></mt-switch></mt-cell>
            <mt-field label="失败原因" v-if="sequenceInfo.status==3" v-model="sequenceInfo.failReason" placeholder="请输入失败原因"></mt-field>
        </div>
        <p> <mt-button size="large" v-if="studentCanDelete" type="danger" @click="deletePrimer">删除引物单</mt-button> </p>
        <p> <mt-button size="large" type="danger" v-if="teacherStatus" @click="updatePrimer">修改引物单</mt-button> </p>

    </div>
</template>

<script>
    export default {
        name: "sequenceDetail",
        data(){
            let studentCanDelete=localStorage.getItem('status')==0&&this.$route.params.status==0;
            let teacherStatus=localStorage.getItem('status')==1;
            let sequenceInfo=this.$route.params;
            return{
                manufactorDetail:null,
                sequenceInfo,
                teacherStatus,
                studentCanDelete,
                teacherModifing:false,
            }
        },
        methods:{
            deletePrimer(){
                let tt=this;
                this.$messagebox.confirm("确认删除?").then(()=>{tt.doDeletePrimer()});
            },
            doDeletePrimer(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.delete(
                    "http://dem.luluhui.cf/sequence/deleteSequence?sequenceId="+tt.sequenceInfo.sequencingRequestFormId,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            },
            updatePrimer(){
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
                this.$http.post('http://dem.luluhui.cf/sequence/updateSequenceFromByTeacher',
                    {
                        sequencingRequestFormId:this.sequenceInfo.sequencingRequestFormId,
                        status:this.sequenceInfo.status,
                        isBothWay:this.sequenceInfo.isBothwaySequent,
                        isCost:this.sequenceInfo.isCost,
                        failReason:this.sequenceInfo.failReason
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
            //日期数据初始化
            this.sequenceInfo.requestDate!=null?this.sequenceInfo.requestDate=this.sequenceInfo.requestDate.slice(0,10):null;
            //获取生产商信息
            let urlString='http://dem.luluhui.cf/retailer/selectById?id='+this.$route.params.retailerId;
            this.$http.get(urlString,
                {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    tt.manufactorDetail=res.data;
                },function () {
                    tt.manufactorDetail={};
                    this.$toast("我加载了，加载不出来，有什么好说的")
                });
        }
    }
</script>

<style scoped>

</style>