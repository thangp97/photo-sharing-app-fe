import React, { useEffect, useState } from "react";
import {Typography, ListItemButton, ListItemText, Paper, Box, CircularProgress} from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models.js"
import fetchModel from "../../lib/fetchModelData.js"

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    // const userDetail = models.userModel(user.userId);
    const [userDetail, setUserDetail] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchUser = async() => {
        try {
          const data = await fetchModel(`/api/user/${user.userId}`);
          setUserDetail(data);
        }catch (err) {
          console.error("Fail to fetch: ", err);
          setError("Not Found");
        }
      };
      fetchUser();
    }, [user.userId]);

    if(error) return <p>{error}</p>

    if(!userDetail) return <div>Loading...</div>

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h5" gutterBottom>
          {userDetail.last_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {userDetail.location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Occupation: {userDetail.occupation}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Description: {userDetail.description}
        </Typography>
        <Box mt={2}>
          <ListItemButton component={Link} to={`/photos/${user.userId}`} sx={{ backgroundColor: '#e3f2fd', borderRadius: 1 }}>
            <ListItemText primary={`View ${userDetail.last_name}'s Photos`} />
          </ListItemButton>
        </Box>
        </Paper>
    );
}

export default UserDetail;
