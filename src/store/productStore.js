import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";


export default class ProductStore {
    productList = []
    productInfo = []
    positionsInfo = []
    priceHistory = []
    photoUrlArray = []
    productAbout = []
    productColorsInfo = []
    supplierInfo = []
    competitorSeeAlsoInfo = []
    competitorSeePhotoInfo = []
    competitorSeeFindInfo = []
    nowId = 0
    realDiscount = 0
    idInfo = {isInWB : false, isInBase : false, isFbo : false}
    startDateInBase = ''
    is_all_colors_Load = false          //  Чтобы не перегружать лишнюю инфу при переходе по табам
    is_supplier_info_Load = false
    is_positions_info_Load = false
    is_competitorSeeAlsoInfo = false
    is_competitorSeePhotoInfo = false
    is_competitorSeeFindInfo = false


    supplierId = 0                      // ИД Продавцв


    constructor() {
        makeAutoObservable((this))
    }

    setRealDiscount(discount) {
        this.realDiscount = discount
    }

    setState(id){
        const needId = parseInt(id)
        let is_all_colors_Load = false
        let is_supplier_info_Load = false
        let is_positions_info_Load = (id === this.nowId);

        if (id !== this.nowId){
            this.is_competitorSeeAlsoInfo = false
            this.is_competitorSeePhotoInfo = false
            this.is_competitorSeeFindInfo = false
        }


        for (let i in this.productColorsInfo){
            if (needId === this.productColorsInfo[i].id){
                is_all_colors_Load = true
                break
            }

        }

        for (let i in this.supplierInfo){
            if (needId === this.supplierInfo[i].id){
                is_supplier_info_Load = true
                break
            }

        }
        this.setNewLoadStates(is_all_colors_Load, is_supplier_info_Load, is_positions_info_Load)
    }

    setSupplierId(supplierId){
        this.supplierId  = supplierId
    }

    setNewLoadStates(is_all_colors_Load = false, is_supplier_info_Load = false, is_positions_info_Load = false){
        this.is_all_colors_Load = is_all_colors_Load
        this.is_supplier_info_Load = is_supplier_info_Load
        this.is_positions_info_Load = is_positions_info_Load
    }
    setNowId (nowId){
        this.nowId = nowId
    }

    set_is_all_colors_Load(is_all_colors_Load){
        this.is_all_colors_Load = is_all_colors_Load
    }

    set_is_supplier_info_Load(is_supplier_info_Load){
        this.is_supplier_info_Load = is_supplier_info_Load
    }
    set_is_positions_info_Load(is_positions_info_Load){
        this.is_positions_info_Load = is_positions_info_Load
    }





    setProductList (productList){
        this.productList = productList
    }
    setPositionsInfo(positionsInfo){
        this.positionsInfo = positionsInfo
    }

    setProductColorsInfo (productColorsInfo){
        this.productColorsInfo = productColorsInfo
    }

    setSupplierInfo (supplierInfo){
        this.supplierInfo = supplierInfo
    }


    setProductAbout(productAbout){
        this.productAbout = productAbout
    }

    setPriceHistory (priceHistory){
        this.priceHistory = priceHistory
    }
    setPhotoUrlArray (urlArray){
        this.photoUrlArray = urlArray
    }

    setProductInfo (productInfo){
        this.productInfo = productInfo
    }

    async saveDataToCVS(CatalogID,fname, dtype){
        try{

            const result = await ApiService.APISaveProductList(CatalogID,fname,dtype)
            console.log(result);
            //if (result?.data) this.setProductList(result?.data)
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async testFunc(){
        try{

            const result = await ApiService.testFunc()
            console.log(result);

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
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
        else  basket = '22'

        return basket
    }

    getLitePhotoUrl(id){
        const shortId = Math.floor(id / 100000)
        const part = Math.floor(id / 1000)
        const basket = this.getBasketFromID(shortId)
        return `https://basket-${basket}.wbbasket.ru/vol${shortId}/part${part}/${id}/images/c516x688/1.webp`
    }

    // Подгрузим фотографии
    async getProductListLitePhoto(productList) {
        for (let i in productList?.data) {
            if (productList.data[i].id) {
                productList.data[i].photoUrl = this.getLitePhotoUrl(productList.data[i].id)
            }
        }

    }

    async  getProductList(catalogID){
        try{
            const productList = await ApiService.APIGetProductList(catalogID)

            // Загрузим фотографии
            await this.getProductListLitePhoto(productList)

            // Отсортирум по продажам
            if (productList?.data) {
                productList?.data.sort(function(a, b) {  return b.saleCount - a.saleCount; });
                this.setProductList(productList?.data)
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    setProductInfoData(data){
        let result =[]
        for (let i in data){

            const oneItem = {
                id           : data[i].id,
                brand        : data[i].idInfo.brand,
                name         : data[i].idInfo.name,
                position     : data[i].idInfo.pos,
                photoUrl     : data[i].photoUrl,
                supplier     : data[i].idInfo.supplier,
                price        : data[i].productInfo?.price? data[i].productInfo?.price : 0,
                priceHistory : data[i].productInfo?.priceHistory? data[i].productInfo?.priceHistory : 0,
                qty          : data[i].productInfo?.totalQuantity? data[i].productInfo?.totalQuantity : 0,
                saleCount    : data[i].productInfo?.saleCount? data[i].productInfo?.saleCount : 0,
                saleMoney    : data[i].productInfo?.saleMoney? data[i].productInfo?.saleMoney : 0,
            }

            result.push(oneItem)
        }

        result.sort(function(a, b) {
            return a.position - b.position;
        });

        return result
    }
    async  loadCompetitorSeeFindInfo(id, findText){
        try{
            console.log('tut');
            this.competitorSeeFindInfo = []
            const productInfo = await ApiService.APIGetCompetitorSeeFindInfo(id, findText)
            // console.log(productInfo?.data);
            if (productInfo?.data) this.competitorSeeFindInfo = this.setProductInfoData(productInfo.data)
            this.is_competitorSeeFindInfo = true
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async  loadCompetitorSeeAlsoInfo(id){
        try{

            if (!this.is_competitorSeeAlsoInfo) {
                this.competitorSeeAlsoInfo = []
                const productInfo = await ApiService.APIGetCompetitorSeeAlsoInfo(id)
                if (productInfo?.data) this.competitorSeeAlsoInfo = this.setProductInfoData(productInfo.data)
                this.is_competitorSeeAlsoInfo = true
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }
    async  loadCompetitorSeePhotoInfo(id){
        try{
            console.log('tut');
            if (!this.is_competitorSeePhotoInfo) {
                console.log('tut2');
                this.competitorSeePhotoInfo = []
                const productInfo = await ApiService.APIGetCompetitorSeePhotoInfo(id)
                if (productInfo?.data) this.competitorSeePhotoInfo = this.setProductInfoData(productInfo.data)
                this.is_competitorSeePhotoInfo = true
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async  getProductColorsInfo(id){
        try{

            if (!this.is_all_colors_Load) {
                const productColorsInfo = await ApiService.APIGetProductColorsInfo(id)
                if (productColorsInfo?.data) this.setProductColorsInfo(productColorsInfo?.data)
                this.set_is_all_colors_Load(true)
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


    async  getSupplierInfo(supplierId){
        try{

            if (!this.is_supplier_info_Load) {
                const productSupplierInfo = await ApiService.APIGetSupplierInfo(supplierId)
                if (productSupplierInfo?.data) this.setSupplierInfo(productSupplierInfo?.data)
                this.set_is_supplier_info_Load(true)
            }

        } catch (e) {console.log(e) }
    }

    getSearchWords(){
        let searchWords = []
        if (this.productAbout.data.data.imt_name){
            try {
                let arr = this.productAbout.data.data.imt_name.split(/[\s,]+/)

                let crWord = ''
                for (let i in arr){

                    crWord += arr[i]+' '
                    if (arr[i].length >= 3) {
                        searchWords.push(crWord)
                        if (i < 4)
                            if (this.productAbout.data.data.nm_colors_names) searchWords.push(crWord + ' ' + this.productAbout.data.data.nm_colors_names)
                    }
                }
            }   catch (e) { console.log(e);}
        }
        return searchWords
    }

    async addPositionsInfo(id,newSearchText){
        try{
            if (this.is_positions_info_Load) {
                const positionsInfo = await ApiService.APIGetPositionsInfo(id, [newSearchText])
                if (positionsInfo?.data) this.setPositionsInfo([...positionsInfo?.data, ...this.positionsInfo])
            }
        } catch (e) { console.log(e) }
    }
    async  getPositionsInfo(id){
        try{
            if (!this.is_positions_info_Load) {
                const searchWords = this.getSearchWords()
                const positionsInfo = await ApiService.APIGetPositionsInfo(id, searchWords)
                if (positionsInfo?.data) this.setPositionsInfo(positionsInfo?.data)
                this.set_is_positions_info_Load(true)
            }
        } catch (e) { console.log(e) }
    }

    // Получаем информацию про ИД - 1. есть ли он на вб 2. Есть ли он в нашей базе
    async  getProductStartInfo(productId){
        try{
            this.idInfo ={isInWB : false, isInBase : false, isFbo : false}
            const newIdInfo = await ApiService.APIGetProductStartInfo(productId)
            if (newIdInfo?.data) {
                this.idInfo = newIdInfo?.data

            }

        } catch (e) {
                        console.log(e)
        }
    }


    async  getProductPhoto(productId){
        try{
            this.setPhotoUrlArray([])
            const productPhoto = await ApiService.APIGetProductPhoto(productId)

            if (productPhoto?.data) {
                this.setPhotoUrlArray(productPhoto?.data)
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    async  getProductAbout(productId){
        try{

            this.setProductAbout(null)
            const productAbout = await ApiService.APIGetProductAbout(productId)

            if (productAbout?.data) {
                this.setNowId(productId)
                if (productAbout.data?.info?.supplierId) this.setSupplierId(productAbout.data?.info?.supplierId)
                this.setProductAbout(productAbout)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async  getProductInfo(productId){
        try{
            this.setProductInfo(null)
            const productInfo = await ApiService.APIGetProductInfo(productId)
            if (productInfo?.data) {
                this.setProductInfo(productInfo?.data)
                if (productInfo?.data[1]) {
                    this.setProductInfo(productInfo?.data[1])
                    if (productInfo?.data[1]?.priceHistory[0]?.d) this.startDateInBase = productInfo?.data[1]?.priceHistory[0]?.d
                } else this.startDateInBase = 'нет в данных'

            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }





}
