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

/* 
REQUIREMENT : 
1. NO PAGINATION
2. NO SEARCH


ADD :
1. milih sender dulu, karena akan menentukan tokennya
2. input nama device
3. phone akan otomatis ke read only

LIST : 
1. nama
2. phone number
3. status connect/disconnect
4. jika connect, ada button disconnect
5. jika disconnect ada button scan qr
6. ada button delete

DELETE : 
1. add confirm dialog
2. delete

EDIT : 
1. choose sender
2. change name device 

*/
