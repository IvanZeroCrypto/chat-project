import { type FC } from "react";
import { FaCheck } from "react-icons/fa";

interface ICheckBtn {
  title: string;
}

const CheckBtn: FC<ICheckBtn> = ({ title }) => {
  return (
    <button title={title}>
      <FaCheck />
    </button>
  );
};

export default CheckBtn;
