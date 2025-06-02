import React from 'react';
import {Button} from "primereact/button";
import {useRef, useEffect, useState} from "react";
import { ColorPicker } from 'primereact/colorpicker';

const Training = () => {
    const canvasRef = useRef(null);
    const [canvasContext, setCanvasContext] = useState(null);
    const [color, setColor] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 250;
        canvas.height = 500;
        const context = canvas.getContext("2d");
        const img = new Image();
        img.src = require('./11.jpg')
        context.drawImage(img, 0, 0, 250, 500)
        setCanvasContext(context);
    }, [canvasRef]);

    const startColor = () => {
        const img = new Image();
        img.src = require('./images/11.jpg')
        canvasContext.drawImage(img, 0, 0, 250, 500)
        console.log('tut');
    }

    function genNewColor(r, g, b, x,  factor = 0, i){

        let avg = 0.3  * r + 0.59 * g + 0.11 * b;
        // let avg = 122
        let [r2, g2, b2] = hexToRgb(color)
        return [r+r2, g+g2, b+b2, 255];
        // return [avg, avg, avg, 255];
    }
    const newColor = () => {
        const img = new Image();
        img.src = require('./images/11.jpg')
        canvasContext.drawImage(img, 0, 0, 250, 500)
        let imageData =canvasContext.getImageData(0, 0, 250, 500)

        let res = [];
        let len = imageData.length;
        for (let i = 0; i < imageData.data.length; i += 4) {
            res = genNewColor( imageData.data[i], imageData.data[i+1], imageData.data[i+2], imageData.data[i+3], 0, i);
            imageData.data[i]       = res[0]
            imageData.data[i + 1]   = res[1];
            imageData.data[i + 2]   = res[2];
            imageData.data[i + 3]   = res[3];
        }
        canvasContext.putImageData(imageData, 0, 0);

    }

    const hexToRgb = hex => {
        let [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        // console.log('r = '+r+'  g = '+ g+'  b = '+ b);
        return [ r, g, b ]
    };

    const setColorPickerColor = (newColor) =>{
        // console.log(color);
        // hexToRgb(color)

        setColor(newColor)
    }
    return (
        <div className="page">

            <div className="card flex justify-content-center">
                <ColorPicker value={color} onChange={(e) => setColorPickerColor(e.value)}/>
            </div>
            <div className="responsive-two-column-grid" style={{alignItems: 'center'}}>

                <div className="borderOne ">
                    <canvas ref={canvasRef}></canvas>
                </div>

                <div className="borderOne">
                    <Button onClick={() => startColor()} className="mainFont"
                            style={{paddingLeft: '20px', maxWidth: '120px', height: '40px'}} label="загрузить"/>

                    <Button onClick={() => newColor()} className="mainFont"
                            style={{paddingLeft: '20px', maxWidth: '120px', height: '40px'}} label="Поменять цвет"/>
                </div>

            </div>


        </div>
    );
};

export default Training;