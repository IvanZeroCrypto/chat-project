import { type FC } from "react";
import { MdOutlineMessage } from "react-icons/md";

interface MessageBtnProps {
  onClick?: () => void;
  title?: string;
}

const MessageBtn: FC<MessageBtnProps> = ({ onClick, title }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className=" cursor-pointer hover:scale-105"
    >
      <MdOutlineMessage />
    </button>
  );
};

export default MessageBtn;
