import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import icon96 from "./icon96.png";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_container">
                <img src={icon96} alt="" />
                <div className="login_text">
                    <h1>Sign in to HappyChat</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign in With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
