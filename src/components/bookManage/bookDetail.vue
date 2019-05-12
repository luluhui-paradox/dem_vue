<template>
    <div>
        <mt-header title="书籍详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="编号" v-model="bookinfo.bookId"></mt-cell>
        <mt-cell title="名称" v-model="bookinfo.name"></mt-cell>
        <mt-cell title="ISBN" v-model="bookinfo.isbn"></mt-cell>
        <mt-cell title="作者" v-model="bookinfo.author"></mt-cell>
        <mt-cell title="出版社" v-model="bookinfo.press"></mt-cell>
        <mt-cell title="价格" v-model="bookinfo.price"></mt-cell>
        <mt-cell title="购买时间" v-model="purchaseTime"></mt-cell>
        <mt-cell title="购买人" v-model="bookinfo.purchaser"></mt-cell>
        <p>
            <mt-button v-if="teacherStatus==1" size="large" type="danger" @click="deleteBook">移除书籍</mt-button>
            <mt-button v-if="teacherStatus==0" size="large" type="primary" @click="lendBook">借出书籍</mt-button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "bookDetail",
        data(){
            let bookinfo=this.$route.params;
            let teacherStatus=localStorage.getItem("status");
            let purchaseTime=bookinfo.purchaseTime==""?"":bookinfo.purchaseTime.slice(0,10);
            return{
                bookinfo,
                teacherStatus,
                purchaseTime,
            }
        },
        methods:{
            deleteBook(){
                this.$messagebox.confirm("确定要删除书籍? 删除后不可恢复!").then(this.doDeleteBook)
            },
            doDeleteBook(){
                this.$http.delete("http://dem.luluhui.cf/bookManage/delectBookById?bookId="+this.bookinfo.bookId,{headers:{token:localStorage.getItem("token")}})
                    .then((res)=>{
                        if(res.data==true){
                            let tt=this;
                            this.$messagebox.alert("删除成功").then(()=>{tt.$router.back()});
                        }else{
                            this.$messagebox.alert("删除失败,书籍已被借阅。不可删除");
                        }
                    },()=>{
                        this.$messagebox.alert("删除失败");
                    })
            },
            lendBook(){
                this.$messagebox.prompt("确定要借阅书籍?","请输入注释").then(({value})=>{this.doLendBook(value)});
            },
            doLendBook(value){
                this.$http.get("http://dem.luluhui.cf/bookLend/newBookLend?bookId="+this.bookinfo.bookId+"&comments="+value,{headers:{token: localStorage.getItem("token")}})
                    .then((res)=>{
                        if(res.data==true){
                            let tt=this;
                            this.$messagebox.alert("借阅成功").then(()=>{tt.$router.back()});
                        }else{
                            this.$messagebox.alert("借阅失败,书籍已被借阅");
                        }
                    },()=>{
                        this.$messagebox.alert("借阅失败");
                    })
            }
        }
    }
</script>

<style scoped>

</style>