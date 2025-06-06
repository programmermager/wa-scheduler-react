import Button from "../components/button";
import TextInput from "../components/text-input";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useApi from "../hooks/use-api";
import type { LoginResp } from "../models/login-response";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const reqLogin = useApi<LoginResp>();

  // const onSubmit = (data: unknown) => {
  const onSubmit = (data: unknown) => {
    reqLogin.request(
      { method: "POST", url: "login", data: data },
      {
        showErrorToast: true,
        onSuccess: (data) => {
          const dt = data as LoginResp;
          localStorage.setItem("token", dt.token);
          navigate("/dashboard");
        },
      }
    );
  };
  return (
    <div className="flex items-center justify-center w-full bg-white">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col  gap-4 w-96">
            <img src={logo} className="w-full mb-4" />
            <TextInput
              label="Email"
              type="email"
              name="email"
              isFull={true}
              rules={{
                required: "Email wajib di isi",
              }}
            />
            <TextInput
              label="Kata Sandi"
              type="password"
              name="password"
              isFull={true}
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
            <div className="text-center">
              <span>Belum punya akun? </span>
              <a onClick={() => navigate("/register")}>Daftar dong!</a>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
