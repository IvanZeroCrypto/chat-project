import { useEffect, type FC } from "react";
import friendStore from "../store/FriendStore";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import RoomService from "../http/services/RoomService";
import { GiQueenCrown } from "react-icons/gi";
import type { IRoom } from "../types/roomResponse/roomResponse";

interface IAddPeopleInRoom {
  data: IRoom;
}

const AddPeopleInRoom: FC<IAddPeopleInRoom> = ({ data }) => {
  const { getAllMyFriends, listMyFriends } = friendStore();

  useEffect(() => {
    getAllMyFriends();
  }, []);

  function findUser(id: string) {
    let existing;
    if (data?.users) {
      existing = data?.users?.find((item) => item.id === id);
    }
    return existing;
  }
  const addUserRoom = async (id: string) => {
    const add = await RoomService.addUserRoom(data?.id, id);
    alert(add?.data?.message);
    try {
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="absolute top-28 right-[550px] w-[200px] inline-block p-2 bg-teal-50">
        {listMyFriends?.map(({ id, userName }) => (
          <div className="flex items-center justify-between">
            <span>{userName}</span>
            {findUser(id) ? (
              <button
                className="cursor-pointer hover:scale-110"
                title="Уже добавлен"
              >
                <FaCheck />
              </button>
            ) : id === data?.ownerId ? (
              <button
                className="cursor-pointer hover:scale-110"
                title="Владелец группы"
                onClick={() => addUserRoom(id)}
              >
                <GiQueenCrown />
              </button>
            ) : (
              <button
                className="cursor-pointer hover:scale-110"
                title="Добавить"
                onClick={() => addUserRoom(id)}
              >
                <IoAddCircleOutline size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddPeopleInRoom;
