import React, {useContext, useState} from 'react';
import {Button} from "primereact/button";
import {useEffect} from "react";
import { Message } from 'primereact/message';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";


const Training = observer(  () => {
    const {serverUpdateStore} = useContext(Context)

    const [showAllTaskVisible, setShowAllTaskVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Состояния комманд
    const [loadPageCount, setLoadPageCount] = useState(20);
    const [loadOnlyNew, setLoadOnlyNew] = useState(true);
    const [loadNewProductsHistoryVisible, setLoadNewProductsHistoryVisible] = useState(false);
    const [deleteDuplicateIDHistoryVisible, setDeleteDuplicateIDHistoryVisible] = useState(false);
    const [setNoUpdateProductsVisible, setSetNoUpdateProductsVisible] = useState(false);


    useEffect(() => {
        // console.log('Запросили стартовое состояние')
        serverUpdateStore.getCurrServerInfo().then(() => {})
        const timer = setInterval(() => {
            // console.log('Запросили промежуточное состояние')
            serverUpdateStore.getCurrServerInfo().then(() => {})
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    async function startLoadNewProducts() {
        serverUpdateStore.loadNewProducts(loadPageCount, loadOnlyNew).then(() => {})
    }

    async function getAllProductCount() {
        serverUpdateStore.getAllProductCount().then(() => {})
    }

    async function startDeleteDuplicateID() {
        serverUpdateStore.deleteDuplicateID().then(() => {})
    }


    async function startSetNoUpdateProducts() {
        serverUpdateStore.setNoUpdateProducts().then(() => {})
    }

    async function getWBCatalog_fromWB() {
        serverUpdateStore.getWBCatalog_fromWB().then(() => {})
    }




    async function loadAndShowAllTask(needDelete = false) {
        let deleteIdList = []
        if (needDelete)  for (let i in selectedTask) deleteIdList.push(parseInt(selectedTask[i].id))
        await serverUpdateStore.loadAllTask(deleteIdList).then(() => {})
        setSelectedTask(null)
        setShowAllTaskVisible(true)
    }

    return (

        <div className="page ">
            <div className="flex">
                {serverUpdateStore.GlobalState?.isServerWork ? <Message severity="success" text="Сервер работает"/> :
                    <Message severity="error" text="Ошибка соединения"/>}
                <p style={{fontSize: '14px', paddingLeft: '20px', paddingTop: '14px'}}
                   className="m-0">{serverUpdateStore.GlobalState?.serverStartMessage}</p>
                <Button severity="secondary"
                        style={{height: '22px', fontSize: '14px', marginLeft: '20px', marginTop: '10px'}}
                        icon="pi pi-bars" onClick={() => loadAndShowAllTask()}/>
                <Dialog header="Текущие задачи" visible={showAllTaskVisible} style={{width: '70vw', height: '70vw'}}
                        onHide={() => {
                            if (!showAllTaskVisible) return;
                            setShowAllTaskVisible(false);
                        }}>
                    <div>
                        <Button severity="secondary" label="Удалить"
                                style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                                onClick={() => loadAndShowAllTask(true)}/>
                        <div style={{width: '100%', height: '100%', 'overflow': 'auto', paddingTop: '10px'}}>
                            <DataTable style={{fontSize: '14px'}} value={serverUpdateStore.allTask} size={'small'}
                                       className="dataTable"
                                       selection={selectedTask}
                                       onSelectionChange={(e) => setSelectedTask(e.value)}
                            >

                                <Column selectionMode="multiple" field="id" header="id"></Column>
                                <Column field="id" sortable header="id"></Column>
                                <Column field="taskName" sortable header="Задача"></Column>
                                <Column field="isEnd" sortable header="Завершена"></Column>
                                <Column field="endI" sortable header="Состояние"></Column>

                            </DataTable>


                        </div>
                    </div>

                </Dialog>
            </div>

             {/*Загрузка новых товаров*/}
            <div style={{paddingTop: '22px'}}>

                <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                    <Button style={{height: '22px', fontSize: '14px'}}
                            severity={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "success" : "secondary"}
                            label="Загрузка новых товаров"
                            icon={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "pi pi-check" : ""}
                            onClick={(e) => startLoadNewProducts()}

                    />

                    <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Кол-во страниц</p>
                    <InputNumber style={{height: '22px'}} value={loadPageCount}
                                 onValueChange={(e) => setLoadPageCount(e.value)} useGrouping={false}/>
                    <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Загружать только новые</p>
                    <Checkbox onChange={e => setLoadOnlyNew(e.checked)} checked={loadOnlyNew}></Checkbox>

                    <Button severity="secondary" style={{height: '22px', fontSize: '14px'}} icon="pi pi-bars"
                            onClick={() => setLoadNewProductsHistoryVisible(true)}/>
                    <Dialog header="История сообщений" visible={loadNewProductsHistoryVisible}
                            style={{width: '70vw', height: '70vw'}} onHide={() => {
                        if (!loadNewProductsHistoryVisible) return;
                        setLoadNewProductsHistoryVisible(false);
                    }}>
                        <div>
                            <Button severity="secondary" label="Очистить"
                                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                                    onClick={() => serverUpdateStore.loadNewProductsMessages.length = 0}/>
                            <div style={{width: '100%', height: '100%', 'overflow': 'auto', paddingTop: '10px'}}>
                                {serverUpdateStore.loadNewProductsMessages.map((text, idx) =>
                                    <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                                )}
                            </div>
                        </div>
                    </Dialog>

                </div>
                <div style={{paddingLeft: '260px'}}>
                    <p style={{fontSize: '14px'}} className="m-0">Текущие состояние
                        : {serverUpdateStore.GlobalState?.loadNewProducts?.endStateTime} {serverUpdateStore.GlobalState?.loadNewProducts?.endState}</p>
                </div>
            </div>

             {/*Установка needUpdate*/}
            <div style={{paddingTop: '2px'}}>
                <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                    <Button style={{height: '22px', fontSize: '14px'}}
                            severity={serverUpdateStore.GlobalState?.setNoUpdateProducts?.onWork ? "success" : "secondary"}
                            label="Установка needUpdate"
                            icon={serverUpdateStore.GlobalState?.setNoUpdateProducts?.onWork ? "pi pi-check" : ""}
                            onClick={(e) => startSetNoUpdateProducts()}

                    />

                    {/*<p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Кол-во страниц</p>*/}
                    {/*<InputNumber style={{height: '22px'}} value={loadPageCount}*/}
                    {/*             onValueChange={(e) => setLoadPageCount(e.value)} useGrouping={false}/>*/}
                    {/*<p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Загружать только новые</p>*/}
                    {/*<Checkbox onChange={e => setLoadOnlyNew(e.checked)} checked={loadOnlyNew}></Checkbox>*/}


                    <Button severity="secondary" style={{height: '22px', fontSize: '14px'}} icon="pi pi-bars"
                            onClick={() => setSetNoUpdateProductsVisible(true)}/>
                    <Dialog header="История сообщений setNoUpdateProducts" visible={setNoUpdateProductsVisible}
                            style={{width: '70vw', height: '70vw'}} onHide={() => {
                        if (!setNoUpdateProductsVisible) return;
                        setSetNoUpdateProductsVisible(false);
                    }}>
                        <div>
                            <Button severity="secondary" label="Очистить"
                                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                                    onClick={() => serverUpdateStore.setNoUpdateProductsMessages.length = 0}/>
                            <div style={{width: '100%', height: '100%', 'overflow': 'auto', paddingTop: '10px'}}>
                                {serverUpdateStore.setNoUpdateProductsMessages.map((text, idx) =>
                                    <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                                )}
                            </div>
                        </div>
                    </Dialog>

                </div>
                <div style={{paddingLeft: '260px'}}>
                    <p style={{fontSize: '14px'}} className="m-0">Текущие состояние
                        : {serverUpdateStore.GlobalState?.setNoUpdateProducts?.endStateTime} {serverUpdateStore.GlobalState?.setNoUpdateProducts?.endState}</p>
                </div>
            </div>

             {/*Удаление дубликатов*/}
            <div style={{paddingTop: '2px'}}>
                <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                    <Button style={{height: '22px', fontSize: '14px'}}
                            severity={serverUpdateStore.GlobalState?.deleteDuplicateID?.onWork ? "success" : "secondary"}
                            label="Удаление дубликатов"
                            icon={serverUpdateStore.GlobalState?.deleteDuplicateID?.onWork ? "pi pi-check" : ""}
                            onClick={(e) => startDeleteDuplicateID()}

                    />
                    <p style={{fontSize: '14px'}} className="m-0">Текущие состояние
                        : {serverUpdateStore.GlobalState?.deleteDuplicateID?.endStateTime} {serverUpdateStore.GlobalState?.deleteDuplicateID?.endState}</p>
                    <Button severity="secondary" style={{height: '22px', fontSize: '14px'}} icon="pi pi-bars"
                            onClick={() => setDeleteDuplicateIDHistoryVisible(true)}/>


                    <Dialog header="История сообщений deleteDuplicateID" visible={deleteDuplicateIDHistoryVisible}
                            style={{width: '70vw', height: '70vw'}} onHide={() => {
                        if (!deleteDuplicateIDHistoryVisible) return;
                        setDeleteDuplicateIDHistoryVisible(false);
                    }}>
                        <div>
                            <Button severity="secondary" label="Очистить"
                                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                                    onClick={() => serverUpdateStore.deleteDuplicateIDMessages.length = 0}/>
                            <div style={{width: '100%', height: '100%', 'overflow': 'auto', paddingTop: '10px'}}>
                                {serverUpdateStore.deleteDuplicateIDMessages.map((text, idx) =>
                                    <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                                )}
                            </div>
                        </div>
                    </Dialog>

                </div>

            </div>

             {/*Обновление остатков*/}
            <div style={{paddingTop: '2px'}}>
                <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                    <Button style={{height: '22px', fontSize: '14px'}}
                            severity={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "success" : "secondary"}
                            label="Обновление остатков"
                            icon={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "pi pi-check" : ""}
                            onClick={(e) => starLoadNewProducts()}

                    />

                    <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Кол-во страниц</p>
                    <InputNumber style={{height: '22px'}} value={loadPageCount}
                                 onValueChange={(e) => setLoadPageCount(e.value)} useGrouping={false}/>
                    <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Загружать только новые</p>
                    <Checkbox onChange={e => setLoadOnlyNew(e.checked)} checked={loadOnlyNew}></Checkbox>

                    <Button severity="secondary" style={{height: '22px', fontSize: '14px'}} icon="pi pi-bars"
                            onClick={() => setLoadNewProductsHistoryVisible(true)}/>
                    <Dialog header="История сообщений" visible={loadNewProductsHistoryVisible}
                            style={{width: '70vw', height: '70vw'}} onHide={() => {
                        if (!loadNewProductsHistoryVisible) return;
                        setLoadNewProductsHistoryVisible(false);
                    }}>
                        <div>
                            <Button severity="secondary" label="Очистить"
                                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                                    onClick={() => serverUpdateStore.loadNewProductsMessages.length = 0}/>
                            <div style={{width: '100%', height: '100%', 'overflow': 'auto', paddingTop: '10px'}}>
                                {serverUpdateStore.loadNewProductsMessages.map((text, idx) =>
                                    <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                                )}
                            </div>
                        </div>
                    </Dialog>

                </div>
                <div style={{paddingLeft: '260px'}}>
                    <p style={{fontSize: '14px'}} className="m-0">Текущие состояние
                        : {serverUpdateStore.GlobalState?.loadNewProducts?.endStateTime} {serverUpdateStore.GlobalState?.loadNewProducts?.endState}</p>
                </div>
            </div>

            <div style={{paddingTop: '2px'}}>
                <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">
                    <Button style={{height: '22px', fontSize: '14px'}}
                            severity="info"  label="Обновить каталог с ВБ"  onClick={(e) => getWBCatalog_fromWB()} />
                    <Button style={{height: '22px', fontSize: '14px'}}
                        severity="info"   label="Собрать информацию по ИД"   onClick={(e) => getAllProductCount()}  />
                </div>

            </div>


        </div>
    );
});

export default Training;