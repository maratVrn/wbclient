
import $api_client from "../http";
const axios = require('axios-https-proxy-fix');

let errorCount = 0
const maxErrorCount = 3

export default class WbService {

    static PARSER_GetBasketFromID(shortId){


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
        else if (shortId <= 4877)  basket = '26'
        else if (shortId <= 5189)  basket = '27'

        else if (shortId <= 5566)  basket = '28'
            // else if (shortId <= 5239)  basket = '29'
            // else if (shortId <= 5445)  basket = '30'
            // else if (shortId <= 5671)  basket = '31'
            // else if (shortId <= 5887)  basket = '32'
        // else if (shortId <= 6103)  basket = '33'
        else  basket = '29'
/// Вроде как 216 шаг стабильный полс время
        return basket

    }

    static async loadPhotoUrl(id){
        let photoUrl = []
        const shortId = Math.floor(id / 100000)
        const part = Math.floor(id / 1000)
        const basket = this.PARSER_GetBasketFromID(shortId)
        const mainUrl = `https://basket-${basket}.wbbasket.ru/vol${shortId}/part${part}/${id}/images/c516x688/`

        const maxPhoto = 5 // TODO: Макс кол-во мелких фото пока так харкод хотя красивее грузить все листать их
        // console.log(mainUrl + '1.webp');
        for (let i = 1; i <= maxPhoto; i++) {
            const someUrl = mainUrl +i.toString() +'.webp'
            let needAdd = true
            await axios.get(someUrl).catch((error) => {
                if (error.response.status == 404) {  needAdd = false  }});
            if (needAdd) photoUrl.push(someUrl)

        }

        return photoUrl
    }


    static async WB_APIGetSearchResult(searchQuery,pageCount){
        let idList = []
        let onlyIdList = []
        let data = []
        let addQuery = []


        // const maxPage = pageCount? pageCount : 1

        const maxPage= pageCount
        let needGetData = true
        let needGetNextProducts = true


        // Получим фильтры
        while (needGetData) {
            let url = `https://u-search.wb.ru/exactmatch/ru/common/v18/search?dest=-1255987&query=`+ searchQuery+`&resultset=filters&spp=30&suppressSpellcheck=false`
            // console.log(url);
            url = encodeURI(url)
            await axios.get(url).then(response => {
                data = response.data?.data? response.data.data : []
            })
            needGetData = false
        }

        // // TODO: Если не находит по ИД один товар то можно пробовать проверять через баскет информацию
        // needGetData = true
        // while (needGetData) {
        //     let url = `https://basket-29.wbbasket.ru/vol5776/part577659/577659866/info/ru/card.json`
        //
        //     url = encodeURI(url)
        //     await axios.get(url).then(response => {
        //         data = response.data?.data? response.data.data : []
        //         console.log(data);
        //     })
        //     needGetData = false
        // }


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
                    // ВАЖНО dest влияет на результат выдачи иногда левые бывают при -1255987  иногда при 33... в общем надо подобрать оптимальное
                    // при 33 вроде левых нету
                    // let  url2 = `https://u-search.wb.ru/exactmatch/ru/common/v18/search?dest=33&page=${page}&query=`+
                    //     searchQuery+`&resultset=catalog&spp=30&`

                    let  url2 = `https://u-search.wb.ru/exactmatch/ru/common/v18/search?dest=-1255987&page=${page}&query=`+
                        searchQuery+`&resultset=catalog&spp=30&`

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
                                    onlyIdList.push({id               : products[k].id})
                                } catch (e) {}
                            try { if (products.length<100) needGetNextProducts = false } catch (e) {needGetNextProducts = false}
                        }
                    })
                    needGetData = false
                } catch (err) {needGetData = await this.view_error(err, 'PARSER_LoadIdListBySearchParam', 'page = '+page)}
            }
            if (!needGetNextProducts) break
        }



        const result = {
            data : {idList : idList,
                data : data,
                addQuery : addQuery,
                onlyIdList : onlyIdList}
        }
        return result


    }

    static async PARSER_GetProductListPriceInfo(productIdList) {

        let productListInfo = []
        let needGetData = true

        let productListStr = ''
        for (let i in productIdList) {
            if (i>0) productListStr += ';'
            productListStr += parseInt(productIdList[i]).toString()
        }
        while (needGetData) {
            try {



                // const url = `https://card.wb.ru/cards/v2/detail?&curr=rub&dest=-3390370&spp=30&nm=`+productListStr+`.json`
                const url = `https://u-card.wb.ru/cards/v4/list?&curr=rub&dest=-3390370&spp=30&nm=`+productListStr+`.json`
                // https://u-card.wb.ru/cards/v4/list?appType=1&curr=rub&dest=-1255987&spp=30&hide_dtype=11&ab_testing=false&ab_testing=false&lang=ru&nm=262287364;551531429;301356495;262289308;261883078;552320311;431959061;421044437;552345229;455380741;241223202;94773784;216868266;274424587;67791955;253223571;224358911;149635545;46284932;138993221;181373100;265787268;387966701;312029606;384677128;282308702;439935219;311817397;198227419;238976900;449232156;411995555;183615299;235907570;238979249;244811244;293348934;305983939;384627349;199035749;240448726;145126405;235212618;451132792;235212209;238975002;253223539;134683314;237308176;314308738
                await axios.get(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    credentials: 'same-origin',
                }).then(response => {
                    console.log('ssss-----------');
                    const resData = response.data
                    if (resData.data) {

                        for (let i in resData.data.products){
                            const currProduct = resData.data.products[i]

                            let price = -1
                            for (let k in currProduct.sizes) {
                                if (currProduct.sizes[k]?.price) {
                                    price = currProduct.sizes[k]?.price?.product ? Math.round(parseInt(currProduct.sizes[k]?.price?.product)  / 100): -1
                                    break
                                }
                            }
                            const newProduct = {
                                id              : currProduct?.id ? currProduct.id : 0,
                                price           : price,

                            }
                            productListInfo.push(newProduct)
                        }
                    }})
                needGetData = false
            } catch (err) {
                needGetData = await this.view_error(err, 'PARSER_GetProductListInfo', 'noData ')
            }
        }
        return productListInfo
    }

    static async view_error (err, funcName, funcParam){
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        let needGetData = false
        // console.log(err.code)
        await delay(50);
        errorCount += 1
        if (errorCount <= maxErrorCount){
            needGetData = true
        } else errorCount = 0


        //
        // // Временно не доступен сайт ВБ
        // if (err.code === 'ECONNRESET') {
        //     await delay(50);
        //     needGetData = true
        // }
        //
        // // Сломался интернет
        // if (err.code === 'ETIMEDOUT') {
        //     await delay(5000);
        //     needGetData = true
        // }
        //
        //
        // // Сломался прокис
        // if (err.code === 'ERR_SOCKET_CLOSED') {
        //     await delay(50);
        //     needGetData = true
        // }
        //
        // // Частое подключение к серверу - меняем прокси
        // if ((err.status === 429) || (err.response?.status === 429)) {
        //     await delay(50);
        //     needGetData = true
        // }
        //
        //
        //
        // // Необработанная ошибка
        // if (!needGetData){
        //     /// saveErrorLog('ProxyAndErrors', funcName+'  '+funcParam+'  '+'Необработанная ошибка err.code = '+err.code)
        //     console.log(funcParam + '  ' + 'Необработанная ошибка err.code = ' + err.code);
        //     await delay(50);
        //     needGetData = true
        // }

        return needGetData
    }




};


