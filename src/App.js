import "./App.css";
import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Login from "./Login";

function App() {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="app">
            {!user ? (
                <Login />
            ) : (
                <div className="app_body">
                    <Router>
                        <Sidebar />
                        <Routes>
                            <Route
                                path="/rooms/:roomId"
                                element={<Chat />}
                            ></Route>
                            <Route path="/" element={<Chat />}></Route>
                        </Routes>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;
