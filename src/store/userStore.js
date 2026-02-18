import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class UserStore {
    allUserStat = []        // текущая загруженна Вся статистика - сделать за период!
    startIn = true   // первый вход в приложение - попытка проверит на залогиненность юзверя - с проверкой на сервере
    isLogin = false
    email : ''
    userName : ''
    token : ''
    tg_token : ''
    role : ''
    userId : 0
    commandOk = false
    allTrackProducts = []


    constructor() {
        makeAutoObservable((this))
    }


    setUser (data){

        this.isLogin = true
        this.email = data.email ? data.email : 'Email : ошибка'
        this.userName = data.userName ? data.userName : 'Имя : ошибка'
        this.role = data.role ? data.role : "USER"
        this.userId = data.id ? data.id : 0
        this.token = data.token? data.token : 'ошибка получения токена'
        this.tg_token = data.tg_token? data.tg_token : 'ошибка получения токена'
        localStorage.setItem('wbSaleUserToken', this.token);
    }

    chartData = {labels:['-'],entry : [],viewProduct : [], search : [], productList  : [],wbTransit : [], addTrack : []}
    setChartData(data){
        let labels = []
        let entry = []
        let viewProduct = []
        let search = []
        let productList = []
        let wbTransit = []
        let addTrack = []

        for (let i in data){
            let crEntry = 0
            let crViewProduct = 0
            let crSearch = 0
            let crProductList = 0
            let crWBTransit = 0
            let crAddTrack = 0
            const crStatIPInfo = data[i].statIPInfo
            for (let k in crStatIPInfo){
                // if ((crStatIPInfo[k]?.viewProductCount>0) || (crStatIPInfo[k]?.searchCount>0) || (crStatIPInfo[k]?.productListCount>0) ||
                //     (crStatIPInfo[k]?.wbTransitCount>0) || (crStatIPInfo[k]?.addTrackCount>0)) {
                    crEntry++
                    crViewProduct += crStatIPInfo[k]?.viewProductCount ? crStatIPInfo[k]?.viewProductCount : 0
                    crSearch += crStatIPInfo[k]?.searchCount ? crStatIPInfo[k]?.searchCount : 0
                    crProductList += crStatIPInfo[k]?.productListCount ? crStatIPInfo[k]?.productListCount : 0
                    crWBTransit += crStatIPInfo[k]?.wbTransitCount ? crStatIPInfo[k]?.wbTransitCount : 0
                    crAddTrack += crStatIPInfo[k]?.addTrackCount ? crStatIPInfo[k]?.addTrackCount : 0
                // }
            }

            try {
                labels.push(data[i].crDate)
                entry.push(crEntry)
                viewProduct.push(crViewProduct)
                search.push(crSearch)
                productList.push(crProductList)
                wbTransit.push(crWBTransit)
                addTrack.push(crAddTrack)

            } catch (e) {}
        }
        this.chartData = {labels:labels,entry : entry,viewProduct : viewProduct, search : search, productList  : productList,wbTransit : wbTransit, addTrack : addTrack}
    }


    async  loadAllUserStat(startDate, endDate, needDelete = false, deleteIdList = []){
        try{
            const response = await ApiService.APILoadAllUserStat( startDate, endDate, needDelete, deleteIdList)
            if (response.data) {
                this.allUserStat = response.data
                this.setChartData(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async userLogin(formData){

        try{
            const response = await ApiService.APIUserLogin( formData)
            if (response?.data) {
                if (response?.data.isError) alert(`Ошибка : `+response?.data.errorMessage)
                 else this.setUser(response.data)
            }

        } catch (e) {
            console.log(e);
        }
    }

    async userRegistration(formData){
        this.isLogin = false
        try {
            const response = await ApiService.APIUserRegistration(formData)

            if (response?.data) {
                if (response?.data.isError) alert(`Ошибка : `+response?.data.errorMessage)
                else this.setUser(response.data)
            }

        } catch (e) {
            console.log(e);
        }
    }

    async newPassword(password, link){
        this.isLogin = false
        try {
            const response = await ApiService.APIUserNewPassword(password, link)
            console.log(response.data);
            if (response?.data) {
                if (response?.data.isError) alert(`Ошибка : `+response?.data.errorMessage)
                else this.setUser(response.data)
            }

        } catch (e) {
            console.log(e);
        }
    }

    async updatePassword(email){
        this.isLogin = false
        try {
            const response = await ApiService.APIUserUpdatePassword(email)

            if (response?.data) {
                if (response?.data.isError) alert(`Ошибка : `+response?.data.errorMessage)
                else alert(`Инструкции по восстановлению пароля отправлены на: ${email}`);
            }

        } catch (e) {
            console.log(e);
        }
    }


    logout (){
        this.isLogin = false
        localStorage.setItem('wbSaleUserToken', 'nodata');
    }



    async userTokenTest(){

        this.startIn = true
        this.isLogin = false
        try {
            const savedToken = localStorage.getItem('wbSaleUserToken');
            const response = await ApiService.APIUserTokenTest(savedToken)
            if (response?.data) {
                if (response?.data.isError) console.log(response?.data.errorMessage);
            else this.setUser(response.data)
                await this.loadAllTrackProducts()

            }
        } catch (e) {
            console.log(e);
        }
    }

    async addProductToTrack(newAddProduct){

        try {
            this.commandOk = false
            const response = await ApiService.APIUserAddProductInfo(newAddProduct, this.userId)
            if (response?.data) {
                if (response?.data.isError) alert(`Ошибка : `+response?.data.errorMessage)
                else this.commandOk = true
            }
        } catch (e) {
            console.log(e);
        }
    }

    async saveCurTrackProductData(trackProduct){
        try{
            this.allTrackProducts = []
            const response = await ApiService.APISaveCurTrackProductData(this.userId, trackProduct)
            if (response.data) {
                this.allTrackProducts = response.data
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }
    async updateAllTrackProducts(){
        try{

            const response = await ApiService.APIUpdateAllTrackProducts()
            if (response.data) {
                console.log(response.data);
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async  loadAllTrackProducts( needDelete = false, deleteIdList = []){
        try{
            this.allTrackProducts = []
            const response = await ApiService.APIGetLoadTrackProducts(this.userId, needDelete, deleteIdList)
            if (response.data) {
                this.allTrackProducts = response.data
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    isProductInTrackList(productId){
        let isThere = false
        for (let i in this.allTrackProducts)
            if (this.allTrackProducts[i].id === parseInt(productId)) {
                isThere = true
                break
            }
        return isThere

    }

}
