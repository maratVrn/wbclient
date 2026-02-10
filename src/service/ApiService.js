import $api_client from '../http/index'
import $api_serv_load from '../service/serv_api_load'


export default class ApiService {

    //************************  Команды серверу обновления *******************************

    static async APILoadNewProducts(loadPageCount, loadOnlyNew):Promise{
        return $api_serv_load.get(`/loadNewProducts`, { params: {
                loadPageCount : loadPageCount,
                loadOnlyNew : loadOnlyNew }, })
    }


    static async APIUpdateAllProductList(needCalcData, updateAll):Promise{
        return $api_serv_load.get(`/updateAllProductList`, { params: {
                needCalcData : needCalcData,
                updateAll : updateAll }, })
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
        return $api_serv_load.get('/wbServerTest')
    }

    static async APIUploadTest():Promise{
        return $api_serv_load.post(`/uploadNewWordStatisticData`)
    }

//  **************            Упралвение стартовыми товарами                *****************************
    static async APIGetLoadStartProducts( needDelete, deleteIdList):Promise{
           return $api_client.post(`/loadStartProducts`,
            {
                needDelete       :   needDelete,
                deleteIdList : deleteIdList
            }
        )

    }

    static async APIAddStartProduct(id, startDiscount, startQty, startPrice, priceHistory):Promise{
        return $api_client.post(`/addStartProduct`,
            {
                id :   id,
                startDiscount       :   startDiscount,
                startQty : startQty,
                startPrice :  startPrice,
                priceHistory : priceHistory
            }
        )
    }

//  **************            Упралвение разделами каталога и предметами                *****************************
    static async APIGetCatalogInfo():Promise{
        return $api_serv_load.get('/getCatalogInfo')
    }

    static async APIAddSubjectsInCatalog(id, newSubjects):Promise{
        return $api_serv_load.post(`/addSubjectsInCatalog`,
            {
                id :   id,
                newSubjects       :   newSubjects
            }
        )
    }

    static async APISaveAllSubjectsToFile():Promise{
        return $api_serv_load.get('/saveAllSubjectsToFile')
    }


    static async APILoadAllSubjectsFromFile():Promise{
        return $api_serv_load.get('/loadAllSubjectsFromFile')
    }



    static async APISaveSearchDataToFile():Promise{
        return $api_serv_load.get('/saveSearchDataToFile')
    }


    static async APILoadSearchDataFromFile():Promise{
        return $api_serv_load.get('/loadSearchDataFromFile')
    }


    static async APIGetCatalogIdInfo(id, needDelete, deleteIdList):Promise{
        return $api_serv_load.post(`/getCatalogIdInfo`,
            {
                id :   id,
                needDelete       :   needDelete,
                deleteIdList : deleteIdList
            }
        )
    }



    //************************  ******************** *******************************



    static async APIGetLiteWBCatalog():Promise{
        return $api_client.get('/getLiteWBCatalog')
    }



    static async APIGetProductList(searchParam):Promise{

        return $api_client.post(`/getProductList`,searchParam)
    }

    static async APIGetSearchResult(searchQuery, param):Promise{
        return $api_client.post(`/getSearchResult`,
            {
                searchQuery :   searchQuery,
                param       :   param,

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



    static async APIClientTest():Promise{
        return $api_client.get(`/wbServerTest`)
    }


    static async APIGetProductInfo(id):Promise{
        return $api_client.get(`/getProductInfo/${parseInt(id)}`)
    }




    static async APIGetProductStartInfo(id):Promise{
        return $api_client.get(`/getProductStartInfo/${parseInt(id)}`)
    }

    static async APIGetSimilarProducts(id):Promise{
        return $api_client.get(`/getSimilarProducts/${parseInt(id)}`)
    }

    //  **************            Упралвение статистикой поведения изверей              *****************************
    static async APIUserGoToWB():Promise{
        return $api_client.get(`/userGoToWB`)
    }


    static async APILoadAllUserStat( startDate, endDate, needDelete, deleteIdList):Promise{
        return $api_client.post(`/loadAllUserStat`,
            {
                startDate : startDate,
                endDate : endDate,
                needDelete       :   needDelete,
                deleteIdList : deleteIdList
            }
        )

    }

    //  **************            Регистрация/Логин пользователей              *****************************
    static async APIUserRegistration(formData):Promise{
        return $api_client.post(`/registration`,
            {
                formData       :   formData,
            }
        )

    }
    static async APIUserUpdatePassword(email):Promise{
        return $api_client.post(`/updatePassword`,
            {
                email       :   email,
            }
        )
    }
    static async APIUserNewPassword(password, link):Promise{
        return $api_client.post(`/newPassword`,
            {
                password       :   password,
                link : link
            }
        )
    }



    static async APIUserTokenTest(token):Promise{
        return $api_client.post(`/tokenTest`,
            {
                token  :   token,
            }
        )

    }




    static async APIUserLogin(formData):Promise{
        return $api_client.post(`/login`,
            {
                formData       :   formData,
            }
        )

    }

    static async APIUserAddProductInfo(newAddProduct, userId):Promise{
        return $api_client.post(`/addTrackProducts`,
            {
                userId  :  userId,
                addProductInfo : newAddProduct
            }
        )

    }

    static async APISaveCurTrackProductData(userId, trackProduct):Promise{
        return $api_client.post(`/saveTrackProduct`,
            {
                userId  :  userId,
                trackProduct       :   trackProduct,

            }
        )

    }

    static async APIUpdateAllTrackProducts():Promise{
        return $api_client.post(`/updateAllTrackProducts`,
            {


            }
        )

    }

    static async APIGetLoadTrackProducts(userId, needDelete, deleteIdList):Promise{
        return $api_client.post(`/loadTrackProducts`,
            {
                userId  :  userId,
                needDelete       :   needDelete,
                deleteIdList : deleteIdList
            }
        )

    }



};


