import React, { useEffect } from "react";
import "./App.css";
import SMList from "./components/list/SMList";
import SMChat from "./components/chat/SMChat";
import SMDetail from "./components/detail/SMDetail";
import SMLogin from "./components/login/SMLogin";
import SMNotification from "./components/UIComponents/SMNotification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { useUserStore } from "./config/zustand/userStore";
import Loader from "./assets/loader.gif";
import { useChatStore } from "./config/zustand/chatStore";
function App() {
  const { currentUser, isLoading, fetchUserInfo }: any = useUserStore();
  const { chatId }: any = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user: any) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return <img src={Loader} className="loader" alt="" width="250px" />;

  return (
    <div className="app-container">
      {currentUser ? (
        <>
          <SMList />
          {chatId && <SMChat />}
          {chatId && <SMDetail />}
        </>
      ) : (
        <SMLogin />
      )}
      <SMNotification />
    </div>
  );
}
export default App;
