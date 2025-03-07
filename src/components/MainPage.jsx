import React, {useContext, useRef } from 'react';
import './page.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';


const MainPage = () => {
    const {globalStore} = useContext(Context)
    const {catalogStore} = useContext(Context)
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    function searchTest() {
        console.log('searchTest');
        catalogStore.searchTest().then(() => {



            }
        )
    }
    return (
        <div className="page" onClick={()=>globalStore.setAllMenuActive(false)}>
            <button onClick={() => searchTest()}> Статистика запросов </button>
            <h1>{catalogStore.currId}</h1>
            <Toast ref={toast}></Toast>
            <FileUpload mode="basic" name="wordsfile" url="http://localhost:5000/api/uploadNewWordStatisticData" accept="image/*" maxFileSize={100_000_000} onUpload={onUpload} />
            MainPage
        </div>
    );
};

export default MainPage;
