import clsx from "clsx";
import type { FC } from "react";

interface ButtonProps {
  color?: string;
  text?: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  color = "bg-green-700",
  text,
  className,
}) => {
  return (
    <div className="w-full">
      <button className={clsx("rounded-lg", color, className)}>{text}</button>
    </div>
  );
};

export default Button;
