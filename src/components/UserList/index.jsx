import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Box
} from "@mui/material";
import { Link } from 'react-router-dom';

import "./styles.css";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData.js"

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await fetchModel("/api/user/list");
          setUsers(data);
        } catch (err) {
          console.error("Error while fetching User:", err);
          setUsers([]);
        }
      };
      fetchUsers();
    }, []);
    return (
      <Paper elevation={2} sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          List of Users
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <Box key={item._id}>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                sx={{ borderRadius: 1, '&:hover': { backgroundColor: '#f1f1f1' } }}
              >
                <ListItemText primary={item.first_name + " " + item.last_name } />
              </ListItemButton>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>
    );
}

export default UserList;
