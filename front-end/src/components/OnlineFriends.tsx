import type { FC } from "react";
import Friend from "./Friend";
import type { IData } from "./pages/Home";

interface IOnlineFriendsProps {
  listFriendOnline: IData[];
}

const OnlineFriends: FC<IOnlineFriendsProps> = ({ listFriendOnline }) => {
  return (
    <div>
      {listFriendOnline
        ?.filter(({ status }) => status)
        .map(({ id, userName }) => (
          <Friend userName={userName} key={id} id={id} isOnline={true} />
        ))}
    </div>
  );
};

export default OnlineFriends;
