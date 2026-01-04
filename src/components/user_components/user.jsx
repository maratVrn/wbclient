import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Checkbox} from "primereact/checkbox";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";

const User = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();
    const [trackProducts, setTrackProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null); // Для чекбоксов
    const [activeRow, setActiveRow] = useState(null); // Для подсветки строки кликом
    const [showDialog, setShowDialog] = useState(false);
    const [photoDialog, setPhotoDialog] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedSizeTrack, setSelectedSizeTrack] = useState(null);
    const [selectedSizeAddTrack, setSelectedSizeAddTrack] = useState(null);
    useEffect(()=>{
        if (!userStore.isLogin) navigate('/login')
        console.log('useEffect loadTrackProducts');
        loadTrackProducts()
    }, [])

    function loadTrackProducts (needDelete = false) {
        setSelectedProducts(null)
        let deleteIdList = []
        if (needDelete) for (let i in selectedProducts) deleteIdList.push(parseInt(selectedProducts[i].id))
        setTrackProducts([])
        userStore.loadAllTrackProducts( needDelete, deleteIdList).then(() => {
            setTrackProducts(userStore.allTrackProducts)
            }
        )
    }

    const logout = () => {
        userStore.logout()
        navigate('/login')
    };
    const imageBodyTemplate = (product) => {

        return (
            <img
                className="little_photo"
                src={product.photoUrl}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setSelectedPhoto(product.photoUrl);
                    setPhotoDialog(true);
                }}
                alt="thumbnail"
            />
        );

    };



    const onRowDoubleClick = (e) => {
        // Открываем диалог (двойной клик)
        setActiveRow(e.data);
        setSelectedSizeTrack(e.data.selectedSizeTrack)
        setSelectedSizeAddTrack(e.data.selectedSizeAddTrack)
        setShowDialog(true);
    };

    const saveCurTrackProductData= ()=> {

        activeRow.selectedSizeTrack = selectedSizeTrack
        activeRow.selectedSizeAddTrack = selectedSizeAddTrack

        userStore.saveCurTrackProductData(activeRow).then(() => {
            alert(`Данные успешно сохранены!`);
            setTrackProducts(userStore.allTrackProducts)
            setShowDialog(false)
        })


    }

    const priceAddTemplate = (product) => {
       const addPrice = product.startPrice - product.endPrice
        return <>
            {addPrice >= 0 ?
                < div style= {{color:'green'}}>
                    <span style={{ color: 'green', marginRight: '5px', fontSize: '1.2em' }}>↓</span>
                    {addPrice}
                </div>
                :
                < div style={{color:'red'}}>
                    <span style={{color: '#red', marginRight: '5px', fontWeight: '600', display: 'inline-block',}}>↑ </span>
                    {-1*addPrice}
                </div>

            }
        </>

    };

    const qtyItemTemplate = (option) => {
        return (
            <div className="flex justify-content-between">
                <span>{option.name}</span>
                <span style={{ marginLeft: '5px', color: '#888' }}>( {option.qty} )</span>
            </div>
        );
    };

    const qtyTemplate = (product) => {
        let selectedTrack = null
        if (product.qty.length > 1) {
            for (let i in product.qty)
                if (product.qty[i].name === product.selectedSizeTrack) {
                    selectedTrack = product.qty[i].name + ' (' + product.qty[i].qty + ')'
                    break
                }
            if (!selectedTrack) selectedTrack =  product.qty[0].name + ' (' + product.qty[0].qty + ')'
        }

        return <>
            {
                product.qty.length > 1 ?
                    <div
                        // className="flex align-items-center align-content-center text-center p-2"
                        >

                        <Dropdown //className="ml-2 "
                                  value={selectedTrack}
                                  onChange={(e) => selectedTrack = e.value}
                                  options={product.qty}
                                  itemTemplate={qtyItemTemplate}
                                  optionLabel="name"
                                  placeholder={selectedTrack} className="w-full md:w-14rem"/>
                    </div>
                    :
                    <>{product.qty}</>
            }
        </>

    };

    const idShowTemplate = (product) => {
        const url = '/productInfo/' + product.id.toString()
        return <div  >
            {product.id}
            <div className="flex">
                <div
                    onClick={() => window.open(` https://www.wildberries.ru/catalog/${id}/detail.aspx`, '_blank')}
                    className=" border-round-xl px-2 py-2"
                    style={{
                        background: 'linear-gradient(135deg, #cb11ab 0%, #481173 100%)',
                        width: 'fit-content', cursor: 'pointer', marginTop: '3px'
                    }}
                >
                <span className="text-white text-1xl font-bold border-none" style={{letterSpacing: '-2px'}}>
                    WB
                </span>
                </div>

                <div
                    onClick={() => window.open(url, '_blank', 'noreferrer')}
                    className=" border-round-xl px-2 py-2"
                    style={{
                        background: 'linear-gradient(135deg, #26282AFF 0%, #4A85BFFF 100%)',
                        width: 'fit-content', cursor: 'pointer', marginTop: '3px' , marginLeft: '5px'
                    }}
                >
                <span className="text-white text-1xl font-bold border-none" style={{letterSpacing: '-2px'}}>
                    wb.sale
                </span>
                </div>

            </div>
        </div>

    };

    const updateAllTrackProducts = () =>{
        userStore.updateAllTrackProducts().then(() => {

        })
    }
    return (
        <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '30px'}}>

            {userStore.isLogin ?
                <div>
                    {userStore.role === "ADMIN" ? <>
                        <Button severity="secondary" label="Статистика пользователей"
                                style={{height: '28px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                                onClick={() => navigate('/userStat')}/>
                        <Button severity="secondary" label="Стартовые товары"
                                style={{height: '28px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                                onClick={() => navigate('/startProducts')}/>
                        <Button severity="secondary" label="Каталог и категории"
                                style={{height: '28px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                                onClick={() => navigate('/subjects')}/>
                        <Button severity="secondary" label="Управление сервером"
                                style={{height: '28px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                                onClick={() => navigate('/training')}/>
                        <Button severity="secondary" label="Обновить TrackProducts"
                                style={{height: '28px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                                onClick={() => updateAllTrackProducts()}/>


                    </> : <></>}

                    <h2> {userStore.userName} </h2>
                    <span onClick={logout} className="toggle-link">Выйти </span>

                    <div className="flex-grow-1  border-1  p-1 m-2 border-round">

                        <Button severity="secondary" label="Удалить выбранные"
                                style={{height: '34px', fontSize: '16px', marginBottom: '10px', marginTop: '5px'}}
                                onClick={() => loadTrackProducts(true)}
                        />
                        <DataTable
                            value={trackProducts}
                            selection={selectedProducts}
                            onSelectionChange={(e) => setSelectedProducts(e.value)}
                            selectionMode="checkbox"
                            dataKey="id"
                            onRowDoubleClick={onRowDoubleClick}
                            rowHover>
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                            <Column header="Фото" body={imageBodyTemplate}></Column>
                            <Column body={idShowTemplate} header="id"></Column>
                            <Column field="endUpdateDT" header="Время обновления"></Column>
                            <Column field="startPrice" header="Стартовая цена"></Column>
                            <Column field="endPrice" header="Текущая цена"></Column>
                            <Column body={priceAddTemplate}  header="Изменение цены"></Column>
                            <Column body={qtyTemplate} header="Остатки"></Column>



                        </DataTable>

                        <Dialog visible={showDialog} onHide={() => setShowDialog(false)} header="Настройки">
                            {activeRow?
                                <>
                                    <div className="flex">
                                        <img
                                            className="little_photo w-6rem p-2"
                                            src={activeRow?.photoUrl ? activeRow?.photoUrl : ''}
                                            alt="thumbnail"
                                        />
                                        <div className="p-2">
                                            <p>{activeRow.name}</p>
                                            <p>ID товара {activeRow.id} </p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <Checkbox onChange={e => activeRow.needPriceTrack =  e.checked}
                                                      checked={activeRow.needPriceTrack}></Checkbox>
                                            <label className="ml-2">Уменьшение цены на</label>
                                            <InputNumber className="ml-2" style={{width: '100px'}} value={activeRow.priceStep}
                                                         onValueChange={(e) => activeRow.priceStep = e.value}/>
                                            <label className="ml-2">рублей </label>

                                        </div>


                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <Checkbox onChange={e => activeRow.needCountTrack =  e.checked}
                                                      checked={activeRow.needCountTrack}></Checkbox>
                                            <label className="ml-2">Уменьшение остатка до </label>
                                            <InputNumber className="ml-2" style={{width: '100px'}} value={activeRow.minCount}
                                                         onValueChange={(e) => activeRow.minCount = e.value}/>
                                            <label className="ml-2">штук </label>
                                        </div>

                                        {
                                            activeRow.qty.length > 1 ?
                                                <div className="flex align-items-center align-content-center text-center p-2">
                                                    <label className="ml-4 mr-2">для размера</label>
                                                    <Dropdown className="ml-2 "  value={selectedSizeTrack} onChange={(e) => setSelectedSizeTrack(e.value.name)}
                                                              options={activeRow.qty} optionLabel="name"
                                                              placeholder={selectedSizeTrack} className="w-full md:w-14rem" />
                                                </div>
                                                :
                                                <></>
                                        }


                                        <div className="flex align-items-center align-content-center text-center p-2">
                                            <Checkbox onChange={e => activeRow.needAddTrack = e.checked}
                                                      checked={activeRow.needAddTrack}></Checkbox>
                                            <label className="ml-2">Отслеживать поступление товара</label>
                                        </div>
                                        {
                                            activeRow.qty.length > 1 ?
                                                <div
                                                    className="flex align-items-center align-content-center text-center p-2">
                                                    <label className="ml-4 mr-2">для размера</label>
                                                    <Dropdown className="ml-2 " value={selectedSizeAddTrack}
                                                              onChange={(e) => setSelectedSizeAddTrack(e.value)}
                                                              options={activeRow.qty} optionLabel="name"
                                                              placeholder={selectedSizeAddTrack} className="w-full md:w-14rem"/>
                                                </div>
                                                :
                                                <></>
                                        }





                                    </div>

                                    <div className="flex flex-column align-items-center text-center">
                                        <Button label="Сохранить изменения" onClick={() => saveCurTrackProductData()}/>
                                    </div>
                                </>
                                : <></>}


                        </Dialog>
                        <Dialog

                            visible={photoDialog}
                            onHide={() => setPhotoDialog(false)}
                            dismissableMask // закрытие при клике по области вне окна
                        >
                            {selectedPhoto && (
                                <img src={selectedPhoto} alt="Full size" style={{width: '100%'}}/>
                            )}
                        </Dialog>
                    </div>


                </div>
                :
                <></>
            }


        </div>
    );
});

export default User;