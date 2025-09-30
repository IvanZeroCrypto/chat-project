import React, { useState, type FC } from "react";
import Button from "./UI/Button";
import RoomService from "../http/services/RoomService";
import axios from "axios";

interface IUpdateRoomNameProps {
  roomId: string;
  setOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRoomName: FC<IUpdateRoomNameProps> = ({ roomId, setOptions }) => {
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const updateRoomName = async () => {
    try {
      setLoading(true);
      const { data, status } = await RoomService.updateNameRoom(
        roomId,
        newName
      );
      if (data && status === 200) {
        setLoading(false);
        setOptions(false);
        setNewName("");
        alert(data?.message);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        alert(error?.message);
      }
    }
  };

  return (
    <div className="flex items-center gap-1">
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border py-1 px-2 rounded-[10px]"
        type="text"
        placeholder="Введите новое название"
      />
      <Button
        loading={loading}
        onClick={updateRoomName}
        className="bg-teal-300 hover:bg-teal-400 hover:-translate-y-1 rounded-[6px] p-1 ease-in duration-200"
      >
        Обновить
      </Button>
    </div>
  );
};

export default UpdateRoomName;
