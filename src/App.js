import './App.css';

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute";

const App = (props) => {
  const [user,setUser] = useState();
  const value = localStorage.getItem('id');


  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            <div className='edit'>
            {value && (
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
            )}
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                    path="/"
                    element = {<TopBar/>}
                  />
                  <Route
                      path="/users/:userId"
                      element = {
                        <ProtectedRoute>
                          <UserDetail />
                        </ProtectedRoute>
                    }
                  />
                  <Route
                      path="/photos/:userId"
                      element = {
                        <ProtectedRoute>
                          <UserPhotos />
                        </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element = {<LoginRegister onLogin={setUser}/>}
                  />
                  <Route path="/users" element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                    } />
                </Routes>
              </Paper>
            </Grid>
            </div>
          </Grid>
        </div>
      </Router>
  );
}

export default App;
