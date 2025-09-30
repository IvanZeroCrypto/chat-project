import { type FC } from "react";
import { SlOptionsVertical } from "react-icons/sl";

interface IChatHeaderProps {
  closed: () => void;
  selectedChatName: string;
  isPrivate: boolean;
}
const ChatHeader: FC<IChatHeaderProps> = ({
  selectedChatName,
  closed,
  isPrivate,
}) => {
  return (
    <div className="px-2 py-5 border-b border-b-gray-200 h-[10%] flex items-center justify-between">
      <h1 className="font-bold italic">{selectedChatName}</h1>
      {!isPrivate && (
        <button
          onClick={closed}
          className="cursor-pointer hover:bg-gray-100 rounded-full p-2"
        >
          <SlOptionsVertical color="gray" />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
