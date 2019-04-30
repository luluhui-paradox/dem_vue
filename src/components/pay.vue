<template>
    <div>
        <mt-header title="余额充值">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-radio title="选择充值平台" v-model="payway" :options="[{label:'支付宝',value:'1'},{label:'微信',value:'2'}]"></mt-radio>
        <mt-radio title="选择充值金额"
                  v-model="money"
                  :options="[{label:'1元',value:'0'},{label:'2元',value:'1'},{label:'5元',value:'2'},{label:'10元',value:'3'}]">
        </mt-radio>
        <p><mt-button size="large" type="primary" @click="showPicture"><b>谢谢老板,老板大气,老板身体健康</b></mt-button></p>
        <img ref="moneyImg" src="" width="100%" v-show="isShow">
    </div>
</template>

<script>
    import ali_1 from "../assets/alipay/ali_1.jpg";
    import ali_2 from "../assets/alipay/ali_2.jpg";
    import ali_5 from "../assets/alipay/ali_5.jpg";
    import ali_10 from "../assets/alipay/ali_10.jpg";
    import we_1 from "../assets/weChatPay/weChat_1.png";
    import we_2 from "../assets/weChatPay/weChat_2.png";
    import we_5 from "../assets/weChatPay/weChat_5.png";
    import we_10 from "../assets/weChatPay/weChat_10.png";
    export default {
        name: "pay",
        data(){
            return{
                payway:1,
                money:1,
                isShow:false,
                aliList:[ali_1,ali_2,ali_5,ali_10],
                weChatList:[we_1,we_2,we_5,we_10]
            }
        },
        methods:{
            showPicture(){
                let payList=this.payway==1?this.aliList:this.weChatList;
                this.$refs.moneyImg.src=payList[this.money];
                this.isShow=true;
            }
        }
    }
</script>

<style scoped>

</style>