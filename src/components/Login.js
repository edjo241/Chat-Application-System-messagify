import { Button } from '@material-ui/core'
import React from 'react'
import '../styles/Login.css'
import { auth,provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import {actionTypes} from '../reducer'

function Login() {
    const [{},dispatch]=useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
            console.log(result)} )
        
        .catch(error=>alert(error));
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://freepngimg.com/thumb/categories/1327.png" alt=""/>
                <div className="login__text">
                <h2>Sign in to MesSaGifY</h2>
                </div>
            <Button onClick={signIn}>Sign in with Google</Button> 
            <div className="developer">
            <h5>Developer:Edwin Joseph</h5>
            </div>
            </div>
        </div>
    )
}

export default Login
