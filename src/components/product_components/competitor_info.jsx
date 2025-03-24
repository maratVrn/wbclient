import React from 'react';
import {TabPanel, TabView} from "primereact/tabview";
import CompetitorSeeAlsoInfo from "./competitor_seeAlso_Info";
import CompetitorSeePhotoInfo from "./competitor_seePhotoInfo";
import CompetitorSeeFind from "./competitor_seeFind";

const CompetitorInfo = (props) => {
    const {id} = props;
    return (
        <div>
            <TabView className="a-tab">
                <TabPanel header="В разделе 'Смотрите также'">
                    <CompetitorSeeAlsoInfo id={id}/>
                </TabPanel>
                <TabPanel header="В разделе 'Похожие по фото'">
                    <CompetitorSeePhotoInfo id={id}/>
                </TabPanel>
                <TabPanel header="По поисковому запросу">

                    <CompetitorSeeFind id={id}/>
                </TabPanel>

            </TabView>
        </div>
    );
};

export default CompetitorInfo;