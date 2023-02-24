import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";

const NotFound = () => {
    useEffect(() => {
        document.title = 'Ошибка';
    });
    return (
        <Container className="bg-dark bg-opacity-25">
            <h1 className="text-light text-center">Ошибка 404.</h1>
            <Row className="justify-content-center">
                <Col sm={5} style={{maxWidth: 350}} className="align-content-center">
                    <img width={350} src="/images/travolta.png"/>
                </Col>
            </Row>
            <h2 className="text-light text-center">По такому адресу ничего не найдено!</h2>
        </Container>
    );
};

export default NotFound;