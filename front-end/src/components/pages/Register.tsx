import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../store/AuthStore";
import AuthInput from "../UI/AuthInput";
import Button from "../UI/Button";
import Title from "../UI/Title";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState<{
    userName: string;
    email: string;
    password: string;
  }>({ userName: "", email: "", password: "" });

  const navigate = useNavigate();
  const { error, setError, cleanError, register, loading } = authStore();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    cleanError();
    e.preventDefault();
    try {
      register(input?.userName, input?.email, input?.password);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="">
      <div className="container mx-auto ">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <form onSubmit={onSubmit} className=" w-[300px] flex flex-col gap-2">
            <Title className="font-bold text-2xl text-center">
              Регистрация
            </Title>
            <AuthInput
              type="text"
              name="userName"
              value={input.userName}
              onChange={changeInput}
              placeholder="Введите свой никнейм"
            />
            <AuthInput
              type="email"
              name="email"
              value={input.email}
              onChange={changeInput}
              placeholder="Введите почту"
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
              Уже есть аккаунт ?
              <Link className="underline text-blue-500 ml-1" to="/login">
                Войти
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 cursor-pointer rounded-[8px] text-white font-bold py-2 px-3"
              loading={loading.register}
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
