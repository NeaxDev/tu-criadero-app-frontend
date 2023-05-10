import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { registerApi } from "../../api/users";
import { CLAVE } from "../../utils/constants";

export const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validCaptcha, setvalidCaptcha] = useState(null);

  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      setvalidCaptcha(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [name, lastname, email, phone, password, confirmPassword].includes("")
    ) {
      toast.error("Todos los campos son obligatorios", {
        id: "clipboard",
      });

      return;
    }

    if (password.length < 8) {
      toast.error("Debe ingresar una contraseña con mínimo 8 caracteres", {
        id: "clipboard",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Contraseñas diferentes", {
        id: "clipboard",
      });
      return;
    }

    if (!validCaptcha) {
      toast.error("Tiene que aceptar el CAPTCHA", {
        id: "clipboard",
      });
      setvalidCaptcha(false);
      return;
    }

    const { success, message } = await registerApi({
      name,
      lastname,
      email,
      phone,
      password,
    });

    if (!success) {
      toast.error(message, {
        id: "clipboard",
      });
      return;
    }

    toast.success(message, {
      id: "clipboard",
    });

    setName("");
    setLastname("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div>
        <h1 className="text-blue-600 font-black text-6xl">Registrate</h1>
        <h3 className="text-black text-left font-medium text-2xl mt-5">
          Deje de usar las libretas y comience a registrar sus aves de combate
          con nosotros y aproveche las ventajas de utilizar{" "}
          <span className="text-blue-600 font-medium text-2xl">
            Tu Criadero.
          </span>
        </h3>
      </div>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-50">
        <Toaster />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              name="lastname"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

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

          <div>
            <input
              name="phone"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              name="confirm-password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="w-full py-3 lg:flex lg:justify-center md:w-auto p-5 mt-4">
            <ReCAPTCHA ref={captcha} sitekey={CLAVE} onChange={onChange} />,
          </div>

          <div className="lg:flex lg:justify-center mt-3">
            <button
              type="submit"
              className="bg-green-600 w-full py-3 rounded-xl text-white font-bold mt-0 hover:cursor-pointer hover:bg-green-500 md:w-auto p-6"
            >
              Registrarte
            </button>
          </div>
        </form>

        <div className="mt-2 lg:flex lg:justify-center">
          <Link
            className="block text-center my-4 text-blue-600 hover:text-blue-700"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </div>
      </div>
    </>
  );
};
