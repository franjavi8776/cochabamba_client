import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const { user, handleChange, handleSubmit, handleGoogleLogin } = useLogin();

  return (
    <div className="w-[100vw] h-[100vh] bg-neutral dark:bg-primary text-black flex items-center justify-center text-xl ">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] md:w-[450px] min-h-[400px] p-5 bg-secondary dark:bg-neutral rounded-xl border border-primary  dark:border-secondary"
      >
        <h1 className="m-6 xl md:text-3xl text-center">Iniciar sesion</h1>

        <div className="w-[100%] flex mb-3 text-xs md:text-lg">
          <label className="w-[35%] rounded-md p-1">Email:</label>
          <input
            autoComplete="off"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-[65%] rounded-md p-1  bg-white text-primary border border-primary"
            type="text"
            required
          />
        </div>
        <div className="w-[100%] flex mb-3 text-xs md:text-lg">
          <label className="w-[35%] rounded-md p-1">Contraseña:</label>
          <input
            id="password"
            name="password"
            autoComplete="off"
            value={user.password}
            onChange={handleChange}
            className="w-[65%] rounded-md p-1 bg-white text-primary border border-primary"
            type="password"
            required
          />
        </div>

        <div className="text-center my-5">
          <button
            className="px-4 py-2 bg-primary rounded-xl text-neutral border border-secondary hover:text-secondary text-xs md:text-lg"
            name="emailLogin"
            type="submit"
          >
            Ingresar
          </button>
        </div>
        <hr />
        <div className="text-center mt-5">
          <button
            className=" px-4 py-2 rounded-full bg-primary text-neutral  border border-secondary hover:text-secondary text-xs md:text-lg"
            name="googleLogin"
            type="button"
            onClick={handleGoogleLogin}
          >
            <div className="flex ">
              <img
                src="google-svgrepo-com.svg"
                alt="Google icon"
                width="20px"
              />

              <span className="ml-2 hover:text-secondary">
                {" "}
                Ingresar con google
              </span>
            </div>
          </button>
        </div>
        <div
          className="text-md text-center mt-5
        "
        >
          <Link
            to="/register"
            className=" text-primary hover:text-accent dark:hover:text-secondary text-sm md:text-lg"
          >
            Necesitas Registrarte, haz click aqui!!!
          </Link>
        </div>
      </form>
      <Link to="/" className="absolute top-5 left-5">
        <button className=" text-sm  md:text-lg text-primary dark:text-neutral hover:text-secondary dark:hover:text-secondary">
          <i className="fa fa-arrow-left text-secondary" aria-hidden="true"></i>{" "}
          Volver
        </button>
      </Link>
    </div>
  );
};

export default LoginForm;
