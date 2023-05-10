import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const AdminLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Cargando...";

  return (
    <>
      <Header />
      {auth?.id && auth.email ? <Outlet /> : <Navigate to="/" />}
      <Footer />
    </>
  );
};
