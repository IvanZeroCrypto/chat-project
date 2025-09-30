import { type FC } from "react";
import Friend from "./Friend";
import OnlineFriends from "./OnlineFriends";
import friendStore from "../store/FriendStore";
import type { IData } from "./pages/Home";

interface IBlockListFriendsProps {
  choice: string;
  listFriendOnline: IData[];
}

const BlockListFriends: FC<IBlockListFriendsProps> = ({
  choice,
  listFriendOnline,
}) => {
  const { listMyFriends } = friendStore();
  return (
    <div className=" h-full  ">
      {choice === "all" ? (
        <div className="bg-white w-full py-2 px-2 mt-2 max-h-[300px]  overflow-y-auto">
          {listMyFriends?.map(({ id, userName }) => (
            <Friend userName={userName} key={id} id={id} isOnline={false} />
          ))}
        </div>
      ) : (
        <div className="bg-white w-full py-2 px-2 mt-2">
          <OnlineFriends listFriendOnline={listFriendOnline} />
        </div>
      )}
    </div>
  );
};

export default BlockListFriends;
