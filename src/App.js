import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Context} from "./index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import MainPage from "./components/MainPage";
import User from "./components/user";
import ProductInfo from "./components/ProductInfo";
import CompetitorInfo from "./components/product_components/competitor_info";
import ProductsSupplierInfo from "./components/product_components/products_supplier_Info";
import NoProduct from "./components/NoProduct";
import Training from "./components/training_components/Training";
import Test from "./components/test";


function App() {
    const {catalogStore} = useContext(Context)
    const {serverUpdateStore} = useContext(Context)



    useEffect(()=>{

        console.log('Главный useEffect');

        serverUpdateStore.getCurrServerInfo().then(() => {})
        const timer = setInterval(() => {
            // console.log('Запросили промежуточное состояние')
            serverUpdateStore.getCurrServerInfo().then(() => {})
        }, 1000);
        return () => clearTimeout(timer);


        // return () => {
        //     eventSource.close();
        // };


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
                <Route path="/productSupplierInfo/:id" element={<ProductsSupplierInfo/>}/>
                <Route path="/competitorInfo/:id" element={<CompetitorInfo/>}/>

                <Route path="/noProduct/" element={<NoProduct/>}/>
                <Route path="/test/" element={<Test/>}/>
                <Route path="/user/" element={<User/>}/>
                <Route path="/training/:st" element={<Training/>}/>
            </Routes>
            <Nav/>

            {/*{*/}
            {/*    eventSource.close()*/}
            {/*};*/}
        </BrowserRouter>

    );
}

export default App;
