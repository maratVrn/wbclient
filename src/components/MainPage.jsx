import React, {useContext, useEffect, useRef, useState} from 'react';
import './page.css';
import './css/form.css';
import './css/wbsale.css';
import {Context} from "../index";
import { BreadCrumb } from 'primereact/breadcrumb';
import {observer} from "mobx-react-lite";
import ProductList from "./ProductList";


const MainPage = observer( () => {


    const {catalogStore} = useContext(Context)
    const [isStartMenu, setIsStartMenu] = useState(true)
    const [isLoadPD, setIsLoadPD] = useState(false)
    const [addMenu, setAddMenu] = useState([])
    const [breadItems, setBreadItems] = useState([])
    const [catalogId, setCatalogId] = useState('')

    useEffect(()=>{

        console.log('useEffect MainPage');
        setMainMenu()

    },[])



    const home = { label : 'Главная', template: () => <a onClick={()=> setMainMenu()} className="cursor-pointer ">Главная</a> }

    function setMainMenu(){
        setIsLoadPD(false)
        setIsStartMenu(true)
        setBreadItems([])
    }

    function setMenuOne(oneData){
        setIsLoadPD(false)
        let tmpItems = []
        for (let i in breadItems) tmpItems.push(breadItems[i])
        tmpItems.push({ label: oneData.name,  template: () => <a onClick={()=> setMenuOne(oneData)} className="cursor-pointer ">{oneData.name}</a>})
        if (oneData.childs) {
            for (let i in oneData.childs) {

                try {
                    oneData.childs[i].img = require(`.//images/menu/cat/${oneData.childs[i].id}.webp`)
                } catch (e) {
                    oneData.childs[i].img = require(`.//images/menu/noImg.png`)
                }
            }
            setAddMenu(oneData.childs);
            if (oneData.childs.length === 0){
                setCatalogId(oneData.id)
                setIsLoadPD(true)}
        }
        setBreadItems(tmpItems)
        setIsStartMenu(false)
    }



    return (
        <div className="app page">

            { isStartMenu? <></>
                : <BreadCrumb model={breadItems} home={home} />
            }

            { isLoadPD ? <>
                    <ProductList catalogId = {catalogId} />
                </>


                :
                <div className="flex flex-wrap column-gap-4 row-gap-4">
                    { isStartMenu?

                        catalogStore.allWBCatalogLite.map((oneData) =>
                            <div key={oneData.id} className={" w-10rem h-12 rem  cursor-pointer"}
                                 // style={{padding:'20px'}}
                                 onClick={() => setMenuOne(oneData)}>
                                <div key={oneData.id} className={"w-10rem h-10rem "}>
                                    <img style={{maxWidth:'100%', maxHeight:'100%'}}
                                        src={oneData.img}  alt="logo" loading="lazy"/>

                                </div>
                                <div style={{textAlign: 'center'}}>
                                    {oneData.name}

                                </div>


                            </div>
                        )
                        :
                        addMenu.map((oneData) =>
                            <div key={oneData.id} className={" w-12rem h-14rem  cursor-pointer"}
                                 onClick={() => setMenuOne(oneData)}>
                                <div key={oneData.id} className={"w-12rem h-12rem "}>
                                    <img style={{maxWidth: '100%', maxHeight: '100%'}}
                                         src={oneData.img} alt="logo" loading="lazy"/>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    {oneData.name}
                                </div>


                            </div>
                        )

                    }
                </div>
            }
        </div>
    );
});

export default MainPage;
