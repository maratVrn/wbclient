import React, {useContext, useEffect, useState} from 'react';
import logoSvg from "./logo-light.svg";
import { InputText } from 'primereact/inputtext';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {productListStore} = useContext(Context)
    const navigate = useNavigate();


    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            const query = productListStore.query.toString()

            let isOnlyCount = !isNaN(productListStore.query.toString())
            let needSearchQuery = true
            if (isOnlyCount) if (parseInt(query)>10_000) {

                navigate('/productInfo/' + productListStore.query.toString())
                needSearchQuery = false
            }
            if (needSearchQuery) {
                navigate('/productList/'+query)
            }
            productListStore.setQuery('')
                    }
    };
    //
    // useEffect(()=>{
    //     console.log('Header useEffect');
    //
    //
    // }, [])


    return (

        <header className='header ' style={{
            background: "linear-gradient(to right, " +
                "#26282AFF, " +
                "#4A85BFFF)",
            backgroundColor: '#4a85bf'
        }}>


            <div className="header-desktop container-fluid" style={{paddingLeft: '60px'}}>


                <a className="header-logo">

                    <img className="logo-image" src={logoSvg} width="160" height="37"
                         alt="logo" loading="lazy"
                         onClick={(e) => {navigate('/')
                             productListStore.onShowProduct = false
                         }}
                    />
                </a>


                <div style={{width: '100%', height: '120px'}}>

                    <InputText style={{width: '100%', height: '50px', marginTop: '35px'}} placeholder="найти на wb.sale"
                               value={productListStore.query}

                               onKeyPress={handleKeyPress} //useGrouping={false}
                               onChange={(e) => productListStore.setQuery(e.target.value)}
                    />

                </div>

                <div className="space-xs menu-controls" style={{paddingLeft: '110px', paddingRight: '40px'}}>

                    <a className="header-control" href="/user/">
                        <i className=" pi pi-user" style={{
                            cursor: 'pointer', fontSize: '1.8rem', color: 'white'
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

                <a className="header-control" href="/user/" style={{textDecoration:'none'}}>
                    <i className=" pi pi-user" style={{
                        cursor: 'pointer', fontSize: '1.5rem', color: 'white'}}></i>


                </a>


            </div>

        </header>
    );
});

export default Header;