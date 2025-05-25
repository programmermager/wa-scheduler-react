import { Edit, Trash } from "lucide-react";
import Button from "../../components/button";

const ScheduledMessage = () => {
  const items = [1, 2, 3, 4, 5];

  const ItemMessage = () => {
    return (
      <div className="bg-blue-50 rounded-2xl shadow-lg p-5 flex flex-col gap-2 mt-6">
        <div className="flex justify-between">
          <span className="font-medium">Kepada : 0843787234</span>
          <span className="font-medium">Dari : 0843787234</span>
        </div>

        <span>Hai, tolong call me</span>
        <div className="flex justify-between">
          <div className="bg-orange-200 text-orange-400 px-2 py-1 rounded-xl w-fit">
            Menunggu Antrian
          </div>
          <div className="flex flex-row flex-1 items-center justify-end">
            <Trash className="text-red-500 size-4 mr-3" />
            <Edit className="text-blue-600 size-4" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="justify-between flex flex-row items-center">
        <span className="text-xl font-medium">Pesan Terjadwal</span>
        <Button text="Tambah Pesan" />
      </div>
      {items.map((item) => (
        <ItemMessage />
      ))}
    </div>
  );
};

export default ScheduledMessage;
