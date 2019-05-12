<template>
    <div>
        <mt-header title="添加新设备">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field v-model="deviceInfo.name" label="名称" placeholder="请输入名称"></mt-field>
        <mt-field v-model="deviceInfo.position" label="位置" placeholder="请输入位置"></mt-field>
        <mt-field v-model="deviceInfo.retailerName" label="厂家" placeholder="请输入厂家"></mt-field>
        <mt-field v-model="deviceInfo.phoneNumber" type="number" label="厂家联系方式" placeholder="请输入厂家联系方式"></mt-field>
        <mt-field v-model="deviceInfo.createPeople" label="创建人" placeholder="请输入创建人"></mt-field>
        <mt-field type="textarea" v-model="deviceInfo.comments" label="注释" placeholder="请输入注释"></mt-field>
        <p><mt-button type="danger" size="large" @click="addDevice">添加新设备</mt-button> </p>
    </div>
</template>

<script>
    export default {
        name: "addNewDevice",
        data(){
            return{
                deviceInfo:{
                    name:null,
                    position:null,
                    retailerName:null,
                    phoneNumber:null,
                    createPeople:null,
                    comments:null
                }
            }
        },
        methods:{
            addDevice(){
                let tt=this;
                this.$messagebox.confirm("确认添加设备?").then(()=>{tt.doAddDevice()});
            },
            doAddDevice(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post(
                    "http://dem.luluhui.cf/device/addNewDevice",
                    this.deviceInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("添加设备成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("添加失败,该设备信息重复")}
                    },()=>{tt.$messagebox.alert("添加失败")});
            }
        }
    }
</script>

<style scoped>

</style>