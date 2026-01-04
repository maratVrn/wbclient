import React, {useContext, useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Context} from "../../index";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import {useNavigate} from "react-router-dom";

const Subjects = () => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedCatalogID, setSelectedCatalogID] = useState(-1);
    const [selectedSub, setSelectedSub] = useState(null);
    const [addSubjectDialog, setAddSubjectDialog] = useState(false);
    const [addSubjectData, setAddSubjectData] = useState('');

    const {catalogStore} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(()=>{
        if (!userStore.isLogin) navigate('/')
        else if (userStore.role !== "ADMIN") navigate('/')

        console.log('useEffect subjects');
        catalogStore.getWBCatalogInfo().then(() => {
            let newProducts = []
            for (let i in catalogStore.wbCatalogInfo){
                newProducts.push({num:parseInt(i), id : catalogStore.wbCatalogInfo[i].id, name:catalogStore.wbCatalogInfo[i].name})
            }
            setProducts(newProducts)
            }
        )
    },[])

    function setSelectedCatalog(value){
        if (value) {
            setSelectedProduct(value)
            setSelectedCatalogID(value.id)
            setSelectedSub(null)
            setSubjects([])
            if (value.id) loadAndShowSubjects(value.id).then()
        }
    }

    async function deleteZeroFromCatalogALL() {
        let idXStart = 1601
        let idXEnd = 2433
        for (let i = idXStart; i<= idXEnd; i ++) {
            console.log('  ---------------------------    ');
            console.log('Удаляем для '+i +'  каталог '+ products[i].id);
            let deleteIdList = []

            await catalogStore.getCatalogIdInfo(products[i].id, false).then(() => {

                console.log('Кол предметов ДО удаления ' + catalogStore.catalogIdInfo.length);
                for (let i in catalogStore.catalogIdInfo)
                    if (catalogStore.catalogIdInfo[i].count < 5) deleteIdList.push(catalogStore.catalogIdInfo[i].id)
            })

            await catalogStore.getCatalogIdInfo(products[i].id, true, deleteIdList).then(() => {

                console.log('Кол предметов после удаления ' + catalogStore.catalogIdInfo.length);
            })



        }

    }



    async function loadAndShowSubjects(catalogId, needDelete = false) {
        let deleteIdList = []
        setSelectedSub(null)
        setSubjects([])

        if (needDelete)  for (let i in selectedSub) deleteIdList.push(parseInt(selectedSub[i].id))

        catalogStore.getCatalogIdInfo(catalogId, needDelete, deleteIdList).then(() => {

                let newSubjects = []
                for (let i in catalogStore.catalogIdInfo){
                    newSubjects.push( catalogStore.catalogIdInfo[i])
                }
                setSubjects(newSubjects)

            }
        )
        setSelectedSub(null)
    }

    async function addSubjectDataInCatalog(){
        let newAddSubjects = JSON.parse(addSubjectData)
        await  catalogStore.addSubjectsInCatalog(selectedCatalogID,newAddSubjects).then(() => {
            setAddSubjectData('')
            setAddSubjectDialog(false);
            loadAndShowSubjects(selectedCatalogID, false).then()
        })
    }
    async function saveAllSubjectsToFile(){
        await  catalogStore.saveAllSubjectsToFile().then()
    }

    async function LoadAllSubjectsFromFile(){
        await  catalogStore.loadAllSubjectsFromFile().then()
    }


    async function saveSearchDataToFile(){
        await  catalogStore.saveSearchDataToFile().then()
    }

    async function loadSearchDataFromFile(){
        await  catalogStore.loadSearchDataFromFile().then()
    }


    return (
        <div style={{padding: '50px'}}>
            <Button severity="secondary" label="Удалить нулевые предметы"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                    onClick={() => deleteZeroFromCatalogALL()}/>
            <Button severity="secondary" label="Сохранить всю таблицу в файл"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px', marginLeft:'20px'}}
                    onClick={() => saveAllSubjectsToFile()}
            />
            <Button severity="secondary" label="Загрузить всю таблицу из файла"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px', marginLeft:'20px'}}
                onClick={() => LoadAllSubjectsFromFile()}
            />


            <Button severity="secondary" label="Сохранить поисковые запросы"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px', marginLeft:'20px'}}
                    onClick={() => saveSearchDataToFile()}
            />
            <Button severity="secondary" label="Загрузить поисковые запросы"
                    style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px', marginLeft:'20px'}}
                    onClick={() => loadSearchDataFromFile()}
            />


            <div className="flex overflow-hidden">

                <div
                    className="flex-grow-0 flex align-items-center justify-content-center p-1 m-2 border-round border-1">

                    <DataTable
                        paginator rows={30} rowsPerPageOptions={[30, 50, 100]}
                        value={products} selectionMode="single" selection={selectedProduct}
                               onSelectionChange={(e) => setSelectedCatalog(e.value)} dataKey="id"
                               tableStyle={{minWidth: '20rem'}}>
                        <Column field="num" header="№"></Column>
                        <Column field="id" header="id"></Column>
                        <Column field="name" header="Name"></Column>

                    </DataTable>
                </div>
                <div
                    className="flex-grow-1 text-center  justify-content-center border-1  p-1 m-2 border-round">
                    {selectedProduct?.name ? <h3>{selectedProduct?.name}</h3>:<></>}
                    {selectedProduct?.num ? <p>№ {selectedProduct?.num} {selectedProduct?.id ? <> catalog {selectedProduct?.id}</> :<></>} </p> :<></>}
                    <Button severity="secondary" label="Удалить"
                            style={{height: '28px', fontSize: '12px', marginBottom: '10px',  marginTop: '5px'}}
                            onClick={() => loadAndShowSubjects(selectedCatalogID, true)}/>
                    <Button severity="secondary" label="Добавить предметы"
                            style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px', marginLeft:'20px'}}
                            onClick={() => setAddSubjectDialog(true)}/>
                    <Dialog header="Новые предметы" visible={addSubjectDialog}
                            style={{width: '60vw', height: '60vw'}} onHide={() => {
                        if (!addSubjectDialog) return;
                        setAddSubjectDialog(false);
                    }}>
                        <Button severity="secondary" label="Добавить"
                                style={{height: '28px', fontSize: '12px', marginBottom: '10px', marginTop: '5px'}}
                            onClick={() => addSubjectDataInCatalog()}
                        />
                            <div style={{width: '100%', height: '90%'}} className="border-1">
                                    <InputTextarea  style={{width: '100%', height: '100%'}} value={addSubjectData} onChange={(e) => setAddSubjectData(e.target.value)} rows={5}
                                                   cols={50}/>
                            </div>
                    </Dialog>


                    <DataTable

                        value={subjects}
                        selection={selectedSub}
                        // selectionMode="single"
                        onSelectionChange={(e) => setSelectedSub(e.value)}
                        dataKey="id"
                        tableStyle={{minWidth: '20rem'}}>
                        <Column selectionMode="multiple" field="id" header="id"></Column>
                        <Column field="num" header="№"></Column>
                        <Column field="id" header="id"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="parentName" header="parentName"></Column>
                        <Column field="count" header="count"></Column>

                    </DataTable>
                </div>

            </div>


        </div>
    );
};

export default Subjects;