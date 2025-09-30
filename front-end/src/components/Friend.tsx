import { useContext, type FC } from "react";
import FriendService from "../http/services/FriendService";
import friendStore from "../store/FriendStore";
import { ChatContext } from "./providers/ChatProvider";
import RoomService from "../http/services/RoomService";
import roomStore from "../store/RoomStore";
import MessageBtn from "./buttons/MessageBtn";
import DeleteBtn from "./buttons/DeleteBtn";

interface IFriendProps {
  userName: string;
  id: string;
  isOnline: boolean;
}
const Friend: FC<IFriendProps> = ({ userName, id, isOnline }) => {
  const { getAllMyFriends } = friendStore();
  const { getRooms } = roomStore();
  const { setSelectedChat } = useContext(ChatContext);

  const deleteFriend = async () => {
    try {
      const { data, status } = await FriendService.deleteFriend(id);
      if (data && status === 200) {
        getAllMyFriends();
      }
    } catch (error) {
      alert(error);
    }
  };
  const createPrivateChat = async () => {
    try {
      const { data, status } = await RoomService.createRoom(userName, id);
      if (data && status === 200) {
        getRooms();
      }
    } catch (error) {
      setSelectedChat({
        id,
        name: userName,
      });
    }
  };
  return (
    <div className=" bg-gray-100 w-full p-2 mb-2 rounded-[8px] flex items-center justify-between">
      <div className="flex items-center gap-1">
        {isOnline && (
          <div
            data-testid="online-indicator"
            className="online-indicator"
          ></div>
        )}

        <span>{userName}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageBtn onClick={createPrivateChat} title="Написать сообщение" />
        <DeleteBtn onClick={deleteFriend} title="Удалить из друзей" />
      </div>
    </div>
  );
};

export default Friend;
