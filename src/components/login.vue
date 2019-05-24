<template>
    <div>
<!--        <div>-->
<!--            <mt-header title="登录">-->
<!--                <mt-button icon="back" slot="left">返回</mt-button>-->
<!--            </mt-header>-->
<!--        </div>-->
        <div class="header gradient_bg">
            <div class="header_logo">
<!--                <a onclick="window.history.back()" class="header_back"> &lt </a>-->
                <span>林木遗传育种实验室管理系统</span>
            </div>
        </div>
        <div class="loginDiv">
            <mt-field label="手机号" placeholder="请输入手机号" v-model="useraccount"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div style="justify-content: center;align-items: center;align-content: center;">
            <center style="margin-top: 8%"><mt-button type="primary" @click="login" size="large" style="width: 80%;text-align: center;!important" >登录</mt-button></center>
        </div>
        <div class="share">
            <div class="left"></div>
            <div class="text">其他方式登录</div>
            <div class="right"></div>
        </div>
        <div class="share-icon">
            <div class="qq"></div>
            <div class="weixin"></div>
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
    .header {
        //position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 3rem;
        position: relative;
    }
    .header_logo {
        width: 100%;
        height: 3rem;
        color: #fff;
        text-align: center;
        font-size: 1.2rem;
        line-height:3rem
    }
    .gradient_bg{
        background-color: #999;
        background: -moz-linear-gradient(left, #ace, #f96);
        background:-webkit-gradient(linear, 0 0, 0 100%, from(#ace), to(#f96));/*Safari4-5,chrome1-9 */
        background: -webkit-linear-gradient(left, #ace, #f96);
        background: -o-linear-gradient(left, #ace, #f96);
        background: -ms-linear-gradient(left, #ace, #f96);
        background: linear-gradient(left, #ace, #f96);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#999', endColorstr='#000',GradientType=1 );/*兼容IE5~IE9   */
    }
    .loginDiv{
        margin-top: 25%;
    }
    .share {
        margin-top: 2rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .share .left {
        width: 4rem;
        height: 0.1rem;
        background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(rgba(255, 255, 255, 0)), to(rgba(183, 186, 188, 1)));
    }

    .share .text {
        color: #b7babc;
        font-size: 0.1rem;
    }

    .share .right {
        width: 4rem;
        height: 0.1rem;
        background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(rgba(183, 186, 188, 1)), to(rgba(255, 255, 255, 0)));
    }

    footer {
        clear: both;
    }

    .share-icon {
        clear: both;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 2rem;
    }
    .qq {
        width: 2rem;
        height: 2rem;
        background-image: url("../assets/img/default_icon_qq@3x.png");
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .weixin {
        width: 2rem;
        height: 2rem;
        background-image: url("../assets/img/default_icon_wechat@3x.png");
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>