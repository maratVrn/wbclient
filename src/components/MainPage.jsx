import React, {useContext, useEffect, useRef, useState} from 'react';
import './page.css';
import {Context} from "../index";
import { BreadCrumb } from 'primereact/breadcrumb';
import {observer} from "mobx-react-lite";
import ProductList from "./product_components/ProductList";
import mainImg from "./images/mainimg1200.jpg";
import mainAll from "./images/all1.jpg";
import info1_jpg from "./images/info1.png";
import info2_jpg from "./images/info2.png";
import info3_jpg from "./images/info3.jpg";

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Carousel } from 'primereact/carousel';
import {useNavigate} from "react-router-dom";


const MainPage = observer( () => {

    const {startProductsStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const [isStartMenu, setIsStartMenu] = useState(true)
    const {productListStore} = useContext(Context)
    const [isLoadPD, setIsLoadPD] = useState(false)
    const [addMenu, setAddMenu] = useState([])
    const [breadItems, setBreadItems] = useState([])
    const [catalogId, setCatalogId] = useState('')
    const [startProducts, setStartProducts] = useState([])
    const [isCatalogLoad, setIsCatalogLoad] = useState(false)
    const sectionRefCatalog = useRef(null);
    const navigate = useNavigate();

    const scrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                // behavior: 'smooth', // Делает прокрутку плавной
                // block: 'start',      // Прокручивает к началу элемента
            });
        }
    }

    function setActualStartProducts(){
        let showProducts = []
        for (let i in startProductsStore.allStartProducts)
            if ((startProductsStore.allStartProducts[i].price > 0) && (startProductsStore.allStartProducts[i].discount > 20)) showProducts.push(startProductsStore.allStartProducts[i])
        showProducts = showProducts.sort(() => Math.random() - 0.5)
        const groupedItems = [];
        for (let i = 0; i < showProducts.length; i += 2) {
            groupedItems.push(showProducts.slice(i, i + 2));
        }
        setStartProducts(groupedItems)
    }
    useEffect(()=>{
        if (!isCatalogLoad) {
            catalogStore.getLiteWBCatalog().then(() => {})
            setIsCatalogLoad(true)
        }

        setStartProducts([])
        if (startProductsStore.allStartProducts.length === 0) {
            startProductsStore.loadAllStartProducts().then(() => {
                setActualStartProducts()
            })
        } else setActualStartProducts()

        if (productListStore.onShowProduct) {
            setIsLoadPD(true)
            setIsStartMenu(false)
        }  else setMainMenu()
        window.scrollTo(0, 0)
    },[])



    const home = { label : 'Каталог', template: () => <a onClick={()=> setMainMenu()} className="cursor-pointer ">Каталог</a> }

    function setMainMenu(){
            scrollToRef(sectionRefCatalog)
        setIsLoadPD(false)
        setIsStartMenu(true)
        setBreadItems([])
    }

    function setMenuOne(oneData){

        window.scrollTo(0, 0)
        // console.log('setMenuOne');
        setIsLoadPD(false)
        let tmpItems = []
        for (let i in breadItems) tmpItems.push(breadItems[i])

        tmpItems.push({ label: oneData.name,  template: () => <a onClick={()=> setMenuOne(oneData)} className="cursor-pointer ">{oneData.name}</a>})

        if (oneData.childs) {
            for (let i in oneData.childs) {

                try {
                    oneData.childs[i].img = require(`.//images/menu/cat/${oneData.childs[i].id}.webp`)
                } catch (e) {
                    oneData.childs[i].img = require(`.//images/menu/noImg.png`)
                }
            }
            setAddMenu(oneData.childs);
            if (oneData.childs.length === 0){
                setCatalogId(oneData.id)

                setIsLoadPD(true)}
        }
        setBreadItems(tmpItems)
        productListStore.onShowBreadItems = tmpItems

        setIsStartMenu(false)
    }

    const productTemplate = (pair) => {
        return (
            <div className="flex flex-column gap-3">
                {pair.map(product => (
                    <div className=" itemCarousel " key={product.id}
                         onClick={() => navigate('/productInfo/' + product.id.toString())}


                    >
                        <img src={product.photoUrl} alt="..."/>
                        <div className="card-body">
                            <div className="card-price">
                                <div className="price-low ">
                                    <span>{product.price} ₽</span>
                                </div>
                                <span className="product-name">Цена без кошелька </span>

                            </div>

                            <div className="card-price">
                                <span className="product-brand">{product.brand} </span>

                            </div>
                            <div className="card-price">
                                <span className="product-name">{product.name} </span>
                            </div>
                            <div className="card-price">
                                <span className="product-rate">  </span>
                                <span className="product-rate2"> {product.reviewRating} </span>
                                <span className="product-rate3"> {product.feedbacks} оценок </span>
                            </div>

                            <div className="card-price">
                                <span className="spanGreen">Реальная скидка {product.discount} % </span>
                            </div>


                            <span
                                className="product-count"> Осталось {product.totalQuantity > 59 ? ' > ' + product.totalQuantity : product.totalQuantity} шт </span>


                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const responsiveOptions = [
        {
            breakpoint: '1800px',
            numVisible: 6,
            numScroll: 6
        },
        {
            breakpoint: '1560px',
            numVisible: 5,
            numScroll: 5
        },
        {
            breakpoint: '1340px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '1120px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '860px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '620px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const cardData = [
        {
            title: 'MP-tracker следит за ценами',
            description: 'Отмечайте товары которые вам интересны и узнавайте о скидках первыми. Мы проверяем цены на ваши товары 1 раз в час. Вы также можете подключить нашего telegram бота и получать уведомления сразу при изменении цены',
            icon: '📊', // Замените на реальную иконку
        },
        {
            title: 'Контролируйте наличие товара',
            description: 'MP-tracker также отслеживает уменьшение или поступление ваших товаров. Вы можете настроить минимальное колличество товара при котором нужно сделать уведомление или сообщить о появлении товара.',
            icon: '📈', // Замените на реальную иконку
        },
        {
            title: 'История цены на товар за год',
            description: 'В нашей базе доступно более 100 млн. товаров с историей цены. Данные обновляются каждый день. Вы можете видеть реальную динамику цены и понимать насколько сейчас выгодная цена. Мы рассчитываем среднюю цену и реальную скидку на товар',
            icon: '🔑', // Замените на реальную иконку
        },
    ];

    const Card = ({ title, description, icon }) => {
        return (
            <div className="card2">
                {/*<div className="card2-icon">{icon}</div>*/}
                <h2 className="card2-title">{title}</h2>
                <p className="card2-description">{description}</p>
            </div>
        );
    };


    return (
        <div className="page ">


            {isStartMenu ? <>
                    <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
                        <picture>
                            {/* Если экран меньше 800px — покажется эта картинка */}
                            <source
                                srcSet={mainImg} style={{borderRadius: '20px'}}
                                media="(max-width: 800px)"
                            />
                            {/* По умолчанию (больше 800px) — эта */}
                            <img
                                src={mainAll} style={{borderRadius: '20px'}}
                                alt="Background"
                                style={{width: '100%', display: 'block'}}
                            />
                        </picture>
                    </div>


                    <div className="flex-container">
                        {cardData.map((card, index) => (
                            <div className="flex-item">
                                <Card
                                    key={index}
                                    title={card.title}
                                    description={card.description}
                                    icon={card.icon}
                                />
                            </div>
                        ))}

                    </div>

                    <div className="step-container-main">
                        <div className="step-header">

                            <h2 className="step-title">Как использовать сервис?</h2>
                        </div>
                        <p className="step-description">
                            Экономьте тысячи рублей при покупке товаров на Wildberries. Найдите товары с реальными скидками прямо сейчас или отслеживайте цены на интересующие вас товары
                        </p>
                    </div>

                    <div className="flex-container">
                        <div className="step-wrapper">

                            <div className="step-image-container">
                                <img
                                    src={info1_jpg}
                                    alt="Иллюстрация добавления товаров"
                                    className="step-image"
                                />
                            </div>

                            <div className="step-content">
                                <div className="step-header">
                                    <span className="step-number">1</span>
                                    <h2 className="step-title">Найдите товары</h2>
                                </div>
                                <p className="step-description">
                                    Найдите интересующие вас товары на нашем сайте. Для этого можно вставить ID товара Wildberries или предемет в строку поиска, выбрать товар и перейти в его статистику.
                                </p>
                            </div>
                        </div>

                        <div className="step-wrapper">

                            <div className="step-image-container">
                                <img
                                    src={info2_jpg}
                                    alt="Иллюстрация добавления товаров"
                                    className="step-image"
                                />
                            </div>

                            <div className="step-content">
                                <div className="step-header">
                                    <span className="step-number">2</span>
                                    <h2 className="step-title">Добавьте их в отслеживаемые</h2>
                                </div>
                                <p className="step-description">
                                    Перейдите в карточку товара и нажмите «Отслеживать цену и остатки». После регистрации на сайте настройте telegram бот для уведомлений
                                </p>
                            </div>
                        </div>

                        <div className="step-wrapper">

                            <div className="step-image-container">
                                <img
                                    src={info3_jpg}
                                    alt="Иллюстрация добавления товаров"
                                    className="step-image"
                                />
                            </div>

                            <div className="step-content">
                                <div className="step-header">
                                    <span className="step-number">3</span>
                                    <h2 className="step-title">Получайте уведомления</h2>
                                </div>
                                <p className="step-description">
                                    Узнавайте об изменении цены на нужный вам товар первыми! Покупайте со скидками пока он не подорожал.
                                </p>
                            </div>
                        </div>

                    </div>


                    <div className="infoLine" style={{marginTop: '30px'}}> Интересные товары</div>

                    <div className="" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                        <Carousel value={startProducts} numVisible={6} numScroll={6} responsiveOptions={responsiveOptions}
                                  className="custom-carousel" circular
                                  autoplayInterval={4000}
                                  itemTemplate={productTemplate}/>
                    </div>


                </>
                : <BreadCrumb model={breadItems} home={home}/>
            }

            <section ref={sectionRefCatalog}>
                <></>
                <div className="line">
                    .
                </div>
            </section>

            {isLoadPD ?
                <>
                    <ProductList catalogId={catalogId}/>

                </>


                :
                <>
                    <div className="infoLine">
                        Каталог
                    </div>

                    <div className="flex flex-wrap column-gap-4 row-gap-4"
                         style={{paddingTop: '30px', paddingBottom: '50px'}}>

                        {isStartMenu ?


                            catalogStore.allWBCatalogLite.map((oneData) =>
                                <div key={oneData.id} className={"w-9rem h-12 rem  cursor-pointer catItem"}
                                     style={{padding: '10px'}}
                                     onClick={() => setMenuOne(oneData)}>
                                    <div key={oneData.id} className={"w-8rem h-10rem "}
                                         style={{
                                             textAlign: 'center',
                                             alignItems: 'center',
                                             width: '100%',
                                             fontSize: '18px',
                                             color: '#062950'
                                         }}
                                    >
                                        <img style={{maxWidth: '100%', maxHeight: '100%'}}
                                             src={oneData.img} alt="logo" loading="lazy"/>
                                        {oneData.name}
                                    </div>

                                </div>
                            )

                            :
                            addMenu.map((oneData) =>
                                <div key={oneData.id} className={" w-9rem h-14rem  cursor-pointer"}
                                     onClick={() => setMenuOne(oneData)}
                                     style={{padding: '10px'}}>

                                    <div key={oneData.id} className={"w-8rem h-12rem "}
                                         style={{textAlign: 'center', alignItems: 'center', width: '100%'}}>
                                        <img style={{maxWidth: '100%', maxHeight: '100%'}}
                                             src={oneData.img} alt="logo" loading="lazy"/>
                                        {oneData.name}
                                    </div>


                                </div>
                            )

                        }
                        <div className="infoLine" style={{marginTop:'30px'}}>
                            Часто задаваемые вопросы
                        </div>
                        <div style={{width:'100%'}}>
                            <Accordion >
                                <AccordionTab header="Что означает реальная сидка?">
                                    <p className="m-0">
                                        Уже давно не секрет что зачастую скидки, которые отображают маркетплейсы являются просто маркетинговым ходом. Наши алгоритмы отслеживают цены на товар за длительный период и вычисляют среднюю цену. Если текущая цена ниже «средней» цены – то в данный момент продавец действительно продает товар со скидкой и вы можете купить его выгодно!
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Для чего нужно отслеживать цены?">
                                    <p className="m-0">
                                        Как вы сами можете убедиться цены на один и тот же товар часто меняются. Многие маркетплейсы и продавцы периодически проводят акции и снижают цены или наоборот завышают чтобы больше заработать. Часто бывает, что цену могут снизить буквально на несколько часов. Если вы готовы ждать лучшую цену то доверьте рутинную задачу проверки цен нашему сервису.
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Сколько товаров я могу отслеживать?">
                                    <p className="m-0">
                                        Данный сервис является бесплатным с возможностью отслеживать до 50 товаров.
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Как я узнаю, что цена изменилась?">
                                    <p className="m-0">
                                        После регистрации на сайте в личном кабинете у вас будет указан ваш уникальный токен а также ссылка на наш telegram бот. Вам достаточно вставить токен в наш бот и он автоматически привяжется к вашему аккаунту на сайте. Все уведомления будут приходить вам в бот.
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Что за товары представлены на сайте mp-tracker?">
                                    <p className="m-0">
                                        Наша система анализирует более 100 млн. товаров с площадки WB каждый день и вычисляет реальные скидки на эти товары. При выборе определенного товара вы увидите график цен по которому видно, что текущая цена действительно ниже средней за предыдущий период. Некоторые товары как пример мы отображаем в блоке «Интересные товары». Также вы можете посмотреть товары в каталоге товаров или воспользоваться поиском.
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Почему при поиске мне не всегда выдаются нужные товары?">
                                    <p className="m-0">
                                        Не на все товары в моменте существую скидки. Если нужного товара нет то система выдает аналоги или близкие по описанию товары.
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Я могу посмотреть историю цены на конретный товар?">
                                    <p className="m-0">
                                        Да вы можете вставить ID товара с сайта WB в систему поиска. Если он есть в нашей системе мы отобразим его, а также покажем похожие товары со скидками на текущий момент
                                    </p>
                                </AccordionTab>
                                <AccordionTab header="Можно ли отслеживать товары на нескольких платформах одновременно?">
                                    <p className="m-0">
                                        На текущий момент в разработке функционал отслеживания цена на других маркетплейсах таких как Ozon и Яндекс.Маркет
                                    </p>
                                </AccordionTab>

                            </Accordion>

                        </div>
                    </div>
                </>
            }

        </div>
    );
});

export default MainPage;
