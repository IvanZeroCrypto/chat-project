import { useContext, useEffect, useRef, useState } from "react";
import socket from "../utils/socket";
import authStore from "../store/AuthStore";
import { ChatContext } from "./providers/ChatProvider";
import ChatHeader from "./chat-components/ChatHeader";
import InfoChat from "./chat-components/InfoChat";
import RoomService from "../http/services/RoomService";
import type { IMessage, IRoom } from "../types/roomResponse/roomResponse";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState<string>("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [options, setOptions] = useState(false);
  const [addOpen, setOpenAdd] = useState(false);
  const [data, setData] = useState<IRoom>();
  const { selectedChat } = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = authStore();

  function times(date: string | number | Date) {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const timeString = formatter.format(new Date(date)).replace(":", ".");
    return timeString;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    if (!selectedChat?.id) {
      return;
    }

    socket.emit("ROOM:JOIN", {
      roomId: selectedChat?.id,
      userName: user?.userName,
      userId: user?.id,
    });

    const historyMessage = async () => {
      if (selectedChat?.id) {
        const { data, status } = await RoomService.getByIdRoom(
          selectedChat?.id
        );
        if (status === 200 && data) {
          console.log(data.messages, "datamessages");
          setMessageList(data?.messages ?? []);
          setData(data);
        }
      }
    };
    historyMessage();

    const handleMessage = ({
      userName,
      text,
      userId,
      roomId,
    }: {
      userName: string;
      text: string;
      userId: string;
      roomId: string;
    }) => {
      const data: IMessage = {
        createdAt: new Date().toISOString(),
        roomId: roomId,
        text: text,
        user: {
          id: userId,
          userName: userName,
        },
      };
      if (roomId === selectedChat.id) {
        setMessageList((prev) => [...prev, data]);
      }
    };
    socket.on("ROOM:NEW_MESSAGE", handleMessage);

    return () => {
      socket.off("ROOM:NEW_MESSAGE", handleMessage);
      socket.emit("ROOM:LEAVE", { roomId: selectedChat.id });
    };
  }, [selectedChat?.id]);

  const handleMessageAdd = () => {
    if (message.trim()) {
      socket.emit("ROOM:NEW_MESSAGE", {
        userName: user?.userName,
        userId: user?.id,
        roomId: selectedChat?.id,
        message,
      });
      setMessage("");
    }
  };

  const closed = () => {
    setOptions(!options);
    setTabSelect("");
  };

  return (
    <>
      <div className="  w-full  relative">
        {selectedChat?.id ? (
          <div>
            <ChatHeader
              closed={closed}
              selectedChatName={selectedChat?.name}
              isPrivate={data?.private ?? false}
            />
            <div className=" absolute top-[10%] bottom-[10%]  left-0 right-0 px-4 overflow-y-auto  pt-5">
              {options && (
                <InfoChat
                  closed={closed}
                  setTabSelect={setTabSelect}
                  tabSelect={tabSelect}
                  data={data ?? ({} as IRoom)}
                  setOpenAdd={setOpenAdd}
                  addOpen={addOpen}
                  setOptions={setOptions}
                />
              )}
              {messageList?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg?.userId === user?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg my-1 break-words whitespace-normal   ${
                      msg?.userId === user?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-sm">
                        {" "}
                        {msg.user?.userName}
                      </span>

                      <span className="text-[12px] ">
                        {times(msg.createdAt)}
                      </span>
                    </div>
                    <div>{msg?.text}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3  w-full  h-[10%] bg-teal-400   absolute bottom-0 ">
              <div className="flex gap-2 absolute right-3 left-3 top-1/2 -translate-y-1/2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full outline-0 py-2 px-3 rounded-[6px] bg-white"
                  type="text"
                />
                <button
                  onClick={handleMessageAdd}
                  className="bg-green-500 hover:bg-green-700 rounded-[8px] py-1 px-2 text-white font-bold cursor-pointer"
                >
                  Отправить
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {" "}
              <h1 className="font-bold text-center">
                {" "}
                Выберите чат чтобы начать общаться....
              </h1>
              <img src="../../public/images/чат-418x315.jpg" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
