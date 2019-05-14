<template>
    <div>
        <div ref="headerStrip">
            <mt-header title="药品查询">
                <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
            </mt-header>
            <p></p>
        </div>
        <div ref="queryForm">
            <mt-field label="药品名称" type="text" placeholder="请输入名称" v-model="filedData.name"></mt-field>
            <mt-field label="药品编号" type="number" placeholder="请输入编号" v-model="filedData.number"></mt-field>
            <mt-field label="品牌" type="text" placeholder="请输入品牌" v-model="filedData.brand"></mt-field>
            <mt-field label="最小价格" type="number" placeholder="请输入最小价格" v-model="filedData.priceMin"></mt-field>
            <mt-field label="最大价格" type="number" placeholder="请输入最大价格" v-model="filedData.priceMax"></mt-field>
            <p><mt-button size="large" type="primary" @click="search">查询药品</mt-button></p>
        </div>
        <div ref="drugTable">
            <el-table :data="drugData" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="drugId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="number" label="数量" width="70px" ></el-table-column>
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="inventoryPlace" label="存放地点" ></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drugSearch",
        data(){
            return{
                filedData:{
                    name:null,
                    number:null,
                    brand:null,
                    priceMin:0,
                    priceMax:100
                },
                drugData:[]
            }
        },
        methods:{
            search(){
                let rr=this;
                this.$indicator.open("查询中")
                this.$http.post('http://dem.luluhui.cf/drug/dynamaicSelectDrug',
                    {
                         drugId:this.filedData.number,
                         name:this.filedData.name,
                         brand:this.filedData.brand,
                         price_min:this.filedData.priceMin,
                         price_max:this.filedData.priceMax
                    },{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        rr.drugData=res.data;
                        setTimeout(()=>{rr.$indicator.close();},1000);
                    },function () {
                        setTimeout(()=>{rr.$indicator.close();},1000);
                        rr.$toast("查询失败");
                        rr.drugData=[];
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'drugDetail',
                    params:row,
                });
            }
        }
    }
</script>

<style scoped>

</style>