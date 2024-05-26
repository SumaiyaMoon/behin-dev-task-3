import React, { useEffect, useState } from "react";
import "./chatList.css";
import { Add, Remove, Search } from "@mui/icons-material";
import SMIconButton from "../../UIComponents/SMIconButton";
import Avatar from "../../../assets/avatar.png";
import SMAddUser from "./addUser/SMAddUser";
import { useUserStore } from "../../../config/zustand/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useChatStore } from "../../../config/zustand/chatStore";

export default function SMChatList() {
  const [chats, setChats] = useState<any>([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser }: any = useUserStore();
  const { chatId, changeChat }: any = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) {
      console.log("currentUser is undefined");
      return;
    }

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || [];
        if (!items) {
          console.log("No chats found for currentUser");
          return;
        }

        const promises = items.map(async (item: any) => {
          if (!item.receiverId) {
            console.error("item.receiverId is undefined", item);
            return null;
          }

          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          if (!user) {
            console.error("User not found for receiverId", item.receiverId);
            return { ...item, user: { username: "Unknown" } };
          }

          return { ...item, user };
        });

        const chatData = await Promise.all(promises.filter(Boolean));
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  // console.log(chats);

  const handleSelect = async (chat: any) => {
    const userChats = chats.map((item: any) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item: any) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChats = chats.filter((c: any) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e: any) => setInput(e.target.value)}
          />
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
      {filteredChats.map((chat: any) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#57C0D9",
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? Avatar
                : chat.user.avatar || Avatar
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username || "Anonymous"}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <SMAddUser />}
    </div>
  );
}
