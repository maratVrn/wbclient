import React, {useContext, useEffect, useState} from 'react';
import './page.css';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";



const ProductList = (props) => {
    const {productStore} = useContext(Context)
    const [items, setItems] = useState([])
    const {catalogStore} = useContext(Context)
    const navigate = useNavigate();

    let { id } = useParams();
    useEffect(()=>{
        setItems([])

        if (id) productStore.getProductList(id).then(() => {
            setItems(productStore.productList)
            }
        )

    },[id])

    function showProductInfo(id){
        navigate('/productInfo/' + id.toString())
    }

    return (
        <div className="page">
            <div className="grid">
                {  items.map((item) =>
                    <div key = {item.id} className=" item " onClick={()=>showProductInfo(item.id)}>
                        <img src={item.photoUrl} alt="..."/>
                        <div className="card-body">
                            <div className="card-price">
                                <div className="price-low ">
                                    <span>{item.price}</span>
                                </div>
                                {(item.discount !== 0) ?
                                    <div className="price-max ">
                                        <span><del>{item.basicPrice} ₽</del></span>
                                    </div>
                                    : <div></div>
                                }

                                {(item.discount !== 0) ?
                                    <div className="price-sale ">
                                        <span>- {item.discount} %</span>
                                    </div>
                                    : <div></div>
                                }

                            </div>
                            <div className="card-price">
                                <span className="product-brand">{item.brand} </span>

                            </div>
                            <div className="card-price">
                                <span className="product-name">{item.name} </span>
                            </div>
                            <div className="card-price">
                                <span className="product-rate">  </span>
                                <span className="product-rate2"> {item.reviewRating} </span>
                                <span className="product-rate3"> {item.feedbacks} оценок </span>
                            </div>
                            <span className="product-count"> Осталось {item.totalQuantity} шт </span>
                            <div className="product-order">
                                <a className="order">
                                    Подробнее
                                </a>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ProductList;
