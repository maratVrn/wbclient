import React, {useContext, useEffect, useState} from 'react';
import logoSvg from "./logo-light.svg";
import { InputText } from 'primereact/inputtext';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {productListStore} = useContext(Context)
    const {userStore} = useContext(Context)
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
                productListStore.onShowProduct = false
                navigate('/productList/'+query)
            }
            productListStore.setQuery('')
                    }
    };

    useEffect(()=>{
        if (userStore.startIn){
            userStore.userTokenTest().then()


        }


    }, [])


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
                             productListStore.query = ''
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

                    {userStore.isLogin ?
                        <a className="header-control"  onClick={()=>navigate('/user/')}>
                            <i className=" pi pi-cog" style={{
                                cursor: 'pointer', fontSize: '1.8rem', color: 'white'
                            }}></i>

                        </a>
                        :
                        <a className="header-control" onClick={()=>navigate('/login/')}>
                            <i className=" pi pi-user" style={{
                                cursor: 'pointer', fontSize: '1.8rem', color: 'white'
                            }}></i>

                        </a>
                    }

                </div>
            </div>


            <div className="header-mobile">

                <InputText style={{width: '100%', height: '50px', marginTop: '5px'}} placeholder="найти на wb.sale"
                           value={productListStore.query}
                           onKeyPress={handleKeyPress} //useGrouping={false}
                           onChange={(e) => productListStore.setQuery(e.target.value)}
                />
                {userStore.isLogin ?
                    <a className="header-control"  style={{textDecoration:'none'}} onClick={()=>navigate('/user')}>
                        {/*href="/user/"*/}
                        <i className=" pi pi-cog" style={{
                            cursor: 'pointer', fontSize: '1.5rem', color: 'white'
                        }}></i>

                    </a>
                    :
                    <a className="header-control" style={{textDecoration:'none'}} onClick={()=>navigate('/login')}>
                        {/*href="/login/"*/}
                        <i className=" pi pi-user" style={{
                            cursor: 'pointer', fontSize: '1.5rem', color: 'white'
                        }}></i>

                    </a>
                }



            </div>

        </header>
    );
});

export default Header;