import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class UserStore {
    allUserStat = []        // текущая загруженна Вся статистика - сделать за период!
    startIn = true   // первый вход в приложение - попытка проверит на залогиненность юзверя - с проверкой на сервере
    isLogin = false
    email : ''
    userName : ''
    token : ''
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
        localStorage.setItem('wbSaleUserToken', this.token);
    }
    async  loadAllUserStat(needDelete = false, deleteIdList = []){
        try{
            const response = await ApiService.APILoadAllUserStat( needDelete, deleteIdList)
            if (response.data) {
                this.allUserStat = response.data
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    // async  addStartProduct(id, startDiscount, startQty, startPrice){
    //     try{
    //         const response = await ApiService.APIAddStartProduct(id, startDiscount, startQty, startPrice)
    //         console.log(response.data);
    //
    //     } catch (e) {
    //         // this.setErrorMessage(e.response?.data?.message)
    //         console.log(e)
    //     }
    // }

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
        console.log('userStore.startIn');
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
