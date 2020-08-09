import axios from '../../axios/axios-quiz'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-XhhdmMUrA1QOAG9dKc6didHXwApSB1g'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-XhhdmMUrA1QOAG9dKc6didHXwApSB1g'
        }
        const response = await axios.post(url, authData)
        const data = response.data
        console.log(data)


        const expireAt = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expireAt', expireAt)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogOut(data.expiresIn))
    }
}

export function autoLogOut(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, time * 1000)
    }
}

export function logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expireAt')
    return {
        type: AUTH_LOGOUT,
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logOut())
        } else {
            const expireAt = new Date(localStorage.getItem('expireAt'))
            if (expireAt <= new Date()) {
                dispatch(logOut())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogOut((expireAt.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
