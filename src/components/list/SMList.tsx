import React from "react";
import "./list.css";
import SMUserInfo from "./userInfo/SMUserInfo";
import SMChatList from "./chatList/SMChatList";
export default function SMList() {
  return (
    <div className="list">
      <SMUserInfo />
      <SMChatList />
    </div>
  );
}
