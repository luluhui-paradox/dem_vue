<template>
    <div>
        <mt-header title="设备信息修改">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field v-model="deviceInfo.deviceId" label="编号" ></mt-field>
        <mt-field v-model="deviceInfo.name" label="名称" placeholder="请输入名称"></mt-field>
        <mt-field v-model="deviceInfo.position" label="位置" placeholder="请输入位置"></mt-field>
        <mt-cell label="是否正在使用"><mt-switch v-model="isUsing"></mt-switch></mt-cell>
        <mt-field v-model="deviceInfo.retailerName" label="厂家" placeholder="请输入厂家"></mt-field>
        <mt-field v-model="deviceInfo.phoneNumber" type="number" label="厂家联系方式" placeholder="请输入厂家联系方式"></mt-field>
        <mt-field v-model="deviceInfo.usingPeople" label="使用人" placeholder="请输入使用人"></mt-field>
        <mt-field type="textarea" v-model="deviceInfo.comments" label="注释" placeholder="请输入注释"></mt-field>
        <p><mt-button type="danger" size="large" @click="modifyDevice">修改设备信息</mt-button> </p>
    </div>
</template>

<script>
    export default {
        name: "deviceModify",
        data(){
            let deviceInfo= this.$route.params;
            return{
                deviceInfo,
                isUsing:deviceInfo.status==1
            }
        },
        methods:{
            modifyDevice(){
                let tt=this;
                this.$messagebox.confirm("确认提交修改?").then(()=>{tt.doDeviceModify()});
            },
            doDeviceModify(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.deviceInfo.status=this.isUsing?1:0;
                this.$http.post(
                    "http://dem.luluhui.cf/device/updateDevice",
                    this.deviceInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("修改成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("修改失败,该设备正在使用中")}
                    },()=>{tt.$messagebox.alert("修改失败")});
            }
        }
    }
</script>

<style scoped>

</style>