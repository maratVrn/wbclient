import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../index";
import {formatCurrency} from "../math";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate, useParams} from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputSwitch } from 'primereact/inputswitch';


const ProductsSupplierInfo = () => {
    let { id } = useParams();
    const {productStore} = useContext(Context)
    const [checked, setChecked] = useState(false);
    const [items, setItems] = useState([])
    const [allInfo, setAllInfo] = useState({})
    const [isInfoLoad, setIsInfoLoad] = useState(false)
    const {catalogStore} = useContext(Context)
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({});

    function setDataBySubject(subjectId){
        setItems([])
        let someItems = []

        for (let i in productStore.supplierInfo) {
            if ((productStore.supplierInfo[i].subjectId === subjectId) || (subjectId ===0)){

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
                    subjectName: productStore.supplierInfo[i].subjectName,
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

        if (productStore.supplierId>0) productStore.getSupplierInfo(productStore.supplierId).then(() => {
            setIsInfoLoad(false)
            let someCategories = []
            someCategories.push({subjectId:0,subjectName:'Все категории', count : 0, saleCount:0, saleMoney:0, totalQuantity:0, qtyMoney:0})
            function addDataInCat(data){
                let saleCount = 0, saleMoney = 0, totalQuantity = 0, qtyMoney = 0

                if (data.productInfo)
                    try {
                        saleMoney = data.productInfo.saleMoney
                        saleCount = data.productInfo.saleCount
                        totalQuantity = data.productInfo.totalQuantity
                        qtyMoney = totalQuantity * data.productInfo.price
                    } catch (e) {}



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
                } catch (e){}
                if (subjectId>0){
                    let isIn = false
                    for (let j in someCategories){
                        if (parseInt(someCategories[j].subjectId) === parseInt(subjectId)) {
                            someCategories[j].count ++
                            someCategories[j].saleMoney += saleMoney
                            someCategories[j].saleCount += saleCount
                            someCategories[j].totalQuantity += totalQuantity
                            someCategories[j].qtyMoney += qtyMoney
                            isIn = true
                            break
                        }
                    }
                    if (!isIn) someCategories.push({subjectId:parseInt(subjectId),subjectName:subjectName, count : 1, saleCount:saleCount, saleMoney:saleMoney, totalQuantity:totalQuantity, qtyMoney : qtyMoney})

                }


            }


            for (let i in productStore.supplierInfo)
                addDataInCat(productStore.supplierInfo[i])

            setSubjects(someCategories);
            if (someCategories.length>0 ) {
                setSelectedCategory(someCategories[0])

                // console.log(someCategories[0]);
                const info = {
                    productCount  : someCategories[0].count,
                    saleMoney   : someCategories[0].saleMoney,
                    saleCount   : someCategories[0].saleCount,
                    qty         : someCategories[0].totalQuantity,
                    qtyMoney    : someCategories[0].qtyMoney
                }
                setAllInfo(info)

            }

            setDataBySubject(0)

        })
    }

    useEffect(()=>{
        // console.log('useEffect supplierInfo');
        if (productStore.is_supplier_info_Load) {
            loadSupplierInfo() }
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


    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width:'100%'}}>

            {productStore.is_supplier_info_Load ?
                <div style={{width: '100%'}}>
                    <span className="all_colors_info">{'      Всего товаров ' + allInfo?.productCount +', категорий '+subjects.length+
                        ',  за 30 дней продано  ' + allInfo?.saleCount + ' шт. на сумму ' + formatCurrency(allInfo.saleMoney)}</span>
                    <span className="all_colors_info">{'      На складе  ' + allInfo?.qty +
                        ' шт, на сумму ' + formatCurrency(allInfo.qtyMoney)}</span>

                    <div style={{display: 'flex'}}>

                        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)}/>
                        <span className="all_colors_info" style={{marginLeft:'20px'}}>Отобразить категории в виде таблицы</span>
                    </div>
                    <div style={{marginTop:'20px'}}></div>
                    {checked ?
                        <DataTable style={{fontSize: '13px', width: '100%'}} value={subjects} size={'small'} paginator
                                   rows={10} rowsPerPageOptions={[10, 25]}
                                   selectionMode="single" selection={selectedCategory}
                                   onSelectionChange={(e) => onCategoriesChange(e.value)}
                                   className="dataTable">
                            <Column field="subjectName" header="Категория"></Column>
                            <Column field="count" sortable header="Кол-во"></Column>
                            <Column field="saleCount" sortable header="Продано шт."></Column>
                            <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>
                            <Column field="totalQuantity" sortable header="Остатки шт."></Column>
                            <Column field="qtyMoney" body={MoneyCategoryTemplate} sortable
                                    header="Остатки руб."></Column>

                        </DataTable>

                        :
                        <div className="flex flex-wrap gap-3 dataTable" style={{padding:'10px'}}>
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
                    <span className="all_colors_info" style={{marginTop:'30px', marginBottom:'30px'}}>Продажи по выбранной катеогрии за 30 дней</span>

                    <div>
                        <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={10}
                                   rowsPerPageOptions={[10, 25, 50]} className="dataTable">
                            <Column field="id" body={NameBodyTemplate} header="Артикул"></Column>
                            <Column header="Фото" body={imageBodyTemplate}></Column>
                            <Column field="inBase" header="Есть в базе?"></Column>
                            <Column field="subjectName" header="Категория"></Column>

                            <Column field="price" sortable header="Цена"></Column>
                            <Column field="saleCount" sortable header="Продано шт."></Column>
                            <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>
                            <Column field="qty" sortable header="Остатки"></Column>

                        </DataTable>
                    </div>
                </div>

                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadSupplierInfo()
                    }}>Сформировать отчет
                    </button>
                    {isInfoLoad ?
                        <div>
                            <div style={{paddingTop: '20px', paddingLeft:'40px'}}>
                                <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                             fill="var(--surface-ground)" animationDuration=".9s"/>
                            </div>
                            <div  style={{paddingTop:'20px', fontSize:'20', fontWeight:'450'}}>
                                <span >Загрузка отчета...</span>
                            </div>
                        </div>
                        :
                        <div></div>

                    }
                </div>
            }


        </div>
    );
};

export default ProductsSupplierInfo;