import React, {FC, useContext, useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Tournaments from "./pages/Tournaments";
import Players from "./pages/Players";
import Rules from "./pages/Rules";
import Reviews from "./pages/Reviews";
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import {AuthContext} from "./main";
import {observer} from "mobx-react-lite";
import Error from "./pages/Error";
import Confirm from "./pages/Confirm";

const App: FC = () => {
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem('jwt-token') && !auth.isAuth) {
            auth.checkAuth().then();
        }
    });

    return (
        <>
            <Navbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/tournaments" element={<Tournaments/>}/>
                    <Route path="/players" element={<Players/>}/>
                    <Route path="/rules" element={<Rules/>}/>
                    <Route path="/reviews" element={<Reviews/>}/>
                    <Route path="/auth" element={!auth.isAuth ? <Auth/> : <Navigate to={'/'}/>}/>
                    <Route path="/registration" element={auth.isAuth ? <Navigate to={'/'}/> : <Registration/>}/>
                    <Route path="/confirm/:id" element={auth.isAuth ? <Navigate to={'/'}/> : <Confirm />}/>
                    <Route path={'/error'} element={<Error/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default observer(App);
