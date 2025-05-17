import Button from "../components/button";
import TextInput from "../components/text-input";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-96">
        <img src={logo} className="w-full mb-4" />
        <TextInput label="Email" type="email" className="w-full" />
        <TextInput label="Kata Sandi" type="password" className="w-full" />
        <Button text="Login" className="w-96" />
        <text>
          Belum punya akun?{" "}
          <a onClick={() => navigate("/register")}>Daftar dong!</a>
        </text>
      </div>
    </>
  );
};

export default Login;
