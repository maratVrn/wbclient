import React, {useContext, useEffect, useState} from 'react';
import './Menu.css';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";


const Menu = () => {
    const {catalogStore} = useContext(Context)
    const {globalStore} = useContext(Context)
    const [menuLoad, setMenuLoad] = useState(false)
    const [items, setItems] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        if (!menuLoad) {
            if (catalogStore.isCatalogLoad) {
                setMenuLoad(true)
                setActiveItem(-1)
                setItemsFromCatalog(catalogStore.allWBCatalogLite)
            }
        }
    },[catalogStore.isCatalogLoad])

    function setActiveItem(id){

        let someItems = items
        let needActiveMenu2 = false
        for (let i in someItems){
            someItems[i].isHover = false
            if (someItems[i].id === id) {

                globalStore.setMainMenuIdAndName(id,someItems[i].name)
                globalStore.setIsNewHoverMainMenu(true)
                someItems[i].isHover = true
                needActiveMenu2 = someItems[i].isMenu2
                catalogStore.setMainCatalogI(i)

            }
        }

        setItems(someItems)

         globalStore.setMenuActive2(needActiveMenu2)


    }

    function setItemsFromCatalog(data){
        let result = []
        for (let i in data) {
            let d1 = {id: data[i]?.id, name :  data[i]?.name, isHover : false, isMenu2 : false}
            if (data[i]?.childs)
            if(data[i]?.childs.length>0) d1.isMenu2 = true
            result.push(d1)
        }
        setItems(result)
    }

    function onMenuClick (id){

        globalStore.setIsNewHoverMainMenu(false)
        globalStore.setMenuActive(false)
        globalStore.setMenuActive2(false)
        navigate('/products/'+id.toString())
    }

    return (
        <div className={globalStore.isMenuActive ? 'menu active' : 'menu'} style={{ overflow:'hidden'}}> {/*onClick={()=>globalStore.setMenuActive(false)}*/}
          <div  style={{ width:'100%', height:'90%',overflowY:'scroll',paddingRight:'17px',boxSizing:'content-box' }} >

            <ul style={{paddingLeft:'0px'}} >

                {
                    items.map((item) =>
                        <div  key = {item.id} className="allMenuDiv">

                            <div  style={{flex:'1', display:'flex'}}>
                                <div className={(item.isHover && globalStore.isNewHoverMainMenu) ? 'icon black' : 'icon gray'}  ></div>

                                <li
                                    className="liStyle "
                                    onMouseEnter={()=>{setActiveItem(item.id)}}
                                    // onMouseLeave={()=>{item.isHover =false}}
                                    onClick={()=>{ if (!item.isMenu2) onMenuClick(item.id)}}
                                >{item.name}</li>
                            </div>
                            <div>
                            <span className=  {(item.isHover && globalStore.isNewHoverMainMenu && item.isMenu2) ? 'pi pi-chevron-right liRight' : ''} ></span>
                            </div>
                        </div>)
                }

            </ul>
          </div>
        </div>
    );
};

export default Menu;
