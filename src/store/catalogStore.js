import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class CatalogStore {
    allWBCatalogLite = []        // Каталог ВБ
    wbCatalogInfo = []            //   Список конрентных каталогов конечных точек
    catalogIdInfo = []          // Инфо по выбранному каталогу- предметы и кол-во карточек по предмету

    errorMessage = null
    isCatalogLoad = false
    idInfo = []


    someData = [0]



    constructor() {
        makeAutoObservable((this))
    }



    setAllWBCatalogLite(allWBCatalogLite){
        let addCatalog = []
        const notAddIdList = [62057, 131286]
        for (let i in allWBCatalogLite) if (!notAddIdList.includes(allWBCatalogLite[i].id)) addCatalog.push(allWBCatalogLite[i])
        this.allWBCatalogLite = addCatalog
    }

    setErrorMessage(errorMessage){
        this.errorMessage = errorMessage
    }

    async serverTestCommand(){
             try {
                 const result = await ApiService.testFunc()
             } catch (e){
                    console.log(e)
                }
    }

    async clientTestCommand(){
        try {
            const result = await ApiService.deleteDuplicateID()
        } catch (e){
            console.log(e)
        }
    }


    async loadServerTest(){
        try {
            const result = await ApiService.loadApiTestFunc()
        } catch (e){
            console.log(e)
        }
    }


    // Загружаем с базы данных каталог ВБ лайт версию и перефрматируем ее для отображения
    async  getLiteWBCatalog(){
        try{
            this.someData = 'isOk1'
            const response = await ApiService.APIGetLiteWBCatalog()

            // this.someData = response
            this.someData = 'isOk2'

            this.setAllWBCatalogLite(response.data)
            for (let i in this.allWBCatalogLite){
                try {this.allWBCatalogLite[i].img = require(`../components/images/menu/${this.allWBCatalogLite[i].id}.png`)}
                catch (e) {this.allWBCatalogLite[i].img = require(`../components/images/menu/noImg.png`)}
            }


            if (response?.data?.length>0) {
                this.isCatalogLoad = true

            }

        } catch (e) {
            // this.someData = e
            // this.someData = 'false'
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    // Загружаем с базы данных каталог ВБ лайт версию и перефрматируем ее для отображения
    async  getWBCatalogInfo(){
        try{
            const response = await ApiService.APIGetCatalogInfo()
            this.wbCatalogInfo = response.data

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    // Загружаем с базы данных предметы для выбранного каталога и кол-во карточек по предмету
    async  getCatalogIdInfo(catalogId, needDelete, deleteIdList){
        try{
            const response = await ApiService.APIGetCatalogIdInfo(catalogId, needDelete, deleteIdList)
            this.catalogIdInfo = response.data

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    // Загружаем с базы данных предметы для выбранного каталога и кол-во карточек по предмету
    async  addSubjectsInCatalog(catalogId, newSubjects){
        try{
            const response = await ApiService.APIAddSubjectsInCatalog(catalogId, newSubjects)
            console.log(response.data);

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }
    // Сохраним таблицу с предметами в файл
    async  saveAllSubjectsToFile(){
        try{
            const response = await ApiService.APISaveAllSubjectsToFile()
            console.log(response.data);

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    // Загрузим данные с файлф
    async  loadAllSubjectsFromFile(){
        try{
            const response = await ApiService.APILoadAllSubjectsFromFile()
            console.log(response.data);
        } catch (e) {       this.setErrorMessage(e.response?.data?.message)
            console.log(e)}
    }


    async  saveSearchDataToFile(){
        try{
            const response = await ApiService.APISaveSearchDataToFile()
            console.log(response.data);
        } catch (e) {       this.setErrorMessage(e.response?.data?.message)
            console.log(e)}
    }

    async  loadSearchDataFromFile(){
        try{
            const response = await ApiService.APILoadSearchDataFromFile()
            console.log(response.data);
        } catch (e) {       this.setErrorMessage(e.response?.data?.message)
            console.log(e)}
    }




}
