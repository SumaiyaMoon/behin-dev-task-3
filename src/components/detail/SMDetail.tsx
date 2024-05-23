import React from "react";
import "./detail.css";
import Avatar from "../../assets/avatar.png";
import TableImage from "../../assets/TableImage.jpg";
import {
  ArrowDownward,
  ArrowUpward,
  Download,
  Help,
  Settings,
} from "@mui/icons-material";
import { auth } from "../../config/firebaseConfig";

export default function SMDetail() {
  return (
    <div className="detail">
      <div className="user">
        <img src={Avatar} alt="" />
        <h2>Jane Doe</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, hic!
        </p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settigs</span>
            <Settings className="icons-img" />
          </div>
          <div className="title">
            <span>Privacy & help</span>
            <Help className="icons-img" />
          </div>
          <div className="title">
            <span>Shared Photos</span>
            <ArrowDownward className="icons-img" />
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src={TableImage} alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <Download className="photo-icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src={TableImage} alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <Download className="photo-icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src={TableImage} alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <Download className="photo-icon" />
            </div>
          </div>

          <div className="title">
            <span>Shared Files</span>
            <ArrowUpward className="icons-img" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
