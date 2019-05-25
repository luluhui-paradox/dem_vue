<template>
    <div>
        <mt-header title="组会详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="编号" v-model="conferenceInfo.conferenceId"></mt-cell>
        <mt-cell title="报告人" v-model="conferenceInfo.recordPeople"></mt-cell>
        <mt-cell title="审查人" v-model="this.performPeopleName" ></mt-cell>
        <div v-show="!teacherModifing">
            <mt-cell title="主题" v-model="conferenceInfo.subject"></mt-cell>
            <mt-cell title="组会日期" v-model="conferenceInfo.conferenceDate"></mt-cell>
            <mt-cell title="评论" v-model="conferenceInfo.remark"></mt-cell>
            <mt-cell title="注释" v-model="conferenceInfo.comment"></mt-cell>
        </div>
        <div v-show="teacherModifing">
            <mt-field label="组会日期" type="date" v-model="conferenceInfo.conferenceDate" placeholder="请输入组会日期"></mt-field>
            <mt-field label="主题" v-model="conferenceInfo.subject" placeholder="请输入主题"></mt-field>
            <mt-field label="评论" type="textarea" v-model="conferenceInfo.remark" placeholder="请输入评论"></mt-field>
            <mt-field label="注释" type="area" v-model="conferenceInfo.comment" placeholder="请输入注释"></mt-field>
        </div>
        <p> <mt-button size="large" type="primary" v-if="teacherStatus" @click="updateConference">修改组会信息</mt-button> </p>
        <p> <mt-button size="large" v-if="teacherStatus" type="danger" @click="deleteConference">删除组会日程</mt-button> </p>


    </div>
</template>

<script>
    export default {
        name: "conferenceDetail",
        data(){
            let teacherStatus=localStorage.getItem('status')==1;
            let conferenceInfo=this.$route.params;
            return{
                conferenceInfo,
                teacherStatus,
                teacherModifing:false,
                performPeopleName:""
            }
        },
        methods:{
            deleteConference(){
                let tt=this;
                this.$messagebox.confirm("确认删除?").then(()=>{tt.doDeleteConference()});
            },
            doDeleteConference(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.delete(
                    "http://dem.luluhui.cf/Conference/deleteConference?conferenceId="+tt.conferenceInfo.conferenceId,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            },
            updateConference(){
                let tt=this;
                if(this.teacherModifing==false){
                    this.$messagebox.confirm("确认进行修改?").then(()=>{tt.teacherModifing=true});
                }else {
                    this.$messagebox.confirm("确认进行修改?").then(tt.doTeacherModify);
                }
            },
            //教师修改组会
            doTeacherModify(){
                let tt=this;
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/Conference/updateConference',
                    {
                        conferenceId:this.conferenceInfo.conferenceId,
                        conferenceDate:this.conferenceInfo.conferenceDate,
                        subject:this.conferenceInfo.subject,
                        remark:this.conferenceInfo.remark,
                        comments:this.conferenceInfo.comment
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
            setTimeout(()=>{tt.$indicator.close()},2000);
            //审查人信息初始化
            if(this.conferenceInfo.performPeopleId!=null){
                let urlString="http://dem.luluhui.cf/user/selectUserNameById?userId="+this.conferenceInfo.performPeopleId;
                this.$http.get(urlString,
                    {headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.performPeopleName=res.bodyText;
                    },function () {
                        this.$toast("我加载了，加载不出来，有什么好说的")
                    });
            }


        }
    }
</script>

<style scoped>

</style>