import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import FriendService from "../../http/services/FriendService";
import { IoPersonAdd } from "react-icons/io5";
import Loader from "../UI/Loader";
import axios from "axios";
const SearchUser = () => {
  const [searchUser, setSearchUser] = useState({ id: "", userName: "" });
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [open, setOpen] = useState(false);

  const click = async () => {
    if (searchId?.trim()) {
      setOpen(true);
      setSearchUser({ id: "", userName: "" });
      try {
        setLoading(true);
        const { data, status } = await FriendService.searchUser(searchId);
        if (data && status === 200) {
          setSearchUser(data);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          setLoading(false);
        }
      }
    }
  };
  const friendRequest = async () => {
    setOpen(false);
    setSearchUser({ id: "", userName: "" });

    try {
      if (searchUser.id) {
        const { data } = await FriendService.friendRequest(searchUser?.id);
        alert(data?.message);
      }
    } catch (error) {
      alert("ошибка добавления в друзья");
    }
  };
  return (
    <div className="relative">
      <input
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        type="text"
        className="py-1 pl-2 pr-7 rounded-[6px] outline-0 border border-teal-400 bg-white placeholder:text-[12px]"
        placeholder="Введите Id пользователя"
      />
      <button
        onClick={click}
        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer  px-1 hover:scale-110"
      >
        <IoSearchOutline />
      </button>
      {open && (
        <div className="absolute flex justify-between rounded-[6px] z-10 px-2 py-1 bg-white border border-teal-400 w-full">
          {loading ? (
            <Loader />
          ) : (
            <>
              {searchUser?.id ? (
                <>
                  <h1 className="">{searchUser.userName}</h1>
                  <button
                    onClick={friendRequest}
                    className="cursor-pointer hover:scale-110"
                  >
                    <IoPersonAdd title="Добавить" />
                  </button>
                </>
              ) : (
                <span>Пользователь не найден</span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
