<template>
    <div>
        <mt-header title="添加新用户">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field v-model="newUser.name" label="姓名" placeholder="请输入姓名"></mt-field>
        <mt-field type="number" v-model="newUser.accountNumber" label="账户" placeholder="请输入账户"></mt-field>
        <mt-field type="password" v-model="newUser.password" label="密码" placeholder="请输入密码"></mt-field>
        <mt-cell title="是否是教师用户"><mt-switch v-model="isteacher"></mt-switch></mt-cell>
        <mt-cell title="性别(默认为男性)"><mt-switch v-model="isMale"></mt-switch></mt-cell>
        <mt-field type="email" v-model="newUser.email" label="email" placeholder="请输入email"></mt-field>
        <mt-field v-model="newUser.phoneNumber" type="number" label="手机号" placeholder="请输入手机号"></mt-field>
        <p><mt-button type="danger" size="large" @click="addDevice">添加新用户</mt-button> </p>
    </div>
</template>

<script>
    export default {
        name: "addNewUser",
        data(){
            return{
                isteacher:false,
                isMale:false,
                newUser:{
                    status:this.isteacher?1:0,
                    name:null,
                    sex:this.isMale?1:0,
                    email:null,
                    phoneNumber:null,
                    password:null,
                    accountNumber:null
                }
            }
        },
        methods:{
            addDevice(){
                let tt=this;
                this.newUser.status=this.isteacher?1:0;
                this.newUser.sex=this.isMale?1:0;
                this.$messagebox.confirm("确认添加用户?").then(()=>{tt.doAddDevice()});
            },
            doAddDevice(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post(
                    "http://dem.luluhui.cf/signup",this.newUser,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("添加用户成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("添加失败,该用户已存在")}
                    },()=>{tt.$messagebox.alert("添加失败")});
            }

        }
    }
</script>

<style scoped>

</style>