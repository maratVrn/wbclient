import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Button } from 'primereact/button';
import {ProgressSpinner} from "primereact/progressspinner";
import {InputText} from "primereact/inputtext";


const PositionsInfo = () => {
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const [findText, setFindText] = useState('');
    const [addFindResult, setAddFindResult] = useState('');
    const {productStore} = useContext(Context)
    const [items, setItems] = useState([])
    const [isInfoLoad, setIsInfoLoad] = useState(false)


    function loadPositionsInfo(){


        setItems([])


        productStore.getPositionsInfo(id).then(() => {
            setIsInfoLoad(false)
            setItems(productStore.positionsInfo)
        })
    }
    useEffect(()=>{
        // console.log('useEffect supplierInfo');
        if (productStore.is_positions_info_Load) {
            loadPositionsInfo()
        }
    },[id])

    const NameBodyTemplate = (product) => {
        return <div className="table_info" >
            <span   style={{cursor:'pointer'}}
                    >{product.searchWord}</span>
        </div>;
    };

    const positionTemplate = (product) => {
        return <div  >
            {product.position >= 1000 ? '>'+product.position : product.position}

        </div>;
    };
    const pageTemplate = (product) => {
        return <div  >
            {product.position >= 1000 ? '>'+product.pageResult : product.pageResult}

        </div>;
    };

    const load = () => {
        setLoading(true);
        const newSearchText = findText

        productStore.addPositionsInfo(id,newSearchText).then(() => {

            setItems(productStore.positionsInfo)
            setLoading(false);
            setFindText('')
            setAddFindResult('Поисковый запрос "'+newSearchText+'" добавлен в таблицу')
        })

    };

    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width:'100%'}}>
            {productStore.is_positions_info_Load ?

                <div style={{width: '100%'}}>


                    <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Позиции в выдаче по запросам</span>

                    <div className="flex" style={{paddingLeft: '40px'}}>
                        <span className="all_colors_info" style={{marginTop: '12px', marginBottom: '30px'}}>Добавить поисковую фразу</span>
                        <InputText style={{width: '60%', height: '40px', marginLeft: '20px'}} value={findText}
                                   onChange={(e) => setFindText(e.target.value)}/>
                        <Button style={{width: '130px', height: '40px', marginLeft: '20px', fontSize: '14px'}}
                                onClick={load} label="Загрузить" severity="secondary" loading={loading}/>

                    </div>
                    <span className="all_colors_info" style={{marginTop: '0px', marginBottom: '20px'}}>{addFindResult}</span>

                    <div>

                        <DataTable style={{fontSize: '14px'}} value={items} size={'small'}
                            // paginator rows={10}   rowsPerPageOptions={[10, 25, 50]}
                                   className="dataTable">
                            <Column field="searchWord" body={NameBodyTemplate} header="Поисковая фраза"></Column>

                            <Column field="position" body={positionTemplate} sortable header="Позиция"></Column>
                            <Column field="pageResult" sortable body={pageTemplate} header="Страница"></Column>
                            <Column field="total" sortable header="Всего позиций"></Column>


                        </DataTable>
                    </div>

                </div>
                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadPositionsInfo()
                    }}>Сформировать отчет
                    </button>
                    {isInfoLoad ?
                        <div>
                            <div style={{paddingTop: '20px', paddingLeft: '40px'}}>
                                <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                                 fill="var(--surface-ground)" animationDuration=".9s"/>
                            </div>
                            <div style={{paddingTop: '20px', fontSize: '20', fontWeight: '450'}}>
                                <span>Загрузка отчета...</span>
                            </div>
                        </div>
                        :
                        <div>

                            {/*что то загрузили*/}
                        </div>

                    }
                </div>
            }
        </div>
    );
};

export default PositionsInfo;