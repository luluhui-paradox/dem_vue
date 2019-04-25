<template>
    <div>
        <mt-header title="添加引物申请">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-field label="引物名称" v-model="primerInfo.name" placeholder="请输入引物名称"></mt-field>
            <mt-field label="引物序列" type="textarea" rows="4" v-model="primerInfo.sequence" placeholder="请输入引物序列"></mt-field>
            <span @click="openPop">
                 <mt-field label="供应商编号"
                           type="number" disabled="true"
                           v-model="primerInfo.retailerId" placeholder="请选择供应商">
                 </mt-field>
            </span>
            <mt-field label="价格" type="number" v-model="primerInfo.price" placeholder="请输入引物价格"></mt-field>
            <mt-field label="碱基数" type="number" v-model="primerInfo.basicGroupId" placeholder="请输入碱基数"></mt-field>
            <mt-field label="OD值" type="number" v-model="primerInfo.ODvalue" placeholder="请输入OD值"></mt-field>
            <mt-popup v-model="popupValue">
                <mt-radio v-model="primerInfo.retailerId" :options="retailerMap"></mt-radio>
            </mt-popup>
        </div>
        <p><mt-button size="large" type="primary" @click="addPrimer">添加引物申请</mt-button> </p>
    </div>
</template>

<script>
    export default {
        name: "addNewPrimer",
        data(){
            return{
                popupValue:false,
                primerInfo:{
                    name:null,
                    sequence:null,
                    retailerId:null,
                    price:null,
                    basicGroupId:null,
                    ODvalue:null
                },
                retailerMap:[]
            }
        },
        methods:{
            openPop(){this.popupValue=true},
            addPrimer(){this.$messagebox.confirm("确认添加引物").then(this.doAddPrimer);},
            doAddPrimer(){
                let tt=this;
                this.$indicator.open('提交中');
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/primer/addPrimer',this.primerInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if(res.data==true) tt.$messagebox.alert("数据提交成功").then(()=>{tt.$router.back()});
                        else tt.$messagebox.alert("数据提交失败");
                    },()=>{tt.$messagebox.alert("数据提交失败")});
            }
        },
        created() {
            let tt=this;
            this.$indicator.open('加载中');
            setTimeout(()=>{tt.$indicator.close()},2000)
            //初始化供应商
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