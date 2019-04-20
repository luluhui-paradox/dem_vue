<template>
    <div>
        <mt-header title="添加药品">
            <mt-button slot="left" icon="back">返回</mt-button>
        </mt-header>
        <p>
            <mt-field type="text" label="药品名称" placeholder="请输入药品名称" v-model="drugInfo.name"></mt-field>
            <span @click="popupShow">
            <mt-field type="number" label="生产商编号" placeholder="请选择生产商" disabled="true" v-model="drugInfo.retailerId">
                <router-link to="/retailer/addNewRetailer">找不到生产商?添加厂商</router-link>
            </mt-field>
            </span>
            <mt-field type="text" label="品牌" placeholder="请输入品牌" v-model="drugInfo.brand"></mt-field>
            <mt-field type="text" label="种类" placeholder="请输入种类" v-model="drugInfo.specifications"></mt-field>
            <mt-field type="number" label="保质期" placeholder="请输入保质期" v-model="drugInfo.duration"></mt-field>
            <mt-field type="date" label="生产期" placeholder="请输入生产日期" v-model="drugInfo.producedTime"></mt-field>
            <mt-field type="text" label="存放地点" placeholder="请输入存放地点" v-model="drugInfo.inventoryPlace"></mt-field>
            <mt-field type="number" label="库存警戒线" placeholder="请输入库存警戒线" v-model="drugInfo.inventoryRedline"></mt-field>
            <mt-field type="text" label="使用条件" placeholder="请输入使用条件" v-model="drugInfo.useStatement"></mt-field>
            <mt-field type="text" label="计量单位" placeholder="请输入计量单位" v-model="drugInfo.unit"></mt-field>
            <mt-field type="number" label="预期价格" placeholder="请输入预期价格" v-model="drugInfo.anticipatePrice"></mt-field>
            <mt-cell title="危险药品"><mt-switch :value=drugInfo.isNeedScrutiny></mt-switch> </mt-cell>
            <mt-field type="textarea" label="注释" placeholder="请输入注释" v-model="drugInfo.comments"></mt-field>
        </p>
        <p>
            <mt-button size="large" type="primaty" @click="addDrug">添加药品</mt-button>
        </p>
        <mt-popup v-model="popupValue">
            <mt-radio v-model="drugInfo.retailerId" :options="this.retailerMap"></mt-radio>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        name: "addNewDrug",
        data(){
            return{
                drugInfo:{
                    retailerId:null,
                    duration:null,
                    name:null,
                    brand:null,
                    specifications:null,
                    producedTime:null,
                    useStatement:null,
                    unit:null,
                    inventoryPlace:null,
                    isNeedScrutiny:false,
                    inventoryRedline:null,
                    anticipatePrice:null,
                    comments:null
                },
                retailerMap:[],
                popupValue:false
            }
        },
        methods:{
            popupShow(){
                this.popupValue=true;
            },
            addDrug(){
                let tt=this;
                this.$messagebox.confirm("确认添加药品?").then(tt.doAddDrug);
            },
            doAddDrug(){
                let tt=this;
                this.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/drug/adddrug',this.drugInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        if(res.data.length!=0){
                            tt.$messagebox.alert("添加成功");
                            tt.$router.go(-1);
                        }else {
                            tt.$messagebox.alert("添加失败");
                        }
                    },function () {
                        tt.$messagebox.alert("添加失败");
                    })
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