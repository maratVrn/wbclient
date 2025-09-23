import React from 'react';
import {Button} from "primereact/button";
import ApiService from "../service/ApiService";

const Contacts = () => {
    async function test(){
        let  testResult = 'noData'

        try {
             testResult = await ApiService.APIClientTest()
        } catch (e) {
            console.log(e);
        }
        console.log(testResult);
    }
    return (
        <div style={{justifyContent:'center', display: "flex"}}>
            <Button onClick={() => test()} className="mainFont"
                    style={{ height: '50px'}} label="Найти"/>
        </div>
    );
};

export default Contacts;