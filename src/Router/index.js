import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import SettingProfile from "../Pages/SettingProfile";
import Login from "../Pages/Auth/Login";
import Regis from "../Pages/Auth/Regis";
import User from "../Pages/User";
import AddUser from "../Pages/AddUser";


function Router(props) {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user/settingprofile/:id" element={<SettingProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regis" element={<Regis />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/adduser" element={<AddUser />} />
    </Routes>
  );
}

export default Router;
