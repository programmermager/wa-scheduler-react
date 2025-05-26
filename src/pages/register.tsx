import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/button";
import TextInput from "../components/text-input";
import { FormProvider, useForm } from "react-hook-form";
import useApi from "../hooks/use-api";
import { toast } from "sonner";
import { useState } from "react";
import { Info } from "lucide-react";
import Modal from "../components/modal";

const Register = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const reqRegister = useApi();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const closeModalInfo = () => setModalInfoOpen(false);

  const InfoIcon = () => (
    <Info
      className="w-4 h-4"
      onClick={() => {
        setModalInfoOpen(true);
      }}
    />
  );

  const ModalInfo = () => {
    return (
      <Modal
        title="Token Fonnte"
        isOpen={modalInfoOpen}
        handleClose={closeModalInfo}
      >
        <div className="flex flex-col items-center justify-center">
          <Info className="w-[100px] h-[100px] text-primary mb-6" />
          <span className="mb-6">
            Untuk mendapatkan token Fonnte silahkan daftar{" "}
            <a target="_blank" href="https://fonnte.com">
              disini
            </a>{" "}
            terlebih dahulu.
          </span>
          <Button text="Tutup" onClick={closeModalInfo} className="w-full" />
        </div>
      </Modal>
    );
  };

  const onSubmit = (data: unknown) => {
    console.log(data);
    reqRegister.request(
      { method: "POST", url: "register", data: data },
      {
        showErrorToast: true,
        onSuccess(data) {
          toast.success(`Berhasil ${data}`);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center w-full bg-white">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 w-96">
            <img src={logo} className="mb-4" />
            <TextInput
              label="Nama"
              name="name"
              type="text"
              isFull={true}
              rules={{
                required: "Nama Wajib Di isi",
              }}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              isFull={true}
              rules={{
                required: "Email Wajib Di isi",
              }}
            />
            <TextInput
              label="Kata Sandi"
              name="password"
              type="password"
              isFull={true}
              rules={{
                required: "Kata Sandi Wajib Di isi",
              }}
            />
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
            <TextInput
              label="Token Fonte"
              name="fonnte_token"
              type="text"
              rules={{
                required: "Token Wajib Di isi",
              }}
              isFull={true}
              prefixIcon={<InfoIcon />}
            />
            <Button
              isLoading={reqRegister.loading}
              type="submit"
              text="Daftar"
              className="w-full"
            />
            <div className="text-center">
              <span>Sudah punya akun? </span>
              <a onClick={() => navigate(-1)}>Login dong!</a>
            </div>
          </div>
        </form>
      </FormProvider>
      <ModalInfo />
    </div>
  );
};

export default Register;
