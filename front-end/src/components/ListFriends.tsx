import { useEffect, useState, type FC } from "react";
import FriendService from "../http/services/FriendService";
import friendStore from "../store/FriendStore";
import Title from "./UI/Title";
import Button from "./UI/Button";
import BlockSelectButton from "./BlockSelectButton";
import BlockListFriends from "./BlockListFriends";
import type { IData } from "./pages/Home";

interface IListFriends {
  listFriendOnline: IData[];
}

const ListFriends: FC<IListFriends> = ({ listFriendOnline }) => {
  const [choice, setChoice] = useState<string>("all");
  const {
    FriendRequestToMy,
    listFriendRequestToMy,
    FriendRequestSent,
    listFriendRequestSent,
    getAllMyFriends,
    friendRequestConfirmation,
  } = friendStore();

  useEffect(() => {
    FriendRequestToMy();
    FriendRequestSent();
    getAllMyFriends();
  }, []);

  const addFriend = async (id: number, fromId: string) => {
    try {
      friendRequestConfirmation(id, fromId);
      FriendRequestToMy();
      getAllMyFriends();
    } catch (error) {
      alert("ошибка подьверждения запроса в друзья");
    }
  };
  const removeRequest = async (id: number) => {
    try {
      const { data, status } = await FriendService.deleteFriendRequest(id);
      if (data && status === 200) {
        FriendRequestSent();
        alert(data?.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="  w-[20%] bg-gray-100 p-1 overflow-y-auto">
      <Title className="font-bold text-[16px] my-1">Друзья</Title>
      <BlockSelectButton setChoice={setChoice} choice={choice} />
      <div>
        <BlockListFriends choice={choice} listFriendOnline={listFriendOnline} />
        <div className="">
          <Title className="p-1 font-medium">Запросы в друзья</Title>
          <div className="">
            {listFriendRequestToMy?.map((item) => (
              <div className="flex items-center justify-between">
                <Title className="font-bold text-[16px] my-1">
                  {item?.from?.userName}
                </Title>
                <Button
                  className="py-[3px] px-[6px] bg-teal-500 text-white font-medium"
                  onClick={() => addFriend(item.id, item.fromId)}
                >
                  Добавить
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <Title className="p-1 font-medium ">
            Отправленные запросы в друзья
          </Title>
          <div className="">
            {listFriendRequestSent?.map((item) => (
              <div className="flex items-center justify-between">
                <Title className="font-bold text-[16px] my-1">
                  {item?.to?.userName}
                </Title>

                <Button
                  className="py-[3px] px-[6px] bg-teal-500 text-white font-medium"
                  onClick={() => removeRequest(item?.id)}
                >
                  Отменить
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFriends;
