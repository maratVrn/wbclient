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
import {ProgressSpinner} from "primereact/progressspinner";

const ProductList = (props) => {

    const [loading, setLoading] = useState(false);

    const {catalogId} = props;
    const {productListStore} = useContext(Context)
    const {startProductsStore} = useContext(Context)
    const [items, setItems] = useState([])

    // Для пагинации товаров
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(50);
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

    // Параметры сортировки
    const sort_op = useRef(null);
    const sort_categories = [
        { name: 'Лучшая скидка', key: '1' },
        { name: 'Сначала дешевле', key: '2' },
        { name: 'Сначала дороже', key: '3' },
        { name: 'По рейтингу', key: '4' },
        { name: 'По колличеству оценок', key: '5' },

    ];
    const [sortSelectedCategory, setSortSelectedCategory] = useState(depth_categories[0]);

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

        setItems([])
        setUsePriceMin(false)
        setUsePriceMax(false)
        productListStore.setStartData()

        let idCount = 100
        try {idCount = parseInt(depthSelectedCategory.key)*100} catch (e) {idCount = 100}
        if (catalogId){
            setLoading(true);
            const param = {catalogIdList :[ parseInt(catalogId)], idCount: idCount,
                filters : {isXsubjectFilterChecked : false, xSubjectIdArray : []}
            }
            productListStore.getProductList(param).then(() => {
                setLoading(false);
                setItems(productListStore.productList)
            })
        }
            else if (query){
            const param = {idCount: idCount,
                filters : {isXsubjectFilterChecked : false, xSubjectIdArray : []}
            }

            setLoading(true);
            productListStore.getSearchResult(query, param).then(() => {
                setLoading(false);
                setItems(productListStore.productList)
            })
        }





    }, [query])



    function showProductInfo(id) {
        window.open('/productInfo/' + id.toString())
    }

    async function addStartProduct(id, startDiscount, startQty, startPrice) {
        console.log('startQty ' +startQty);
        await startProductsStore.addStartProduct(id, startDiscount, startQty, startPrice).then(() => {

            console.log('Добавили id '+id);

        })

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
            setLoading(true);
            const param = {catalogIdList :[ parseInt(catalogId)], idCount: idCount,
                filters : {isXsubjectFilterChecked : isXsubjectFilterChecked, xSubjectIdArray : xSubjectIdArray,
                    usePriceMin : usePriceMin, priceMin : productListStore.priceUFilter.min,
                    usePriceMax : usePriceMax, priceMax : productListStore.priceUFilter.max,}
            }

            productListStore.getProductList(param).then(() => {
                setLoading(false);
                // setItems(productListStore.productList)
                sortData()
            })
        }
        else if (query){
            const param = {idCount: idCount,
                filters : {isXsubjectFilterChecked : isXsubjectFilterChecked, xSubjectIdArray : xSubjectIdArray,
                    usePriceMin : usePriceMin, priceMin : productListStore.priceUFilter.min,
                    usePriceMax : usePriceMax, priceMax : productListStore.priceUFilter.max,}
            }

            setLoading(true);
            productListStore.getSearchResult(query, param).then(() => {
                // setItems(productListStore.productList)
                sortData()
                setLoading(false);
            })
        }




    }

    function sortData() {
        setItems([])
        let sortKey = sortSelectedCategory?.key? parseInt(sortSelectedCategory?.key) : 1
        productListStore.sortProducts(sortKey).then(() => {
            setItems(productListStore.productList)
        })

    }


    return (
        <div className="">
            {loading ?
                <div>
                    <div style={{paddingTop: '20px', paddingLeft: '40px', textAlign:'center'}} >
                        <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                         fill="var(--surface-ground)" animationDuration=".9s"/>
                        <p>Загружаем товары</p>
                    </div>

                </div>
                :
                <div className=" flex align-items-center">
                    <h3 style={{marginLeft: '20px'}}>{query}</h3>
                    <p style={{
                        marginTop: '10px',
                        marginLeft: '20px',
                        fontSize: '16px',
                        color: '#83839a'
                    }}>{productListStore.productList.length} товаров со скидками найдено</p>
                </div>

            }

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

                {/*Глубина аналитики*/}
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

                {/*Категории*/}
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

                {/*Цена */}
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

                {/*Сортировка*/}
                <button className="filter_button" onClick={(e) => sort_op.current.toggle(e)}> Сортировка
                    <img className="down_icon" src={downSvg} width="12" height="12" loading="lazy"/>
                </button>
                <OverlayPanel ref={sort_op}>
                    <div className="flex flex-column gap-3">
                        {sort_categories.map((category) => {
                            return (
                                <div key={category.key} className="flex align-items-center">
                                    <RadioButton inputId={category.key} name="category" value={category}
                                                 onChange={(e) => {
                                                     setSortSelectedCategory(e.value)
                                                 }}
                                                 checked={sortSelectedCategory.key === category.key}/>
                                    <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                </div>
                            );
                        })}
                        <button className="filter_button_ok" onClick={(e) => {
                            sort_op.current.toggle(e)
                            sortData()
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


                        <div key={item.id} className=" item ">

                            <img src={item.photoUrl} onClick={() => showProductInfo(item.id)}  alt="..."/>
                            <div className="card-body" onClick={() => showProductInfo(item.id)}>
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
                        </div>


                )
                }


            </div>
            <div className="card">
                <Paginator first={first} rows={rows} totalRecords={items.length} rowsPerPageOptions={[50, 100]}
                           onPageChange={onPageChange}/>
            </div>
        </div>
    );
};

export default ProductList;
