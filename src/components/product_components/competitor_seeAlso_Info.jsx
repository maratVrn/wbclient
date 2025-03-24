import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {ProgressSpinner} from "primereact/progressspinner";
import CompetitorTable from "./competitor_table";

const CompetitorSeeAlsoInfo = () => {
    let { id } = useParams();
    const {productStore} = useContext(Context)

    const [isInfoLoad, setIsInfoLoad] = useState(false)



    function loadCompetitorSeeAlsoInfo(){
        productStore.loadCompetitorSeeAlsoInfo(id).then(() => {

            setIsInfoLoad(false)

        })

    }
    useEffect(()=>{
        if (productStore.is_competitorSeeAlsoInfo) {
            loadCompetitorSeeAlsoInfo() }
    },[id])



    return (
        <div className="flex align-items-center" style={{justifyContent: 'center', width: '100%'}}>

            {productStore.is_competitorSeeAlsoInfo ?
                <div style={{width: '100%'}}>
                    <div style={{width: '100%'}}>

                        <span className="all_colors_info" style={{marginTop: '30px', marginBottom: '30px'}}>Продажи по выбранной катеогрии за 30 дней</span>

                        <CompetitorTable items={productStore.competitorSeeAlsoInfo} id = {id}/>

                    </div>
                </div>

                :
                <div>
                    <button disabled={isInfoLoad} onClick={() => {
                        setIsInfoLoad(true)
                        loadCompetitorSeeAlsoInfo()
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

export default CompetitorSeeAlsoInfo;