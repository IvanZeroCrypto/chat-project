import { type FC, type ReactNode } from "react";
interface ITitleProps {
  children: ReactNode;
  className?: string;
}
const Title: FC<ITitleProps> = ({ children, className }) => {
  return <h1 className={` ${className}`}>{children}</h1>;
};

export default Title;
