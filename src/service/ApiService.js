import $api_client from '../http/index'
import $api_serv_update from '../service/serv_api'
import $api_serv_load from '../service/serv_api_load'


export default class ApiService {

    //************************  Команды серверу обновления *******************************

    static async APILoadNewProducts(loadPageCount, loadOnlyNew):Promise{
        return $api_serv_load.get(`/loadNewProducts`, { params: {
                loadPageCount : loadPageCount,
                loadOnlyNew : loadOnlyNew }, })
    }

    static async APILoadAllTask(deleteIdList):Promise{
        return $api_serv_load.get(`/getAllTask`, { params: {deleteIdList : deleteIdList} })
    }


    static async APIGetCurrServerInfo():Promise{
        return $api_serv_load.get(`/getCurrServerInfo`)
    }

    static async APIGetAllProductCount():Promise{
        return $api_serv_load.get(`/getAllProductCount`)
    }

    static async APIGetWBCatalog_fromWB():Promise{
        return $api_serv_load.get(`/getWBCatalog_fromWB`)
    }

    static async deleteDuplicateID():Promise{
        return $api_serv_load.get('/deleteDuplicateID')
    }

    static async setNoUpdateProducts():Promise{
        return $api_serv_load.get('/setNoUpdateProducts')
    }


    // Запрос на парсинг каталога товаров с ВБ
    static async loadApiTestFunc():Promise{
        return $api_serv_load.get('/test')
    }

    static async APIUploadTest():Promise{
        return $api_serv_load.post(`/uploadNewWordStatisticData`)
    }
    //************************  ******************** *******************************


    // Команда на обновление данные
    static async testFunc():Promise{
        return $api_serv_update.get('/test')
    }

    // Получить расчет с сервера (для проверки внутреннего и внешнего расчета)
    static async getMathData(id):Promise{
        return $api_serv_update.get(`/getMathData/${parseInt(id)}`)
    }

    static async deleteZeroID():Promise{
        return $api_serv_update.get('/deleteZeroID')
    }



    static async APIGetLiteWBCatalog():Promise{
        return $api_client.get('/getLiteWBCatalog')
    }

    static async APIGetProductList(catalogID):Promise{

        return $api_client.get(`/getProductList/${parseInt(catalogID)}`)
    }

    static async APIGetProductColorsInfo(id):Promise{
        return $api_client.get(`/getProductColorsInfo/${parseInt(id)}`)
    }

    static async APIGetCompetitorSeeAlsoInfo(id):Promise{
        return $api_client.get(`/getCompetitorSeeAlsoInfo/${parseInt(id)}`)
    }
    static async APIGetCompetitorSeeFindInfo(id, findText):Promise{
        return $api_client.post(`/getCompetitorSeeFindInfo`,
            {
                id:id,
                findText : findText
            }
        )
    }

    static async APIDuplicateTest(id, cat1, cat2):Promise{
        return $api_client.post(`/duplicateTest`,
            {
                id:id,
                cat1 : cat1,
                cat2 : cat2
            }
        )
    }

    static async APIGetCompetitorSeePhotoInfo(id):Promise{
        return $api_client.get(`/getCompetitorSeePhotoInfo/${parseInt(id)}`)
    }


    static async APIGetSupplierInfo(supplierId):Promise{
        return $api_client.get(`/getSupplierInfo/${parseInt(supplierId)}`)
    }

    static async APIGetPositionsInfo(id, searchArray):Promise{
        return $api_client.post(`/getPositionsInfo`,
            {
                 id:id,
                 searchArray : searchArray
            }
        )
    }

    static async APIGetIDInfo(id):Promise{
        return $api_client.get(`/getIdInfo/${parseInt(id)}`)
    }

    static async APISearchTest():Promise{
        return $api_client.get(`/searchTest`)
    }



    static async APISearchWordUpload():Promise{
        return $api_client.post(`/searchWordsUpload`)
    }


    static async APIGetProductInfo(id):Promise{

        return $api_client.get(`/getProductInfo/${parseInt(id)}`)
    }

    // Универсальный запрос если надо обраьатывать ошибку пока не использую
    static async ApiClientGet(url){
        let result = null
        result = await $api_client.get(url)
            .then(response => {
                result = response
                // do stuff
            })
            .catch(err => {
                result = null
                console.log(err.code);
            })

        return  result
    }
    static async APIGetProductPhoto(id):Promise{
        return $api_client.get(`/getProductPhoto/${parseInt(id)}`)
    }

    static async APIGetProductStartInfo(id):Promise{
        return $api_client.get(`/getProductStartInfo/${parseInt(id)}`)
    }

    static async APIGetProductAbout(id):Promise{

        return $api_client.get(`/getProductAbout/${parseInt(id)}`)
    }

};


