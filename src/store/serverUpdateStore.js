import {makeAutoObservable} from "mobx";
import ApiService from "../service/ApiService";

export default class ServerUpdateStore {
    isServerOpen = false
    newServerMessages = []
    allServerMessages = []
    constructor() {
        makeAutoObservable((this))
    }

    setIsServerOpen(isServerOpen){
        this.isServerOpen = isServerOpen
    }

    addServerMessages (message){
        this.newServerMessages = message.message.toString()
        // console.log(this.newServerMessages);
        this.allServerMessages.push(message)
    }

    setNewMessagesAsAll (){
        this.newServerMessages = [... this.allServerMessages]
    }


    clearNewServerMessages (){
        this.newServerMessages = []
    }

    async loadNewProducts(onWork, loadPageCount, loadOnlyNew){
        try {
            console.log('tt');
            let result = []
            try {
                result = await ApiService.APILoadNewProducts(onWork, loadPageCount, loadOnlyNew)
            } catch (e) {
                console.log(e);
            }
            console.log(result);
            return result
        } catch (e){
            console.log(e)
        }
    }


}