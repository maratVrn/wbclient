import React, {useContext} from 'react';
import {Context} from "../index";
import Menu from "./Menu";
import Menu2 from "./Menu2";
import {observer} from "mobx-react-lite";
import './css/wbsale.css';
import Footer from "./footer";

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
            <div >
            <div className="form" style={{ maxWidth:'500px'}}>
                <h1 className="h4">Войдите в кабинет</h1>


                <form className="form-body ">
                    <input type="hidden"
                           value="VxRcAZoKGpKjP0BLjInlP1d9sqdmQMcCjV-V-wKHLuAdcGVN10lo2e9rNybF7qtVCDvDn1F1n0vaDvO2cLNLlA=="/>
                    <div className="form-block">
                        <div className="form-control">
                            <div className="control-label">Введите email</div>
                            <div className="input field-loginform-email required" data-input="">
                                <div className="input-container" data-input-container="">
                                    <div className="input-main">

                                        <input type="text" id="loginform-email" className="input-element"
                                               name="LoginForm[email]" data-input-element="" autoComplete="off"
                                               placeholder="usermail@info.com"
                                               template="&lt;div class=&quot;control-label&quot;&gt;{label}&lt;/div&gt;"
                                               aria-required="true"/>
                                    </div>

                                </div>
                                <div className="input-message is-error"><p className="message-text"></p></div>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="control-label">Введите пароль</div>

                            <div className="input is-with-icon field-loginform-password required" data-input="">
                                <div className="input-container" data-input-container="">
                                    <div className="input-main">

                                        <input type="password" id="loginform-password" className="input-element"
                                               name="LoginForm[password]" data-input-element="" placeholder="•••••••••"
                                               autoComplete="off" aria-required="true"/>
                                    </div>
                                    <div className="input-control password-visibility-control"
                                         data-password-visibility-control="data-password-visibility-control">
                                        <svg className="svg-icon control-icon password-visibility-visible" width="24"
                                             height="24" viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#visibility_on_24px"></use>
                                        </svg>
                                        <svg className="svg-icon control-icon password-visibility-invisible" width="24"
                                             height="24" viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#visibility_off_24px"></use>
                                        </svg>
                                    </div>
                                </div>
                                <div className="input-message is-error"><p className="message-text"></p></div>
                            </div>

                            <a className="text is-sm is-end" href="/request-password-reset/">Забыли пароль?</a></div>
                    </div>

                    <button type="submit" className="btn-v2 is-dark" >
                        <div className="btn-inner">
                            <div className="btn-text">Войти</div>
                        </div>
                    </button>

                    <button type="submit" className="btn-v2">
                        <div className="btn-inner">
                            <div className="btn-text">Регистрация</div>
                        </div>
                    </button>

                </form>
            </div>


                {/*<nav>*/}
                {/*    /!*onClick={() => globalStore.setAllMenuActive(!globalStore.isMenuActive)}*!/*/}

                {/*    /!*<div className="burger-btn " onClick={()=>setMenuActive(!menuActive)}>*!/*/}
                {/*    <div className="burger-btn " onClick={() => setMenuActive(!globalStore.isMenuActive)}>*/}

            {/*        /!*<span className={`pi pi-burger ${burgerIco}`} ></span>*!/*/}
            {/*        <span*/}
            {/*            className={globalStore.isMenuActive ? 'pi pi-burger pi-times' : 'pi pi-burger pi-bars'}></span>*/}


            {/*    </div>*/}
            {/*    <div className="burger-btn " onClick={() => serverTest()}>*/}
            {/*        <span className='pi  pi-burger '>UP</span>*/}
            {/*    </div>*/}

            {/*    <div className="burger-btn " onClick={() => loadServerTest()}>*/}
            {/*        <span className='pi  pi-burger '>LP</span>*/}

            {/*    </div>*/}

            {/*    <div className="burger-btn " onClick={() => clientTest()}>*/}
            {/*        <span className='pi  pi-burger '>CT</span>*/}

            {/*    </div>*/}

            {/*</nav>*/}

            <Menu/>
            <Menu2 data={{
                mainMenuName: globalStore.mainMenuName,
                mainMenuId: globalStore.mainMenuID,
                isActive: globalStore.isMenuActive2
            }}/>
            </div>

            <Footer/>
        </div>
    );
});

export default User;