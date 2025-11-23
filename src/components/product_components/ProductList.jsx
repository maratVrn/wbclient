import React, {useContext, useEffect, useState, useRef } from 'react';
import '../page.css';
import { OverlayPanel } from 'primereact/overlaypanel';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import downSvg from "../images/down.svg";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from 'primereact/inputnumber';
import { Paginator } from 'primereact/paginator';
import { Checkbox } from 'primereact/checkbox';

const ProductList = (props) => {
    const {catalogId} = props;

    const {productListStore} = useContext(Context)
    const [items, setItems] = useState([])

    // Для пагинации товаров
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(20);
    const onPageChange = (event) => {
        window.scrollTo(0, 0)
        setFirst(event.first);
        setRows(event.rows);

    };


    const navigate = useNavigate();




    // Параметры глубины аналитики
    const depth_op = useRef(null);
    const depth_categories = [
        { name: 'до 100 товаров', key: '1' },
        { name: 'до 500 товаров', key: '5' },
        { name: 'до 1000 товаров', key: '10' },

    ];
    const [depthSelectedCategory, setDepthSelectedCategory] = useState(depth_categories[0]);

    // // Фильтр брендов
    // const fbrandFilter_op = useRef(null);
    // const [selectedFbrandFilter, setSelectedFbrandFilter] = useState([]);
    // function onFbrandFilterChange  (e) {
    //     let _selectedCategories = [...selectedFbrandFilter];
    //     if (e.checked)  _selectedCategories.push(e.value)
    //     else  _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);
    //     setSelectedFbrandFilter(_selectedCategories);
    // }
    // Фильтр категорий
    const xsubjectFilter_op = useRef(null);
    const [selectedXsubjectFilter, setSelectedXsubjectFilter] = useState([]);
    function onxXubjectFilterChange  (e) {
        let _selectedCategories = [...selectedXsubjectFilter];
        if (e.checked)  _selectedCategories.push(e.value)
        else  _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);
        setSelectedXsubjectFilter(_selectedCategories);
    }
    // Фильтр цены цены

    const price_op = useRef(null);
    const [usePriceMin, setUsePriceMin] = useState(false);
    const [usePriceMax, setUsePriceMax] = useState(false);
    let { query } = useParams();



    useEffect(()=>{

        console.log('useEffectProductList');
        // console.log('catalogId '+ catalogId);
        // console.log('query '+ query);
        setItems([])
        setUsePriceMin(false)
        setUsePriceMax(false)
        productListStore.setStartData()

        let idCount = 100
        try {idCount = parseInt(depthSelectedCategory.key)*100} catch (e) {idCount = 100}
        if (catalogId){
            const param = {catalogIdList :[ parseInt(catalogId)], idCount: idCount,
                filters : {isXsubjectFilterChecked : false, XsubjectIdArray : []}
            }
            productListStore.getProductList(param).then(() => {
                setItems(productListStore.productList)
            })
        }
            else if (query){
            const param = {idCount: idCount,
                filters : {isXsubjectFilterChecked : false, XsubjectIdArray : []}
            }

            console.log('поиск по query');
            productListStore.getSearchResult(query, param).then(() => {
                setItems(productListStore.productList)
            })
        }





    }, [query])



    function showProductInfo(id) {
        window.open('/productInfo/' + id.toString())
    }

    function setNewData() {
        setItems([])

        let isXsubjectFilterChecked = false
        let xSubjectIdArray = []
        for (let i in selectedXsubjectFilter) {
            isXsubjectFilterChecked = true
            xSubjectIdArray.push(selectedXsubjectFilter[i].key)
        }

        let idCount = 0
        try {idCount = parseInt(depthSelectedCategory.key)*100} catch (e) {idCount = 100}



        if (catalogId){
            const param = {catalogIdList :[ parseInt(catalogId)], idCount: idCount,
                filters : {isXsubjectFilterChecked : isXsubjectFilterChecked, xSubjectIdArray : xSubjectIdArray,
                    usePriceMin : usePriceMin, priceMin : productListStore.priceUFilter.min,
                    usePriceMax : usePriceMax, priceMax : productListStore.priceUFilter.max,}
            }

            productListStore.getProductList(param).then(() => {
                setItems(productListStore.productList)
            })
        }
        else if (query){
            const param = {idCount: idCount,
                filters : {isXsubjectFilterChecked : isXsubjectFilterChecked, xSubjectIdArray : xSubjectIdArray,
                    usePriceMin : usePriceMin, priceMin : productListStore.priceUFilter.min,
                    usePriceMax : usePriceMax, priceMax : productListStore.priceUFilter.max,}
            }


            productListStore.getSearchResult(query, param).then(() => {
                setItems(productListStore.productList)
            })
        }




    }


    return (
        <div className="">
            <div className=" flex align-items-center">
                <h3 style={{marginLeft: '20px'}}>{query}</h3>
                <p style={{
                    marginTop: '10px',
                    marginLeft: '20px',
                    fontSize: '16px',
                    color: '#83839a'
                }}>{productListStore.productList.length} товаров со скидками найдено</p>
            </div>

            <div className=" flex  " style={{paddingTop: '20px'}}>

                {productListStore.addQuery.map((query, idx) => {
                    return (
                        <div key={idx} className="flex">


                            <div className="text-wrap" style={{cursor: 'pointer'}}
                                 onClick={(e) => navigate('/productList/' + query)}>

                                <i className="pi pi-search" style={{fontSize: '0.7rem', color: '#83839a'}}></i>
                                <a style={{
                                    marginTop: '10px',
                                    marginLeft: '2px',
                                    marginRight: '20px',
                                    fontSize: '14px',
                                    color: '#83839a'
                                }}>{query}</a>
                            </div>

                        </div>
                    );
                })}
            </div>


            {/*Фильтры*/}
            <div className=" flex" style={{marginTop: '20px', marginBottom: '20px'}}>
                <button className="filter_button" onClick={(e) => depth_op.current.toggle(e)}> Глубина аналитики
                    <img className="down_icon" src={downSvg} width="12" height="12" loading="lazy"/>
                </button>
                <OverlayPanel ref={depth_op}>
                    <div className="flex flex-column gap-3">
                        {depth_categories.map((category) => {
                            return (
                                <div key={category.key} className="flex align-items-center">
                                <RadioButton inputId={category.key} name="category" value={category}
                                                 onChange={(e) => {
                                                     setDepthSelectedCategory(e.value)
                                                 }}
                                                 checked={depthSelectedCategory.key === category.key}/>
                                    <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                </div>
                            );
                        })}
                        <button className="filter_button_ok" onClick={(e) => {
                            depth_op.current.toggle(e)
                            setNewData()
                        }}> Применить
                        </button>
                    </div>

                </OverlayPanel>
                {
                    productListStore.xsubjectFilter.items.length > 0 ?
                        <>
                            <button className="filter_button"
                                    onClick={(e) => xsubjectFilter_op.current.toggle(e)}> Категория
                                <img className="down_icon" src={downSvg} width="12" height="12" loading="lazy"/>
                            </button>
                            <OverlayPanel ref={xsubjectFilter_op}>
                                <div className="flex flex-column gap-3">
                                    {productListStore.xsubjectFilter.items.map((filter) => {
                                        return (
                                            <div key={filter.key} className="flex align-items-center">

                                                <Checkbox inputId={filter.key} name="category" value={filter}
                                                          onChange={onxXubjectFilterChange}
                                                          checked={selectedXsubjectFilter.some((item) => item.key === filter.key)}/>

                                                <label htmlFor={filter.key} className="ml-2">
                                                    {filter.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                    <button className="filter_button_ok" onClick={(e) => {
                                        xsubjectFilter_op.current.toggle(e)
                                        setNewData()
                                    }}> Применить
                                    </button>
                                </div>
                            </OverlayPanel>
                        </>
                        :
                        <></>

                }
                <button className="filter_button" onClick={(e) => price_op.current.toggle(e)}> Цена
                    <img className="down_icon" src={downSvg} width="12" height="12" loading="lazy"/>
                </button>
                <OverlayPanel ref={price_op}>
                    <div className="flex flex-column gap-3">
                        <div className="flex">
                            <Checkbox
                                onChange={e => setUsePriceMin(e.checked)} checked={usePriceMin}
                            />

                            <p style={{paddingLeft:'10px'}}> От</p>
                            <InputNumber
                                style={{marginLeft: '10px', width: '150px', marginRight: '20px', height: '25px'}}
                                inputId="withoutgrouping" value={productListStore.priceUFilter.min}
                                onValueChange={(e) => productListStore.priceUFilter.min = e.value} useGrouping={false}/>
                        </div>
                        <div className="flex">
                            <Checkbox
                                onChange={e => setUsePriceMax(e.checked)} checked={usePriceMax}
                            />

                            <p style={{paddingLeft:'10px'}}> До</p>
                            <InputNumber
                                style={{marginLeft: '10px', width: '150px', marginRight: '20px', height: '25px'}}
                                inputId="withoutgrouping" value={productListStore.priceUFilter.max}
                                onValueChange={(e) => productListStore.priceUFilter.max = e.value} useGrouping={false}/>
                        </div>

                        <button className="filter_button_ok" onClick={(e) => {
                            price_op.current.toggle(e)
                            setNewData()
                        }}> Применить
                        </button>
                    </div>
                </OverlayPanel>


                {/*{*/}
                {/*    productListStore.fbrandFilter.items.length > 0 ?*/}
                {/*        <>*/}
                {/*            <button className="filter_button" onClick={(e) => fbrandFilter_op.current.toggle(e)}> Бренд*/}
                {/*                <img className="down_icon" src={downSvg} width="12" height="12" loading="lazy"/>*/}
                {/*            </button>*/}
                {/*            <OverlayPanel ref={fbrandFilter_op}>*/}
                {/*                <div className="flex flex-column gap-3">*/}
                {/*                    {productListStore.fbrandFilter.items.map((filter) => {*/}
                {/*                        return (*/}
                {/*                            <div key={filter.key} className="flex align-items-center">*/}

                {/*                                <Checkbox inputId={filter.key} name="category" value={filter}*/}
                {/*                                          onChange={onFbrandFilterChange}*/}
                {/*                                          checked={selectedFbrandFilter.some((item) => item.key === filter.key)}/>*/}
                {/*                                <label htmlFor={filter.key} className="ml-2">*/}
                {/*                                    {filter.name}*/}
                {/*                                </label>*/}
                {/*                            </div>*/}
                {/*                        );*/}
                {/*                    })}*/}
                {/*                    <button className="filter_button_ok" onClick={(e) => {*/}
                {/*                        fbrandFilter_op.current.toggle(e)*/}
                {/*                        setNewData()*/}
                {/*                    }}> Применить*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </OverlayPanel>*/}
                {/*        </>*/}
                {/*        :*/}
                {/*        <></>*/}

                {/*}*/}


            </div>

            {/*Список на выдачу*/}
            <div className="grid" style={{paddingBottom:'30px'}}>
                {items.slice(first, first + rows).map((item) =>
                    <div key={item.id} className=" item " onClick={() => showProductInfo(item.id)}>
                        <img src={item.photoUrl} alt="..."/>
                        <div className="card-body">
                            <div className="card-price">
                                <div className="price-low ">
                                    <span>{item.price} ₽</span>
                                </div>
                                <span className="product-name">Цена без кошелька </span>

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

                            <div className="card-price">
                                <span className="spanGreen">Реальная скидка {item.discount} % </span>
                            </div>


                            <span
                                className="product-count"> Осталось {item.totalQuantity > 59 ? ' > ' + item.totalQuantity : item.totalQuantity} шт </span>



                        </div>
                    </div>)
                }


            </div>
            <div className="card">
                <Paginator first={first} rows={rows} totalRecords={items.length} rowsPerPageOptions={[20, 35, 50]}
                           onPageChange={onPageChange}/>
            </div>
        </div>
    );
};

export default ProductList;
