import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Context} from "./index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import MainPage from "./components/MainPage";
import Test from "./components/test";
import User from "./components/user";
import { useLocation } from 'react-router-dom';
import ProductInfo from "./components/ProductInfo";
import ProductsSupplierInfo from "./components/product_components/products_supplier_Info";
import NoProduct from "./components/NoProduct";
import Training from "./components/training_components/Training";
import Footer from "./components/product_components/footer";

function App() {
    const {catalogStore} = useContext(Context)
    // const location = useLocation();

    // useEffect(() => {
    //     // console.log('Current location is ', location);
    // }, [location]);

    useEffect(()=>{

        // Прием сообщений от сервера - обнвление данных для админки
        // const eventSource = new EventSource('http://localhost:5006/sse');
        // eventSource.onmessage = (event) => {
        //     const newData = JSON.parse(event.data);
        //     console.log('newData');
        //     console.log(newData);
        // };


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
                <Route path="/noProduct/" element={<NoProduct/>}/>
                <Route path="/user/" element={<User/>}/>
                <Route path="/training/:st" element={<Training/>}/>
            </Routes>
            <Nav/>


        </BrowserRouter>

    );
}

export default App;
