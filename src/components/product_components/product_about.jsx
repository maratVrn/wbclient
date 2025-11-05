import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import { Carousel } from 'primereact/carousel';
import {useNavigate} from "react-router-dom";
import 'primeicons/primeicons.css';
import { Tooltip } from 'primereact/tooltip';
import {calcDiscount} from "../math";



const ProductAbout = (props) => {
    const {id, isInWB} = props;
    const {productStore} = useContext(Context)
    const [info, setInfo] = useState([])
    const [qty, setQty] = useState([])
    const navigate = useNavigate();


    useEffect(()=>{
        // console.log('useEffect ProductAbout');
        // console.log('isInWB ProductAbout '+isInWB);


        setInfo([])
        setQty([])
        if (productStore.idInfo.isInWB)
        if (parseInt(id)>0) {
            const result = calcDiscount(productStore.idInfo?.productInfo?.priceHistory)
            console.log(result);
            productStore.getProductAbout(id).then(() => {
                    try {
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
            })
        }
    },[id, isInWB])

    function getIdInfo(id) {
        navigate('/productInfo/' + id.toString())


    }

    const productTemplate = (product) => {
        return (
            <div style={{height:'80px', textAlign:'center'}}>

            <img style={{height:'80px', width:'60px'}}
                 className={product.id == id? "little_photo little_photo_border" : "little_photo"}
                 src={product.photoUrl}
                 onClick={() => getIdInfo(product.id)}
                 alt="..."/>

            </div>
        );
    };
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 2,
            numScroll: 1
        }
    ];
    return (

        <div>

            {isInWB ?
                <div>
                    <div className="product_name">{productStore.idAddInfo.imt_name}</div>

                    <div className="card-price">
                        <div className="price-low " style={{marginLeft: '10px'}}>
                            <span>{info?.price > 0 ? info.price : 'Нет в наличии'}</span>
                        </div>
                        {(info?.discount !== 0) ?
                            <div className="price-max ">
                                <span><del>{info?.basicPrice} ₽</del></span>
                            </div>
                            : <div></div>
                        }

                        {(info?.discount !== 0) ?
                            <div style={{marginLeft: '10px'}}>
                                <div className="product_discount_wb_text ">
                                    <span> {info?.discount? info?.discount : ''} % Скидка на WB</span>
                                </div>
                            </div>
                            : <div></div>
                        }

                    </div>
                    {/*<div>*/}
                    {/*    <div>*/}
                    {/*        <span className="product-brand"> Реальная скидка: {productStore.realDiscount+ ' %'}</span>*/}


                    {/*        <Tooltip target=".custom-target-icon" style={{fontSize: '12px'}}/>*/}
                    {/*        <i className="custom-target-icon pi pi-info-circle "*/}
                    {/*           data-pr-tooltip="Скидка на товар расчитанная исходя из медианной цены и данных по продажам что в итоге показывает реальную скидку "*/}
                    {/*           style={{*/}
                    {/*               fontSize: '1.2rem',*/}
                    {/*               cursor: 'pointer',*/}
                    {/*               marginLeft: '10px',*/}
                    {/*               color: 'tan',*/}
                    {/*               marginTop: '10px'*/}
                    {/*           }}>*/}

                    {/*        </i>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                    <div className="product_color">цвет : {productStore.idAddInfo.nm_colors_names}</div>
                    {
                        productStore.colors.length > 1 ?
                            <div style={{height: '80px', paddingTop: '10px', maxWidth:'500px'}}>

                                <Carousel

                                    value={productStore.colors}
                                    responsiveOptions={responsiveOptions}
                                    numVisible={6}
                                    showIndicators={false}
                                    itemTemplate={productTemplate}/>
                            </div>
                            :
                            <div></div>
                    }

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
                                            <div className="product_size_count"> {size?.qty >59 ? '>'+ size?.qty :size?.qty} шт.</div>
                                        </div>)}
                                </div>
                            </div>
                            :
                            <div style={{marginTop: '20px'}}>
                                <div className="product_size_text">Остатки сейчас: {qty >59 ? '   > '+ qty :qty} шт.</div>

                            </div>
                    }
                    <div className="product-order">
                        <a className="wb-go" style={{width: '70%', marginTop: '10px'}}
                           href={` https://www.wildberries.ru/catalog/${id}/detail.aspx`} target="_blank"
                           rel="noopener noreferrer"
                        >
                            Перейти на Wildberries
                        </a>
                        {/*<button onClick={() => {*/}
                        {/*    // const result = await ApiService.APIGetIDInfo(id)*/}
                        {/*    productStore.getMathData(id).then(() =>{})*/}
                        {/*}}>Расчет с ВБ*/}
                        {/*</button>*/}
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