import React, {useContext, useState} from 'react';
import {Button} from "primereact/button";
import {useEffect} from "react";
import { Message } from 'primereact/message';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Card } from 'primereact/card';
import { ScrollTop } from 'primereact/scrolltop';

const Training = observer(  () => {
    const {serverUpdateStore} = useContext(Context)
    const [allMessages, setAllMessages] = useState([])
    const eventSource = new EventSource('http://localhost:5006/sse');

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
        let newMessages = []
        for (let i in serverUpdateStore.newServerMessages) {
            newMessages.push(serverUpdateStore.newServerMessages[i].message.toString())
        }

        setAllMessages(newMessages)
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


    return (
        <div className="page">
            {
                serverUpdateStore.isServerOpen ?
                    <Message severity="success" text="Сервер работает"/>
                    : <Message severity="error" text="Ошибка соединения"/>
            }
            <div className="card flex flex-wrap justify-content-center gap-3">
                <Button onClick={() => clearEndMessage()} label="Очистить" text />
                <Button onClick={() => showEndMessage()} label="Последние сообщения" text />
                <Button onClick={() => showAllMessage()} label="Все сообщения" text/>
            </div>

            <div className="card">
                <div style={{width: '250px', height: '200px', 'overflow': 'auto'}}>
                    {allMessages.map((text, idx) =>
                        <p style={{fontSize: '14px'}} className="m-0" key={idx}>{text}</p>
                    )}
                </div>
                <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
            </div>

        </div>
    );
});

export default Training;