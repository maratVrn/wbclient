import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Context} from "./index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import MainPage from "./components/MainPage";
import Test from "./components/test";
import { useLocation } from 'react-router-dom';
import ProductInfo from "./components/ProductInfo";
import NoProduct from "./components/NoProduct";
import Footer from "./components/product_components/footer";

function App() {
    const {catalogStore} = useContext(Context)
    // const location = useLocation();

    // useEffect(() => {
    //     // console.log('Current location is ', location);
    // }, [location]);

    useEffect(()=>{
        catalogStore.getLiteWBCatalog().then(() => {
                console.log('Загрузили каталог');

            }
        )

        // console.log('Загрузка стартовых данных');
        //
        // // Проверяем если пользователь ранее логинился то рефрешим его
        //
        //
        // if (localStorage.getItem('token')){
        //     userStore.checkAuth()
        // }

    })

    return (
        // <Test/>

        <BrowserRouter>
            {/*<Test/>*/}
            <Routes>

                <Route path="/" element={<MainPage/>}/>
                <Route path="/products/:id" element={<ProductList/>}/>
                <Route path="/productInfo/:id" element={<ProductInfo/>}/>
                <Route path="/noProduct/" element={<NoProduct/>}/>

            </Routes>
            <Nav/>


        </BrowserRouter>

    );
}

export default App;
