import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/button";
import TextInput from "../components/text-input";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-96">
        <img src={logo} className="mb-4" />
        <TextInput label="Nama" type="text" className="w-full" />
        <TextInput label="Email" type="email" className="w-full" />
        <TextInput label="Kata Sandi" type="password" className="w-full" />
        <div className="flex flex-col items-start gap-1">
          <text>Nomor Telepon</text>
          <div className="flex flex-row items-start">
            <TextInput type="number" value="62" className="w-full" />
            <TextInput type="number" className="w-80 ml-3" />
          </div>
        </div>
        <TextInput label="Token Fonte" type="text" className="w-full" />
        <Button text="Daftar" className="w-full" />
        <text>
          Sudah punya akun? <a onClick={() => navigate(-1)}>Login dong!</a>
        </text>
      </div>
    </>
  );
};

export default Register;
