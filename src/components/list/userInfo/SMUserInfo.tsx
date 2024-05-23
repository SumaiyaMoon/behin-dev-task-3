import React from "react";
import "./userInfo.css";
import { Edit, MoreHoriz, Videocam } from "@mui/icons-material";
import avatar from "../../../assets/avatar.png";
import { useUserStore } from "../../../config/userStore";
export default function SMUserInfo() {
  const { currentUser }: any = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || avatar} alt="" />
        <h3>{currentUser.username}</h3>
      </div>
      <div className="icons">
        <MoreHoriz className="icon-img" />
        <Videocam className="icon-img" />
        <Edit className="icon-img" />
      </div>
    </div>
  );
}
