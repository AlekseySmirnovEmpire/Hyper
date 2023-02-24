import React, {FC, useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {AuthContext} from "../main";
import {observer} from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {auth} = useContext(AuthContext);

    return (
        <Form onSubmit={(event) => {event.preventDefault()}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={'text-warning'}>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Ваш Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={'text-warning'}>Пароль:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Ваш пароль"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </Form.Group>
            <Button
                variant="warning"
                type="submit"
                onClick={() => auth.login(email, password)}
            >
                Войти
            </Button>
        </Form>
    );
};

export default observer(LoginForm);