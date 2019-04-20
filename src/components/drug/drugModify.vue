<template>
    <div>
        <mt-header title="药品修改">
            <mt-button slot="left" icon="back">返回</mt-button>
        </mt-header>
        <mt-cell title="药品编号">{{this.$route.params.drugId}}</mt-cell>
        <mt-cell title="药品名称">{{this.$route.params.name}}</mt-cell>
        <mt-field type="number" label="保质期" v-model="drugInfo.duration"></mt-field>
        <span @click="popupShow">
            <mt-field type="number" label="生产商编号" disabled="true" v-model="drugInfo.retailerId"></mt-field>
        </span>
        <mt-field type="text" label="品牌" v-model="drugInfo.brand"></mt-field>
        <mt-field type="text" label="种类" v-model="drugInfo.specifications"></mt-field>
        <mt-field type="text" label="存放地点" v-model="drugInfo.inventoryPlace"></mt-field>
        <mt-field type="text" label="存放地点" v-model="drugInfo.inventoryPlace"></mt-field>
        <mt-field type="number" label="预期价格" v-model="drugInfo.anticipatePrice" readonly="true"></mt-field>
        <mt-field type="number" label="实际价格" v-model="drugInfo.price"></mt-field>
        <p>
            <mt-button size="large" type="danger" @click="drugInfoModify">提交修改信息</mt-button>
        </p>
        <div>
            <mt-popup v-model="popupValue">
                <mt-radio v-model="drugInfo.retailerId" :options="this.retailerMap"></mt-radio>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drugModify",
        methods:{
            popupShow(){
                this.popupValue=true;
            },
            drugInfoModify(){
                let tt=this;
                this.$messagebox.confirm("确认修改药品信息?","提交修改").then(tt.doDrugModify);
            },
            doDrugModify(){
                let tt=this;
                this.$indicator.open("提交信息中");
                setTimeout(()=>{
                    tt.$indicator.close();
                },3000);
                this.$http.post('http://dem.luluhui.cf/drug/updatedrug',this.drugInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        if(res.data==true){
                            tt.$messagebox.alert("修改成功").then(()=>{
                                this.$router.replace("/drug/queryDrug");
                            })
                        }else{
                            tt.$messagebox.alert("修改失败");
                        }
                    },function () {
                        tt.$messagebox.alert("修改失败");
                    })
            }
        },
        data(){
            let retailerMap=new Array();
            return{
                drugInfo:this.$route.params,
                retailerMap,
                popupValue:false
            }
        },
        created(){
            let tt=this;
            this.$indicator.open("数据加载中");
            setTimeout(()=>{
                tt.$indicator.close();
            },2000);
            this.$http.get('http://dem.luluhui.cf/retailer/selectAll',{headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i = 0, len = res.data.length; i < len; i++){
                        let ss={label:"",value:0};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].retailerId;
                        this.retailerMap.push(ss);
                    }
                },function () {
                    tt.$toast("数据加载失败");
                })
        }
    }
</script>

<style scoped>

</style>