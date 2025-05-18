import clsx from "clsx";
import type { FC } from "react";

interface ButtonProps {
  color?: string;
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  color = "bg-green-700",
  text,
  className,
  type = "button",
}) => {
  return (
    <div className="w-full">
      <button type={type} className={clsx("rounded-lg", color, className)}>
        {text}
      </button>
    </div>
  );
};

export default Button;
