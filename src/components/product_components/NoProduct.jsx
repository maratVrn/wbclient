import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";


const NoProduct = () => {
    let { query } = useParams();
    // useEffect(()=>{
    //     console.log('NoProduct useEffect'+query);
    //
    //
    // }, [query])
    return (
        <div className="page">
            <h4>По Вашему запросу "{query}" ничего не найдено</h4>
        </div>
    );
};

export default NoProduct;