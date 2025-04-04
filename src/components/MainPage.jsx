import React, {useContext, useRef, useState} from 'react';
import './page.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";


const MainPage = () => {
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const toast = useRef(null);

    const [wbid, setWbId] = useState('141353735');
    const [cat1, setCat1] = useState('10000');
    const [cat2, setCat2] = useState('17153');

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    function duplicateTest(){
        catalogStore.duplicateTest(wbid, cat1, cat2).then()
    }

    function searchTest() {
        console.log('searchTest');
        catalogStore.searchTest().then(() => {



            }
        )
    }
    return (
        <div className="page" onClick={() => globalStore.setAllMenuActive(false)}>
            {/*<p> Отправка файла на сервер</p>*/}
            {/*<div style={{display: 'flex'}}>*/}
            {/*    <button onClick={() => searchTest()}> Статистика запросов</button>*/}
            {/*    <h1>{catalogStore.currId}</h1>*/}
            {/*    <Toast ref={toast}></Toast>*/}
            {/*    <FileUpload mode="basic" name="wordsfile" url="http://localhost:5000/api/uploadNewWordStatisticData"*/}
            {/*                accept="image/*" maxFileSize={100_000_000} onUpload={onUpload}/>*/}
            {/*</div>*/}

            <p> Проработка дубликата</p>
            <div style={{display: 'flex'}}>

                <div style={{paddingLeft: '40px', width: '200px'}}>
                    ИД Товара <InputText style={{width: '150px'}} value={wbid}
                                         onChange={(e) => setWbId(e.target.value)}/>
                </div>
                <div style={{paddingLeft: '40px', width: '200px'}}>
                    ИД Каталога 1 <InputText style={{width: '150px'}} value={cat1}
                                             onChange={(e) => setCat1(e.target.value)}/>
                </div>
                <div style={{paddingLeft: '40px', width: '200px'}}>
                    ИД Каталога 2 <InputText style={{width: '150px'}} value={cat2}
                                             onChange={(e) => setCat2(e.target.value)}/>
                </div>
                <div className="burger-btn " onClick={() => duplicateTest()}>
                    <span >ЖМИ</span>

                </div>
            </div>
        </div>
    );
};

export default MainPage;
