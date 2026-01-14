import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const Login = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    // Состояние для переключения между входом и регистрацией (по умолчанию - вход)
    const [isRegistering, setIsRegistering] = useState(false);

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
    useEffect(()=>{
        if (userStore.isLogin) navigate('/user')

    }, [userStore.isLogin])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegistering) {
            // Логика регистрации

            userStore.userRegistration(formData).then(() => {
                if (userStore.isLogin) {

                    navigate('/user')
                    alert(`Пользователь ${formData.username} успешно зарегистрирован!`);
                }

            })

        } else {
            // Логика входа
            userStore.userLogin(formData).then(() => {
                if (userStore.isLogin) {

                    navigate('/user')
                }

            })


        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        // Очищаем форму при переключении режима
        setFormData({ email: '', password: '', username: '' });
    };


    // Функция-заглушка для обработки восстановления пароля
    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (formData.email) {
            // alert(`Инструкции по восстановлению пароля отправлены на: ${formData.email}`);

            userStore.updatePassword(formData.email).then(() => {

            })

        } else {
            alert('Пожалуйста, введите ваш email в поле выше.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>

                {/* Поле Username показываем только при регистрации */}
                {isRegistering && (
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required={isRegistering} // Обязательно только при регистрации
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
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

                {/* Добавляем ссылку только в режиме входа */}
                {!isRegistering && (
                    <div className="forgot-password-container">
                        <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
                            Забыли пароль?
                        </a>
                    </div>
                )}

                <button type="submit" className="submit-btn">
                    {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                </button>

                <p className="toggle-text">
                    {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                    <span onClick={toggleMode} className="toggle-link">
            {isRegistering ? ' Войти' : ' Зарегистрироваться'}
          </span>
                </p>
            </form>
        </div>
    );
});

export default Login;