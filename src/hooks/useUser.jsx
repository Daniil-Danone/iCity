import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export function useUser(setIsActive) {
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    const API = useSelector(state => state.api) 

    async function getUserMe(token) {
        try {
            await axios
                .get(API + 'api/v1/auth/users/me', {
                    headers: {'Authorization': token}
                })
                .then(response => {
                    if(response.status === 200) {
                        setMsg('Производится вход в аккаунт');
                        setTimeout(() => {
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem("user", JSON.stringify(response.data));
                            setIsActive(false);
                        }, 2000); 
                    }
                })
        } catch(error) {
            console.log(error)
        }
    }

    async function authUser (authData) {
        try {
            await axios
                .post(API + 'auth/token/login/', authData)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('token', 'Token ' + response.data.auth_token);
                        getUserMe(localStorage.getItem("token"));
                    } else {
                        setMsg('Произошла ошибка...');
                    }
                })
        } catch(error) {
            console.log(error)
        }
    }

    async function regUser(regData, authData) {
        setMsg('Создание аккаунта...');
        try {
            await axios
                .post(API + 'api/v1/auth/users/', regData)
                .then(response => {
                    if (response.status === 201) {
                        authUser(authData);
                    } else {
                        setMsg('Произошла ошибка...');
                    }
                })
        } catch(error) {
            console.log(error)
        }
    }

    return { msg, getUserMe, authUser, regUser }
}
