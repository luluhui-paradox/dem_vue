<template>
    <div ref="maindiv" :style="mainDivStyle">
        <mt-header title="添加休假信息">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div style="margin-top: 4rem;width: 90%;margin-left: auto;margin-right: auto">
            <mt-field v-model="vacationInfo.userId" type="number" label="学生编号" placeholder="请输入学生编号"></mt-field>
            <mt-field v-model="vacationInfo.year" type="number" label="年份" placeholder="请输入年份"></mt-field>
            <mt-field v-model="vacationInfo.totalDays" type="number" label="总休日期" placeholder="请输入总休日期"></mt-field>
            <p><mt-button size="large" type="primary" @click="addNewVacationInfo">添加休假信息</mt-button></p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "addVacationInfo",
        data(){
            return{
                mainDivStyle:{
                    height:'100%',
                    width:'100%',
                    backgroundImage: "url(" + require("../../assets/background/bg-body.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    position: 'absolute'
                },
                vacationInfo:{
                    totalDays:null,
                    year:null,
                    userId:null
                }
            }
        },
        methods:{
            addNewVacationInfo(){
                let tt=this;
                this.$messagebox.confirm("确认添加休假信息?").then(()=>{
                    tt.$indicator.open("提交数据中");
                    setTimeout(()=>{tt.$indicator.close()},2000);
                    this.$http.post(
                        "http://dem.luluhui.cf/Vacation/vacationState/initVacationStatement",
                        this.vacationInfo,
                        {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
                        .then((res)=>{
                            if(res.data==true) this.$messagebox.alert("添加成功").then(()=>{tt.$router.back()});
                            else this.$messagebox.alert("添加失败,该条目已存在");
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