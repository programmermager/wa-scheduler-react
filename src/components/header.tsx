import {  type FC } from "react";
import logo from "../assets/logo.png";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { Path } from "../constants/path";

interface MenuProps {
    text: string,
    to: string,
    className? : string,
}

const Header = ()=> {
    const location = useLocation();
  
    const getActiveMenu = () => {
      if (location.pathname === `${Path.dashboard}/${Path.contacts}`) return 'Kontak';
      if (location.pathname === `${Path.dashboard}/${Path.senders}`) return 'Pengirim';
      if (location.pathname === `${Path.dashboard}/${Path.devices}`) return 'Perangkat';
      return 'Pesan Terjadwal'; 
    };

    const Menu : FC<MenuProps> = ({
        text,
        to,
        className= '',
    }) => {
        const active = getActiveMenu() == text;
        return  (
            <Link to={to} className="justify-start flex-col flex px-3 ">
                <span className={clsx('py-2', className, active ? 'text-primary rounded-full hover:text-green-900 ' : 'text-gray-700')}>{text}</span>
                <div className={clsx("w-6 h-[5px] rounded-lg", active ? "bg-primary" : "bg-transparent")}/>
            </Link>
        );
    }


    return (
        <>
            <div className="fixed h-[82px] px-4 justify-between items-center flex flex-row left-0 right-0 top-0 bg-white shadow-md w-full">
                <img src={logo} className="h-[50px] items-center my-4" />
                <nav className="w-full items-center justify-end text-gray-700 gap-10 flex flex-row mr-5">
                    <Menu to={Path.dashboard}  text="Pesan Terjadwal"/>
                    <Menu to={`${Path.dashboard}/${Path.contacts}`} text="Kontak"/>
                    <Menu to={`${Path.dashboard}/${Path.senders}`} text="Pengirim"/>
                    <Menu to={`${Path.dashboard}/${Path.devices}`} text="Perangkat"/>
                </nav>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                    className="ml-2 h-5 w-5 cursor-pointer rounded-full shadow-lg lg:h-8 lg:w-8"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true" />
            </div>
        </>
    );
}

export default Header;