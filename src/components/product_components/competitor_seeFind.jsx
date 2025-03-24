import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import CompetitorTable from "./competitor_table";
import {ProgressSpinner} from "primereact/progressspinner";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const CompetitorSeeFind = () => {

    let { id } = useParams();
    const [findText, setFindText] = useState('');
    const {productStore} = useContext(Context)
    const [isInfoLoad, setIsInfoLoad] = useState(false)



    function loadCompetitorSeeFindInfo(){
        setIsInfoLoad(true);

        productStore.loadCompetitorSeeFindInfo(id, findText).then(() => {

            setFindText('')
            setIsInfoLoad(false)

        })

    }
    useEffect(()=>{
        if (productStore.is_competitorSeeFindInfo) {
            loadCompetitorSeeFindInfo() }
    },[id])



    return (
        <div className="align-items-center" style={{justifyContent: 'center', width: '100%'}}>

            <div className="flex" style={{paddingLeft: '40px', width: '100%'}}>
                <span className="all_colors_info" style={{marginTop: '12px', marginBottom: '30px'}}>Введите поисковую фразу</span>
                <InputText style={{width: '60%', height: '40px', marginLeft: '20px'}} value={findText}
                           onChange={(e) => setFindText(e.target.value)}/>
                <Button style={{width: '130px', height: '40px', marginLeft: '20px', fontSize: '14px'}}
                        onClick={loadCompetitorSeeFindInfo} label="Загрузить" severity="secondary" loading={isInfoLoad}/>

            </div>


            {isInfoLoad ?
                <div className="flex" style={{justifyContent: 'center', width: '100%'}}>
                    <div style={{paddingTop: '20px', paddingLeft: '40px'}}>
                        <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                         fill="var(--surface-ground)" animationDuration=".9s"/>
                    </div>

                </div>
                : <>
                {productStore.is_competitorSeeFindInfo ?
                        <div style={{width: '100%'}}>
                            <div style={{width: '100%'}}>

                                <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Продажи по выбранной катеогрии за 30 дней</span>

                                <CompetitorTable items={productStore.competitorSeeFindInfo} id={id}/>

                            </div>
                        </div>

                        : <>
                        </>
                }
                </>

            }


        </div>
    );
};

export default CompetitorSeeFind;