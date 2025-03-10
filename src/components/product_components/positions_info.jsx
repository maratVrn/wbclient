import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {formatCurrency} from "../math";
import {InputSwitch} from "primereact/inputswitch";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {RadioButton} from "primereact/radiobutton";
import {ProgressSpinner} from "primereact/progressspinner";

const PositionsInfo = () => {
    let { id } = useParams();
    const {productStore} = useContext(Context)

    const [isInfoLoad, setIsInfoLoad] = useState(false)
    function loadPositionsInfo(){

    }
    useEffect(()=>{
        // console.log('useEffect supplierInfo');
        if (productStore.is_positions_info_Load) {
            loadPositionsInfo()
        }
    },[id])


    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width:'100%'}}>
            {productStore.is_supplier_info_Load ?
                // <div style={{width: '100%'}}>
                //     <span className="all_colors_info">{'      Всего товаров ' + allInfo?.productCount +', категорий '+subjects.length+
                //         ',  за 30 дней продано  ' + allInfo?.saleCount + ' шт. на сумму ' + formatCurrency(allInfo.saleMoney)}</span>
                //     <span className="all_colors_info">{'      На складе  ' + allInfo?.qty +
                //         ' шт, на сумму ' + formatCurrency(allInfo.qtyMoney)}</span>
                //
                //     <div style={{display: 'flex'}}>
                //
                //         <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)}/>
                //         <span className="all_colors_info" style={{marginLeft:'20px'}}>Отобразить категории в виде таблицы</span>
                //     </div>
                //     <div style={{marginTop:'20px'}}></div>
                //     {checked ?
                //         <DataTable style={{fontSize: '13px', width: '100%'}} value={subjects} size={'small'} paginator
                //                    rows={10} rowsPerPageOptions={[10, 25]}
                //                    selectionMode="single" selection={selectedCategory}
                //                    onSelectionChange={(e) => onCategoriesChange(e.value)}
                //                    className="dataTable">
                //             <Column field="subjectName" header="Категория"></Column>
                //             <Column field="count" sortable header="Кол-во"></Column>
                //             <Column field="saleCount" sortable header="Продано шт."></Column>
                //             <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>
                //             <Column field="totalQuantity" sortable header="Остатки шт."></Column>
                //             <Column field="qtyMoney" body={MoneyCategoryTemplate} sortable
                //                     header="Остатки руб."></Column>
                //
                //         </DataTable>
                //
                //         :
                //         <div className="flex flex-wrap gap-3 dataTable" style={{padding:'10px'}}>
                //             {subjects.map((subject) => {
                //                 return (
                //                     <div key={subject.subjectId}>
                //                         <RadioButton inputId={subject.subjectId} name="category" value={subject}
                //                                      onChange={(e) => onCategoriesChange(e.value)}
                //                                      checked={selectedCategory.subjectId === subject.subjectId}/>
                //                         <label htmlFor={subject.subjectId}
                //                                className="ml-2">{subject.subjectName} ({subject.count})</label>
                //                     </div>
                //                 );
                //             })}
                //
                //
                //         </div>
                //     }
                //     <span className="all_colors_info" style={{marginTop:'30px', marginBottom:'30px'}}>Продажи по выбранной катеогрии</span>
                //
                //     <div>
                //         <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={10}
                //                    rowsPerPageOptions={[10, 25, 50]} className="dataTable">
                //             <Column field="id" body={NameBodyTemplate} header="Артикул"></Column>
                //             <Column header="Фото" body={imageBodyTemplate}></Column>
                //             <Column field="inBase" header="Есть в базе?"></Column>
                //             <Column field="subjectName" header="Категория"></Column>
                //
                //             <Column field="price" sortable header="Цена"></Column>
                //             <Column field="saleCount" sortable header="Продано шт."></Column>
                //             <Column field="saleMoney" body={MoneyBodyTemplate} sortable header="Продано руб."></Column>
                //             <Column field="qty" sortable header="Остатки"></Column>
                //
                //         </DataTable>
                //     </div>
                // </div>
                <div>Загрузили инфо</div>
                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadPositionsInfo()
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

export default PositionsInfo;