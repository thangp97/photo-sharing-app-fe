import { AppBar, Toolbar, Typography, Box, Input, Button, ListItemText, ListItemButton, Link as MuiLink, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import fetchModel from '../../lib/fetchModelData.js'
import { useNavigate } from "react-router-dom";
import './styles.css';

function LoginRegister ({ onLogin }) {

    const [creds, setCreds] = useState({});
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();

    const handleRegister = async () => {
        if(!creds.login_name || !creds.password || !creds.first_name || !creds.last_name) {
            setError("Login name, password, first name, last name are required");
            return;
        }
        if(creds.password !== confirmPassword) {
            setError("Password do not match");
            return;
        }

        try {
            const response = await fetch("https://36jyvf-8081.csb.app/api/user", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(creds),
            })

            if(response.ok) {
                setCreds({
                    login_name: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    location: "",
                    description: "",
                    occupation: ""
                });
                setConfirmPassword("");
                setError("Registration successful!");
            } else {
                console.error("Can not create User from Backend");
                setError("Already have login name");
            }

        } catch (err) {
            console.error("Register error:", err);
            setError("Register Failed");
        } 
    }

    const handleLogin = async () => {
        if(!creds.login_name || !creds.password) {
            console.error("Empty Login");
            setError("Empty Login/Password");
            return;
        }
        try {
           const response = await fetch("https://36jyvf-8081.csb.app/api/user/admin/login", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
           })

           if(response.ok) {
                setCreds({

                })
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
        <Box className="page-wrapper">
        {register ? (
            <div className="form-container">

            <TextField
                label="Username"
                required
                fullWidth
                value={creds.login_name || ""}
                onChange={(e) => setCreds({ ...creds, login_name: e.target.value })}
            />
            <TextField
                label="Password"
                required
                fullWidth
                type="password"
                value={creds.password || ""}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
            <TextField
                label="Confirm Password"
                required
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
                label="First Name"
                required
                fullWidth
                value={creds.first_name || ""}
                onChange={(e) => setCreds({ ...creds, first_name: e.target.value })}
            />
            <TextField
                label="Last Name"
                required
                fullWidth
                value={creds.last_name || ""}
                onChange={(e) => setCreds({ ...creds, last_name: e.target.value })}
            />
            <TextField
                label="Location"
                value={creds.location || ""}
                fullWidth
                onChange={(e) => setCreds({ ...creds, location: e.target.value })}
            />
            <TextField
                label="Description"
                value={creds.description || ""}
                fullWidth
                onChange={(e) => setCreds({ ...creds, description: e.target.value })}
            />
            <TextField
                label="Occupation"
                value={creds.occupation || ""}
                fullWidth
                onChange={(e) => setCreds({ ...creds, occupation: e.target.value })}
            />

            <div className="button-row">
                <Button onClick={handleRegister} variant="contained" color="primary">Register Me</Button>
                <Button onClick={() => setRegister(false)} variant="outlined" color="secondary">Back</Button>
            </div>
            </div>
        ) : (
            <div className="form-container">
                <TextField
                    label="Username"
                    required
                    fullWidth
                    value={creds.login_name || ""}
                    onChange={(e) => setCreds({ ...creds, login_name: e.target.value })}
                />
                <TextField
                    label="Password"
                    required
                    fullWidth
                    type="password"
                    value={creds.password || ""}
                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                />
                <div className="button-row">
                    <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
                    <Button onClick={() => setRegister(true)} variant="outlined" color="secondary">Register</Button>
                </div>
            </div>
        )}
        <br></br>
        {error && <Typography className="error-text">{error}</Typography>}
        </Box>
    )
}


export default LoginRegister;