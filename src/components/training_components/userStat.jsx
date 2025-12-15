import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const UserStat = () => {
    const {userStore} = useContext(Context)
    const [allUserStat, setAllUserStat] = useState([]);
    const [dayUserStat, setDayUserStat] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    function loadAllUserStat(){
        userStore.loadAllUserStat().then(() => {
            setAllUserStat(userStore.allUserStat)


            }
        )
    }
    const ipCountTemplate = (product) => {
        return <>
            {product.statIPInfo.length}
        </>

    };

    function setSelectedData(value){
        setSelectedDay(value)
        try {setDayUserStat(value.statIPInfo)} catch (e) {}
    }
    return (

        <div style={{padding: '20px'}}>
            <Button severity="secondary" label="Загрузить статистику за выбранный период"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginLeft: '10px'}}
                    onClick={() => loadAllUserStat()}/>


            <div className=" align-items-center justify-content-center p-1 m-2 border-round border-1">
                <DataTable
                    paginator rows={30} rowsPerPageOptions={[30, 50, 100]}
                    value={allUserStat} selectionMode="single" selection={selectedDay}
                    onSelectionChange={(e) => setSelectedData(e.value)}
                    dataKey="id"
                    tableStyle={{minWidth: '20rem'}}>
                    <Column field="id" header="id"></Column>
                    <Column field="crDate" header="crDate"></Column>
                    <Column body={ipCountTemplate} header="IP Count"></Column>

                </DataTable>
            </div>

            <div className=" align-items-center justify-content-center p-1 m-2 border-round border-1">
                <DataTable
                    paginator rows={30} rowsPerPageOptions={[30, 50, 100]}
                    value={dayUserStat} selectionMode="single"
                    dataKey="ip"
                    tableStyle={{minWidth: '20rem'}}>
                    <Column field="ip" header="ip"></Column>
                    <Column field="entryCount" header="entry"></Column>
                    <Column field="viewProductCount" header="viewProduct"></Column>
                    <Column field="searchCount" header="search"></Column>
                    <Column field="productListCount" header="productList"></Column>
                    <Column field="wbTransitCount" header="wbTransit"></Column>
                    <Column field="allActionCount" header="allAction"></Column>

                </DataTable>
            </div>

        </div>
    );
};

export default UserStat;