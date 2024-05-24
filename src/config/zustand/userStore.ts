import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Define the shape of the user object
interface User {
  id: string;
  blocked: string[];
}

// Define the shape of the user store state
interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  fetchUserInfo: (uid: string) => Promise<void>;
}

// Create the user store
export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() as User, isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err: any) {
      console.log(err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
