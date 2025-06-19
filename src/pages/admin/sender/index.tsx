import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../../components/text-input";
import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/use-api";
import type { BaseResponse } from "../../../models/base-response";
import { toast } from "sonner";
import {
  type Datum,
  type SenderResponse,
} from "../../../models/sender-responses";
import ModalConfirm from "../../../components/modal-confirm";
import EmptyState from "../../../components/empty-state";
import ItemSender from "./components/item-sender";
import Pagination from "../../../components/pagination";

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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reqSenders({ search: search });
  };

  useEffect(() => {
    if (!isAddDialogOpen) setSelectedSender(null);
  }, [isAddDialogOpen]);

  useEffect(() => {
    reqSenders();
  }, [page]);

  function reqSenders({ search }: { search?: string | undefined } = {}) {
    const params = { page: page, ...(search && { search }) };
    reqSender.request(
      {
        method: "GET",
        url: "sender",
        params: params,
      },
      {
        onSuccess: (data) => {
          const resp = data as SenderResponse;
          setTotalPage(resp.data.last_page);
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
    const url = selectedSender
      ? `sender/update/${selectedSender.id}`
      : "sender/store";
    reqAddSender.request(
      { method: "POST", url: url, data: data },
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
                  value={`${selectedSender ? selectedSender.token : ""}`}
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
                    value={`${
                      selectedSender ? selectedSender.country_code : 62
                    }`}
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
                    value={`${selectedSender ? selectedSender.phone : ""}`}
                    classInput="w-80 ml-3"
                  />
                </div>
                <Button
                  text={`${selectedSender ? "Perbarui" : "Tambah"}`}
                  type="submit"
                  className="mt-2 w-full"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-5">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmitSearch}>
              <div className="flex">
                <TextInput
                  onChange={(e) => setSearch(e.target.value)}
                  isFull={true}
                  placeholder="Masukkan Nomor Telepon atau Account Token"
                />
                <Button
                  text="Tambah Pengirim"
                  className="ml-4"
                  onClick={openAddDialog}
                />
              </div>
            </form>
          </FormProvider>
        </div>
        {dataSender &&
          dataSender.map((data) => (
            <ItemSender
              data={data}
              key={data.id}
              onDelete={function (): void {
                openDialogConfirm();
                setSelectedSender(data);
              }}
              onEdit={function (): void {
                setSelectedSender(data);
                openAddDialog();
              }}
            />
          ))}
        {dataSender.length == 0 && (
          <EmptyState text="Tidak ada data pengirim" />
        )}
        <Pagination
          current={page}
          total={totalPage}
          onTapNext={() => {
            if (page < totalPage) {
              setPage(page + 1);
            }
          }}
          onTapPrev={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
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
