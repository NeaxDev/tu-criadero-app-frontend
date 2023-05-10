import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { newPassword, confirmTokenValid } from "../../api/users";

export const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);
  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const confirmToken = async () => {
      const { success, message } = await confirmTokenValid(token);
      if (!success) {
        toast.error(message, {
          id: "clipboard",
        });
        return;
      }

      toast.success(message, {
        id: "clipboard",
      });

      setValidToken(true);
    };
    confirmToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Contraseña debe tener más de 8 caracteres", {
        id: "clipboard",
      });

      return;
    }

    const { success, message } = await newPassword(token, password);
    if (!success) {
      toast.error(message, {
        id: "clipboard",
      });
      return;
    }

    toast.success(message, {
      id: "clipboard",
    });

    setPasswordModified(true);
  };

  return (
    <>
      <div>
        <h1 className="text-blue-600 font-black text-6xl">
          Restablece tu Contraseña
        </h1>
        <h3 className="text-black text-left font-medium text-2xl mt-5">
          Asegurate de anotar en algun lado tu nueva contraseña para que no
          pierdas tu acceso.
        </h3>
      </div>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-gray-50">
        <Toaster />
        {validToken && !passwordModified && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="text-black block text-xl font-medium">
                  Ingrese su nueva contraseña
                </label>
                <input
                  type="password"
                  placeholder="Nueva Contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="lg:flex lg:justify-center">
                <button
                  type="submit"
                  className="bg-green-600 w-full py-3 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-green-500 md:w-auto p-6"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </>
        )}

        {passwordModified && (
          <div className="mt-10 lg:flex lg:justify-center">
            <Link
              className="bg-green-600 w-full py-3 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-green-500 md:w-auto p-6"
              to="/"
            >
              Ir A Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
