import React, { createContext, useState, type FC, type ReactNode } from "react";
import type { IRoom } from "../../types/roomResponse/roomResponse";

interface ChatContextValue {
  selectedChat: IRoom | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<IRoom | null>>;
}

export const ChatContext = createContext<ChatContextValue>({
  selectedChat: null,
  setSelectedChat: () => {},
});

interface IChatProvider {
  children: ReactNode;
}

const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<IRoom | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
