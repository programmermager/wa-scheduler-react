import "./App.css";
import { Toaster } from "sonner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/admin/dashboard";
import Sender from "./pages/admin/sender";
import { Path } from "./constants/path";
import Contacts from "./pages/admin/contacts";
import Devices from "./pages/admin/devices";
import ScheduledMessage from "./pages/admin/scheduled-message";

function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path={Path.login} element={<Login />} />
          <Route path={Path.register} element={<Register />} />
          <Route path={Path.dashboard} element={<Dashboard />}>
            <Route index element={<ScheduledMessage />} />
            <Route path={Path.contacts} element={<Contacts />} />
            <Route path={Path.senders} element={<Sender />} />
            <Route path={Path.devices} element={<Devices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
