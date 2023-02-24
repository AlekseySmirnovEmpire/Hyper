import React, {useContext, useEffect} from "react";
import { Button, Container, Form } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Auth = () => {

    useEffect(() => {
        document.title = 'Авторизация';
    });
    return (
        <Container style={{ maxWidth: "500px" }} fluid>
            <LoginForm/>
        </Container>
    );
};

export default Auth;