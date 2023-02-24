import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {AuthContext} from "../main";
import {observer} from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const {auth} = useContext(AuthContext);
    const login = async () => {
        setErrors(false);
        if(!(await auth.login(email, password))) {
            setErrors(true);
            return;
        }
    };

    return (
        <Form onSubmit={(event) => {event.preventDefault()}}>
            {errors && <Alert variant={'danger'}>Неверно введён пароль или логин!</Alert>}
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
                onClick={login}
            >
                Войти
            </Button>
        </Form>
    );
};

export default observer(LoginForm);