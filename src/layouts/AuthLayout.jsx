import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {!auth.id ? (
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-8 p-5">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
};
