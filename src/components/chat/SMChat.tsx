import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Avatar from "../../assets/avatar.png";
import TableImage from "../../assets/TableImage.jpg";
import {
  EmojiEmotions,
  Image,
  Info,
  Mic,
  Phone,
  PhotoCamera,
  Videocam,
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useChatStore } from "../../config/zustand/chatStore";
import { useUserStore } from "../../config/zustand/userStore";
import upload from "../../config/upload";

export default function SMChat() {
  const [chat, setChat] = useState<any>();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked }: any =
    useChatStore();
  const { currentUser }: any = useUserStore();

  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e: any) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // console.log(text);

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl ? { img: imgUrl } : {}),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id: any) => {
        const userChatsRef: any = doc(db, "userchats", id);
        const userChatsSnapshot: any = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (chat: any) => chat.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].isUpdatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.error(err);
    }

    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  const endRef = useRef<any>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res: any) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log(user);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || Avatar} alt="" />
          <div className="texts">
            <span>
              {isCurrentUserBlocked || isReceiverBlocked
                ? "N/A"
                : user?.username}
            </span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <Phone className="icon-img" />
          <Videocam className="icon-img" />
          <Info className="icon-img" />
        </div>
      </div>

      <div className="center">
        {chat &&
          chat.messages.map((message: any) => (
            <div
              className={`message ${
                message.senderId === currentUser.id ? "own" : ""
              }`}
              key={message.createdAt}
            >
              <div className="texts">
                {message.img ? <img src={message.img} alt="" /> : null}
                <p>{message.text}</p>
                {/* <span>{message.createdAt}</span> */}
              </div>
            </div>
          ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <Image className="icon-img" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <PhotoCamera className="icon-img" />
          <Mic className="icon-img" />
        </div>

        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message.."
              : "Type a message..."
          }
          value={text}
          onChange={(e: any) => {
            setText(e.target.value);
          }}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          {/* Emoji Icon */}
          <EmojiEmotions onClick={() => setOpen((prev) => !prev)} />
          {/* Emoji Picker */}
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendBtn"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
}
