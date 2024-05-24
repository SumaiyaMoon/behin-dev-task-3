import "./adduser.css";
import Avatar from "../../../../assets/avatar.png";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import { useState } from "react";
import { useUserStore } from "../../../../config/zustand/userStore";
export default function SMAddUser() {
  const [user, setUser] = useState<any>(null);
  const { currentUser }: any = useUserStore();

  const handleSearch = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q: any = query(userRef, where("username", "==", username));

      const querySnapShot: any = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const userChatData = {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      };

      const currentUserChatData = {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      };

      await setDoc(doc(userChatsRef, user.id), userChatData, { merge: true });
      await setDoc(doc(userChatsRef, currentUser.id), currentUserChatData, {
        merge: true,
      });

      console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="addUser">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Username" name="username" />
          <button>Search</button>
        </form>
        {user && (
          <div className="user">
            <div className="detail">
              <img src={user.avatar || Avatar} alt="" />
              <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
          </div>
        )}
      </div>
    </>
  );
}
