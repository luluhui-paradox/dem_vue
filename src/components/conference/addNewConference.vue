<template>
    <div>
        <mt-header title="添加新组会">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <p></p>
        <div>
            <mt-field label="主题" v-model="conferenceInfo.subject" placeholder="请输入主题"></mt-field>
            <mt-field label="报告人" v-model="conferenceInfo.recordPeople" placeholder="请输入报告人"></mt-field>
            <mt-field label="组会日期" type="date" v-model="conferenceInfo.conferenceDate" placeholder="请输入组会日期"></mt-field>
            <mt-field label="注释" type="textarea" v-model="conferenceInfo.comments" placeholder="请输入注释"></mt-field>
        </div>
        <p><mt-button size="large" type="primary" @click="addConference">添加组会日程</mt-button></p>

    </div>
</template>

<script>
    export default {
        name: "addNewConference",
        data(){
            return{
                conferenceInfo:{
                    subject:null,
                    recordPeople:null,
                    conferenceDate:null,
                    comments:null
                },
            }
        },
        methods:{
            addConference(){this.$messagebox.confirm("确认添加组会日程").then(this.doAddConference);},
            doAddConference(){
                let tt=this;
                this.$indicator.open('提交中');
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/Conference/addNewConference',this.conferenceInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if(res.data==true) tt.$messagebox.alert("数据提交成功").then(()=>{tt.$router.back()});
                        else tt.$messagebox.alert("数据提交失败");
                    },()=>{tt.$messagebox.alert("数据提交失败")});
            }
        },
    }
</script>

<style scoped>

</style>