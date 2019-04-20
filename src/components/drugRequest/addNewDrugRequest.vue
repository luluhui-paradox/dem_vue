<template>
    <div>
        <mt-header title="药品领用申请">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-field v-model="drugRequestInfo.drugId" label="药品编号"></mt-field>
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
                drugMap:[]
            }
        },
        methods:{
            cancle(){this.$router.back()}
        },
        created() {
            let tt=this;
            this.$indicator.open("加载中");
            setTimeout(()=>{tt.$indicator.close()},2000);
            this.$http.get("http://dem.luluhui.cf/hidden/selectAllDrug",{headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i=0;i<res.data.length;i++){
                        let ss={lable:null,value:null};
                        ss.lable=res.data[i].name;
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