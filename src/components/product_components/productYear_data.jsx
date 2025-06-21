import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';
import { Chart } from 'primereact/chart';
import {getDataFromHistory, formatCurrency, getDataFromHistoryYear} from "../math";
import {RadioButton} from "primereact/radiobutton";





const ProductYearData = (props) => {
    const {id, isFbo, isInBase} = props;
    const {productStore} = useContext(Context)
    const [chartData, setChartData] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartDataMoneyMonth, setChartDataMoneyMonth] = useState({});

    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chartOptionsMonth, setChartOptionsMonth] = useState({});

    const [month, setMonth] = useState([])
    const [selectedMonth, setSelectedMonth] = useState({});


    useEffect(() => {
        // console.log('useEffect ProductData');
        setMonth([])

        if (isInBase)
            if (id>0) productStore.getProductInfo(id).then(() => {

                if (productStore.productInfo) {
                    let someMonth = []


                    // const [dateArray, quantityArray, saleArray, salePriceArray, addQuantityArray, returnArray, monthArray,
                        // saleArrayMonth, saleMoneyArrayMonth, pInfo] = getDataFromHistoryYear(productStore.productInfo)

                    const currCalcData = getDataFromHistoryYear(productStore.productInfo)
                    productStore.setProductYearCalcData(currCalcData)


                    someMonth.push({
                        monthId: 0,
                        monthName: '2025 год',
                        allSaleCount: currCalcData.pInfo.allSaleCount,
                        allSaleMoney: currCalcData.pInfo.allSaleMoney,
                    })

                    for (let i in currCalcData.monthArray)
                        someMonth.push({
                            monthId: parseInt(i)+1,
                            monthName: currCalcData.monthArray[i],
                            allSaleCount: currCalcData.saleArrayMonth[i],
                            allSaleMoney: currCalcData.saleMoneyArrayMonth[i],
                        })


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
                    setData(0)

                    setMonth(someMonth)
                    setSelectedMonth(someMonth[0])
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
        setChartData(data);
        setChartData2(data2);
        setChartData3(data3);
        setChartDataMonth(dataMonth)
        setChartDataMoneyMonth(dataMoneyMonth)
    }

    function onMonthChange(value){
        console.log(value);
        if (value) {
            setSelectedMonth(value)
            if (value.monthId >= 0) setData(value.monthId)
        }
    }


    return (
        <div>
            {isInBase ?
                <div style={{width: '100%', textAlign: 'center'}}>
                    <h2>Аналитика продаж {selectedMonth.monthName} </h2>
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
                </div>
                :
                <div>товара нет в базе</div>
            }
        </div>


    );
};


export default ProductYearData;