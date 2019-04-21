<template>
    <div>
        <mt-header title="药品领用申请">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <span @click="drugPopup">
                <mt-field type="number" v-model="drugRequestInfo.drugId" disabled="true" label="药品编号"></mt-field>
            </span>
            <mt-field type="number" label="领用数量" placeholder="请输入领用数量" v-model="drugRequestInfo.number"></mt-field>
            <mt-field type="textarea" label="注释" placeholder="请输入注释" v-model="drugRequestInfo.comments"></mt-field>
            <p><mt-button size="large" type="primary" @click="addDrugRequest">提交领用单</mt-button></p>
        </div>
        <div>
            <mt-popup v-model="drugPopupValue">
                <mt-radio v-model="drugRequestInfo.drugId" :options="drugMap"></mt-radio>
            </mt-popup>
        </div>
    </div>

</template>

<script>
    export default {
        name: "addNewDrugRequest",
        data(){
            return{
                drugRequestInfo:{
                    drugId:null,
                    number:null,
                    comments:null
                },
                drugMap:[],
                drugPopupValue:false
            }
        },
        methods:{
            cancle(){this.$router.back()},
            drugPopup(){this.drugPopupValue=true},
            addDrugRequest(){this.$messagebox.confirm("确认提交?").then(this.doAddDrugRequest);},
            doAddDrugRequest(){
                let tt=this;
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post("http://dem.luluhui.cf/drug/requestDrug",
                    this.drugRequestInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        if(res.data==true){
                            tt.$messagebox.alert("领用申请成功")
                                .then(()=>{tt.$router.back()});
                        }else{
                            tt.$messagebox.alert("领用申请提交失败，请检查你的输入");
                        }
                    },function () {
                        tt.$toast("数据提交失败");
                    })
            }
        },
        created() {
            let tt=this;
            this.$indicator.open("加载中");
            setTimeout(()=>{tt.$indicator.close()},2000);
            this.$http.get("http://dem.luluhui.cf/hidden/selectAllDrug",{headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i=0;i<res.data.length;i++){
                        let ss={label:null,value:null};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].drugId;
                        tt.drugMap.push(ss);
                    }
                },function () {
                    tt.$toast("数据加载失败");
                })
        }
    }
</script>

<style scoped>

</style>