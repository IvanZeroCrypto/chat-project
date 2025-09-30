import React, { type FC, type ReactNode } from "react";
import Loader from "./Loader";

interface IButtonProps {
  onClick?: () => void;
  className: string;
  type?: "submit" | "reset" | "button" | undefined;
  loading?: boolean;
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({
  onClick,
  children,
  className,
  type,
  loading,
}) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      disabled={loading}
      className={`cursor-pointer relative ${
        loading && "bg-gray-400"
      } ${className}`}
    >
      {children}
      {loading && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <Loader />
        </div>
      )}
    </button>
  );
};

export default Button;
