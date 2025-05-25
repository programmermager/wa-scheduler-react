import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../components/text-input";
import ItemContact from "../../components/item-contact";

const Contacts = () => {
  const index = [0, 1, 2, 3, 4, 5];
  const methods = useForm();

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-5">
          <FormProvider {...methods}>
            <TextInput
              type="email"
              name="email"
              className="w-full"
              placeholder="Cari Nomor Telepon"
            />
          </FormProvider>
        </div>
        {index.map((i) => (
          <ItemContact />
        ))}
      </div>
    </>
  );
};

export default Contacts;
