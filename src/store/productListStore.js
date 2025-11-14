import ApiService from "../service/ApiService";
import WbService from "../service/WbService";

import {makeAutoObservable} from "mobx";
import {calcDiscount} from "../components/math";



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
        // this.priceUFilter = { key: 'priceU', min:1, max:1_000_000}
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

    async  getProductList(param){
        try{
            this.setStartData()
            const productList = await ApiService.APIGetProductList(param)
            let productListAdd = productList?.data[0]? productList?.data[0] : []
            let itogProductListAdd = []
            for (let i in  productListAdd) {

                const discountData = calcDiscount(productListAdd[i].priceHistory)
                if (discountData.isDataCalc)
                    if (discountData.discount >0 ) {
                        productListAdd[i].discount = discountData.discount
                        productListAdd[i].meanPrice = discountData.meanPrice
                        // TODO: Хардкор чтобы малопокупаемые товары не показывались
                        if (productListAdd[i].feedbacks>5) itogProductListAdd.push(productListAdd[i])
                    }
            }
            itogProductListAdd.sort((a, b) => b.discount - a.discount)
            // itogProductListAdd.sort((a, b) => a.price - b.price)
            this.setStartData()
            if (productList?.data) this.productList = itogProductListAdd


            if (productList?.data[1].subjects)
                for (let j in productList?.data[1].subjects) this.xsubjectFilter.items.push({name: productList?.data[1].subjects[j].name, key:productList?.data[1].subjects[j].id})

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async  getSearchResult(searchQuery, newInfo = true, pageCount = 1){

        try{

            this.query = searchQuery
            if (newInfo) this.setStartData()


            const searchResult = await WbService.WB_APIGetSearchResult(searchQuery,pageCount)
            const updateIdInfo = await ApiService.APIUpdateIdInfo(searchResult.data.onlyIdList)

            if (newInfo) this.setStartData()

            if (searchResult.data?.idList){
                for (let i in searchResult.data?.idList) {
                    if (searchResult.data.idList[i].id) {

                        // if (searchResult.data.idList[i].id === 551527118) console.log(searchResult.data.idList[i].photoUrl);

                        for (let j in updateIdInfo.data) if (updateIdInfo.data[j].id === searchResult.data.idList[i].id){
                            searchResult.data.idList[i].price = updateIdInfo.data[j].price
                            searchResult.data.idList[i].totalQuantity = updateIdInfo.data[j].totalQuantity
                            searchResult.data.idList[i].photoUrl = updateIdInfo.data[j].photoUrl
                            searchResult.data.idList[i].priceHistory =  updateIdInfo.data[j].priceHistory
                            const result =  calcDiscount(searchResult.data.idList[i].priceHistory)
                            searchResult.data.idList[i].isDataCalc = result.isDataCalc
                            searchResult.data.idList[i].discount = result.discount
                            searchResult.data.idList[i].meanPrice = result.meanPrice

                            break}
                    }


                }


            }

            searchResult.data.idList.sort(function(a, b) {  return a.discount - b.discount; });
            let resProductList = []




            if (searchResult.data?.idList)
                for (let i = searchResult.data.idList.length-1; i>=0; i-- )
                    if (searchResult.data.idList[i].price >0 ) resProductList.push(searchResult.data.idList[i])

            console.log('кол = '+resProductList.length);


            this.productList = resProductList
            this.addQuery  = searchResult.data?.addQuery? searchResult.data?.addQuery : []
            this.totalWBProductsCount = searchResult.data?.data?.total? searchResult.data?.data.total : 0
            // if (newInfo) if (searchResult.data?.data?.filters) this.setFilters(searchResult.data?.data?.filters)



        } catch (e) {

            console.log(e)
        }
    }





}
