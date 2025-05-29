import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../../components/text-input";
import ItemContact from "../../../components/item-contact";
import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { useState } from "react";

const Contacts = () => {
  const index = [0, 1, 2, 3, 4, 5];
  const methods = useForm();
  const methodsContact = useForm();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => setAddDialogOpen(false);

  const ModalAddContact = () => {
    return (
      <Modal
        title="Tambah Kontak"
        isOpen={isAddDialogOpen}
        handleClose={closeAddDialog}
      >
        <div className="flex flex-col">
          <FormProvider {...methodsContact}>
            <TextInput label="Nama" isFull={true} />
            <div className="flex flex-col items-start gap-1">
              <text>Nomor Telepon</text>
              <div className="flex flex-row items-start">
                <TextInput
                  name="country_code"
                  type="number"
                  value="62"
                  isFull={true}
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
            </div>
            <Button text="Tambah" onClick={closeAddDialog} className="mt-2" />
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
            <div className="flex">
              <TextInput
                type="email"
                name="email"
                isFull={true}
                placeholder="Masukkan Nomor Telepon atau Nama"
              />
              <Button
                text="Tambah Kontak"
                className="ml-4"
                onClick={openAddDialog}
              />
            </div>
          </FormProvider>
        </div>
        {index.map((i) => (
          <ItemContact key={`${i}`} />
        ))}
      </div>
      <ModalAddContact />
    </>
  );
};

export default Contacts;

/* 
REQUIREMENT : 
1. PAGINATION
2. SEARCH


ADD :
1. input nama
2. input nomor

LIST : 
1. nama
2. phone number

DELETE : 
1. add confirm dialog
2. delete

EDIT : 
1. input nama
2. input nomor

*/
