import ApiService from "../service/ApiService";
import {makeAutoObservable} from "mobx";
import WbService from "../service/WbService";
import {calcDiscount} from "../components/math";

export default class ProductStore {
    productList = []
    subjects = []


    productInfo = []
    positionsInfo = []
    priceHistory = []
    photoUrlArray = []
    // productAbout = []
    productColorsInfo = []
    supplierInfo = []
    supplierAbout = {}
    competitorSeeAlsoInfo = []
    competitorSeePhotoInfo = []
    competitorSeeFindInfo = []
    nowId = 0

    idInfo = {isInWB : false, isInBase : false, isFbo : false}
    startDateInBase = ''
    colors = []
    idAddInfo = {imt_name : '', nm_colors_names : ''}

    is_all_colors_Load = false          //  Чтобы не перегружать лишнюю инфу при переходе по табам
    is_supplier_info_Load = false
    is_positions_info_Load = false
    is_competitorSeeAlsoInfo = false
    is_competitorSeePhotoInfo = false
    is_competitorSeeFindInfo = false


    supplierId = 0                      // ИД Продавцв

    productYearCalcData = {} // Рассчитанные данные по продажам продукта за год
    productYearCalcData_allColors = {} // Рассчитанные данные по продажам продукта за год по всем цветам
    allDataDoughnut = {data : [], labels : [], count : [[]], money : [[]]} // Данные для круговой диаграммы продаж



    constructor() {
        makeAutoObservable((this))
    }


    setProductYearCalcData(productYearCalcData) {
        this.productYearCalcData = productYearCalcData
    }

    setAllDataDoughnut(allDataDoughnut) {
        this.allDataDoughnut = allDataDoughnut
    }

    setProductYearCalcData_allColors(productYearCalcData_allColors) {

        this.productYearCalcData_allColors = productYearCalcData_allColors
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



    setPositionsInfo(positionsInfo){
        this.positionsInfo = positionsInfo
    }

    setProductColorsInfo (productColorsInfo){
        this.productColorsInfo = productColorsInfo
    }

    setSupplierInfo (supplierInfo, supplierAbout){
        this.supplierInfo = supplierInfo
        this.supplierAbout = supplierAbout
    }


    setPhotoUrlArray (urlArray){
        this.photoUrlArray = urlArray
    }

    setProductInfo (productInfo){
        this.productInfo = productInfo
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
                discount    : data[i].productInfo?.discount? data[i].productInfo?.discount : 0
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
               // console.log('грузим');
               const productColorsInfo = await ApiService.APIGetProductColorsInfo(id)
                if (productColorsInfo?.data) this.setProductColorsInfo(productColorsInfo?.data)

               this.set_is_all_colors_Load(true)
            } //else console.log('НЕ грузим');

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


    async  getSupplierInfo(supplierId){
        try{

            if (!this.is_supplier_info_Load) {
                const productSupplierInfo = await ApiService.APIGetSupplierInfo(supplierId)
                console.log(productSupplierInfo.data);
                if (productSupplierInfo?.data[0]) this.setSupplierInfo(productSupplierInfo?.data[0], productSupplierInfo?.data[1])
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
            this.idInfo ={isInWB : false, isInBase : false}
            const newIdInfo = await ApiService.APIGetProductStartInfo(productId)

            if (newIdInfo?.data) {

                if (newIdInfo?.data?.productInfo?.priceHistory.length>0) if (newIdInfo?.data?.productInfo?.priceHistory[0]?.d) this.startDateInBase = newIdInfo?.data?.productInfo?.priceHistory[0]?.d
                    else this.startDateInBase = 'нет данных'

                if (newIdInfo?.data?.idInfoWB?.price) if (newIdInfo?.data?.idInfoWB?.price>0){
                    const dt = new Date().toLocaleDateString()
                    const nowPrice =  {d: dt, sp: newIdInfo?.data?.idInfoWB?.price, q:newIdInfo?.data?.idInfoWB?.totalQuantity? newIdInfo?.data?.idInfoWB?.totalQuantity : 0}
                    if (newIdInfo?.data?.productInfo?.priceHistory.at(-1).d === dt) newIdInfo?.data?.productInfo?.priceHistory.pop()
                    newIdInfo?.data?.productInfo?.priceHistory.push(nowPrice)
                }
                this.idInfo = newIdInfo?.data

            }

        } catch (e) {
                        console.log(e)
        }
    }


    async  getProductPhoto(productId){
        try{
            this.setPhotoUrlArray([])
            const productPhoto = await WbService.loadPhotoUrl(productId)
            if (productPhoto) {
                this.setPhotoUrlArray(productPhoto)
            }

        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }


    async  getProductAbout(productId){
        try{

            this.setProductAbout(null)
            this.colors = []
            this.idAddInfo = {imt_name : '', nm_colors_names : ''}
            const data = await WbService.WB_APIGetIdColors(productId)

            if (data.colors) this.colors = data.colors
            this.idAddInfo = {imt_name : data.imt_name? data.imt_name : '', nm_colors_names : data.nm_colors_names? data.nm_colors_names : ''}

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
                    // this.setProductInfo(productInfo?.data[1])
                    if (productInfo?.data[1]?.priceHistory[0]?.d) this.startDateInBase = productInfo?.data[1]?.priceHistory[0]?.d

                    if (productInfo?.data[1].price) if (productInfo?.data[1].price >0 )
                    {
                        const dt = new Date().toLocaleDateString()
                        const nowPrice =  {d: dt, sp: productInfo?.data[1].price, q:productInfo?.data[1]?.totalQuantity? productInfo?.data[1]?.totalQuantity : 0}
                        if (productInfo?.data[1]?.priceHistory.at(-1).d === dt) productInfo?.data[1]?.priceHistory.pop()
                        productInfo?.data[1]?.priceHistory.push(nowPrice)

                    }

                    this.setProductInfo(productInfo?.data[1])
                } else this.startDateInBase = 'нет данных'

                // this.setProductInfo(productInfo?.data)
            }
        } catch (e) {
            // this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }





}
