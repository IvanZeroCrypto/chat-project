import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
