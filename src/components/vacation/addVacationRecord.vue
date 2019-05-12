<template>
    <div>
        <mt-header title="添加休假记录">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field v-model="vacationInfo.startDate" label="开始日期" placeholder="请选择开始日期" type="date"></mt-field>
        <mt-field v-model="vacationInfo.endDate" label="结束日期" placeholder="请选择结束日期" type="date"></mt-field>
        <p><mt-button size="large" type="primary" @click="addNewVacationRecord">提交申请</mt-button></p>
    </div>
</template>
<script>
    export default {
        name: "addVacationRecord",
        data(){
            return{
                vacationInfo:{
                    startDate:null,
                    endDate:null,
                }
            }
        },
        methods:{
            addNewVacationRecord(){
                let tt=this;
                this.$messagebox.confirm("确认添加休假信息?").then(()=>{
                    tt.$indicator.open("提交数据中");
                    setTimeout(()=>{tt.$indicator.close()},2000);
                    this.$http.post(
                        "http://dem.luluhui.cf/Vacation/vacationRecord/addNewVacationRecord",
                        this.vacationInfo,
                        {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
                        .then((res)=>{
                            if(res.data==true) this.$messagebox.alert("添加成功").then(()=>{tt.$router.back()});
                            else this.$messagebox.alert("添加失败,请检查你的时间安排");
                        },()=>{
                            this.$messagebox.alert("添加失败,数据连接出错");
                        })
                })
            }
        }
    }
</script>

<style scoped>

</style>