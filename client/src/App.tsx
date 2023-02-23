import React from 'react';
import {useState} from 'react'
import {Routes, Route} from "react-router-dom";
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

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Navbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/tournaments" element={<Tournaments/>}/>
                    <Route path="/players" element={<Players/>}/>
                    <Route path="/rules" element={<Rules />}/>
                    <Route path="/reviews" element={<Reviews />}/>
                    <Route path="/auth" element={<Auth />}/>
                    <Route path="/registration" element={<Registration />}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </>
    )
}

export default App
