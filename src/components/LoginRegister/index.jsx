import { AppBar, Toolbar, Typography, Box, Input, Button } from "@mui/material";
import { useEffect, useState } from "react";
import fetchModel from '../../lib/fetchModelData.js'
import { useNavigate } from "react-router-dom";

function LoginRegister ({ onLogin }) {

    const [creds, setCreds] = useState({});
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
           const response = await fetch("http://localhost:8081/api/user/admin/login", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
           })

           if(response.ok) {
                const id = await response.json();
                console.log(id);
                localStorage.setItem('id', JSON.stringify(id));
                onLogin && onLogin({login_name: creds.login_name});
                navigate(`/users/${id._id}`);
           } else {
            console.log(response);
            setError("Invalid username or password!");
           }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login Failed");
        }
    };

    return (
        <Box>
            {" "}
            <br />
            <span>Username:</span>
            <br />
            <input
                type="text"
                onChange={(e) => setCreds({ ...creds, login_name: e.target.value })}
            />
            <br />
            {/* <span>Password:</span>
            <br />
            <input
                type="password"
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
            <br /> */}
            <br />
            <button onClick={handleLogin}>Login</button>
            <p>{error}</p>
        </Box>
    )
}


export default LoginRegister;