import React, {Component, FC, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../main";

const Confirm = () => {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);

    useEffect( () => {
        const params = window.location.pathname.split('/');
        try {
            const id = params[params.length - 1];
            console.log(id);
            auth.confirmUser(id)
                .then(req => {
                    console.log(req);
                    if (!req) {
                        navigate('/');
                    }
                })
                .catch(_ => navigate('/'));
        } catch (ex) {
            console.error(ex);
            navigate('/');
        }
    });

    return (
        <>
            <h1 className={'text-center text-light'}>Ваш аккаунт подтверждён!</h1>
            <h3 className={'text-center text-light'}>Теперь вы можете залогиниться на сайте.</h3>
        </>
    );
};

export default Confirm;