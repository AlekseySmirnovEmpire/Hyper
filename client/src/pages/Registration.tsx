import React, {useEffect} from 'react';
import LoginForm from "../components/LoginForm";
import {Container} from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {
    useEffect(() => {
        document.title = 'Регистрация';
    });

    return (
        <Container style={{maxWidth: "500px"}} fluid>
            <RegistrationForm />
        </Container>
    );
};

export default Registration;