import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/users";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      toast.error("Ambos campos son obligatorios", {
        id: "clipboard",
      });
      return;
    }

    const { success, message, data } = await loginApi({ email, password });

    if (!success) {
      toast.error(message, {
        id: "clipboard",
      });

      return;
    }

    toast.success(message, {
      id: "clipboard",
    });

    setEmail("");
    setPassword("");

    localStorage.setItem("token", data.token);
    setAuth(data);
    navigate("/admin");
  };

  return (
    <>
      <div>
        <h1 className="text-blue-600 font-black text-6xl">Tu Criadero</h1>
        <h3 className="text-black text-left font-medium text-2xl mt-5">
          Comience a tener el control de su criadero de gallos con nuestra
          aplicacion web.
        </h3>
      </div>
      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-50">
        <Toaster />

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <input
              type="password"
              name="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="lg:flex lg:justify-center">
            <button
              type="submit"
              className="bg-blue-600 w-full py-3 rounded-xl text-white font-bold mt-7 hover:cursor-pointer hover:bg-blue-500 md:w-auto p-6"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="mt-2 lg:flex lg:justify-center">
          <Link
            className="block text-center my-4 text-blue-600 hover:text-blue-700"
            to="/forgot-password"
          >
            ¿Olvidastes tu contraseña?
          </Link>
        </div>

        <div className="mt-10 lg:flex lg:justify-center">
          <Link
            className="bg-green-600 w-full py-3 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-green-500 md:w-auto p-6"
            to="/register"
          >
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </>
  );
};
