import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "../math";
import { Chart } from 'primereact/chart';
import {ProgressSpinner} from "primereact/progressspinner";

const ProductAllColors = () => {
    const {productStore} = useContext(Context)
    const [items, setItems] = useState([])
    const [allInfo, setAllInfo] = useState({})
    const navigate = useNavigate();
    const [isInfoLoad, setIsInfoLoad] = useState(false)
    const [chartData, setChartData] = useState({});
    const [chartDataMoney, setChartDataMoney] = useState({});

    const [chartOptions, setChartOptions] = useState({});

    let { id } = useParams();

    function loadColorsInfo(id){

        setIsInfoLoad(false)
        if (id>0) productStore.setState(id)
        if (id>0) productStore.getProductColorsInfo(id).then(() => {
            // console.log('getProductColorsInfo');
            let labels = []
            let countData = []
            let moneyData = []
            for (let i in productStore.productColorsInfo){
                labels.push(productStore.productColorsInfo[i].name + '   Цвет :'+productStore.productColorsInfo[i].color)
                countData.push(productStore.productColorsInfo[i].saleCount)
                moneyData.push(productStore.productColorsInfo[i].saleMoney)
            }
            // console.log(productStore.productColorsInfo);

            const data = {
                labels: labels,
                datasets: [   {label: 'Продажи в шт',      data: countData,   }
                ]
            };
            const dataMoney = {
                labels: labels,
                datasets: [   {label: 'Продажи в руб.',      data: moneyData,   }
                ]
            };

            setChartData(data)
            setChartDataMoney(dataMoney)

            setItems(productStore.productColorsInfo)
            let colorCount = 0
            let saleCount = 0
            let saleMoney = 0
            let qty = 0
            let qtyMoney = 0
            for (let i in productStore.productColorsInfo){
                colorCount++

                try {
                    saleMoney += productStore.productColorsInfo[i].saleMoney
                    saleCount += productStore.productColorsInfo[i].saleCount
                    qty       += productStore.productColorsInfo[i].totalQuantity
                    qtyMoney  += productStore.productColorsInfo[i].qtyMoney

                } catch (er) { console.log(er);}   }
            const info = {
                colorCount  : colorCount,
                saleMoney   : saleMoney,
                saleCount   : saleCount,
                qty         : qty,
                qtyMoney    : qtyMoney
            }
            setAllInfo(info)

        })
    }
    useEffect(()=>{
        // console.log('useEffect ProductAllColors id = '+id );
        setItems([])
        setAllInfo({})
        setChartData([]);
        setChartDataMoney([])
        const data = {
            labels: ['Нет данных'],
            datasets: [{data: [300]}]
        };
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


        setChartData(data);
        setChartOptions(option2);
        loadColorsInfo(id)




    },[id])

    function getIdInfo(id){
        navigate('/productInfo/' + id.toString())

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



    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width: '100%'}}>

            {productStore.is_all_colors_Load ?
                <div style={{width: '100%', textAlign: 'center'}}>
                    <h2>Аналитика продаж за 30 дней по всем цветам </h2>
                    <span className="all_colors_info">{'      Всего товаров ' + allInfo?.colorCount +
                        ',  за 30 дней продано  ' + allInfo?.saleCount + ' шт. на сумму ' + formatCurrency(allInfo.saleMoney)}</span>
                    <span className="all_colors_info">{'      На складе  ' + allInfo?.qty +
                        ' шт, на сумму ' + formatCurrency(allInfo.qtyMoney)}</span>

                    <span className="all_colors_info" style={{
                        paddingTop: '20px',
                        paddingBottom: '20px'
                    }}>{'      Лучшие товары по продажам за 30 дней '} </span>
                    <div>
                        <DataTable style={{fontSize: '14px', marginTop: '20px'}} value={items} size={'small'} paginator
                                   rows={5} rowsPerPageOptions={[5, 10, 20]} className="dataTable" sortField="saleMoney"
                                   sortOrder={-1}>
                            {/*scrollable scrollHeight="400px"*/}
                            <Column header="Товар" body={NameBodyTemplate}></Column>
                            <Column header="Фото" body={imageBodyTemplate}></Column>
                            <Column header="Цвет" body={ColorBodyTemplate}></Column>
                            <Column field="id" header="Артикул"></Column>

                            <Column field="price" sortable header="Цена"></Column>
                            <Column field="saleCount" sortable header="Продано шт."></Column>
                            <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>
                            <Column field="totalQuantity" sortable header="Остатки шт"></Column>
                            <Column field="qtyMoney" body={QtyMoneyBodyTemplate} sortable
                                    header="Остатки руб."></Column>


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

                                <Chart type="doughnut" data={chartData} options={chartOptions}
                                       className="w-full md:w-30rem"/>
                            </div>
                        </div>
                        <div className="borderOne ">
                            <span className="all_colors_info"
                                  style={{paddingBottom: '10px'}}>{'Продажи в рублях'} </span>
                            <div className="flex justify-content-center">
                                <Chart type="doughnut" data={chartDataMoney} options={chartOptions}
                                       className="w-full md:w-30rem"/>
                            </div>
                        </div>

                    </div>


                </div>
                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadColorsInfo(id)
                    }}>Сформировать отчет
                    </button>
                    <div style={{paddingTop: '20px', paddingLeft: '40px'}}>
                        <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                         fill="var(--surface-ground)" animationDuration=".9s"/>
                    </div>

                </div>
            }
        </div>
    );
};

export default ProductAllColors;