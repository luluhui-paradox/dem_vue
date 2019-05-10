<template>
    <div>
        <mt-header title="添加新书籍">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <p></p>
        <div>
            <mt-field label="名称" v-model="bookInfo.name" placeholder="请输入名称"></mt-field>
            <mt-field label="ISBN" v-model="bookInfo.ISBN" placeholder="请输入ISBN"></mt-field>
            <mt-field label="作者" v-model="bookInfo.author" placeholder="请输入作者"></mt-field>
            <mt-field label="出版社" v-model="bookInfo.press" placeholder="请输入出版社"></mt-field>
            <mt-field label="价格" type="number" v-model="bookInfo.price" placeholder="请输入价格"></mt-field>
            <mt-field label="购买人" v-model="bookInfo.purchaser" placeholder="请输入购买人"></mt-field>
        </div>
        <p><mt-button size="large" type="primary" @click="addBook">添加书籍</mt-button></p>

    </div>
</template>

<script>
    export default {
        name: "addNewBook",
        data(){
            return{
                bookInfo:{
                    ISBN:null,
                    name:null,
                    author:null,
                    press:null,
                    price:null,
                    purchaser:null
                },
            }
        },
        methods:{
            addBook(){this.$messagebox.confirm("确认添加书籍?").then(this.doAddBook);},
            doAddBook(){
                let tt=this;
                this.$indicator.open('提交中');
                setTimeout(()=>{tt.$indicator.close()},2000);
                this.$http.post('http://dem.luluhui.cf/bookmanage/addNewBook',this.bookInfo,
                    {emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then((res)=>{
                        if(res.data==true) tt.$messagebox.alert("数据提交成功").then(()=>{tt.$router.back()});
                        else tt.$messagebox.alert("数据提交失败");
                    },()=>{tt.$messagebox.alert("数据提交失败")});
            }
        },
    }
</script>

<style scoped>

</style>