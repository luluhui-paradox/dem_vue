<template>
    <div>
        <mt-header title="休假信息查询">
            <mt-button slot="left" icon="back" @click="()=>{this.$router.back()}">返回</mt-button>
        </mt-header>
        <div>
            <mt-field v-if="teacherStatus==1" label="学生姓名" v-model="name" placeholder="请输入学生姓名"></mt-field>
            <mt-field label="年份" v-model="year" placeholder="请输入年份"></mt-field>
            <p>
                <mt-button size="large" type="primary"  @click="searchVacationInfo">查询休假信息</mt-button>
            </p>
        </div>
        <div>
            <el-table :data="vacationList"  @row-click="rowClick" style="width: 100%">
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="year" label="年份" width="70px" ></el-table-column>
                <el-table-column prop="total_vacation_days" label="总休日期" ></el-table-column>
                <el-table-column prop="done_days" label="已休日期"></el-table-column>
                <el-table-column prop="donot_days" label="未修日期"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==1" @click="addVacationInfo">添加休假信息</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "searchVacationInfo",
        data(){
            let teacherStatus=localStorage.getItem("status");
            return{
                teacherStatus,
                name:null,
                year:null,
                vacationList:[]
            }
        },
        methods:{
            searchVacationInfo(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url=this.teacherStatus==1?"http://dem.luluhui.cf/Vacation/vacationState/selectByConditionWithName":"http://dem.luluhui.cf/Vacation/vacationState/selectByConditionwithNameStudent";
                this.$http.post(url,{name:this.name,year:this.year},{emulateJSON:true,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        if(tt.teacherStatus==1) tt.vacationList=res.data;
                        else tt.vacationList.push(res.data);
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            addVacationInfo(){
                let tt=this;
                this.$messagebox.confirm("确认添加休假信息?").then(()=>{
                    tt.$router.push("/vacation/addVacationInfo");
                })
            },
            rowClick(row){
                if(this.teacherStatus==1){
                    this.$messagebox.confirm("确认修改学生信息?").then(()=>{
                        this.$router.push({
                            name:'vacationInfoDetail',
                            params:row
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>