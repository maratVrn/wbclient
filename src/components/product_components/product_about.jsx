import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import { InputNumber } from 'primereact/inputnumber';
import {useNavigate} from "react-router-dom";
import 'primeicons/primeicons.css';
import { Tooltip } from 'primereact/tooltip';
import {calcDiscount} from "../math";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';


const ProductAbout = (props) => {
    const {id, isInWB} = props;
    const {userStore} = useContext(Context)
    const {productStore} = useContext(Context)
    const [info, setInfo] = useState([])
    const [discountInfo, setDiscountInfo] = useState({discount :0,  isDataCalc : false, meanPrice : 0})
    const [qty, setQty] = useState([])
    const [allQty, setAllQty] = useState(0);
    const navigate = useNavigate();
    const [addTrackDialog, setAddTrackDialog] = useState(false);
    const [priceTrackChecked, setPriceTrackChecked] = useState(true);
    const [priceStep, setPriceStep] = useState(100);
    const [countTrackChecked, setCountTrackChecked] = useState(false);
    const [minCount, setMinCount] = useState(10);
    const [selectedSizeTrack, setSelectedSizeTrack] = useState(null);
    const [addTrackChecked, setAddTrackChecked] = useState(false);
    const [needTelegramSend, setNeedTelegramSend] = useState(true);
    const [selectedSizeAddTrack, setSelectedSizeAddTrack] = useState(null);
    const [isTrackProduct, setIsTrackProduct] = useState(false);
    const {startProductsStore} = useContext(Context)






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
                // console.log(productStore.idInfo?.productInfo?.priceHistory);
                setInfo(productStore.idInfo.idInfoWB);

                setPriceStep(Math.round(productStore.idInfo.idInfoWB?.price*0.9))
                // Расчитаем остатки
                let allQty = []
                let allQtySum = 0
                const sizes =  productStore.idInfo?.idInfoWB?.sizes? productStore.idInfo?.idInfoWB?.sizes : []
                for (let k in sizes) {
                    let oneSize = {name: sizes[k].name, qty: 0}
                    for (let i in sizes[k].stocks)
                        try {
                            oneSize.qty += sizes[k].stocks[i].qty
                            allQtySum +=sizes[k].stocks[i].qty
                        } catch (e) {}
                    allQty.push(oneSize)
                }
                if (allQty.length > 0)  if (allQty.length > 1) {
                    setQty(allQty)

                }
                else {
                    setQty(allQty[0].qty)
                    setSelectedSizeTrack(0)
                    setSelectedSizeAddTrack(0)
                }
                setAllQty(allQtySum)
                setIsTrackProduct(userStore.isProductInTrackList(id))
            } catch (e){console.log(e)}

        }
    },[id, isInWB])

    function onWbClick(){
        productStore.userGoToBW().then()
        window.open(` https://www.wildberries.ru/catalog/${id}/detail.aspx`, '_blank');
    }

    function addTrack(){

        if (userStore.isLogin) {
            setAddTrackDialog(true);
        } else navigate('/login/')


    }

    async function addProductToTrack(){
        let needAdd = true

        if ((countTrackChecked) && (selectedSizeTrack === null)) { alert('Необходимо выбрать размер для отслеживания уменьшения остатков'); needAdd = false }
        if ((addTrackChecked) && (selectedSizeAddTrack === null)) {alert('Необходимо выбрать размер для отслеживания поступления товара'); needAdd = false}
        if ((!addTrackChecked) && (!countTrackChecked) && (!priceTrackChecked)) {alert('Необходимо выбрать задание на отслеживание'); needAdd = false}
        if ((addTrackChecked) && (selectedSizeAddTrack.qty>0 )) {alert('Остлеживать поступления товара можно только для размеров с нулевым остатком'); needAdd = false}
        // console.log(productStore?.idInfo?.productInfo?.priceHistory?.at(-1)?.sp);
        let endPrice = info?.price
        if ((endPrice === 0 ) && (productStore?.idInfo?.productInfo?.priceHistory?.at(-1)?.sp))
            endPrice = productStore?.idInfo?.productInfo?.priceHistory?.at(-1)?.sp

        if (needAdd) {
            let nawDay = new Date()
            const newAddProduct = {
                id: parseInt(id),
                needPriceTrack: priceTrackChecked,
                priceStep: priceStep,
                needCountTrack: countTrackChecked,
                selectedSizeTrack: selectedSizeTrack?.name? selectedSizeTrack?.name : '',
                minCount: minCount,
                needAddTrack: addTrackChecked,
                selectedSizeAddTrack: selectedSizeAddTrack?.name? selectedSizeAddTrack?.name : '',
                startPrice: endPrice,
                name : productStore.idInfo?.idInfoWB?.name,
                photoUrl: productStore?.photoUrlArray[0] ? productStore?.photoUrlArray[0] : '',
                endUpdateDT : nawDay.toLocaleTimeString(),
                endPrice : endPrice,
                endCount : selectedSizeTrack?.qty? selectedSizeTrack?.qty : 0,
                addCount : selectedSizeAddTrack?.qty? selectedSizeAddTrack?.qty : 0,
                needTelegramSend : needTelegramSend,
                qty : qty
            }

            userStore.addProductToTrack(newAddProduct).then(() => {
                if (userStore.commandOk) {
                    alert('Товар успешно добавлен для отслеживания');
                    setIsTrackProduct(true)
                    setAddTrackDialog(false);
                }
            })


        }

    }
    const qtyItemTemplate = (option) => {
        return (
            <div className="flex justify-content-between">
                <span>{option.name}</span>
                <span style={{ marginLeft: '5px', color: '#888' }}>( {option.qty} )</span>
            </div>
        );
    };

    return (

        <div>

            {isInWB ?
                <div>
                    {/*<div className="product_name">catalogId {productStore.idInfo.idInfo.catalogId}</div>*/}

                    <div className="product_name">{productStore.idInfo?.idInfoWB?.name}</div>

                    <div className="card-price">
                        <div className="price-low " style={{marginLeft: '10px'}}>
                            <span>{info?.price > 0 ? info.price : 'Нет в наличии'} ₽ </span>
                            <span
                                className="product-brand"> {info?.price > 0 ? 'цена на WB сейчас без учета wb-кошелька' : ''} </span>
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
                                            className="spanGreen"> {discountInfo.meanPrice} ₽</span>
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
                                                    className="spanGreen"> {discountInfo.discount} %   ( {discountInfo.meanPrice - info?.price} ₽)</span>
                                            </>
                                            :
                                            <span
                                                className="spanRed"> Цена Завышена на: {-1 * discountInfo.discount} %  (наценка {info?.price - discountInfo.meanPrice} ₽) </span>
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
                    <div className="product-order" onClick={() => onWbClick()}>
                        Перейти на Wildberries
                    </div>

                    { isTrackProduct?
                        <div className="product-order-in">
                            <i className="pi pi-thumbs-up" style={{fontSize: '1.2rem', marginRight: '10px'}}></i>
                            Товар отслеживается
                        </div>
                        :
                        <div className="product-order" onClick={() => addTrack()}>
                            Отслеживать цену и остатки
                        </div>


                    }
                    {userStore.role === "ADMIN" ? <>
                        <div className="product-order" onClick={() => startProductsStore.addStartProduct(id, discountInfo.discount, allQty, info.price,
                            productStore?.idInfo?.productInfo?.priceHistory? productStore?.idInfo?.productInfo?.priceHistory : [])}>

                            Добавить в стартовый товар
                        </div>

                    </> : <></>}

                    <Dialog header="Добавить Артикул для отслеживания" visible={addTrackDialog}
                            style={{width: '500px'}} onHide={() => {
                        if (!addTrackDialog) return;
                        setAddTrackDialog(false);
                    }}>
                        <div>
                            <div className="flex align-items-center align-content-center text-center p-2">
                                <Checkbox onChange={e => setPriceTrackChecked(e.checked)}
                                          checked={priceTrackChecked}></Checkbox>
                                <label className="ml-2">Уменьшение цены до</label>
                                <InputNumber className="ml-2" style={{width: '100px'}} value={priceStep}
                                             onValueChange={(e) => setPriceStep(e.value)}/>
                                <label className="ml-2">рублей </label>

                            </div>




                            {
                                qty.length > 1 ?
                                    <>
                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <Checkbox onChange={e => setCountTrackChecked(e.checked)}
                                                      checked={countTrackChecked}></Checkbox>
                                            <label className="ml-2">Уменьшение остатка до </label>
                                            <InputNumber className="ml-2" style={{width: '100px'}} value={minCount}
                                                         onValueChange={(e) => setMinCount(e.value)}/>
                                            <label className="ml-2">штук </label>
                                        </div>

                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <label className="ml-4 mr-2">для размера</label>
                                            <Dropdown className="ml-2 " value={selectedSizeTrack}
                                                      onChange={(e) => setSelectedSizeTrack(e.value)} options={qty}
                                                      optionLabel="name"
                                                      placeholder="Выбрать" className="w-full md:w-14rem"
                                                      itemTemplate={qtyItemTemplate}/>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {qty === 0 ?
                                            <></>
                                            :
                                            <div
                                                className="flex align-items-center align-content-center text-center p-2">
                                                <Checkbox onChange={e => setCountTrackChecked(e.checked)}
                                                          checked={countTrackChecked}></Checkbox>
                                                <label className="ml-2">Уменьшение остатка до </label>
                                                <InputNumber className="ml-2" style={{width: '100px'}} value={minCount}
                                                             onValueChange={(e) => setMinCount(e.value)}/>
                                                <label className="ml-2">штук </label>
                                            </div>


                                        }
                                    </>
                            }


                            {
                                qty.length > 1 ?
                                    <>
                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <Checkbox onChange={e => setAddTrackChecked(e.checked)}
                                                      checked={addTrackChecked}></Checkbox>
                                            <label className="ml-2">Отслеживать поступление товара</label>
                                        </div>

                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <label className="ml-4 mr-2">для размера</label>
                                            <Dropdown className="ml-2 "
                                                      value={selectedSizeAddTrack}
                                                      onChange={(e) => setSelectedSizeAddTrack(e.value)}
                                                      options={qty} optionLabel="name"
                                                      itemTemplate={qtyItemTemplate}
                                                      placeholder="Выбрать" className="w-full md:w-14rem"/>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {qty === 0 ?
                                            <div
                                                className="flex align-items-center align-content-center text-center p-2">
                                                <Checkbox onChange={e => setAddTrackChecked(e.checked)}
                                                          checked={addTrackChecked}></Checkbox>
                                                <label className="ml-2">Отслеживать поступление товара</label>
                                            </div>
                                            :
                                            <></>
                                        }
                                    </>
                            }
                            <div className="flex align-items-center align-content-center text-center p-2">
                                <Checkbox onChange={e => setNeedTelegramSend(e.checked)}
                                          checked={needTelegramSend}></Checkbox>
                                <label className="ml-2">Отправлять информацию в телеграм бот</label>
                                <Tooltip target=".custom-target-icon" style={{fontSize: '12px'}}/>
                                <i className="custom-target-icon pi pi-info-circle "
                                   data-pr-tooltip="Настроить телеграм бот можно в личном кабинете"
                                   style={{fontSize: '1.1rem', cursor: 'pointer', marginLeft: '10px', color: 'tan'}}>

                                </i>
                            </div>

                            <p>Обновление всех данных происходит 1 раз в час. Список всех товаров, которые вы
                                отслеживаете, а также индивидуальные настройки можно посмотреть в личном кабинете
                            </p>
                            <p>При достижении цели отслеживания
                                соответствующая "галочка" автоматически убирается чтобы не повторять сообщения в Telegram бот
                            </p>

                            <div className="flex flex-column align-items-center text-center">
                                <Button label="Добавить" onClick={() => addProductToTrack()}
                                />
                            </div>
                        </div>

                    </Dialog>


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