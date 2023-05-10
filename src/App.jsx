import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  ConfirmAccount,
} from "./pages/public";
import { AdminLayout } from "./layouts/AdminLayout";
import { Admin } from "./pages/private/Admin";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
