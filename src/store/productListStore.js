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



    getBasketFromID(shortId){

        let basket = ''
        if (shortId <= 143) { basket = '01'}
        else if (shortId <= 287)   basket = '02'
        else if (shortId <= 431)   basket = '03'
        else if (shortId <= 719)   basket = '04'
        else if (shortId <= 1007)  basket = '05'
        else if (shortId <= 1061)  basket = '06'
        else if (shortId <= 1115)  basket = '07'
        else if (shortId <= 1169)  basket = '08'
        else if (shortId <= 1313)  basket = '09'
        else if (shortId <= 1601)  basket = '10'
        else if (shortId <= 1655)  basket = '11'
        else if (shortId <= 1919)  basket = '12'
        else if (shortId <= 2045)  basket = '13'
        else if (shortId <= 2090)  basket = '14'
        else if (shortId <= 2189)  basket = '14'
        else if (shortId <= 2405)  basket = '15'
        else if (shortId <= 2621)  basket = '16'
        else if (shortId <= 2837)  basket = '17'
        else if (shortId <= 3053)  basket = '18'
        else if (shortId <= 3269)  basket = '19'
        else if (shortId <= 3485)  basket = '20'
        else if (shortId <= 3701)  basket = '21'
        else if (shortId <= 3917)  basket = '22'
        else if (shortId <= 4133)  basket = '23'
        else if (shortId <= 4349)  basket = '24'
        else if (shortId <= 4565)  basket = '25'
        else if (shortId <= 4781)  basket = '26'
        else if (shortId <= 4997)  basket = '27'
        else if (shortId <= 5213)  basket = '28'
        else if (shortId <= 5239)  basket = '29'
        else if (shortId <= 5445)  basket = '30'
        else if (shortId <= 5671)  basket = '31'
        else if (shortId <= 5887)  basket = '32'
        else if (shortId <= 6103)  basket = '33'
        else  basket = '34'

        return basket
    }

    getLitePhotoUrl(id){
        const shortId = Math.floor(id / 100000)
        const part = Math.floor(id / 1000)
        const basket = this.getBasketFromID(shortId)
        return `https://basket-${basket}.wbbasket.ru/vol${shortId}/part${part}/${id}/images/c516x688/1.webp`
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

            const searchResult = await ApiService.APIGetSearchResult(searchQuery,pageCount)
            const searchResult2 = await WbService.WB_APIGetSearchResult(searchQuery,pageCount)

            // console.log(searchResult);
            if (newInfo) this.setStartData()

            if (searchResult.data?.idList){
                for (let i in searchResult.data?.idList) {
                    if (searchResult.data.idList[i].id) {
                        searchResult.data.idList[i].photoUrl = this.getLitePhotoUrl(searchResult.data?.idList[i].id)
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
