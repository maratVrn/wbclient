import React from 'react';
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div >
            {/*<div className="footer_info">*/}
            {/*    <a href="/"> <img alt="logo" src={logoPng}></img> </a>*/}

            {/*</div>*/}
            {/*<div className="responsive-three-column-grid">*/}
            {/*    <div className="borderOne" style={{padding: '5%'}}>*/}
            {/*        <a href="/public"> <img alt="logo" ></img> </a>*/}
            {/*        <div className="footer_info"*/}
            {/*             onClick={() => navigate('/')}> Сервис для аналитики и эффективного управления продажами на wildberries*/}
            {/*        </div>*/}


            {/*    </div>*/}
            {/*    <div className="borderOne" style={{padding: '1%'}}>*/}
            {/*        <div className="responsive-only-two-column-grid">*/}
            {/*            <div className="borderOne">*/}
            {/*                <div className="footer_s">Аналитика</div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Анализ карточки товара*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productSupplierInfo/0')}> Анализ продавца*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Анализ конкурентов*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Статистика поисковых запросов*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Поиск и аналитика ниш*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="borderOne">*/}
            {/*                <div className="footer_s">Управление продажами</div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Комплектация FBS*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Аналитика FBS*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Управление товарами*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Управление акциями*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Автоматический Репрайсер*/}
            {/*                </div>*/}
            {/*                <div className="footer_info"*/}
            {/*                     onClick={() => navigate('/productInfo/0')}> Управление рекламой*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <div className="borderOne" style={{padding: '1%', textAlign:'center'}}>*/}
            {/*        <div className="footer_s">Компания</div>*/}
            {/*        <div className="footer_info"*/}
            {/*             onClick={() => navigate('/productInfo/0')}> О Нас*/}
            {/*        </div>*/}
            {/*        <div className="footer_info"*/}
            {/*             onClick={() => navigate('/productInfo/0')}> Наша команда*/}
            {/*        </div>*/}
            {/*        <div className="footer_info"*/}
            {/*             onClick={() => navigate('/productInfo/0')}> Контакты*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
            <footer class="footer">
                <div class="container-fluid">
                    <div class="footer-container">
                        <a class="footer-logo" href="/">
                            <img class="logo-image" src="/static/images/logo/logo-dark.svg" width="160"  height="37" alt="logo" loading="lazy"/>
                        </a>

                        <a class="wb-partner-v3" href="https://seller.wildberries.ru/auth-services" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0">
                            <img class="" src="/static/images/landing/wb-partner-v3.svg" width="50" height="24" alt="авторизованный сервис ВБ" loading="lazy"/>
                            <div class="wb-partner-text">
                                <div>Официальный авторизованный</div>
                                <div>сервис Wildberries</div>
                            </div>
                            <svg class="svg-icon wb-partner-icon" width="24" height="24" viewBox="0 0 24 24">
                                <use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>
                            </svg></a>
                        <p class="footer-text">
                            Все логотипы и товарные знаки Wildberries TM,отображаемые в этом приложении, являются собственностью Wildberries.

                                Поставщик услуг: ООО "Кузня Брендов", ИНН: 2130222840
                                Адрес: 428027, Чувашская Республика, г Чебоксары, пр-кт И.Я.Яковлева, зд. 8д, офис 34
                        </p>
                        <div class="footer-menu">
                            <a class="menu-item" href="/o-kompanii/"><span class="item-text">О компании</span></a>
                            <a class="menu-item" href="/contacts/"><span class="item-text">Контакты</span></a>
                            <a class="menu-item" href="https://wiki.sellego.com/" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><span class="item-text">База знаний</span></a>        <a class="menu-item" href="/blog/"><span class="item-text">Блог</span></a>
                            <a class="menu-item" href="/press/"><span class="item-text">СМИ о нас</span></a>
                            <a class="menu-item" href="/support/"><span class="item-text">Поддержка</span></a>
                        </div>
                        <div class="footer-support">
                            <a class="btn-v2 is-secondary" href="https://t.me/sellego_bot" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div class="btn-inner"><svg class="svg-icon btn-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#headphones_24px"></use></svg><div class="btn-text">Чат с поддержкой</div></div></a>        <div class="menu-associated">
                            <a class="menu-item is-vk" href="https://vk.com/sellegocom" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vk_24px"></use></svg></a>          <a class="menu-item is-youtube" href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use></svg></a>          <a class="menu-item is-telegram" href="https://t.me/sellego_com" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#telegram_24px_filled"></use></svg></a>          <a class="menu-item is-dzen" href="https://dzen.ru/sellego" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon " width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#dzen_24px"></use></svg></a>          <a class="menu-item is-vc" href="https://vc.ru/u/1286196-sellego-for-wildberries" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vc_24px"></use></svg></a>        </div>
                        </div>
                        <div class="footer-privacy">
                            <div class="copyright-text">Copyright © 2025</div>
                            <div class="privacy-menu">
                                <a class="menu-item" href="/terms-of-service/">Пользовательское соглашение</a>
                                <a class="menu-item" href="/privacy-policy/">Политика конфиденциальности</a>
                                <a class="menu-item" href="/refund-and-cancellation-policy/">Оплата и возврат</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;