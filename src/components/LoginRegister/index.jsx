import { AppBar, Toolbar, Typography, Box, Input } from "@mui/material";
import { useEffect, useState } from "react";
import fetchModel from '../../lib/fetchModelData.js'

function LoginRegister () {

    const [creds, setCreds] = useState({});
    const [error, setError] = useState();

    const handleLogin = async () => {
        try {
           const fetch = await fetchModel("/api/user/admin/login");
           if(fetch) 
        }
    };

    return (
        <Box>
            <Typography>Login/Register</Typography>
            <Typography>Login</Typography>
            <Typography style={{display:"flex", justifyContent:"space-between"}}>
                <Typography>User: </Typography>
                <Input type="text" placeholder="Enter username"
                    onChange={(e) => setCreds({login_name: e.target.value})}    
                ></Input>
            </Typography>
            <Button onClick>Login</Button>
        </Box>
    )
}

export default LoginRegister;