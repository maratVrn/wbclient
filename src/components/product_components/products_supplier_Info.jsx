import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../index";
import {formatCurrency} from "../math";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate, useParams, Link } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputSwitch } from 'primereact/inputswitch';
import Footer from "./footer";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Chart} from "primereact/chart";
import ProductsDataCalcStore from "../../store/productsDataCalcStore";


const ProductsSupplierInfo = () => {
    let { id } = useParams();
    const [isStartPage, setIsStartPage] = useState(true)
    const [findText, setFindText] = useState('');
    const {productStore} = useContext(Context)
    const {productsDataCalcStore} = useContext(Context)
    const [checked, setChecked] = useState(true);
    const [items, setItems] = useState([])
    const [allInfo, setAllInfo] = useState({})
    const [isInfoLoad, setIsInfoLoad] = useState(false)
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState({});
    const [chartDoughnutOptions, setChartDoughnutOptions] = useState({});
    const [chartOptionsMonth, setChartOptionsMonth] = useState({});

    const [chartDataMonth_allMonth, setChartDataMonth_allMonth] = useState({});
    const [chartDataMoneyMonth_allMonth, setChartDataMoneyMonth_allMonth] = useState({});


    function setDataBySubject(subjectId){
        setItems([])
        let someItems = []

        for (let i in productStore.supplierInfo) {

            if ((productStore.supplierInfo[i].idInfo.subjectId === subjectId) || (subjectId ===0))
                // if (productStore.supplierInfo[i].productInfo?.price > 250)
                {
                let price = 0
                let saleCount = 0
                let saleMoney = 0
                let qty = 0
                let qtyMoney = 0
                let inBase = 'Нет'
                if (productStore.supplierInfo[i].productInfo) {
                    try {
                        price = productStore.supplierInfo[i].productInfo.price
                        saleMoney = productStore.supplierInfo[i].productInfo.saleMoney
                        saleCount = productStore.supplierInfo[i].productInfo.saleCount
                        qty = productStore.supplierInfo[i].productInfo.totalQuantity
                        qtyMoney = qty * price
                        inBase = 'Да'

                    } catch (er) {
                        console.log(er);
                    }

                }

                const oneItem = {
                    id: productStore.supplierInfo[i].id,
                    subjectName: productStore.supplierInfo[i].idInfo.subjectName,
                    price: price,
                    saleCount: saleCount,
                    saleMoney: saleMoney,
                    qty: qty,
                    qtyMoney: qtyMoney,
                    inBase: inBase,
                    photoUrl : productStore.supplierInfo[i].photoUrl
                }
                someItems.push(oneItem)
            }
        }
        setItems(someItems)

    }

    function loadSupplierInfo(){

        setItems([])
        productsDataCalcStore.setNoData()
        productStore.getProductAbout(id).then(() => {
            if (productStore.supplierId > 0) {
                console.log('supplierId = ' + productStore.supplierId);
                if (productStore.supplierId > 0) productStore.getSupplierInfo(productStore.supplierId).then(() => {

                    productsDataCalcStore.setProductList(productStore.supplierInfo)
                    productsDataCalcStore.setCategoriesList()
                    productsDataCalcStore.calcAllYearDataByMonth()
                    setIsInfoLoad(false)


                    if (productsDataCalcStore.categoriesListAnd30DaysData.length > 0) {
                        setSelectedCategory(productsDataCalcStore.categoriesListAnd30DaysData[0])

                        const info = {
                            productCount: productsDataCalcStore.categoriesListAnd30DaysData[0].count,
                            saleMoney: productsDataCalcStore.categoriesListAnd30DaysData[0].saleMoney,
                            saleCount: productsDataCalcStore.categoriesListAnd30DaysData[0].saleCount,
                            qty: productsDataCalcStore.categoriesListAnd30DaysData[0].totalQuantity,
                            qtyMoney: productsDataCalcStore.categoriesListAnd30DaysData[0].qtyMoney
                        }
                        setAllInfo(info)


                    }

                    setDataBySubject(0)
                    setData(0)

                    // productsDataCalcStore.allCalcYearCategoriesData


                })
            } else {
                setIsInfoLoad(false)
                productStore.set_is_supplier_info_Load(false)
            }
        })




    }

    function setData(){

        let monthArray = []
        let saleArrayMonth_allMonth = []
        let saleMoneyArrayMonth_allMonth = []

        for (let i = 1; i < productsDataCalcStore.selectedCalcYearData_bySubjectID.monthArray.length; i++) {
            monthArray.push(productsDataCalcStore.selectedCalcYearData_bySubjectID.monthArray[i])
            saleArrayMonth_allMonth.push(productsDataCalcStore.selectedCalcYearData_bySubjectID.saleArrayMonth[i])
            saleMoneyArrayMonth_allMonth.push(productsDataCalcStore.selectedCalcYearData_bySubjectID.saleMoneyArrayMonth[i])

        }

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

        setChartDataMonth_allMonth(dataMonth_allMonth)
        setChartDataMoneyMonth_allMonth(dataMoneyMonth_allMonth)

    }

    useEffect(()=>{
        // console.log('useEffect supplierInfo + id '+id);
        setIsStartPage(true)
        if (id > 0) {
            setIsStartPage(false)
            setIsInfoLoad(true)
            loadSupplierInfo()
            }
        const doughnutOptions = {
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
        setChartDoughnutOptions(doughnutOptions)
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


    },[id])

    function getIdInfo(id){

        if (parseInt(id) !== parseInt(productStore.nowId)) {

            productStore.setNewLoadStates(false, true)
            navigate('/productInfo/' + id.toString())

        }
    }

    const NameBodyTemplate = (product) => {

        return <div >
            {/*{*/}
            {/*    parseInt(id) === parseInt(product.id) ?*/}
            {/*        <Link style={{textDecoration: 'none'}} to={`/productInfo/${parseInt(product.id)}`} target="_blank"*/}
            {/*              rel="noopener noreferrer">*/}
            {/*    <span style={{cursor: 'pointer', color: '#4b5563'}}>{product.id}</span>*!/*/}
            {/*        </Link>*/}
            {/*        :<div>*/}
            {/*        <span style={{cursor: 'pointer', color: '#4b5563'}}>{product.id}</span>*/}
            {/*        </div>*/}
            {/*}*/}
                    <Link style={{textDecoration: 'none'}} to={`/productInfo/${parseInt(product.id)}`} target="_blank"
                          rel="noopener noreferrer">
                        <span style={{cursor: 'pointer', color: '#4b5563'}}>{product.id}</span>
                    </Link>


        </div>;
    };

    const MoneyBodyTemplate = (product) => {
        return <div>
            <span>{formatCurrency(product.saleMoney)}</span>
        </div>;
    };

    const MoneyCategoryTemplate = (product) => {
        return <div>
            <span>{formatCurrency(product.qtyMoney)}</span>
        </div>;
    };

    function onCategoriesChange(value){
        if (value) {
            setSelectedCategory(value)
            if (value.subjectId >= 0) setDataBySubject(value.subjectId)
        }
    }

    function onCategoriesChangeAllYear(value){
        if (value) {
            setSelectedCategory(value)
            if (value.subjectId >= 0) {
                productsDataCalcStore.setMonthDataBySubjectId(value.subjectId)
                setData(0)
            }
        }
    }

    const imageBodyTemplate = (product) => {
        return <div>
            <Link style={{textDecoration: 'none'}} to={`/productInfo/${parseInt(product.id)}`} target="_blank"
                  rel="noopener noreferrer">
                <img src={product.photoUrl} alt={product.photoUrl} className="w-2rem shadow-2 border-round"
                     style={{cursor:'pointer'}}
                     onClick={() => getIdInfo(product.id)}

                />
            </Link>

        </div>
    };

    const checkDataAndFindProduct = () => {
        const newId = parseInt(findText)
        if (newId !== parseInt(id)) {
            productStore.setSupplierId(0)
            productStore.set_is_supplier_info_Load(false)
            setFindText('')
            if (newId) {
                navigate('/productSupplierInfo/' + newId.toString())
            }
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            checkDataAndFindProduct()
        }
    };

    return (
        <div className="page">

            {isStartPage ?
                <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика продавца (селлера) на Wildberries</h2>
                    <p className="mainFont">Анализируйте продавцов на Wildberries, изучайте какие товары они продают, в каких категориях, какие товары лучше продаются а также общие продажи</p>
                </div>
                : <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика продавца (селлера) на Wildberries</h2></div>
            }
            <div className="flex-three-column-grid">
                <p className="mainFont" style={{paddingRight: '10px'}}>Введите артикул товара</p>
                <InputNumber style={{width: '350px', height: '40px', marginRight: '20px'}} value={findText}
                             onKeyPress={handleKeyPress} useGrouping={false}
                             onValueChange={(e) => setFindText(e.target.value)}/>
                <Button onClick={() => checkDataAndFindProduct()} className="mainFont"
                        style={{paddingLeft: '20px', maxWidth: '120px', height: '40px'}} label="Найти"/>


            </div>

            {isStartPage ?
                <div>
                    <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Изучите товар для продажи</h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучите аналогичный товар
                                конкурента</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Смотрите данные о продажах за
                                послдений
                                30 дней</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучайте поставки и возвраты</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./images/im1.jpg')}/>
                        </div>

                    </div>
                    <div className="left-sidebar" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Анализируйте продажи по всем цветам товара</h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>В отчете доступные общие данные по
                                продажам
                                за 30 дней по всем цветам</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучайте какие цвета продаются
                                лучше</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Анализируйте цены, продажи и остатки
                                в сводной таблице</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./images/im2.jpg')}/>
                        </div>

                    </div>


                </div>
                :
                <div className="flex align-items-center" style={{justifyContent: 'center', width: '100%'}}>

                    {productStore.is_supplier_info_Load ?
                        <div style={{width: '100%'}}>
                            <div className="responsive-two-column-grid" style={{
                                alignItems: 'center',
                                backgroundColor: 'rgb(240,242,244)',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                                borderRadius: '12px'
                            }}>
                                <div className="borderOne">
                                <span className="textMain"
                                      style={{marginLeft: '20px'}}>Продавец: {productStore.supplierAbout?.trademark}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>Организация: {productStore.supplierAbout?.supplierName}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>ИД продавца: {productStore.supplierId}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>ИНН: {productStore.supplierAbout?.inn}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>ОГРНИП: {productStore.supplierAbout?.ogrnip}</span>
                                </div>
                                <div className="borderOne ">
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>Товаров на wildberries: {allInfo?.productCount}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>Категорий на wildberries: {productsDataCalcStore.categoriesListAnd30DaysData.length}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>{'За 30 дней продано  ' + allInfo?.saleCount + ' шт. на сумму ' + formatCurrency(allInfo.saleMoney)}</span>
                                    <span className="textMain"
                                          style={{marginLeft: '20px'}}>{'На складе  ' + allInfo?.qty + ' шт, на сумму ' + formatCurrency(allInfo.qtyMoney)}</span>
                                </div>

                            </div>

                            <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                                <h2>Общая аналитика продаж по всем категориям за 30 дней</h2></div>

                            <div style={{marginTop: '20px'}}></div>
                            {checked ?
                                <DataTable style={{fontSize: '13px', width: '100%'}} value={productsDataCalcStore.categoriesListAnd30DaysData} size={'small'}
                                           paginator
                                           rows={10} rowsPerPageOptions={[10, 25]}
                                           selectionMode="single" selection={selectedCategory}
                                           onSelectionChange={(e) => onCategoriesChange(e.value)}
                                           className="dataTable">
                                    <Column field="subjectName" header="Категория"></Column>
                                    <Column field="count" sortable header="Кол-во товаров"></Column>
                                    <Column field="saleCount" sortable header="Продано шт."></Column>
                                    <Column field="saleMoney" body={MoneyBodyTemplate} sortable
                                            header="Продано руб."></Column>
                                    <Column field="totalQuantity" sortable header="Остатки шт."></Column>
                                    <Column field="qtyMoney" body={MoneyCategoryTemplate} sortable
                                            header="Остатки руб."></Column>

                                </DataTable>

                                :
                                <div className="flex flex-wrap gap-3 dataTable" style={{padding: '10px'}}>
                                    {productsDataCalcStore.categoriesListAnd30DaysData.map((subject) => {
                                        return (
                                            <div key={subject.subjectId}>
                                                <RadioButton inputId={subject.subjectId} name="category" value={subject}
                                                             onChange={(e) => onCategoriesChange(e.value)}
                                                             checked={selectedCategory.subjectId === subject.subjectId}/>
                                                <label htmlFor={subject.subjectId}
                                                       className="ml-2">{subject.subjectName} ({subject.count})</label>
                                            </div>
                                        );
                                    })}


                                </div>
                            }
                            <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Список товаров и аналитика выбранной катеогрии за 30 дней</span>

                            <div>


                                <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={5}
                                           rowsPerPageOptions={[5, 10, 25, 50]} className="dataTable">
                                    <Column field="id" body={NameBodyTemplate} header="Артикул"></Column>
                                    <Column header="Фото" body={imageBodyTemplate}></Column>
                                    <Column field="inBase" header="Есть в базе?"></Column>
                                    <Column field="subjectName" header="Категория"></Column>

                                    <Column field="price" sortable header="Цена"></Column>
                                    <Column field="saleCount" sortable header="Продано шт."></Column>
                                    <Column field="saleMoney" body={MoneyBodyTemplate} sortable
                                            header="Продано руб."></Column>
                                    <Column field="qty" sortable header="Остатки"></Column>

                                </DataTable>
                            </div>
                            <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Распределение продаж по категориям за 30 дней</span>
                            <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                                <div className="borderOne">
                                    <span className="all_colors_info"
                                          style={{paddingBottom: '10px'}}>{'Продажи в шт'} </span>
                                    <div className="flex justify-content-center">

                                        <Chart type="doughnut"
                                               data={productsDataCalcStore.doughnut30DaysData_byCategories.dataCountDoughnut30Days}
                                               // data={chartDataDoughnutCount}
                                               options={chartDoughnutOptions}
                                               className="w-full md:w-30rem"/>
                                    </div>
                                </div>
                                <div className="borderOne ">
                                  <span className="all_colors_info"
                                        style={{paddingBottom: '10px'}}>{'Продажи в рублях'} </span>
                                    <div className="flex justify-content-center">
                                        <Chart type="doughnut"
                                               data={productsDataCalcStore.doughnut30DaysData_byCategories.dataMoneyDoughnut30Days}
                                               // data={chartDataDoughnutMoney}
                                               options={chartDoughnutOptions}
                                               className="w-full md:w-30rem"/>
                                    </div>
                                </div>

                            </div>


                            <div style={{width: '100%', textAlign: 'center', paddingTop: '20px'}}>
                                <h2>Общая аналитика продаж за 2025 год</h2>
                                <DataTable style={{fontSize: '13px', width: '100%'}}
                                           value={productsDataCalcStore.allCalcYearCategoriesData}

                                           size={'small'}
                                           paginator
                                           rows={5} rowsPerPageOptions={[5, 10, 25]}
                                           selectionMode="single" selection={selectedCategory}
                                           sortField="saleMoney"
                                           sortOrder={-1}
                                           onSelectionChange={(e) => onCategoriesChangeAllYear(e.value)}
                                           className="dataTable">
                                    <Column field="subjectName" header="Категория"></Column>
                                    <Column field="count" sortable header="Кол-во товаров"></Column>
                                    <Column field="saleCount" sortable header="Продано шт."></Column>
                                    <Column field="saleMoney" body={MoneyBodyTemplate} sortable
                                            header="Продано руб."></Column>

                                </DataTable>

                                <div className="chart_info">
                                    <span className="all_colors_info"> Продажи по месяцам ВСЕ товары в выбранной категории (шт) </span>
                                </div>
                                <div className="item_data">
                                    <div className="chart_item">
                                        <Chart type="bar" className="all_div" data={chartDataMonth_allMonth}
                                               options={chartOptionsMonth}/>
                                    </div>
                                </div>

                                <div className="chart_info">
                                    <span className="all_colors_info"> Продажи по месяцам ВСЕ товары в выбранной категории (руб) </span>
                                </div>
                                <div className="item_data">
                                    <div className="chart_item">
                                        <Chart type="bar" className="all_div" data={chartDataMoneyMonth_allMonth}
                                               options={chartOptionsMonth}/>
                                    </div>
                                </div>
                                <div className="chart_info">
                                    <span className="all_colors_info"> Распределение продаж по категориям </span>
                                </div>
                                <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                                    <div className="borderOne">
                                    <span className="all_colors_info"
                                          style={{paddingBottom: '10px'}}>{'Продажи в шт'} </span>
                                        <div className="flex justify-content-center">

                                            <Chart type="doughnut"
                                                   data={productsDataCalcStore.doughnutYearData_byCategories.dataCountDoughnutYear}
                                                // data={chartDataDoughnutCount}
                                                   options={chartDoughnutOptions}
                                                   className="w-full md:w-30rem"/>
                                        </div>
                                    </div>
                                    <div className="borderOne ">
                                  <span className="all_colors_info"
                                        style={{paddingBottom: '10px'}}>{'Продажи в рублях'} </span>
                                        <div className="flex justify-content-center">
                                            <Chart type="doughnut"
                                                   data={productsDataCalcStore.doughnutYearData_byCategories.dataMoneyDoughnutYear}
                                                // data={chartDataDoughnutMoney}
                                                   options={chartDoughnutOptions}
                                                   className="w-full md:w-30rem"/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        :
                        <div>
                            {isInfoLoad ?
                                <div>
                                    <div style={{paddingTop: '20px', paddingLeft: '40px'}}>
                                        <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                                         fill="var(--surface-ground)" animationDuration=".9s"/>
                                        <p>Формируем отчет</p>
                                    </div>

                                </div>
                                :
                                <div>По введеному артикулу {id} данные о товаре и продавце не найдены</div>

                            }
                        </div>
                    }


                </div>
            }


            <Footer/>
            <div style={{height: '100px'}}></div>
        </div>
    );
};

export default ProductsSupplierInfo;