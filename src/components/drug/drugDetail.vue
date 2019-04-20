<template>
    <div>
        <mt-header title="药品详情">
            <mt-button slot="left" icon="back">返回</mt-button>
        </mt-header>
        <p></p>
        <div>
            <mt-cell title="编号">{{this.$route.params.drugId}}</mt-cell>
            <mt-cell title="名称">{{this.$route.params.name}}</mt-cell>
            <mt-cell title="数量">{{this.$route.params.number}}</mt-cell>
            <mt-cell title="预期价格">{{this.$route.params.anticipatePrice}}元</mt-cell>
            <mt-cell title="实际价格">{{this.$route.params.price}}元</mt-cell>
            <mt-cell title="品牌">{{this.$route.params.brand}}</mt-cell>
            <span ref="retailerCell">
                <mt-cell title="经销商">{{this.manufactorDetail.name}}</mt-cell>
            </span>
            <mt-cell title="种类">{{this.$route.params.specifications}}</mt-cell>
            <mt-cell title="生产日期">{{this.$route.params.producedTime}}</mt-cell>
            <mt-cell title="保质期">{{this.$route.params.duration}}天</mt-cell>
            <mt-cell title="使用条件">{{this.$route.params.useStatement}}</mt-cell>
            <mt-cell title="计量单位">{{this.$route.params.unit}}</mt-cell>
            <mt-cell title="存放地点">{{this.$route.params.inventoryPlace}}</mt-cell>
            <mt-cell title="库存警戒线">{{this.$route.params.inventoryRedline}}</mt-cell>
            <mt-cell title="危险药品"><mt-switch :value=this.$route.params.isNeedScrutiny disabled="true" ></mt-switch> </mt-cell>
            <p>
                <mt-button
                        size="large"
                        type="danger"
                        v-if="isTeacher"
                        @click="passwordModify">
                    修改药品信息
                </mt-button>
            </p>
        </div>
        <div>
            <mt-popup v-model="popupValue">
                <mt-cell title="编号">{{this.manufactorDetail.retailerId}}</mt-cell>
                <mt-cell title="名称">{{this.manufactorDetail.name}}</mt-cell>
                <mt-cell title="地址">{{this.manufactorDetail.address}}</mt-cell>
                <mt-cell title="联系人">{{this.manufactorDetail.contactName}}</mt-cell>
                <mt-cell title="电话">{{this.manufactorDetail.phoneNumber}}</mt-cell>
                <mt-cell title="传真">{{this.manufactorDetail.fax}}</mt-cell>
                <mt-cell title="email">{{this.manufactorDetail.email}}</mt-cell>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drugDetail",
        methods:{
            passwordModify(){
                let tt=this;
                let drugInfo=this.$route.params;
                if (localStorage.getItem("status")==1){
                    this.$messagebox.confirm("确定要修改?","您可想好了")
                        .then(function () {
                            tt.$router.push({
                                name:"drugModify",
                                params:drugInfo
                            })
                        })
                } else {
                    this.$messagebox.alert("没权限改个蛋//滑稽");
                }
            }
        },
        data(){
            return{
                manufactorDetail:{},
                popupValue:false,
                isTeacher:false
            }
        },
        created() {
            let tt=this;
            this.isTeacher=localStorage.getItem('status')==1
            this.$indicator.open('加载中');
            setTimeout(function () {
                tt.$indicator.close();
            },2000);
            let urlString='http://dem.luluhui.cf/retailer/selectById?id='+this.$route.params.retailerId;
            this.$http.get(urlString,
                {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    tt.manufactorDetail=res.data;
                    tt.$refs.retailerCell.addEventListener("click",()=>{tt.popupValue=true},false);
                },function () {
                    tt.manufactorDetail={};
                    this.$toast("我加载了，加载不出来，有什么好说的")
                })

        }
    }

</script>

<style scoped>

</style>