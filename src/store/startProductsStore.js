import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class StartProductsStore {
    allStartProducts = []        // Каталог ВБ


    constructor() {
        makeAutoObservable((this))
    }



    async  loadAllStartProducts( needDelete, deleteIdList){
        try{
            const response = await ApiService.APIGetLoadStartProducts( needDelete, deleteIdList)
            if (response.data) {
                this.allStartProducts = response.data
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

        async  addStartProduct(id, startDiscount, startQty, startPrice){
        try{
            const response = await ApiService.APIAddStartProduct(id, startDiscount, startQty, startPrice)
            console.log(response.data);

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


}
