import { type FC } from "react";
import { IoPersonAdd } from "react-icons/io5";

interface IAddFriendBtn {
  onClick?: () => void;
  title?: string;
}

const AddFriendBtn: FC<IAddFriendBtn> = ({ title, onClick }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className=" cursor-pointer hover:scale-105"
    >
      <IoPersonAdd />
    </button>
  );
};

export default AddFriendBtn;
