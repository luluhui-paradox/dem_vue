<template>
    <div>
        <mt-header title="添加生产商">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-field v-model="retailerInfo.name" placeholder="请输入名称" label="名称"></mt-field>
        <mt-field v-model="retailerInfo.address" placeholder="请输入地址" label="地址"></mt-field>
        <mt-field v-model="retailerInfo.contactName" placeholder="请输入联系人姓名" label="联系人姓名"></mt-field>
        <mt-field v-model="retailerInfo.phoneNumber" type="tel" placeholder="请输入手机号" label="手机号"></mt-field>
        <mt-field v-model="retailerInfo.email" type="email" placeholder="请输入邮箱" label="邮箱"></mt-field>
        <mt-field v-model="retailerInfo.comments" type="textarea" placeholder="请输入注释" label="注释"></mt-field>
        <p>
            <mt-button size="large" type="primary" @click="confirmAdd">添加生产商</mt-button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "addNewRetailer",
        data(){
            return{
                retailerInfo:{
                    name:null,
                    address:null,
                    contactName:null,
                    phoneNumber:null,
                    email:null,
                    comments:null,
                }
            }
        },
        methods:{
            confirmAdd(){
                this.$messagebox.confirm("确定添加生产商?").then(this.addRetailer);
            },
            addRetailer(){
                let tt=this;
                this.$indicator.open("提交中");
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post("http://dem.luluhui.cf/retailer/addRetailer",this.retailerInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function () {
                        tt.$messagebox.alert("添加成功").then(()=>{tt.$router.go(-1)});
                    },function () {
                        tt.$messagebox.alert("添加失败，请检查您的输入");
                    })
            },

        }

    }
</script>

<style scoped>

</style>