<template>
    <div>
        <mt-header title="书籍查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-field label="名称" v-model="bookInfo.name" placeholder="请输入名称"></mt-field>
            <mt-field label="ISBN" v-model="bookInfo.ISBN" placeholder="请输入ISBN"></mt-field>
            <mt-field label="作者" v-model="bookInfo.author" placeholder="请输入作者"></mt-field>
            <mt-field label="出版社" v-model="bookInfo.press" placeholder="请输入出版社"></mt-field>
            <mt-field label="价格" type="number" v-model="bookInfo.price" placeholder="请输入价格"></mt-field>
            <mt-field label="购买者" v-model="bookInfo.purchaser" placeholder="请输入购买者"></mt-field>
            <p>
                <mt-button size="large" type="primary" @click="searchBook">查询</mt-button>
            </p>
        </div>
        <div>
            <el-table :data="bookList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="bookId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="author" label="作者" ></el-table-column>
                <el-table-column prop="press" label="出版社" ></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==1" @click="newBook">添加新书籍</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bookSearch",
        data(){
            return{
                teacherStatus:localStorage.getItem("status"),
                bookInfo:{
                    ISBN:null,
                    name:null,
                    author:null,
                    press:null,
                    price:null,
                    purchaser:null
                },
                bookList:[]
            }
        },
        methods:{
            searchBook(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url="http://dem.luluhui.cf/bookmanage/selectBookByCondition";
                this.$http.post(url,this.bookInfo,{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.bookList=res.data;
                        tt.initBookList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            initBookList(){
                for(let i=0;i<this.bookList.length;i++){
                    if(this.bookList[i].purchaseTime!=null)
                        this.bookList[i].purchaseTime=this.bookList[i].purchaseTime.slice(0,10);
                }
            },
            rowClick(row){
                this.$router.push({
                    name:'bookDetail',
                    params:row
                });
            },
            newBook(){
                let tt=this;
                this.$messagebox.confirm("确认添加新书籍?")
                    .then(()=>{tt.$router.push("/bookManage/addNewBook")});
            }
        }
    }
</script>

<style scoped>

</style>