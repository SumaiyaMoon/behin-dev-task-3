import React, { useState } from "react";
import "./chatList.css";
import { Add, Remove, Search } from "@mui/icons-material";
import SMIconButton from "../../UIComponents/SMIconButton";
import Avatar from "../../../assets/avatar.png";
import SMAddUser from "./addUser/SMAddUser";
export default function SMChatList() {
  // Changing Icon
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        <SMIconButton
          SMIcon={
            addMode ? (
              <Remove className="search-btn" />
            ) : (
              <Add className="search-btn" />
            )
          }
          color={"inherit"}
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <SMAddUser />}
    </div>
  );
}
