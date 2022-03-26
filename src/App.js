import "./App.css";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <div className="app_body">
                <Router>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Chat />}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
