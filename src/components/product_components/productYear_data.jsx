import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';
import { Chart } from 'primereact/chart';
import {getDataFromHistory, formatCurrency, getDataFromHistoryYear} from "../math";
import {RadioButton} from "primereact/radiobutton";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";





const ProductYearData = (props) => {
    const {id,  isInBase} = props;

    const navigate = useNavigate();

    const {productStore} = useContext(Context)
    const [chartData, setChartData] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartDataMoneyMonth, setChartDataMoneyMonth] = useState({});

    const [chartDataMonth_allMonth, setChartDataMonth_allMonth] = useState({});
    const [chartDataMoneyMonth_allMonth, setChartDataMoneyMonth_allMonth] = useState({});


    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});

    const [chartDataDoughnutMoney, setChartDataDoughnutMoney] = useState({});
    const [chartDataDoughnutCount, setChartDataDoughnutCount] = useState({});


    const [chartOptions, setChartOptions] = useState({});
    const [chartOptionsMonth, setChartOptionsMonth] = useState({});
    const [chartDoughnutOptions, setChartDoughnutOptions] = useState({});

    const [month, setMonth] = useState([])
    const [selectedMonth, setSelectedMonth] = useState({});
    const [items, setItems] = useState([])

    useEffect(() => {
        // console.log('useEffect ProductYearData');
        setMonth([])
        productStore.setAllDataDoughnut({data : [], labels : [], count : [[]], money : [[]]})


        if (isInBase)
            if (id>0) productStore.getProductInfo(id).then(() => {


                if (productStore.productInfo) {
                    let someMonth = []
                    let tmpAllDataDoughnut = {data : [], labels : [], count : [[]], money : [[]]}

                    const currCalcData = getDataFromHistoryYear(productStore.productInfo.priceHistory, id)
                    // console.log(productStore.productInfo.priceHistory);


                    productStore.setProductYearCalcData(currCalcData)

                    let allCalcData = {
                        monthArray : currCalcData.monthArray,
                        saleArrayMonth: currCalcData.saleArrayMonth,
                        saleMoneyArrayMonth : currCalcData.saleMoneyArrayMonth,
                    }
                    for (let k = 0; k<allCalcData.monthArray.length; k++) {
                        tmpAllDataDoughnut.count.push([])
                        tmpAllDataDoughnut.money.push([])
                    }

                    productStore.getProductColorsInfo(id).then(() => {

                        let allSaleCount_allColors = currCalcData.pInfo.allSaleCount
                        let allSaleMoney_allColors = currCalcData.pInfo.allSaleMoney

                        for (let i = 0; i < productStore.productColorsInfo.length; i++)
                            if (parseInt(productStore.productColorsInfo[i].id) !== parseInt(id)) {
                                tmpAllDataDoughnut.labels.push(productStore.productColorsInfo[i].name + '   Цвет :'+productStore.productColorsInfo[i].color)
                                tmpAllDataDoughnut.data.push({id: productStore.productColorsInfo[i].id, photoUrl: productStore.productColorsInfo[i].photoUrl,
                                    color: productStore.productColorsInfo[i].color, price: productStore.productColorsInfo[i].price, name: productStore.productColorsInfo[i].name})

                                const currCalcData_add = getDataFromHistoryYear(productStore.productColorsInfo[i].priceHistory)
                                allSaleCount_allColors += currCalcData_add.pInfo.allSaleCount
                                allSaleMoney_allColors += currCalcData_add.pInfo.allSaleMoney
                                tmpAllDataDoughnut.count[0].push(parseInt(currCalcData_add.pInfo.allSaleCount))
                                tmpAllDataDoughnut.money[0].push(parseInt(currCalcData_add.pInfo.allSaleMoney))
                                for (let k = 0; k<allCalcData.monthArray.length; k++) {
                                    let isIn = false
                                    for (let z in currCalcData_add.monthArray)
                                        if (allCalcData.monthArray[k] === currCalcData_add.monthArray[z]) {
                                            allCalcData.saleArrayMonth[k] += currCalcData_add.saleArrayMonth[z]
                                            allCalcData.saleMoneyArrayMonth[k] += currCalcData_add.saleMoneyArrayMonth[z]
                                            tmpAllDataDoughnut.count[k + 1].push(currCalcData_add.saleArrayMonth[z])
                                            tmpAllDataDoughnut.money[k + 1].push(currCalcData_add.saleMoneyArrayMonth[z])
                                            isIn = true
                                            break
                                        }
                                    if (!isIn) {
                                        tmpAllDataDoughnut.count[k + 1].push(0)
                                        tmpAllDataDoughnut.money[k + 1].push(0)
                                    }
                                }
                            } else {
                                tmpAllDataDoughnut.labels.push(productStore.productColorsInfo[i].name + '   Цвет :'+productStore.productColorsInfo[i].color)
                                tmpAllDataDoughnut.data.push({id: productStore.productColorsInfo[i].id, photoUrl: productStore.productColorsInfo[i].photoUrl,
                                    color: productStore.productColorsInfo[i].color, price: productStore.productColorsInfo[i].price , name: productStore.productColorsInfo[i].name})
                                for (let k = 0; k<allCalcData.monthArray.length; k++){
                                    tmpAllDataDoughnut.count[k+1].push(currCalcData.saleArrayMonth[k])
                                    tmpAllDataDoughnut.money[k+1].push(currCalcData.saleMoneyArrayMonth[k])

                                }
                                tmpAllDataDoughnut.count[0].push(parseInt(currCalcData.pInfo.allSaleCount))
                                tmpAllDataDoughnut.money[0].push(parseInt(currCalcData.pInfo.allSaleMoney))
                            }


                        productStore.setProductYearCalcData_allColors(allCalcData)
                        someMonth.push({
                            monthId: 0,
                            monthName: '2025 год',
                            allSaleCount: currCalcData.pInfo.allSaleCount,
                            allSaleMoney: currCalcData.pInfo.allSaleMoney,
                            allSaleCount_allColors : allSaleCount_allColors,
                            allSaleMoney_allColors : allSaleMoney_allColors

                        })

                        for (let i = 0; i < currCalcData.monthArray.length; i++) {
                            someMonth.push({
                                monthId: parseInt(i) + 1,
                                monthName: currCalcData.monthArray[i],
                                allSaleCount: currCalcData.saleArrayMonth[i],
                                allSaleMoney: currCalcData.saleMoneyArrayMonth[i],
                                allSaleCount_allColors: allCalcData.saleArrayMonth[i] ? allCalcData.saleArrayMonth[i] : 0,
                                allSaleMoney_allColors: allCalcData.saleMoneyArrayMonth[i] ? allCalcData?.saleMoneyArrayMonth[i] : 0,
                            })

                        }
                        const options = {
                            maintainAspectRatio: false,
                            aspectRatio: 0.6,
                            plugins: {
                                pointRadius: 1,
                                legend: {
                                    display: false,
                                }
                            },
                            scales: {
                                y: {
                                    stacked: true,

                                    display: true,
                                    beginAtZero : true  ,
                                    grid: {    display: false,
                                    },
                                },
                                x: {
                                    ticks: {
                                        display: true,

                                        callback: function(value, index, ticks) {
                                            let label = null
                                            try{
                                                const d_arr = dateArray[index].split('.')
                                                if (d_arr[0] === '15') {
                                                    let months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                                                        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
                                                    let mId = parseInt(d_arr[1]) -1
                                                    label = months[mId]
                                                }
                                            } catch (e){}

                                            return label;
                                        }
                                    },
                                    grid: {
                                        display: false,
                                        // color : 'rgba(193,150,73,0.5)',
                                        drawBorder: true
                                    },
                                    beginAtZero: true,
                                    stacked: true,
                                },
                                // x: {
                                //     stacked: true,
                                //     display: true,
                                //     // beginAtZero: true
                                // }
                            }
                        };
                        setChartOptions(options);

                        const optionsMonth = {
                            maintainAspectRatio: false,
                            aspectRatio: 0.6,
                            plugins: {
                                pointRadius: 1,
                                legend: {
                                    display: false,
                                }
                            },
                            scales: {

                                y: {
                                    stacked: true,
                                    display: true,
                                    grid: {    display: false,
                                    },
                                },
                                x: {

                                    grid: {
                                        display: false,
                                        // color : 'rgba(193,150,73,0.5)',
                                        drawBorder: true
                                    },
                                    beginAtZero: true,
                                    stacked: true,
                                },
                                // x: {
                                //     stacked: true,
                                //     display: true,
                                //     // beginAtZero: true
                                // }
                            }
                        };
                        setChartOptionsMonth(optionsMonth)

                        const option2 = {
                            maintainAspectRatio: false,
                            // responsive: false,
                            cutout: '60%',
                            plugins: {
                                pointRadius: 1,
                                legend: {
                                    display: false,
                                    // position: 'right',
                                }
                            },
                        }
                        setChartDoughnutOptions(option2)

                        productStore.setAllDataDoughnut(tmpAllDataDoughnut)
                        setData(0)
                        setMonth(someMonth)

                        setSelectedMonth(someMonth[0])
                    })

                }
            })



    }, [id, isInBase]);

    function setData(monthId){


        let dateArray = []
        let quantityArray = []
        let saleArray = []
        let salePriceArray = []
        let addQuantityArray = []
        let returnArray = []
        let monthArray = []
        let saleArrayMonth = []
        let saleMoneyArrayMonth = []

        let saleArrayMonth_allMonth = []
        let saleMoneyArrayMonth_allMonth = []
        let tmpItems = []
        setItems([])



        if (monthId === 0){
            dateArray = productStore.productYearCalcData.dateArray
            quantityArray = productStore.productYearCalcData.quantityArray
            saleArray = productStore.productYearCalcData.saleArray
            salePriceArray = productStore.productYearCalcData.salePriceArray
            addQuantityArray = productStore.productYearCalcData.addQuantityArray
            returnArray = productStore.productYearCalcData.returnArray
            monthArray = productStore.productYearCalcData.monthArray
            saleArrayMonth = productStore.productYearCalcData.saleArrayMonth
            saleMoneyArrayMonth = productStore.productYearCalcData.saleMoneyArrayMonth

            saleArrayMonth_allMonth = productStore.productYearCalcData_allColors.saleArrayMonth
            saleMoneyArrayMonth_allMonth = productStore.productYearCalcData_allColors.saleMoneyArrayMonth


        } else {

            for (let k in productStore.productYearCalcData.dateArray) {
                const d_arr = productStore.productYearCalcData.dateArray[k].split('.')
                let crMonth = parseInt(d_arr[1])
                if (crMonth === monthId) {
                    dateArray.push(productStore.productYearCalcData.dateArray[k])
                    quantityArray.push(productStore.productYearCalcData.quantityArray[k])
                    addQuantityArray.push(productStore.productYearCalcData.addQuantityArray[k])
                    saleArray.push(productStore.productYearCalcData.saleArray[k])
                    returnArray.push(productStore.productYearCalcData.returnArray[k])
                    salePriceArray.push(productStore.productYearCalcData.salePriceArray[k])

                }
            }
            monthArray.push(productStore.productYearCalcData.monthArray[monthId-1])
            saleArrayMonth.push(productStore.productYearCalcData.saleArrayMonth[monthId-1])
            saleMoneyArrayMonth.push(productStore.productYearCalcData.saleMoneyArrayMonth[monthId-1])

            saleArrayMonth_allMonth.push (productStore.productYearCalcData_allColors.saleArrayMonth[monthId-1])
            saleMoneyArrayMonth_allMonth.push(productStore.productYearCalcData_allColors.saleMoneyArrayMonth[monthId-1])


        }

        const data = {
            labels: dateArray,
            datasets: [
                {
                    label: 'Продажи',
                    data: saleArray,
                    backgroundColor: 'rgba(200,245,251,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,
                },
                {
                    label: 'Возвраты',
                    data: returnArray,
                    backgroundColor: 'rgba(241,208,152,0.5)',
                    borderColor: 'rgba(193,150,73,0.5)',
                    hoverBackgroundColor: 'rgba(193,150,73,0.5)',
                    borderWidth: 2,

                }
            ]
        };
        const data2 = {
            labels: dateArray,
            datasets: [
                {
                    label: 'Остатки',
                    data: quantityArray,
                    backgroundColor: 'rgba(200,245,251,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,

                },
                {
                    label: 'Поступления',
                    data: addQuantityArray,
                    backgroundColor: 'rgba(241,208,152,0.5)',
                    borderColor: 'rgba(193,150,73,0.5)',
                    hoverBackgroundColor: 'rgba(193,150,73,0.5)',
                    borderWidth: 2,

                }
            ]
        };
        const data3 = {
            labels: dateArray,
            datasets: [
                {
                    label: 'Цена ',
                    data: salePriceArray,
                    fill: true,
                    tension: 1,
                    borderWidth: 3,
                    backgroundColor: 'rgba(200,245,251,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    pointBorderWidth: 0,
                    pointHitRadius: 5,
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',

                }
            ]
        };

        const dataMonth = {
            labels: monthArray,
            datasets: [
                {
                    type: 'bar',
                    label: 'Продажи (шт)',
                    data: saleArrayMonth,
                    backgroundColor: 'rgba(187,229,236,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,
                },
                {
                    type: 'line',
                    label: 'Продажи (шт)',
                    borderColor: 'rgba(211,53,143,0.5)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4,
                    data: saleArrayMonth
                },
            ]
        };
        const dataMoneyMonth = {
            labels: monthArray,
            datasets: [
                {
                    type: 'bar',
                    label: 'Продажи (руб)',
                    data: saleMoneyArrayMonth,
                    backgroundColor: 'rgba(187,229,236,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,
                },
                {
                    type: 'line',
                    label: 'Продажи (руб)',
                    borderColor: 'rgba(211,53,143,0.5)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4,
                    data: saleMoneyArrayMonth
                },
            ]
        };

        const dataMonth_allMonth = {
            labels: monthArray,
            datasets: [
                {
                    type: 'bar',
                    label: 'Продажи (шт)',
                    data: saleArrayMonth_allMonth,
                    backgroundColor: 'rgba(187,229,236,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,
                },
                {
                    type: 'line',
                    label: 'Продажи (шт)',
                    borderColor: 'rgba(211,53,143,0.5)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4,
                    data: saleArrayMonth_allMonth,
                },
            ]
        };
        const dataMoneyMonth_allMonth = {
            labels: monthArray,
            datasets: [
                {
                    type: 'bar',
                    label: 'Продажи (руб)',
                    data: saleMoneyArrayMonth_allMonth,
                    backgroundColor: 'rgba(187,229,236,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',
                    borderWidth: 2,
                },
                {
                    type: 'line',
                    label: 'Продажи (руб)',
                    borderColor: 'rgba(211,53,143,0.5)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4,
                    data: saleMoneyArrayMonth_allMonth,
                },
            ]
        };

        setChartData(data);
        setChartData2(data2);
        setChartData3(data3);
        setChartDataMonth(dataMonth)
        setChartDataMoneyMonth(dataMoneyMonth)

        setChartDataMonth_allMonth(dataMonth_allMonth)
        setChartDataMoneyMonth_allMonth(dataMoneyMonth_allMonth)

        let labels = productStore.allDataDoughnut.labels
        let countData = productStore.allDataDoughnut.count[monthId]?  productStore.allDataDoughnut.count[monthId] : []
        let moneyData = productStore.allDataDoughnut.money[monthId]?  productStore.allDataDoughnut.money[monthId] : []


        for ( let i in productStore.allDataDoughnut.data){
            tmpItems.push({
                id : productStore.allDataDoughnut.data[i].id,
                name : productStore.allDataDoughnut.data[i].name,
                color : productStore.allDataDoughnut.data[i].color,
                price : productStore.allDataDoughnut.data[i].price,
                photoUrl : productStore.allDataDoughnut.data[i].photoUrl,
                saleCount : productStore.allDataDoughnut.count[monthId][parseInt(i)] ? productStore.allDataDoughnut.count[monthId][parseInt(i)] : 0,

                saleMoney : productStore.allDataDoughnut.money[monthId][parseInt(i)] ? productStore.allDataDoughnut.money[monthId][parseInt(i)] : 0,

            })

        }

         setItems(tmpItems)


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


        setChartDataDoughnutMoney(dataCountDoughnut)
        setChartDataDoughnutCount(dataMoneyDoughnut)
    }

    function onMonthChange(value){
        // console.log(value);
        if (value) {
            setSelectedMonth(value)
            if (value.monthId >= 0) setData(value.monthId)
        }
    }

    const imageBodyTemplate = (product) => {
        return <img src={product.photoUrl} alt={product.photoUrl} className="w-2rem shadow-2 border-round"
                    style={{cursor:'pointer'}}
                    onClick={() => getIdInfo(product.id)}
        />;
    };

    const NameBodyTemplate = (product) => {
        return <div className="table_info" style={{width:'130px'}}>
            <span   style={{cursor:'pointer'}}
                    onClick={() => getIdInfo(product.id)}>{product.name}</span>
        </div>;
    };
    const ColorBodyTemplate = (product) => {
        return <div className="table_info" style={{width:'50px'}}>
            <span>{product.color}</span>
        </div>;
    };

    const MoneyBodyTemplate = (product) => {
        return <div>
            <span>{formatCurrency(product.saleMoney)}</span>
        </div>;
    };

    const QtyMoneyBodyTemplate = (product) => {
        return <div>
            <span>{formatCurrency(product.qtyMoney)}</span>
        </div>;
    };
    function getIdInfo(id){
        navigate('/productInfo/' + id.toString())

    }
    return (
        <div>
            {isInBase ?
                <div style={{width: '100%', textAlign: 'center'}}>
                    <h2>Аналитика продаж {selectedMonth.monthName}  </h2>
                    <div className="flex flex-wrap gap-3 dataTable" style={{padding: '10px'}}>
                        {month.map((m1) => {
                            return (
                                <div key={m1.monthId}>
                                    <RadioButton inputId={m1.monthId} name="month" value={m1}
                                                 onChange={(e) => onMonthChange(e.value)}
                                                 checked={selectedMonth.monthId === m1.monthId}
                                    />
                                    <label htmlFor={m1.monthId}
                                           className="ml-2">{m1.monthName}</label>
                                </div>
                            );
                        })}


                    </div>
                    <span
                        className="all_colors_info">Всего продано <span>{selectedMonth?.allSaleCount} шт.</span>  на сумму <span
                    >{formatCurrency(selectedMonth?.allSaleMoney)} </span>  </span>
                    <div className="chart_info">
                        <span className="all_colors_info"> Продажи по месяцам (шт) </span>
                    </div>
                    <div className="item_data">
                        <div className="chart_item">
                            <Chart type="bar" className="all_div" data={chartDataMonth} options={chartOptionsMonth}/>
                        </div>
                    </div>

                    <div className="chart_info">
                        <span className="all_colors_info"> Продажи по месяцам (руб) </span>
                    </div>
                    <div className="item_data">
                        <div className="chart_item">
                            <Chart type="bar" className="all_div" data={chartDataMoneyMonth}
                                   options={chartOptionsMonth}/>
                        </div>
                    </div>

                    <div className="chart_info">
                        <span className="all_colors_info"> Продажи по дням (шт) </span>
                    </div>
                    <div className="item_data">
                        <div className="chart_item">
                            <Chart type="bar" className="all_div" data={chartData} options={chartOptions}/>
                        </div>
                    </div>


                    <div className="chart_info">
                    <span className="all_colors_info">
                        Остатки и поступления (шт) </span>

                    </div>

                    <div className="item_data">
                        <div className="chart_item">
                            <Chart className="all_div" type="bar" data={chartData2} options={chartOptions}/>
                        </div>
                    </div>
                    <div className="chart_info">
                        <span className="all_colors_info">Цена (руб) </span>
                    </div>
                    <div className="item_data">

                        <div className="chart_item">
                            <Chart className="all_div" type="line" data={chartData3} options={chartOptions}/>
                        </div>
                    </div>

                    <h2>Аналитика продаж по всем цветам {selectedMonth.monthName} </h2>
                    <span
                        className="all_colors_info">Всего продано <span>{selectedMonth?.allSaleCount_allColors} шт.</span>  на сумму <span
                    >{formatCurrency(selectedMonth?.allSaleMoney_allColors)} </span>  </span>
                    <div className="flex flex-wrap gap-3 dataTable" style={{padding: '10px'}}>
                        {month.map((m1) => {
                            return (
                                <div key={m1.monthId}>
                                    <RadioButton inputId={m1.monthId} name="month" value={m1}
                                                 onChange={(e) => onMonthChange(e.value)}
                                                 checked={selectedMonth.monthId === m1.monthId}
                                    />
                                    <label htmlFor={m1.monthId}
                                           className="ml-2">{m1.monthName}</label>
                                </div>
                            );
                        })}


                    </div>

                    <div className="chart_info">
                        <span className="all_colors_info"> Продажи по месяцам ВСЕ цвета (шт) </span>
                    </div>
                    <div className="item_data">
                        <div className="chart_item">
                            <Chart type="bar" className="all_div" data={chartDataMonth_allMonth}
                                   options={chartOptionsMonth}/>
                        </div>
                    </div>

                    <div className="chart_info">
                        <span className="all_colors_info"> Продажи по месяцам ВСЕ цвета (руб) </span>
                    </div>
                    <div className="item_data">
                        <div className="chart_item">
                            <Chart type="bar" className="all_div" data={chartDataMoneyMonth_allMonth}
                                   options={chartOptionsMonth}/>
                        </div>
                    </div>

                    <span className="all_colors_info" style={{
                        paddingTop: '20px',
                        paddingBottom: '20px'
                    }}>{'      Лучшие товары по продажам за 2025 год  '} </span>
                    <div>
                        <DataTable style={{fontSize: '14px', marginTop: '20px'}} value={items} size={'small'} paginator
                                   rows={5} rowsPerPageOptions={[5, 10, 20]} className="dataTable" sortField="saleMoney"
                                   sortOrder={-1}>
                            <Column header="Товар" body={NameBodyTemplate}></Column>
                            <Column header="Фото" body={imageBodyTemplate}></Column>
                            <Column header="Цвет" body={ColorBodyTemplate}></Column>
                            <Column field="id" header="Артикул"></Column>
                            <Column field="price" sortable header="Цена"></Column>
                            <Column field="saleCount" sortable header="Продано шт."></Column>
                            <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>


                        </DataTable>
                    </div>
                    <span className="all_colors_info" style={{
                        paddingTop: '20px',
                        paddingBottom: '20px'
                    }}>{'      Распределение продаж по цветам  '} </span>
                    <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <span className="all_colors_info" style={{paddingBottom: '10px'}}>{'Продажи в шт'} </span>
                            <div className="flex justify-content-center">

                                <Chart type="doughnut" data={chartDataDoughnutCount} options={chartDoughnutOptions}
                                       className="w-full md:w-30rem"/>
                            </div>
                        </div>
                        <div className="borderOne ">
                            <span className="all_colors_info"
                                  style={{paddingBottom: '10px'}}>{'Продажи в рублях'} </span>
                            <div className="flex justify-content-center">
                                <Chart type="doughnut" data={chartDataDoughnutMoney} options={chartDoughnutOptions}
                                       className="w-full md:w-30rem"/>
                            </div>
                        </div>

                    </div>


                </div>
                :
                <div>товара нет в базе</div>
            }
        </div>


    );
};


export default ProductYearData;