import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { forgotPassword } from "../../api/users";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [existsUserEmail, setExistsUserEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      toast.error("El Correo Electrónico es obligatorio", {
        id: "clipboard",
      });
      return;
    }

    const { success, message } = await forgotPassword(email);

    if (!success) {
      toast.error(message, {
        id: "clipboard",
      });

      return;
    }

    toast.success(message, {
      id: "clipboard",
    });

    setExistsUserEmail(true);

    setEmail("");
  };

  return (
    <>
      <div>
        <h1 className="text-blue-600 font-black text-6xl">
          Recupera tu cuenta
        </h1>
        <h3 className="text-black font-medium text-2xl mt-5">
          Ingresa tu correo electrónico para iniciar el proceso de recuperación.
        </h3>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Toaster />
        {!existsUserEmail && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="text-black block text-xl font-medium">
                Ingrese su correo electrónico
              </label>
              <input
                type="email"
                placeholder="Email"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:justify-center mt-3">
              <button
                type="submit"
                className="bg-green-600 w-full py-3 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-green-500 md:w-auto p-6"
              >
                Verificar
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 lg:flex lg:justify-center">
          <Link
            className="block text-center my-4 text-blue-600 hover:text-blue-700"
            to="/"
          >
            ¿Tienes una cuenta? Inicia sesión aquí
          </Link>
        </div>
      </div>
    </>
  );
};
