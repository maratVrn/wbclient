import {makeAutoObservable, runInAction} from "mobx";
import ApiService from "../service/ApiService";

export default class ServerUpdateStore {
    GlobalState = {}

    allTask = []

    loadNewProductsMessages = []
    endLoadNewProductsMessage = ''

    constructor() {
        makeAutoObservable((this))
    }

    setNewMessageData(data){
        this.GlobalState = data

        if (this.endLoadNewProductsMessage !== this.GlobalState.loadNewProducts.endState) {
            this.loadNewProductsMessages.unshift(this.GlobalState.loadNewProducts.endStateTime + ' ' + this.GlobalState.loadNewProducts.endState)
            this.endLoadNewProductsMessage = this.GlobalState.loadNewProducts.endState
            // console.log('Новое сообщение');
        } else {
            this.loadNewProductsMessages[0] = this.GlobalState.loadNewProducts.endStateTime + ' ' + this.GlobalState.loadNewProducts.endState
            // console.log('Дублируется сообщение');
        }


    }

    async getCurrServerInfo(){
        let result = []
        try {
            result = await ApiService.APIGetCurrServerInfo()
            runInAction(() => {this.setNewMessageData(result.data)})
        } catch (e) {console.log(e);}
        return result
    }

    async loadNewProducts(loadPageCount, loadOnlyNew) {
        let result = []
        try {


            result = await ApiService.APILoadNewProducts(loadPageCount, loadOnlyNew)
            runInAction(() => {this.setNewMessageData(result.data)})
        } catch (e) {console.log(e);}
        return result
    }
    async loadAllTask(deleteIdList) {
        let result = []
        try {
            result = await ApiService.APILoadAllTask(deleteIdList)
            runInAction(() => {this.allTask = result.data})
        } catch (e) {console.log(e);}
        return result
    }



}