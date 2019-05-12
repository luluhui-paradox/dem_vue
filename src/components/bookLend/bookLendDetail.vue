<template>
    <div>
        <mt-header title="书籍详情">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <mt-cell title="编号" v-model="bookLendInfo.bookLendRecordId"></mt-cell>
        <mt-cell title="书籍名称" v-model="bookLendInfo.name"></mt-cell>
        <mt-cell title="ISBN" v-model="bookLendInfo.isbn"></mt-cell>
        <mt-cell title="作者" v-model="bookLendInfo.author"></mt-cell>
        <mt-cell title="出版社" v-model="bookLendInfo.press"></mt-cell>
        <mt-cell title="价格" v-model="bookLendInfo.price"></mt-cell>
        <mt-cell title="借出时间" v-model="bookLendInfo.lendDate"></mt-cell>
        <mt-cell title="借阅期限" v-model="bookLendInfo.anticipateDateNumber"></mt-cell>
        <mt-cell title="注释" v-model="bookLendInfo.comments"></mt-cell>
        <p>
            <mt-button v-if="teacherStatus==0" size="large" type="primary" @click="returnBook">归还书籍</mt-button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "bookLendDetail",
        data(){
            let bookLendInfo=this.$route.params;
            let teacherStatus=localStorage.getItem("status");
            return{
                bookLendInfo,
                teacherStatus,
            }
        },
        methods:{
            returnBook(){
                this.$messagebox.confirm("确定要归还书籍?").then(this.doReturnBook);
            },
            doReturnBook(){
                this.$http.get("http://dem.luluhui.cf/bookLend/returnBook?bookId="+this.bookLendInfo.bookId,{headers:{token: localStorage.getItem("token")}})
                    .then((res)=>{
                        if(res.data==true){
                            let tt=this;
                            this.$messagebox.alert("还书成功").then(()=>{tt.$router.back()});
                        }else{
                            this.$messagebox.alert("还书失败,请再试一次");
                        }
                    },()=>{
                        this.$messagebox.alert("还书失败，网络错误失败");
                    })
            }
        }
    }
</script>

<style scoped>

</style>