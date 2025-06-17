import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';
import { Chart } from 'primereact/chart';
import {getDataFromHistory, formatCurrency, getDataFromHistoryYear} from "../math";





const ProductYearData = (props) => {
    const {id, isFbo, isInBase} = props;
    const {productStore} = useContext(Context)
    const [chartData, setChartData] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [productInfo, setProductInfo] = useState([]);


    useEffect(() => {
        // console.log('useEffect ProductData');

        if (isInBase)
            if (id>0) productStore.getProductInfo(id).then(() => {

                if (productStore.productInfo) {

                    const res = getDataFromHistoryYear(productStore.productInfo)
                    const [dateArray, quantityArray, saleArray, salePriceArray, addQuantityArray, returnArray, resultData] = getDataFromHistory(productStore.productInfo, 30, isFbo, true)


                    // for (let i = 0; i < dateArray.length; i++)
                    //     if (i % 5 === 0) dateArray[i]= 1
                    //         else dateArray[i] = 0


                    setProductInfo(resultData)

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
                                display: false,
                                // beginAtZero: true
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


                    setChartData(data);
                    setChartData2(data2);
                    setChartData3(data3);
                }
            })



    }, [id, isInBase]);
    return (
        <div>
            {isInBase ?
                <div style={{width: '100%', textAlign: 'center'}}>
                    <h2>Аналитика продаж за год </h2>
                    <div className="chart_info">
                    <span className="all_colors_info">
                        Продажи (с учетом возвратов) {productInfo?.totalSaleQuantity + '   '} шт.
                          на сумму {formatCurrency(productInfo?.totalMoney)} </span>
                    </div>
                    <div className="item_data">

                        <div className="chart_item">

                            <Chart type="bar" className="all_div" data={chartData} options={chartOptions}/>
                        </div>
                    </div>
                    <div className="chart_info">
                    <span className="all_colors_info">
                        Остатки на начало {productInfo?.startQuantity + '   '}
                        сейчас {productInfo?.totalQuantity + '   '}
                        Поступления {productInfo?.addQuantity} </span>

                    </div>

                    <div className="item_data">
                        <div className="chart_item">
                            <Chart className="all_div" type="bar" data={chartData2} options={chartOptions}/>
                        </div>
                    </div>
                    <div className="chart_info">
                <span className="all_colors_info">Цена {productInfo?.price + '  '}
                    мин. {productInfo?.minPrice + ' '}
                    макс.{productInfo?.maxPrice + ' '}
                    сред. {productInfo?.meanPrice} </span>
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