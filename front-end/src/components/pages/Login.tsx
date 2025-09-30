import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../store/AuthStore";
import AuthInput from "../UI/AuthInput";
import Button from "../UI/Button";
import Title from "../UI/Title";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, error, loading } = authStore();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await login(input.email, input.password);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="">
      <div className="container mx-auto ">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <form onSubmit={onSubmit} className=" w-[300px] flex flex-col gap-2">
            <Title className="font-bold text-2xl text-center">Логин</Title>
            <AuthInput
              value={input.email}
              onChange={changeInput}
              placeholder="Введите свой email"
              name="email"
              type="email"
            />
            <AuthInput
              type="password"
              name="password"
              value={input.password}
              onChange={changeInput}
              placeholder="Введите пароль"
            />
            <p className="text-red-500 ">{error ? error : ""}</p>
            <div className="">
              {" "}
              Нет аккаунта ?
              <Link to="/" className="underline text-blue-500 ml-1">
                Зарегистрироваться
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 cursor-pointer rounded-[8px] text-white font-bold py-2 px-3"
              loading={loading.login}
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
