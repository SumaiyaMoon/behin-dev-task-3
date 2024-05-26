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
import { auth, db } from "../../config/firebaseConfig";
import { useUserStore } from "../../config/zustand/userStore";
import { useChatStore } from "../../config/zustand/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function SMDetail() {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock }: any =
    useChatStore();
  const { currentUser }: any = useUserStore();

  const handleBlock = async () => {
    if (!user || !currentUser) return;

    const currentUserDocRef: any = doc(db, "users", currentUser.id);
    const userDocRef: any = doc(db, "users", user.id);

    try {
      // Update block status for the current user
      await updateDoc(currentUserDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      // Update block status for the receiver user
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(currentUser.id)
          : arrayUnion(currentUser.id),
      });

      changeBlock(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || Avatar} alt="" />
        <h2>{user?.username || "unknown"}</h2>
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
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
