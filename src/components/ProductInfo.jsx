import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './product_components/product.css';
import ProductPhoto from "./product_components/product_photo";
import ProductData from "./product_components/product_data";
import ProductAbout from "./product_components/product_about";



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
            // console.log('getIdInfo Id = '+id);
            setIsInWB(false)
            setIsInBase(false)
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