import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import './product.css';

const ProductPhoto = (props) => {
    const {id, isInWB} = props;

    const [mainPhotoUrl, setMainPhotoUrl] = useState('')
    const [littlePhotoUrl, setLittlePhotoUrl] = useState([])
    const {productStore} = useContext(Context)



    useEffect(()=>{
        productStore.setNowId(0)
        if (id>0) {
            if (isInWB) {
                productStore.getProductPhoto(id).then(() => {
                        setLittlePhotoUrl(productStore.photoUrlArray)
                        if (productStore.photoUrlArray[0]) setMainPhotoUrl(productStore.photoUrlArray[0])
                    }
                )
            }
        }
    },[id, isInWB])


    return (
        <div >
            {isInWB ?
                <div className="product_grid">
                    <div className="little_photo_div">
                        {littlePhotoUrl.map((url, idx) =>
                            <img key={idx} className="little_photo" src={url} onClick={() => setMainPhotoUrl(url)}
                                 alt="..."/>
                        )}

                    </div>
                    <div className="main_photo_div">
                        <img className="main_photo" src={mainPhotoUrl} alt="..."/>
                    </div>
                </div>
                :
                <div>
                Товара нет на вб
                </div>
            }

        </div>
    );
};

export default ProductPhoto;