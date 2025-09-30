import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import Register from "./components/pages/Register";
import { useEffect } from "react";
import Login from "./components/pages/Login";
import authStore from "./store/AuthStore";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import ProtectedRouteAuth from "./components/UI/ProtectedRouteAuth";

function App() {
  const { checkAuth } = authStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth().then((response) => {
      if (response && response.status === 204) {
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    });
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteAuth>
              <Register />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteAuth>
              <Login />
            </ProtectedRouteAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
