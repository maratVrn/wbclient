import {makeAutoObservable} from "mobx";

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
        this.newServerMessages.push(message)
        this.allServerMessages.push(message)
    }

    setNewMessagesAsAll (){
        this.newServerMessages = [... this.allServerMessages]
    }


    clearNewServerMessages (){
        this.newServerMessages = []
    }


}