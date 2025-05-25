import Button from "../../components/button";

const ScheduledMessage =()=>{
    return (
        <div className="flex flex-col">
            <div className="justify-between flex flex-row items-center">
                <span className="text-xl font-medium">Pesan Terjadwal</span>
                <Button text="Tambah Pesan"/>
            </div>
            <div className="rounded-t-md border border-gray-300 m-5 mt-6">
                <div className="grid bg-gray-100  p-3 grid-cols-[2fr_1fr_1fr_1fr] grid-flow-col gap-4 font-medium ">
                    <div>Pesan</div>
                    <div>Tujuan</div>
                    <div>Sender</div>
                    <div>Jadwal Kirim</div>
                </div>

                <div className="grid  p-3 grid-cols-[2fr_1fr_1fr_1fr] grid-flow-col gap-4">
                    <div>Pesan</div>
                    <div>Tujuan</div>
                    <div>Sender</div>
                    <div>Jadwal Kirim</div>
                </div>
            </div>
       </div>
    );
}

export default ScheduledMessage;