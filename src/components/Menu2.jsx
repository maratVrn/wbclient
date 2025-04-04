import React, {useContext, useEffect, useState} from 'react';
import './Menu.css';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";


const Menu2 = ({data}) => {

    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const [startMenu, setStartMenu] = useState([])
    const [secondMenu, setSecondMenu] = useState([])
    const [thirdMenu, setThirdMenu] = useState([])
    const [fourMenu, setFourMenu] = useState([])

    const [menu3Name, setMenu3Name] = useState('')
    const [menu4Name, setMenu4Name] = useState('')
    const [menu5Name, setMenu5Name] = useState('')
    const [isHover, setIsHover] = useState([])
    const [isNowSecondMenu,setIsNowSecondMenu ] = useState(false)
    const [isNowThirdMenu,setIsNowThirdMenu ] = useState(false)
    const [isNowFourMenu,setIsNowFourMenu ] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        // console.log('menu2');
        let someItems = []
        let someHover = []
        for (let i in catalogStore.menu2CatalogItems){
            const oneItem =  {i:i, id: catalogStore.menu2CatalogItems[i].id, name :  catalogStore.menu2CatalogItems[i].name, isHover : false, isMenu3 : catalogStore.menu2CatalogItems[i].isMenu3}
            someItems.push(oneItem)
            someHover.push(false)
        }
        setIsNowSecondMenu(false)
        setIsNowThirdMenu(false)
        catalogStore.setIsSecondCatalogLoad(false) //third?
        setIsHover(someHover)
        setStartMenu(someItems)

    },[catalogStore.isSecondCatalogLoad])


    function setActiveItem(id){
        let someHover = []
        for (let i in startMenu){
            if (startMenu[i].id === id) someHover.push(true)
            else someHover.push(false)
        }
        setIsHover(someHover)
    }

    function menuClick(id, isMenu3, name){
        if (isMenu3) {
            setMenu3Name(name)
            setIsNowSecondMenu(true)
            setIsNowThirdMenu(false)
            setIsHover([])
            let someItems = catalogStore.getMenu3Items(id)
            setSecondMenu(someItems)
        } else {
            globalStore.setIsNewHoverMainMenu(false)
            globalStore.setMenuActive(false)
            globalStore.setMenuActive2(false) //third?
            navigate('/products/' + id.toString())
        }
    }

    function secondMenuClick(id, isMenu4,name4){
        if (isMenu4) {
            setMenu4Name(name4)
            let someItems = catalogStore.getMenu4Items(id)
            setThirdMenu(someItems);
            setIsNowThirdMenu(true)

        } else {
            globalStore.setIsNewHoverMainMenu(false)
            globalStore.setMenuActive(false)
            globalStore.setMenuActive2(false)
            navigate('/products/' + id.toString())
        }
    }

    function thirdMenuClick(id, isMenu5, name5){
        if (isMenu5) {
            setMenu5Name(name5)
            let someItems = catalogStore.getMenu5Items(id)
            setFourMenu(someItems);
            setIsNowFourMenu(true)

        } else {
            globalStore.setIsNewHoverMainMenu(false)
            globalStore.setMenuActive(false)
            globalStore.setMenuActive2(false)
            navigate('/products/' + id.toString())
        }
    }

    function fourMenuClick(id){
        globalStore.setIsNewHoverMainMenu(false)
        globalStore.setMenuActive(false)
        globalStore.setMenuActive2(false)
        navigate('/products/' + id.toString())
    }


    return (


        <div className={data.isActive ? 'menu2 active2' : 'menu2'}  style={{ overflow:'hidden'}} > {/*onClick={()=>globalStore.setMenuActive(false)}*/}
            <div  style={{ width:'100%', height:'90%',overflowY:'scroll',paddingRight:'17px',boxSizing:'content-box' }} >

                {
                    isNowFourMenu ?
                        <div className="menu-burger__title">
                            <span className='pi pi-arrow-left' style={{cursor: 'pointer'}}
                                  onClick={() => setIsNowFourMenu(false)}></span>
                            <span className="menu-burger__title-link--second"
                                  onClick={() => setIsNowFourMenu(false)}>{menu4Name}</span>
                            <span className="menu-burger__title-name"> {menu5Name}</span>
                            <ul style={{paddingLeft: '0px'}}>

                                {
                                    fourMenu.map((item) =>
                                        <div key={item.id} className="allMenuDiv">
                                            <div style={{flex: '1', display: 'flex'}}>
                                                <li
                                                    className="liStyle "
                                                    onClick={() => fourMenuClick(item.id)}
                                                >{item.name}</li>
                                            </div>
                                            <div>
                                                <span>{item.isHover}</span>
                                                <span className={(item.isMenu6) ? 'pi pi-chevron-right liRight' : ''}></span>
                                            </div>
                                        </div>
                                    )
                                }
                            </ul>
                        </div>
                        :
                        isNowThirdMenu ?
                            <div className="menu-burger__title">
                            <span className='pi pi-arrow-left' style={{cursor: 'pointer'}}
                                  onClick={() => setIsNowThirdMenu(false)}></span>
                                <span className="menu-burger__title-link--second"
                                      onClick={() => setIsNowThirdMenu(false)}>{menu3Name}</span>
                                <span className="menu-burger__title-name"> {menu4Name}</span>
                                <ul style={{paddingLeft: '0px'}}>

                                    {
                                        thirdMenu.map((item) =>
                                            <div key={item.id} className="allMenuDiv">
                                                <div style={{flex: '1', display: 'flex'}}>
                                                    <li
                                                        className="liStyle "
                                                        onClick={() => thirdMenuClick(item.id, item.isMenu5, item.name)}
                                                    >{item.name}</li>
                                                </div>
                                                <div>
                                                    <span>{item.isHover}</span>
                                                    {/*TODO: что то не работает поэтому захаркодил*/}
                                                    {/*<span className={(isHover[item.i] && item.isMenu4) ? 'pi pi-chevron-right liRight' : ''}></span>*/}
                                                    <span
                                                        className={(item.isMenu5) ? 'pi pi-chevron-right liRight' : ''}></span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                            :
                            isNowSecondMenu ?
                                <div className="menu-burger__title">
                                <span className='pi pi-arrow-left' style={{cursor: 'pointer'}}
                                      onClick={() => setIsNowSecondMenu(false)}></span>
                                    <span className="menu-burger__title-link--second"
                                          onClick={() => setIsNowSecondMenu(false)}> {data.mainMenuName}</span>
                                    <span className="menu-burger__title-name"> {menu3Name}</span>
                                    <ul style={{paddingLeft: '0px'}}>

                                        {
                                            secondMenu.map((item) =>
                                                <div key={item.id} className="allMenuDiv">
                                                    <div style={{flex: '1', display: 'flex'}}>
                                                        <li
                                                            className="liStyle "
                                                            // onMouseEnter={()=>{setSecondActiveItem(item.id)}}
                                                            onClick={() => secondMenuClick(item.id, item.isMenu4, item.name)}
                                                        >{item.name}</li>
                                                    </div>
                                                    <div>
                                                        <span>{item.isHover}</span>
                                                        {/*TODO: что то не работает поэтому захаркодил*/}
                                                        {/*<span className={(isHover[item.i] && item.isMenu4) ? 'pi pi-chevron-right liRight' : ''}></span>*/}
                                                        <span className={(item.isMenu4) ? 'pi pi-chevron-right liRight' : ''}></span>



                                                    </div>
                                                </div>
                                            )
                                        }

                                    </ul>
                                </div>
                                :
                                <div className="menu-burger__title">
                                    <span className="menu-burger__title-name"> {data.mainMenuName}</span>
                                    <ul style={{paddingLeft: '0px'}}>

                                        {
                                            startMenu.map((item) =>
                                                <div key={item.id} className="allMenuDiv">
                                                    <div style={{flex: '1', display: 'flex'}}>
                                                        <li
                                                            className="liStyle "
                                                            onMouseEnter={() => {
                                                                setActiveItem(item.id)
                                                            }}
                                                            // onMouseEnter={()=>{item.isHover =true}}
                                                            // onMouseLeave={()=>{item.isHover =false}}
                                                            onClick={() => menuClick(item.id, item.isMenu3, item.name)}

                                                        >{item.name}</li>
                                                    </div>
                                                    <div>
                                                        <span>{item.isHover}</span>
                                                        <span
                                                            className={(isHover[item.i] && item.isMenu3) ? 'pi pi-chevron-right liRight' : ''}></span>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </ul>
                                </div>

                }


            </div>

        </div>
    );
};

export default Menu2;
