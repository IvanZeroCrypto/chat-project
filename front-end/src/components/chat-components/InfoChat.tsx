import React, { useContext, type FC } from "react";
import authStore from "../../store/AuthStore";
import MessageBtn from "../buttons/MessageBtn";
import AddFriendBtn from "../buttons/AddFriendBtn";
import CheckBtn from "../buttons/CheckBtn";
import friendStore from "../../store/FriendStore";
import AddAdminBtn from "../buttons/AddAdminBtn";
import DeleteBtn from "../buttons/DeleteBtn";
import AddPeopleInRoom from "../AddPeopleInRoom";
import RoomService from "../../http/services/RoomService";
import { ChatContext } from "../providers/ChatProvider";
import DeleteAdminBtn from "../buttons/DeleteAdminBtn";
import roomStore from "../../store/RoomStore";
import UpdateRoomName from "../UpdateRoomName";
import type { IRoom } from "../../types/roomResponse/roomResponse";

interface IInfoChat {
  closed: () => void;
  setTabSelect: React.Dispatch<React.SetStateAction<string>>;
  tabSelect: string;
  data: IRoom;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addOpen: boolean;
  setOptions: React.Dispatch<React.SetStateAction<boolean>>;
}
type minimalRoom = Pick<IRoom, "id" | "name">;

const InfoChat: FC<IInfoChat> = ({
  closed,
  setTabSelect,
  tabSelect,
  data,
  setOpenAdd,
  addOpen,
  setOptions,
}) => {
  const { user } = authStore();
  const { listMyFriends } = friendStore();

  const { deleteUserRoom } = roomStore();

  const { setSelectedChat } = useContext(ChatContext);

  function existingFriend(id: string | undefined) {
    const existingFriend = listMyFriends?.find((friend) => friend.id === id);
    return existingFriend;
  }
  function findAdmin(id: string) {
    const existingAdmin = data?.admins?.find((admin) => admin.id === id);
    return existingAdmin;
  }
  const addAdmin = async (id: string) => {
    try {
      await RoomService.addAdminRoom(data?.id, id);
    } catch (error) {
      alert(error);
    }
  };
  const deleteAdmin = async (id: string) => {
    try {
      await RoomService.deleteAdminRoom(data?.id, id);
    } catch (error) {
      alert(error);
    }
  };

  const createChat = (data: minimalRoom) => {
    setSelectedChat(data);
  };
  return (
    <div
      onClick={closed}
      className="absolute top-3 right-0 left-0 bottom-0 backdrop-blur-[8px] inline-block"
    >
      {" "}
      <div
        onClick={(e) => e.stopPropagation()}
        className={` absolute right-0 inline-block bg-teal-300 w-[250px] p-2 top-0 bottom-0 

`}
      >
        <button
          onClick={() => setTabSelect("People")}
          className="bg-white py-1 px-1 rounded-[6px] cursor-pointer mb-1"
        >
          Участники
        </button>
        <button
          onClick={() => setTabSelect("Update name")}
          className="bg-white py-1 px-1 rounded-[6px] cursor-pointer"
        >
          Изменить название группы
        </button>
      </div>
      {tabSelect !== "" && (
        <>
          <div className="inline-block p-2 bg-teal-100 absolute right-[250px] w-[300px] top-3">
            {tabSelect === "People" ? (
              <div onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  {" "}
                  <h1 className="">Владелец группы:</h1>
                  <div className="flex items-center">
                    {" "}
                    <div className="mr-1">
                      {data?.owner?.userName}{" "}
                      {data?.owner?.id === user.id ? "(я)" : ""}
                    </div>
                    <div className="flex items-center">
                      {data?.owner?.id !== user.id && (
                        <div className="flex items-center gap-1">
                          {" "}
                          <MessageBtn />
                          {existingFriend(data?.owner?.id) ? (
                            <CheckBtn title="Уже друзья" />
                          ) : (
                            <AddFriendBtn title="Добавить в друзья" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <hr />
                <div className="flex items-center justify-between pt-2">
                  {" "}
                  <h1 className="">Участники:</h1>
                  <button
                    onClick={() => setOpenAdd(!addOpen)}
                    title="Добавить участников"
                    className="bg-white rounded-[6px] px-1 border border-teal-500 text-teal-500 cursor-pointer hover:bg-teal-50"
                  >
                    +
                  </button>
                </div>
                {data?.users?.map(({ userName, id }) => (
                  <div key={id} className="flex items-center justify-between">
                    <h1 className="">
                      {userName}
                      {id === user.id && " (я)"}
                      {findAdmin(id) ? (
                        <span className="text-[12px] ml-1">(Админ группы)</span>
                      ) : (
                        ""
                      )}
                    </h1>
                    {id !== user.id && (
                      <div className="flex items-center gap-1">
                        <MessageBtn
                          onClick={() =>
                            createChat({
                              id,
                              name: userName,
                            })
                          }
                          title="Написать в лс"
                        />
                        {data?.ownerId === user.id && !findAdmin(id) ? (
                          <AddAdminBtn
                            onClick={() => addAdmin(id)}
                            title="Назначить администратором"
                          />
                        ) : data?.ownerId === user.id && findAdmin(id) ? (
                          <DeleteAdminBtn
                            title="Отозвать админку"
                            onClick={() => deleteAdmin(id)}
                          />
                        ) : (
                          ""
                        )}
                        {data?.ownerId === user.id ||
                        (findAdmin(user.id) && !findAdmin(id)) ? (
                          <DeleteBtn
                            onClick={() => deleteUserRoom(data?.id, id)}
                            title="Удалить с группы"
                          />
                        ) : (
                          ""
                        )}
                        {existingFriend(id) ? (
                          <CheckBtn title="Уже друзья" />
                        ) : (
                          <AddFriendBtn title="Добавить в друзья" />
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <hr />
              </div>
            ) : tabSelect === "Update name" ? (
              <div onClick={(e) => e.stopPropagation()}>
                <UpdateRoomName roomId={data?.id} setOptions={setOptions} />
              </div>
            ) : (
              ""
            )}
          </div>
          {addOpen && (
            <div onClick={(e) => e.stopPropagation()}>
              <AddPeopleInRoom data={data && data} />{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InfoChat;
