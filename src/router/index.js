import Vue from 'vue'   //引入Vue
import VueRouter from 'vue-router'  //引入vue-router

Vue.use(VueRouter); //Vue全局使用Router

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'mainView',
            component:()=>import('../components/mainView.vue')
        },
        {
            path:'/login',
            name:'login',
            component:()=>import('../components/login.vue')
        },
        {
            path:'/passwordModify',
            name:'passwordModify',
            component:()=>import('../components/passwordModify.vue')
        },
        {
            path:'/drug/queryDrug',
            name:'queryDrug',
            component:()=>import('../components/drug/drugSearch.vue')
        },
        {
            path:'/drug/drugDetail',
            name:'drugDetail',
            component:()=>import('../components/drug/drugDetail.vue')
        },
        {
            path:'/drug/drugModify',
            name:'drugModify',
            component:()=>import('../components/drug/drugModify.vue')
        },
        {
            path:'/drug/addNewDrug',
            name:'addNewDrug',
            component:()=>import('../components/drug/addNewDrug.vue')
        },
        {
            path:'/drugRequest/drugRequestSearch',
            name:'drugRequestSearch',
            component:()=>import('../components/drugRequest/drugRequestSearch.vue')
        },
        {
            path:'/drugRequest/addNewDrugRequest',
            name:'addNewDrugRequest',
            component:()=>import('../components/drugRequest/addNewDrugRequest.vue')
        },
        {
            path:'/retailer/addNewRetailer',
            name:'addNewReatailer',
            component:()=>import('../components/retailer/addNewRetailer.vue')
        }

    ]
})