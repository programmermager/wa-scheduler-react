import "./App.css";
import { Toaster } from "sonner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/admin/dashboard";
import ScheduledMessage from "./pages/admin/scheduled-message";
import Sender from "./pages/admin/sender";
import { Contact } from "lucide-react";
import { Path } from "./constants/path";
import Devices from "./pages/admin/devices";

function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path={Path.login} element={<Login />} />
          <Route path={Path.register} element={<Register />} />
          <Route path={Path.dashboard} element={<Dashboard />} >
            <Route index element={<ScheduledMessage/>}/>
            <Route path={Path.contacts} element={<Contact/>}/>
            <Route path={Path.senders} element={<Sender/>}/>
            <Route path={Path.devices} element={<Devices/>}/>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
