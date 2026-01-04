import React, {useContext, useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {Context} from "../../index";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";

const StartProducts = () => {
    const {startProductsStore} = useContext(Context)
    const [startProducts, setStartProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    useEffect(()=>{

        if (!userStore.isLogin) navigate('/')
            else if (userStore.role !== "ADMIN") navigate('/')

        loadStartProducts()
    },[])

    function loadStartProducts (needDelete = false) {
        setSelectedProducts(null)
        let deleteIdList = []
        if (needDelete) for (let i in selectedProducts) deleteIdList.push(parseInt(selectedProducts[i].id))
        setStartProducts([])
        startProductsStore.loadAllStartProducts( needDelete, deleteIdList).then(() => {
                setStartProducts(startProductsStore.allStartProducts)
            }
        )
    }
    const imageBodyTemplate = (product) => {
        return <img className="little_photo" src={product.photoUrl}  />;
    };

    const discountAddTemplate = (product) => {
        let addDiscount = 0
        let nowDiscount = 0
        // try {addDiscount = Math.round(-1000*(product.crPrice - product.startPrice)/(product.startPrice+0.1))/10} catch (e) {addDiscount = 0}
        // const nowDiscount =  Math.round(product.startDiscount+addDiscount)

        try {
            const msp = 100*product.startPrice/(100-product.startDiscount)
            nowDiscount = Math.round(1000*(msp -product.price)/(msp-1) )/10
        } catch (e) { nowDiscount = 0}
        addDiscount = Math.round(10*(nowDiscount - product.startDiscount))/10


        return <>
            {-1*addDiscount < 10 ?

                < div style= {{color:'green'}}> {addDiscount} % Now ({nowDiscount})</div>

                :
                < div style= {{color:'red'}}> {addDiscount} % Now ({nowDiscount})</div>


            }
        </>

    };

    const crQtyTemplate = (product) => {
        return <>
            {product.crQty > 2 ?

                < div style= {{color:'green'}}> {product.crQty}</div>

                :
                < div style= {{color:'red'}}> {product.crQty}</div>


            }
        </>

    };
    const priceTemplate = (product) => {
        return <>
            {product.price > 0 ?

                < div style= {{color:'green'}}> {product.price}</div>

                :
                < div style= {{color:'red'}}> {product.price}</div>


            }
        </>

    };


    return (
        <div style={{padding: '50px'}}>

            <div className="flex-grow-1 text-center  justify-content-center border-1  p-1 m-2 border-round">

                <Button severity="secondary" label="Удалить"
                        style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                        onClick={() => loadStartProducts(true)}
                />

                <DataTable
                    value={startProducts}
                    selection={selectedProducts}
                    // selectionMode="single"
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    tableStyle={{minWidth: '20rem'}}>
                    <Column selectionMode="multiple" field="id" header="id"></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="id" header="id"></Column>
                    <Column field="name" header="name"></Column>
                    <Column body={discountAddTemplate}  header="DiscountAdd"></Column>
                    <Column field="startDiscount" header="startDiscount"></Column>

                    <Column field="startQty" header="startQty"></Column>
                    <Column body={crQtyTemplate} header="crQty"></Column>

                    <Column field="startPrice" header="startPrice"></Column>
                    <Column body={priceTemplate}  header="crPrice"></Column>

                </DataTable>
            </div>

        </div>
    );
};

export default StartProducts;