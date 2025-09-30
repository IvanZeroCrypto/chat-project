import authStore from "../../store/AuthStore";
import { RxExit } from "react-icons/rx";
import Loader from "../UI/Loader";

const Exit = () => {
  const { logout, loading } = authStore();

  return (
    <div className="flex items-center gap-1 relative">
      <button
        className="cursor-pointer hover:scale-110 mr-0 ml-auto"
        onClick={logout}
      >
        {loading.logout ? <Loader /> : <RxExit />}
      </button>
    </div>
  );
};

export default Exit;
