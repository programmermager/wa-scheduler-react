import Button from "../components/button";
import TextInput from "../components/text-input";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useApi from "../hooks/use-api";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const reqLogin = useApi();

  const onSubmit = (data: unknown) => {
    reqLogin.request(
      { method: "POST", url: "login", data: data },
      { showErrorToast: true }
    );
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 w-96">
            <img src={logo} className="w-full mb-4" />
            <TextInput
              label="Email"
              type="email"
              name="email"
              className="w-full"
              rules={{
                required: "Email wajib di isi",
              }}
            />
            <TextInput
              label="Kata Sandi"
              type="password"
              name="password"
              className="w-full"
              rules={{
                required: "Kata Sandi wajib di isi",
              }}
            />
            <Button
              isLoading={reqLogin.loading}
              type="submit"
              text="Login"
              className="w-96"
            />
            <text>
              Belum punya akun?{" "}
              <a onClick={() => navigate("/register")}>Daftar dong!</a>
            </text>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Login;
