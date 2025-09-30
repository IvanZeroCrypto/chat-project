import React, { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { useNavigate } from "react-router-dom";
import authStore from "../../store/AuthStore";
import ListFriends from "../ListFriends";
import ListChats from "../ListChats";
import Chat from "../Chat";
import ChatProvider from "../providers/ChatProvider";
import Header from "../header/Header";

export interface IData {
  id: string;
  userName: string;
  status: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  const { isAuth, user } = authStore();
  const [listFriendOnline, setData] = useState<IData[]>([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, user]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const handleConnect = () => {
      socket.emit("authenticate", user?.id);
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    socket.on("friendStatus", (data: IData) => {
      setData((prev) => {
        if (!prev) return [data];
        if (prev.some((item) => item?.id === data?.id)) {
          return prev.map((item) =>
            item?.id === data?.id ? { ...item, status: data?.status } : item
          );
        } else {
          return [...prev, data];
        }
      });
    });

    return () => {
      socket.off("connect");
      socket.off("friendStatus");
    };
  }, [user?.id]);

  return (
    <div className=" w-full h-[100vh] flex flex-col">
      <ChatProvider>
        <Header />
        <div className="w-full flex h-[100vh]">
          <ListFriends listFriendOnline={listFriendOnline} />
          <ListChats />
          <Chat />
        </div>
      </ChatProvider>
    </div>
  );
};

export default Home;
