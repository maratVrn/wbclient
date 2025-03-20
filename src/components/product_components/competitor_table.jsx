import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {formatCurrency} from "../math";
import {useParams} from "react-router-dom";

const CompetitorTable = (props) => {
    const [items, setItems] = useState([])

    const idBodyTemplate = (product) => {
        return <div>
            <span style={{paddingTop: '20px'}}> {product.id} </span>
            <a style={{width: '70%', marginTop: '10px'}}
               href={`http://localhost:3000/productInfo/${product.id}`} target="_blank"

               rel="noopener noreferrer"
            >
                <i className=" pi pi-sign-in "
                    // onClick={}
                   style={{
                       fontSize: '1.2rem',
                       cursor: 'pointer',
                       marginLeft: '10px',
                       // marginTop:'20px',
                       color: '#bf92e6',
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

    useEffect(() => {
        setItems([])
        if (props.items) setItems(props.items)
    }, [])

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
            <div>
                <DataTable style={{fontSize: '14px'}} value={items} size={'small'} paginator rows={10}
                           rowsPerPageOptions={[10, 25, 50]} className="dataTable">
                    <Column field="position"   sortable header="№"></Column>
                    <Column field="name" body={NameBodyTemplate} header="Название"></Column>
                    <Column field="supplier"  body = {SupplierBodyTemplate} header="Продавец"></Column>
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