import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err: any) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
