<template>
    <div>
        <div>
            <mt-header title="密码修改">
                <mt-button icon="back" @click="cancle">返回</mt-button>
            </mt-header>
        </div>
        <div>
            <p></p>
            <mt-field label="当前密码" placeholder="请输入当前密码" v-model="sourcePassword"></mt-field>
            <p></p>
            <mt-field label="新密码" placeholder="请输入新密码" v-model="newPassword"></mt-field>
            <p></p>
            <mt-field label="确认新密码" placeholder="确认新密码" v-model="confirmPassword"></mt-field>
            <p></p>
            <mt-button size="large" type="danger" @click="modify">确认修改</mt-button>
            <p></p>
            <mt-button size="large" @click="cancle">取消修改</mt-button>
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
            cancle(){this.$router.go(-1);}
        },
        data(){
            return{
                sourcePassword:"",
                newPassword:"",
                confirmPassword:"",
            }
        }
    }
</script>

<style scoped>

</style>