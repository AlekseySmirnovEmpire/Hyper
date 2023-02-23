import React, {useContext, useEffect} from "react";
import { Button, Container, Form } from "react-bootstrap";

const Auth = () => {
    useEffect(() => {
        document.title = 'Авторизация';
    });
    return (
        <Container style={{ maxWidth: "500px" }} fluid>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'text-warning'}>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Ваш Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={'text-warning'}>Пароль:</Form.Label>
                    <Form.Control type="password" placeholder="Ваш пароль" />
                </Form.Group>
                <Button variant="warning" type="submit">
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default Auth;