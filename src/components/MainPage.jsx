import React, {useContext, useRef, useState} from 'react';
import './page.css';
import './css/form.css';
import './css/landibg.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import logoSvg from "./logo-dark.svg";
import Footer from "./product_components/footer";


const MainPage = () => {
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const toast = useRef(null);

    const [wbid, setWbId] = useState('141353735');
    const [cat1, setCat1] = useState('10000');
    const [cat2, setCat2] = useState('17153');

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    function duplicateTest(){
        catalogStore.duplicateTest(wbid, cat1, cat2).then()
    }

    function searchTest() {
        console.log('searchTest');
        catalogStore.searchTest().then(() => {



            }
        )
    }
    return (
        <div className="app">
            <header className="header" style={{backgroundColor:'#f8f8f8'}}>

                <div className="header-desktop container-fluid">
                    <a className="header-logo" href="https://wb.sale">

                        <img className="logo-image" src={logoSvg} width="160" height="37"
                             alt="logo" loading="lazy"/>
                    </a>
                    <div className="header-menu">
                        <div className="menu-item" data-menu-item="data-menu-item">
                        <div className="btn-v2 menu-item-btn is-light-active" data-menu-item-toggle="">
                                <div className="btn-inner">
                                    <div className="btn-text">Инструменты</div>
                                    <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">
                                        <use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
                                    </svg>
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
                                        <a className="menu-grid-item border-right border-top "
                                           href="/reklamnye-stavki/">
                                            <div className="item-header small-gap">
                                                <svg className="svg-icon item-icon" width="24" height="24"
                                                     viewBox="0 0 24 24">
                                                    <use
                                                        href="/static/images/icons/icons.svg?v=1756110266#vision_24px"></use>
                                                </svg>
                                                <div className="item-title md">Рекламные ставки</div>
                                            </div>
                                        </a>
                                        <a className="menu-grid-item border-right border-top "
                                           href="/reklamnye-klastery/">
                                            <div className="item-header small-gap">
                                                <svg className="svg-icon item-icon" width="24" height="24"
                                                     viewBox="0 0 24 24">
                                                    <use
                                                        href="/static/images/icons/icons.svg?v=1756110266#folder_new_24px"></use>
                                                </svg>
                                                <div className="item-title md">Рекламные кластеры</div>
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
                        <div className="menu-item">
                            <a className="btn-v2 menu-item-btn is-light-active" href="/#prices">
                                <div className="btn-inner">
                                    <div className="btn-text">Тарифы</div>
                                </div>
                            </a></div>
                        <div className="menu-item" data-menu-item="data-menu-item">
                            <div className="btn-v2 menu-item-btn is-light-active" data-menu-item-toggle="">
                                <div className="btn-inner">
                                    <div className="btn-text">Блог</div>
                                    <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">
                                        <use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
                                    </svg>
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
                                                    <div className="menu-block-title">Смотрите наши видеоролики</div>
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
                                                            <svg className="svg-icon btn-icon youtube-icon" width="24"
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
                            <a className="btn-v2 menu-item-btn is-light-active" href="/support/">
                                <div className="btn-inner">
                                    <div className="btn-text">Поддержка</div>
                                </div>
                            </a></div>
                    </div>
                    <div className="space-xs menu-controls">
                        <a className="btn-v2 is-secondary" href="/user/">
                            <div className="btn-inner">
                                <div className="btn-text">Вход</div>
                            </div>
                        </a> <a className="btn-v2 is-dark" href="/signup/">
                        <div className="btn-inner">
                            <div className="btn-text">Регистрация</div>
                        </div>
                    </a></div>
                </div>


                <div className="header-mobile"><a className="header-logo" href="https://wb.sale"><img
                    className="logo-image" src={logoSvg} width="160" height="37" alt="logo"
                    loading="lazy"/></a>
                    <a className="header-control" href="/login/">
                        <svg className="svg-icon nam-anam is-36" width="36" height="36" viewBox="0 0 36 36">
                            <use href="/static/images/icons/icons.svg?v=1756110266#page_36px"></use>
                        </svg>
                    </a>
                    <div className="hamburger-btn header-control" data-menu-toggle="data-menu-toggle">
                        <div className="hamburger">
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
                        <div className="menu-item" data-menu-item="data-menu-item">
                            <div className="menu-item-toggle" data-menu-item-toggle="data-menu-item-toggle">
                                <div className="menu-item-title">Инструменты</div>
                                <svg className="svg-icon menu-item-icon" width="24" height="24" viewBox="0 0 24 24">
                                    <use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
                                </svg>
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
                                            <div className="item-description">Отслеживайте позиции товара в поиске по
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
                                        <a className="service-item "
                                           href="/reklamnye-stavki/">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#vision_24px"></use>
                                            </svg>
                                            <div className="item-title">Рекламные ставки</div>
                                        </a>
                                        <a className="service-item "
                                           href="/reklamnye-klastery/">
                                            <svg className="svg-icon item-icon" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use
                                                    href="/static/images/icons/icons.svg?v=1756110266#folder_new_24px"></use>
                                            </svg>
                                            <div className="item-title">Рекламные кластеры</div>
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
                        <div className="menu-item">
                            <a className="menu-item-toggle" href="/#prices" data-menu-close>
                                <div className="menu-item-title">Тарифы</div>
                                <svg className="svg-icon menu-item-icon" width="24" height="24" viewBox="0 0 24 24">
                                    <use href="/static/images/icons/icons.svg?v=1756110266#calc_24px"></use>
                                </svg>
                            </a>
                        </div>
                        <div className="menu-item" data-menu-item="data-menu-item">
                            <div className="menu-item-toggle" data-menu-item-toggle="data-menu-item-toggle">
                                <div className="menu-item-title">Блог</div>
                                <svg className="svg-icon icon__24px menu-item-icon" width="24" height="24"
                                     viewBox="0 0 24 24">
                                    <use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
                                </svg>
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
                                                    <div className="menu-block-title">Смотрите наши видеоролики</div>
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
                                                            <svg className="svg-icon btn-icon youtube-icon" width="24"
                                                                 height="24" viewBox="0 0 24 24">
                                                                <use
                                                                    href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use>
                                                            </svg>
                                                            <div className="btn-text">Youtube</div>
                                                        </div>
                                                    </a></div>
                                                    <div className="menu-label">
                                                        <div className="label-text">Показываем лайфхаки и делимся знаниями
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item"><a className="menu-item-toggle" href="/support/">
                            <div className="menu-item-title">Поддержка</div>
                            <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">
                                <use href="/static/images/icons/icons.svg?v=1756110266#headphones_24px"></use>
                            </svg>
                        </a></div>
                    </div>
                </div>

            </header>
            <div className="main">

                <section className="section-1">
                    <div className="container-fluid">
                        <div className="section-container">
                            <div className="section-content">
                                <h1>Аналитика и управление продажами на WB</h1>
                                <p className="section-text">Удобные инструменты для аналитики товаров, сравнение с конкурентами, а
                                    также управления поставками и рекламой на Вайлдберриз</p>
                                <div className="section-footer">
                                    <a className="btn-v2  is-md-regular is-primary" href="/signup/">
                                        <div className="btn-inner">
                                            <div className="btn-text">Попробовать сейчас</div>
                                        </div>
                                    </a>


                                </div>
                            </div>
                            <div className="image-container">
                                <img className="section-image is-desktop"  src={require('./images/image-1.png')}
                                     width="508" height="852" alt="seo для wb"/>
                                <img  className="section-image is-not-desktop"  src={require('./images/image-2.png')}
                                width="992" height="200" alt="seo wb"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-2">
                    <div className="container-fluid">
                        <div className="section-container">
                            <div className="section-content">
                                <h2>Зачем нужен Sellego?</h2>
                                <p className="section-text">Главный результат работы сервиса аналитики Вайлдберриз —
                                    многократный рост продаж и прибыли наших клиентов</p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="section-3">
                    <div className="container-fluid">

                        <div className="responsive-three-column-grid">

                            <div className="main_s3"><img className="card-image"
                                                          src={require('./images/image_1_3.png')}
                                                          width="264" height="86" loading="lazy" alt="Реклама"/>
                                <h4 className="card-title">Реклама без слива бюджета</h4>
                                <p className="card-text">
                                    Реклама часто ведет себя непредсказуемо. Сервис <a href="/upravlenie-reklamoj/">Управление
                                    рекламой</a> дает больший контроль, а Автобиддер обучается и занимает лучшие позиции
                                    по самым выгодным ценам
                                </p>
                                <a className="btn-v2 is-secondary" href="/upravlenie-reklamoj/">
                                    <div className="btn-inner">
                                        <div className="btn-text">Подробнее</div>
                                        <svg className="svg-icon btn-icon is-green3" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>
                                        </svg>
                                    </div>
                                </a></div>
                            <div className="main_s3">
                                <img className="card-image"
                                     src={require('./images/image_1_1.png')}
                                     width="264" height="86" loading="lazy"
                                     alt="рост позиций wb"/>
                                <h4 className="card-title">Рост позиций в поиске WB</h4>
                                <p className="card-text">Отслеживайте и улучшайте позиции по ключевым запросам в поиске
                                    Wildberries. Узнавайте, сколько просмотров карточки дает тот или иной ключ</p>
                                <a className="btn-v2 is-secondary" href="/tracking/">
                                    <div className="btn-inner">
                                        <div className="btn-text">Подробнее</div>
                                        <svg className="svg-icon btn-icon is-green3" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>
                                        </svg>
                                    </div>
                                </a></div>
                            <div className="main_s3"><img className="card-image"
                                                          src={require('./images/image_1_2.png')}
                                                          width="264" height="86" loading="lazy"
                                                          alt="поиск запросов"/>
                                <h4 className="card-title">Контроль ключей в SEO карточек</h4>
                                <p className="card-text">Правильно подобранные и вставленные в описание карточки ключи –
                                    фундамент как для органических продаж, так и для работы Рекламы с Бустером</p>
                                <a className="btn-v2 is-secondary" href="/podbor-klyuchej-wb/">
                                    <div className="btn-inner">
                                        <div className="btn-text">Подобрать ключи</div>
                                        <svg className="svg-icon btn-icon is-green3" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>
                                        </svg>
                                    </div>
                                </a></div>

                        </div>
                    </div>

                </section>

                <section class="section-services-grid">
                    <div class="container-fluid">
                        <div class="section-container">
                            <div class="section-content">
                                <div class="content-block">
                                    <div class="block-header">
                                        <h2>Управление рекламой</h2>
                                        <div class="badge is-success-accent is-filled">
                                            <div class="badge-inner">
                                                <div class="badge-text">Официальное API</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="block-text">Реклама на Wildberries работает по принципу аукциона. Для
                                        автоматических кампаний WB использует завышенные ставки и не использует
                                        алгоритмы для оптимизации в удержании выгодных позиций. Наш сервис показывает
                                        реальные ставки по рекламе в поиске, что приводит к снижению расходов.
                                        Инструмент полностью автоматизирует работу с Рекламой</p>
                                    <div class="block-footer">
                                        <a class="btn-v2 is-large is-lg-regular is-dark" href="/upravlenie-reklamoj/">
                                            <div class="btn-inner">
                                                <div class="btn-text">Подробнее</div>
                                            </div>
                                        </a> <a class="btn-v2 is-large is-lg-regular is-secondary" href="#prices">
                                        <div class="btn-inner">
                                            <div class="btn-text">Рассчитать тариф</div>
                                        </div>
                                    </a></div>
                                </div>
                                <img class="content-image" src={require('./images/image-5.png')} width="562"
                                     height="318" loading="lazy" alt="Рассчитать тариф"/>
                            </div>
                            <div class="section-aside" style={{paddingTop: '30px'}}>
                                <div class="aside-block is-keywords is-double">
                                    <div class="block-body">
                                        <h4 class="block-title">Управление ключами</h4>
                                        <p class="block-text">Автоминусация фраз и работа только по «белому списку»
                                            ключей. Управление ключами и кластерами на полном и очень эффективном
                                            автопилоте.</p>
                                    </div>
                                    <img class="block-image" src={require('./images/image-7.png')} width="157"
                                         height="99" loading="lazy" alt="Управление ключами"/>
                                </div>
                                <div class="aside-block is-count-control">
                                    <div class="block-body">
                                        <h4 class="block-title">Контроль остатков</h4>
                                        <p class="block-text">Остатки товаров по кампаниям всегда под контролем</p>
                                    </div>
                                </div>
                                <div class="aside-block is-saving">
                                    <div class="block-body">
                                        <h4 class="block-title">Экономия бюджета</h4>
                                        <p class="block-text"><span class="is-pink1">До 70%</span> экономии при работе
                                            по реальным ставкам</p>
                                    </div>
                                </div>
                                <div class="aside-block is-algorithm is-double">
                                    <div class="block-body">
                                        <h4 class="block-title">Управление ставкой CPM</h4>
                                        <p class="block-text">Используйте одну из 5 стратегий автобиддера для управления
                                            CPM, чтобы занять самые лучшие позиции по нужным ключам с минимально
                                            возможными затратами.</p>
                                    </div>
                                    <img class="block-image" src={require('./images/image-8.png')} width="150"
                                         height="105" loading="lazy" alt="Управление ставкой CPM"/>
                                </div>
                            </div>
                            <div class="section-end" style={{paddingTop: '20px'}}>
                                <div class="aside-block is-advanced-analytics is-light">
                                    <div class="block-body">
                                        <h4 class="block-title">Продвинутая аналитика</h4>
                                        <p class="block-text">Удобная оценка показателей работы всех запущенных
                                            кампаний. Так и полная статистика по каждому ключу и подробный лог действий
                                            автобиддера.</p>
                                    </div>
                                </div>
                                <div class="aside-block is-light">
                                    <div class="block-body">
                                        <h4 class="block-title">Авто-пополнение</h4>
                                        <p class="block-text">Сервис пополнит кампании автоматически</p>
                                    </div>
                                </div>
                                <div class="aside-block is-bidder">
                                    <div class="block-body">
                                        <h4 class="block-title">Контроль остатков</h4>
                                    </div>
                                    <img class="block-image" src={require('./images/image-6.png')} width="184"
                                         height="144" loading="lazy" alt="Контроль остатков"/>
                                </div>
                                <div class="aside-block is-telegram">
                                    <div class="block-body">
                                        <h4 class="block-title"><span>Уведомления в</span>
                                            <svg class="svg-icon is-telegram" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <use href="/static/images/icons/icons.svg#telegram_24px_filled"></use>
                                            </svg>
                                            <span>Telegram</span>
                                        </h4>
                                        <p class="block-text">Не пропустите важные изменения в своих кампаниях</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section-blog is-news">
                            <div class="container-fluid">
                                <div class="section-container">
                                    <div class="section-content">
                                        <h2>Новости и обновления</h2>
                                        <p class="section-text">Рассказываем что добавили или изменили в сервисе</p>
                                    </div>
                                    <div class="blog-articles swiper">
                                        <div class="swiper-wrapper">

                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/rabota-s-ostatkami-novaya-opciya-v-reklamnyh-kampaniyah/" target="_blank"><img class="article-image" src="/uploads/iblock_element/b28d4c41ee4e175805c12971e2f1ad66.png" width="152" height="85" alt="Работа с остатками — новая опция в рекламных кампаниях" loading="lazy"/><div class="article-title">Работа с остатками — новая опция в рекламных кампаниях</div><div class="article-text">Автостоп и автозапуск рекламных кампаний по рекламным остаткам в Sellego </div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/import-nastroek-reklamnyh-kampaniy-pod-upravleniem-sellego/" target="_blank"><img class="article-image" src="/uploads/iblock_element/ac992d211d19b9c2df1fcb276d376396.png" width="152" height="85" alt="Импорт настроек рекламных кампаний под управлением Sellego" loading="lazy"/><div class="article-title">Импорт настроек рекламных кампаний под управлением Sellego</div><div class="article-text">Добавили функцию автопереноса настроек успешной РК в одну или несколько кампаний под управлением Sellego</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 1 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/novyy-instrument-sellego-dlya-poiska-pribylnyh-fraz/" target="_blank"><img class="article-image" src="/uploads/iblock_element/1b62fe7aef36df65f298c11b28dafa86.png" width="152" height="85" alt="Новый инструмент Sellego: находите прибыльные фразы, а не просто популярные" loading="lazy"/><div class="article-title">Новый инструмент Sellego: находите прибыльные фразы, а не просто популярные</div><div class="article-text">Подтягиваем данные из Джем, чтобы вы находили больше рекламных ключей, которые точно продают</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 1 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/uluchshili-yuzabiliti-instrumentov-modulya-upravlenie-reklamoy/" target="_blank"><img class="article-image" src="/uploads/iblock_element/221f92a24b4d8430560b9de0b5126ff4.png" width="152" height="85" alt="Улучшили юзабилити инструментов модуля Управление рекламой" loading="lazy"/><div class="article-title">Улучшили юзабилити инструментов модуля Управление рекламой</div><div class="article-text">Добавили новые функции в модуль Управление рекламой для удобной работы с кластерами и историей фраз</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/obnovili-filtry-po-frazam-v-biddere-sellego/" target="_blank"><img class="article-image" src="/uploads/iblock_element/d7f028a519f80403dd971ea2990f6151.png" width="152" height="85" alt="Обновили систему пополнения баланса и фильтры по фразам в биддере Sellego" loading="lazy"/><div class="article-title">Обновили систему пополнения баланса и фильтры по фразам в биддере Sellego</div><div class="article-text">В биддере Sellego обновлены фильтры по фразам и система пополнения баланса</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news/dobavili-v-bidder-rasshirennuyu-analitiku-iz-dzhema/" target="_blank"><img class="article-image" src="/uploads/iblock_element/3a75e6a9c2a12b35c99cf16fe131567f.jpg" width="152" height="85" alt="Добавили в биддер расширенную аналитику из Джема" loading="lazy"/><div class="article-title">Добавили в биддер расширенную аналитику из Джема</div><div class="article-text">Данные по фразам из Джема теперь можно смотреть во вкладке «Ключи и кластеры» биддера  Sellego </div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>

                                        </div>
                                    </div>
                                    <div class="section-footer">
                                        <a class="btn-v2 is-secondary" href="/blog/news/"><div class="btn-inner"><div class="btn-text">Другие новости Sellego</div><svg class="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_24px"></use></svg></div></a>      </div>
                                </div>
                            </div>
                </section>

                <section class="section-blog">
                            <div class="container-fluid">
                                <div class="section-container">
                                    <div class="section-content">
                                        <h2>Делаете первые шаги на WB?</h2>
                                        <p class="section-text">
                                            Читайте экспертные материалы в нашем блоге и смотрите полезные обучающие видео для получения кратного
                                            преимущества перед вашими конкурентами на маркетплейсе Wildberries.
                                        </p>
                                    </div>
                                    <div class="blog-articles swiper">
                                        <div class="swiper-wrapper">

                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/news-wb/vb-vvodit-gradaciyu-skidok-v-avtoakciyah/" target="_blank"><img class="article-image" src="/uploads/iblock_element/88721f7745799eb6a2b99cedc1fa7d45.png" width="152" height="85" alt="ВБ вводит градацию скидок в Автоакциях: разбираем плюсы и минусы для селлеров" loading="lazy"/><div class="article-title">ВБ вводит градацию скидок в Автоакциях: разбираем плюсы и минусы для селлеров</div><div class="article-text">Появилось 4 уровня глубины скидки при участии в Автоакциях ВБ. Хорошо это или плохо для селлеров — разбираемся.</div><div class="labels"><div class="label is-tag"><span>Новости ВБ</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/stati/kak-snizit-cenu-klika-i-optimizirovat-drr-v-reklame-vb/" target="_blank"><img class="article-image" src="/uploads/iblock_element/fb8d044c7341b52cd16fb64bbb473338.jpg" width="152" height="85" alt="Как снизить цену клика и оптимизировать ДРР в рекламе ВБ?" loading="lazy"/><div class="article-title">Как снизить цену клика и оптимизировать ДРР в рекламе ВБ?</div><div class="article-text">Что учитывать при анализе рекламных кампаний на Вайлдберриз? Пошаговая инструкция для оптимизации рекламных расходов на WB с помощью связки Sellego и Джем. </div><div class="labels"><div class="label is-tag"><span>Статьи</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 9 мин</span></div></div></a>            </div>
                                            <div class="swiper-slide">
                                                <a class="related-article" href="/blog/kejsy-wb/kak-popast-v-rekomendatelnye-polki-vaildberriz/" target="_blank"><img class="article-image" src="/uploads/iblock_element/120ec7353a13259c528b98e2e0d86708.jpg" width="152" height="85" alt="Как попасть в рекомендательные полки Вайлдберриз: рабочие стратегии и пошаговая инструкция" loading="lazy"/><div class="article-title">Как попасть в рекомендательные полки Вайлдберриз: рабочие стратегии и пошаговая инструкция</div><div class="article-text">Как попасть в рекомендательные полки на Wildberries: разбор стратегий с примерами </div><div class="labels"><div class="label is-tag"><span>Кейсы ВБ</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 19 мин</span></div></div></a>            </div>

                                        </div>
                                    </div>
                                        </div>
                            </div>
                        </section>

                        <section class="section-calculator" id="prices">
                            <div class="container-fluid">
                                <div class="section-container">

                                    <div class="section-content">
                                        <div class="section-header">
                                            <h2 class="section-title">Тарифы</h2>
                                        </div>
                                        <div class="section-body">
                                            <p class="section-text">Любой тариф можно попробовать <b>в течение 3 дней</b> всего <b>за 30₽</b>. Платите только за необходимое</p>

                                            <div class="btn-v2 is-accent" data-toggle="custom-modal" data-target="join-to-demo-modal"><div class="btn-inner"><div class="btn-text">Записаться на демонстрацию сервиса</div></div></div>
                                            <div class="custom-modal join-to-demo-modal is-large" data-custom-modal="join-to-demo-modal" data-autofocus tabindex="-1"><div class="modal-backface"></div><div class="modal-container"><img class="modal-mesh" src="/static/images/landing/modal/join-to-demo/mesh.png" width="800" height="496" alt="" loading="lazy"/><svg class="svg-icon modal-close" width="24" height="24" viewBox="0 0 24 24" data-modal-action="close"><use href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use></svg>  <div class="modal-content">
                                                <div class="modal-side is-promo">
                                                    <div class="typography-row gap-2xl">
                                                        <div class="typography-row gap-md">
                                                            <h4>Запись на персональную  демонстрацию Sellego </h4>
                                                            <div class="typography-text is-md">Проведем краткий обзор системы и ответим на ваши вопросы</div>
                                                        </div>
                                                    </div>
                                                    <img class="promo-asset" src="/static/images/landing/modal/join-to-demo/asset-image-3.png" width="172" height="135" alt="" loading="lazy"/>
                                                        <img class="promo-image" src="/static/images/landing/modal/join-to-demo/reklamist-config.png"
                                                             width="300" height="189" alt="" loading="lazy"/>    </div>
                                                <div class="modal-side is-form">
                                                    <form id="w2" class="typography-row gap-lg without-spinner" action="/site/join-to-demo/" method="post" data-form-modal="join-to-demo">
                                                        <input type="hidden" name="_csrf" value="hB1lCC8TwMT-Hm_Y1RcD2L5dfmBBq067NvnFFzBm4m_OeVxEYlCyj7JKGLWccE2y4RsPWHaeFvJhqKNaQlKHGw=="/>            <div class="typography-text text-size-xl text-weight-bold">
                                                            Как с вами связаться?
                                                        </div>
                                                            <div class="input field-jointodemoform-name required" data-input>
                                                                <div class="input-container" data-input-container>
                                                                    <div class="input-main">

                                                                        <input type="text" id="jointodemoform-name" class="input-element" name="JoinToDemoForm[name]" data-input-element placeholder="Ваше имя" aria-required="true"/>
                                                                    </div>

                                                                </div>
                                                                <div class="input-message is-error"><p class="message-text"></p></div>
                                                            </div>
                                                            <div class="input field-jointodemoform-email" data-input>
                                                                <div class="input-container" data-input-container>
                                                                    <div class="input-main">

                                                                        <input type="text" id="jointodemoform-email" class="input-element" name="JoinToDemoForm[email]" data-input-element placeholder="Email"/>
                                                                    </div>

                                                                </div>
                                                                <div class="input-message is-error"><p class="message-text"></p></div>
                                                            </div>
                                                            <div class="input field-jointodemoform-telegram" data-input>
                                                                <div class="input-container" data-input-container>
                                                                    <div class="input-main">

                                                                        <input type="text" id="jointodemoform-telegram" class="input-element" name="JoinToDemoForm[telegram]" data-input-element placeholder="Telegram"/>
                                                                    </div>

                                                                </div>
                                                                <div class="input-message is-error"><p class="message-text"></p></div>
                                                            </div>

                                                            <div class="input field-jointodemoform-termsagree required" data-input>
                                                                <label class='input-checkbox'><input type="hidden" name="JoinToDemoForm[termsAgree]" value="0"/><input type="checkbox" id="jointodemoform-termsagree" name="JoinToDemoForm[termsAgree]" value="1" hidden aria-required="true"/>
                                                                    <svg class="svg-icon checkbox-icon is-24" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#checkbox_24px"></use></svg>
                                                                    <div class='checkbox-label'><div class="typography text-size-2xs">Я даю согласие на обработку моей персональной информации на условиях, определенных<a href="/privacy-policy/" target="_blank"> Политикой конфиденциальности</a> и принимаю условия <a href="/terms-of-service/" target="_blank">Пользовательского соглашения</a></div></div></label>
                                                                <div class="input-message is-error"><p class="message-text"></p></div>
                                                            </div>
                                                            <div class="input recaptcha-container field-jointodemoform-recaptcha">
                                                                <input type="hidden" id="jointodemoform-recaptcha" class="input-element" name="JoinToDemoForm[reCaptcha]" data-input-element/>
                                                                    <div class="input-message is-error"><p class="message-text"></p></div>
                                                            </div>
                                                            <button type="submit" class="btn-v2 is-disable-on-submit is-dark"><div class="btn-inner"><div class="btn-text">Отправить</div></div></button>      <div class="typography text-size-sm">
                                                                С вами свяжется наш менеджер чтобы определить удобное время для онлайн-встречи
                                                            </div>
                                                            <div class="recaptcha-protection-text">
                                                                <div class="recaptcha-protection-text ">
                                                                    <div class="protection-text">
                                                                        <span>Этот сайт защищен с помощью reCAPTCHA и соответствует</span>
                                                                        <a href="https://policies.google.com/privacy" target="_blank" rel="nofollow noopener">Политике конфиденциальности</a> и
                                                                        <a href="https://policies.google.com/terms" target="_blank" rel="nofollow noopener">Условиям использования</a> Google.
                                                                    </div>
                                                                </div>        </div>
                                                    </form>    </div>
                                            </div>
                                            </div></div>
                                            <div class="custom-modal join-to-demo-success-modal is-large" data-custom-modal="join-to-demo-success-modal" data-autofocus tabindex="-1"><div class="modal-backface"></div><div class="modal-container">  <svg class="svg-icon modal-close" width="24" height="24" viewBox="0 0 24 24" data-modal-action="close"><use href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use></svg>  <div class="modal-content">
                                                <img class="" src="/static/images/landing/modal/join-to-demo/asset-image-4.png" width="160" height="160" alt="" loading="lazy"/>    <div class="typography-text text-size-xl text-align-center text-weight-bold">
                                                    Спасибо!
                                                </div>
                                                    <div class="typography-text text-size-sm text-align-center">
                                                        В ближайшее время с вами свяжется наш менеджер чтобы определить удобное время для онлайн-встречи
                                                    </div>
                                            </div>
                                            </div></div>                  </div>

                                        <div class="section-currency">
                                            <div class="section-text">Валюта платежа:</div>
                                            <div class="improved-select is-secondary is-outline is-small" data-improved-select>
                                                <select hidden id="w5_currency_id">
                                                    <option value="3" selected>₽ Рубль</option>
                                                    <option value="4" >₸ Тенге</option>
                                                </select>
                                                <div class="select-header" data-select-toggle>
                                                    <div class="select-value is-large" data-select-value></div>
                                                    <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>    </div>
                                                <div class="select-body" data-select-body>
                                                    <div class="select-menu">
                                                        <div class="select-menu-item" data-select-option>
                                                            <div class="item-text">₽ Рубль</div>
                                                        </div>
                                                        <div class="select-menu-item" data-select-option>
                                                            <div class="item-text">₸ Тенге</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    <div class="services-calculator-app">
                                        <div class="services-calculator">
                                            <div class="calculator-header">
                                                <div class="tab is-secondary is-large is-lg-regular is-active">
                                                    <div class="tab-text"><span>1 месяц</span></div>
                                                </div>
                                                <div class="tab is-secondary is-large is-lg-regular ">
                                                    <div class="tab-text"><span>3 месяца</span></div>
                                                    <div class="counter">
                                                        <div class="counter-value">-10 %</div>
                                                    </div>
                                                </div>
                                                <div class="tab is-secondary is-large is-lg-regular ">
                                                    <div class="tab-text"><span>6 месяцев</span></div>
                                                    <div class="counter">
                                                        <div class="counter-value">-15 %</div>
                                                    </div>
                                                </div>
                                                <div class="tab is-secondary is-large is-lg-regular ">
                                                    <div class="tab-text"><span>1 год</span></div>
                                                    <div class="counter">
                                                        <div class="counter-value">-20 %</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="calculator-body ">
                                                <div class="service">

                                                    <div class="service-header">
                                                        <svg class="svg-icon service-icon is-48" width="48" height="48" viewBox="0 0 48 48"><use href="/static/images/icons/icons.svg?v=1756110266#keymeter_48px_bold"></use></svg>  <h3 class="service-title">Трекинг позиций</h3>
                                                        <p class="service-description">Установите лимит товаров для отслеживания</p>
                                                    </div>
                                                    <div class="service-counter">
                                                        <div class="range-min">10</div>
                                                        <div class="range-title">10 товаров</div>
                                                        <div class="range-max">300</div>
                                                        <input class="input-range" type="range" min="10" max="300" step="10" value="10"/>
                                                    </div>
                                                    <div class="improved-select is-secondary-dark">
                                                        <div class="select-header">
                                                            <div class="select-value">
                                                                <div class="select-value-group"><span>1 месяц</span></div>
                                                            </div>
                                                            <svg class="svg-icon select-arrow" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>  </div>
                                                    </div>
                                                    <div class="service-body">
                                                        <div class="service-price ">
                                                            <div class="price-value">970</div>
                                                            <div class="price-info">
                                                                <div class="price-period">₽/мес</div>
                                                            </div>
                                                        </div>
                                                        <div class="btn-v2 is-large is-md-regular is-dark">
                                                            <div class="btn-inner">
                                                                <div class="btn-text"><span>Заказать</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="service-options">
                                                        <div class="service-option">
                                                            <div class="option-title">Ежедн. проверки по всем ключам</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Количество ключей</div>
                                                            <svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use></svg>                </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Локации трекинга</div>
                                                            <div class="option-value">
                                                                9        </div>
                                                        </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Глубина анализа выдачи, страниц</div>
                                                            <div class="option-value">
                                                                12        </div>
                                                        </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Упущенные ключи на базе конкурентов</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Позиции Рекламы</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Безлимитный SERP</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                    </div>
                                                </div>
                                                <div class="service">

                                                    <div class="service-header">
                                                        <svg class="svg-icon service-icon is-48" width="48" height="48" viewBox="0 0 48 48"><use href="/static/images/icons/icons.svg?v=1756110266#advertiser_48px"></use></svg>  <h3 class="service-title">Управление рекламой</h3>
                                                        <p class="service-description">Установите лимит рекламных кампаний</p>
                                                    </div>
                                                    <div class="service-counter">
                                                        <div class="range-min">10</div>
                                                        <div class="range-title">10 кампаний</div>
                                                        <div class="range-max">500</div>
                                                        <input class="input-range" type="range" min="10" max="500" step="10" value="10"/>
                                                    </div>
                                                    <div class="improved-select is-secondary-dark">
                                                        <div class="select-header">
                                                            <div class="select-value">
                                                                <div class="select-value-group"><span>1 месяц</span></div>
                                                            </div>
                                                            <svg class="svg-icon select-arrow" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>  </div>
                                                    </div>
                                                    <div class="service-body">
                                                        <div class="service-price ">
                                                            <div class="price-value">3990</div>
                                                            <div class="price-info">
                                                                <div class="price-period">₽/мес</div>
                                                            </div>
                                                        </div>
                                                        <div class="btn-v2 is-large is-md-regular is-dark">
                                                            <div class="btn-inner">
                                                                <div class="btn-text"><span>Заказать</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="service-options">
                                                        <div class="service-option">
                                                            <div class="option-title">Количество продавцов</div>
                                                            <svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use></svg>                </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Автоматическое или ручное управление фразами</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Конверсии по фразам из Джем ВБ</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Автомат. управление ставками</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Автоуправление графиком запуска кампаний</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Автопополнение рекламного бюджета</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Режим "Белый список" фраз и "Автоминусация по условиям"</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Реальные ставки в Рекламе</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Сравнение кампаний по фразам</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                        <div class="service-option">
                                                            <div class="option-title">Оповещения в Telegram</div>
                                                            <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </section>



            </div>




            <Footer/>
        </div>
    );
};

export default MainPage;
