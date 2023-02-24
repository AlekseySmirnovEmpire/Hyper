import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import {observer} from "mobx-react-lite";

const Auth = () => {
    useEffect(() => {
        document.title = 'Авторизация';
    });

    return (
        <Container style={{maxWidth: "500px"}} fluid>
            <LoginForm/>
        </Container>
    );
};

export default observer(Auth);