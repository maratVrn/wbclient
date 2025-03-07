import React, {useContext, useEffect, useState} from 'react';
import { Chart } from 'primereact/chart';
import {Context} from "../index";
import './product_components/product.css';
import {get30DaysDataFromHistory} from "./math";

const TestChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const {productStore} = useContext(Context)

    useEffect(() => {


        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');


        const id = 1169780
        if (id) productStore.getProductInfo(id).then(() => {
            console.log('Получили данные по id ' + id);
            const [dateArray, quantityArray, saleArray, salePriceArray] = get30DaysDataFromHistory(productStore.priceHistory)
            const data = {
                // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                labels: dateArray,
                datasets: [
                    {
                        label: 'First Dataset',
                        // data: [65, 59, 80, 81, 56, 55, 40],
                        data:quantityArray,
                        fill: false,
                        // borderColor: documentStyle.getPropertyValue('--blue-500'),
                        backgroundColor: 'CornflowerBlue',
                        tension: 0.4
                    },

                ]
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {

                    y: {
                        display: false,
                        beginAtZero: true
                    },
                    x : {
                        display: false,
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        })



    }, []);

    return (
        <div style={{height:'100px'}}>

            <Chart type="bar" className="all_div" data={chartData} options={chartOptions}/>

        </div>
    );
};

export default TestChart;