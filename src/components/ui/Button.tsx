import { ReactNode } from "react";

interface Iprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: Iprops) => {
  return (
    <button
      className={`${className} ${width} text-white px-2 py-1 cursor-pointer rounded-md opacity-85  hover:opacity-100`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
