import { useState } from "react";
import Exit from "./Exit";
import authStore from "../../store/AuthStore";
import UserInfo from "./UserInfo";
import SearchUser from "./SearchUser";

const Header = () => {
  const [show, setShow] = useState(false);
  const { user } = authStore();

  return (
    <header className="bg-teal-500 p-2 h-12 flex items-center relative">
      <img src="../../../public/images/images.png" width="120" />

      <div className="ml-auto mr-auto">
        <SearchUser />
      </div>

      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="absolute right-2 top-0  z-10 flex flex-col"
      >
        {" "}
        <button className="font-bold absolute right-0 border border-teal-400  py-1 px-2 rounded-[10px] inline-block text-white cursor-pointer  hover:bg-teal-400 mt-[6px] ">
          Профиль
        </button>
        {show && (
          <div className="bg-teal-300 p-3  inline-block mt-12 ">
            <div className="flex flex-col">
              <UserInfo title="Имя пользователя" text={user?.userName} />
              <UserInfo title="Email" text={user?.email} />
              <UserInfo title="Ваш Id" text={user?.identificationId} />
              <Exit />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
