import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";

export default class CatalogStore {
    allWBCatalogLite = []               // Каталог ВБ
    allNodeTree_WBCatalogLite = []      // Каталог ВБ в лайт формате на отображение

    selectedCatalogID = 0               // Выбранный ID товарной группы в каталоге 0 используется для отображения списка товаров в группе
    selectedCatalogName = 0             // Выбранный Имя каталога
    errorMessage = null
    isCatalogLoad = false
    isSecondCatalogLoad = false
    menu2CatalogItems = []               // Каталог вб для отображения на втором меню
    mainCatalogI = -1                    // Текущая позиция в корневом каталоге на которую навели мышкой

    currId = 0

    idInfo = []

    setIdInfo(idInfo){
        this.idInfo = idInfo
    }


    constructor() {
        makeAutoObservable((this))
    }

    getMenu3Items(id){
        let items = []
        if (this.mainCatalogI>-1)
        if (this.allWBCatalogLite[this.mainCatalogI])
        if(this.allWBCatalogLite[this.mainCatalogI]?.childs.length>0) {
            const childs = this.allWBCatalogLite[this.mainCatalogI]?.childs

            for (let i in childs)
                if (childs[i].id === id ){
                    if (childs[i].childs.length>0){
                        const childs2 = childs[i].childs
                        for (let j in childs2){
                            let d3 = {id: childs2[j].id, name: childs2[j].name, isHover: false, isMenu4: false}
                            if (childs2[j].childs.length>0) d3.isMenu4= true
                            items.push(d3)
                        }
                    }

                    break;
            }

        }
        return items
    }

    getMenu4Items(id){
        let items = []
        let isIn = false
        if (this.mainCatalogI>-1)
            if (this.allWBCatalogLite[this.mainCatalogI])
                if(this.allWBCatalogLite[this.mainCatalogI]?.childs.length>0) {
                    const childs = this.allWBCatalogLite[this.mainCatalogI]?.childs

                    for (let i in childs) {
                        if (childs[i].childs.length > 0)
                            for (let j in childs[i].childs) {
                                if (childs[i].childs[j].id === id) {
                                    if (childs[i].childs[j].childs.length > 0) {
                                        const childs3 = childs[i].childs[j].childs
                                        for (let k in childs3) {
                                            let d4 = {
                                                id: childs3[k].id,
                                                name: childs3[k].name,
                                                isHover: false,
                                                isMenu5: false
                                            }
                                            if (childs3[k].childs.length > 0) d4.isMenu5 = true
                                            items.push(d4)
                                        }
                                    }
                                    isIn = true
                                    break;
                                }
                                if (isIn) break
                            }
                        if (isIn) break
                    }
                }
        return items
    }

    getMenu5Items(id){
        let items = []
        let isIn = false
        if (this.mainCatalogI>-1)
            if (this.allWBCatalogLite[this.mainCatalogI])
                if(this.allWBCatalogLite[this.mainCatalogI]?.childs.length>0) {
                    const childs = this.allWBCatalogLite[this.mainCatalogI]?.childs

                    for (let i in childs) {
                        if (childs[i].childs.length > 0)
                            for (let j in childs[i].childs) {

                                    if (childs[i].childs[j].childs.length > 0) {
                                        const childs3 = childs[i].childs[j].childs
                                        for (let k in childs3)
                                            if (childs3[k].id === id)
                                            {
                                                for (let x in childs3[k].childs) {

                                                    let d5 = {
                                                        id: childs3[k].childs[x].id,
                                                        name: childs3[k].childs[x].name,
                                                        isHover: false,
                                                        isMenu6: false
                                                    }
                                                    if (childs3[k].childs[x].childs)
                                                        if (childs3[k].childs[x].childs.length > 0) d5.isMenu6 = true
                                                    items.push(d5)
                                                }
                                                isIn = true
                                                break
                                            }
                                    }


                                if (isIn) break
                            }
                        if (isIn) break
                    }
                }
        return items
    }
    setIsSecondCatalogLoad(isLoad){
        this.isSecondCatalogLoad = isLoad
    }
    setMainCatalogI(catalogI){
        this.mainCatalogI = catalogI
        if ((catalogI>-1) && (catalogI<this.allWBCatalogLite.length)){
            if(this.allWBCatalogLite[catalogI]?.childs.length>0) {
                const childs = this.allWBCatalogLite[catalogI]?.childs
                const items = []
                for (let i in childs){
                    let d2 = {id: childs[i].id, name: childs[i].name, isHover: false, isMenu3: false}
                    if (childs[i].childs.length>0) d2.isMenu3= true
                    items.push(d2)
                }
                this.menu2CatalogItems = items
                this.setIsSecondCatalogLoad(true)
            }

        }


    }

    setAllWBCatalogLite(allWBCatalogLite){
        this.allWBCatalogLite = allWBCatalogLite

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
    async duplicateTest(id, cat1, cat2){
        try {
            const result = await ApiService.APIDuplicateTest(id, cat1, cat2)
            console.log(result);
            return result
        } catch (e){
            console.log(e)
        }
    }


    async searchTest(){
        try{
            const result = await ApiService.APIUploadTest()
            console.log(result);
            return result

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async getIdInfo(id){
        try{
            this.setIdInfo([])
            const result = await ApiService.APIGetIDInfo(id)
            if (result.data[0]?.id) this.setIdInfo(result.data)
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


    // // Команда на запрос полного каталога с сайта ВБ - ПАРСИНГ!
    // async  getWBCatalog_fromWB(){
    //     try{
    //         await ApiService.APIGetWBCatalog_fromWB()
    //
    //     } catch (e) {
    //         this.setErrorMessage(e.response?.data?.message)
    //         console.log(e)
    //     }
    // }

    // Вычисляем id позиции в каталоге вб по ключу
    getCatalogIDFromKey(key){

        return key
    }
    // Загружаем с базы данных каталог ВБ лайт версию и перефрматируем ее для отображения
    async  getLiteWBCatalog(){
        try{
            const response = await ApiService.APIGetLiteWBCatalog()
            this.setAllWBCatalogLite(response.data)
            await this.setNodeTree_WBCatalogLite(response.data)

            if (response?.data?.length>0) {
                this.isCatalogLoad = true
                // console.log('isCatalogLoad = true');
            }

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }
    // перефрматируем лайт верисю каталога вб для отображения
    async setNodeTree_WBCatalogLite(data){
        let result = []
        for (let i in data) {

            const d1 = {  key: data[i]?.id,  id : data[i]?.id, label: data[i]?.name, data: data[i]?.name, icon: 'pi pi-fw pi-inbox',  children: [] }
            if (data[i]?.childs) {
                const crCat2 = data[i]?.childs

                for (let j in crCat2) {
                    const d2 = {key: crCat2[j]?.id, id: crCat2[j]?.id, label: crCat2[j]?.name, data: crCat2[j]?.name, icon: 'pi pi-file',  children: []  }

                    if (crCat2[j].childs) {

                        d2.icon = 'pi pi-folder'
                        const crCat3 = crCat2[j].childs
                        for (let k in crCat3) {
                            const d3 = {key: crCat3[k]?.id, id: crCat3[k]?.id, label: crCat3[k]?.name, data: crCat3[k]?.name, icon: 'pi pi-file',  children: []  }

                            if (crCat3[k].childs) {

                                d3.icon = 'pi pi-folder'
                                const crCat4 = crCat3[k].childs
                                for (let l in crCat4) {
                                    const d4 = {key: crCat4[l]?.id, id: crCat4[l]?.id, label: crCat4[l]?.name, data: crCat4[l]?.name, icon: 'pi pi-file',  children: []  }

                                    // '--------------------------'

                                    if (crCat4[l].childs) {

                                        d4.icon = 'pi pi-folder'
                                        const crCat5 = crCat4[l].childs
                                        for (let z in crCat5) {
                                            const d5 = {key: crCat5[z]?.id, id: crCat5[z]?.id, label: crCat5[z]?.name, data: crCat5[z]?.name, icon: 'pi pi-file'  }

                                            d4.children.push(d5)
                                        }

                                    }

                                    // '---------------------------'


                                    d3.children.push(d4)
                                }

                            }

                            d2.children.push(d3)
                        }

                    }
                    d1.children.push(d2)
                }

            }
            result.push(d1)
        }



        this.allNodeTree_WBCatalogLite = result
    }



}
