import React, { type FC } from "react";
import Button from "./UI/Button";

interface IBlockSelectButtonProps {
  choice: string;
  setChoice: React.Dispatch<React.SetStateAction<string>>;
}
const BlockSelectButton: FC<IBlockSelectButtonProps> = ({
  setChoice,
  choice,
}) => {
  return (
    <div className="flex gap-1 items-center justify-between">
      <Button
        onClick={() => setChoice("all")}
        className={` cursor-pointer py-1 px-2 rounded-[8px] font-bold  w-full ${
          choice === "all" ? "bg-teal-500 text-white" : "bg-white "
        }`}
      >
        Все
      </Button>
      <Button
        onClick={() => setChoice("online")}
        className={`cursor-pointer  py-1 px-2 rounded-[8px] font-bold w-full   ${
          choice === "online" ? "bg-teal-500 text-white" : "bg-white "
        } `}
      >
        Онлайн
      </Button>
    </div>
  );
};

export default BlockSelectButton;
