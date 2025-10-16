
import $api_client from "../http";
const axios = require('axios-https-proxy-fix');

export default class WbService {



    static async WB_APIGetSearchResult(searchQuery,pageCount){
        let idList = []
        let data = []
        let addQuery = []


        // const maxPage = pageCount? pageCount : 1

        const maxPage= pageCount
        let needGetData = true
        let needGetNextProducts = true


        // Получим фильтры
        while (needGetData) {
            let url = `https://u-search.wb.ru/exactmatch/ru/common/v18/search?dest=-1255987&query=`+ searchQuery+`&resultset=filters&spp=30&suppressSpellcheck=false`
            url = encodeURI(url)
            await axios.get(url).then(response => {
                data = response.data?.data? response.data.data : []
            })
            needGetData = false
        }
        // Получим доп ссылки
        needGetData = true
        while (needGetData) {
            let url = `https://u-search-tags.wb.ru/search-tags/api/v2/search/query?query=` + searchQuery
            url = encodeURI(url)
            try {
                await axios.get(url).then(response => {
                    addQuery = response.data?.query ? response.data.query : []
                })
                needGetData = false
            } catch (err) {
                needGetData = await this.view_error(err, 'LoadIdListBySearchParam', 'getAddQuery')
            }
        }
        // Получим списки товаров
        needGetData = true
        for (let i = 1; i <= maxPage; i++) {
            let page = i
            needGetData = true
            while (needGetData) {  // Делаем в цикле т.к. вдруг вылетит частое подключение к серверу то перезапустим
                try {
                    let  url2 = `https://u-search.wb.ru/exactmatch/ru/common/v18/search?ab_testing=false&appType=1&curr=rub&dest=33&inheritFilters=false&lang=ru&page=${page}&query=`+
                        searchQuery+`&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false`
                    url2 = encodeURI(url2)
                    await axios.get(url2).then(response => {
                        const products = response.data?.products? response.data?.products : []
                        if (products) {

                            for (let k in products)
                                try {
                                    let price = 0
                                    let basicPrice = 0
                                    let discount = 0
                                    let totalQuantity = products[k].totalQuantity? products[k].totalQuantity : 0

                                    if (totalQuantity > 0) {
                                        // Поиск цен. Пробегаемся по остаткам на размерах и если находим то прекращаем писк. Тут важно что если на остатках в размере 0 то и цен не будет
                                        if (products[k].sizes)
                                            for (let z in products[k].sizes) {
                                                if (products[k].sizes[z]?.price) {
                                                    price = products[k].sizes[z]?.price?.product ? Math.round(parseInt(products[k].sizes[z]?.price?.product) / 100) : -1
                                                    basicPrice = products[k].sizes[z]?.price?.basic ? Math.round(parseInt(products[k].sizes[z]?.price?.basic) / 100) : -1
                                                    if (basicPrice>0) discount = Math.round( 100 * (basicPrice - price)/basicPrice )
                                                    break
                                                }
                                            }
                                    }
                                    idList.push({
                                        id               : products[k].id,
                                        price           : price,
                                        basicPrice      : basicPrice,
                                        discount        : discount,
                                        brand            : products[k].brand? products[k].brand : '',
                                        name             : products[k].name? products[k].name : '',
                                        supplier	     : products[k].supplier? products[k].supplier : ''	,
                                        supplierRating   : products[k].supplierRating? products[k].supplierRating : 0,
                                        reviewRating     : products[k].reviewRating? products[k].reviewRating : 0,
                                        totalQuantity    : totalQuantity,
                                        photoUrl        : '',
                                    })
                                } catch (e) {}
                            try { if (products.length<100) needGetNextProducts = false } catch (e) {needGetNextProducts = false}
                        }
                    })
                    needGetData = false
                } catch (err) {needGetData = await this.view_error(err, 'PARSER_LoadIdListBySearchParam', 'page = '+page)}
            }
            if (!needGetNextProducts) break
        }

        // Получим актуальные цена на "сейчас"
        const step2 = 350
        for (let j = 0; j < idList.length; j ++) {
            try {

                let end_j = j + step2 - 1 < idList.length ? j + step2 - 1 : idList.length - 1
                let productList = []

                for (let k = j; k <= end_j; k++)
                    productList.push(idList[k].id)


                const updateProductListInfo = await PARSER_GetProductListPriceInfo(productList)

                for (let z in updateProductListInfo)
                    for (let k in idList)
                        if (updateProductListInfo[z].id === idList[k].id) {
                            idList[k].price = updateProductListInfo[z].price
                            break
                        }

                j += step2 - 1

            } catch (error) {
                console.log(error);
            }
            // break

        }

        // TODO: Сделаем расчет параметров и отсортируем список

        const result = {
            idList : idList,
            data : data,
            addQuery : addQuery
        }
        return result


    }

    static async view_error (err, funcName, funcParam){
        let needGetData = false
        // console.log(err.code)

        // Временно не доступен сайт ВБ
        if (err.code === 'ECONNRESET') {
            await delay(50);
            needGetData = true
        }

        // Сломался интернет
        if (err.code === 'ETIMEDOUT') {
            await delay(5000);
            needGetData = true
        }


        // Сломался прокис
        if (err.code === 'ERR_SOCKET_CLOSED') {
            await delay(50);
            needGetData = true
        }

        // Частое подключение к серверу - меняем прокси
        if ((err.status === 429) || (err.response?.status === 429)) {
            await delay(50);
            needGetData = true
        }



        // Необработанная ошибка
        if (!needGetData){
            /// saveErrorLog('ProxyAndErrors', funcName+'  '+funcParam+'  '+'Необработанная ошибка err.code = '+err.code)
            console.log(funcParam + '  ' + 'Необработанная ошибка err.code = ' + err.code);
            await delay(50);
            needGetData = true
        }

        return needGetData
    }




};


