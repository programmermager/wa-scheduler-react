import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import type { BaseResponse } from "../../models/base-response";
import { toast } from "sonner";
import { type Datum, type SenderResponse } from "../../models/sender-responses";
import { Edit, Trash } from "lucide-react";
import ModalConfirm from "../../components/modal-confirm";

const Sender = () => {
  const methods = useForm();
  const methodsSender = useForm();
  const [selectedSender, setSelectedSender] = useState<Datum | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const openDialogConfirm = () => setDialogConfirmOpen(true);
  const closeDialogConfirm = () => setDialogConfirmOpen(false);

  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    methodsSender.reset();
  };
  const reqAddSender = useApi<BaseResponse>();
  const reqSender = useApi<BaseResponse>();
  const reqDeleteSender = useApi();
  const [dataSender, setDataSender] = useState<Datum[]>([]);

  useEffect(() => {
    reqSenders();
  }, []);

  function reqSenders() {
    reqSender.request(
      {
        method: "GET",
        url: "sender",
      },
      {
        onSuccess: (data) => {
          const resp = data as SenderResponse;
          setDataSender(resp.data.data);
        },
      }
    );
  }
  function reqDelSender(id: string) {
    reqDeleteSender.request(
      {
        method: "DELETE",
        url: `sender/delete/${id}`,
      },
      {
        onError: () => setSelectedSender(null),
        onSuccess: () => {
          setSelectedSender(null);
          reqSenders();
        },
      }
    );
  }

  const onSubmit = (data: unknown) => {
    reqAddSender.request(
      { method: "POST", url: "sender/store", data: data },
      {
        showErrorToast: true,
        onSuccess: (data) => {
          const resp = data as BaseResponse;
          toast.success(resp.message);
          closeAddDialog();
          reqSenders();
        },
      }
    );
  };

  const ModalAddContact = () => {
    return (
      <Modal
        title="Tambah Pengirim"
        isOpen={isAddDialogOpen}
        handleClose={closeAddDialog}
      >
        <div className="flex flex-col">
          <FormProvider {...methodsSender}>
            <form onSubmit={methodsSender.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start gap-1">
                <TextInput
                  label="Fonnte Token"
                  name="fonnte_token"
                  rules={{
                    required: "Token wajib di isi",
                  }}
                  isFull={true}
                />
                <text>Nomor Telepon</text>
                <div className="flex flex-row items-start">
                  <TextInput
                    name="country_code"
                    type="number"
                    value="62"
                    isFull={true}
                    rules={{
                      required: "CC wajib di isi",
                    }}
                  />
                  <TextInput
                    type="number"
                    rules={{
                      required: "Nomor Telepon Wajib Di isi",
                    }}
                    name="phone"
                    classInput="w-80 ml-3"
                  />
                </div>
                <Button text="Tambah" type="submit" className="mt-2 w-full" />
              </div>
            </form>
          </FormProvider>
        </div>
      </Modal>
    );
  };

  interface ItemSenderProps {
    data: Datum;
  }
  const ItemContact = ({ data }: ItemSenderProps) => {
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
          <span>{data.phone}</span>1
        </div>
        <Trash
          onClick={() => {
            openDialogConfirm();
            setSelectedSender(data);
          }}
          className="text-red-500 size-4 mr-3"
        />
        <Edit className="text-blue-600 size-4" />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-5">
          <FormProvider {...methods}>
            <div className="flex">
              <TextInput
                isFull={true}
                placeholder="Masukkan Nomor Telepon atau Nama"
              />
              <Button
                text="Tambah Pengirim"
                className="ml-4"
                onClick={openAddDialog}
              />
            </div>
          </FormProvider>
        </div>
        {dataSender && dataSender.map((data) => <ItemContact data={data} />)}
      </div>
      <ModalAddContact />
      <ModalConfirm
        title="Hapus"
        msg="Apakah anda yakin ingin menghapus data ini?"
        onBtnPosTap={() => {
          reqDelSender(`${selectedSender?.id}`);
        }}
        isOpen={isDialogConfirmOpen}
        handleClose={closeDialogConfirm}
      />
    </>
  );
};

export default Sender;
