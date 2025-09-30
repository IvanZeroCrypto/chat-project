import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
      <header>header auth</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer auth</footer>
    </div>
  );
};

export default AuthLayout;
