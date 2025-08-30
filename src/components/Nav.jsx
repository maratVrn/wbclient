import React, {useContext, useState} from 'react';
import Menu from "./Menu";
import Menu2 from "./Menu2";
import './Nav.css';

import '/node_modules/primeflex/primeflex.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import logoPng from './wbsale3.png'


const Nav = observer(() => {
    const [findText, setFindText] = useState('');
    const [resultText, setResultText] = useState('');
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const navigate = useNavigate();
    const {productStore} = useContext(Context)




    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span
                onClick={() => navigate(item.shortcut)}
            >{item.label}</span>
        </a>
    );
    const items = [
        {
            label: 'Аналитика',
            items: [
                {
                    label: 'Анализ карточки товара',
                    template: itemRenderer,
                    shortcut: '/productInfo/0'
                },
                {
                    label: 'Анализ продавца',
                    template: itemRenderer,
                    shortcut: '/productSupplierInfo/0'
                },
                {
                    label: 'Анализ конкурентов',
                    template: itemRenderer,
                    shortcut: '/competitorInfo/0'
                },
                {
                    label: 'Аналитика и поиск товарной ниши',
                    template: itemRenderer,
                    shortcut: '/test/'
                }
                ,
                {
                    label: 'Статистика поисковых запросов',
                    template: itemRenderer
                },
                {
                    label: 'Поиск и аналитика ниш',
                    template: itemRenderer
                }


            ]
        },
        {
            label: 'Управление продажами',
            items: [
                {
                    label: 'Комплектация FBS',
                    template: itemRenderer
                },
                {
                    label: 'Аналитика FBS',
                    template: itemRenderer
                },
                {
                    label: 'Управление товарами',
                    template: itemRenderer
                },
                {
                    label: 'Управление акциями',
                    template: itemRenderer
                },
                {
                    label: 'Автоматический Репрайсер',
                    template: itemRenderer
                },
                {
                    label: 'Управление рекламой',
                    template: itemRenderer
                }

            ]
        },
        {
            label: 'Тарифы',
            template: itemRenderer
        },
        {
            label: 'Обучение',
            template: itemRenderer,
            shortcut: '/training/0'
        }
    ]
    const start = <a href="/"> <img alt="logo" src={logoPng} style={{paddingRight: '40px'}} className="mr-2"></img> </a>
    const end = <i className="pi pi-user" style={{cursor:'pointer', fontSize: '1.5rem', paddingRight:'80px', color: 'var(--primary-color)'}}
                   onClick={() => navigate('/user/' )}></i>

    return (
        <div>
            <div className='nav_page'>
                {/*<img alt="logo" src={logoPng} height="50" ></img>*/}
                <Menubar
                    style={{fontSize: '16px'}}
                    // className='w-full  border-none  top-10 left-100 p-2 z-5'
                    model={items}
                    start={start}
                    end={end}
                />
            </div>




            {/*<Menu/>*/}
            {/*<Menu2 data={{*/}
            {/*    mainMenuName: globalStore.mainMenuName,*/}
            {/*    mainMenuId: globalStore.mainMenuID,*/}
            {/*    isActive: globalStore.isMenuActive2*/}
            {/*}}/>*/}

        </div>

    );
});

export default Nav;
