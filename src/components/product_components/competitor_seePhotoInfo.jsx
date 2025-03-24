import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import CompetitorTable from "./competitor_table";
import {ProgressSpinner} from "primereact/progressspinner";

const CompetitorSeePhotoInfo = () => {
    let { id } = useParams();
    const {productStore} = useContext(Context)

    const [isInfoLoad, setIsInfoLoad] = useState(false)



    function loadCompetitorSeePhotoInfo(){
        productStore.loadCompetitorSeePhotoInfo(id).then(() => {

            setIsInfoLoad(false)

        })

    }
    useEffect(()=>{
        if (productStore.is_competitorSeePhotoInfo) {
            loadCompetitorSeePhotoInfo() }
    },[id])



    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width: '100%'}}>

            {productStore.is_competitorSeePhotoInfo ?
                <div style={{width: '100%'}}>
                    <div style={{width: '100%'}}>

                        <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Продажи по выбранной катеогрии за 30 дней</span>

                        <CompetitorTable items={productStore.competitorSeePhotoInfo} id = {id}/>

                    </div>
                </div>

                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadCompetitorSeePhotoInfo()
                    }}>Сформировать отчет
                    </button>
                    {isInfoLoad ?
                        <div>
                            <div style={{paddingTop: '20px', paddingLeft: '40px'}}>
                                <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"
                                                 fill="var(--surface-ground)" animationDuration=".9s"/>
                            </div>

                        </div>
                        :
                        <div></div>

                    }
                </div>
            }


        </div>
    );
};

export default CompetitorSeePhotoInfo;