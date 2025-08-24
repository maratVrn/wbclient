import React, {useEffect, useState} from 'react';
import {TabPanel, TabView} from "primereact/tabview";
import CompetitorSeeAlsoInfo from "./competitor_seeAlso_Info";
import CompetitorSeePhotoInfo from "./competitor_seePhotoInfo";
import CompetitorSeeFind from "./competitor_seeFind";
import Footer from "./footer";
import {useNavigate, useParams} from "react-router-dom";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import ProductPhoto from "./product_photo";
import ProductAbout from "./product_about";
import ProductData from "./product_data";
import ProductAllColors from "./product_all_colors";
import ProductYearData from "./productYear_data";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Checkbox} from "primereact/checkbox";
import {InputText} from "primereact/inputtext";

const CompetitorInfo = (props) => {
    let { id } = useParams();

    const [isStartPage, setIsStartPage] = useState(true)
    const [findText, setFindText] = useState('');
    const [showParamVisible, setShowParamVisible] = useState(false);

    const [useSeeAlso, setUseSeeAlso] = useState(true)
    const [seeAlsoCount, setSeeAlsoCount] = useState(100)
    const [useSeeByPhoto, setUseSeeByPhoto] = useState(true)
    const [seeByPhotoCount, setSeeByPhotoCount] = useState(100)
    const [useSeeSearchWorld, setUseSeeSearchWorld] = useState(false)
    const [seeSearchWorldCount, setSeeSearchWorldCount] = useState(100)
    const [searchWordByCaption, setSearchWordByCaption] = useState(true)
    const [searchWordByCaptionCount, setSearchWordByCaptionCount] = useState(100)
    const [searchWord, setSearchWord] = useState('')


    const navigate = useNavigate();


    useEffect(()=>{
        console.log('useEffect CompetitorInfo Id = '+id);
        setIsStartPage(true)
        if (id > 0) {
            // getIdInfo(id)
            setIsStartPage(false)
        }
    },[id])

    const checkDataAndFindCompetitor = () => {
        const newId = parseInt(findText)
        setFindText('')
        if (newId) {
            navigate('/competitorInfo/' + newId.toString())
        } else console.log('Ysdsd');
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            checkDataAndFindCompetitor()
        }
    };

    return (
        <div className="page">

            {isStartPage ?
                <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика конкурентов карточки товара на Wildberries</h2>
                    <p className="mainFont">Анализируйте товары конкурентов, находите лучшие варианты продаж, смотрите
                        данные по продажам определенной группы товаров кокурентов, анализируйте поставки, сезонность и
                        выбирайте лучшие решения</p>
                </div>
                : <div style={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px'}}>
                    <h2>Аналитика конкурентов на Wildberries</h2></div>
            }
            <div className="flex-three-column-grid">
                <p className="mainFont" style={{paddingRight: '10px'}}>Введите артикул товара</p>
                <InputNumber style={{width: '350px', height: '40px', marginRight: '20px'}} value={findText}
                             onKeyPress={handleKeyPress} useGrouping={false}
                             onValueChange={(e) => setFindText(e.target.value)}/>
                <Button onClick={() => checkDataAndFindCompetitor()} className="mainFont"
                        style={{paddingLeft: '20px', maxWidth: '120px', height: '40px'}} label="Найти"/>
                <Button severity="secondary"
                        style={{height: '22px', fontSize: '14px', marginLeft: '20px', marginTop: '10px'}}
                        icon="pi pi-star" onClick={() => setShowParamVisible(true)}/>


                <Dialog header="Параметры поиска конкурентов" visible={showParamVisible} style={{width: '50vw', height: '35vw'}}
                        onHide={() => {
                            if (!showParamVisible) return;
                            setShowParamVisible(false);
                        }}>
                    <div>

                        <div style={{paddingTop: '22px'}} className=" flex ">
                            <Checkbox style={{paddingTop: '0px'}} onChange={e => setUseSeeAlso(e.checked)}
                                      checked={useSeeAlso}></Checkbox>
                            <p style={{fontSize: '14px', paddingLeft: '10px', marginTop: '3px'}}>Поиск по разделу
                                "смотрите также", колличество товаров </p>
                            <InputNumber style={{height: '25px', width: '100px', paddingLeft: '10px'}}
                                         value={seeAlsoCount} onValueChange={(e) => setSeeAlsoCount(e.value)}
                                         useGrouping={false}/>
                        </div>
                        <div style={{paddingTop: '22px'}} className=" flex ">
                            <Checkbox style={{paddingTop: '0px'}} onChange={e => setUseSeeByPhoto(e.checked)}
                                      checked={useSeeByPhoto}></Checkbox>
                            <p style={{fontSize: '14px', paddingLeft: '10px', marginTop: '3px'}}>Поиск по разделу
                                "похожие по фото", колличество товаров </p>
                            <InputNumber style={{height: '25px', width: '100px', paddingLeft: '10px'}}
                                         value={seeByPhotoCount} onValueChange={(e) => setSeeByPhotoCount(e.value)}
                                         useGrouping={false}/>
                        </div>

                        <div style={{paddingTop: '22px'}} className=" flex ">
                            <Checkbox style={{paddingTop: '0px'}} onChange={e => setSearchWordByCaption(e.checked)}
                                      checked={searchWordByCaption}></Checkbox>
                            <p style={{fontSize: '14px', paddingLeft: '10px', marginTop: '3px'}}>Поиск по заголовку
                                артикула, колличество товаров </p>
                            <InputNumber style={{height: '25px', width: '100px', paddingLeft: '10px'}}
                                         value={searchWordByCaptionCount}
                                         onValueChange={(e) => setSearchWordByCaptionCount(e.value)}
                                         useGrouping={false}/>
                        </div>


                        <div style={{paddingTop: '22px'}} className=" flex ">
                            <Checkbox style={{paddingTop: '0px'}} onChange={e => setUseSeeSearchWorld(e.checked)}
                                      checked={useSeeSearchWorld}></Checkbox>
                            <p style={{fontSize: '14px', paddingLeft: '10px', marginTop: '3px'}}>Поиск уникальному
                                запросу, колличество товаров </p>
                            <InputNumber style={{height: '25px', width: '100px', paddingLeft: '10px'}}
                                         value={seeSearchWorldCount}
                                         onValueChange={(e) => setSeeSearchWorldCount(e.value)}
                                         useGrouping={false}/>
                        </div>
                        <div style={{paddingTop: '22px'}} className=" flex ">
                            <p style={{fontSize: '14px', paddingRight: '10px', marginTop: '3px'}}>Запрос </p>
                            <InputText style={{height: '25px', width: '50vw'}}
                                         value={searchWord}
                                       disabled={!useSeeSearchWorld}
                                         onChange={(e) => setSearchWord(e.target.value)}
                                         useGrouping={false}/>
                        </div>




                    </div>

                </Dialog>
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
                            <img src={require('./images/im1.jpg')}/>
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
                            <img src={require('./images/im2.jpg')}/>
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
                            <img src={require('./images/im3.jpg')}/>
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
                            <img src={require('./images/im4.jpg')}/>
                        </div>

                    </div>
                </div>
                :
                <div>
                    <TabView className="a-tab">
                        <TabPanel header="В разделе 'Смотрите также'">
                            <CompetitorSeeAlsoInfo id={id}/>
                        </TabPanel>
                        <TabPanel header="В разделе 'Похожие по фото'">
                            <CompetitorSeePhotoInfo id={id}/>
                        </TabPanel>
                        <TabPanel header="По поисковому запросу">

                            <CompetitorSeeFind id={id}/>
                        </TabPanel>

                    </TabView>
                </div>
            }



            <Footer/>
            <div style={{height: '100px'}}></div>
        </div>
    );
};

export default CompetitorInfo;