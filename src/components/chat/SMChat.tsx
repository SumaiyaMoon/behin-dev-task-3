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

export default function SMChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji);
  };

  console.log(text);

  const endRef = useRef<any>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={Avatar} alt="" />
          <div className="texts">
            <span>Jane Doe</span>
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
        <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit, vero?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit, vero?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit, vero?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src={TableImage} alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit, vero?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <Image className="icon-img" />
          <PhotoCamera className="icon-img" />
          <Mic className="icon-img" />
        </div>

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e: any) => {
            setText(e.target.value);
          }}
        />
        <div className="emoji">
          {/* Emoji Icon */}
          <EmojiEmotions onClick={() => setOpen((prev) => !prev)} />
          {/* Emoji Picker */}
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBtn">Send</button>
      </div>
    </div>
  );
}
