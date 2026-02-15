
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
        else if (shortId <= 5189)  basket = '27' // есть шаг 312
        else if (shortId <= 5501)  basket = '28'
        else if (shortId <= 5813)  basket = '29'
        else if (shortId <= 6125)  basket = '30'
        else if (shortId <= 6437)  basket = '31'
        else if (shortId <= 6749)  basket = '32'
        else if (shortId <= 7061)  basket = '33'
        else if (shortId <= 7373)  basket = '34'
        else if (shortId <= 7685)  basket = '35'
        else  basket = '36'
        /// Вроде как 312 шаг стабильный полс время


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

    static async WB_APIGetIdColors(id){

        const shortId = Math.floor(id / 100000)
        const part = Math.floor(id / 1000)
        const basket = this.PARSER_GetBasketFromID(shortId)
        const url = `https://basket-${basket}.wbbasket.ru/vol${shortId}/part${part}/${id}/info/ru/card.json`
        const productData = await this.PARSER_GetIAbout(url)


        return productData
    }

    static getLittleProductPhoto(id){
        const shortId = Math.floor(id / 100000)
        const part = Math.floor(id / 1000)
        const basket = this.PARSER_GetBasketFromID(shortId)
        return `https://basket-${basket}.wbbasket.ru/vol${shortId}/part${part}/${id}/images/tm/1.webp`
    }


    static async PARSER_GetIAbout(url) {

        let needGetData = true
        let aboutData = {}
        while (needGetData) {  // Делаем в цикле т.к. вдруг вылетит частое подключение к серверу то перезапустим
            try {

                const res =  await axios.get(url).then(response => {
                    let resData = response.data

                    try {

                        const colors = []

                        if (resData.colors) {
                            let sortId = []
                            if (resData.colors) sortId = resData.colors.sort((a, b) => a - b);

                            for (let i in sortId) colors.push({
                                id: sortId[i],
                                photoUrl: this.getLittleProductPhoto(sortId[i])
                            })
                        }

                        const data = {
                            imt_name        : resData.imt_name? resData.imt_name : '',
                            nm_colors_names : resData.nm_colors_names? resData.nm_colors_names : '',
                            colors          : colors

                        }
                        aboutData = data


                    } catch (err) {console.log(err);                  }


                })

                needGetData = false

            }  catch (err)  {needGetData = await this.view_error(err, 'PARSER_GetIAbout', 'url = '+url)}
        }
        return aboutData
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
        console.log(funcName)
        console.log(funcParam)
        await delay(100);
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


