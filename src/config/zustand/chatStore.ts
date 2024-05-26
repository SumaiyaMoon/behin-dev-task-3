import { create } from "zustand";
import { User } from "./type";
import { useUserStore } from "./userStore";

// Define the shape of the chat store state
interface ChatState {
  chatId: string | null;
  user: User | null;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chatId: string, user: User) => void;
  changeBlock: (userId: string) => void;
}

// Create the chat store
export const useChatStore = create<ChatState>((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    if (!currentUser) {
      return;
    }

    // Check if current user is blocked
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if receiver is blocked
    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    // If neither is blocked, update the chat state
    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
  changeBlock: (userId) => {
    set((state) => {
      const { currentUser } = useUserStore.getState();
      if (!currentUser) {
        return state;
      }

      const isCurrentlyBlocked = currentUser.blocked.includes(userId);
      const updatedBlocked = isCurrentlyBlocked
        ? currentUser.blocked.filter((id) => id !== userId)
        : [...currentUser.blocked, userId];

      useUserStore.setState({
        currentUser: { ...currentUser, blocked: updatedBlocked },
      });

      return {
        ...state,
        isReceiverBlocked: !isCurrentlyBlocked,
      };
    });
  },
}));
