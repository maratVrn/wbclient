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
    nowId = 0
    startDateInBase = ''
    is_all_colors_Load = false          //  Чтобы не перегружать лишнюю инфу при переходе по табам
    is_supplier_info_Load = false
    is_positions_info_Load = false

    supplierId = 0                      // ИД Продавцв


    constructor() {
        makeAutoObservable((this))
    }

    setState(id){
        const needId = parseInt(id)
        let is_all_colors_Load = false
        let is_supplier_info_Load = false
        let is_positions_info_Load = (id === this.nowId);

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
        else  basket = '18'

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
            if (productList?.data) this.setProductList(productList?.data)


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
                        if (i < 4) searchWords.push(crWord + ' ' + this.productAbout.data.data.nm_colors_names)
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
                if (productAbout.data.info.supplierId) this.setSupplierId(productAbout.data.info.supplierId)
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
                    if (productInfo?.data[1]?.priceHistory[0]?.d) this.startDateInBase = productInfo?.data[1].priceHistory[0].d
                } else this.startDateInBase = 'нет в данных'

            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }





}
