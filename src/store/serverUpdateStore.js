import {makeAutoObservable, runInAction} from "mobx";
import ApiService from "../service/ApiService";

export default class ServerUpdateStore {
    GlobalState = {}

    allTask = []

    loadNewProductsMessages = []
    endLoadNewProductsMessage = ''

    deleteDuplicateIDMessages = []
    endDeleteDuplicateIDMessage = ''

    endSetNoUpdateProductsMessage = ''
    setNoUpdateProductsMessages = []

    endUpdateAllProductListMessage = ''
    updateAllProductListMessages = []

    endServerMessage = ''
    ServerMessages = []

    constructor() {
        makeAutoObservable((this))
    }

    setNewMessageData(data){
        this.GlobalState = data


        if (this.endServerMessage !== this.GlobalState.serverState.endState) {
            this.ServerMessages.unshift(this.GlobalState.serverState.endStateTime + ' ' + this.GlobalState.serverState.endState)
            this.endServerMessage = this.GlobalState.serverState.endState
        } else {
            this.ServerMessages[0] = this.GlobalState.serverState.endStateTime + ' ' + this.GlobalState.serverState.endState
        }

        if (this.endUpdateAllProductListMessage !== this.GlobalState.updateAllProductList.endState) {
            this.updateAllProductListMessages.unshift(this.GlobalState.updateAllProductList.endStateTime + ' ' + this.GlobalState.updateAllProductList.endState)
            this.endUpdateAllProductListMessage = this.GlobalState.updateAllProductList.endState
        } else {
            this.updateAllProductListMessages[0] = this.GlobalState.updateAllProductList.endStateTime + ' ' + this.GlobalState.updateAllProductList.endState
        }


        if (this.endLoadNewProductsMessage !== this.GlobalState.loadNewProducts.endState) {
            this.loadNewProductsMessages.unshift(this.GlobalState.loadNewProducts.endStateTime + ' ' + this.GlobalState.loadNewProducts.endState)
            this.endLoadNewProductsMessage = this.GlobalState.loadNewProducts.endState
        } else {
            this.loadNewProductsMessages[0] = this.GlobalState.loadNewProducts.endStateTime + ' ' + this.GlobalState.loadNewProducts.endState
        }


        if (this.endDeleteDuplicateIDMessage !== this.GlobalState.deleteDuplicateID.endState) {
            this.deleteDuplicateIDMessages.unshift(this.GlobalState.deleteDuplicateID.endStateTime + ' ' + this.GlobalState.deleteDuplicateID.endState)
            this.endDeleteDuplicateIDMessage = this.GlobalState.deleteDuplicateID.endState
        } else {
            this.deleteDuplicateIDMessages[0] = this.GlobalState.deleteDuplicateID.endStateTime + ' ' + this.GlobalState.deleteDuplicateID.endState
        }

        if (this.endSetNoUpdateProductsMessage !== this.GlobalState.setNoUpdateProducts.endState) {
            this.setNoUpdateProductsMessages.unshift(this.GlobalState.setNoUpdateProducts.endStateTime + ' ' + this.GlobalState.setNoUpdateProducts.endState)
            this.endSetNoUpdateProductsMessage = this.GlobalState.setNoUpdateProducts.endState
        } else {
            this.setNoUpdateProductsMessages[0] = this.GlobalState.setNoUpdateProducts.endStateTime + ' ' + this.GlobalState.setNoUpdateProducts.endState
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




    async deleteDuplicateID() {
        let result = []
        try {
            result = await ApiService.deleteDuplicateID()
            runInAction(() => {this.setNewMessageData(result.data)})
        } catch (e) {console.log(e);}
        return result
    }

    async setNoUpdateProducts() {
        let result = []
        try {
            result = await ApiService.setNoUpdateProducts()
            runInAction(() => {this.setNewMessageData(result.data)})
        } catch (e) {console.log(e);}
        return result
    }




    async getAllProductCount() {
        let result = []
        try {

            result = await ApiService.APIGetAllProductCount()
            // runInAction(() => {this.setNewMessageData(result.data)})
        } catch (e) {console.log(e);}
        return result
    }

    async getWBCatalog_fromWB() {
        let result = []
        try {

            result = await ApiService.APIGetWBCatalog_fromWB()
            // runInAction(() => {this.setNewMessageData(result.data)})
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

    async updateAllProductList(needCalcData, updateAll) {
        let result = []
        try {
            result = await ApiService.APIUpdateAllProductList(needCalcData, updateAll)
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