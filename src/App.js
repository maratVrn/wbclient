import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Context} from "./index";
import {BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
    const [startData, setStartData] = useState('startData')
    const [wbCatalog, setWbCatalog] = useState([1,2])
    const {productStore} = useContext(Context)

    useEffect(()=>{
        setStartData('notStartData')

        catalogStore.getLiteWBCatalog().then(() => {
                console.log('Загрузили каталог');
                // setWbCatalog(catalogStore.allWBCatalogLite)
                // setWbCatalog(JSON.stringify(catalogStore.someData).slice(0,50))


            }
        )
        // console.log('Главный useEffect');




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

                <Route path="/"  element={<MainPage data = {startData} />}/>


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
