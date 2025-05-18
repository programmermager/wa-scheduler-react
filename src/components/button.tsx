import clsx from "clsx";
import type { FC } from "react";
import LoadingCircular from "./loading-circular";

interface ButtonProps {
  color?: string;
  text?: string;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  color = "bg-green-700",
  text,
  isLoading,
  className,
  type = "button",
}) => {
  return (
    <div className="w-full">
      <button type={type} className={clsx("rounded-lg", color, className)}>
        {isLoading ? <LoadingCircular /> : text}
      </button>
    </div>
  );
};

export default Button;
