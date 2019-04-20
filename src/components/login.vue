<template>
    <div>
        <div>
            <mt-header title="登录">
                <mt-button icon="back" slot="left">返回</mt-button>
            </mt-header>
        </div>
        <div>
            <mt-field label="手机号" placeholder="请输入手机号" v-model="useraccount"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div>
            <p><mt-button type="primary" @click="login" size="large">登录</mt-button></p>
            <p><mt-button type="danger" @click="wdnmd" size="large">退出当前用户</mt-button></p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "login",
        created(){this.$indicator.close();},
        methods:{
            login(){
                this.$indicator.open("登录中");
                this.$http.post('http://dem.luluhui.cf/login',
                    { useraccount:this.useraccount,
                        password:this.password},
                    {emulateJSON:true})
                    .then(
                        function(res){this.loginSuccess(res)},
                        function (res) {this.wdnmd(res)});
            },
            loginSuccess(response){
                this.$indicator.close();
                window.console.log(response);
                localStorage.setItem("token",response.headers.get('token'));
                //这段是好使的
                for(let item in response.body) {
                    localStorage.setItem(item,response.body[item])
                }
                this.$router.replace('/');
            },
            wdnmd(response){
                this.$indicator.close();
                this.$toast("登录失败,你个闸总");
                window.console.log(response);
            }
        },
        data(){
            return{
                useraccount:null,
                password:null
            }
        }
    }
</script>

<style scoped>

</style>