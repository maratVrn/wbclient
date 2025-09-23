import React, {useState} from 'react';
import logoSvg from "./logo-dark.svg";
import downSvg from "./images/down.svg";
import './css/form.css';
import './css/wbsale.css';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [isInstrumentMenuActive, setIsInstrumentMenuActive] = useState(false)
    const [isInstrumentMobileMenuActive, setIsInstrumentMobileMenuActive] = useState(false);
    const [isTrainingMenuActive, setIsTrainingMenuActive] = useState(false);
    const [isTrainingMobileMenuActive, setIsTrainingMobileMenuActive] = useState(false);
    const [isHeaderActive, setIsHeaderActive] = useState(false);
    const navigate = useNavigate();
    function setAllStateFalse(){
        setIsInstrumentMenuActive(false)
        setIsInstrumentMobileMenuActive(false)
        setIsTrainingMenuActive(false)
        setIsHeaderActive(false)
        setIsTrainingMobileMenuActive(false)
    }
    function setMobileActiveMenu(isTraining, isActive){
        setIsTrainingMobileMenuActive(false)
        setIsInstrumentMobileMenuActive(false)
        if (isTraining) setIsTrainingMobileMenuActive(isActive)
            else setIsInstrumentMobileMenuActive(isActive)
    }

    function setActiveMenu(isTraining, isActive){
        setIsTrainingMenuActive(false)
        setIsInstrumentMenuActive(false)
        if (isTraining) setIsTrainingMenuActive(isActive)
        else setIsInstrumentMenuActive(isActive)
    }

    function navigateTo(shortcut){
        setAllStateFalse()
        navigate(shortcut)
    }

    return (
        // <header className="header is-active" style={{backgroundColor: '#f8f8f8'}}>
        <header className={isHeaderActive ? 'header is-active' : 'header'} style={{backgroundColor: '#f8f8f8'}}>
            <div className="header-desktop container-fluid" style={{paddingLeft:'60px'}}>

                <a className="header-logo" href="/">

                    <img className="logo-image" src={logoSvg} width="160" height="37"
                         alt="logo" loading="lazy"/>
                </a>
                <div className="header-menu">
                    <div className={isInstrumentMenuActive ? 'menu-item is-active' : 'menu-item'}  onClick={() => setActiveMenu(false,!isInstrumentMenuActive)}>
                        <div className="btn-v2 menu-item-btn is-light-active">
                            <div className="btn-inner">
                                <div className="btn-text">Инструменты</div>
                                <img className="svg-icon btn-icon" src={downSvg} width="12" height="12" loading="lazy"/>

                            </div>
                        </div>
                        <div className="menu-item-container">
                            <div className="menu-item-content">
                                <div className="menu-grid">
                                    <a className="menu-grid-item border-right is-large "
                                       href="/tracking/">
                                        <div className="item-header">
                                            <svg className="svg-icon item-icon is-36" width="36" height="36"
                                                 viewBox="0 0 36 36">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#keymeter_36px"></use>
                                            </svg>
                                            <div className="item-title">Трекинг позиций</div>
                                        </div>
                                        <div className="item-body">
                                            <div className="item-description">Отслеживайте позиции товара в
                                                поиске по ключевому слову
                                            </div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item is-large " href="/upravlenie-reklamoj/">
                                        <div className="item-header">
                                            <svg className="svg-icon item-icon is-36" width="36" height="36"
                                                 viewBox="0 0 36 36">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#advertiser_36px"></use>
                                            </svg>
                                            <div className="item-title">Управление рекламой</div>
                                        </div>
                                        <div className="item-body">
                                            <div className="item-description">Экономия бюджета и рост продаж с
                                                Автобиддером рекламы (официальное API)
                                            </div>
                                        </div>
                                    </a>
                                    <a  className="menu-grid-item border-right border-top "
                                       onClick={() => navigateTo('/productInfo/0')}>
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#vision_24px"></use>
                                            </svg>
                                            <div className="item-title md">Аналитика карточки товара</div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item border-right border-top "
                                       onClick={() => navigateTo('/productSupplierInfo/0')}>
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#folder_new_24px"></use>
                                            </svg>
                                            <div className="item-title md">Аналитика продаца</div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item border-top "
                                       href="/poiskovye-klastery/">
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#search_folder_24px"></use>
                                            </svg>
                                            <div className="item-title md">Поисковые кластеры</div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item border-top border-right "
                                       href="/podbor-klyuchej-wb/">
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#template_24px"></use>
                                            </svg>
                                            <div className="item-title md">Поиск ключей</div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item border-top border-right "
                                       href="/analitika-po-klyuchu/">
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#getkeys_24px"></use>
                                            </svg>
                                            <div className="item-title md">Аналитика по ключу</div>
                                        </div>
                                    </a>
                                    <a className="menu-grid-item border-top "
                                       href="/upushchennye-klyuchi/">
                                        <div className="item-header small-gap">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#template_black_list_24px"></use>
                                            </svg>
                                            <div className="item-title md">Упущенные ключи</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={isTrainingMenuActive ? 'menu-item is-active' : 'menu-item'} onClick={() => setActiveMenu(true,!isTrainingMenuActive)}>
                        <div className="btn-v2 menu-item-btn is-light-active" data-menu-item-toggle="">
                            <div className="btn-inner" >
                                <div className="btn-text">Обучение</div>
                                <img className="svg-icon btn-icon" src={downSvg} width="12" height="12"
                                     loading="lazy"/>
                            </div>
                        </div>
                        <div className="menu-item-container">
                            <div className="menu-item-content">
                                <div className="menu-list">
                                    <div className="menu-block is-support">
                                        <div className="block-body">
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/">
                                                    <div className="link-text">Все темы</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/news/">
                                                    <div className="link-text">Новости</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/dnevnik-wb-sellera/">
                                                    <div className="link-text">Дневник селлера</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/kejsy-wb/">
                                                    <div className="link-text">Кейсы ВБ</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/stati/">
                                                    <div className="link-text">Статьи</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu-block is-large is-single is-support">
                                        <div className="block-body">
                                            <div className="menu-link-item">
                                                <div className="menu-block-title">Смотрите наши видеоролики
                                                </div>
                                                <div className="menu-link-item-group">
                                                    <a className="btn-v2 is-secondary"
                                                       href="https://vkvideo.ru/@sellegocom"
                                                       rel="nofollow noopener noreferrer" target="_blank"
                                                       data-pjax="0">
                                                        <div className="btn-inner">
                                                            <svg className="svg-icon btn-icon" width="24"
                                                                 height="24" viewBox="0 0 24 24">
                                                                <use
                                                                    href="/static/images/icons/icons.svg?v=1756110266#vk_video_24px"></use>
                                                            </svg>
                                                            <div className="btn-text">VK Видео</div>
                                                        </div>
                                                    </a> <a className="btn-v2 is-secondary"
                                                            href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg"
                                                            rel="nofollow noopener noreferrer" target="_blank"
                                                            data-pjax="0">
                                                    <div className="btn-inner">
                                                        <svg className="svg-icon btn-icon youtube-icon"
                                                             width="24"
                                                             height="24" viewBox="0 0 24 24">
                                                            <use
                                                                href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use>
                                                        </svg>
                                                        <div className="btn-text">Youtube</div>
                                                    </div>
                                                </a></div>
                                                <div className="menu-label">
                                                    <div className="label-text">Показываем лайфхаки и делимся
                                                        знаниями
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <a className="btn-v2 menu-item-btn is-light-active" href="/#prices"  onClick={() => {setAllStateFalse()}}>
                            <div className="btn-inner">
                                <div className="btn-text">Тарифы</div>
                            </div>
                        </a></div>


                    <div className="menu-item">
                        <a className="btn-v2 menu-item-btn is-light-active" href="/contacts/">
                            <div className="btn-inner">
                                <div className="btn-text">Контакты</div>
                            </div>
                        </a></div>
                </div>
                <div className="space-xs menu-controls" style={{paddingLeft:'150px', paddingRight:'40px'}}>

                    <a className="header-control" href="/user/">
                        <i className="svg-icon nam-anam is-36 pi pi-user" style={{
                            cursor: 'pointer', fontSize: '1.5rem'
                        }}></i>

                    </a>
                </div>
            </div>


            <div className="header-mobile"><a className="header-logo" href="/"><img
                className="logo-image" src={logoSvg} width="160" height="37" alt="logo"
                loading="lazy"/></a>
                <a className="header-control" href="/user/">
                    <i className="svg-icon nam-anam is-36 pi pi-user" style={{
                        cursor: 'pointer',   fontSize: '1.5rem'}} ></i>

                </a>


                <div className="hamburger-btn header-control" >
                    <div className="hamburger" onClick={() => setIsHeaderActive(!isHeaderActive)}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>


                <div className="header-menu">
                    <div className="menu-btn-group">
                        <a className="btn-v2 is-secondary" href="/login/">
                            <div className="btn-inner">
                                <div className="btn-text">Вход</div>
                            </div>
                        </a> <a className="btn-v2 is-dark" href="/signup/">
                        <div className="btn-inner">
                            <div className="btn-text">Регистрация</div>
                        </div>
                    </a></div>


                    <div className={isInstrumentMobileMenuActive ? 'menu-item is-active' : 'menu-item'} onClick={() => setMobileActiveMenu(false, !isInstrumentMobileMenuActive)}>
                        <div className="menu-item-toggle" style={{cursor: 'pointer'}}>
                            <div className="menu-item-title">Инструменты</div>
                            <img className="svg-icon btn-icon" src={downSvg} width="12" height="12"
                                 loading="lazy"/>

                        </div>
                        <div className="menu-item-body" data-menu-item-body="data-menu-item-body">
                            <div className="menu-item-inner">
                                <div className="menu-services">
                                    <a className="service-item " href="/tracking/">
                                        <svg className="svg-icon item-icon is-36" width="36" height="36"
                                             viewBox="0 0 36 36">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#keymeter_36px"></use>
                                        </svg>
                                        <div className="item-title">Трекинг позиций</div>
                                        <div className="item-description">Отслеживайте позиции товара в поиске
                                            по
                                            ключевому слову
                                        </div>
                                    </a>
                                    <a className="service-item "
                                       href="/upravlenie-reklamoj/">
                                        <svg className="svg-icon item-icon is-36" width="36" height="36"
                                             viewBox="0 0 36 36">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#advertiser_36px"></use>
                                        </svg>
                                        <div className="item-title">Управление рекламой</div>
                                        <div className="item-description">Экономия бюджета и рост продаж с
                                            Автобиддером рекламы (официальное API)
                                        </div>
                                    </a>
                                </div>
                                <div className="menu-services-small">
                                    <a style={{cursor:'pointer'}}    className="service-item " onClick={() => navigateTo('/productInfo/0')}>
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#vision_24px"></use>
                                        </svg>
                                        <div className="item-title">Аналитика карточки товара</div>
                                    </a>
                                    <a  style={{cursor:'pointer'}}  className="service-item " onClick={() => navigateTo('/productSupplierInfo/0')}>
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#folder_new_24px"></use>
                                        </svg>
                                        <div className="item-title">Аналитика продавца</div>
                                    </a>
                                    <a className="service-item "
                                       href="/poiskovye-klastery/">
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#search_folder_24px"></use>
                                        </svg>
                                        <div className="item-title">Поисковые кластеры</div>
                                    </a>
                                    <a className="service-item "
                                       href="/podbor-klyuchej-wb/">
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#template_24px"></use>
                                        </svg>
                                        <div className="item-title">Поиск ключей</div>
                                    </a>
                                    <a className="service-item "
                                       href="/analitika-po-klyuchu/">
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#getkeys_24px"></use>
                                        </svg>
                                        <div className="item-title">Аналитика по ключу</div>
                                    </a>
                                    <a className="service-item "
                                       href="/upushchennye-klyuchi/">
                                        <svg className="svg-icon item-icon" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#template_black_list_24px"></use>
                                        </svg>
                                        <div className="item-title">Упущенные ключи</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={isTrainingMobileMenuActive ? 'menu-item is-active' : 'menu-item'}  onClick={() => setMobileActiveMenu(true, !isTrainingMobileMenuActive) }>
                        <div className="menu-item-toggle" style={{cursor: 'pointer'}}>
                            <div className="menu-item-title">Обучение</div>
                            <img className="svg-icon btn-icon" src={downSvg} width="12" height="12"
                                 loading="lazy"/>
                        </div>
                        <div className="menu-item-body" data-menu-item-body="data-menu-item-body">
                        <div className="menu-item-inner">
                                <div className="menu-list">
                                    <div className="menu-block">
                                        <div className="block-body">
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/">
                                                    <div className="link-text">Все темы</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/news/">
                                                    <div className="link-text">Новости</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/dnevnik-wb-sellera/">
                                                    <div className="link-text">Дневник селлера</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/kejsy-wb/">
                                                    <div className="link-text">Кейсы ВБ</div>
                                                </a>
                                            </div>
                                            <div className="menu-link-item">
                                                <a className="menu-link" href="/blog/stati/">
                                                    <div className="link-text">Статьи</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu-block is-support">
                                        <div className="block-body">
                                            <div className="menu-link-item">
                                                <div className="menu-block-title">Смотрите наши видеоролики
                                                </div>
                                                <div className="menu-link-item-group">
                                                    <a className="btn-v2 is-secondary"
                                                       href="https://vkvideo.ru/@sellegocom"
                                                       rel="nofollow noopener noreferrer" target="_blank"
                                                       data-pjax="0">
                                                        <div className="btn-inner">
                                                            <svg className="svg-icon btn-icon" width="24"
                                                                 height="24" viewBox="0 0 24 24">
                                                                <use
                                                                    href="/static/images/icons/icons.svg?v=1756110266#vk_video_24px"></use>
                                                            </svg>
                                                            <div className="btn-text">VK Видео</div>
                                                        </div>
                                                    </a> <a className="btn-v2 is-secondary"
                                                            href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg"
                                                            rel="nofollow noopener noreferrer" target="_blank"
                                                            data-pjax="0">
                                                    <div className="btn-inner">
                                                        <svg className="svg-icon btn-icon youtube-icon"
                                                             width="24"
                                                             height="24" viewBox="0 0 24 24">
                                                            <use
                                                                href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use>
                                                        </svg>
                                                        <div className="btn-text">Youtube</div>
                                                    </div>
                                                </a></div>
                                                <div className="menu-label">
                                                    <div className="label-text">Показываем лайфхаки и делимся
                                                        знаниями
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <a className="menu-item-toggle" href="/#prices" onClick={() => {setAllStateFalse()}}>
                            <div className="menu-item-title">Тарифы</div>
                            <svg className="svg-icon menu-item-icon" width="24" height="24" viewBox="0 0 24 24">
                                <use href="/static/images/icons/icons.svg?v=1756110266#calc_24px"></use>
                            </svg>
                        </a>
                    </div>

                    <div className="menu-item"><a className="menu-item-toggle" href="/contacts/">
                        <div className="menu-item-title">Контакты</div>
                        <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">
                            <use href="/static/images/icons/icons.svg?v=1756110266#headphones_24px"></use>
                        </svg>
                    </a>

                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;