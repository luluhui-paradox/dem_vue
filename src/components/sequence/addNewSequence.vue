<template>
    <div>
        <mt-header title="添加测序申请">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-field label="测序名称" v-model="sequenceInfo.name" placeholder="请输入测序名称"></mt-field>
            <span @click="openPop">
                 <mt-field label="供应商编号"
                           type="number" disabled="true"
                           v-model="sequenceInfo.retailerId" placeholder="请选择供应商">
                 </mt-field>
            </span>
            <mt-field label="测序机构名称" v-model="sequenceInfo.companyName" placeholder="请输入测序机构"></mt-field>
            <mt-field label="价格" type="number" v-model="sequenceInfo.price" placeholder="请输入价格"></mt-field>
            <mt-field label="反应数" type="number" v-model="sequenceInfo.reactionNumber" placeholder="请输入反应数"></mt-field>
            <mt-field label="测序次数" type="number" v-model="sequenceInfo.sequenceTimes" placeholder="请输入测序次数"></mt-field>
            <mt-cell title="是否双向测序"><mt-switch v-model="sequenceInfo.isBothWaySequent"></mt-switch></mt-cell>
            <mt-cell title="是否追加测序"><mt-switch v-model="sequenceInfo.isAppend"></mt-switch></mt-cell>
            <mt-popup v-model="popupValue">
                <mt-radio v-model="sequenceInfo.retailerId" :options="retailerMap"></mt-radio>
            </mt-popup>
        </div>
        <p><mt-button size="large" type="primary" @click="addSequence">添加引物申请</mt-button> </p>
    </div>
</template>

<script>
    export default {
        name: "addNewSequence",
        data(){
            return{
                popupValue:false,
                sequenceInfo:{
                    name:null,
                    reactionNumber:null,
                    sequenceTimes:null,
                    companyName:null,
                    retailerId:null,
                    price:null,
                    isBothWaySequent:false,
                    isAppend:false
                },
                retailerMap:[]
            }
        },
        methods:{
            openPop(){this.popupValue=true},
            addSequence(){this.$messagebox.confirm("确认添加测序申请").then(this.doAddSequence);},
            doAddSequence(){
                let tt=this;
                this.$indicator.open('提交中');
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/sequence/addSequence',this.sequenceInfo,
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