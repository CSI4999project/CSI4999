import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';
import axios from "axios";

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize, user, setUser}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    
     //logout function delete cookie session and redirect to login
    const logout = async () => {
        axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:4000/logout",
        }).then((res) => {
        setUser("");
        });
    };

    if(user){
        return(
            <Link to='/login' className='btn-mobile'>
                <button
                className={'btn ${checkButtonStyle} ${checkButtonSize}'}
                onClick={logout} type={type}>
                    {children}
                </button>
            </Link>
        );
    } else{
        return(
            <Link to='/register' className='btn-mobile'>
                <button
                className={'btn ${checkButtonStyle} ${checkButtonSize}'}
                onClick={onClick} type={type}>
                    {children}
                </button>
            </Link>
        );
    }
    
};