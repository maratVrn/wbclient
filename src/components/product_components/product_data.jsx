import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';
import { Chart } from 'primereact/chart';
import {getPriceFromHistory, formatCurrency, calcDiscount} from "../math";
import {InputSwitch} from "primereact/inputswitch";
import {RadioButton} from "primereact/radiobutton";





const ProductData = (props) => {
    const {id, isInBase} = props;
    const {productStore} = useContext(Context)
    const [productInfo, setProductInfo] = useState([]);
    const [chartPriceData, setChartPriceData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [daysCount, setDaysCount] = useState([
        {daysId: 0, daysName: '30 дней', daysCount : 30},{daysId: 1, daysName: '60 дней', daysCount : 60},
        {daysId: 2, daysName: '90 дней', daysCount : 90},{daysId: 3, daysName: '180 дней', daysCount : 180}, ,{daysId: 4, daysName: '360 дней', daysCount : 360}])
    const [selectedDays, setSelectedDays] = useState({daysId: 2, daysName: '90 дней', daysCount : 90});

    useEffect(() => {
        // console.log('useEffect ProductData ');

        if (isInBase)
            if (productStore.idInfo.productInfo?.priceHistory)

                calcData(selectedDays.daysCount)

    }, [id, isInBase]);

    function calcData(daysCount){
        const [dateArray, priceArray,  resultData] = getPriceFromHistory(productStore.idInfo?.productInfo?.priceHistory, daysCount)
        const discountData = calcDiscount(productStore.idInfo?.productInfo?.priceHistory)
        let priceArray2 = []
        if (discountData.isDataCalc) for (let i in priceArray) priceArray2.push(discountData.meanPrice)
        // console.log(priceArray2);

        setProductInfo(resultData)

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                pointRadius: 1,
                legend: {
                    display: true,


                }
            },
            scales: {

                y: {
                    // stacked: true,
                    display: true,
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
                }
            }
        };

        // const options = {
        //     maintainAspectRatio: false,
        //     aspectRatio: 0.6,
        //     plugins: {
        //         legend: {
        //             labels: {
        //                 color: 'rgba(193,150,73,0.5)'
        //             }
        //         }
        //     },
        //     scales: {
        //         x: {
        //             ticks: {
        //                 color: 'rgba(193,150,73,0.5)'
        //             },
        //             grid: {
        //                 color: 'rgba(193,150,73,0.5)'
        //             }
        //         },
        //         y: {
        //             ticks: {
        //                 color: 'rgba(193,150,73,0.5)'
        //             },
        //             grid: {
        //                 color: 'rgba(193,150,73,0.5)'
        //             }
        //         }
        //     }
        // };
        setChartOptions(options);
        const priceData3 = {
            labels: dateArray,
            datasets: [

                {
                    label: 'Цена ',
                    data: priceArray,
                    fill: true,
                    tension: 1,
                    borderWidth: 3,
                    backgroundColor: 'rgba(200,245,251,0.5)',
                    borderColor: 'rgba(38,197,255,0.5)',
                    pointBorderWidth: 0,
                    pointHitRadius: 5,
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',

                },
                {
                    label: 'Средняя цена',
                    data: priceArray2,
                    // fill: true,
                    // tension: 1,
                    borderWidth: 3,
                    backgroundColor: 'rgba(200,245,251,0.5)',
                    borderColor: 'rgba(110,255,38,0.5)',
                    pointBorderWidth: 0,
                    pointHitRadius: 5,
                    hoverBackgroundColor: 'rgba(38,197,255,0.5)',

                },
            ]
        };
        setChartPriceData(priceData3);

    }

    function onDaysChange(value){
        // console.log(value);
        if (value) {
            setSelectedDays(value)
            if (value.daysId >= 0) calcData(value.daysCount)
        }
    }

    return (
        <div style={{paddingTop:'70px', alignItems:'center', textAlign:'center', paddingBottom:'50px'}}>
            {isInBase ?
                <div>

                    <h2>График изменения цены за {selectedDays.daysName}  </h2>
                    <div className="flex flex-wrap gap-3 dataTable" style={{paddingTop: '30px', paddingBottom:'30px', paddingLeft:'20px'}}>


                        {daysCount.map((m1) => {
                            return (
                                <div key={m1.daysId}>
                                    <RadioButton inputId={m1.daysId} name="month" value={m1}
                                                 onChange={(e) => onDaysChange(e.value)}
                                                 checked={selectedDays.daysId === m1.daysId}
                                    />
                                    <label htmlFor={m1.daysId}
                                           className="ml-2">{m1.daysName}</label>
                                </div>
                            );
                        })}


                    </div>

                    {/*    <div className="chart_info">*/}
                    {/*<span className="chart_info_text">Цена <span className="bold">{productInfo?.price + '  '} </span>*/}
                    {/*    мин. <span className="bold"> {productInfo?.minPrice + ' '}</span>*/}
                    {/*    макс. <span className="bold">{productInfo?.maxPrice} </span>*/}
                    {/*    сред. <span className="bold"> {productInfo?.meanPrice} </span></span>*/}
                    {/*    </div>*/}
                    <div className="item_data">

                        <div className="chart_item">
                            <Chart className="all_div" type="line" data={chartPriceData} options={chartOptions}/>
                        </div>
                    </div>
                </div>
                :
                <div>товара нет в базе</div>
            }
        </div>


    );
};


export default ProductData;