import React, {useRef} from 'react';
import {Button} from 'primereact/button';
import {TieredMenu} from 'primereact/tieredmenu';
import {useNavigate} from "react-router-dom";

const Test = () => {


    return (
        <div>
            <div className="app">


                <header class="header">

                    <div className="header-desktop container-fluid">
                        <a className="header-logo" href="https://sellego.com">
                            <img className="logo-image" src="/static/images/logo/logo-dark.svg" width="160" height="37"
                                 alt="logo" loading="lazy"/>
                        </a>
                        <div className="header-menu">
                            <div className="menu-item" data-menu-item="data-menu-item">
                                <div className="btn-v2 menu-item-btn is-light-active" data-menu-item-toggle="">
                                    <div className="btn-inner">
                                        <div className="btn-text">Инструменты</div>
                                        <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
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
                                                        поиске<br/>по ключевому слову
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
                                            <use
                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>
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
                                                                     width="24" height="24" viewBox="0 0 24 24">
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
                            <a className="btn-v2 is-secondary" href="/login/">
                                <div className="btn-inner">
                                    <div className="btn-text">Вход</div>
                                </div>
                            </a> <a className="btn-v2 is-dark" href="/signup/">
                            <div className="btn-inner">
                                <div className="btn-text">Регистрация</div>
                            </div>
                        </a></div>
                    </div>


                    <div className="header-mobile"><a className="header-logo" href="https://sellego.com"><img
                        className="logo-image" src="/static/images/logo/logo-dark.svg" width="160" height="37"
                        alt="logo"
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
                                                                     width="24" height="24" viewBox="0 0 24 24">
                                                                    <use
                                                                        href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use>
                                                                </svg>
                                                                <div className="btn-text">Youtube</div>
                                                            </div>
                                                        </a></div>
                                                        <div className="menu-label">
                                                            <div className="label-text">Показываем лайфхаки и
                                                                делимся<br/>знаниями
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

                {/*<div className="section-container">*/}
                {/*    <div className="section-content">*/}
                {/*        <h1>SEO товаров и управление рекламой на WB</h1>*/}
                {/*        <p className="section-text">Удобные инструменты для продвижения и аналитики позиций, а также*/}
                {/*            обучающийся Автобиддер для быстрого выхода в топ и роста продаж на Вайлдберриз<img*/}
                {/*                className="img-line" src="/static/images/landing/main/section-1/line.png" width="249"*/}
                {/*                height="11" alt=""/></p>*/}
                {/*        <div className="section-footer">*/}
                {/*            <a className="btn-v2 is-large is-md-regular is-primary" href="/signup/">*/}
                {/*                <div className="btn-inner">*/}
                {/*                    <div className="btn-text">Попробовать сейчас</div>*/}
                {/*                </div>*/}
                {/*            </a> <a className="wb-partner-v1" href="https://seller.wildberries.ru/auth-services"*/}
                {/*                    rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><img className=""*/}
                {/*                                                                                          src="/static/images/landing/wb-partner-v1.svg"*/}
                {/*                                                                                          width="76"*/}
                {/*                                                                                          height="76"*/}
                {/*                                                                                          alt=""*/}
                {/*                                                                                          loading="lazy"/>*/}
                {/*            <div className="wb-partner-text">*/}
                {/*                <div>Официальный</div>*/}
                {/*                <div>авторизованный</div>*/}
                {/*                <div>сервис Wildberries</div>*/}
                {/*            </div>*/}
                {/*            <svg className="svg-icon wb-partner-icon" width="24" height="24" viewBox="0 0 24 24">*/}
                {/*                <use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>*/}
                {/*            </svg>*/}
                {/*        </a></div>*/}
                {/*    </div>*/}
                {/*    <div className="image-container"><img className="section-image is-desktop"*/}
                {/*                                          src="/static/images/landing/main/section-1/image-1.png"*/}
                {/*                                          width="508" height="852" alt="seo для wb"/><img*/}
                {/*        className="section-image is-not-desktop" src="/static/images/landing/main/section-1/image-2.png"*/}
                {/*        width="992" height="200" alt="seo wb"/></div>*/}
                {/*</div>*/}
                {/********** main  *************     */}

                {/*<main class="main">*/}


                {/*<section class="section-2">*/}
                {/*    <div class="container-fluid">*/}
                {/*        <div class="section-container">*/}
                {/*            <div class="section-content">*/}
                {/*                <h2>Зачем нужен Sellego?</h2>*/}
                {/*                <p class="section-text">Главный результат работы сервиса аналитики Вайлдберриз — многократный рост продаж и прибыли наших клиентов</p>*/}
                {/*            </div>*/}
                {/*            <div class="image-container"><img class="section-image" src="/static/images/landing/main/section-2/image-1.png" width="385" height="268" loading="lazy" alt="оптимизация продаж"/></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}


                {/*    <section class="section-3">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-cards-list">*/}
                {/*                    <div class="section-card"><img class="card-image" src="/static/images/landing/main/section-3/image-3.png" width="264" height="86" loading="lazy" alt="Реклама"/>*/}
                {/*                        <h4 class="card-title">Реклама без слива бюджета</h4>*/}
                {/*                        <p class="card-text">*/}
                {/*                            Реклама часто ведет себя непредсказуемо. Сервис <a href="/upravlenie-reklamoj/">Управление рекламой</a> дает больший контроль, а Автобиддер обучается и занимает лучшие позиции по самым выгодным ценам*/}
                {/*                        </p>*/}
                {/*                        <a class="btn-v2 is-secondary" href="/upravlenie-reklamoj/"><div class="btn-inner"><div class="btn-text">Подробнее</div><svg class="svg-icon btn-icon is-green3" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use></svg></div></a>        </div>*/}
                {/*                    <div class="section-card"><img class="card-image" src="/static/images/landing/main/section-3/image-1.png" width="264" height="86" loading="lazy" alt="рост позиций wb"/>*/}
                {/*                        <h4 class="card-title">Рост позиций в поиске WB</h4>*/}
                {/*                        <p class="card-text">Отслеживайте и улучшайте позиции по ключевым запросам в поиске Wildberries. Узнавайте, сколько просмотров карточки дает тот или иной ключ</p>*/}
                {/*                        <a class="btn-v2 is-secondary" href="/tracking/"><div class="btn-inner"><div class="btn-text">Подробнее</div><svg class="svg-icon btn-icon is-green3" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use></svg></div></a>        </div>*/}
                {/*                    <div class="section-card"><img class="card-image" src="/static/images/landing/main/section-3/image-2.png" width="264" height="86" loading="lazy" alt="поиск запросов"/>*/}
                {/*                        <h4 class="card-title">Контроль ключей в SEO карточек</h4>*/}
                {/*                        <p class="card-text">Правильно подобранные и вставленные в описание карточки ключи – фундамент как для органических продаж, так и для работы Рекламы с Бустером</p>*/}
                {/*                        <a class="btn-v2 is-secondary" href="/podbor-klyuchej-wb/"><div class="btn-inner"><div class="btn-text">Подобрать ключи</div><svg class="svg-icon btn-icon is-green3" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use></svg></div></a>        </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}


                {/*    <section class="section-review">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="user-review" data-review>*/}
                {/*                    <div class="review-text" data-review-text>*/}
                {/*                        <p>Меня лично все устраивает, разговаривали с менеджерами других компаний. Денег хотят очень много за свои услуги. Много лишнего у них, по крайней мере, нам не нужного. Новичкам вы просто необходимы, многие сливают просто бюджет в рекламу, не понимая сколько фактическая ставка… И что нужно делать… ваша компания все наглядно демонстрирует. С вашей помощью я довольно быстро разобралась и уже увеличили продажу и даже нам дали бронзовый кубок 😅. Вообще я вас нашла по посту в инете очень доходчиво все рассказывали… Многие не знают, что можно за такие деньги получить помощь реальную.</p>                  </div>*/}
                {/*                    <div class="review-user">*/}
                {/*                        <div class="review-user-placeholder" style="background:#e290f8" data-review-image-placeholder>*/}
                {/*                            <div class="text is-lg is-strong">А</div>*/}
                {/*                        </div>*/}
                {/*                        <div class="user-name" data-review-title>Антонина Я.</div>*/}
                {/*                        <div class="user-description" data-review-description>менеджер, Rotangtrade </div>*/}
                {/*                        <div class="user-date" data-review-date>13 марта 2025 в 14:00</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <p class="section-telegram"><span>Из отзывов в</span>*/}
                {/*                    <svg class="svg-icon telegram-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#telegram_24px_filled"></use></svg>        <a href="https://t.me/sellego_com"  target="_blank" rel="nofollow noopener noreferrer" data-pjax="0">Telegram</a>*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}

                {/*    <section class="section-services-grid">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="content-block">*/}
                {/*                        <div class="block-header">*/}
                {/*                            <h2>Управление рекламой</h2>*/}
                {/*                            <div class="badge is-success-accent is-filled">*/}
                {/*                                <div class="badge-inner">*/}
                {/*                                    <div class="badge-text">Официальное API</div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <p class="block-text">Реклама на Wildberries работает по принципу аукциона. Для автоматических кампаний WB использует завышенные ставки и не использует алгоритмы для оптимизации в удержании выгодных позиций. Наш сервис показывает реальные ставки по рекламе в поиске, что приводит к снижению расходов. Инструмент полностью автоматизирует работу с Рекламой</p>*/}
                {/*                        <div class="block-footer">*/}
                {/*                            <a class="btn-v2 is-large is-lg-regular is-dark" href="/upravlenie-reklamoj/"><div class="btn-inner"><div class="btn-text">Подробнее</div></div></a>            <a class="btn-v2 is-large is-lg-regular is-secondary" href="#prices"><div class="btn-inner"><div class="btn-text">Рассчитать тариф</div></div></a>          </div>*/}
                {/*                    </div><img class="content-image" src="/static/images/landing/main/section-7/image-5.png" width="562" height="318" loading="lazy" alt="Рассчитать тариф"/>*/}
                {/*                </div>*/}
                {/*                <div class="section-aside">*/}
                {/*                    <div class="aside-block is-keywords is-double">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Управление ключами</h4>*/}
                {/*                            <p class="block-text">Автоминусация фраз и работа только по «белому списку» ключей. Управление ключами и кластерами на полном и очень эффективном автопилоте.</p>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-7/image-7.png" width="157" height="99" loading="lazy" alt="Управление ключами"/>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-count-control">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Контроль остатков</h4>*/}
                {/*                            <p class="block-text">Остатки товаров по кампаниям всегда под контролем</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-saving">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Экономия бюджета</h4>*/}
                {/*                            <p class="block-text"><span class="is-pink1">До 70%</span> экономии при работе по реальным ставкам</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-algorithm is-double">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Управление ставкой CPM</h4>*/}
                {/*                            <p class="block-text">Используйте одну из 5 стратегий автобиддера для управления CPM, чтобы занять самые лучшие позиции по нужным ключам с минимально возможными затратами.</p>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-7/image-6.png" width="150" height="105" loading="lazy" alt="Управление ставкой CPM"/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-end">*/}
                {/*                    <div class="aside-block is-advanced-analytics is-light">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Продвинутая аналитика</h4>*/}
                {/*                            <p class="block-text">Удобная оценка показателей работы всех запущенных кампаний. Так и полная статистика по каждому ключу и подробный лог действий автобиддера.</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-light">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Авто-пополнение</h4>*/}
                {/*                            <p class="block-text">Сервис пополнит кампании автоматически</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-bidder">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Контроль остатков</h4>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-7/image-3.png" width="184" height="144" loading="lazy" alt="Контроль остатков"/>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-telegram">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title"><span>Уведомления в</span>*/}
                {/*                                <svg class="svg-icon is-telegram" width="24" height="24" viewBox="0 0 24 24">*/}
                {/*                                    <use href="/static/images/icons/icons.svg#telegram_24px_filled"></use>*/}
                {/*                                </svg> <span>Telegram</span>*/}
                {/*                            </h4>*/}
                {/*                            <p class="block-text">Не пропустите важные изменения в своих кампаниях</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}

                {/****************************************/}

                {/*    <section class="section-module">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="content-block">*/}
                {/*                        <h4 class="block-title">Подбор ключей</h4>*/}
                {/*                        <p class="block-text">Бесплатный сервис подбора ключевых слов для оптимизации описания карточек ВБ<img class="img-line" src="/static/images/landing/main/section-8/line.png" width="175" height="11" loading="lazy" alt="Подбор ключей"/></p>*/}
                {/*                        <form id="w0" class="block-form" action="/podbor-klyuchej-wb/" method="post">*/}
                {/*                            <input type="hidden" name="_csrf" value="hB1lCC8TwMT-Hm_Y1RcD2L5dfmBBq067NvnFFzBm4m_OeVxEYlCyj7JKGLWccE2y4RsPWHaeFvJhqKNaQlKHGw==">          <div class="input is-large is-md-regular field-keywordsform-query required" data-input>*/}
                {/*                                <div class="input-container" data-input-container>*/}
                {/*                                    <div class="input-main">*/}

                {/*                                        <input type="text" id="keywordsform-query" class="input-element" name="KeywordsForm[query]" data-input-element placeholder="Например «мужская футболка»" aria-required="true">*/}
                {/*                                    </div>*/}

                {/*                                </div>*/}
                {/*                                <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                            </div>          <div class="input recaptcha-container field-keywordsform-recaptcha">*/}
                {/*                                <input type="hidden" id="keywordsform-recaptcha" class="input-element" name="KeywordsForm[reCaptcha]" data-input-element>*/}
                {/*                                    <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                            </div>          <button type="submit" class="btn-v2 is-md-regular is-large is-dark"><div class="btn-inner"><div class="btn-text">Проверить</div></div></button>          </form>          <div class="recaptcha-protection-text ">*/}
                {/*                        <div class="protection-text">*/}
                {/*                            <span>Этот сайт защищен с помощью reCAPTCHA и соответствует</span>*/}
                {/*                            <a href="https://policies.google.com/privacy" target="_blank" rel="nofollow noopener">Политике конфиденциальности</a> и*/}
                {/*                            <a href="https://policies.google.com/terms" target="_blank" rel="nofollow noopener">Условиям использования</a> Google.*/}
                {/*                        </div>*/}
                {/*                    </div>        </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-aside">*/}
                {/*                    <div class="module-counter">*/}
                {/*                        <div class="counter-value">13 496 931</div>*/}
                {/*                        <div class="counter-label">Всего ключей в базе</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="module-counter">*/}
                {/*                        <div class="counter-value">25.08.2025</div>*/}
                {/*                        <div class="counter-label">Дата обновления базы</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}

                {/*    <section class="section-services-grid">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container"><img class="section-image" src="/static/images/landing/main/section-5/image-1.png" width="320" height="320" loading="lazy" alt="позиции"/>*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="content-block">*/}
                {/*                        <div class="block-header">*/}
                {/*                            <h2>Трекер позиций</h2>*/}
                {/*                        </div>*/}
                {/*                        <p class="block-text">Трекер ежедневно автоматически проверяет позиции по всем ключевым запросам, по которым ваш товар виден на Wildberries. Следите за динамикой изменений позиций, оценивайте реакцию на включение Рекламы с Бустером, изменение описания, характеристик или цен</p>*/}
                {/*                        <div class="block-footer">*/}
                {/*                            <a class="btn-v2 is-large is-lg-regular is-dark" href="/tracking/"><div class="btn-inner"><div class="btn-text">Подробнее</div></div></a>            <a class="btn-v2 is-large is-lg-regular is-secondary" href="#prices"><div class="btn-inner"><div class="btn-text">Рассчитать тариф</div></div></a>          </div>*/}
                {/*                    </div><img class="content-image" src="/static/images/landing/main/section-5/image-2.png" width="562" height="358" loading="lazy" alt="поиск ключей"/>*/}
                {/*                </div>*/}
                {/*                <div class="section-aside is-tracking">*/}
                {/*                    <div class="aside-block is-views">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <div class="block-label">Просмотры</div>*/}
                {/*                            <h4 class="block-title">Следите за <span class="is-green1">просмотрами</span> по каждому ключу</h4>*/}
                {/*                            <svg class="svg-icon block-image is-48" width="48" height="48" viewBox="0 0 48 48"><use href="/static/images/icons/icons.svg?v=1756110266#vision_48px"></use></svg>          </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-geo">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">9 гео</h4>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-5/image-4.png" width="190" height="303" loading="lazy" alt="локации трекинга вб"/>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-positions is-double">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Позиции по Рекламе</h4>*/}
                {/*                            <p class="block-text">Узнайте с какой позиции и на какую попал товар по каждому ключу</p>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-5/image-5.png" width="184" height="144" loading="lazy" alt="позиции по арк"/s>*/}
                {/*                    </div>*/}
                {/*                    <div class="aside-block is-key-groups is-double">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">Проекты и группы ключей</h4>*/}
                {/*                            <p class="block-text">Добавляйте свои ключи, делите их на группы, разбивайте товары на проекты</p>*/}
                {/*                        </div><img class="block-image" src="/static/images/landing/main/section-5/image-6.png" width="403" height="44" loading="lazy" alt="проекты по группам ключей">*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-footer">*/}
                {/*                    <div class="aside-block is-products-compare">*/}
                {/*                        <div class="block-body">*/}
                {/*                            <h4 class="block-title">*/}
                {/*                                Сравнение с конкурентами и упущенные ключевые слова*/}
                {/*                            </h4>*/}
                {/*                            <p class="block-text">*/}
                {/*                                Инструмент сравнит целевую карточку с конкурентами и найдет все упущенные ключевые слова, по которым конкуренты могут успешно получать продажи. Кроме того вы сможете быстро понять какие ключи в топе у конкурентов и на что вам нужно сделать упор.*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                        <p class="block-text is-secondary">*/}
                {/*                            Входит в платную подписку на Трекинг позиций*/}
                {/*                        </p>*/}
                {/*                    </div>*/}
                {/*                    <img src="/static/images/landing/main/section-5/image-7.png" alt="" width="462" height="320" loading="lazy" class="section-image">*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}

                {/*    <section class="section-module">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="content-block">*/}
                {/*                        <div class="block-header">*/}
                {/*                            <h4 class="block-title">Быстрая проверка позиций</h4>*/}
                {/*                            <div class="badge is-lime is-filled">*/}
                {/*                                <div class="badge-inner">*/}
                {/*                                    <div class="badge-text">Учитывая Рекламу</div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}

                {/*                        <p class="block-text">Бесплатный инструмент продвижения на ВБ: сервис позволяет оценивать все ключи и позиции любых товаров на конкретный момент времени<img class="img-line" src="/static/images/landing/main/section-6/line.png" width="212" height="11" loading="lazy" alt=""></p>*/}
                {/*                        <form id="w1" class="block-form ajax-form" action="/tracking/" method="post">*/}
                {/*                            <input type="hidden" name="_csrf" value="hB1lCC8TwMT-Hm_Y1RcD2L5dfmBBq067NvnFFzBm4m_OeVxEYlCyj7JKGLWccE2y4RsPWHaeFvJhqKNaQlKHGw==">*/}
                {/*                                <div class="input is-large is-md-regular field-instacheckform-artikul required" data-input>*/}
                {/*                                    <div class="input-container" data-input-container>*/}
                {/*                                        <div class="input-main">*/}

                {/*                                            <input type="text" id="instacheckform-artikul" class="input-element" name="InstacheckForm[artikul]" data-input-element placeholder="Введите артикул товара" aria-required="true">*/}
                {/*                                        </div>*/}

                {/*                                    </div>*/}
                {/*                                    <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                </div>*/}
                {/*                                <div class="input recaptcha-container field-instacheckform-recaptcha">*/}
                {/*                                    <input type="hidden" id="instacheckform-recaptcha" class="input-element" name="InstacheckForm[reCaptcha]" data-input-element>*/}
                {/*                                        <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                </div>                                <button type="submit" class="btn-v2 is-md-regular is-large is-dark"><div class="btn-inner"><div class="btn-text">Проверить</div></div></button>                              </form>                      <div class="recaptcha-protection-text ">*/}
                {/*                        <div class="protection-text">*/}
                {/*                            <span>Этот сайт защищен с помощью reCAPTCHA и соответствует</span>*/}
                {/*                            <a href="https://policies.google.com/privacy" target="_blank" rel="nofollow noopener">Политике конфиденциальности</a> и*/}
                {/*                            <a href="https://policies.google.com/terms" target="_blank" rel="nofollow noopener">Условиям использования</a> Google.*/}
                {/*                        </div>*/}
                {/*                    </div>                  </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-aside">*/}
                {/*                    <div class="module-counter">*/}
                {/*                        <div class="counter-value">5 223</div>*/}
                {/*                        <div class="counter-label">Проверок вчера</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="module-counter">*/}
                {/*                        <div class="counter-value">110 177</div>*/}
                {/*                        <div class="counter-label">Товаров за месяц</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="module-counter">*/}
                {/*                        <div class="counter-value">292 698</div>*/}
                {/*                        <div class="counter-label">Проверок за месяц</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}


                {/*    <section class="section-blog is-news">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <h2>Новости и обновления</h2>*/}
                {/*                    <p class="section-text">Рассказываем что добавили или изменили в сервисе</p>*/}
                {/*                </div>*/}
                {/*                <div class="blog-articles swiper">*/}
                {/*                    <div class="swiper-wrapper">*/}

                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/rabota-s-ostatkami-novaya-opciya-v-reklamnyh-kampaniyah/" target="_blank"><img class="article-image" src="/uploads/iblock_element/b28d4c41ee4e175805c12971e2f1ad66.png" width="152" height="85" alt="Работа с остатками — новая опция в рекламных кампаниях" loading="lazy"><div class="article-title">Работа с остатками — новая опция в рекламных кампаниях</div><div class="article-text">Автостоп и автозапуск рекламных кампаний по рекламным остаткам в Sellego </div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/import-nastroek-reklamnyh-kampaniy-pod-upravleniem-sellego/" target="_blank"><img class="article-image" src="/uploads/iblock_element/ac992d211d19b9c2df1fcb276d376396.png" width="152" height="85" alt="Импорт настроек рекламных кампаний под управлением Sellego" loading="lazy"><div class="article-title">Импорт настроек рекламных кампаний под управлением Sellego</div><div class="article-text">Добавили функцию автопереноса настроек успешной РК в одну или несколько кампаний под управлением Sellego</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 1 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/novyy-instrument-sellego-dlya-poiska-pribylnyh-fraz/" target="_blank"><img class="article-image" src="/uploads/iblock_element/1b62fe7aef36df65f298c11b28dafa86.png" width="152" height="85" alt="Новый инструмент Sellego: находите прибыльные фразы, а не просто популярные" loading="lazy"><div class="article-title">Новый инструмент Sellego: находите прибыльные фразы, а не просто популярные</div><div class="article-text">Подтягиваем данные из Джем, чтобы вы находили больше рекламных ключей, которые точно продают</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 1 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/uluchshili-yuzabiliti-instrumentov-modulya-upravlenie-reklamoy/" target="_blank"><img class="article-image" src="/uploads/iblock_element/221f92a24b4d8430560b9de0b5126ff4.png" width="152" height="85" alt="Улучшили юзабилити инструментов модуля Управление рекламой" loading="lazy"><div class="article-title">Улучшили юзабилити инструментов модуля Управление рекламой</div><div class="article-text">Добавили новые функции в модуль Управление рекламой для удобной работы с кластерами и историей фраз</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/obnovili-filtry-po-frazam-v-biddere-sellego/" target="_blank"><img class="article-image" src="/uploads/iblock_element/d7f028a519f80403dd971ea2990f6151.png" width="152" height="85" alt="Обновили систему пополнения баланса и фильтры по фразам в биддере Sellego" loading="lazy"><div class="article-title">Обновили систему пополнения баланса и фильтры по фразам в биддере Sellego</div><div class="article-text">В биддере Sellego обновлены фильтры по фразам и система пополнения баланса</div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news/dobavili-v-bidder-rasshirennuyu-analitiku-iz-dzhema/" target="_blank"><img class="article-image" src="/uploads/iblock_element/3a75e6a9c2a12b35c99cf16fe131567f.jpg" width="152" height="85" alt="Добавили в биддер расширенную аналитику из Джема" loading="lazy"><div class="article-title">Добавили в биддер расширенную аналитику из Джема</div><div class="article-text">Данные по фразам из Джема теперь можно смотреть во вкладке «Ключи и кластеры» биддера  Sellego </div><div class="labels"><div class="label is-tag"><span>Новости Sellego</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>*/}

                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-footer">*/}
                {/*                    <a class="btn-v2 is-secondary" href="/blog/news/"><div class="btn-inner"><div class="btn-text">Другие новости Sellego</div><svg class="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_24px"></use></svg></div></a>      </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}


                {/*    <section class="section-blog">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <h2>Делаете первые шаги на WB?</h2>*/}
                {/*                    <p class="section-text">*/}
                {/*                        Читайте экспертные материалы в нашем блоге и смотрите полезные обучающие видео для получения кратного*/}
                {/*                        преимущества перед вашими конкурентами на маркетплейсе Wildberries.*/}
                {/*                    </p>*/}
                {/*                </div>*/}
                {/*                <div class="blog-articles swiper">*/}
                {/*                    <div class="swiper-wrapper">*/}

                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/news-wb/vb-vvodit-gradaciyu-skidok-v-avtoakciyah/" target="_blank"><img class="article-image" src="/uploads/iblock_element/88721f7745799eb6a2b99cedc1fa7d45.png" width="152" height="85" alt="ВБ вводит градацию скидок в Автоакциях: разбираем плюсы и минусы для селлеров" loading="lazy"><div class="article-title">ВБ вводит градацию скидок в Автоакциях: разбираем плюсы и минусы для селлеров</div><div class="article-text">Появилось 4 уровня глубины скидки при участии в Автоакциях ВБ. Хорошо это или плохо для селлеров — разбираемся.</div><div class="labels"><div class="label is-tag"><span>Новости ВБ</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 2 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/stati/kak-snizit-cenu-klika-i-optimizirovat-drr-v-reklame-vb/" target="_blank"><img class="article-image" src="/uploads/iblock_element/fb8d044c7341b52cd16fb64bbb473338.jpg" width="152" height="85" alt="Как снизить цену клика и оптимизировать ДРР в рекламе ВБ?" loading="lazy"><div class="article-title">Как снизить цену клика и оптимизировать ДРР в рекламе ВБ?</div><div class="article-text">Что учитывать при анализе рекламных кампаний на Вайлдберриз? Пошаговая инструкция для оптимизации рекламных расходов на WB с помощью связки Sellego и Джем. </div><div class="labels"><div class="label is-tag"><span>Статьи</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 9 мин</span></div></div></a>            </div>*/}
                {/*                        <div class="swiper-slide">*/}
                {/*                            <a class="related-article" href="/blog/kejsy-wb/kak-popast-v-rekomendatelnye-polki-vaildberriz/" target="_blank"><img class="article-image" src="/uploads/iblock_element/120ec7353a13259c528b98e2e0d86708.jpg" width="152" height="85" alt="Как попасть в рекомендательные полки Вайлдберриз: рабочие стратегии и пошаговая инструкция" loading="lazy"><div class="article-title">Как попасть в рекомендательные полки Вайлдберриз: рабочие стратегии и пошаговая инструкция</div><div class="article-text">Как попасть в рекомендательные полки на Wildberries: разбор стратегий с примерами </div><div class="labels"><div class="label is-tag"><span>Кейсы ВБ</span></div><div class="label label-time"><svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use></svg><span>на 19 мин</span></div></div></a>            </div>*/}

                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div class="section-footer" style="z-index: 1">*/}
                {/*                    <a class="btn-v2 is-secondary" href="https://vk.com/sellegocom" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div class="btn-inner"><svg class="svg-icon btn-icon vk-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vk_24px"></use></svg><div class="btn-text">ВКонтакте</div></div></a>        <a class="btn-v2 is-secondary" href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div class="btn-inner"><svg class="svg-icon btn-icon youtube-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use></svg><div class="btn-text">Youtube</div></div></a>        <a class="btn-v2 is-secondary" href="https://dzen.ru/sellego" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div class="btn-inner"><svg class="svg-icon btn-icon dzen-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#dzen_24px"></use></svg><div class="btn-text">Дзен</div></div></a>        <a class="btn-v2 is-secondary" href="/blog/"><div class="btn-inner"><div class="btn-text">Больше в блоге</div><svg class="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_24px"></use></svg></div></a>      </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}

                {/*    <section class="section-calculator" id="prices">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="image-container"><img class="section-image" src="/static/images/landing/services-calculator/image-1.png" width="320" height="320" loading="lazy" alt="вб продажи"></div>*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="section-header">*/}
                {/*                        <h2 class="section-title">Тарифы</h2>*/}
                {/*                    </div>*/}
                {/*                    <div class="section-body">*/}
                {/*                        <p class="section-text">Любой тариф можно попробовать <b>в течение 3 дней</b> всего <b>за 30₽</b>. Платите только за необходимое</p>*/}

                {/*                        <div class="btn-v2 is-accent" data-toggle="custom-modal" data-target="join-to-demo-modal"><div class="btn-inner"><div class="btn-text">Записаться на демонстрацию сервиса</div></div></div>*/}
                {/*                        <div class="custom-modal join-to-demo-modal is-large" data-custom-modal="join-to-demo-modal" data-autofocus tabindex="-1"><div class="modal-backface"></div><div class="modal-container"><img class="modal-mesh" src="/static/images/landing/modal/join-to-demo/mesh.png" width="800" height="496" alt="" loading="lazy"><svg class="svg-icon modal-close" width="24" height="24" viewBox="0 0 24 24" data-modal-action="close"><use href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use></svg>  <div class="modal-content">*/}
                {/*                            <div class="modal-side is-promo">*/}
                {/*                                <div class="typography-row gap-2xl">*/}
                {/*                                    <div class="typography-row gap-md">*/}
                {/*                                        <h4>Запись <br> на персональную <br> демонстрацию Sellego </h4>*/}
                {/*                                        <div class="typography-text is-md">Проведем краткий обзор системы и ответим на ваши вопросы</div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <img class="promo-asset" src="/static/images/landing/modal/join-to-demo/asset-image-3.png" width="172" height="135" alt="" loading="lazy">      <img class="promo-image" src="/static/images/landing/modal/join-to-demo/reklamist-config.png" width="300" height="189" alt="" loading="lazy">    </div>*/}
                {/*                            <div class="modal-side is-form">*/}
                {/*                                <form id="w2" class="typography-row gap-lg without-spinner" action="/site/join-to-demo/" method="post" data-form-modal="join-to-demo">*/}
                {/*                                    <input type="hidden" name="_csrf" value="hB1lCC8TwMT-Hm_Y1RcD2L5dfmBBq067NvnFFzBm4m_OeVxEYlCyj7JKGLWccE2y4RsPWHaeFvJhqKNaQlKHGw==">            <div class="typography-text text-size-xl text-weight-bold">*/}
                {/*                                        Как с вами связаться?*/}
                {/*                                    </div>*/}
                {/*                                        <div class="input field-jointodemoform-name required" data-input>*/}
                {/*                                            <div class="input-container" data-input-container>*/}
                {/*                                                <div class="input-main">*/}

                {/*                                                    <input type="text" id="jointodemoform-name" class="input-element" name="JoinToDemoForm[name]" data-input-element placeholder="Ваше имя" aria-required="true">*/}
                {/*                                                </div>*/}

                {/*                                            </div>*/}
                {/*                                            <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                        </div>*/}
                {/*                                        <div class="input field-jointodemoform-email" data-input>*/}
                {/*                                            <div class="input-container" data-input-container>*/}
                {/*                                                <div class="input-main">*/}

                {/*                                                    <input type="text" id="jointodemoform-email" class="input-element" name="JoinToDemoForm[email]" data-input-element placeholder="Email">*/}
                {/*                                                </div>*/}

                {/*                                            </div>*/}
                {/*                                            <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                        </div>*/}
                {/*                                        <div class="input field-jointodemoform-telegram" data-input>*/}
                {/*                                            <div class="input-container" data-input-container>*/}
                {/*                                                <div class="input-main">*/}

                {/*                                                    <input type="text" id="jointodemoform-telegram" class="input-element" name="JoinToDemoForm[telegram]" data-input-element placeholder="Telegram">*/}
                {/*                                                </div>*/}

                {/*                                            </div>*/}
                {/*                                            <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                        </div>*/}

                {/*                                        <div class="input field-jointodemoform-termsagree required" data-input>*/}
                {/*                                            <label class='input-checkbox'><input type="hidden" name="JoinToDemoForm[termsAgree]" value="0"><input type="checkbox" id="jointodemoform-termsagree" name="JoinToDemoForm[termsAgree]" value="1" hidden aria-required="true">*/}
                {/*                                                <svg class="svg-icon checkbox-icon is-24" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#checkbox_24px"></use></svg>*/}
                {/*                                                <div class='checkbox-label'><div class="typography text-size-2xs">Я даю согласие на обработку моей персональной информации на условиях, определенных<a href="/privacy-policy/" target="_blank"> Политикой конфиденциальности</a> и принимаю условия <a href="/terms-of-service/" target="_blank">Пользовательского соглашения</a></div></div></label>*/}
                {/*                                            <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                        </div>*/}
                {/*                                        <div class="input recaptcha-container field-jointodemoform-recaptcha">*/}
                {/*                                            <input type="hidden" id="jointodemoform-recaptcha" class="input-element" name="JoinToDemoForm[reCaptcha]" data-input-element>*/}
                {/*                                                <div class="input-message is-error"><p class="message-text"></p></div>*/}
                {/*                                        </div>*/}
                {/*                                        <button type="submit" class="btn-v2 is-disable-on-submit is-dark"><div class="btn-inner"><div class="btn-text">Отправить</div></div></button>      <div class="typography text-size-sm">*/}
                {/*                                            С вами свяжется наш менеджер чтобы определить удобное время для онлайн-встречи*/}
                {/*                                        </div>*/}
                {/*                                        <div class="recaptcha-protection-text">*/}
                {/*                                            <div class="recaptcha-protection-text ">*/}
                {/*                                                <div class="protection-text">*/}
                {/*                                                    <span>Этот сайт защищен с помощью reCAPTCHA и соответствует</span>*/}
                {/*                                                    <a href="https://policies.google.com/privacy" target="_blank" rel="nofollow noopener">Политике конфиденциальности</a> и*/}
                {/*                                                    <a href="https://policies.google.com/terms" target="_blank" rel="nofollow noopener">Условиям использования</a> Google.*/}
                {/*                                                </div>*/}
                {/*                                            </div>        </div>*/}
                {/*                                </form>    </div>*/}
                {/*                        </div>*/}
                {/*                        </div></div>*/}
                {/*                        <div class="custom-modal join-to-demo-success-modal is-large" data-custom-modal="join-to-demo-success-modal" data-autofocus tabindex="-1"><div class="modal-backface"></div><div class="modal-container">  <svg class="svg-icon modal-close" width="24" height="24" viewBox="0 0 24 24" data-modal-action="close"><use href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use></svg>  <div class="modal-content">*/}
                {/*                            <img class="" src="/static/images/landing/modal/join-to-demo/asset-image-4.png" width="160" height="160" alt="" loading="lazy">    <div class="typography-text text-size-xl text-align-center text-weight-bold">*/}
                {/*                                Спасибо!*/}
                {/*                            </div>*/}
                {/*                                <div class="typography-text text-size-sm text-align-center">*/}
                {/*                                    В ближайшее время с вами свяжется наш менеджер чтобы определить удобное время для онлайн-встречи*/}
                {/*                                </div>*/}
                {/*                        </div>*/}
                {/*                        </div></div>                  </div>*/}

                {/*                    <div class="section-currency">*/}
                {/*                        <div class="section-text">Валюта платежа:</div>*/}
                {/*                        <div class="improved-select is-secondary is-outline is-small" data-improved-select>*/}
                {/*                            <select hidden id="w5_currency_id">*/}
                {/*                                <option value="3" selected>₽ Рубль</option>*/}
                {/*                                <option value="4" >₸ Тенге</option>*/}
                {/*                            </select>*/}
                {/*                            <div class="select-header" data-select-toggle>*/}
                {/*                                <div class="select-value is-large" data-select-value></div>*/}
                {/*                                <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>    </div>*/}
                {/*                            <div class="select-body" data-select-body>*/}
                {/*                                <div class="select-menu">*/}
                {/*                                    <div class="select-menu-item" data-select-option>*/}
                {/*                                        <div class="item-text">₽ Рубль</div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="select-menu-item" data-select-option>*/}
                {/*                                        <div class="item-text">₸ Тенге</div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <script>*/}
                {/*                    window.calculator = {"api":{"update":"/calculator/default/update/"},"periods":[{"id":"1","active":true,"value":"1 месяц"},{"id":"2","active":false,"value":"3 месяца","discount":"-10 %"},{"id":"4","active":false,"value":"6 месяцев","discount":"-15 %"},{"id":"3","active":false,"value":"1 год","discount":"-20 %"}],"services":[{"id":"tracking","title":"Трекинг позиций","icon":"keymeter_48px_bold","description":"Установите лимит товаров для отслеживания","counter":{"title":{"one":"товар","few":"товара","many":"товаров"},"value":10,"min":10,"max":300,"step":10},"price":{"value":970,"period":"₽/мес"},"btn":{"text":"Попробовать за 30 ₽","priceUsd":"","href":"/cabinet/payment/index/?checked=tracking"},"options":[{"title":"Ежедн. проверки по всем ключам","checked":true},{"title":"Количество ключей","icon":{"name":"infinity_36px_filled","size":36}},{"title":"Локации трекинга","value":"9"},{"title":"Глубина анализа выдачи, страниц","value":"12"},{"title":"Упущенные ключи на базе конкурентов","checked":true},{"title":"Позиции Рекламы","checked":true},{"title":"Безлимитный SERP","checked":true}]},{"id":"ads_pos","title":"Управление рекламой","icon":"advertiser_48px","description":"Установите лимит рекламных кампаний","counter":{"title":{"one":"кампания","few":"кампании","many":"кампаний"},"value":10,"min":10,"max":500,"step":10},"price":{"value":3990,"period":"₽/мес"},"btn":{"text":"Попробовать за 30 ₽","priceUsd":"","href":"/cabinet/payment/index/?checked=ads_pos"},"options":[{"title":"Количество продавцов","icon":{"name":"infinity_36px_filled","size":36}},{"title":"Автоматическое или ручное управление фразами","checked":true},{"title":"Конверсии по фразам из Джем ВБ","checked":true},{"title":"Автомат. управление ставками","checked":true},{"title":"Автоуправление графиком запуска кампаний","checked":true},{"title":"Автопополнение рекламного бюджета","checked":true},{"title":"Режим \"Белый список\" фраз и \"Автоминусация по условиям\"","checked":true},{"title":"Реальные ставки в Рекламе","checked":true},{"title":"Сравнение кампаний по фразам","checked":true},{"title":"Оповещения в Telegram","checked":true}]}]};*/}
                {/*                </script>*/}
                {/*                <div class="services-calculator-app">*/}
                {/*                    <div class="services-calculator">*/}
                {/*                        <div class="calculator-header">*/}
                {/*                            <div class="tab is-secondary is-large is-lg-regular is-active">*/}
                {/*                                <div class="tab-text"><span>1 месяц</span></div>*/}
                {/*                            </div>*/}
                {/*                            <div class="tab is-secondary is-large is-lg-regular ">*/}
                {/*                                <div class="tab-text"><span>3 месяца</span></div>*/}
                {/*                                <div class="counter">*/}
                {/*                                    <div class="counter-value">-10 %</div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                            <div class="tab is-secondary is-large is-lg-regular ">*/}
                {/*                                <div class="tab-text"><span>6 месяцев</span></div>*/}
                {/*                                <div class="counter">*/}
                {/*                                    <div class="counter-value">-15 %</div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                            <div class="tab is-secondary is-large is-lg-regular ">*/}
                {/*                                <div class="tab-text"><span>1 год</span></div>*/}
                {/*                                <div class="counter">*/}
                {/*                                    <div class="counter-value">-20 %</div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div class="calculator-body ">*/}
                {/*                            <div class="service">*/}

                {/*                                <div class="service-header">*/}
                {/*                                    <svg class="svg-icon service-icon is-48" width="48" height="48" viewBox="0 0 48 48"><use href="/static/images/icons/icons.svg?v=1756110266#keymeter_48px_bold"></use></svg>  <h3 class="service-title">Трекинг позиций</h3>*/}
                {/*                                    <p class="service-description">Установите лимит товаров для отслеживания</p>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-counter">*/}
                {/*                                    <div class="range-min">10</div>*/}
                {/*                                    <div class="range-title">10 товаров</div>*/}
                {/*                                    <div class="range-max">300</div>*/}
                {/*                                    <input class="input-range" type="range" min="10" max="300" step="10" value="10">*/}
                {/*                                </div>*/}
                {/*                                <div class="improved-select is-secondary-dark">*/}
                {/*                                    <div class="select-header">*/}
                {/*                                        <div class="select-value">*/}
                {/*                                            <div class="select-value-group"><span>1 месяц</span></div>*/}
                {/*                                        </div>*/}
                {/*                                        <svg class="svg-icon select-arrow" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>  </div>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-body">*/}
                {/*                                    <div class="service-price ">*/}
                {/*                                        <div class="price-value">970</div>*/}
                {/*                                        <div class="price-info">*/}
                {/*                                            <div class="price-period">₽/мес</div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="btn-v2 is-large is-md-regular is-dark">*/}
                {/*                                        <div class="btn-inner">*/}
                {/*                                            <div class="btn-text"><span>Заказать</span></div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-options">*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Ежедн. проверки по всем ключам</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Количество ключей</div>*/}
                {/*                                        <svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use></svg>                </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Локации трекинга</div>*/}
                {/*                                        <div class="option-value">*/}
                {/*                                            9        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Глубина анализа выдачи, страниц</div>*/}
                {/*                                        <div class="option-value">*/}
                {/*                                            12        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Упущенные ключи на базе конкурентов</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Позиции Рекламы</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Безлимитный SERP</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                            <div class="service">*/}

                {/*                                <div class="service-header">*/}
                {/*                                    <svg class="svg-icon service-icon is-48" width="48" height="48" viewBox="0 0 48 48"><use href="/static/images/icons/icons.svg?v=1756110266#advertiser_48px"></use></svg>  <h3 class="service-title">Управление рекламой</h3>*/}
                {/*                                    <p class="service-description">Установите лимит рекламных кампаний</p>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-counter">*/}
                {/*                                    <div class="range-min">10</div>*/}
                {/*                                    <div class="range-title">10 кампаний</div>*/}
                {/*                                    <div class="range-max">500</div>*/}
                {/*                                    <input class="input-range" type="range" min="10" max="500" step="10" value="10">*/}
                {/*                                </div>*/}
                {/*                                <div class="improved-select is-secondary-dark">*/}
                {/*                                    <div class="select-header">*/}
                {/*                                        <div class="select-value">*/}
                {/*                                            <div class="select-value-group"><span>1 месяц</span></div>*/}
                {/*                                        </div>*/}
                {/*                                        <svg class="svg-icon select-arrow" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use></svg>  </div>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-body">*/}
                {/*                                    <div class="service-price ">*/}
                {/*                                        <div class="price-value">3990</div>*/}
                {/*                                        <div class="price-info">*/}
                {/*                                            <div class="price-period">₽/мес</div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="btn-v2 is-large is-md-regular is-dark">*/}
                {/*                                        <div class="btn-inner">*/}
                {/*                                            <div class="btn-text"><span>Заказать</span></div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <div class="service-options">*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Количество продавцов</div>*/}
                {/*                                        <svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use></svg>                </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Автоматическое или ручное управление фразами</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Конверсии по фразам из Джем ВБ</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Автомат. управление ставками</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Автоуправление графиком запуска кампаний</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Автопополнение рекламного бюджета</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Режим "Белый список" фраз и "Автоминусация по условиям"</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Реальные ставки в Рекламе</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Сравнение кампаний по фразам</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                    <div class="service-option">*/}
                {/*                                        <div class="option-title">Оповещения в Telegram</div>*/}
                {/*                                        <svg class="svg-icon option-checked-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>                      </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>    </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}


                {/*    <section class="section-press">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-header">*/}
                {/*                    <h2>О нас пишут</h2>*/}
                {/*                    <a class="btn-v2 read-more-btn is-space-xl is-space-sm-md is-secondary" href="/press/"><div class="btn-inner"><div class="btn-text">Подробнее</div><svg class="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_24px"></use></svg></div></a>      </div>*/}

                {/*                <div class="section-content">*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/04dca65d0e4ae583eeb1b957fbce4c41.png" width="160" height="58" alt="GL" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/4c37777fe64125ba7198acc516a3573b.png" width="160" height="28" alt="POSTIUM" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/baca72d512c4a9b97826d2de34e6a739.png" width="160" height="32" alt="Деловой мир" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/4ab5bb536dc82e61c5b647a258160e05.png" width="160" height="31" alt="SEOnews" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/463b6d08a7cd6313d36b30f545298b75.png" width="160" height="34" alt="Финансы (проект kp.ru)" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/ab562533d23620e51f075dd3588af8ff.png" width="160" height="18" alt="Отзыв Маркетинг" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/403467702f196c17f910aaf9cc54133e.png" width="128" height="64" alt="Ашманов и партнеры" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/74f7299c7021648ad9170492870e6ad5.png" width="64" height="64" alt="Kokoc" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/19a49331538b0f9e1d19549a60316eee.png" width="160" height="19" alt="ЦифроКурсы" loading="lazy">          </div>*/}
                {/*                    <div class="press-item">*/}

                {/*                        <img class="press-image" src="/uploads/press_publisher/403b55a1d53b2a8739dda0b4566c2cd2.png" width="160" height="43" alt="Quasa" loading="lazy">          </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}


                {/*    <section class="section-reviews">*/}
                {/*        <div class="section-image-clip">*/}
                {/*            <img class="section-image-1" src="/static/images/landing/main/section-reviews/image-1.jpg" width="1200" height="720" alt="" loading="lazy">*/}
                {/*        </div>*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-content">*/}
                {/*                    <div class="content-header">*/}
                {/*                        <h2 class="section-title">Отзывы</h2>*/}
                {/*                        <div class="nav-controls"><div class="nav-control" data-carousel-prev><svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_left_36px"></use></svg></div><div class="nav-control" data-carousel-next><svg class="svg-icon" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_36px"></use></svg></div></div>        </div>*/}
                {/*                    <p class="section-text">Уже <b>90 000+ продавцов</b> поднимают продажи вместе с нами</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div class="reviews-carousel-v2"><div class="container-fluid"><div class="carousel-container swiper"><div class="swiper-wrapper"><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/7038ce1bf7718a3b52e7551937d6db8e.png" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Ильяс Ярмухаметов</div><div class="item-date" data-review-date="">21 августа 2025 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>По-моему, биддер Sellego лучший на рынке. Он достоин популярности больше, чем какой-то другой! И мне есть с чем сравнить</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/d2d856285ed9c5bd30fa503bfcb5d73a.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Митрошина Елена</div><div class="item-description" data-review-description="">менеджер ВБ </div><div class="item-date" data-review-date="">14 августа 2025 в 15:00</div></div></div><div class="item-text" data-review-text=""><p>Сервис очень удобный в плане выгрузки и мониторинга позиций. Позволяет отслеживать динамику падения и роста, а также, смотреть динамику роста органических позиций.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Артем</div><div class="item-date" data-review-date="">23 мая 2025 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>Сервис у вас классный! Очень удобно отслеживать позиции и видеть общее количество просмотров за месяц. Лично мне так удобней планировать бюджет кампании нежели просто смотреть места и ставку по тому или иному ключу. Однозначно лайк!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/f0c238f76ab88b9190cdcc1b751a3c9d.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Полянский А.Ю</div><div class="item-description" data-review-description="">Бренд Altai Products</div><div class="item-date" data-review-date="">19 мая 2025 в 11:00</div></div></div><div class="item-text" data-review-text=""><div>Занимаюсь продажами на площадке WB 11 месяцев. Когда не знал о вас, использовал стандартную рекламу на WB, первое что заметил — это то что деньги очень быстро расходовались. Сразу стал искать выход! На ютубе наткнулся на блогера, который вас упомянул, после чего я изучил вашу программу. Разобравшись, нашел плюсы — есть возможность чистить и оставлять те ключи, которые нужны ( с помощью ее я сэкономил кучу денег). Так же нравится функция автоматической ставки, а именно сама программа регулирует в зависимости от времени ставку – это опять же помогает сэкономить бюджет. В целом, все нужное есть в Sellego, лишнего ничего нет, но самое главное  — это цена. В отличии от конкурентов она самая низкая!</div></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">Э</div></div><div class="item-info"><div class="item-title" data-review-title="">Эльвира</div><div class="item-date" data-review-date="">16 мая 2025 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>Прикольный у вас сервис.  А так все очень даже понятно у вас. Трекинг ваш изумителен. </p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Андреенкова Оксана</div><div class="item-description" data-review-description="">Компания Cosmopet</div><div class="item-date" data-review-date="">12 мая 2025 в 14:00</div></div></div><div class="item-text" data-review-text=""><p>Провела тест биддера и хотела написать вам отзыв. Ранее пользовалась несколькими сервисами, но после знакомства с Sellego я, конечно, определенно остановлюсь тут)) Очень удобный сервис, провели созвон по обучению работы с сервисом. Все доступно и понятно 👍 А главное, цена очень приятная. Все РК под контролем👍👍</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">О</div></div><div class="item-info"><div class="item-title" data-review-title="">Олеся Серебрякова</div><div class="item-date" data-review-date="">17 апреля 2025 в 11:00</div></div></div><div class="item-text" data-review-text=""><p>Нашей команде нравится ваш сервис. Позиции проверяем каждый день. Очень удобно, быстро. Всегда работаю с этим плагином. По интерфейсу обновление понравилось, нареканий нет..</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">Д</div></div><div class="item-info"><div class="item-title" data-review-title="">Дарья</div><div class="item-description" data-review-description="">Владелец бренда Tingress</div><div class="item-date" data-review-date="">15 апреля 2025 в 14:00</div></div></div><div class="item-text" data-review-text=""><p>Мне все очень нравится) Пользуемся уже точно больше полугода, всем довольны. Очень удобно вести рекламу, гибкие настройки) Хорошие тарифы и формы оплаты.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">И</div></div><div class="item-info"><div class="item-title" data-review-title="">Ирина</div><div class="item-date" data-review-date="">10 апреля 2025 в 10:00</div></div></div><div class="item-text" data-review-text=""><p>Очень удобный сервис, пользуемся каждый день для трекинга органики, нам это важно - у нас сезонный товар. Удобно, что обновляется быстро и можно выгрузить в таблицу. Мечтаем по Апи подтянуть данные в нашу цифровую аналитику, сервис позволяет. Еще хочу отметить ТП, оперативная и четкая, а закрывающие документы присылают по ЭДО, бухгалтер тоже счастлив. Работаем, рекомендуем.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">К</div></div><div class="item-info"><div class="item-title" data-review-title="">Карабут Альберт Олегович</div><div class="item-description" data-review-description="">ИП</div><div class="item-date" data-review-date="">8 апреля 2025 в 11:00</div></div></div><div class="item-text" data-review-text=""><p>Боги интерфейса! Могете! ))) Подключил управление РК, как всегда самый удобный и понятный интерфейс. Команде привет!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/df788bd74f36ba6bea03ae123a9e62f0.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Ильяс Ярмухамет</div><div class="item-description" data-review-description="">основатель ULBERG</div><div class="item-date" data-review-date="">31 марта 2025 в 11:00</div></div></div><div class="item-text" data-review-text=""><p>Нашел биддер Sellego в списке проверенных сервисов на портале продавца. Буквально перебрал все представленные там и остановился на данном биддере. Работаю уже второй месяц и не могу нарадоваться! Все просто: у Sellego сильный функционал, все работает как швейцарские часики и, на мой вкус, самый лаконичный и интуитивно понятный дизайн. Затупы АПИ со стороны ВБ никуда не деть, поэтому к этому моменту отношусь с пониманием. Сегодня заметил, что изменилась концепция фронт-энда - по-моему стало ещё лучше! Видно, что поддержка слышит пользователей и учитывает их пожелания. Рекомендасьон!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/c76dc3ca18a2586b8e565d62babc8f18.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Татьяна Бабенко</div><div class="item-description" data-review-description="">Бренд «Менделейка»</div><div class="item-date" data-review-date="">25 марта 2025 в 13:00</div></div></div><div class="item-text" data-review-text=""><div>Очень привыкли к вашему функционалу, даже добавить нечего.  </div><div>Смотрим позиции по конкретным ключам, которые мы качаем в рекламе, и очень удобно что можно смотреть на другие ключи, где-то можно заметить рост в органике и тут же подцепить его в рекламе, не использовав дополнительные силы для раскачки ключа. Это прям супер.</div></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Антонина Я.</div><div class="item-description" data-review-description="">менеджер, Rotangtrade </div><div class="item-date" data-review-date="">13 марта 2025 в 14:00</div></div></div><div class="item-text" data-review-text=""><p>Меня лично все устраивает, разговаривали с менеджерами других компаний. Денег хотят очень много за свои услуги. Много лишнего у них, по крайней мере, нам не нужного. Новичкам вы просто необходимы, многие сливают просто бюджет в рекламу, не понимая сколько фактическая ставка… И что нужно делать… ваша компания все наглядно демонстрирует. С вашей помощью я довольно быстро разобралась и уже увеличили продажу и даже нам дали бронзовый кубок 😅. Вообще я вас нашла по посту в инете очень доходчиво все рассказывали… Многие не знают, что можно за такие деньги получить помощь реальную.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">И</div></div><div class="item-info"><div class="item-title" data-review-title="">Ирина</div><div class="item-date" data-review-date="">4 марта 2025 в 11:00</div></div></div><div class="item-text" data-review-text=""><div>Хотела изменить вам с *** (другим сервисом)</div><div>Но решила, у вас удобнее. И органика выгружается чистая. Нам нужны замеры органических позиций и их выгрузка. Многие сервисы аналитики показывают органику, но с рекламным бустом. Или показывают, но выгрузка всё равно с рекламой. Здесь мы нашли нужную статистику. Всё очень удобно. Быстрая техподдержка, решают все вопросы. Был запрос на доработку - решили вопрос в итоге. Всем рекомендую сервис Sellegо!</div></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Алексей Коротков</div><div class="item-description" data-review-description="">Бренд MKMT</div><div class="item-date" data-review-date="">30 января 2025 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>В целом, у вас очень удобный сервис, и при этом максимально простой. То есть, ничего лишнего, все только по теме. Есть все, смотреть позиции очень удобно, в день по 10 раз смотрю, ключи подбирать также очень удобно. Нигде не афишируетесь, при этом у вас все на высшем уровне)</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">В</div></div><div class="item-info"><div class="item-title" data-review-title="">Виктор</div><div class="item-description" data-review-description="">Ип Иост ВА</div><div class="item-date" data-review-date="">16 января 2025 в 11:18</div></div></div><div class="item-text" data-review-text=""><p>На самом деле все вообще прекрасно, меня полностью устраивает трекинг, вот решил потестить рекламный инструмент, но мне в нем нужно только автопополнение) Отслеживание позиций - все четко.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">И</div></div><div class="item-info"><div class="item-title" data-review-title="">Игорь</div><div class="item-date" data-review-date="">20 ноября 2024 в 13:00</div></div></div><div class="item-text" data-review-text=""><p>Это самый топовый сервис по поиску позиции в рекламе, всегда актуально, обновляется быстрее всех сервисов, а следовательно и ставку быстрее выставляет +автопополнение отлично работает.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">П</div></div><div class="item-info"><div class="item-title" data-review-title="">Панаева Ирина</div><div class="item-description" data-review-description="">Менеджер ВБ Компания ООО "Алдерсон"</div><div class="item-date" data-review-date="">14 ноября 2024 в 11:00</div></div></div><div class="item-text" data-review-text=""><p>Очень приятно, что Вы так качественно обрабатываете запрос и лояльны к своим клиентам. На этапе запуска карточек нам было важно контролировать позиции по каждому ключу и при проведении изменений контролировать их количество, благодаря сервису Sellego мы подтянули важные ключи, а так же смогли проанализировать наших прямых конкурентов. Это было важно на начальном этапе и помогло нам в развитии карточек. Спасибо за классный рабочий инструмент!</p><p><br></p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">О</div></div><div class="item-info"><div class="item-title" data-review-title="">Оксана</div><div class="item-date" data-review-date="">25 октября 2024 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>Нам безумно нравится в Sellego то, что мы можем создавать свои списки ключей, благодаря чему можем оценить эффективность РК и более пристально за ней следить. Также очень удобно реализовано разделение внутри самой пробивки позиций: видно где БУСТ, а где ПОИСК.*/}
                {/*            Также дико удобна возможность записывать заметки, чтобы не забыть о ключевых изменениях, после которых могут начаться сильные движения ключей и трафика.*/}
                {/*            Спасибо за кнопку «пробить позиции» — ее сильно не хватало.</p><p><br></p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Алёна</div><div class="item-date" data-review-date="">21 октября 2024 в 12:16</div></div></div><div class="item-text" data-review-text=""><p>Ваш сервис оказался для меня гораздо удобнее конкурентов. Использую только для контроля отслеживания позиций, все вполне наглядно, визуально удобно.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">Е</div></div><div class="item-info"><div class="item-title" data-review-title="">Елизавета Мухаметова</div><div class="item-date" data-review-date="">23 сентября 2024 в 12:00</div></div></div><div class="item-text" data-review-text=""><p>Ваш сервис порекомендовали на курсах по ВБ, которые я проходила. Решила пользоваться биддером. Мне все нравится. И нравится то, что есть бесплатные функции. Плюс служба поддержки всегда быстро и по делу отвечает. Так-то я Ваш довольный клиент.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Акпаров Данияр</div><div class="item-description" data-review-description="">Частный предприниматель</div><div class="item-date" data-review-date="">17 сентября 2024 в 17:00</div></div></div><div class="item-text" data-review-text=""><p>Очень крутой продукт, я использую для выявления ключевых фраз и их позиции. Отдельно показывает позиции авторекламы и органику. В отличие от конкурентов очень дёшево и выгодно. Избавляет от ручной работы. Всем рекомендую!!!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">В</div></div><div class="item-info"><div class="item-title" data-review-title="">Василий</div><div class="item-date" data-review-date="">28 августа 2024 в 12:50</div></div></div><div class="item-text" data-review-text=""><p>На самом деле нравится всё. Всё необходимое для управления рекламы есть! Буду пользоваться в дальнейшем. Цена просто сказка по сравнению с другими автобиддерами.  <br>Спасибо)</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">Н</div></div><div class="item-info"><div class="item-title" data-review-title="">Ника Лу</div><div class="item-description" data-review-description="">Cамозанятый СЕО-аналитик</div><div class="item-date" data-review-date="">16 августа 2024 в 18:30</div></div></div><div class="item-text" data-review-text=""><p>Я пользуюсь Sellego «Трекинг ключей около года и очень довольна. Что мне дает эта программа аналитики? Четкую визуализацию того, что мне нужно — запросы, частоту, количество товаров по ним и позиции. Это возможно посмотреть с любой сортировкой — очень удобно. SERP очень удобно встроен визуально именно там, где нужно, когда анализируешь запросы с экрана. Очень хорошо видна динамика на графике и дашборд по продвижению в ТОПы. Очень важно, что видно количество ожидаемых просмотров в зависимости от позиции. Ценно, что есть такие метрики, как сложность запроса и видимость по позиции — это очень помогает при планировании и анализе продвижения карточки. </p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/c937551a9fb5936926af066d852e32d3.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Ольга Богданова</div><div class="item-description" data-review-description="">Руководитель юнита маркетплейсов Маркетинговая группа Комплето</div><div class="item-date" data-review-date="">30 июля 2024 в 10:00</div></div></div><div class="item-text" data-review-text=""><p>Сервисом Sellego пользуюсь уже больше года. Приятно наблюдать, как развивается функционал и разработчики реагируют на изменения на Вб. Пользуюсь разделом отслеживание позиций. Понятный интрефейс, автоматически подтягиваются ключи (раньше надо было вручную добавлять ключи для отслеживания), показывает позицию с бустом и органику. Удобная система фильтрации и сортировки списков ключей, частотности и позиций. Доступные тарифы для селлера любого уровня. Мне очень удобно пользоваться сервисом!*/}
                {/*        </p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">G</div></div><div class="item-info"><div class="item-title" data-review-title="">Geneva</div><div class="item-date" data-review-date="">2 июля 2023 в 17:41</div></div></div><div class="item-text" data-review-text="">У меня чувство, что за вашим сервисом будущее, продукты супер, цены не дерете, прям топ👍</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/44c9d3999bb0cb22e15d648648932602.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Анна</div><div class="item-date" data-review-date="">26 июня 2023 в 15:11</div></div></div><div class="item-text" data-review-text="">Супер классный, понятный и полезный инструмент. БлагоДарю! 🤗 ❤️ Пусть ваша деятельность приносит Вам удовольствие и желаемую прибыль! 💰</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/6a5230f966ad93037d0696c72812e6a6.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Надежда</div><div class="item-date" data-review-date="">3 апреля 2023 в 09:26</div></div></div><div class="item-text" data-review-text="">Уважаемые создатели, спасибо вам 👏 👏 👏 👏 👏, очень удобный сервис))</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/d7e8821ba7fe0ee6567623e3e87bd267.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Кузнецова Ольга</div><div class="item-date" data-review-date="">19 марта 2023 в 13:22</div></div></div><div class="item-text" data-review-text="">Присоединяюсь к положительным отзывам ,спасибо Вам ,ребята , за Вашу работу,успехов во всем*/}

                {/*            🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/31f8ae7ceb055648bb0594113bf0b0cf.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Сусанна</div><div class="item-date" data-review-date="">16 февраля 2023 в 12:26</div></div></div><div class="item-text" data-review-text="">Ребята,рекламист просто 💥💥  экономия такая просто слов нет</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">Д</div></div><div class="item-info"><div class="item-title" data-review-title="">Дима</div><div class="item-date" data-review-date="">10 ноября 2022 в 15:13</div></div></div><div class="item-text" data-review-text=""><p>Бесплатный ключемер показывающий ключи, частотность, позиции и просмотры вообще конечно классная штука 🔥</p><p>1) Прошерстил всех топ конкурентов по разным городам</p><p>2) Собрал Excel табличку ключей которых у меня в карточке не хватало</p><p>3) Добавил в название, в характеристики, а все остальные что не влезли никуда - в описание</p><p>4) Как ребята советовали тут, сделал еще несколько самовыкупов по ключам и получил результат уже через 4 дня</p><p>Конечно еще не в топ 20 вылез, но уже на второй страничке отображаюсь.. Классная штука, слов нет) Спасибо админам!</p><p>Следующим этапом хотелось бы с рекламой еще разобраться… все руки не доходят)</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/3d66d08070b9526a61e357f11ad4b53f.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Евгения Варламова</div><div class="item-date" data-review-date="">9 сентября 2022 в 13:46</div></div></div><div class="item-text" data-review-text="">Без лести. Я случайно на ваш аккаунт набрела. Даже и не знала, что такое возможно. Как слепой котёнок тыкалась.*/}
                {/*            Все просто и понятно. То, что я хотела сделать почти 8 месяцев - получилось сделать за один день.*/}
                {/*            А с ключами вообще супер!*/}
                {/*            Вы молодцы! Успехов вам и развития!</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/4cf0e74693ff5f997767a140aec6784d.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Алина Дмитриевна</div><div class="item-date" data-review-date="">17 августа 2022 в 09:40</div></div></div><div class="item-text" data-review-text=""><p>Спасибо большое за рекламиста и за курс 🙂🙂🙂</p><p>Проверила, все работает, карточка появилась там, где надо</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/df959245210d4140026612e47c3a380a.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Olga</div><div class="item-date" data-review-date="">16 августа 2022 в 11:39</div></div></div><div class="item-text" data-review-text=""><p>Добрый день! Сегодня переименовала карточки за 5 минут. Спасибо за отличный сервис!!!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">А</div></div><div class="item-info"><div class="item-title" data-review-title="">Алла</div><div class="item-date" data-review-date="">4 августа 2022 в 11:47</div></div></div><div class="item-text" data-review-text=""><p>Все прекрасно меняется. А еще огромное спасибо за рекламиста! Спасибо ребята за ваш труд</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/ed948e96cdbbec1341dcf55b9fc8d981.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Марина</div><div class="item-date" data-review-date="">3 августа 2022 в 10:13</div></div></div><div class="item-text" data-review-text=""><p>Сегодня зарегистрировалась, переименовала, через некоторое время на сайте уже было новое название. Спасибо большое вам за такую помощь.</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/bfb84fd7cf6de11de43648edd71cbce5.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Evgeniya</div><div class="item-date" data-review-date="">1 августа 2022 в 10:43</div></div></div><div class="item-text" data-review-text=""><p>Ребята-вы супер! Курс по WB рекламе отличный, все понятно разложено по полочкам! Будем пробовать! Спасибо вам за вашу работу!</p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/bbb0398f1e8e80558f22e1227cdb176a.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Екатерина</div><div class="item-date" data-review-date="">21 мая 2022 в 03:00</div></div></div><div class="item-text" data-review-text=""><p>Сервис супер удобный*/}
                {/*        </p>*/}
                {/*            <p>Однозначно рекомендую, молниеносно меняет название 🥰*/}
                {/*            </p>*/}
                {/*            <p>Ребята, вы лучшие*/}
                {/*            </p>*/}
                {/*            <p>Процветания и роста вам*/}
                {/*            </p></div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">V</div></div><div class="item-info"><div class="item-title" data-review-title="">Viktor Zhyltsou</div><div class="item-date" data-review-date="">11 мая 2022 в 15:56</div></div></div><div class="item-text" data-review-text="">Присоединяюсь к предыдущему посту большое вам спасибо пользуюсь практически ежедневно</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><div class="item-image" width="44" height="44" style="background-color: #9b9bf8;" data-review-image-placeholder=""><div class="text is-lg is-strong">A</div></div><div class="item-info"><div class="item-title" data-review-title="">Anna Serenity</div><div class="item-date" data-review-date="">14 апреля 2022 в 08:44</div></div></div><div class="item-text" data-review-text="">Пользуюсь вашим сервисом уже несколько месяцев, очень удобно и быстро, вы большие молодцы! А ещё завидую вашему терпению😂</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/4ed3d16a3768874e1001562153f8498b.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Juli* Zem</div><div class="item-date" data-review-date="">13 апреля 2022 в 17:48</div></div></div><div class="item-text" data-review-text="">Ребята... спасибо от всей души за рекламиста!) Месяц назад впервые создав карточку товара даже не думала, что попасть на первое место так просто) 🥳 хотя бы ненадолго, но всё равно класс))</div></div></div><div class="swiper-slide"><div class="review-item is-fixed" data-review=""><div class="item-header"><img class="item-image" src="/uploads/customer_feedback/d2ee592b59838d92955bfa8b439cb120.jpg" width="44" height="44" alt="" loading="lazy" data-review-image=""><div class="item-info"><div class="item-title" data-review-title="">Андрей Бетев</div><div class="item-date" data-review-date="">9 марта 2022 в 13:56</div></div></div><div class="item-text" data-review-text="">Всё работает, спасибо Sellego. Пользуюсь ключемером, сервис топ👆</div></div></div></div></div></div></div></section>*/}
                {/*    <section class="section-faq">*/}
                {/*        <div class="container-fluid">*/}
                {/*            <div class="section-container">*/}
                {/*                <div class="section-header">*/}
                {/*                    <h2>FAQ Sellego</h2>*/}
                {/*                </div>*/}

                {/*                <div class="faq-groups is-single" data-faq-groups>*/}
                {/*                    <div class="groups-nav">*/}
                {/*                        <div class="group-toggle is-active" data-faq-group-toggle="2">*/}
                {/*                            <div class="group-toggle-inner">*/}
                {/*                                <svg class="svg-icon active-icon is-16" width="16" height="16" viewBox="0 0 16 16"><use href="/static/images/icons/icons.svg?v=1756110266#circle"></use></svg>          <div class="group-title text is-lg">Общие</div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div class="groups-list" itemscope itemtype="https://schema.org/FAQPage">*/}
                {/*                        <div class="faq-group is-active" data-faq-group="2">*/}
                {/*                            <div class="group-toggle is-active" data-faq-group-toggle="2">*/}
                {/*                                <div class="group-toggle-inner">*/}
                {/*                                    <svg class="svg-icon active-icon is-16" width="16" height="16" viewBox="0 0 16 16"><use href="/static/images/icons/icons.svg?v=1756110266#circle"></use></svg>            <div class="group-title text is-lg">Общие          </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                            <div class="group-content">*/}
                {/*                                <div class="faq" data-faq>*/}
                {/*                                    <div class="faq-item" data-faq-item itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"  >*/}
                {/*                                        <div class="item-header" data-faq-toggle>*/}
                {/*                                            <h4 class="item-title" itemprop="name">Есть ли у Sellego бесплатный пробный период?</h4>*/}
                {/*                                            <svg class="svg-icon item-arrow is-36" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_36px"></use></svg>                </div>*/}
                {/*                                        <div class="item-content" data-faq-item-content  itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">*/}
                {/*                                            <div class="item-inner" itemprop="text">*/}
                {/*                                                <p>В линейке инструментов Sellego есть полностью бесплатные сервисы: «Проверка текущих позиций», «Поиск ключей», «Аналитика по ключу».*/}
                {/*                                                </p>*/}
                {/*                                                <p>Инструменты «Управление рекламой» и «Трекинг позиций» — платные. Однако для данных инструментов действует платный пробный период стоимостью 30 рублей за 3 дня.*/}
                {/*                                                </p>                  </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="faq-item" data-faq-item itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"  >*/}
                {/*                                        <div class="item-header" data-faq-toggle>*/}
                {/*                                            <h4 class="item-title" itemprop="name">Безопасно ли использование сервиса Sellego?</h4>*/}
                {/*                                            <svg class="svg-icon item-arrow is-36" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_36px"></use></svg>                </div>*/}
                {/*                                        <div class="item-content" data-faq-item-content  itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">*/}
                {/*                                            <div class="item-inner" itemprop="text">*/}
                {/*                                                Наши сервисы полностью безопасны, потому что мы не используем «серые» способы подключения к кабинетам селлера.                  </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="faq-item" data-faq-item itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"  >*/}
                {/*                                        <div class="item-header" data-faq-toggle>*/}
                {/*                                            <h4 class="item-title" itemprop="name">Где можно узнать стоимость подписки на инструменты Sellego?</h4>*/}
                {/*                                            <svg class="svg-icon item-arrow is-36" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_36px"></use></svg>                </div>*/}
                {/*                                        <div class="item-content" data-faq-item-content  itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">*/}
                {/*                                            <div class="item-inner" itemprop="text">*/}
                {/*                                                С тарифами Sellego можно ознакомиться <a href="https://sellego.com/#prices">в разделе «Тарифы»</a>.                  </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="faq-item" data-faq-item itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"  >*/}
                {/*                                        <div class="item-header" data-faq-toggle>*/}
                {/*                                            <h4 class="item-title" itemprop="name">Как отменить подписку на инструменты Sellego?</h4>*/}
                {/*                                            <svg class="svg-icon item-arrow is-36" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_36px"></use></svg>                </div>*/}
                {/*                                        <div class="item-content" data-faq-item-content  itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">*/}
                {/*                                            <div class="item-inner" itemprop="text">*/}
                {/*                                                Подписку на текущий тариф можно отменить на странице настроек профиля в личном кабинете (<a href="https://sellego.com/cabinet/profile/index/">https://sellego.com/cabinet/profile/index/</a>).                  </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                    <div class="faq-item" data-faq-item itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"  >*/}
                {/*                                        <div class="item-header" data-faq-toggle>*/}
                {/*                                            <h4 class="item-title" itemprop="name">Как можно изменить текущую подписку на инструменты Sellego?</h4>*/}
                {/*                                            <svg class="svg-icon item-arrow is-36" width="36" height="36" viewBox="0 0 36 36"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_down_36px"></use></svg>                </div>*/}
                {/*                                        <div class="item-content" data-faq-item-content  itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">*/}
                {/*                                            <div class="item-inner" itemprop="text">*/}
                {/*                                                Переоформить подписку можно на странице <a href="https://sellego.com/cabinet/payment/index/">Тарифы</a>. Для этого выберите общее количество карточек, которое Вы хотите использовать и затем оформите подписку на нужное количество. Система автоматически пересчитает дни с учетом того, что Вы уже оплатили.                  </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>    </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*    <div class="custom-modal subscription-promo-modal-2 is-large" data-custom-modal="subscription-promo-modal-2" tabindex="-1">*/}
                {/*        <div class="modal-backface"></div>*/}
                {/*        <div class="modal-container">*/}
                {/*            <div class="modal-header">*/}
                {/*                <div class="modal-title">Безлимитная проверка позиций</div>*/}
                {/*                <button type="button" class="btn-v2 is-small is-fab" data-modal-action="close"><div class="btn-inner"><svg class="svg-icon btn-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use></svg></div></button>      <img src="/static/images/cabinet/modal/tracking-promo-v1.png" width="720" height="320" loading="lazy"/>*/}
                {/*            </div>*/}
                {/*            <div class="modal-body">*/}
                {/*                <div class="modal-block">*/}
                {/*                    <p class="main-text">*/}
                {/*                        Безлимитные проверки позиций входят в платный инструмент Трекер позиций. Добавьте ваши товары на*/}
                {/*                        трекинг и мы будем снимать позиции по всем ключам автоматически.*/}
                {/*                    </p>*/}
                {/*                    <p class="main-text is-bold">Подключите Трекинг позиций и вы получите:</p>*/}
                {/*                </div>*/}
                {/*                <div class="modal-items-list">*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Безлимитные быстрые проверки</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Глубина анализа выдачи 12 страниц</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Ежедневные позиции по всем ключам</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Упущенные ключи на базе конкурентов</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Позиции товара по Рекламе</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Трекинг по 9 локациям</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Динамика просмотров товара</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Экспорт CSV, Excel</div>*/}
                {/*                    </div>*/}
                {/*                    <div class="list-item">*/}
                {/*                        <svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use></svg>          <div class="modal-text modal-text item-text is-small">Безлимитный SERP</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <a class="btn-v2 is-large is-primary" href="/cabinet/payment/index/?checked=tracking" rel="nofollow" target="_blank"><div class="btn-inner"><div class="btn-text">Попробовать за 30 ₽</div></div></a>    </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</main>*/}

                {/********** footer  *************     */}
                {/*<footer class="footer">*/}
                {/*    <div class="container-fluid">*/}
                {/*        <div class="footer-container">*/}
                {/*            <a class="footer-logo" href="/">*/}
                {/*                <img class="logo-image" src="/static/images/logo/logo-dark.svg" width="160"  height="37" alt="logo" loading="lazy"/>*/}
                {/*            </a>*/}

                {/*            <a class="wb-partner-v3" href="https://seller.wildberries.ru/auth-services" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><img class="" src="/static/images/landing/wb-partner-v3.svg" width="50" height="24" alt="авторизованный сервис ВБ" loading="lazy"><div class="wb-partner-text"><div>Официальный авторизованный</div><div>сервис Wildberries</div></div><svg class="svg-icon wb-partner-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use></svg></a>*/}
                {/*            <p class="footer-text">*/}
                {/*                Все логотипы и товарные знаки Wildberries TM,<br>отображаемые в этом приложении, являются собственностью Wildberries.*/}
                {/*                <br>*/}
                {/*                    Поставщик услуг: ООО "Кузня Брендов", ИНН: 2130222840<br>*/}
                {/*                    Адрес: 428027, Чувашская Республика, г Чебоксары, пр-кт И.Я.Яковлева, зд. 8д, офис 34*/}
                {/*            </p>*/}
                {/*            <div class="footer-menu">*/}
                {/*                <a class="menu-item" href="/o-kompanii/"><span class="item-text">О компании</span></a>*/}
                {/*                <a class="menu-item" href="/contacts/"><span class="item-text">Контакты</span></a>*/}
                {/*                <a class="menu-item" href="https://wiki.sellego.com/" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><span class="item-text">База знаний</span></a>        <a class="menu-item" href="/blog/"><span class="item-text">Блог</span></a>*/}
                {/*                <a class="menu-item" href="/press/"><span class="item-text">СМИ о нас</span></a>*/}
                {/*                <a class="menu-item" href="/support/"><span class="item-text">Поддержка</span></a>*/}
                {/*            </div>*/}
                {/*            <div class="footer-support">*/}
                {/*                <a class="btn-v2 is-secondary" href="https://t.me/sellego_bot" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><div class="btn-inner"><svg class="svg-icon btn-icon btn-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#headphones_24px"></use></svg><div class="btn-text">Чат с поддержкой</div></div></a>        <div class="menu-associated">*/}
                {/*                <a class="menu-item is-vk" href="https://vk.com/sellegocom" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vk_24px"></use></svg></a>          <a class="menu-item is-youtube" href="https://www.youtube.com/channel/UCllI5jDJ6O-YnzkKJcGtxKg" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#youtube_24px"></use></svg></a>          <a class="menu-item is-telegram" href="https://t.me/sellego_com" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#telegram_24px_filled"></use></svg></a>          <a class="menu-item is-dzen" href="https://dzen.ru/sellego" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon " width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#dzen_24px"></use></svg></a>          <a class="menu-item is-vc" href="https://vc.ru/u/1286196-sellego-for-wildberries" rel="nofollow noopener noreferrer" target="_blank" data-pjax="0"><svg class="svg-icon item-icon" width="24" height="24" viewBox="0 0 24 24"><use href="/static/images/icons/icons.svg?v=1756110266#vc_24px"></use></svg></a>        </div>*/}
                {/*            </div>*/}
                {/*            <div class="footer-privacy">*/}
                {/*                <div class="copyright-text">Copyright © 2025</div>*/}
                {/*                <div class="privacy-menu">*/}
                {/*                    <a class="menu-item" href="/terms-of-service/">Пользовательское соглашение</a>*/}
                {/*                    <a class="menu-item" href="/privacy-policy/">Политика конфиденциальности</a>*/}
                {/*                    <a class="menu-item" href="/refund-and-cancellation-policy/">Оплата и возврат</a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</footer>*/}


            </div>

        </div>


    )
};

export default Test;
