import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

import {useNavigate} from "react-router-dom";
import 'primeicons/primeicons.css';
import { Tooltip } from 'primereact/tooltip';
import {calcDiscount} from "../math";



const ProductAbout = (props) => {
    const {id, isInWB} = props;
    const {productStore} = useContext(Context)
    const [info, setInfo] = useState([])
    const [discountInfo, setDiscountInfo] = useState({discount :0,  isDataCalc : false, meanPrice : 0})
    const [qty, setQty] = useState([])
    const navigate = useNavigate();


    useEffect(()=>{

        setDiscountInfo({discount :0,  isDataCalc : false, meanPrice : 0})

        setInfo([])
        setQty([])

        if (productStore.idInfo.isInWB)
        if (parseInt(id)>0) {


            const result = calcDiscount(productStore.idInfo?.productInfo?.priceHistory)
            setDiscountInfo(result);
            try {
                // console.log(productStore);
                setInfo(productStore.idInfo.idInfoWB);
                // Расчитаем остатки
                let allQty = []
                const sizes =  productStore.idInfo?.idInfoWB?.sizes? productStore.idInfo?.idInfoWB?.sizes : []
                for (let k in sizes) {
                    let oneSize = {name: sizes[k].name, qty: 0}
                    for (let i in sizes[k].stocks)
                        try {
                            oneSize.qty += sizes[k].stocks[i].qty
                        } catch (e) {}
                    allQty.push(oneSize)
                }
                if (allQty.length > 0)  if (allQty.length > 1) setQty(allQty)
                else setQty(allQty[0].qty)
            } catch (e){console.log(e)}

        }
    },[id, isInWB])

    function onWbClick(){
        productStore.userGoToBW().then()
        window.open(` https://www.wildberries.ru/catalog/${id}/detail.aspx`, '_blank');
    }

    return (

        <div>

            {isInWB ?
                <div>
                    {/*<div className="product_name">catalogId {productStore.idInfo.idInfo.catalogId}</div>*/}

                    <div className="product_name">{productStore.idInfo?.idInfoWB?.name}</div>

                    <div className="card-price">
                        <div className="price-low " style={{marginLeft: '10px'}}>
                            <span>{info?.price > 0 ? info.price : 'Нет в наличии'} ₽ </span>
                            <span className="product-brand"> {info?.price > 0 ? 'цена на WB сейчас без учета wb-кошелька' : ''} </span>
                        </div>


                    </div>


                    {
                        discountInfo.isDataCalc ?
                            <>
                                {info?.price > 0 ?
                                    <div className="card-price">
                                        <span
                                            className="product-brand"> Средняя цена за 90 дней: </span>
                                        <span
                                            className="spanGreen" > {discountInfo.meanPrice}  ₽</span>
                                    </div>
                                    : <></>
                                }
                                <div className="card-price">
                                    {
                                        discountInfo.discount > 0 ?
                                            <>
                                                <span
                                                    className="product-brand"> Реальная скидка : </span>
                                                <span
                                                    className="spanGreen"> {discountInfo.discount} %   ( {discountInfo.meanPrice - info?.price}  ₽)</span>
                                            </>
                                            :
                                            <span
                                                className="spanRed"> Цена Завышена на: {-1 * discountInfo.discount} %  (наценка {info?.price - discountInfo.meanPrice }  ₽) </span>
                                    }
                                </div>

                            </>
                            :
                            <div>
                                <span className="product-brand"> Данные о скидке не расчитаны </span>
                            </div>

                    }
                    <span className="product-brand"> Возраст товара: {productStore.startDateInBase}</span>


                    <Tooltip target=".custom-target-icon" style={{fontSize: '12px'}}/>
                    <i className="custom-target-icon pi pi-info-circle "
                       data-pr-tooltip="Дата с которой товар добавлен в нашу базу данных и доступен для анализа"
                       style={{fontSize: '1.1rem', cursor: 'pointer', marginLeft: '10px', color: 'tan'}}>

                    </i>
                    <div className="card-price">
                        <span className="product-brand"> Бренд: {info?.brand} </span>

                    </div>
                    <div className="card-price">
                        <span className="product-brand"> Продавец: {info?.supplier} </span>
                    </div>


                    <div className="card-price" style={{marginTop: '10px'}}>
                        <span className="product-rate">  </span>
                        <span className="product-rate2"> {info?.reviewRating} </span>
                        <span className="product-rate3"> {info?.feedbacks} оценок </span>
                    </div>


                    {
                        qty.length > 1 ?
                            <div>
                                <div className="product_size_text">Остатки по размерам</div>
                                <div className="size_info">
                                    {qty.map((size, idx) =>
                                        <div className="size_about" key={idx}
                                            // onClick={() => console.log(color.id)}
                                        >
                                            <div style={{paddingTop: '5px'}}> {size.name}</div>
                                            <div
                                                className="product_size_count"> {size?.qty > 59 ? '>' + size?.qty : size?.qty} шт.
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            :
                            <div style={{marginTop: '20px'}}>
                                <div className="product_size_text">Остатки
                                    сейчас: {qty > 59 ? '   > ' + qty : qty} шт.
                                </div>

                            </div>
                    }
                    <div className="product-order" onClick={()=>onWbClick()}>
                            Перейти на Wildberries
                    </div>
                </div>
                :
                <div>
                    Товара нет на вб
                </div>
            }


        </div>
    );
};

export default ProductAbout;