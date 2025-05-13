import React from 'react';
import logoPng from "../wbsale4.png";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="borderOne">
            {/*<div className="footer_info">*/}
            {/*    <a href="/"> <img alt="logo" src={logoPng}></img> </a>*/}

            {/*</div>*/}
            <div className="responsive-three-column-grid">
                <div className="borderOne" style={{padding: '5%'}}>
                    <a href="/"> <img alt="logo" src={logoPng}></img> </a>
                    <div className="footer_info"
                         onClick={() => navigate('/')}> Сервис для аналитики и эффективного управления продажами на wildberries
                    </div>


                </div>
                <div className="borderOne" style={{padding: '1%'}}>
                    <div className="responsive-only-two-column-grid">
                        <div className="borderOne">
                            <div className="footer_s">Аналитика</div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Анализ карточки товара
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Анализ продавца
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Анализ конкурентов
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Статистика поисковых запросов
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Поиск и аналитика ниш
                            </div>
                        </div>
                        <div className="borderOne">
                            <div className="footer_s">Управление продажами</div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Комплектация FBS
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Аналитика FBS
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Управление товарами
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Управление акциями
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Автоматический Репрайсер
                            </div>
                            <div className="footer_info"
                                 onClick={() => navigate('/productInfo/0')}> Управление рекламой
                            </div>
                        </div>

                    </div>

                </div>
                <div className="borderOne" style={{padding: '1%', textAlign:'center'}}>
                    <div className="footer_s">Компания</div>
                    <div className="footer_info"
                         onClick={() => navigate('/productInfo/0')}> О Нас
                    </div>
                    <div className="footer_info"
                         onClick={() => navigate('/productInfo/0')}> Наша команда
                    </div>
                    <div className="footer_info"
                         onClick={() => navigate('/productInfo/0')}> Контакты
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;