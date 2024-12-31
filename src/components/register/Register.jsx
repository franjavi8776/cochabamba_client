import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { createUser, getUsers, updateUser } from "../../redux/actions";
import Swal from "sweetalert2";

const UserRegister = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    codArea: "591",
    phone: "",
    city: "",
    country: "",
  });

  const id = useSelector((state) => state.id);
  //console.log(id);
  const users = useSelector((state) => state.users);
  //console.log(users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const userToUpdate = users.find((user) => user.id === id);
      if (userToUpdate) {
        setUser(userToUpdate);
      }
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  const handleCodArea = (value) => {
    setUser({
      ...user,
      codArea: value,
    });
  };

  const cleanForm = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      codArea: "",
      phone: "",
      city: "",
      country: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Si hay un ID, se realiza una actualización
      dispatch(updateUser(id, user)) // Asegúrate de tener una acción `updateUser` en tu Redux
        .then(() => {
          Swal.fire({
            position: "top",
            title: "¡Actualización exitosa!",
            background: "transparent",
            color: "#eff6ff",
            width: "400px",
            confirmButtonColor: "transparent",
            customClass: {
              title: "text-xs md:text-sm",
              confirmButton: "custom-confirm-button text-xs md:text-sm",
            },
          }).then(() => {
            cleanForm();
            navigate("/"); // Cambiar a la ruta adecuada tras la actualización
          });
        })
        .catch(() => {
          Swal.fire({
            position: "top",
            title: "Error al actualizar. Por favor, inténtalo de nuevo.",
            background: "transparent",
            color: "#eff6ff",
            width: "400px",
            confirmButtonColor: "transparent",
            customClass: {
              text: "text-xs md:text-sm",
              confirmButton: "custom-confirm-button text-xs md:text-sm",
            },
          });
        });
    } else {
      // Si no hay ID, se realiza un registro
      dispatch(createUser(user))
        .then(() => {
          Swal.fire({
            position: "top",
            title: "¡Registro exitoso!",
            background: "transparent",
            color: "#eff6ff",
            width: "400px",
            confirmButtonColor: "transparent",
            customClass: {
              title: "text-xs md:text-sm",
              confirmButton: "custom-confirm-button text-xs md:text-sm",
            },
          }).then(() => {
            cleanForm();
            navigate("/login");
          });
        })
        .catch(() => {
          Swal.fire({
            position: "top",
            title: "El email ya existe. ¡Inténtelo de nuevo con otro email!",
            background: "transparent",
            color: "#eff6ff",
            width: "400px",
            confirmButtonColor: "transparent",
            customClass: {
              title: "text-xs md:text-sm",
              confirmButton: "custom-confirm-button text-xs md:text-sm",
            },
          });
        });
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-neutral dark:bg-primary text-primary flex items-center justify-center text-sm md:text-xl">
        <form
          onSubmit={handleSubmit}
          className="w-[320px] md:w-[650px] m-h-[500px] p-5 bg-secondary dark:bg-neutral rounded-xl border border-primary dark:border-secondary"
        >
          <h1 className="m-8 text-sm md:text-3xl text-center">
            {id ? "Actualizar  de Usuario" : "Registrar de Usuario"}
          </h1>
          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[35%] p-1">Nombre: </label>
            <input
              autoComplete="off"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-[65%] rounded-md p-1  text-primary border border-primary"
              type="text"
              id="name"
              required
            />
          </div>

          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[35%] p-1">Email:</label>
            <input
              autoComplete="off"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="w-[65%] rounded-md p-1  text-primary border border-primary"
              type="text"
              required
            />
          </div>
          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[35%] p-1">Contraseña:</label>
            <input
              autoComplete="off"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-[70%] rounded-md p-1  text-primary border border-primary"
              type="password"
              required
            />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row mb-3">
            <div className="w-[100%] md:w-[35%] flex text-xs md:text-lg">
              <label className="w-[60%] p-1">Codigo:</label>
              <PhoneInput
                country={"bo"}
                autoComplete="off"
                id="codArea"
                name="codArea"
                value={user.codArea}
                onChange={handleCodArea}
                type="text"
                className="w-[40%] rounded-md  bg-white text-primary border border-primary "
                inputStyle={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                  fontFamily: "'WinterTrendy', sans-serif",
                  fontSize: "16px",
                }}
                buttonStyle={{
                  border: "none",
                  backgroundColor: "transparent",
                }}
                required
              />
            </div>
            <div className="w-[100%] md:w-[65%] flex mt-3 md:mt-0 text-xs md:text-lg">
              <label className="w-[40%] md:ml-5 p-1">Celular: </label>
              <input
                autoComplete="off"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-[60%] rounded-md p-1  text-primary border border-primary"
                type="text"
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row mb-3">
            <div className="w-[100%] md:w-[50%] flex mb-3 md:mb-0 text-xs md:text-lg">
              <label className="w-[42%] p-1">Ciudad: </label>
              <input
                autoComplete="off"
                id="city"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-[58%] rounded-md p-1  text-primary border border-primary"
                type="text"
                required
              />
            </div>
            <div className="w-[100%] md:w-[50%] flex text-xs md:text-lg">
              <label className="w-[21%] md:ml-5 p-1">Pais:</label>
              <input
                autoComplete="off"
                id="country"
                name="country"
                value={user.country}
                onChange={handleChange}
                className="w-[79%] rounded-md p-1  text-primary border border-primary"
                type="text"
                required
              />
            </div>
          </div>
          <div className="text-center mt-8 text-xs md:text-lg">
            <button
              className=" px-4 py-2 bg-primary rounded-md text-neutral border border-secondary hover:text-secondary"
              type="submit"
            >
              {id ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
        <Link to="/" className="absolute top-5 left-5 ">
          <button className="  text-primary dark:text-neutral text-xs md:text-lg hover:text-secondary dark:hover:text-secondary">
            {" "}
            <i
              className="fa fa-arrow-left text-secondary"
              aria-hidden="true"
            ></i>{" "}
            Volver
          </button>
        </Link>
      </div>
    </>
  );
};

export default UserRegister;
