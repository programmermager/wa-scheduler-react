import { Outlet } from "react-router-dom";
import bg from "../../assets/bg_abstract.svg";
import Header from "../../components/header";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-no-repeat bg-right-top bg-cover opacity-60"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="relative z-1">
        <Header />
        <div className="flex w-full h-full justify-center pt-[102px]">
          <div className="w-full max-w-[1024px] bg-white shadow-md justify-center flex-col rounded-lg h-full flex p-4 mb-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
