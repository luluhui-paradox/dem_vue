<template>
    <div>
        <mt-header title="引物查询">
            <mt-button slot="left" icon="back" @click="cancle">返回</mt-button>
        </mt-header>
        <div>
            <mt-radio
                    title="引物状态"
                    v-model="primerInfo.status"
                    :options="statusList">
            </mt-radio>
            <mt-field label="引物名称" v-model="primerInfo.name" placeholder="请输入引物名称"></mt-field>
            <mt-field label="最低价格" type="number" v-model="primerInfo.priceMin" placeholder="请输入最低价格"></mt-field>
            <mt-field label="最高价格" type="number" v-model="primerInfo.priceMax" placeholder="请输入最高价格"></mt-field>
            <p>
                <mt-button size="large" type="primary" @click="searchPrimer">查询</mt-button>
            </p>
        </div>
        <div>
            <el-table :data="primerList" @row-click="rowClick" style="width: 100%">
                <el-table-column prop="primerId" label="编号" width="50px" ></el-table-column>
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="price" label="价格" width="70px" ></el-table-column>
                <el-table-column prop="requestPeopleName" label="申请人" ></el-table-column>
                <el-table-column prop="approvalPeopleName" label="审查人"></el-table-column>
            </el-table>
            <p>
                <mt-button size="large" type="primary" v-if="teacherStatus==0" @click="newPrimer">添加引物单</mt-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "primerSearch",
        data(){
            let teacherStatus=localStorage.getItem("status");
            return{
                teacherStatus,
                popupValue:false,
                statusList:[
                    {
                        label: '未审核',
                        value: '0'
                    },
                    {
                        label: '进行中',
                        value: '1'
                    },
                    {
                        label: '已成功',
                        value: '2'
                    },
                    {
                        label: '已失败',
                        value: '3'
                    }
                ],
                primerInfo:{
                    status:null,
                    name:null,
                    priceMin:null,
                    priceMax:null
                },
                approvalMap:[],
                studentMap:[],
                primerList:[]
            }
        },
        methods:{
            newPrimer(){
                let tt=this;
                this.$messagebox.confirm("确认提交新引物申请?").then(()=>{
                    tt.$router.push('/primer/addNewPrimer');
                });
            },
            cancle(){this.$router.back()},
            searchPrimer(){
                let tt=this;
                this.$indicator.open('查询中');
                setTimeout(()=>{tt.$indicator.close();},2000);
                let url=this.teacherStatus==1?"http://dem.luluhui.cf/primer/selectPrimerTeacher":"http://dem.luluhui.cf/primer/selectPrimerStudent";
                this.$http.get(url,{params:this.primerInfo,headers:{token:localStorage.getItem('token')}})
                    .then(function (res) {
                        tt.primerList=res.data;
                        tt.initPrimerList();
                    },function () {
                        tt.$toast('查询失败');
                    })
            },
            rowClick(row){
                this.$router.push({
                    name:'primerDetail',
                    params:row
                });
            },
            initPrimerList(){
                let tt=this;
                for(let i=0; i<this.primerList.length; i++){
                    for(let j=0;j<tt.approvalMap.length;j++){
                        if (tt.approvalMap[j].value==tt.primerList[i].approvalPeopleId){
                            tt.primerList[i].approvalName=tt.approvalMap[j].label;
                        }
                        break;
                    }
                    for(let j=0;j<tt.studentMap.length;j++){
                        if (tt.studentMap[j].value==tt.primerList[i].requestPeopleId){
                            tt.primerList[i].requestPeopleName=tt.studentMap[j].label;
                        }
                        break;
                    }
                }
            }
        },
        created() {
            let tt=this;
            this.$indicator.open('加载中');
            setTimeout(()=>{tt.$indicator.close()},2000);
            this.$http.get("http://dem.luluhui.cf/user/selectUserIdAndNameByCondition?status=1",
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i = 0, len = res.data.length; i < len; i++){
                        let ss={label:"",value:0};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].userPeopleId;
                        tt.approvalMap.push(ss);
                    }
                },function () {
                    tt.$toast('数据加载失败');
                })
            this.$http.get("http://dem.luluhui.cf/user/selectUserIdAndNameByCondition?status=0",
                {headers:{token:localStorage.getItem('token')}})
                .then(function (res) {
                    for(let i = 0, len = res.data.length; i < len; i++){
                        let ss={label:"",value:0};
                        ss.label=res.data[i].name;
                        ss.value=res.data[i].userPeopleId;
                        tt.studentMap.push(ss);
                    }
                },function () {
                    tt.$toast('数据加载失败');
                })
        }
    }
</script>

<style scoped>

</style>