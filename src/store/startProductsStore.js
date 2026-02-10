import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class StartProductsStore {
    allStartProducts = []


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

        async  addStartProduct(id, startDiscount, startQty, startPrice, priceHistory){
        try{
            const response = await ApiService.APIAddStartProduct(id, startDiscount, startQty, startPrice, priceHistory)
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


}
