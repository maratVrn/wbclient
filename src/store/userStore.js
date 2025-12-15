import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class UserStore {
    allUserStat = []        // текущая загруженна Вся статистика - сделать за период!


    constructor() {
        makeAutoObservable((this))
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


}
