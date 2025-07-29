import React, {useContext, useState} from 'react';
import {Button} from "primereact/button";
import {useEffect} from "react";
import { Message } from 'primereact/message';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Card } from 'primereact/card';
import { ScrollTop } from 'primereact/scrolltop';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';

const Training = observer(  () => {
    const {serverUpdateStore} = useContext(Context)
    const [allMessages, setAllMessages] = useState([])
    const eventSource = new EventSource('http://localhost:5006/sse');

    // Состояния комманд
    const [loadNewProductsOn, setLoadNewProductsOn] = useState(false);
    const [loadPageCount, setLoadPageCount] = useState(20);
    const [loadOnlyNew, setLoadOnlyNew] = useState(true);

    useEffect(() => {

        // Прием сообщений от сервера - обнвление данных для админки
        eventSource.onmessage = (event) => {
            try {
                serverUpdateStore.setIsServerOpen(true)
                const newData = JSON.parse(event.data);
                serverUpdateStore.addServerMessages(newData)
                showEndMessage()
            } catch (e) {
                console.log('ошибка'+e);
            }
        };

        eventSource.onerror = (err) => {
            serverUpdateStore.setIsServerOpen(false)
            console.error("В EventSource произошла ошибка:", err); }
    }, []);


    function showEndMessage() {
        // console.log('showEndMessage');
        // let newMessages = []
        // for (let i in serverUpdateStore.newServerMessages) {
        //     newMessages.push(serverUpdateStore.newServerMessages[i].message.toString())
        // }
        //
        // setAllMessages(newMessages)
    }

    function clearEndMessage() {
        serverUpdateStore.clearNewServerMessages()
        setAllMessages([])
    }


    function showAllMessage() {
        let newMessages = []
        for (let i in serverUpdateStore.allServerMessages)
            newMessages.push(serverUpdateStore.allServerMessages[i].message.toString())
        serverUpdateStore.setNewMessagesAsAll()
        setAllMessages(newMessages)

    }

    async function starLoadNewProducts() {

        setLoadNewProductsOn(!loadNewProductsOn)
        console.log('Отправляем команду на сервер starLoadNewProducts');
        console.log('Состояние '+!loadNewProductsOn);
        console.log('Глубина страниц '+loadPageCount);
        console.log('Только новые? '+loadOnlyNew);
        await serverUpdateStore.loadNewProducts(!loadNewProductsOn, loadPageCount, loadOnlyNew)

    }

    return (
        <div className="page">
            {
                serverUpdateStore.isServerOpen ?
                    <Message severity="success" text="Сервер работает"/>
                    : <Message severity="error" text="Ошибка соединения"/>
            }

            <div style={{paddingTop: '22px'}} className="card flex flex-wrap  gap-3 ">

                <Button style={{height: '22px', fontSize: '14px'}}
                        severity={loadNewProductsOn ? "success" : "secondary"} label="Загрузка новых товаров"
                        icon={loadNewProductsOn ? "pi pi-check" : ""} onClick={(e) => starLoadNewProducts()}/>
                <p style={{fontSize: '14px', paddingLeft:'20px'}} className="m-0">Кол-во страниц</p>
                <InputNumber style={{height: '22px'}} value={loadPageCount}
                             onValueChange={(e) => setLoadPageCount(e.value)} useGrouping={false}/>
                <p style={{fontSize: '14px', paddingLeft:'20px'}} className="m-0">Загружать только новые</p>
                <Checkbox onChange={e => setLoadOnlyNew(e.checked)} checked={loadOnlyNew}></Checkbox>

            </div>

            <div className="card">
                <p style={{fontSize: '14px'}} className="m-0" >{serverUpdateStore.newServerMessages}</p>
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