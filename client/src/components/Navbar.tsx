import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar as NavbarBs, NavbarBrand, Offcanvas} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
    const [expanded, setExpanded] = useState(false);

    const triggerToggle = () => {
        setShow(!show);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            function watchWidth() {
                setWindowWidth(window.innerWidth);
            }

            window.addEventListener("resize", watchWidth);

            return function () {
                window.removeEventListener("resize", watchWidth);
            };
        }
    }, []);
    const flexBetween = 'flex items-center justify-between'
    return (
        <NavbarBs sticky="top" className="justify-content-center bg-black bg-gradient shadow-sm mb-3 border-bottom border-warning" expand={"lg"} variant={"dark"} expanded={expanded}>
            <Container className={`${flexBetween} fixed top-0 w-full`} fluid>
                <NavbarBrand style={{fontSize: 30}} href="/" className="text-light">
                    <img src="/images/logo.svg"/>
                    Hyper
                </NavbarBrand>
                {windowWidth >= 992 ? <>
                    <Nav className='m-auto' fill>
                        <Nav.Link style={{marginRight: 10, fontSize: 18}} className="text-light" to="/tournaments" as={NavLink}>
                            <i style={{marginRight: 5}} className="fa fa-solid fa-trophy"></i>
                            Турниры
                        </Nav.Link>
                        <Nav.Link style={{marginRight: 10, fontSize: 18}} className="text-light" to="/players" as={NavLink}>
                            <i style={{marginRight: 5}} className="fa fa-solid fa-users"></i>
                            Игроки
                        </Nav.Link>
                        <Nav.Link style={{marginRight: 10, fontSize: 18}} className="text-light" to="/rules" as={NavLink}>
                            <svg style={{marginRight: 5}} width="25" height="25" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 640 512">
                                <path fill="#fff"
                                      d="M252.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-184 184c-15.6 15.6-15.6 40.9 0 56.6l184 184c15.6 15.6 40.9 15.6 56.6 0l184-184c15.6-15.6 15.6-40.9 0-56.6l-184-184zM248 224c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM96 248c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm128 80c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm128-80c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM224 72c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm96 392c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H472.5c13.4 26.9 8.8 60.5-13.6 82.9L320 413.8V464zm160-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"/>
                            </svg>
                            Правила
                        </Nav.Link>
                        <Nav.Link style={{fontSize: 18}} className="text-light" to="/reviews" as={NavLink}>
                            <svg style={{marginRight: 5}} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 512 512">
                                <path fill="#fff"
                                      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                            </svg>
                            Статьи
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{fontSize: 18}} className="text-light" to="/auth" as={NavLink}>Вход</Nav.Link>
                        <Nav.Link style={{fontSize: 18}} className="text-light" to="/registration" as={NavLink}>Регистрация</Nav.Link>
                    </Nav>
                </> : <>
                    <NavbarBs.Toggle onClick={() => setExpanded(!expanded)} style={{border: 'none', outline: 'none'}} className={'border-0'} aria-controls={`offcanvasNavbar-expand-lg`} />
                    <NavbarBs.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="end"
                        style={{backgroundColor: '#000'}}
                        className="bg-gradient"
                    >
                        <Offcanvas.Header closeButton closeVariant={'white'} onHide={() => setExpanded(false)}>
                            <Offcanvas.Title style={{fontSize: 45}} className={'text-light text-center'} id={`offcanvasNavbarLabel-expand-lg`}>
                                <img style={{width: 50}} src="/images/logo.svg"/>
                                Hyper
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/auth" as={NavLink}>Вход</Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/registration" as={NavLink}>Регистрация</Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/tournaments" as={NavLink}>
                                    <i style={{marginRight: 5}} className="fa fa-solid fa-trophy"></i>
                                    Турниры
                                </Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/players" as={NavLink}>
                                    <i style={{marginRight: 5}} className="fa fa-solid fa-users"></i>
                                    Игроки
                                </Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/rules" as={NavLink}>
                                    <svg style={{marginRight: 5}} width="25" height="25" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 640 512">
                                        <path fill="#fff"
                                              d="M252.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-184 184c-15.6 15.6-15.6 40.9 0 56.6l184 184c15.6 15.6 40.9 15.6 56.6 0l184-184c15.6-15.6 15.6-40.9 0-56.6l-184-184zM248 224c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM96 248c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm128 80c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm128-80c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM224 72c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm96 392c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H472.5c13.4 26.9 8.8 60.5-13.6 82.9L320 413.8V464zm160-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"/>
                                    </svg>
                                    Правила
                                </Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)} style={{fontSize: 25}} className="text-light" to="/reviews" as={NavLink}>
                                    <svg style={{marginRight: 5}} xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                         viewBox="0 0 512 512">
                                        <path fill="#fff"
                                              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                                    </svg>
                                    Статьи
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </NavbarBs.Offcanvas>
                </>}
            </Container>
        </NavbarBs>
    );
};

export default Navbar;