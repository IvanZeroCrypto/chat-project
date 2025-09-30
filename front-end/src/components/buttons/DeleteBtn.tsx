import { type FC } from "react";
import { MdDeleteForever } from "react-icons/md";

interface DeleteBtnProps {
  onClick?: () => void;
  loading?: boolean;
  title: string;
}

const DeleteBtn: FC<DeleteBtnProps> = ({ onClick, loading = false, title }) => {
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button
          title={title}
          onClick={onClick}
          className=" cursor-pointer hover:scale-105"
        >
          <MdDeleteForever />
        </button>
      )}
    </>
  );
};

export default DeleteBtn;
