import { Edit, Trash } from "lucide-react";
import type { Datum } from "../../../../models/sender-responses";

interface ItemSenderProps {
  data: Datum;
  onDelete: () => void;
  onEdit: () => void;
}
const ItemSender = ({ data, onDelete, onEdit }: ItemSenderProps) => {
  return (
    <div className="flex items-center mb-5" key={data.id}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
        className="ml-2 h-5 w-5 cursor-pointer rounded-full shadow-lg lg:h-10 lg:w-10 mr-4"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      />
      <div className="flex flex-col flex-1">
        <span>
          {data.country_code}
          {data.phone}
        </span>
        <span className="text-sm text-gray-500">
          Account Token : {data.token}
        </span>
      </div>
      <Trash onClick={onDelete} className="text-red-500 size-4 mr-3" />
      <Edit onClick={onEdit} className="text-blue-600 size-4" />
    </div>
  );
};

export default ItemSender;
