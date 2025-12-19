import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const User = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    const logout = () => {
        userStore.logout()
        navigate('/login')
    };
    return (
        <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>

            <h2> {userStore.email}   </h2>
            <h2> {userStore.userName} </h2>
            <h2> {userStore.role}   </h2>
            <h2> {userStore.userId} </h2>
            <span onClick={logout} className="toggle-link">
             Выйти
          </span>
        </div>
    );
});

export default User;