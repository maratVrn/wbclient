import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';
import { Chart } from 'primereact/chart';
import {get30DaysDataFromHistory, formatCurrency} from "../math";





const ProductData = (props) => {
    const {id} = props;
    const {productStore} = useContext(Context)
    const [chartData, setChartData] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [productInfo, setProductInfo] = useState([]);


    useEffect(() => {
        if (id) productStore.getProductInfo(id).then(() => {
            // console.log('Получили данные по id '+id);

            if (productStore.productInfo) {
                // console.log(productStore.productInfo.priceHistory);
                const [dateArray, quantityArray, saleArray, salePriceArray, addQuantityArray, returnArray, resultData] = get30DaysDataFromHistory(productStore.productInfo)

                setProductInfo(resultData)
                // console.log(resultData);
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
                            stacked: true,
                            display: false,
                            // beginAtZero: true
                        }
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



    }, [id]);
    return (
        <div className="">
            <div style={{textAlign: 'center'}}><span className="chart_main_text">Аналитика товара за 30 дней </span>
            </div>
            <div className="chart_info">
                    <span
                        className="chart_info_text">Продажи (с учетом возвратов) <span className="bold">{productInfo?.totalSaleQuantity} шт.</span>  на сумму <span className="bold">{formatCurrency(productInfo?.totalMoney)} </span>  </span>
            </div>
            <div className="item_data">

                <div className="chart_item">

                    <Chart type="bar" className="all_div" data={chartData} options={chartOptions}/>
                </div>
            </div>
            <div className="chart_info">
                    <span
                        className="chart_info_text">Остатки на начало <span className="bold">{productInfo?.startQuantity} </span>сейчас <span className="bold">{productInfo?.totalQuantity} </span></span>
                <span
                    className="chart_info_text"> Поступления <span className="bold"> {productInfo?.addQuantity} </span> </span>
            </div>

            <div className="item_data">
                <div className="chart_item">
                    <Chart className="all_div" type="bar" data={chartData2} options={chartOptions}/>
                </div>
            </div>
            <div className="chart_info">
                <span className="chart_info_text">Цена <span className="bold">{productInfo?.price + '  '} </span>
                    мин. <span className="bold"> {productInfo?.minPrice + ' '}</span>
                    макс. <span className="bold">{productInfo?.maxPrice} </span>
                    сред. <span className="bold"> {productInfo?.meanPrice} </span></span>
            </div>
            <div className="item_data">

                <div className="chart_item">
                    <Chart className="all_div" type="line" data={chartData3} options={chartOptions}/>
                </div>
            </div>
        </div>
    );
};


export default ProductData;