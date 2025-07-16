import {makeAutoObservable} from "mobx";
import {getDataFromHistoryYear} from "../components/math";


export default class ProductsDataCalcStore {

    productList = []                            // Массив с товарами для анализа в каждом элементе id, idInfo (id, subjectId, subjectName) , photoUrl, productInfo
    categoriesListAnd30DaysData = []            // Рассчитанный массив категорий с оборотами за 30 дней
    doughnut30DaysData_byCategories = {dataCountDoughnut30Days : [], dataMoneyDoughnut30Days : []}    // Данные для круговой диаграммы по продажам по категориям за 30 дней
    doughnutYearData_byCategories = {dataCountDoughnutYear : [], dataMoneyDoughnutYear : []}    // Данные для круговой диаграммы по продажам по категориям за 30 дней
    allCalcYearData = [] //
    allCalcYearCategoriesData = [] //
    selectedCalcYearData_bySubjectID = [] //

    setNoData (){
        this.productList = []
        this.categoriesListAnd30DaysData = []
        this.doughnut30DaysData_byCategories = {dataCountDoughnut30Days : [], dataMoneyDoughnut30Days : []}
        this.doughnutYearData_byCategories = {dataCountDoughnutYear : [], dataMoneyDoughnutYear : []}
        this.allCalcYearData = []
        this.allCalcYearCategoriesData = []
        this.selectedCalcYearData_bySubjectID = []
    }


    setProductList (productList){
        this.productList = productList
    }

    setCategoriesList (){
        let someCategories = []
        someCategories.push({
            subjectId: 0,
            subjectName: 'Все категории',
            count: 0,
            saleCount: 0,
            saleMoney: 0,
            totalQuantity: 0,
            qtyMoney: 0
        })
        for (let i in this.productList){
            const data = this.productList[i]
            let saleCount = 0, saleMoney = 0, totalQuantity = 0, qtyMoney = 0

            if (data.productInfo)
                try {
                    saleMoney = data.productInfo.saleMoney
                    saleCount = data.productInfo.saleCount
                    totalQuantity = data.productInfo.totalQuantity
                    qtyMoney = totalQuantity * data.productInfo.price
                } catch (e) {
                }


            if (someCategories[0]) {
                someCategories[0].count++
                someCategories[0].saleMoney += saleMoney
                someCategories[0].saleCount += saleCount
                someCategories[0].totalQuantity += totalQuantity
                someCategories[0].qtyMoney += qtyMoney
            }

            let subjectId = 0
            let subjectName = ''
            try {

                subjectId = data.idInfo.subjectId
                subjectName = data.idInfo.subjectName
            } catch (e) {
            }
            if (subjectId > 0) {
                let isIn = false
                for (let j in someCategories) {
                    if (parseInt(someCategories[j].subjectId) === parseInt(subjectId)) {
                        someCategories[j].count++
                        someCategories[j].saleMoney += saleMoney
                        someCategories[j].saleCount += saleCount
                        someCategories[j].totalQuantity += totalQuantity
                        someCategories[j].qtyMoney += qtyMoney
                        isIn = true
                        break
                    }
                }
                if (!isIn) someCategories.push({
                    subjectId: parseInt(subjectId),
                    subjectName: subjectName,
                    count: 1,
                    saleCount: saleCount,
                    saleMoney: saleMoney,
                    totalQuantity: totalQuantity,
                    qtyMoney: qtyMoney
                })

            }

        }

        // Далее произведем расчет данных для круговой диаграммы
        let labels =[]
        let countData =[]
        let moneyData =[]

        for (let i=1; i<someCategories.length; i++){
            labels.push(someCategories[i].subjectName)
            countData.push(someCategories[i].saleCount)
            moneyData.push(someCategories[i].saleMoney)
        }
        const dataCountDoughnut = {
            labels: labels,
            datasets: [   {label: 'Продажи в шт',      data: countData,   }
            ]
        };
        const dataMoneyDoughnut = {
            labels: labels,
            datasets: [   {label: 'Продажи в руб.',      data: moneyData,   }
            ]
        };

        // console.log(someCategories);
        this.doughnut30DaysData_byCategories = {dataCountDoughnut30Days : dataCountDoughnut, dataMoneyDoughnut30Days : dataMoneyDoughnut}
        this.categoriesListAnd30DaysData = someCategories
    }

    addDataInAllDataByCat(idInfo,allSaleCount, allSaleMoney ) {
        if (this.allCalcYearCategoriesData[0]) {
            this.allCalcYearCategoriesData[0].count++
            this.allCalcYearCategoriesData[0].saleMoney += allSaleMoney
            this.allCalcYearCategoriesData[0].saleCount += allSaleCount
        }

        let subjectId = 0
        let subjectName = ''
        try {
            subjectId = idInfo.subjectId
            subjectName = idInfo.subjectName
        } catch (e) {}


        if (subjectId > 0) {
            let isIn = false
            for (let j in this.allCalcYearCategoriesData) {
                if (parseInt(this.allCalcYearCategoriesData[j].subjectId) === parseInt(subjectId)) {
                    this.allCalcYearCategoriesData[j].count++
                    this.allCalcYearCategoriesData[j].saleMoney += allSaleMoney
                    this.allCalcYearCategoriesData[j].saleCount += allSaleCount
                    isIn = true
                    break
                }
            }
            if (!isIn) this.allCalcYearCategoriesData.push({
                subjectId: parseInt(subjectId),
                subjectName: subjectName,
                count: 1,
                saleCount: allSaleCount,
                saleMoney: allSaleMoney,

            })

        }


    }

    setMonthDataBySubjectId(subjectId){
        let months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];


        this.selectedCalcYearData_bySubjectID = { monthArray : ['2025 год'], saleArrayMonth: [0], saleMoneyArrayMonth : [0] }


        let crDate = new Date();
        const nowMonthId = crDate.getMonth() > 11? 0 : crDate.getMonth()
        for (let i=0; i<=nowMonthId; i++)  {
            this.selectedCalcYearData_bySubjectID.monthArray.push(months[i]);
            this.selectedCalcYearData_bySubjectID.saleArrayMonth.push(0);
            this.selectedCalcYearData_bySubjectID.saleMoneyArrayMonth.push(0);
        }
        const needId = parseInt(subjectId)
        for (let i=0; i<this.allCalcYearData.length; i++) {

            if ((needId === 0) || (parseInt(this.allCalcYearData[i].subjectId) === needId)) {
                for (let k = 0; k < this.selectedCalcYearData_bySubjectID.monthArray.length; k++) {
                    for (let z in this.allCalcYearData[i].monthArray)
                        if (this.selectedCalcYearData_bySubjectID.monthArray[k] === this.allCalcYearData[i].monthArray[z]) {
                            this.selectedCalcYearData_bySubjectID.saleArrayMonth[k] += this.allCalcYearData[i].saleArrayMonth[z]
                            this.selectedCalcYearData_bySubjectID.saleMoneyArrayMonth[k] += this.allCalcYearData[i].saleMoneyArrayMonth[z]
                            break
                        }
                }
            }
        }
    }

    calcAllYearDataByMonth(){
        this.allCalcYearData = []
        this.allCalcYearCategoriesData = []
        this.allCalcYearCategoriesData.push({  subjectId: 0, subjectName: 'Все категории', count: 0, saleCount: 0,  saleMoney: 0,})

        for (let i in this.productList)
            if (this.productList[i].productInfo?.priceHistory[0])
            {
                const currCalcData = getDataFromHistoryYear(this.productList[i].productInfo.priceHistory)
                this.allCalcYearData.push({
                    id: currCalcData.id,
                    subjectId : this.productList[i].productInfo.subjectId,
                    photoUrl : this.productList[i].photoUrl,
                    monthArray : currCalcData.monthArray,
                    saleArrayMonth: currCalcData.saleArrayMonth,
                    saleMoneyArrayMonth : currCalcData.saleMoneyArrayMonth
                })
                this.addDataInAllDataByCat(this.productList[i].idInfo, currCalcData.pInfo.allSaleCount, currCalcData.pInfo.allSaleMoney)
        }

        // Далее произведем расчет данных для круговой диаграммы
        if (this.allCalcYearCategoriesData) {
            let labels = []
            let countData = []
            let moneyData = []

            for (let i = 1; i < this.allCalcYearCategoriesData.length; i++) {
                labels.push(this.allCalcYearCategoriesData[i].subjectName)
                countData.push(this.allCalcYearCategoriesData[i].saleCount)
                moneyData.push(this.allCalcYearCategoriesData[i].saleMoney)
            }
            const dataCountDoughnut = {
                labels: labels,
                datasets: [{label: 'Продажи в шт', data: countData,}
                ]
            };
            const dataMoneyDoughnut = {
                labels: labels,
                datasets: [{label: 'Продажи в руб.', data: moneyData,}
                ]
            };

            this.doughnutYearData_byCategories = {dataCountDoughnutYear : dataCountDoughnut, dataMoneyDoughnutYear : dataMoneyDoughnut}

        }

        this.setMonthDataBySubjectId(0)

    }


    constructor() {
        makeAutoObservable((this))
    }
}

