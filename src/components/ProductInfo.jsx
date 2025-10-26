import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './product_components/product.css';
import ProductPhoto from "./product_components/product_photo";
import ProductData from "./product_components/product_data";
import ProductYearData from "./product_components/productYear_data";
import ProductAbout from "./product_components/product_about";
import ProductsSupplierInfo from "./product_components/products_supplier_Info";
import ProductAllColors from "./product_components/product_all_colors";
import Footer from "./footer";
import PositionsInfo from "./product_components/positions_info";
import CompetitorInfo from "./product_components/competitor_info";
import {InputNumber} from "primereact/inputnumber";
import { Button } from 'primereact/button';

const ProductInfo =observer( (props ) => {
    const {productStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const [isInWB, setIsInWB] = useState(false)
    const [isInBase, setIsInBase] = useState(false)

    const navigate = useNavigate();

    let { id } = useParams();
    useEffect(()=>{
        // console.log('useEffect ProductInfo Id = '+id);
        if (parseInt(id) > 0) getIdInfo(id)

    },[id])

    function getIdInfo(id){
        if (id > 0) {
            if (parseInt(id) > 0) {
                productStore.getProductStartInfo(id).then(() => {
                        setIsInWB(productStore.idInfo.isInWB)
                        setIsInBase(productStore.idInfo.isInBase)


                    }
                )
            }

            productStore.setState(id)

        }
    }


    return (


        <div className="page">
            <div>
                <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                    <div className="borderOne">
                        <ProductPhoto id={id} isInWB={isInWB} isInBase={isInBase}/>
                    </div>
                    <div className="borderOne exmpl">
                        <ProductAbout id={id} isInWB={isInWB} isInBase={isInBase}/>
                    </div>

                </div>

                <ProductData id={id} isInBase={isInBase}/>

            </div>

            <div style={{height: '100px'}}></div>
        </div>
    );
});

export default ProductInfo;