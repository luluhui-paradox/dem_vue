<template>
    <div>
        <mt-header title="设备查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field label="设备id" type="number" v-model="deviceIds" placeholder="请输入设备id"></mt-field>
        <p><mt-button size="large" type="primary" @click="searchById">根据id查询</mt-button></p>
        <p><mt-button size="large" type="primary" @click="searchAll">查询所有设备</mt-button></p>
        <el-table :data="deviceList"  @row-click="rowClick" style="width: 100%">
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="position" label="位置"></el-table-column>
            <el-table-column prop="createPeople" label="创建人" ></el-table-column>
            <el-table-column prop="usingPeople" label="使用人"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "deviceSearch",
        data(){
            return{
                teacherStatus:localStorage.getItem("status"),
                deviceList:[],
                deviceIds:null
            }
        },
        methods:{
            searchById(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url="http://dem.luluhui.cf/device/selectById?id="+this.deviceIds;
                this.$http.get(url,{headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.deviceList=res.data;
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            searchAll(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url="http://dem.luluhui.cf/device/selectAll"
                this.$http.get(url,{headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.deviceList=res.data;
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                let tt=this;
                tt.$router.push({
                    name:"deviceDetail",
                    params:row
                })
            }
        }
    }
</script>

<style scoped>

</style>