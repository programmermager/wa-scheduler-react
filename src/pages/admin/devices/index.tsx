import EmptyState from "../../../components/empty-state";
import image from "../../..//assets/img_devices.svg";

const Devices = () => {
  return (
    <div>
      <EmptyState
        image={image}
        width="300"
        text="Tidak ada perangkat terdaftar"
      />
    </div>
  );
};

export default Devices;
