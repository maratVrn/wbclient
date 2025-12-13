import React from 'react';
import {useNavigate} from "react-router-dom";
import logoSvg from "./logo-light.svg";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className=' ' style={{
            background: "linear-gradient(to right, " +
                "#26282AFF, " +
                "#4A85BFFF)",
            backgroundColor: '#4a85bf'
        }}>
        <div >

            <footer className="footer">
                <div className="container-fluid">
                    <div className="footer-container">
                        <a className="footer-logo" >
                            <img className="logo-image" src={logoSvg} width="160" height="37"
                                 onClick={(e) => navigate('/')}
                                 alt="logo" loading="lazy"/>
                        </a>


                        <p className="footer-text">
                            Все логотипы и товарные знаки Wildberries TM, изображения и фото товаров ,отображаемые в этом приложении, являются собственностью Wildberries.

                        </p>

                        <div className="footer-privacy">
                            <div className="copyright-text">Copyright © 2025</div>
                            <div className="privacy-menu">

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </footer>
    );
};

export default Footer;