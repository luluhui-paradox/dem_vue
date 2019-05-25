<template>
    <div :style="mainDivStyle">
        <div>
            <mt-header title="密码修改" style="width: 21.5rem;opacity: 0.9">
                <mt-button icon="back" @click="cancle">返回</mt-button>
            </mt-header>
        </div>
        <div style="width: 70%;margin-left: auto;margin-right: auto;margin-top: 3rem">
            <p></p>
            <mt-field label="当前密码" placeholder="请输入当前密码" v-model="sourcePassword"></mt-field>
            <p></p>
            <mt-field label="新密码" placeholder="请输入新密码" v-model="newPassword"></mt-field>
            <p></p>
            <mt-field label="确认新密码" placeholder="确认新密码" v-model="confirmPassword"></mt-field>
            <p></p>
            <mt-button size="large" style="opacity: 0.9" type="danger" @click="modify">确认修改</mt-button>
            <p></p>
            <mt-button size="large" style="opacity: 0.9" @click="cancle">取消修改</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "passwordModify",
        methods:{
            modify(){
                let root=this;
                if (this.sourcePassword==localStorage.getItem("password")&&this.newPassword==this.confirmPassword){
                    this.$indicator.open();
                    setTimeout(function () {root.$indicator.close();},2000);
                    this.$http.post('http://dem.luluhui.cf/passwordModify',
                        {sourcePassword:this.sourcePassword,targetPassword:this.newPassword},
                        {emulateJSON:true,headers:{token:localStorage.getItem("token")}})
                        .then(
                            function (res) {
                                root.$indicator.close();
                                if(res.data==true){
                                    root.$messagebox.alert("修改成功，请重新登录")
                                        .then(function () {root.$router.push("/login");})
                                }else{
                                    root.$toast("修改失败");
                                }
                            },
                            function () {
                                root.$toast("修改失败");
                            })
                }else {
                    this.$messagebox.alert("请检查您的输入","操作失败");
                }
            },
            cancle(){this.$router.back();}
        },
        data(){
            return{
                mainDivStyle:{
                    height:'98%',
                    width:'97.5%',
                    backgroundImage: "url(" + require("../assets/background/bg-body.png") + ")",
                    backgroundSize:"98% 98%",
                    backgroundRepeat:'no-repeat',
                    position:'absolute',
                },
                sourcePassword:"",
                newPassword:"",
                confirmPassword:"",
            }
        }
    }
</script>

<style scoped>
    .mint-cell{
        opacity: 0.8;
    }
</style>