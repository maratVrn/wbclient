import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";


const UpdatePassword = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    let { link } = useParams();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '', // username нужен только для регистрации
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        userStore.newPassword(formData.password, link).then(() => {
            if (userStore.isLogin) {
                navigate('/user')
                alert(`Пароль успешно изменен!`);
            }

        })


    };




    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Изменение пароля</h2>

                <div className="form-group">
                    <label htmlFor="password">Новый пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Изменить пароль
                </button>


            </form>
        </div>
    );
});

export default UpdatePassword;