
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
function getDataFromHistoryYear(productInfo){
    let months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];

    let dateArrayAll = []                              // Массив дат
    let quantityArrayAll = []                          // Массив изм кол-ва
    let addQuantityArrayAll = []                       // Массив поступлений
    let saleArrayAll = []                              // Массив продаж
    let returnArrayAll = []                            // массив возвратов
    let salePriceArrayAll = []                         // Массив изм-я цены
    let monthArray = []
    let saleArrayMonth = []
    let saleMoneyArrayMonth = []
    let pInfo = {}
    let m_idx = 0

    let productInfoMArray = []
    let currHistory = []
    let addEndHistory = []
    let m_count = 0
    let d_start = 0
    let needAdd = true
    let  endDay = 31
    try {endDay = parseInt(productInfo.priceHistory.at(-1).d.split('.')[0]) } catch (e) {}
    let  endMonth = 12
    try {endMonth = parseInt(productInfo.priceHistory.at(-1).d.split('.')[1]) } catch (e) {}

    for (let i in productInfo.priceHistory) {

        const d_arr = productInfo.priceHistory[i].d.split('.')
        let crDay = parseInt(d_arr[0])
        let crMonth = parseInt(d_arr[1])

        if ((crDay > endDay) && (crMonth === endMonth-1))   addEndHistory.push(productInfo.priceHistory[i])

        if (d_start === 0) d_start = crDay

        if (parseInt(d_arr[1]) > m_idx) {
            // Начался новый месяц
            if (m_count > 0) {
                productInfoMArray.push({
                    priceHistory: currHistory,
                    m_name: months[m_idx - 1],
                    m_idx : m_idx
                })
            }
            m_idx = parseInt(d_arr[1])
            m_count++
            currHistory = []
        }
        currHistory.push(productInfo.priceHistory[i])
        if ((needAdd) && (m_count === 2)){
            if (d_start > parseInt(d_arr[0])) productInfoMArray[0].priceHistory.push(productInfo.priceHistory[i])
                else needAdd = false
        }

    }
    productInfoMArray.push({
        priceHistory : [...addEndHistory, ...currHistory],
        m_name : months[m_idx-1],
        m_idx : m_idx
    })
    let allSaleCount = 0
    let allSaleMoney = 0
    for (let i in productInfoMArray) {
        monthArray.push(productInfoMArray[i].m_name)

        const [dateArray, quantityArray, saleArray, salePriceArray,addQuantityArray, returnArray, resultData] =
            getDataFromHistory(productInfoMArray[i], 31)
        let dateArrayC = []                              // Массив дат
        let quantityArrayC = []                          // Массив изм кол-ва
        let addQuantityArrayC = []                       // Массив поступлений
        let saleArrayC = []                              // Массив продаж
        let returnArrayC = []                            // массив возвратов
        let salePriceArrayC = []                         // Массив изм-я цены

        let saleMonth = 0
        let saleMoneyMonth = 0

        // console.log('m_idx = '+productInfoMArray[i].m_idx);
        for (let k in dateArray) {
            const d_arr = dateArray[k].split('.')

            let crMonth = parseInt(d_arr[1])
            if (crMonth === productInfoMArray[i].m_idx){
                dateArrayC.push(dateArray[k])
                quantityArrayC.push(quantityArray[k])
                addQuantityArrayC.push(addQuantityArray[k])
                saleArrayC.push(saleArray[k])
                returnArrayC.push(returnArray[k])
                salePriceArrayC.push(salePriceArray[k])
                let crSaleCount = saleArray[k] - returnArray[k]
                saleMonth += crSaleCount
                saleMoneyMonth += crSaleCount * salePriceArray[k]
            }
        }
        if (saleMonth<0) saleMonth = 0
        if (saleMoneyMonth<0) saleMoneyMonth = 0
        saleArrayMonth.push(saleMonth)
        saleMoneyArrayMonth.push(saleMoneyMonth)
        allSaleCount += saleMonth
        allSaleMoney += saleMoneyMonth
        dateArrayAll = [...dateArrayAll, ...dateArrayC]
        quantityArrayAll = [...quantityArrayAll, ...quantityArrayC]
        addQuantityArrayAll = [...addQuantityArrayAll, ...addQuantityArrayC]
        saleArrayAll = [...saleArrayAll, ...saleArrayC]
        returnArrayAll = [...returnArrayAll, ...returnArrayC]
        salePriceArrayAll = [...salePriceArrayAll, ...salePriceArrayC]


       // console.log('dateArray');
        // console.log(dateArrayC)

    }
    pInfo = {
        allSaleCount :allSaleCount,
        allSaleMoney :allSaleMoney,
    }

    const calcData = {
        dateArray : dateArrayAll,
        quantityArray : quantityArrayAll,
        saleArray : saleArrayAll,
        salePriceArray : salePriceArrayAll,
        addQuantityArray : addQuantityArrayAll,
        returnArray : returnArrayAll,
        monthArray : monthArray,
        saleArrayMonth : saleArrayMonth,
        saleMoneyArrayMonth : saleMoneyArrayMonth,
        pInfo : pInfo
    }

    return calcData


}

function getDataFromHistory (productInfo, daysCount = 30, isFbo = false, all2025Year = false ){
    let dayCount = daysCount
    if (all2025Year){
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


    let realDayCounter = -1

    if (history?.length >0) {

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
                // crDate = new Date();
                // q = productInfo.totalQuantity
                // sp = productInfo.price

                // try{
                    const s = history.at(-1).d.split('.')
                    crDate = new Date(s[2]+'-'+s[1]+'-'+s[0]);

                    // console.log('crDate = '+crDate.toDateString());
                    // console.log(history.at(-1));
                    q = parseInt(history.at(-1).q)
                    sp = parseInt(history.at(-1).sp)
                // } catch (e) {}

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
                    if (realDayCounter<0) realDayCounter = counter
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
                q = 0}

            // console.log(crDate.toLocaleDateString()+ ' sq = '+sq+ ' addSQ = '+addSQ+ ' sq_day_1 = '+saleArray.at(-1));
            if (sq>0){
                saleArray.push(sq)
                returnArray.push(0)
            }
                else {
                    returnArray.push( -1*sq)
                    sq = 0
                    saleArray.push(sq)
                }


            addQuantityArray.push(addSQ)
            addQuantity+=addSQ



            if (isError) break
        }





    }



    saleArray.push(0)
    dateArray = dateArray.reverse()
    quantityArray = quantityArray.reverse()
    saleArray = saleArray.reverse()
    salePriceArray = salePriceArray.reverse()
    addQuantityArray = addQuantityArray.reverse()
    returnArray = returnArray.reverse()

    // Определим стартовые остатки

    for (let i in quantityArray){
        if (quantityArray[i]>0){
            startQuantity = quantityArray[i]
            break
        }
    }


    // КРУТОЙ АЛГОРИТМ ОПРЕДЕЛЕНИЯ ЛЕВЫХ ПРОДАЖ

    let isBigQuantity = false
    // for (let i in quantityArray)
    //     if (quantityArray[i]>39000) { isBigQuantity = true; break}
    if (realDayCounter < 0) realDayCounter = saleArray.length
    // Вычисления делаем только если не было больших аномальных остатков, если аномальные остатки обнуляем продажи
    if ((isBigQuantity) || (realDayCounter<5)){

        for (let i in saleArray) saleArray[i] = 0
    }
    else
    {

        let saleData = []
        for (let i in saleArray)
            if (i > 0) saleData.push({ i: i, q: saleArray[i],    meanQ: 0, })

        // отсортируем по возрастанию колличества
        saleData.sort(function (a, b) {  return a.q - b.q;});

        let addQCount = 0
        for (let i in addQuantityArray)  if (addQuantityArray[i] > 0) addQCount++

        let returnCount = 0
        for (let i in returnArray)  if (returnArray[i] > 0) returnCount++



        // console.log('realDayCounter = ' + realDayCounter);
        // console.log('addQCount = ' + addQCount);
        // console.log('returnCount = ' + returnCount);
        if (addQCount>8) addQCount = 8
        let z = saleData.length - Math.round((realDayCounter-addQCount-returnCount) / 2)
        // console.log('z = ' + z);

        let meanQ = saleData[z].q > 0 ? saleData[z].q : 1

        // console.log('meanQ = ' + meanQ);
        for (let i in saleData) {
            saleData[i].meanQ = Math.round(10000 * (saleData[i].q - meanQ) / meanQ) / 100
            if (saleData[i].meanQ > 399) saleArray[saleData[i].i] = 0
        }
        // console.log(productInfo);
        // console.log(saleData);

        // Добавим продажи в тот день когда были поступления


        // Сначала вычислим средние продажи БЕЗ поступлений
        try {
            let tsq = 0
            let qCount = 0
            for (let i in saleArray) {
                if (saleArray[i] >= 0) {
                    let q = saleArray[i]
                    if (returnArray[i]) q -= returnArray[i]
                    tsq += q
                    qCount++

                }
            }
            if (qCount>0) tsq = Math.round(tsq/qCount)

            let onePercent = tsq / 100
            tsq = Math.round(tsq * 0.8)
            // Далее добавим продажи (и увеличим сами поступления в эти дни)
            qCount = 0
            let realAddQ = 0
            for (let i in addQuantityArray) {
                if (addQuantityArray[i] > 0) {
                    let i_q = parseInt(i) + 1
                    if (i_q < saleArray.length) {
                        let a = Math.round(tsq + onePercent * qCount);
                        saleArray[i_q] = a
                        addQuantityArray[i] += a
                        realAddQ += addQuantityArray[i]
                        qCount++
                    }
                }
            }
            addQuantity = realAddQ
        } catch (e) { console.log(e);}

        // Расчитаем обьемы продаж
        for (let i in saleArray) {
            if (saleArray[i] >= 0) {
                let q = saleArray[i]
                if (returnArray[i]) q -= returnArray[i]
                totalSaleQuantity += q
                if (salePriceArray[i]) totalMoney += q * salePriceArray[i]
            }
        }

    }
    if (totalSaleQuantity <= 0) {
        totalSaleQuantity = 0
        totalMoney = 0
    }

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
        startQuantity : startQuantity,
        realDiscount : 0
    }

    return [dateArray, quantityArray, saleArray, salePriceArray,addQuantityArray, returnArray, resultData]
}


export {getDataFromHistory,  formatCurrency, getDataFromHistoryYear}