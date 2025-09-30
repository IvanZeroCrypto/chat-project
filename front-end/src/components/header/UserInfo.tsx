import { type FC } from "react";

interface IUserInfoProps {
  title: string;
  text: string | number;
}

const UserInfo: FC<IUserInfoProps> = ({ title, text }) => {
  return (
    <div className="flex justify-between gap-2 mb-3">
      <label className="text-[14px]">{title}:</label>
      <h1 className="text-[14px]">{text}</h1>
    </div>
  );
};

export default UserInfo;
