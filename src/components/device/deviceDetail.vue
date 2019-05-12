<template>
    <div>
        <div>
            <mt-header title="设备详细信息">
                <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
            </mt-header>
            <div>
                <mt-cell v-model="deviceInfo.deviceId" label="编号" ></mt-cell>
                <mt-cell v-model="deviceInfo.name" label="名称" ></mt-cell>
                <mt-cell v-model="deviceInfo.position" label="位置"></mt-cell>
                <mt-cell label="是否正在使用"><mt-switch disabled="true" v-model="isUsing"></mt-switch></mt-cell>
                <mt-cell v-model="deviceInfo.retailerName" label="厂家"></mt-cell>
                <mt-cell v-model="deviceInfo.phoneNumber" label="厂家联系方式"></mt-cell>
                <mt-cell v-model="deviceInfo.createPeople" label="创建人"></mt-cell>
                <mt-cell v-model="deviceInfo.usingPeople" label="使用人"></mt-cell>
                <mt-cell v-model="deviceInfo.comments" label="注释"></mt-cell>
                <p><mt-button type="primary" size="large" @click="updateDevice">修改设备</mt-button></p>
                <p><mt-button type="danger" size="large" @click="deleteDevice">删除设备</mt-button></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "deviceDetail",
        data(){
            return{
                deviceInfo:this.$route.params,
                isUsing:this.$route.params.status==1
            }
        },
        methods:{
            updateDevice(){
                this.$messagebox.confirm("确认修改设备?").then(()=>{this.$router.push({name:'deviceModify',params:this.deviceInfo})})
            },
            deleteDevice(){
                if(this.deviceInfo.status==1) this.$messagebox.alert("设备正在使用，无法删除");
                else {
                    this.$messagebox.confirm("确认删除设备?设备删除后信息将无法恢复").then(()=>{this.deDeleteDevice()});
                }
            },
            deDeleteDevice(){
                let tt=this;
                tt.$indicator.open("提交数据中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.delete(
                    "http://dem.luluhui.cf/device/deleteDevice?id="+tt.deviceInfo.deviceId,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if (res.data==true){tt.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});}
                        else {tt.$messagebox.alert("删除失败")}
                    },()=>{tt.$messagebox.alert("删除失败")});
            }
        }
    }
</script>

<style scoped>

</style>