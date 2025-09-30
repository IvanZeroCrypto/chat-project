import { type FC } from "react";
import { GrUserAdmin } from "react-icons/gr";

interface AddAdminBtnProps {
  onClick: () => void;
  title: string;
}

const AddAdminBtn: FC<AddAdminBtnProps> = ({ onClick, title }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className=" cursor-pointer hover:scale-105"
    >
      <GrUserAdmin />
    </button>
  );
};

export default AddAdminBtn;
