import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/button";
import TextInput from "../components/text-input";
import { FormProvider, useForm } from "react-hook-form";
import useApi from "../hooks/use-api";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const reqRegister = useApi();

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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 w-96">
            <img src={logo} className="mb-4" />
            <TextInput
              label="Nama"
              name="name"
              type="text"
              className="w-full"
              rules={{
                required: "Nama Wajib Di isi",
              }}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              className="w-full"
              rules={{
                required: "Email Wajib Di isi",
              }}
            />
            <TextInput
              label="Kata Sandi"
              name="password"
              type="password"
              className="w-full"
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
                  className="w-full"
                />
                <TextInput
                  type="number"
                  rules={{
                    required: "Nomor Telepon Wajib Di isi",
                  }}
                  name="phone"
                  className="w-80 ml-3"
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
              className="w-full"
            />
            <Button
              isLoading={reqRegister.loading}
              type="submit"
              text="Daftar"
              className="w-full"
            />
            <text>
              Sudah punya akun? <a onClick={() => navigate(-1)}>Login dong!</a>
            </text>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Register;
