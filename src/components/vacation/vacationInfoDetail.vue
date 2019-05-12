<template>
    <div>
        <div>
            <mt-header title="休假信息修改">
                <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
            </mt-header>
            <div>
                <mt-cell v-model="vacationInfo.name" label="姓名" ></mt-cell>
                <mt-cell v-model="vacationInfo.year" label="年份" ></mt-cell>
                <mt-cell v-model="vacationInfo.done_days" label="已休日期"></mt-cell>
                <mt-cell v-model="vacationInfo.donot_days" label="未修日期"></mt-cell>
                <mt-field v-model="vacationInfo.total_vacation_days" type="number" label="总休日期" placeholder="请输入总休日期"></mt-field>
                <p><mt-button type="primary" size="large" @click="updateVacationInfo">提交修改</mt-button></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vacationInfoDetail",
        data(){
            let vacationInfo=this.$route.params;
            return{
                vacationInfo
            }
        },
        methods:{
            updateVacationInfo(){
                this.$messagebox.confirm("确认提交修改?").then(()=>{this.doUpdateVacationInfo()});
            },
            doUpdateVacationInfo(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post(
                    "http://dem.luluhui.cf/Vacation/vacationState/updateVacationStatement",
                    {
                        userId:tt.vacationInfo.UserPeople_id,year:tt.vacationInfo.year,totalDays:tt.vacationInfo.total_vacation_days
                    },
                    {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
                    .then((res)=>{
                        if(res.data==true) this.$messagebox.alert("修改成功").then(()=>{tt.$router.back()});
                        else this.$messagebox.alert("修改失败");
                    },()=>{
                        this.$messagebox.alert("修改失败,数据连接出错");
                    })
            }
        }

    }
</script>

<style scoped>

</style>