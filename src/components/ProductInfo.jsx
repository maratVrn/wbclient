import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './product_components/product.css';
import ProductPhoto from "./product_components/product_photo";
import ProductData from "./product_components/product_data";
import ProductYearData from "./product_components/productYear_data";
import ProductAbout from "./product_components/product_about";
import ProductsSupplierInfo from "./product_components/products_supplier_Info";
import ProductAllColors from "./product_components/product_all_colors";
import Footer from "./product_components/footer";
import PositionsInfo from "./product_components/positions_info";
import CompetitorInfo from "./product_components/competitor_info";
import {InputNumber} from "primereact/inputnumber";
import { Button } from 'primereact/button';

const ProductInfo =observer( (props ) => {
    const {productStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const [isInWB, setIsInWB] = useState(false)
    const [isInBase, setIsInBase] = useState(false)
    const [isFbo, setIsFbo] = useState(false)
    const [findText, setFindText] = useState('');
    const [isStartPage, setIsStartPage] = useState(true)
    const navigate = useNavigate();

    let { id } = useParams();
    useEffect(()=>{
        setIsStartPage(true)

        // console.log('useEffect ProductInfo Id = '+id);
        if (id > 0) {getIdInfo(id)
            setIsStartPage(false)}
    },[id])

    function getIdInfo(id){
        // console.log('ttt');
        if (id > 0) {
            setIsStartPage(false)
            productStore.setState(id)
            catalogStore.getIdInfo(id).then(() => {
                    const idInfo = catalogStore.idInfo
                    let rt = 'Товар не найден'
                    if (idInfo[0] && idInfo[1]) {
                        rt = 'id = ' + idInfo[0].id + '   subjectId = ' + idInfo[1].subjectId
                            + '   catalogId = ' + idInfo[0].catalogId + '    totalQuantity = ' + idInfo[1].totalQuantity
                        // navigate('/productInfo/' + id.toString())
                    } //else navigate('/noProduct/')
                // console.log(rt);
                }
            )
            productStore.setState(id)
            if (parseInt(id) > 0) {
                productStore.getProductStartInfo(id).then(() => {
                    // console.log(productStore.idInfo.isInWB);
                    setIsInWB(productStore.idInfo.isInWB)
                        setIsInBase(productStore.idInfo.isInBase)
                        setIsFbo(productStore.idInfo.isFbo)

                    }
                )
            }
        }
    }
    const checkDataAndFindProduct = () => {
        const newId = parseInt(findText)
        setFindText('')
        if (newId) {
            navigate('/productInfo/' + newId.toString())
        } else console.log('Ysdsd');
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            checkDataAndFindProduct()
        }
    };

    return (


        <div className="page">

            {isStartPage ?
                <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика карточки товара на Wildberries</h2>
                    <p className="mainFont">Анализируйте товары конкурентов, находите лучшие варианты продаж, смотрите
                        данные по продажам за год, анализируйте поставки, сезонность и лучшие цветовые решения</p>
                </div>
                : <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика карточки товара на Wildberries</h2></div>
            }
            {/*<div style={{display: 'flex', justifyContent: 'center', paddingLeft: '10px', paddingBottom: '20px'}}>*/}

            <div className="flex-three-column-grid" >
                <p className="mainFont" style={{paddingRight: '10px'}}>Введите артикул товара</p>
                <InputNumber style={{width: '350px', height: '40px', marginRight: '20px'}} value={findText}
                             onKeyPress={handleKeyPress} useGrouping={false}
                             onValueChange={(e) => setFindText(e.target.value)}/>
                <Button onClick={() => checkDataAndFindProduct()} className="mainFont"
                        style={{paddingLeft: '20px', maxWidth:'120px', height: '40px' }} label="Найти"/>


            </div>
            {isStartPage ?
                <div>
                    <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Изучите товар для продажи</h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучите аналогичный товар
                                конкурента</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Смотрите данные о продажах за
                                послдений
                                30 дней</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучайте поставки и возвраты</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./product_components/images/im1.jpg')}/>
                        </div>

                    </div>
                    <div className="left-sidebar" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Анализируйте продажи по всем цветам товара</h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>В отчете доступные общие данные по
                                продажам
                                за 30 дней по всем цветам</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучайте какие цвета продаются
                                лучше</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Анализируйте цены, продажи и остатки
                                в сводной таблице</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./product_components/images/im2.jpg')}/>
                        </div>

                    </div>


                    <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Изучите основные показатели с начала 2025 года</h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Изучите динамику продаж за год</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Анализируйте частоту поставок и
                                динамику склада</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Смотрите есть ли сезонность у данного
                                товара</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./product_components/images/im3.jpg')}/>
                        </div>

                    </div>
                    <div className="left-sidebar" style={{alignItems: 'center'}}>
                        <div className="borderOne">
                            <h2>Смотрите позиции в поисковой выдаче на главной странице WB </h2>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Отчет автоматически генерирует запросы по названию товара</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>Система сама проверит на какой странице и месте находиться товар</p>
                            <p className="mainFont" style={{paddingRight: '10px'}}>При необходимости добавьте свой запрос</p>
                        </div>
                        <div className="borderOne exmpl">
                            <img src={require('./product_components/images/im4.jpg')}/>
                        </div>

                    </div>
                </div>
                :
                <div>
                    <div className="responsive-three-column-grid">

                        < div className="borderOne">
                            <ProductPhoto id={id} isInWB={isInWB} isInBase={isInBase}/>
                        </div>
                        < div className="borderOne">
                            <ProductAbout id={id} isInWB={isInWB} isInBase={isInBase}/>
                        </div>

                        < div className="borderOne">
                            <ProductData id={id} isFbo={isFbo} isInBase={isInBase}/>
                        </div>

                    </div>
                    {isInBase ?
                        <div>
                            <ProductAllColors id={id}/>
                            <ProductYearData id={id} isFbo={isFbo} isInBase={isInBase}/>
                            <PositionsInfo id={id}/>
                            {/*<TabView className="a-tab">*/}
                            {/*    <TabPanel header="Отчет по всем цветам">*/}
                            {/*        <ProductAllColors id={id}/>*/}
                            {/*    </TabPanel>*/}
                            {/*    <TabPanel header="Позиции в выдаче">*/}
                            {/*        <PositionsInfo id={id}/>*/}
                            {/*    </TabPanel>*/}
                            {/*    <TabPanel header="Аналитика 2025">*/}

                            {/*        <ProductYearData id={id} isFbo={isFbo} isInBase={isInBase}/>*/}
                            {/*    </TabPanel>*/}
                            {/*    <TabPanel header="Отчет по поставщику">*/}
                            {/*        <ProductsSupplierInfo id={id}/>*/}


                            {/*    </TabPanel>*/}
                            {/*    <TabPanel header="Аналитика конкурентов">*/}
                            {/*        <CompetitorInfo id={id}/>*/}
                            {/*    </TabPanel>*/}
                            {/*</TabView>*/}
                        </div>
                        : <div>товара нет в базе</div>
                    }
                </div>
            }


            <Footer/>
            <div style={{height: '100px'}}></div>
        </div>
    );
});

export default ProductInfo;