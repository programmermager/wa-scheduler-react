import clsx from "clsx";
import assetEmpty from "../assets/img_contact.svg";
interface EmptyStateProps {
  image?: string;
  text?: string;
  width?: string;
  className?: string;
}
const EmptyState = ({
  image = assetEmpty,
  text = "Tidak ada data",
  width,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center",

        className
      )}
    >
      <img
        src={`${image}`}
        className={clsx(width ? `w-[${width}px]` : "w-[300px]")}
      />
      <span className="text-xl mt-5">{text}</span>
    </div>
  );
};

export default EmptyState;
