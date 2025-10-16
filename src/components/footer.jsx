import React from 'react';
import {useNavigate} from "react-router-dom";
import logoSvg from "./logo-dark.svg";

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
            <footer className="footer">
                <div className="container-fluid">
                    <div className="footer-container">
                        <a className="footer-logo" href="/">
                            <img className="logo-image" src={logoSvg} width="160" height="37"
                                 alt="logo" loading="lazy"/>
                        </a>

                        {/*<a className="wb-partner-v3" href="https://seller.wildberries.ru/auth-services" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0">*/}
                        {/*    <img className="" src="/static/images/landing/wb-partner-v3.svg" width="50" height="24" alt="авторизованный сервис ВБ" loading="lazy"/>*/}
                        {/*    <div className="wb-partner-text">*/}
                        {/*        <div>Официальный авторизованный</div>*/}
                        {/*        <div>сервис Wildberries</div>*/}
                        {/*    </div>*/}
                        {/*    <svg className="svg-icon wb-partner-icon" width="24" height="24" viewBox="0 0 24 24">*/}
                        {/*        <use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>*/}
                        {/*    </svg>*/}
                        {/*</a>*/}
                        <p className="footer-text">
                            Все логотипы и товарные знаки Wildberries TM,отображаемые в этом приложении, являются собственностью Wildberries.

                                Поставщик услуг: ООО "Альтаир", ИНН: 3665099884
                                Адрес: 394066, обл. Воронежская, г. Воронеж, кв-л 16, д. 17
                        </p>
                        <div className="footer-menu">
                            <a className="menu-item" href="/about/"><span className="item-text">О компании</span></a>
                            <a className="menu-item" href="/contacts/"><span className="item-text">Контакты</span></a>
                            <a className="menu-item" href="/training/"  target="_blank" data-pjax="0"><span className="item-text">Обучение</span></a>
                            <a className="menu-item" href="/news/"><span className="item-text">Новости</span></a>
                            {/*<a className="menu-item" href="/press/"><span className="item-text">СМИ о нас</span></a>*/}
                            {/*<a className="menu-item" href="/support/"><span className="item-text">Поддержка</span></a>*/}
                        </div>
                        {/*<div className="footer-support">*/}
                        {/*    <a className="btn-v2 is-secondary" href="https://t.me/sellego_bot" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div className="btn-inner"><svg className="svg-icon btn-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#headphones_24px"></use></svg><div className="btn-text">Чат с поддержкой</div></div></a>        <div className="menu-associated">*/}
                        {/*    <a className="menu-item is-vk" href="https://vk.com/sellegocom" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg className="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vk_24px"></use></svg></a>          <a className="menu-item is-youtube" href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg className="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use></svg></a>          <a className="menu-item is-telegram" href="https://t.me/sellego_com" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg className="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#telegram_24px_filled"></use></svg></a>          <a className="menu-item is-dzen" href="https://dzen.ru/sellego" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg className="svg-icon item-icon " width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#dzen_24px"></use></svg></a>          <a className="menu-item is-vc" href="https://vc.ru/u/1286196-sellego-for-wildberries" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg className="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vc_24px"></use></svg></a>        </div>*/}
                        {/*</div>*/}
                        <div className="footer-privacy">
                            <div className="copyright-text">Copyright © 2025</div>
                            <div className="privacy-menu">
                                <a className="menu-item" href="/oferta/">Пользовательское соглашение (оферта)</a>
                                <a className="menu-item" href="/confPolicy/">Политика конфиденциальности</a>
                                {/*<a className="menu-item" href="/refund-and-cancellation-policy/">Оплата и возврат</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;