import React, {useContext, useEffect, useState} from 'react';
import logoSvg from "./logo-dark.svg";
import { InputText } from 'primereact/inputtext';
import './css/form.css';
import './css/wbsale.css';
import {useNavigate} from "react-router-dom";
import productList from "./ProductList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {productListStore} = useContext(Context)
    const navigate = useNavigate();



    const handleKeyPress = (event) => {

        // TODO: сейчас реализован поиск только по ИД нрмально потом разбить на ид и запрос
        if(event.key === 'Enter'){

            navigate('/productInfo/' + productListStore.query.toString())

        }
    };

    useEffect(()=>{
        console.log('Header useEffect');


    }, [productListStore.query])

    function getSearchResult(query, newInfo = true) {

        let pageCount = 5
        productListStore.getSearchResult(query).then(() => {
            // setItems(productListStore.productList)


        })
    }
    return (

        <header className='header ' style={{
            background: "linear-gradient(to right, #a0cbec, #61b662)",
            backgroundColor: '#a0cbec'
        }}>

            <button onClick={() => getSearchResult('блузка')}> test</button>
            <div className="header-desktop container-fluid" style={{paddingLeft: '60px'}}>


                <a className="header-logo" href="/">

                    <img className="logo-image" src={logoSvg} width="160" height="37"
                         alt="logo" loading="lazy"/>
                </a>


                <div style={{width: '100%', height: '120px'}}>

                    <InputText style={{width: '100%', height: '50px', marginTop: '35px'}} placeholder="найти на wb.sale"
                               value={productListStore.query}

                               onKeyPress={handleKeyPress} //useGrouping={false}
                               onChange={(e) => productListStore.setQuery(e.target.value)}
                    />

                </div>

                <div className="space-xs menu-controls" style={{paddingLeft: '150px', paddingRight: '40px'}}>

                    <a className="header-control" href="/user/">
                        <i className="svg-icon nam-anam is-36 pi pi-user" style={{
                            cursor: 'pointer', fontSize: '1.5rem'
                        }}></i>

                    </a>
                </div>
            </div>


            <div className="header-mobile">
                {/*    <a className="header-logo" href="/">*/}
                {/*        <img className="logo-image" src={logoSvg} width="160" height="37" alt="logo"*/}
                {/*    loading="lazy"/>*/}
                {/*</a>*/}
                <InputText style={{width: '100%', height: '50px', marginTop: '5px'}} placeholder="найти на wb.sale"
                           value={productListStore.query}
                           onKeyPress={handleKeyPress} //useGrouping={false}
                           onChange={(e) => productListStore.setQuery(e.target.value)}
                />

                <a className="header-control" href="/user/">
                    <i className="svg-icon nam-anam is-36 pi pi-user" style={{
                        cursor: 'pointer', fontSize: '1.5rem'
                    }}></i>

                </a>


            </div>

        </header>
    );
});

export default Header;