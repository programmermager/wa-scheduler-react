import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../../components/text-input";
import ItemContact from "../../../components/item-contact";
import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/use-api";
import type { BaseResponse } from "../../../models/base-response";
import type {
  ContactModel,
  ContactResponse,
} from "../../../models/contact-response";
import { toast } from "sonner";
import EmptyState from "../../../components/empty-state";
import Pagination from "../../../components/pagination";
import ModalConfirm from "../../../components/modal-confirm";

const Contacts = () => {
  const methods = useForm();
  const methodsContact = useForm();
  const [selectedContact, setSelectedContact] = useState<ContactModel | null>(
    null
  );
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const openDialogConfirm = () => setDialogConfirmOpen(true);
  const closeDialogConfirm = () => setDialogConfirmOpen(false);
  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    methodsContact.reset();
  };

  const reqAddContact = useApi<BaseResponse>();
  const reqContacts = useApi<BaseResponse>();
  const reqDelContact = useApi();
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reqGetContacts({ search: search });
  };

  useEffect(() => {
    if (!isAddDialogOpen) setSelectedContact(null);
  }, [isAddDialogOpen]);

  useEffect(() => {
    reqGetContacts();
  }, [page]);

  function reqGetContacts({ search }: { search?: string | undefined } = {}) {
    const params = { page: page, ...(search && { search }) };
    reqContacts.request(
      {
        method: "GET",
        url: "contact",
        params: params,
      },
      {
        onSuccess: (data) => {
          const resp = data as ContactResponse;
          setTotalPage(resp.data.last_page);
          setContacts(resp.data.data);
        },
      }
    );
  }
  function reqDeleteContact(id: string) {
    reqDelContact.request(
      {
        method: "DELETE",
        url: `contact/delete/${id}`,
      },
      {
        onError: () => setSelectedContact(null),
        onSuccess: () => {
          setSelectedContact(null);
          reqGetContacts();
        },
      }
    );
  }

  const onSubmit = (data: unknown) => {
    const url = selectedContact
      ? `contact/update/${selectedContact.id}`
      : "contact/store";
    reqAddContact.request(
      { method: "POST", url: url, data: data },
      {
        showErrorToast: true,
        onSuccess: (data) => {
          const resp = data as BaseResponse;
          toast.success(resp.message);
          closeAddDialog();
          reqGetContacts();
        },
      }
    );
  };

  const ModalAddContact = () => {
    return (
      <Modal
        title={`${selectedContact ? "Perbarui" : "Tambah"} Kontak`}
        isOpen={isAddDialogOpen}
        handleClose={closeAddDialog}
      >
        <div className="flex flex-col">
          <FormProvider {...methodsContact}>
            <form onSubmit={methodsContact.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start gap-1">
                <TextInput
                  label="Nama"
                  name="name"
                  value={`${selectedContact ? selectedContact.name : ""}`}
                  rules={{
                    required: "Nama wajib di isi",
                  }}
                  isFull={true}
                />
                <div className="flex flex-col items-start gap-1">
                  <text>Nomor Telepon</text>
                  <div className="flex flex-row items-start">
                    <TextInput
                      name="country_code"
                      type="number"
                      value={`${
                        selectedContact ? selectedContact.country_code : "62"
                      }`}
                      rules={{
                        required: "Kode Negara wajib di isi",
                      }}
                      isFull={true}
                    />
                    <TextInput
                      type="number"
                      value={`${selectedContact ? selectedContact.phone : ""}`}
                      rules={{
                        required: "Nomor Telepon Wajib Di isi",
                      }}
                      name="phone"
                      classInput="w-80 ml-3"
                    />
                  </div>
                </div>
                <Button
                  text={`${selectedContact ? "Perbarui" : "Tambah"}`}
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
                  placeholder="Masukkan Nomor Telepon atau Nama"
                />
                <Button
                  text="Tambah Kontak"
                  className="ml-4"
                  onClick={openAddDialog}
                />
              </div>
            </form>
          </FormProvider>
        </div>
        {contacts.map((data) => (
          <ItemContact
            data={data}
            onDelete={function (): void {
              openDialogConfirm();
              setSelectedContact(data);
            }}
            onEdit={function (): void {
              setSelectedContact(data);
              openAddDialog();
            }}
          />
        ))}
        {contacts.length == 0 && <EmptyState text="Tidak ada data pengirim" />}
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
          reqDeleteContact(`${selectedContact?.id}`);
        }}
        isOpen={isDialogConfirmOpen}
        handleClose={closeDialogConfirm}
      />
    </>
  );
};

export default Contacts;

/* 
REQUIREMENT : 
2. SEARCH - perlu implement dari API
*/
