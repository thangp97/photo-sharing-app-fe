import React, { useEffect, useState } from "react";
import { AppBar, Button, colors, Toolbar, Typography } from "@mui/material";
import models from '../../modelData/models.js' 

import "./styles.css";
import { useLocation, useParams, matchPath, Link, useNavigate } from "react-router-dom";
import UpdatePhoto from "../UpdatePhoto/index"

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const value = JSON.parse(localStorage.getItem('id')) || null;
    const navigate = useNavigate();
    const logOut = () => {
      localStorage.removeItem('id');
      navigate("/");
      window.location.reload();
    }

    useEffect(() => {
      // Tìm userId từ pathname
      const match = matchPath({path: "/users/:userId"}, location.pathname) ||
        matchPath({path: "/photos/:userId"}, location.pathname);
       
      const userId = match?.params?.userId;  

      if(userId) {
        const name = models.userModel(userId);
        setUser(name);
      } else {
        setUser(null);
      }

    }, [location]);

    let rightContent = "Welcome to PhotoShare";

    if (user) {
      if (location.pathname.startsWith("/photos")) {
        rightContent = `Photos of ${user.first_name} ${user.last_name}`;
      } else if (location.pathname.startsWith("/users")) {
        rightContent = `${user.first_name} ${user.last_name}`;
      }
    }
  
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="inherit">
            Phạm Mạnh Thắng
          </Typography>
          <Typography variant="h6" color="inherit">{rightContent}</Typography>
          {value && (
            <>
              <UpdatePhoto/>
              <Typography>Hi {value.last_name}</Typography>
              <Typography className="button" component={Link} onClick={logOut}>Log out</Typography>
            </>
          )}
          {!value && (
            <Typography className="button" component={Link} to={`/login`}>Please Login</Typography>
          )}
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
