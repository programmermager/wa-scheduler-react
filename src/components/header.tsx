import { useState, type FC } from "react";
import logo from "../assets/logo.png";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../constants/path";
import ModalConfirm from "./modal-confirm";

interface MenuProps {
  text: string;
  to: string;
  className?: string;
}

const Header = () => {
  const location = useLocation();
  const [showContextMenu, setContextMenu] = useState(false);
  const [dialogConfirmLogout, setDialogConfirmLogout] = useState(false);
  const navigate = useNavigate();

  const showDialogConfirm = () => setDialogConfirmLogout(true);
  const closeDialogConfirm = () => setDialogConfirmLogout(false);

  const getActiveMenu = () => {
    if (location.pathname === `${Path.dashboard}/${Path.contacts}`)
      return "Kontak";
    if (location.pathname === `${Path.dashboard}/${Path.senders}`)
      return "Pengirim";
    if (location.pathname === `${Path.dashboard}/${Path.devices}`)
      return "Perangkat";
    return "Pesan Terjadwal";
  };

  const Menu: FC<MenuProps> = ({ text, to, className = "" }) => {
    const active = getActiveMenu() == text;
    return (
      <Link to={to} className="justify-start flex-col flex px-3 ">
        <span
          className={clsx(
            "py-2",
            className,
            active
              ? "text-primary rounded-full hover:text-green-900 "
              : "text-gray-700"
          )}
        >
          {text}
        </span>
        <div
          className={clsx(
            "w-6 h-[5px] rounded-lg",
            active ? "bg-primary" : "bg-transparent"
          )}
        />
      </Link>
    );
  };

  return (
    <>
      <div className="fixed h-[82px] px-4 justify-between items-center flex flex-row left-0 right-0 top-0 bg-white shadow-md w-full">
        <img src={logo} className="h-[50px] items-center my-4" />
        <nav className="w-full items-center justify-end text-gray-700 gap-10 flex flex-row mr-5">
          <Menu to={Path.dashboard} text="Pesan Terjadwal" />
          <Menu to={`${Path.dashboard}/${Path.contacts}`} text="Kontak" />
          <Menu to={`${Path.dashboard}/${Path.senders}`} text="Pengirim" />
          <Menu to={`${Path.dashboard}/${Path.devices}`} text="Perangkat" />
        </nav>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
          className="ml-2 h-5 w-5 cursor-pointer rounded-full shadow-lg lg:h-8 lg:w-8"
          id="options-menu"
          onClick={() => setContextMenu(!showContextMenu)}
          aria-haspopup="true"
          aria-expanded="true"
        />
      </div>

      {showContextMenu && (
        <div
          className="absolute right-4 mt-16 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              onClick={() => {
                setContextMenu(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Ubah Kata Sandi
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              onClick={() => {
                showDialogConfirm();
                setContextMenu(false);
              }}
              className="block cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700"
              role="menuitem"
            >
              Keluar
            </a>
          </div>
        </div>
      )}

      <ModalConfirm
        title="Keluar Akun"
        msg="Apakah anda yakin ingin keluar dari akun ini?"
        btnCloseTitle="Keluar"
        onBtnPosTap={function (): void {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        isOpen={dialogConfirmLogout}
        handleClose={closeDialogConfirm}
      ></ModalConfirm>
    </>
  );
};

export default Header;
