import React, {useContext} from 'react';
import {Context} from "../index";
import Menu from "./Menu";
import Menu2 from "./Menu2";
import {observer} from "mobx-react-lite";

const User = observer(() => {
    const {productStore} = useContext(Context)
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)

    function setMenuActive(isActive) {
        console.log('tut '+isActive);
        globalStore.setIsNewHoverMainMenu(false)
        if (isActive) {
            globalStore.setMenuActive(true)
            globalStore.setMenuActive2(false)
        } else {
            globalStore.setMenuActive(false)
            globalStore.setMenuActive2(false)
        }
    }
    function serverTest() {
        catalogStore.serverTestCommand()
    }

    function clientTest() {
        catalogStore.clientTestCommand()
    }

    function loadServerTest() {
        catalogStore.loadServerTest()
    }



    return (
        <div className="page" >
            <nav onClick={() => globalStore.setAllMenuActive(!globalStore.isMenuActive)}>

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

            </nav>

            <Menu/>
            <Menu2 data={{
                mainMenuName: globalStore.mainMenuName,
                mainMenuId: globalStore.mainMenuID,
                isActive: globalStore.isMenuActive2
            }}/>
        </div>
    );
});

export default User;