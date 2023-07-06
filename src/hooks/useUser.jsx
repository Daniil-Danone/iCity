import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export function useUser(setIsActive, setIsLogin, setUser) {
    const [msg, setMsg] = useState('');

    const API = useSelector(state => state.api) 

    async function getUserEvents(token) {
        try {
            const togoEvents = await axios.get(API + 'api/v1/auth/users/me/', {
                headers: {'Authorization': token}
            })

            return togoEvents.data
        } catch(error) {
            console.log(error)
        }
    }

    async function updateTogoEvents(token, data) {
        try {
            const togoEvents = await axios.put(API + 'api/v1/auth/users/me/', data, {
                headers: {'Authorization': token}
            })

            return togoEvents.data.togo_events
        } catch(error) {
            console.log(error)
        }
    }

    async function updateLikedEvents(token, data) {
        try {
            const togoEvents = await axios.put(API + 'api/v1/auth/users/me/', data, {
                headers: {'Authorization': token}
            })

            return togoEvents.data.liked_events
        } catch(error) {
            console.log(error)
        }
    }

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
                            setUser(response.data)
                            setIsLogin(true)
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

    return { msg, getUserMe, authUser, regUser, getUserEvents, updateTogoEvents, updateLikedEvents }
}
