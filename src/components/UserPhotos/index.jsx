import React, { useEffect, useState } from "react";
import { 
  Typography, 
  ListItem, 
  List, 
  Divider, 
  ListItemButton, 
  ListItemText, 
  Paper,
  Box
} from "@mui/material";

// import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from '../../modelData/models.js'
import fetchModel from "../../lib/fetchModelData.js"

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const user = useParams();
    // const userPhoto = models.photoOfUserModel(user.userId);
    const [userPhoto,setUserPhoto] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState();

    const handleSubmit = async (event,photo) => {
      event.preventDefault();
      const user = JSON.parse(localStorage.getItem('id'));
      console.log(user);
      const comments = {
        comment: comment,
        user_id: user._id,
      }
      console.log(comments);

      try {
        const resonpse = await fetch(`http://localhost:8081/api/photo/commentsOfPhoto/${photo}`,  {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comments),
        });

        if(resonpse.ok) {
          window.location.reload();
        } else {
          console.log(resonpse);
          alert("Error Comment");
        }
      } catch (err) {
        console.error(err);
        setError("Can not fetch to New Comment");
      }

    }

    useEffect(() => {
      const fetchPhoto = async () => {
        try {
          const data = await fetchModel(`/api/photo/${user.userId}`); 
          setUserPhoto(data);
        } catch (err) {
          console.error("Fail to fetch: ", err);
          setError("Can not connect to Photo");
        } finally {
          setLoading(false);
        }
      };
      fetchPhoto();
      
    },[user.userId]);

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
    
    if (loading) return <p>Đang tải dữ liệu...</p>;
    if(error) return <p>{error}</p>
      
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Photos (User ID: {user.userId})
        </Typography>

        {userPhoto.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            User do not have Photo.
          </Typography>
        ) : (
          userPhoto.map((photo) => (
            <Paper key={photo._id} elevation={3} sx={{ p: 2, mb: 4 }}>
              <Box textAlign="center">
                <img
                  src={`http://localhost:8081/images/${photo.file_name}`}
                  alt="Photo"
                  style={{ width: "100%", maxWidth: 600, borderRadius: 5 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Date and time: {photo.date_time}
              </Typography>
              <Divider sx={{ my: 2 }} />

              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <List key={comment._id} sx={{ pl: 2, borderLeft: '4px solid #eee', mb: 2 }}>
                    <Typography fontWeight="bold" gutterBottom>
                      {comment.user_id ? (
                        <ListItemButton component={Link} to={`/users/${comment.user_id}`}>
                          <ListItemText
                            primary={
                              users.find(u => u._id === comment.user_id)?.last_name || "Unknown"
                            }
                          />
                        </ListItemButton>
                      ) : (
                        "Unknown user"
                      )}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date: {comment.date_time}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1">Comment: {comment.comment}</Typography>
                  </List>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments.
                </Typography>
              )}
              <Divider sx={{ my: 1 }} />
              <form
                onSubmit={(e) => handleSubmit(e,photo._id)}
              >
                <Textarea
                  placeholder="Comment"
                  required
                  sx={{ mb: 1 }}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Paper>
          ))
        )}
      </Box>

    );
}

export default UserPhotos;
