import ApiService from "../service/ApiService";
import WbService from "../service/WbService";

import {makeAutoObservable} from "mobx";



export default class ProductListStore {
    productList = []
    totalWBProductsCount = 0
    productInfo = []
    query = []
    addQuery = []

    // Фильтры ВБ
    fbrandFilter = {key : 'fbrand', items : []}
    xsubjectFilter = { key : 'xsubject', items : [] }
    priceUFilter = {key: 'priceU', min:1, max:1_000_000}

    setQuery(query){
        this.query = query
    }
    setStartData(){
        this.productList = []
        this.addQuery = []
        this.totalWBProductsCount = 0
        this.productInfo = []
        this.fbrandFilter = { key : 'fbrand', items : [] }
        this.xsubjectFilter = { key : 'xsubject', items : [] }
        this.priceUFilter = { key: 'priceU', min:1, max:1_000_000}
    }

    constructor() {
        makeAutoObservable((this))
    }



    setFilters(filters){

        for (let i in filters){

            if (filters[i].key === 'fbrand') for (let j in filters[i].items) this.fbrandFilter.items.push({name: filters[i].items[j].name, key:filters[i].items[j].id})
            if (filters[i].key === 'xsubject') for (let j in filters[i].items) this.xsubjectFilter.items.push({name: filters[i].items[j].name, key:filters[i].items[j].id})
            if (filters[i].key === 'priceU') {
                try {
                    this.priceUFilter.min = filters[i].minPriceU / 100
                    this.priceUFilter.max = filters[i].maxPriceU / 100
                } catch {
                    this.priceUFilter = {key: 'priceU', min: 1, max: 1_000_000}
                }
            }

        }

    }

    async  getSearchResult(searchQuery, newInfo = true, pageCount = 1){

        try{

            this.query = searchQuery
            if (newInfo) this.setStartData()

            // const searchResult = await ApiService.APIGetSearchResult(searchQuery,pageCount)
            const searchResult = await WbService.WB_APIGetSearchResult(searchQuery,pageCount)
            const updateIdInfo = await ApiService.APIUpdateIdInfo(searchResult.data.onlyIdList)
            // console.log(updateIdInfo);
            // console.log(searchResult);
            if (newInfo) this.setStartData()

            if (searchResult.data?.idList){
                for (let i in searchResult.data?.idList) {
                    if (searchResult.data.idList[i].id) {

                        // if (searchResult.data.idList[i].id === 551527118) console.log(searchResult.data.idList[i].photoUrl);

                        for (let j in updateIdInfo.data) if (updateIdInfo.data[j].id === searchResult.data.idList[i].id){
                            searchResult.data.idList[i].price = updateIdInfo.data[j].price
                            searchResult.data.idList[i].photoUrl = updateIdInfo.data[j].photoUrl

                            break}
                    }
                }
            }

            this.productList = searchResult.data?.idList? searchResult.data?.idList : []
            this.addQuery  = searchResult.data?.addQuery? searchResult.data?.addQuery : []
            this.totalWBProductsCount = searchResult.data?.data?.total? searchResult.data?.data.total : 0
            if (newInfo) if (searchResult.data?.data?.filters) this.setFilters(searchResult.data?.data?.filters)



        } catch (e) {

            console.log(e)
        }
    }





}
