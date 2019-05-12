<template>
    <div>
        <mt-header title="未还书籍查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <el-table :data="bookLendList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="bookId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="lendDate" label="借出日期"></el-table-column>
                <el-table-column prop="anticipateDateNumber" label="还书期限(天)"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==0" @click="searchBookLend">查询未还书籍</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bookLendSearch",
        data(){
            return{
                teacherStatus:localStorage.getItem("status"),
                bookLendInfo:{
                    ISBN:null,
                    name:null,
                    author:null,
                    press:null,
                    price:null,
                    purchaser:null
                },
                bookLendList:[]
            }
        },
        methods:{
            searchBookLend(){
                this.$messagebox.confirm("确认查询?").then(()=>{this.doSearchBookLend()})
            },
            doSearchBookLend(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url="http://dem.luluhui.cf/bookLend/selectLendBook";
                this.$http.get(url,{headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.bookLendList=res.data;
                        tt.initBookLendList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            initBookLendList(){
                for(let i=0;i<this.bookLendList.length;i++){
                    if(this.bookLendList[i].lendDate!=null||this.bookLendList[i].lendDate!=''){
                        this.bookLendList[i].lendDate=this.bookLendList[i].lendDate.slice(0,10);
                    }
                }
            },
            rowClick(row){
                this.$router.push({
                    name:'bookLendDetail',
                    params:row
                });
            }
        }
    }
</script>

<style scoped>

</style>