import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../components/text-input";
import ItemContact from "../../components/item-contact";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { useState } from "react";

const Sender = () => {
  const index = [0, 1, 2, 3, 4, 5];
  const methods = useForm();
  const methodsSender = useForm();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => setAddDialogOpen(false);

  const ModalAddContact = () => {
    return (
      <Modal
        title="Tambah Pengirim"
        isOpen={isAddDialogOpen}
        handleClose={closeAddDialog}
      >
        <div className="flex flex-col">
          <FormProvider {...methodsSender}>
            <TextInput label="Nama" isFull={true} />
            <TextInput
              label="Nomor Telepon"
              isFull={true}
              classTextInput="mt-2"
            />
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
                text="Tambah Pengirim"
                className="ml-4"
                onClick={openAddDialog}
              />
            </div>
          </FormProvider>
        </div>
        {index.map(() => (
          <ItemContact />
        ))}
      </div>
      <ModalAddContact />
    </>
  );
};

export default Sender;
