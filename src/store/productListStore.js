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
            const result = await ApiService.APIGetSearchResult(searchQuery)
            console.log(result);

        } catch (e) {

            console.log(e)
        }
    }





}
