import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './product_components/product.css';
import ProductPhoto from "./product_components/product_photo";
import ProductData from "./product_components/product_data";
import ProductAbout from "./product_components/product_about";
import ProductsSupplierInfo from "./product_components/products_supplier_Info";
import {TabPanel, TabView} from "primereact/tabview";
import ProductAllColors from "./product_components/product_all_colors";
import Footer from "./product_components/footer";
import PositionsInfo from "./product_components/positions_info";

const ProductInfo =observer( (props ) => {
    const {productStore} = useContext(Context)

    let { id } = useParams();
    useEffect(()=>{
        // console.log('перешли на страницу товара и смотрим id '+id);
        productStore.setState(id)
    },[id])
    return (


        <div className="page">
            <div className="product_grid">
                < div className="main_item">
                    <ProductPhoto id={id}/>
                </div>
                <div className="main_item">
                    <ProductAbout id={id}/>
                </div>

                <div className="main_item">
                    <ProductData id={id}/>
                </div>

            </div>
            <div>
                <TabView className="a-tab">
                    <TabPanel header="Отчет по всем цветам">
                        <ProductAllColors id={id}/>
                    </TabPanel>
                    <TabPanel header="Позиции в выдаче">
                        <PositionsInfo id={id}/>
                    </TabPanel>
                    <TabPanel header="Аналитика 2025">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium

                        </p>
                    </TabPanel>
                    <TabPanel header="Отчет по поставщику">
                        <ProductsSupplierInfo id={id} />


                    </TabPanel>
                    <TabPanel header="Аналитика конкурентов">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium

                        </p>
                    </TabPanel>
                </TabView>
            </div>
            <div style={{height: '100px'}}></div>
            <Footer/>
        </div>
    );
});

export default ProductInfo;