import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {formatCurrency} from "../math";

import { Chart } from 'primereact/chart';
import {InputSwitch} from "primereact/inputswitch";

const CompetitorTable = (props) => {
    const [items, setItems] = useState([])

    const [chartData, setChartData] = useState({});
    const [isMeanData, setIsMeanData] = useState(false);
    const [chartOptions, setChartOptions] = useState({});

    const idBodyTemplate = (product) => {
        return <div>
            <span style={{paddingTop: '20px'}}> {product.id} </span>
            <a style={{width: '70%', marginTop: '10px'}}
               href={`http://localhost:3000/productInfo/${product.id}`} target="_blank"

               rel="noopener noreferrer"
            >
                <i className=" pi pi-sign-in "
                    // onClick={}
                   style={{fontSize: '1.2rem',cursor: 'pointer',marginLeft: '10px',color: '#bf92e6',
                       // marginTop:'20px',
                       // marginTop: '10px'
                   }}>

                </i>
            </a>
        </div>
    };
    const imageBodyTemplate = (product) => {
        return <img src={product.photoUrl} alt={product.photoUrl} className="w-2rem shadow-2 border-round"
                    style={{cursor: 'pointer'}}
            // onClick={() => getIdInfo(product.id)}

        />;
    };

    function setMeanData(data){
        let newData = []
        const step = 6
        const dataLength = data.length

        for (let i = 0; i < dataLength; i+=step){
            // Сначала соберем позиции которые будем усреднять - те слева и справа от выбранной точке по степу-1
            let idx = []
            idx.push(i)
            for (let j = 1; j<step; j++){
                if (i-j>=0) {idx.push(i-j)} else idx.push(0)
                if (i+j<dataLength) {idx.push(i+j)} else idx.push(dataLength-1)
            }

            // Далее просумируем выбранные позиции и усредним
            let tmpPrice = 0
            let tmpSaleCount = 0
            let tmpSaleMoney = 0

            for (let j in idx){
                tmpPrice += data[idx[j]].price
                tmpSaleCount += data[idx[j]].saleCount
                tmpSaleMoney += data[idx[j]].saleMoney
            }
            const meanCount = idx.length
            if (meanCount>0){
                tmpPrice = tmpPrice/meanCount
                tmpSaleCount = tmpSaleCount/meanCount
                tmpSaleMoney = tmpSaleMoney/meanCount
            }
            tmpPrice = Math.round(tmpPrice/10)*10
            tmpSaleMoney = Math.round(tmpSaleMoney/10)*10
            tmpSaleCount = Math.round(tmpSaleCount/10)*10
            // Добавим результат в новый массив
            newData.push({price : tmpPrice, saleCount : tmpSaleCount, saleMoney : tmpSaleMoney})

        }

        return  newData
    }

    useEffect(() => {

        setItems([])
        if (props.items) setItems(props.items)
        let tmpSaleInfo = []
        for (let i in props.items)
            tmpSaleInfo.push({price:props.items[i].price,saleCount:props.items[i].saleCount, saleMoney:props.items[i].saleMoney})
        tmpSaleInfo.sort(function(a, b) {  return a.price - b.price; });

        let priceArr = []
        let saleCountArr = []
        let moneyCountArr = []
        if (isMeanData)  tmpSaleInfo = setMeanData(tmpSaleInfo)
        for (let i in tmpSaleInfo)
            if (tmpSaleInfo[i].saleCount>0) {
            priceArr.push(tmpSaleInfo[i].price)
            saleCountArr.push(tmpSaleInfo[i].saleCount)
            moneyCountArr.push(tmpSaleInfo[i].saleMoney)
        }



        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: priceArr,
            datasets: [
                {
                    label: 'Объем продаж в шт.',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: saleCountArr
                },
                {
                    label: 'Обьем продаж в руб.',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y1',
                    tension: 0.4,
                    data: moneyCountArr
                }
            ]
        };
        const options = {
            stacked: false,
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
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);


    }, [isMeanData])

    const MoneyBodyTemplate = (product) => {
        return <div>
            <span>{formatCurrency(product.saleMoney)}</span>
        </div>;
    };

    const NameBodyTemplate = (product) => {
        return <div className="table_info" style={{width:'130px'}}>
            <span>{product.name}</span>
             </div>;
    };

    const SupplierBodyTemplate = (product) => {
        return <div className="supplier_info" style={{width:'130px'}}>
            <span>{product.supplier}</span>
        </div>;
    };

    return (
        <div>
            <div style={{display: 'flex'}}>

                <InputSwitch checked={isMeanData} onChange={(e) => setIsMeanData(e.value)}/>
                <span className="all_colors_info"
                      style={{marginLeft: '20px'}}>Усреднить данные </span>
            </div>

            <div className="card">
                <Chart type="line" data={chartData} options={chartOptions}/>
            </div>
            <div>
                <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={10}
                           rowsPerPageOptions={[10, 25, 50]} className="dataTable">
                    <Column field="position" sortable header="№"></Column>
                    <Column field="name" body={NameBodyTemplate} header="Название"></Column>
                    <Column field="supplier" body={SupplierBodyTemplate} header="Продавец"></Column>
                    <Column field="id" body={idBodyTemplate} header="Артикул"></Column>

                    <Column header="Фото" body={imageBodyTemplate}></Column>
                    {/*<Column field="inBase" header="Есть в базе?"></Column>*/}

                    <Column field="price" sortable header="Цена"></Column>
                    <Column field="saleCount" sortable header="Продано шт."></Column>
                    <Column field="saleMoney" body={MoneyBodyTemplate} sortable
                            header="Продано руб."></Column>
                    <Column field="qty" sortable header="Остатки"></Column>

                </DataTable>
            </div>
        </div>
    );
};

export default CompetitorTable;