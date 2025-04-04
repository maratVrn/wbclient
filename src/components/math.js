
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

    // Тут идет очень умный расчет как вычислить аномалии и удалить их если склад НЕ ФБС
    // TODO: пробую сделать новый
    // let saleData = []
    // let zCount = 3
    // for (let i in saleArray)
    //     if (i >= zCount) {
    //         let c = 0
    //         let sum = 0
    //         for (let j = i-1; j>=i-zCount; j--){
    //             sum+=saleArray[j]
    //             c++
    //             console.log('i = '+ i+ '  c = '+c+ ' j = '+j+ '  q = '+saleArray[j]);
    //
    //         }
    //         let meanSum = sum>0? sum/zCount : 1/zCount
    //         let q_old = saleArray[i]
    //         let percentSum = saleArray[i]/meanSum
    //         if (q_old > 9)
    //             if (percentSum > 70) {
    //                 console.log('меняем '+saleArray[i]+' на 0 ');
    //                 // saleArray[i] = 0
    //                 // console.log(saleArray[i]);
    //                 }
    //         const oneData = {
    //             i: i,
    //             q_old: q_old,
    //             q: saleArray[i],
    //             sum: sum,
    //             meanSum : meanSum,
    //             percentSum : percentSum,
    //         }
    //         saleData.push(oneData)
    //     }
    //
    //
    // console.log(saleData);

    // TODO: сейчас это рабочий варик
    // console.log(isFbo);
    // if (!isFbo) try {
    //     console.log('НЕ ФБО УБИРАЕМ ЛИШНЕЕ');
    //     let realDay = daysCount
    //     for (let i in salePriceArray){
    //         if (salePriceArray[i]){
    //             realDay = daysCount - i
    //             break
    //         }
    //     }
    //
    //     // проверять имеет смысл если в истории более 25 дней
    //     if (realDay>1) {
    //         // Сначала соберем текущий массив с продажами
    //         let saleData = []
    //         for (let i in saleArray)
    //             if (i > 0) {
    //                 const oneData = {
    //                     i: i,
    //                     q: saleArray[i],
    //                     meanQ: 0,
    //                     maratKrut: 0
    //                 }
    //                 saleData.push(oneData)
    //             }
    //         // отсортируем по возрастанию колличества
    //         saleData.sort(function (a, b) {
    //             return a.q - b.q;
    //         });
    //
    //         // рассчитаем среднием продажи по возрастанию
    //         let sum = 0
    //
    //         for (let i in saleData) {
    //             sum += saleData[i].q
    //             saleData[i].meanQ =  sum / (i + 1)
    //             // if (saleData[i].meanQ < 0.01) saleData[i].meanQ = 0.01
    //
    //         }
    //
    //         // Возмем среднеее среднее (тафтология знаю ну в общем посередине массива будет реальное среднее)
    //         let z = Math.round(saleData.length / 2)
    //         let baseMeanQ = 0
    //         for (let i = z ; i < saleData.length-5; i ++)
    //             if (saleData[i].meanQ>0) {baseMeanQ = saleData[i].meanQ
    //                 break
    //             }
    //         if (baseMeanQ === 0) baseMeanQ = 0.001
    //
    //         // Далее посмотрим отклонения у 5-ти последних элементов тк теортически не более 5-ти выстрелов может быть
    //         let k = 0
    //         for (let i = saleData.length - 1; i >= 1; i--) {
    //
    //             k++
    //             // И вот тут самое интересное - если продажи более чем в 10 раз больше чем наще реальное среднее это явный выстрел
    //             saleData[i].maratKrut = saleData[i].meanQ / baseMeanQ
    //
    //             // if (saleData[i].meanQ >0 ) saleData[i].maratKrut = 100*((saleData[i].meanQ-saleData[i-1].meanQ)/saleData[i-1].meanQ)
    //             //обнулим продажу
    //             if (saleData[i].maratKrut > 3.2) if (saleArray[saleData[i].i] > 9) saleArray[saleData[i].i] = 0 //Math.round(baseMeanQ - 0.01)
    //             if (k === 5) break
    //         }
    //         console.log(saleData);
    //     }
    //
    // } catch (e) { console.log(e);}

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
        if (qCount > 0) tsq = Math.round(tsq / qCount)
        let onePercent = tsq / 100
        tsq = Math.round(tsq * 0.8)
        // Далее добавим продажи (и увеличим сами поступления в эти дни)
        qCount = 0
        for (let i in addQuantityArray) {
            if (addQuantityArray[i] > 0) {
                let i_q = parseInt(i) + 1
                if (i_q < saleArray.length) {
                    let a = Math.round(tsq + onePercent * qCount);
                    saleArray[i_q] = a
                    addQuantityArray[i] += a
                    qCount++
                }
            }
        }

    } catch (e) { console.log(e);}

        // Расчитаем обьемы продаж
    for (let i in saleArray){
        if (saleArray[i] >= 0) {
            let q = saleArray[i]
            if (returnArray[i]) q-= returnArray[i]
            totalSaleQuantity += q
            if (salePriceArray[i]) totalMoney+=q*salePriceArray[i]
        }
    }
    if (totalSaleQuantity <= 0) {
        totalSaleQuantity = 0
        totalMoney = 0
    }


    // Расчитаем ркальную скидку - для этого от текущей цены мы смотрим медианную цену в обратном порядке за 2 недели при условии что цена больше на 3 % хотябы
    let realDiscount = 0
    // const minDiscount = 0.03        // минимальный порог цены который нужно учитывать
    // const maxDaysWithSale = 14   // колличество дней при которых идет учет скидки
    // let isMinDiscount = false    // пройден ли порог минимальной цены
    // let startPrice = 0
    //
    // // Вычислим порог цены после которого мы должны начать расчет медианы
    // if (salePriceArray.length>0) startPrice = salePriceArray[salePriceArray.length-1]
    //
    // let dayCounter = 0
    // let priceCounter = 0
    // let tmp_totalMoney = 0
    // if (startPrice>0) {
    //     for (let i = salePriceArray.length - 1; i > 0; i--) {
    //         if ((isMinDiscount) && (dayCounter < maxDaysWithSale)) {
    //             let q = saleArray[i]-returnArray[i]
    //             if (salePriceArray[i]) {
    //                 tmp_totalMoney+=q*salePriceArray[i]
    //                 priceCounter +=q
    //             }
    //
    //
    //             dayCounter++
    //         } else if (salePriceArray[i] > startPrice*(1+minDiscount)) isMinDiscount = true
    //
    //
    //     }
    //     if (priceCounter>0) realDiscount = Math.floor(10000*(tmp_totalMoney/priceCounter - startPrice)/startPrice ) /100
    //     console.log('realDiscount = '+realDiscount);
    //
    // }
    //
    // console.log('saleArray');
    // console.log(saleArray);
    // console.log('returnArray');
    // console.log(returnArray);
    // console.log('salePriceArray');
    // console.log(salePriceArray);



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
        realDiscount : realDiscount
    }

    return [dateArray, quantityArray, saleArray, salePriceArray,addQuantityArray, returnArray, resultData]
}


export {getDataFromHistory,  formatCurrency}