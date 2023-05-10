import { useEffect, useState } from "react";
import { confirmUser } from "../../api/users";
import { Toaster, toast } from "react-hot-toast";
import { useParams, Link } from "react-router-dom";

export const ConfirmAccount = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      const { success, message } = await confirmUser(id);

      if (!success) {
        toast.error(message, {
          id: "clipboard",
        });
        return;
      }

      toast.success(message, {
        id: "clipboard",
      });

      setConfirmedAccount(true);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-blue-600 font-black text-6xl">
          Tu Cuenta Ha Sido Confirmada
        </h1>
        <h3 className="text-black text-left font-medium text-2xl mt-5">
          Felicidades ya puedes utilizar{" "}
          <span className="text-blue-600 font-medium text-2xl">
            Tu Criadero
          </span>{" "}
          para administrar tus gallos.
        </h3>
      </div>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-gray-50">
        <Toaster />

        {confirmedAccount && (
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
