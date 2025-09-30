import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./providers/ChatProvider";
import roomStore from "../store/RoomStore";
import authStore from "../store/AuthStore";
import Button from "./UI/Button";
import Title from "./UI/Title";
import type { IUserMinimal } from "../types/User";

const ListChats = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { selectedChat, setSelectedChat } = useContext(ChatContext);
  const { getRooms, rooms, createRoom, loading } = roomStore();
  const { user } = authStore();

  const createGroup = async () => {
    try {
      if (name.trim()) {
        await createRoom(name);
        setName("");
        setOpen(false);
        alert("Группа создана");
        getRooms();
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);

  function namesChat(users: IUserMinimal[]) {
    const nameChat = users
      ?.filter(
        (value) => value.id !== user?.id && value.userName !== user?.userName
      )
      .map((i) => i.userName);

    return nameChat;
  }
  return (
    <div className=" py-1 px-3  w-[35%] bg-gray-100 relative ">
      <div
        onClick={() => setOpen(false)}
        className={`inline-block bg-teal-400 p-3 h-[150px] left-2 right-2 z-50 absolute ${
          open ? "translate-y-0" : "-translate-y-56"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full outline-0 p-2  rounded-[8px] bg-white"
            type="text"
            placeholder="Введите название группы"
          />

          <Button
            onClick={createGroup}
            loading={loading.createRoom}
            className="p-2 rounded-[6px] bg-teal-700 text-white my-2 mx-auto cursor-pointer"
          >
            Создать
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Title className="font-bold ml-5 my-1  ">Чаты</Title>
        <Button
          onClick={() => setOpen(true)}
          className="bg-teal-500 rounded-[8px] text-white cursor-pointer font-medium px-2 py-1 hover:bg-teal-600"
        >
          Создать группу
        </Button>
      </div>
      <div className="h-[500px] overflow-y-auto">
        {" "}
        {rooms.length > 0 &&
          rooms?.map((room) => (
            <div
              onClick={() => setSelectedChat(room)}
              className={`hover:bg-teal-50 rounded-[4px] p-1 cursor-pointer ${
                selectedChat?.id === room.id ? "bg-teal-400" : ""
              }`}
            >
              <div className="flex items-center justify-between py-3">
                <button className="text-base font-medium">
                  {room.private ? namesChat(room?.users ?? []) : room.name}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListChats;
