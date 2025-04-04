import React, {useContext, useState} from 'react';
import Menu from "./Menu";
import Menu2 from "./Menu2";
import './Nav.css';

import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { InputText } from 'primereact/inputtext';
import {useNavigate} from "react-router-dom";

const Nav = observer(() => {
    const [findText, setFindText] = useState('');
    const [resultText, setResultText] = useState('');
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const navigate = useNavigate();
    const {productStore} = useContext(Context)

    function setMenuActive(isActive){
        globalStore.setIsNewHoverMainMenu(false)
        if (isActive) {
            globalStore.setMenuActive(true)
            globalStore.setMenuActive2(false) }
        else {
            globalStore.setMenuActive(false)
            globalStore.setMenuActive2(false)
        }
    }

    function getIdInfo(id){

        productStore.setState(id)
        catalogStore.getIdInfo(id).then(() => {
            const idInfo = catalogStore.idInfo
            let  rt = 'Товар не найден'
            if (idInfo[0] && idInfo[1]) {
                rt = 'id = ' + idInfo[0].id + '   subjectId = ' + idInfo[1].subjectId
                + '   catalogId = ' + idInfo[0].catalogId + '    totalQuantity = ' + idInfo[1].totalQuantity
                // navigate('/productInfo/' + id.toString())
            } //else navigate('/noProduct/')
            navigate('/productInfo/' + id.toString())
            setResultText(rt)
            }
        )

    }



    function serverTest(){
        catalogStore.serverTestCommand()
    }

    function clientTest(){
        catalogStore.clientTestCommand()
    }

    function loadServerTest(){
        catalogStore.loadServerTest()
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
           //TODO: тут для начала определять что написанно id или поисковая фраза
            // Если id то делать то что сейча
            // Если поисковая фраза то новый алгоритм
            getIdInfo(findText)
        }
    };
    return (
        <div>

            <nav>

                {/*<div className="burger-btn " onClick={()=>setMenuActive(!menuActive)}>*/}
                <div className="burger-btn " onClick={() => setMenuActive(!globalStore.isMenuActive)}>

                    {/*<span className={`pi pi-burger ${burgerIco}`} ></span>*/}
                    <span
                        className={globalStore.isMenuActive ? 'pi pi-burger pi-times' : 'pi pi-burger pi-bars'}></span>


                </div>
                <div className="burger-btn " onClick={() => serverTest()}>
                    <span className='pi  pi-burger '>UP</span>
                </div>

                <div className="burger-btn " onClick={() => loadServerTest()}>
                    <span className='pi  pi-burger '>LP</span>

                </div>

                <div className="burger-btn " onClick={() => clientTest()}>
                    <span className='pi  pi-burger '>CT</span>

                </div>




                <div style={{paddingLeft: '40px', width: '400px'}}>
                    <InputText style={{width: '350px'}} value={findText}
                               onKeyPress={handleKeyPress}
                               onChange={(e) => setFindText(e.target.value)}/>
                </div>


                <p style={{color: 'white', paddingLeft: '20px', fontSize: '20px'}}>{resultText}</p>

            </nav>

            <Menu/>
            <Menu2 data={{
                mainMenuName: globalStore.mainMenuName,
                mainMenuId: globalStore.mainMenuID,
                isActive: globalStore.isMenuActive2}}/>

        </div>

    );
});

export default Nav;
