import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Context} from "./index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./components/product_components/ProductList";
import MainPage from "./components/MainPage";
import User from "./components/user_components/user";
import ProductInfo from "./components/product_components/ProductInfo";
import NoProduct from "./components/product_components/NoProduct";
import Training from "./components/training_components/Training";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import Footer from "./components/footer";
import Oferta from "./components/oferta";
import ConfPolicy from "./components/confPolicy";
import Subjects from "./components/training_components/subjects";


function App() {
    const {catalogStore} = useContext(Context)
    const {serverUpdateStore} = useContext(Context)



    useEffect(()=>{

        // console.log('Главный useEffect');

        // serverUpdateStore.getCurrServerInfo().then(() => {})
        // const timer = setInterval(() => {
        //     // console.log('Запросили промежуточное состояние')
        //     serverUpdateStore.getCurrServerInfo().then(() => {})
        // }, 1000);
        // return () => clearTimeout(timer);


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
            <Header/>

            <Routes>

                <Route path="/" element={<MainPage/>}/>

                <Route path="/productInfo/:id" element={<ProductInfo/>}/>
                <Route path="/productList/:query" element={<ProductList/>}/>

                <Route path="/noProduct/:query" element={<NoProduct/>}/>

                <Route path="/user/" element={<User/>}/>
                <Route path="/oferta/" element={<Oferta/>}/>
                <Route path="/confPolicy/" element={<ConfPolicy/>}/>

                <Route path="/contacts/" element={<Contacts/>}/>
                <Route path="/training/:st" element={<Training/>}/>
                <Route path="/subjects/" element={<Subjects/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>

    );
}

export default App;
