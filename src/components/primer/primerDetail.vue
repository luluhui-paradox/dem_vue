<template>
    <div>
        <mt-header title="引物详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="引物编号" v-model="primerInfo.primerId"></mt-cell>
        <mt-cell title="引物名称" v-model="primerInfo.name"></mt-cell>
        <mt-cell title="申请人" v-model="primerInfo.requestPeopleName"></mt-cell>
        <mt-cell title="审查人" v-model="primerInfo.approvalPeopleName"></mt-cell>
        <mt-cell title="生产商" v-model="manufactorDetail.name"></mt-cell>
        <mt-cell title="价格" v-model="primerInfo.price"></mt-cell>
        <mt-field disabled="true" type="textarea" rows="4" label="引物序列" v-model="primerInfo.sequence"></mt-field>
        <mt-cell title="碱基数" v-model="primerInfo.basicGroupNumber"></mt-cell>
        <mt-cell title="OD值" v-model="primerInfo.odValue"></mt-cell>
        <mt-cell title="申请日期" v-model="primerInfo.requestDate"></mt-cell>
        <mt-cell title="批准日期" v-model="primerInfo.approvalDate"></mt-cell>
        <mt-cell title="购买日期" v-if="!teacherModifing" v-model="primerInfo.procurementDate"></mt-cell>
        <mt-cell title="收货日期" v-if="!teacherModifing" v-model="primerInfo.recieveDate"></mt-cell>
        <mt-cell title="使用日期" v-if="!teacherModifing" v-model="primerInfo.useDate"></mt-cell>
        <div v-show="teacherModifing">
            <mt-radio
                    v-show="teacherModifing"
                    title="引物状态"
                    v-model="primerInfo.status"
                    :options="[{label:'未处理',value:0},{label:'处理中',value:1},{label:'已成功',value:2},{label:'已拒绝',value:3}]">
            </mt-radio>
            <mt-field label="购买日期" type="date" v-model="primerInfo.procurementDate" ></mt-field>
            <mt-field label="收货日期" type="date" v-model="primerInfo.recieveDate" ></mt-field>
            <mt-field label="使用日期" type="date" v-model="primerInfo.useDate" ></mt-field>
        </div>
        <p> <mt-button size="large" v-if="studentCanDelete" type="danger" @click="deletePrimer">删除引物单</mt-button> </p>
        <p> <mt-button size="large" type="danger" v-if="teacherStatus" @click="updatePrimer">修改引物单</mt-button> </p>

    </div>
</template>

<script>
    export default {
        name: "primerDetail",
        data(){
            let studentCanDelete=localStorage.getItem('status')==0&&this.$route.params.status==0;
            let teacherStatus=localStorage.getItem('status')==1;
            let primerInfo=this.$route.params;
            return{
                manufactorDetail:null,
                primerInfo,
                teacherStatus,
                studentCanDelete,
                teacherModifing:false,
                dateList:{}
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
                    "http://dem.luluhui.cf/primer/deletePrimer?primerId="+tt.primerInfo.primerId,
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
            //教师修改引物单
            doTeacherModify(){
                let tt=this;
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/primer/updatePrimerTeacher',this.primerInfo,
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
            this.primerInfo.requestDate!=null?this.primerInfo.requestDate=this.primerInfo.requestDate.slice(0,10):null;
            this.primerInfo.approvalDate!=null?this.primerInfo.approvalDate=this.primerInfo.approvalDate.slice(0,10):null;
            this.primerInfo.procurementDate!=null?this.primerInfo.procurementDate=this.primerInfo.procurementDate.slice(0,10):null;
            this.primerInfo.recieveDate!=null?this.primerInfo.recieveDate=this.primerInfo.recieveDate.slice(0,10):null;
            this.primerInfo.useDate!=null?this.primerInfo.useDate=this.primerInfo.useDate.slice(0,10):null;
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