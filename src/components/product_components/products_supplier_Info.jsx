import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../index";
import {formatCurrency} from "../math";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate, useParams} from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputSwitch } from 'primereact/inputswitch';
import Footer from "./footer";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Chart} from "primereact/chart";


const ProductsSupplierInfo = () => {
    let { id } = useParams();
    const [isStartPage, setIsStartPage] = useState(true)
    const [findText, setFindText] = useState('');
    const {productStore} = useContext(Context)
    const [checked, setChecked] = useState(false);
    const [items, setItems] = useState([])
    const [allInfo, setAllInfo] = useState({})
    const [isInfoLoad, setIsInfoLoad] = useState(false)
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({});

    const [chartDataDoughnutMoney, setChartDataDoughnutMoney] = useState({});
    const [chartDataDoughnutCount, setChartDataDoughnutCount] = useState({});
    const [chartDoughnutOptions, setChartDoughnutOptions] = useState({});

    function setDataBySubject(subjectId){

        setItems([])
        let someItems = []

        for (let i in productStore.supplierInfo) {

            if ((productStore.supplierInfo[i].idInfo.subjectId === subjectId) || (subjectId ===0)){
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
        setSubjects([])
        console.log('supplierId = '+productStore.supplierId);
        productStore.getProductAbout(id).then(() => {
            if (productStore.supplierId > 0) {
                console.log('supplierId = ' + productStore.supplierId);
                if (productStore.supplierId > 0) productStore.getSupplierInfo(productStore.supplierId).then(() => {
                    setIsInfoLoad(false)
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

                    function addDataInCat(data) {
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


                    for (let i in productStore.supplierInfo)
                        addDataInCat(productStore.supplierInfo[i])

                    setSubjects(someCategories);
                    let labels =[]// productStore.allDataDoughnut.labels
                    let countData =[]// productStore.allDataDoughnut.count[monthId]?  productStore.allDataDoughnut.count[monthId] : []
                    let moneyData =[]// productStore.allDataDoughnut.money[monthId]?  productStore.allDataDoughnut.money[monthId] : []
                    //console.log(subjects);
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


                    setChartDataDoughnutMoney(dataCountDoughnut)
                    setChartDataDoughnutCount(dataMoneyDoughnut)

                    if (someCategories.length > 0) {
                        setSelectedCategory(someCategories[0])

                        // console.log(someCategories[0]);
                        const info = {
                            productCount: someCategories[0].count,
                            saleMoney: someCategories[0].saleMoney,
                            saleCount: someCategories[0].saleCount,
                            qty: someCategories[0].totalQuantity,
                            qtyMoney: someCategories[0].qtyMoney
                        }
                        setAllInfo(info)

                    }

                    setDataBySubject(0)

                })
            } else {
                setIsInfoLoad(false)
                productStore.set_is_supplier_info_Load(false)
            }
        })




    }

    useEffect(()=>{
        // console.log('useEffect supplierInfo + id '+id);
        setIsStartPage(true)
        // console.log('useEffect ProductInfo Id = '+id);
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


    },[id])

    function getIdInfo(id){

        if (parseInt(id) !== parseInt(productStore.nowId)) {

            productStore.setNewLoadStates(false, true)
            navigate('/productInfo/' + id.toString())
        }
    }

    const NameBodyTemplate = (product) => {
        // className="table_info" style={{width:'130px'}}
        return <div >
            <span   style={{cursor:'pointer'}}
                    onClick={() => getIdInfo(product.id)}>{product.id}</span>
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

    const imageBodyTemplate = (product) => {
        return <img src={product.photoUrl} alt={product.photoUrl} className="w-2rem shadow-2 border-round"
                    style={{cursor:'pointer'}}
                    onClick={() => getIdInfo(product.id)}

        />;
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
                        <span
                            className="all_colors_info">{'      Всего товаров ' + allInfo?.productCount + ', категорий ' + subjects.length +
                            ',  за 30 дней продано  ' + allInfo?.saleCount + ' шт. на сумму ' + formatCurrency(allInfo.saleMoney)}</span>
                            <span className="all_colors_info">{'      На складе  ' + allInfo?.qty +
                                ' шт, на сумму ' + formatCurrency(allInfo.qtyMoney)}</span>

                            <div style={{display: 'flex'}}>

                                <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)}/>
                                <span className="all_colors_info" style={{marginLeft: '20px'}}>Отобразить категории в виде таблицы</span>
                            </div>
                            <div style={{marginTop: '20px'}}></div>
                            {checked ?
                                <DataTable style={{fontSize: '13px', width: '100%'}} value={subjects} size={'small'}
                                           paginator
                                           rows={10} rowsPerPageOptions={[10, 25]}
                                           selectionMode="single" selection={selectedCategory}
                                           onSelectionChange={(e) => onCategoriesChange(e.value)}
                                           className="dataTable">
                                    <Column field="subjectName" header="Категория"></Column>
                                    <Column field="count" sortable header="Кол-во"></Column>
                                    <Column field="saleCount" sortable header="Продано шт."></Column>
                                    <Column field="saleMoney" body={MoneyBodyTemplate} sortable
                                            header="Продано руб."></Column>
                                    <Column field="totalQuantity" sortable header="Остатки шт."></Column>
                                    <Column field="qtyMoney" body={MoneyCategoryTemplate} sortable
                                            header="Остатки руб."></Column>

                                </DataTable>

                                :
                                <div className="flex flex-wrap gap-3 dataTable" style={{padding: '10px'}}>
                                    {subjects.map((subject) => {
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
                            <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Продажи по выбранной катеогрии за 30 дней</span>

                            <div>
                                <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={10}
                                           rowsPerPageOptions={[10, 25, 50]} className="dataTable">
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
                            <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                                <div className="borderOne">
                                    <span className="all_colors_info"
                                          style={{paddingBottom: '10px'}}>{'Продажи в шт'} </span>
                                    <div className="flex justify-content-center">

                                        <Chart type="doughnut" data={chartDataDoughnutCount}
                                               options={chartDoughnutOptions}
                                               className="w-full md:w-30rem"/>
                                    </div>
                                </div>
                                <div className="borderOne ">
                                  <span className="all_colors_info"
                                  style={{paddingBottom: '10px'}}>{'Продажи в рублях'} </span>
                                    <div className="flex justify-content-center">
                                        <Chart type="doughnut" data={chartDataDoughnutMoney}
                                               options={chartDoughnutOptions}
                                               className="w-full md:w-30rem"/>
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