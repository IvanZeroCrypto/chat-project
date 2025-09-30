import { type FC } from "react";
import { FaUserAltSlash } from "react-icons/fa";
interface DeleteAdminBtnProps {
  onClick: () => void;
  title: string;
}

const DeleteAdminBtn: FC<DeleteAdminBtnProps> = ({ onClick, title }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className=" cursor-pointer hover:scale-105"
    >
      <FaUserAltSlash />
    </button>
  );
};

export default DeleteAdminBtn;
