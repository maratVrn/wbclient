import React, {useContext, useRef, useState} from 'react';
import './page.css';
import './css/form.css';
import './css/wbsale.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import logoSvg from "./logo-dark.svg";
import downSvg from "./images/down.svg";
import Footer from "./footer";
import Header from "./Header";


const MainPage = () => {
    return (
        <div className="app">

            {/*<Header/>*/}

            {/*<div className="main">*/}

            {/*    <section className="section-1">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}
            {/*                <div className="section-content">*/}
            {/*                    <h1>Аналитика и управление продажами на WB</h1>*/}
            {/*                    <p className="section-text">Удобные инструменты для аналитики товаров, сравнение с*/}
            {/*                        конкурентами, а*/}
            {/*                        также управления поставками и рекламой на Вайлдберриз</p>*/}
            {/*                    <div className="section-footer">*/}
            {/*                        <a className="btn-v2  is-md-regular is-primary" href="/signup/">*/}
            {/*                            <div className="btn-inner">*/}
            {/*                                <div className="btn-text">Попробовать сейчас</div>*/}
            {/*                            </div>*/}
            {/*                        </a>*/}


            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="image-container">*/}
            {/*                    <img className="section-image is-desktop" src={require('./images/image-1.png')}*/}
            {/*                         width="508" height="852" alt="seo для wb"/>*/}
            {/*                    <img className="section-image is-not-desktop" src={require('./images/image-2.png')}*/}
            {/*                         width="992" height="200" alt="seo wb"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section className="section-2">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}
            {/*                <div className="section-content">*/}
            {/*                    <h2>Зачем нужен Sellego?</h2>*/}
            {/*                    <p className="section-text">Главный результат работы сервиса аналитики Вайлдберриз —*/}
            {/*                        многократный рост продаж и прибыли наших клиентов</p>*/}
            {/*                </div>*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section className="section-3">*/}
            {/*        <div className="container-fluid">*/}

            {/*            <div className="responsive-three-column-grid">*/}

            {/*                <div className="main_s3"><img className="card-image"*/}
            {/*                                              src={require('./images/image_1_3.png')}*/}
            {/*                                              width="264" height="86" loading="lazy" alt="Реклама"/>*/}
            {/*                    <h4 className="card-title">Реклама без слива бюджета</h4>*/}
            {/*                    <p className="card-text">*/}
            {/*                        Реклама часто ведет себя непредсказуемо. Сервис <a href="/upravlenie-reklamoj/">Управление*/}
            {/*                        рекламой</a> дает больший контроль, а Автобиддер обучается и занимает лучшие*/}
            {/*                        позиции*/}
            {/*                        по самым выгодным ценам*/}
            {/*                    </p>*/}
            {/*                    <a className="btn-v2 is-secondary" href="/upravlenie-reklamoj/">*/}
            {/*                        <div className="btn-inner">*/}
            {/*                            <div className="btn-text">Подробнее</div>*/}
            {/*                            <svg className="svg-icon btn-icon is-green3" width="24" height="24"*/}
            {/*                                 viewBox="0 0 24 24">*/}
            {/*                                <use*/}
            {/*                                    href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                    </a></div>*/}
            {/*                <div className="main_s3">*/}
            {/*                    <img className="card-image"*/}
            {/*                         src={require('./images/image_1_1.png')}*/}
            {/*                         width="264" height="86" loading="lazy"*/}
            {/*                         alt="рост позиций wb"/>*/}
            {/*                    <h4 className="card-title">Рост позиций в поиске WB</h4>*/}
            {/*                    <p className="card-text">Отслеживайте и улучшайте позиции по ключевым запросам в*/}
            {/*                        поиске*/}
            {/*                        Wildberries. Узнавайте, сколько просмотров карточки дает тот или иной ключ</p>*/}
            {/*                    <a className="btn-v2 is-secondary" href="/tracking/">*/}
            {/*                        <div className="btn-inner">*/}
            {/*                            <div className="btn-text">Подробнее</div>*/}
            {/*                            <svg className="svg-icon btn-icon is-green3" width="24" height="24"*/}
            {/*                                 viewBox="0 0 24 24">*/}
            {/*                                <use*/}
            {/*                                    href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                    </a></div>*/}
            {/*                <div className="main_s3"><img className="card-image"*/}
            {/*                                              src={require('./images/image_1_2.png')}*/}
            {/*                                              width="264" height="86" loading="lazy"*/}
            {/*                                              alt="поиск запросов"/>*/}
            {/*                    <h4 className="card-title">Контроль ключей в SEO карточек</h4>*/}
            {/*                    <p className="card-text">Правильно подобранные и вставленные в описание карточки*/}
            {/*                        ключи –*/}
            {/*                        фундамент как для органических продаж, так и для работы Рекламы с Бустером</p>*/}
            {/*                    <a className="btn-v2 is-secondary" href="/podbor-klyuchej-wb/">*/}
            {/*                        <div className="btn-inner">*/}
            {/*                            <div className="btn-text">Подобрать ключи</div>*/}
            {/*                            <svg className="svg-icon btn-icon is-green3" width="24" height="24"*/}
            {/*                                 viewBox="0 0 24 24">*/}
            {/*                                <use*/}
            {/*                                    href="/static/images/icons/icons.svg?v=1756110266#arrow_right_long_24px"></use>*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                    </a></div>*/}

            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </section>*/}

            {/*    <section class="section-services-grid">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}
            {/*                <div className="section-content">*/}
            {/*                    <div className="content-block">*/}
            {/*                        <div className="block-header">*/}
            {/*                            <h2>Управление рекламой</h2>*/}
            {/*                            <div className="badge is-success-accent is-filled">*/}
            {/*                                <div className="badge-inner">*/}
            {/*                                    <div className="badge-text">Официальное API</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <p className="block-text">Реклама на Wildberries работает по принципу аукциона. Для*/}
            {/*                            автоматических кампаний WB использует завышенные ставки и не использует*/}
            {/*                            алгоритмы для оптимизации в удержании выгодных позиций. Наш сервис*/}
            {/*                            показывает*/}
            {/*                            реальные ставки по рекламе в поиске, что приводит к снижению расходов.*/}
            {/*                            Инструмент полностью автоматизирует работу с Рекламой</p>*/}
            {/*                        <div className="block-footer">*/}
            {/*                            <a className="btn-v2 is-large is-lg-regular is-dark"*/}
            {/*                               href="/upravlenie-reklamoj/">*/}
            {/*                                <div className="btn-inner">*/}
            {/*                                    <div className="btn-text">Подробнее</div>*/}
            {/*                                </div>*/}
            {/*                            </a> <a className="btn-v2 is-large is-lg-regular is-secondary" href="#prices">*/}
            {/*                            <div className="btn-inner">*/}
            {/*                                <div className="btn-text">Рассчитать тариф</div>*/}
            {/*                            </div>*/}
            {/*                        </a></div>*/}
            {/*                    </div>*/}
            {/*                    <img className="content-image" src={require('./images/image-5.png')} width="562"*/}
            {/*                         height="318" loading="lazy" alt="Рассчитать тариф"/>*/}
            {/*                </div>*/}
            {/*                <div className="section-aside" style={{paddingTop: '30px'}}>*/}
            {/*                    <div className="aside-block is-keywords is-double">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Управление ключами</h4>*/}
            {/*                            <p className="block-text">Автоминусация фраз и работа только по «белому списку»*/}
            {/*                                ключей. Управление ключами и кластерами на полном и очень эффективном*/}
            {/*                                автопилоте.</p>*/}
            {/*                        </div>*/}
            {/*                        <img className="block-image" src={require('./images/image-7.png')} width="157"*/}
            {/*                             height="99" loading="lazy" alt="Управление ключами"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-count-control">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Контроль остатков</h4>*/}
            {/*                            <p className="block-text">Остатки товаров по кампаниям всегда под контролем</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-saving">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Экономия бюджета</h4>*/}
            {/*                            <p className="block-text"><span className="is-pink1">До 70%</span> экономии при*/}
            {/*                                работе*/}
            {/*                                по реальным ставкам</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-algorithm is-double">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Управление ставкой CPM</h4>*/}
            {/*                            <p className="block-text">Используйте одну из 5 стратегий автобиддера для*/}
            {/*                                управления*/}
            {/*                                CPM, чтобы занять самые лучшие позиции по нужным ключам с минимально*/}
            {/*                                возможными затратами.</p>*/}
            {/*                        </div>*/}
            {/*                        <img className="block-image" src={require('./images/image-8.png')} width="150"*/}
            {/*                             height="105" loading="lazy" alt="Управление ставкой CPM"/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="section-end" style={{paddingTop: '20px'}}>*/}
            {/*                    <div className="aside-block is-advanced-analytics is-light">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Продвинутая аналитика</h4>*/}
            {/*                            <p className="block-text">Удобная оценка показателей работы всех запущенных*/}
            {/*                                кампаний. Так и полная статистика по каждому ключу и подробный лог*/}
            {/*                                действий*/}
            {/*                                автобиддера.</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-light">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Авто-пополнение</h4>*/}
            {/*                            <p className="block-text">Сервис пополнит кампании автоматически</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-bidder">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title">Контроль остатков</h4>*/}
            {/*                        </div>*/}
            {/*                        <img className="block-image" src={require('./images/image-6.png')} width="184"*/}
            {/*                             height="144" loading="lazy" alt="Контроль остатков"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="aside-block is-telegram">*/}
            {/*                        <div className="block-body">*/}
            {/*                            <h4 class="block-title"><span>Уведомления в</span>*/}
            {/*                                <svg className="svg-icon is-telegram" width="24" height="24"*/}
            {/*                                     viewBox="0 0 24 24">*/}
            {/*                                    <use*/}
            {/*                                        href="/static/images/icons/icons.svg#telegram_24px_filled"></use>*/}
            {/*                                </svg>*/}
            {/*                                <span>Telegram</span>*/}
            {/*                            </h4>*/}
            {/*                            <p className="block-text">Не пропустите важные изменения в своих кампаниях</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section class="section-blog is-news">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}
            {/*                <div className="section-content">*/}
            {/*                    <h2>Новости и обновления</h2>*/}
            {/*                    <p className="section-text">Рассказываем что добавили или изменили в сервисе</p>*/}
            {/*                </div>*/}
            {/*                <div className="blog-articles swiper">*/}
            {/*                    <div className="swiper-wrapper">*/}

            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/rabota-s-ostatkami-novaya-opciya-v-reklamnyh-kampaniyah/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/b28d4c41ee4e175805c12971e2f1ad66.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Работа с остатками — новая опция в рекламных кампаниях"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Работа с остатками — новая опция в рекламных*/}
            {/*                                    кампаниях*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Автостоп и автозапуск рекламных кампаний по*/}
            {/*                                    рекламным остаткам в Sellego*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 2 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/import-nastroek-reklamnyh-kampaniy-pod-upravleniem-sellego/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/ac992d211d19b9c2df1fcb276d376396.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Импорт настроек рекламных кампаний под управлением Sellego"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Импорт настроек рекламных кампаний под*/}
            {/*                                    управлением Sellego*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Добавили функцию автопереноса настроек*/}
            {/*                                    успешной РК*/}
            {/*                                    в одну или несколько кампаний под управлением Sellego*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 1 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/novyy-instrument-sellego-dlya-poiska-pribylnyh-fraz/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/1b62fe7aef36df65f298c11b28dafa86.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Новый инструмент Sellego: находите прибыльные фразы, а не просто популярные"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Новый инструмент Sellego: находите прибыльные*/}
            {/*                                    фразы, а не просто популярные*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Подтягиваем данные из Джем, чтобы вы находили*/}
            {/*                                    больше рекламных ключей, которые точно продают*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 1 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/uluchshili-yuzabiliti-instrumentov-modulya-upravlenie-reklamoy/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/221f92a24b4d8430560b9de0b5126ff4.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Улучшили юзабилити инструментов модуля Управление рекламой"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Улучшили юзабилити инструментов модуля*/}
            {/*                                    Управление*/}
            {/*                                    рекламой*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Добавили новые функции в модуль Управление*/}
            {/*                                    рекламой для удобной работы с кластерами и историей фраз*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 2 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/obnovili-filtry-po-frazam-v-biddere-sellego/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/d7f028a519f80403dd971ea2990f6151.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Обновили систему пополнения баланса и фильтры по фразам в биддере Sellego"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Обновили систему пополнения баланса и фильтры*/}
            {/*                                    по*/}
            {/*                                    фразам в биддере Sellego*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">В биддере Sellego обновлены фильтры по фразам*/}
            {/*                                    и*/}
            {/*                                    система пополнения баланса*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 2 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news/dobavili-v-bidder-rasshirennuyu-analitiku-iz-dzhema/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/3a75e6a9c2a12b35c99cf16fe131567f.jpg"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Добавили в биддер расширенную аналитику из Джема"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Добавили в биддер расширенную аналитику из*/}
            {/*                                    Джема*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Данные по фразам из Джема теперь можно*/}
            {/*                                    смотреть во*/}
            {/*                                    вкладке «Ключи и кластеры» биддера Sellego*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости Sellego</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 2 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="section-footer">*/}
            {/*                    <a className="btn-v2 is-secondary" href="/blog/news/">*/}
            {/*                        <div className="btn-inner">*/}
            {/*                            <div className="btn-text">Другие новости Sellego</div>*/}
            {/*                            <svg className="svg-icon btn-icon" width="24" height="24" viewBox="0 0 24 24">*/}
            {/*                                <use*/}
            {/*                                    href="/static/images/icons/icons.svg?v=1756110266#arrow_right_24px"></use>*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                    </a></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section class="section-blog">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}
            {/*                <div className="section-content">*/}
            {/*                    <h2>Делаете первые шаги на WB?</h2>*/}
            {/*                    <p className="section-text">*/}
            {/*                        Читайте экспертные материалы в нашем блоге и смотрите полезные обучающие видео*/}
            {/*                        для*/}
            {/*                        получения кратного*/}
            {/*                        преимущества перед вашими конкурентами на маркетплейсе Wildberries.*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*                <div className="blog-articles swiper">*/}
            {/*                    <div className="swiper-wrapper">*/}

            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/news-wb/vb-vvodit-gradaciyu-skidok-v-avtoakciyah/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/88721f7745799eb6a2b99cedc1fa7d45.png"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="ВБ вводит градацию скидок в Автоакциях: разбираем плюсы и минусы для селлеров"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">ВБ вводит градацию скидок в Автоакциях:*/}
            {/*                                    разбираем*/}
            {/*                                    плюсы и минусы для селлеров*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Появилось 4 уровня глубины скидки при участии*/}
            {/*                                    в*/}
            {/*                                    Автоакциях ВБ. Хорошо это или плохо для селлеров — разбираемся.*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Новости ВБ</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 2 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/stati/kak-snizit-cenu-klika-i-optimizirovat-drr-v-reklame-vb/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/fb8d044c7341b52cd16fb64bbb473338.jpg"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Как снизить цену клика и оптимизировать ДРР в рекламе ВБ?"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Как снизить цену клика и оптимизировать ДРР в*/}
            {/*                                    рекламе ВБ?*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Что учитывать при анализе рекламных кампаний*/}
            {/*                                    на*/}
            {/*                                    Вайлдберриз? Пошаговая инструкция для оптимизации рекламных расходов*/}
            {/*                                    на*/}
            {/*                                    WB с помощью связки Sellego и Джем.*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Статьи</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 9 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}
            {/*                        <div className="swiper-slide">*/}
            {/*                            <a className="related-article"*/}
            {/*                               href="/blog/kejsy-wb/kak-popast-v-rekomendatelnye-polki-vaildberriz/"*/}
            {/*                               target="_blank"><img className="article-image"*/}
            {/*                                                    src="/uploads/iblock_element/120ec7353a13259c528b98e2e0d86708.jpg"*/}
            {/*                                                    width="152" height="85"*/}
            {/*                                                    alt="Как попасть в рекомендательные полки Вайлдберриз: рабочие стратегии и пошаговая инструкция"*/}
            {/*                                                    loading="lazy"/>*/}
            {/*                                <div className="article-title">Как попасть в рекомендательные полки*/}
            {/*                                    Вайлдберриз:*/}
            {/*                                    рабочие стратегии и пошаговая инструкция*/}
            {/*                                </div>*/}
            {/*                                <div className="article-text">Как попасть в рекомендательные полки на*/}
            {/*                                    Wildberries: разбор стратегий с примерами*/}
            {/*                                </div>*/}
            {/*                                <div className="labels">*/}
            {/*                                    <div className="label is-tag"><span>Кейсы ВБ</span></div>*/}
            {/*                                    <div className="label label-time">*/}
            {/*                                        <svg className="svg-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#watch_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                        <span>на 19 мин</span></div>*/}
            {/*                                </div>*/}
            {/*                            </a></div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section class="section-calculator" id="prices">*/}
            {/*        <div className="container-fluid">*/}
            {/*            <div className="section-container">*/}

            {/*                <div className="section-content">*/}
            {/*                    <div className="section-header">*/}
            {/*                        <h2 class="section-title">Тарифы</h2>*/}
            {/*                    </div>*/}
            {/*                    <div className="section-body">*/}
            {/*                        <p className="section-text">Любой тариф можно попробовать <b> бесплатно </b>в течение 5*/}
            {/*                            дней</p>*/}

            {/*                        <div className="btn-v2 is-accent" >*/}
            {/*                            <div className="btn-inner">*/}
            {/*                                <div className="btn-text">Получить бесплатный доступ</div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="custom-modal join-to-demo-modal is-large"*/}
            {/*                             data-custom-modal="join-to-demo-modal" data-autofocus tabindex="-1">*/}
            {/*                            <div className="modal-backface"></div>*/}
            {/*                            <div className="modal-container"><img className="modal-mesh"*/}
            {/*                                                                  src="/static/images/landing/modal/join-to-demo/mesh.png"*/}
            {/*                                                                  width="800" height="496" alt=""*/}
            {/*                                                                  loading="lazy"/>*/}
            {/*                                <svg className="svg-icon modal-close" width="24" height="24"*/}
            {/*                                     viewBox="0 0 24 24"*/}
            {/*                                     data-modal-action="close">*/}
            {/*                                    <use*/}
            {/*                                        href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use>*/}
            {/*                                </svg>*/}
            {/*                                <div className="modal-content">*/}
            {/*                                    <div className="modal-side is-promo">*/}
            {/*                                        <div className="typography-row gap-2xl">*/}
            {/*                                            <div className="typography-row gap-md">*/}
            {/*                                                <h4>Запись на персональную демонстрацию Sellego </h4>*/}
            {/*                                                <div className="typography-text is-md">Проведем краткий*/}
            {/*                                                    обзор*/}
            {/*                                                    системы и ответим на ваши вопросы*/}
            {/*                                                </div>*/}
            {/*                                            </div>*/}
            {/*                                        </div>*/}
            {/*                                        <img className="promo-asset"*/}
            {/*                                             src="/static/images/landing/modal/join-to-demo/asset-image-3.png"*/}
            {/*                                             width="172" height="135" alt="" loading="lazy"/>*/}
            {/*                                        <img className="promo-image"*/}
            {/*                                             src="/static/images/landing/modal/join-to-demo/reklamist-config.png"*/}
            {/*                                             width="300" height="189" alt="" loading="lazy"/></div>*/}
            {/*                                    <div className="modal-side is-form">*/}
            {/*                                        <form id="w2" class="typography-row gap-lg without-spinner"*/}
            {/*                                              action="/site/join-to-demo/" method="post"*/}
            {/*                                              data-form-modal="join-to-demo">*/}
            {/*                                            <input type="hidden" name="_csrf"*/}
            {/*                                                   value="hB1lCC8TwMT-Hm_Y1RcD2L5dfmBBq067NvnFFzBm4m_OeVxEYlCyj7JKGLWccE2y4RsPWHaeFvJhqKNaQlKHGw=="/>*/}
            {/*                                            <div className="typography-text text-size-xl text-weight-bold">*/}
            {/*                                                Как с вами связаться?*/}
            {/*                                            </div>*/}
            {/*                                            <div className="input field-jointodemoform-name required"*/}
            {/*                                                 data-input>*/}
            {/*                                                <div className="input-container" data-input-container>*/}
            {/*                                                    <div className="input-main">*/}

            {/*                                                        <input type="text" id="jointodemoform-name"*/}
            {/*                                                               class="input-element"*/}
            {/*                                                               name="JoinToDemoForm[name]"*/}
            {/*                                                               data-input-element placeholder="Ваше имя"*/}
            {/*                                                               aria-required="true"/>*/}
            {/*                                                    </div>*/}

            {/*                                                </div>*/}
            {/*                                                <div className="input-message is-error"><p*/}
            {/*                                                    className="message-text"></p></div>*/}
            {/*                                            </div>*/}
            {/*                                            <div className="input field-jointodemoform-email" data-input>*/}
            {/*                                                <div className="input-container" data-input-container>*/}
            {/*                                                    <div className="input-main">*/}

            {/*                                                        <input type="text" id="jointodemoform-email"*/}
            {/*                                                               class="input-element"*/}
            {/*                                                               name="JoinToDemoForm[email]"*/}
            {/*                                                               data-input-element placeholder="Email"/>*/}
            {/*                                                    </div>*/}

            {/*                                                </div>*/}
            {/*                                                <div className="input-message is-error"><p*/}
            {/*                                                    className="message-text"></p></div>*/}
            {/*                                            </div>*/}
            {/*                                            <div className="input field-jointodemoform-telegram" data-input>*/}
            {/*                                                <div className="input-container" data-input-container>*/}
            {/*                                                    <div className="input-main">*/}

            {/*                                                        <input type="text" id="jointodemoform-telegram"*/}
            {/*                                                               class="input-element"*/}
            {/*                                                               name="JoinToDemoForm[telegram]"*/}
            {/*                                                               data-input-element*/}
            {/*                                                               placeholder="Telegram"/>*/}
            {/*                                                    </div>*/}

            {/*                                                </div>*/}
            {/*                                                <div className="input-message is-error"><p*/}
            {/*                                                    className="message-text"></p></div>*/}
            {/*                                            </div>*/}

            {/*                                            <div className="input field-jointodemoform-termsagree required"*/}
            {/*                                                 data-input>*/}
            {/*                                                <label class='input-checkbox'><input type="hidden"*/}
            {/*                                                                                     name="JoinToDemoForm[termsAgree]"*/}
            {/*                                                                                     value="0"/><input*/}
            {/*                                                    type="checkbox" id="jointodemoform-termsagree"*/}
            {/*                                                    name="JoinToDemoForm[termsAgree]" value="1" hidden*/}
            {/*                                                    aria-required="true"/>*/}
            {/*                                                    <svg className="svg-icon checkbox-icon is-24" width="24"*/}
            {/*                                                         height="24" viewBox="0 0 24 24">*/}
            {/*                                                        <use*/}
            {/*                                                            href="/static/images/icons/icons.svg?v=1756110266#checkbox_24px"></use>*/}
            {/*                                                    </svg>*/}
            {/*                                                    <div className='checkbox-label'>*/}
            {/*                                                        <div className="typography text-size-2xs">Я даю*/}
            {/*                                                            согласие*/}
            {/*                                                            на обработку моей персональной информации на*/}
            {/*                                                            условиях, определенных<a*/}
            {/*                                                                href="/privacy-policy/"*/}
            {/*                                                                target="_blank"> Политикой*/}
            {/*                                                                конфиденциальности</a> и принимаю*/}
            {/*                                                            условия <a*/}
            {/*                                                                href="/terms-of-service/"*/}
            {/*                                                                target="_blank">Пользовательского*/}
            {/*                                                                соглашения</a></div>*/}
            {/*                                                    </div>*/}
            {/*                                                </label>*/}
            {/*                                                <div className="input-message is-error"><p*/}
            {/*                                                    className="message-text"></p></div>*/}
            {/*                                            </div>*/}
            {/*                                            <div*/}
            {/*                                                className="input recaptcha-container field-jointodemoform-recaptcha">*/}
            {/*                                                <input type="hidden" id="jointodemoform-recaptcha"*/}
            {/*                                                       class="input-element"*/}
            {/*                                                       name="JoinToDemoForm[reCaptcha]"*/}
            {/*                                                       data-input-element/>*/}
            {/*                                                <div className="input-message is-error"><p*/}
            {/*                                                    className="message-text"></p></div>*/}
            {/*                                            </div>*/}
            {/*                                            <button type="submit"*/}
            {/*                                                    class="btn-v2 is-disable-on-submit is-dark">*/}
            {/*                                                <div className="btn-inner">*/}
            {/*                                                    <div className="btn-text">Отправить</div>*/}
            {/*                                                </div>*/}
            {/*                                            </button>*/}
            {/*                                            <div className="typography text-size-sm">*/}
            {/*                                                С вами свяжется наш менеджер чтобы определить удобное*/}
            {/*                                                время*/}
            {/*                                                для онлайн-встречи*/}
            {/*                                            </div>*/}

            {/*                                        </form>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="custom-modal join-to-demo-success-modal is-large"*/}
            {/*                             data-custom-modal="join-to-demo-success-modal" data-autofocus*/}
            {/*                             tabindex="-1">*/}
            {/*                            <div className="modal-backface"></div>*/}
            {/*                            <div className="modal-container">*/}
            {/*                                <svg className="svg-icon modal-close" width="24" height="24"*/}
            {/*                                     viewBox="0 0 24 24"*/}
            {/*                                     data-modal-action="close">*/}
            {/*                                    <use*/}
            {/*                                        href="/static/images/icons/icons.svg?v=1756110266#cross_long_24px"></use>*/}
            {/*                                </svg>*/}
            {/*                                <div className="modal-content">*/}
            {/*                                    <img className=""*/}
            {/*                                         src="/static/images/landing/modal/join-to-demo/asset-image-4.png"*/}
            {/*                                         width="160" height="160" alt="" loading="lazy"/>*/}
            {/*                                    <div*/}
            {/*                                        className="typography-text text-size-xl text-align-center text-weight-bold">*/}
            {/*                                        Спасибо!*/}
            {/*                                    </div>*/}
            {/*                                    <div className="typography-text text-size-sm text-align-center">*/}
            {/*                                        В ближайшее время с вами свяжется наш менеджер чтобы определить*/}
            {/*                                        удобное время для онлайн-встречи*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}


            {/*                </div>*/}


            {/*                <div className="services-calculator-app">*/}
            {/*                    <div className="services-calculator">*/}
            {/*                        <div className="calculator-header">*/}
            {/*                            <div className="tab is-secondary is-large is-lg-regular is-active">*/}
            {/*                                <div className="tab-text"><span>1 месяц</span></div>*/}
            {/*                            </div>*/}
            {/*                            <div className="tab is-secondary is-large is-lg-regular ">*/}
            {/*                                <div className="tab-text"><span>3 месяца</span></div>*/}
            {/*                                <div className="counter">*/}
            {/*                                    <div className="counter-value">-10 %</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className="tab is-secondary is-large is-lg-regular ">*/}
            {/*                                <div className="tab-text"><span>6 месяцев</span></div>*/}
            {/*                                <div className="counter">*/}
            {/*                                    <div className="counter-value">-15 %</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className="tab is-secondary is-large is-lg-regular ">*/}
            {/*                                <div className="tab-text"><span>1 год</span></div>*/}
            {/*                                <div className="counter">*/}
            {/*                                    <div className="counter-value">-20 %</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="calculator-body ">*/}
            {/*                            <div className="service">*/}

            {/*                                <div className="service-header">*/}
            {/*                                    <svg className="svg-icon service-icon is-48" width="48" height="48"*/}
            {/*                                         viewBox="0 0 48 48">*/}
            {/*                                        <use*/}
            {/*                                            href="/static/images/icons/icons.svg?v=1756110266#keymeter_48px_bold"></use>*/}
            {/*                                    </svg>*/}
            {/*                                    <h3 class="service-title">Трекинг позиций</h3>*/}
            {/*                                    <p className="service-description">Установите лимит товаров для*/}
            {/*                                        отслеживания</p>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-counter">*/}
            {/*                                    <div className="range-min">10</div>*/}
            {/*                                    <div className="range-title">10 товаров</div>*/}
            {/*                                    <div className="range-max">300</div>*/}
            {/*                                    <input class="input-range" type="range" min="10" max="300" step="10"*/}
            {/*                                           value="10"/>*/}
            {/*                                </div>*/}
            {/*                                <div className="improved-select is-secondary-dark">*/}
            {/*                                    <div className="select-header">*/}
            {/*                                        <div className="select-value">*/}
            {/*                                            <div className="select-value-group"><span>1 месяц</span></div>*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon select-arrow" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-body">*/}
            {/*                                    <div className="service-price ">*/}
            {/*                                        <div className="price-value">970</div>*/}
            {/*                                        <div className="price-info">*/}
            {/*                                            <div className="price-period">₽/мес</div>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="btn-v2 is-large is-md-regular is-dark">*/}
            {/*                                        <div className="btn-inner">*/}
            {/*                                            <div className="btn-text"><span>Заказать</span></div>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-options">*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Ежедн. проверки по всем ключам</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Количество ключей</div>*/}
            {/*                                        <svg className="svg-icon" width="36" height="36"*/}
            {/*                                             viewBox="0 0 36 36">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Локации трекинга</div>*/}
            {/*                                        <div className="option-value">*/}
            {/*                                            9*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Глубина анализа выдачи, страниц</div>*/}
            {/*                                        <div className="option-value">*/}
            {/*                                            12*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Упущенные ключи на базе конкурентов*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Позиции Рекламы</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Безлимитный SERP</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className="service">*/}

            {/*                                <div className="service-header">*/}
            {/*                                    <svg className="svg-icon service-icon is-48" width="48" height="48"*/}
            {/*                                         viewBox="0 0 48 48">*/}
            {/*                                        <use*/}
            {/*                                            href="/static/images/icons/icons.svg?v=1756110266#advertiser_48px"></use>*/}
            {/*                                    </svg>*/}
            {/*                                    <h3 class="service-title">Управление рекламой</h3>*/}
            {/*                                    <p className="service-description">Установите лимит рекламных*/}
            {/*                                        кампаний</p>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-counter">*/}
            {/*                                    <div className="range-min">10</div>*/}
            {/*                                    <div className="range-title">10 кампаний</div>*/}
            {/*                                    <div className="range-max">500</div>*/}
            {/*                                    <input class="input-range" type="range" min="10" max="500" step="10"*/}
            {/*                                           value="10"/>*/}
            {/*                                </div>*/}
            {/*                                <div className="improved-select is-secondary-dark">*/}
            {/*                                    <div className="select-header">*/}
            {/*                                        <div className="select-value">*/}
            {/*                                            <div className="select-value-group"><span>1 месяц</span></div>*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon select-arrow" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#arrow_down_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-body">*/}
            {/*                                    <div className="service-price ">*/}
            {/*                                        <div className="price-value">3990</div>*/}
            {/*                                        <div className="price-info">*/}
            {/*                                            <div className="price-period">₽/мес</div>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="btn-v2 is-large is-md-regular is-dark">*/}
            {/*                                        <div className="btn-inner">*/}
            {/*                                            <div className="btn-text"><span>Заказать</span></div>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className="service-options">*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Количество продавцов</div>*/}
            {/*                                        <svg className="svg-icon" width="36" height="36"*/}
            {/*                                             viewBox="0 0 36 36">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#infinity_36px_filled"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Автоматическое или ручное управление*/}
            {/*                                            фразами*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Конверсии по фразам из Джем ВБ</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Автомат. управление ставками</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Автоуправление графиком запуска*/}
            {/*                                            кампаний*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Автопополнение рекламного бюджета*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Режим "Белый список" фраз и*/}
            {/*                                            "Автоминусация*/}
            {/*                                            по условиям"*/}
            {/*                                        </div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Реальные ставки в Рекламе</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Сравнение кампаний по фразам</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="service-option">*/}
            {/*                                        <div className="option-title">Оповещения в Telegram</div>*/}
            {/*                                        <svg className="svg-icon option-checked-icon" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <use*/}
            {/*                                                href="/static/images/icons/icons.svg?v=1756110266#check_24px"></use>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </section>*/}


            {/*</div>*/}


        </div>
    );
};

export default MainPage;
