
function formatCurrency(txt) {
    let res = ''
    if (!txt) txt = 0
    if (txt) try {
        let data = txt.toString().split( /(?=(?:...)*$)/ )
        for (let i in data)
            res += data[i]+' '
    } catch (e){
        res = ' - '
    }
    if (res === '') res = '0'
    return res+' р.'
}

function getDataFromHistory (productInfo, daysCount = 30, all2005Year = false ){
    let dayCount = daysCount
    if (all2005Year){
        // const now = Date.now()
        const nowDay = new Date(Date.now())

        const dateStart = new Date(2025, 0, 0)
        dayCount  = Math.round((nowDay.getTime() - dateStart.getTime())/(1000 * 60 * 60 * 24));

    }

    const history = productInfo.priceHistory        // История загр с БД
    let dateArray = []                              // Массив дат
    let quantityArray = []                          // Массив изм кол-ва
    let addQuantityArray = []                       // Массив поступлений
    let saleArray = []                              // Массив продаж
    let returnArray = []                            // массив возвратов
    let salePriceArray = []                         // Массив изм-я цены
    let totalSaleQuantity = 0                       // Общее кол-во продаж за период
    let totalMoney = 0                              // Общий оборот за период
    let startDateInBase = ''                        // С Какой даты товар в базе
    let addQuantity = 0                             // Поступления
    let minPrice = 0                                // минимальная цена
    let maxPrice = 0                                // максимальная цена
    let startQuantity = 0                           // Остатки на начало анализа
    let addSQ = 0                                   // Сколько пришло на склад если это поступление
    let crDate = new Date()

    if (history?.length >0) {
        // console.log(history.at(-1));
        startDateInBase = history[0].d

        let arIdx = -1
        let isError = false
        let d = ''
        let sp = 0
        let q = 0
        let sq = 0
        let counter = 0
        for (let i = dayCount; i > 0; i--) {
            counter ++
            // Сначала возмем отчетный день - последний
            if (i === dayCount) {
                crDate = new Date();
                q = productInfo.totalQuantity
                sp = productInfo.price

                sq = 0
                arIdx--
                minPrice = sp
                maxPrice = sp

            } else {
                crDate.setDate(crDate.getDate() - 1);
                addSQ = 0
                // Если послдений день истории
                if (Math.abs(arIdx) >  history.length){
                    sq = 0
                    q = 0
                    sp = 0
                }

                if (Math.abs(arIdx) <=  history.length){

                    let d_tmp =  history.at(arIdx).d
                    sq = 0
                    // проверим есть ли дата внутри
                    if (crDate.toLocaleDateString() === d_tmp){
                        sq = history.at(arIdx).q - q
                        q = history.at(arIdx).q
                        // Если отрицательное кол-во продаж то возможно это поступление! выясним это

                        if (sq < 0){
                            const absSQ = -1*sq


                            // Если минус больше 5 или остатки ДО .. то это поступление иначе возврат
                            if ((absSQ >= q-2) || (absSQ>3)) {
                                addSQ = absSQ
                                sq = 0
                            }

                        }
                        // console.log(d_tmp+ ' sq ' + sq + ' sp '+sp);
                        totalSaleQuantity += sq
                        totalMoney += sq*sp
                        // console.log(' totalSaleQuantity ' + totalSaleQuantity + ' totalMoney '+totalMoney);

                        if (history.at(arIdx).sp>0) {
                            sp = history.at(arIdx).sp
                            if (sp>maxPrice) maxPrice = sp
                            if (sp<minPrice) minPrice = sp
                        }
                        arIdx--
                    }
                }




            }




            dateArray.push(crDate.toLocaleDateString())
            quantityArray.push(q)

            if (Math.abs(arIdx)-1 <=  history.length){
                if (sp>0) salePriceArray.push(sp)
                    else salePriceArray.push(null)
            } else { salePriceArray.push(null)
                if (startQuantity === 0) startQuantity = q
                q = 0}

            if (sq>0){ saleArray.push(sq)
                returnArray.push(0)}
                else {saleArray.push(0)
                returnArray.push( -1*sq)}


            addQuantityArray.push(addSQ)
            addQuantity+=addSQ

            if (isError) break
        }

        if (totalSaleQuantity <= 0) {
            totalSaleQuantity = 0
            totalMoney = 0
        }

        if (startQuantity === 0){
            if (history.length>0) startQuantity = history[0].q
        }

    }



    saleArray.push(0)
    const resultData = {
        startDateInBase : startDateInBase,
        totalSaleQuantity : totalSaleQuantity,
        totalMoney : totalMoney,
        totalQuantity : productInfo.totalQuantity,
        addQuantity : addQuantity,
        price :productInfo.price,
        minPrice : minPrice,
        maxPrice : maxPrice,
        meanPrice :  Math.floor((maxPrice+minPrice)/2),
        startQuantity : startQuantity
    }

    return [dateArray.reverse(), quantityArray.reverse(), saleArray.reverse(), salePriceArray.reverse(),addQuantityArray.reverse(), returnArray.reverse(), resultData]
}

function get30DaysSaleInfoFromHistory (productInfo){
    const history = productInfo.priceHistory        // История загр с БД
    const dayCount = 30                             // Колл-во дней анализа

    let totalSaleQuantity = 0                       // Общее кол-во продаж за период
    let totalMoney = 0                              // Общий оборот за период

    let crDate = new Date()

    if (history?.length >0) {


        let arIdx = -1
        let d = ''
        let sp = 0
        let q = 0
        let sq = 0
        let counter = 0
        for (let i = dayCount; i > 0; i--) {
            counter ++
            // Сначала возмем отчетный день - последний
            if (i === dayCount) {
                crDate = new Date();
                q = productInfo.totalQuantity
                sp = productInfo.price

                sq = 0
                arIdx--

            } else {
                crDate.setDate(crDate.getDate() - 1);

                // Если послдений день истории
                if (Math.abs(arIdx) >  history.length){
                    sq = 0
                    q = 0
                    sp = 0
                }

                if (Math.abs(arIdx) <=  history.length){

                    let d_tmp = d = history.at(arIdx).d
                    sq = 0
                    // проверим есть ли дата внутри
                    if (crDate.toLocaleDateString() === d_tmp){
                        sq = history.at(arIdx).q - q
                        q = history.at(arIdx).q
                        // Если отрицательное кол-во продаж то возможно это поступление! выясним это

                        if (sq < 0){
                            const absSQ = -1*sq
                            // Если минус больше 5 или остатки ДО .. то это поступление иначе возврат
                            console.log(q);
                            if ((absSQ >= q-2) || (absSQ>5)) {
                                sq = 0
                            }

                        }
                        // console.log(d_tmp+ ' sq ' + sq + ' sp '+sp);
                        totalSaleQuantity += sq
                        totalMoney += sq*sp
                        // console.log(d_tmp + 'totalSaleQuantity = '+totalSaleQuantity+' totalMoney = '+totalMoney);
                        if (history.at(arIdx).sp>0) {
                            sp = history.at(arIdx).sp

                        }
                        arIdx--
                    }
                }

            }
        }
    }


    const resultData = {
        totalSaleQuantity : totalSaleQuantity,
        totalMoney : totalMoney,
    }

    return resultData
}
export {getDataFromHistory, get30DaysSaleInfoFromHistory, formatCurrency}