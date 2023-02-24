import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Button, Form} from "react-bootstrap";
import {AuthContext} from "../main";
import {popScheduler} from "rxjs/internal/util/args";

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickName, setNickName] = useState('');
    const [errors, setErrors] = useState(false);
    const {auth} = useContext(AuthContext);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (validated) {
            setErrors(false);
            if (!(await auth.registration(firstName, lastName, nickName, email, password))) {
                setErrors(true);
                return;
            }
        }
    };

    return (
        <>{auth.user?.email
            ? <div className={'row justify-content-center'}>
                <h1 className={'text-light text-center'} style={{width: 600}}>Подтвердите email</h1>
                <span className={'text-light text-center'}>На вашу почту <span className={'text-warning'}>{auth.user.email}</span> выслано письмо с подтверждением регистрации. Откройте письмо и пройдите по ссылке для завершения регистрации!</span>
            </div>
            : <Form
                noValidate
                validated={validated}
                onSubmit={event => event.preventDefault()}>
                {errors && <Alert variant={'danger'}>Пользователь с данным email'ом уже зарегистрирован ранее!</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'text-warning'}>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ваш Email"
                        required
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        isInvalid={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)}
                    />
                    <Form.Control.Feedback type={'invalid'}>Некорректный email!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={'text-warning'}>Пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Ваш пароль"
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={!/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password) && password !== ''}
                        value={password}
                    />
                    <Form.Control.Feedback type={'invalid'}>
                        Пароль должен содержать только буквы (a-z) и хотя бы одну букву в большом регистре, цифру и
                        спец.
                        символ!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={'text-warning'}>Повторите пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Введите пароль снова"
                        onChange={e => setCheckPassword(e.target.value)}
                        value={checkPassword}
                        isInvalid={checkPassword != password}
                    />
                    <Form.Control.Feedback type={'invalid'}>Некорректный пароль!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'text-warning'}>Имя:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Введите имя"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <Form.Control.Feedback type={'invalid'}>Имя является обязательным при
                        регистрации!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'text-warning'}>Фамилия:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Введите фамилию"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                    />
                    <Form.Control.Feedback type={'invalid'}>Фамилия является обязательной при
                        регистрации!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'text-warning'}>Ник:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Введите ник"
                        onChange={e => setNickName(e.target.value)}
                        value={nickName}
                    />
                    <Form.Control.Feedback type={'invalid'}>Ник является обязательным при
                        регистрации!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        className={'text-light'}
                        required
                        label={'Вы соглашаетесь с пользовательским согласением'}
                        feedback="Вы должны отметить согласие."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button variant="warning" type="submit" onClick={handleSubmit}>
                    Зарегистрироваться
                </Button>
            </Form>}</>

    );
};

export default observer(RegistrationForm);