import React, {useContext, useState} from 'react';
import {Button} from "primereact/button";
import {useEffect} from "react";
import { Message } from 'primereact/message';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';


const Training = observer(  () => {
    const {serverUpdateStore} = useContext(Context)

    // Состояния комманд
    const [loadPageCount, setLoadPageCount] = useState(20);
    const [loadOnlyNew, setLoadOnlyNew] = useState(true);
    const [loadNewProductsHistoryVisible, setLoadNewProductsHistoryVisible] = useState(false);

    useEffect(() => {

        console.log('Запросили стартовое состояние')
        serverUpdateStore.getCurrServerInfo().then(() => {
            console.log(' пришел ответ стартового состояния');
        })



        const timer = setInterval(() => {
            console.log('Запросили промежуточное состояние')

            serverUpdateStore.getCurrServerInfo().then(() => {

                // setServerData(serverUpdateStore.GlobalState)

            })
        }, 5000);
        return () => clearTimeout(timer);


    }, []);

    //
    // function showEndMessage() {
    //     // console.log('showEndMessage');
    //     // let newMessages = []
    //     // for (let i in serverUpdateStore.newServerMessages) {
    //     //     newMessages.push(serverUpdateStore.newServerMessages[i].message.toString())
    //     // }
    //     //
    //     // setAllMessages(newMessages)
    // }
    //
    // function clearEndMessage() {
    //     serverUpdateStore.clearNewServerMessages()
    //     setAllMessages([])
    // }


    // function showAllMessage() {
    //     let newMessages = []
    //     for (let i in serverUpdateStore.allServerMessages)
    //         newMessages.push(serverUpdateStore.allServerMessages[i].message.toString())
    //     serverUpdateStore.setNewMessagesAsAll()
    //     setAllMessages(newMessages)
    //
    // }

    async function starLoadNewProducts() {


        console.log('Отправляем команду на сервер starLoadNewProducts');
        console.log('loadPageCount = '+loadPageCount);
        serverUpdateStore.loadNewProducts(loadPageCount, loadOnlyNew).then(() => {})

    }
    return (
        <div className="page">
            {
                serverUpdateStore.GlobalState?.isServerWork ?
                    <Message severity="success" text="Сервер работает"/>
                    : <Message severity="error" text="Ошибка соединения"/>
            }

            <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                <Button style={{height: '22px', fontSize: '14px'}}
                        severity={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "success" : "secondary"}
                        label="Загрузка новых товаров"
                        icon={serverUpdateStore.GlobalState?.loadNewProducts?.onWork ? "pi pi-check" : ""}
                        onClick={(e) => starLoadNewProducts()}

                />

                <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Кол-во страниц</p>
                <InputNumber style={{height: '22px'}} value={loadPageCount}
                             onValueChange={(e) => setLoadPageCount(e.value)} useGrouping={false}/>
                <p style={{fontSize: '14px', paddingLeft: '20px'}} className="m-0">Загружать только новые</p>
                <Checkbox onChange={e => setLoadOnlyNew(e.checked)} checked={loadOnlyNew}></Checkbox>

                <Button  severity="secondary" style={{height: '28px', fontSize: '16px'}} icon="pi pi-bars" onClick={() => setLoadNewProductsHistoryVisible(true)} />
                <Dialog header="История сообщений" visible={loadNewProductsHistoryVisible} style={{ width: '70vw', height:'70vw' }} onHide={() => {if (!loadNewProductsHistoryVisible) return; setLoadNewProductsHistoryVisible(false); }}>
                    <div >
                        <Button severity="secondary"  label="Очистить" style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop:'5px'}}
                                onClick={() => serverUpdateStore.loadNewProductsMessages.length = 0}/>
                        <div style={{width: '100%', height: '100%',  'overflow': 'auto', paddingTop: '10px'}}>
                            {serverUpdateStore.loadNewProductsMessages.map((text, idx) =>
                                <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                            )}
                        </div>
                    </div>
                </Dialog>

            </div>
            <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">
                <p style={{fontSize: '14px', paddingTop: '5px'}} className="m-0">Текущие состояние
                    : {serverUpdateStore.GlobalState?.loadNewProducts?.endStateTime} {serverUpdateStore.GlobalState?.loadNewProducts?.endState}</p>

            </div>

            <div className="card">
            <p style={{fontSize: '14px'}} className="m-0">{serverUpdateStore.newServerMessages}</p>
                {/*<div style={{width: '250px', height: '200px', 'overflow': 'auto'}}>*/}
                {/*    {allMessages.map((text, idx) =>*/}
                {/*        <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>*/}
                {/*    )}*/}
                {/*</div>*/}
                {/*<ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary"*/}
                {/*           icon="pi pi-arrow-up text-base"/>*/}
            </div>

        </div>
    );
});

export default Training;