import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";
import {calcDiscount} from "../components/math";



export default class ProductListStore {
    productList = []
    startProductList = []
    totalWBProductsCount = 0
    productInfo = []
    query = []
    addQuery = []

    onShowProduct = false           // Используем этот коюч если был переход на страницу товара а потом возврат обратно
    onShowProductParam = {}     // Запоминаем настройки филтров и сортировки
    onShowBreadItems = []

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

    }

    constructor() {
        makeAutoObservable((this))
    }




    setProductListResult(productList){
        let productListAdd = productList?.data[0]? productList?.data[0] : []
        let itogProductListAdd = []
        for (let i in  productListAdd) {

            const discountData = calcDiscount(productListAdd[i].priceHistory)
            if (discountData.isDataCalc)
                if (discountData.discount >0 ) {
                    productListAdd[i].discount = discountData.discount
                    productListAdd[i].meanPrice = discountData.meanPrice
                    // TODO: Хардкор чтобы малопокупаемые товары не показывались
                    if (productListAdd[i].feedbacks>5) {
                        let needAdd = true
                        // проверим вдруг товар уже есть чтобы не задвоился
                        for (let k in itogProductListAdd)
                            if (itogProductListAdd[k].id === productListAdd[i].id){
                                needAdd = false
                                break
                            }
                        if (needAdd) itogProductListAdd.push(productListAdd[i])
                    }

                }
        }
        itogProductListAdd.sort((a, b) => b.discount - a.discount)
        this.setStartData()
        if (productList?.data) this.productList = itogProductListAdd

        if (productList?.data[1].subjects)
            for (let j in productList?.data[1].subjects) this.xsubjectFilter.items.push({name: productList?.data[1].subjects[j].name, key:productList?.data[1].subjects[j].id})

    }

    setStartProductListResult(productList){
        let productListAdd = productList?.data[0]? productList?.data[0] : []
        let itogProductListAdd = []
        for (let i in  productListAdd) {

            const discountData = calcDiscount(productListAdd[i].priceHistory)
            if (discountData.isDataCalc)
                if (discountData.discount >0 ) {
                    productListAdd[i].discount = discountData.discount
                    productListAdd[i].meanPrice = discountData.meanPrice
                    // TODO: Хардкор чтобы малопокупаемые товары не показывались
                    if (productListAdd[i].feedbacks>5) {
                        let needAdd = true
                        // проверим вдру товар уже есть чтобы не задвоился
                        for (let k in itogProductListAdd)
                            if (itogProductListAdd[k].id === productListAdd[i].id){
                                needAdd = false
                                break
                            }
                        if (needAdd) itogProductListAdd.push(productListAdd[i])
                    }

                }
        }
        itogProductListAdd.sort((a, b) => b.discount - a.discount)

        if (productList?.data) this.startProductList = itogProductListAdd

        // if (productList?.data[1].subjects)
        //     for (let j in productList?.data[1].subjects) this.xsubjectFilter.items.push({name: productList?.data[1].subjects[j].name, key:productList?.data[1].subjects[j].id})

    }


    async  getStartProductList(param){
        try{
            const param = {catalogIdList :[ parseInt(8126)], idCount: 100,
                filters : {isXsubjectFilterChecked : false, xSubjectIdArray : []}
            }
            const productList = await ApiService.APIGetProductList(param)
            this.setStartProductListResult(productList)
        } catch (e) {
            console.log(e)
        }
    }



    async  getProductList(param){
        try{
            // this.setStartData()
            const productList = await ApiService.APIGetProductList(param)
            this.setProductListResult(productList)
        } catch (e) {
            console.log(e)
        }
    }

    async  getSearchResult(searchQuery, param){

        try{

            this.query = searchQuery
            const productList = await ApiService.APIGetSearchResult(searchQuery, param)
            this.setProductListResult(productList)


        } catch (e) {

            console.log(e)
        }
    }

    async  sortProducts(sortKey = 1){

        try{
            if (sortKey === 1) this.productList.sort((a, b) => b.discount - a.discount)
            if (sortKey === 2) this.productList.sort((a, b) => a.price - b.price)
            if (sortKey === 3) this.productList.sort((a, b) => b.price - a.price)
            if (sortKey === 4) this.productList.sort((a, b) => b.reviewRating - a.reviewRating)
            if (sortKey === 5) this.productList.sort((a, b) => b.feedbacks - a.feedbacks)



            // if (sortKey === 4) this.productList.sort((a, b) => b.price - a.price)



        } catch (e) {

            console.log(e)
        }
    }





}
