import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginByEmail, loginByGoogle } from "../../redux/actions";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useLogin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [tokenGoogle, setTokenGoogle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const error = useSelector((state) => state.error);

  //console.log(error);

  useEffect(() => {
    if (token) {
      setLoading(false);
      navigate("/");
      Swal.fire({
        width: "230px",
        position: "top",
        title: "¡Ingreso exitoso!",
        background: "black",
        color: "#eff6ff",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          title: "text-xs md:text-sm",
        },
      });
    }

    if (error) {
      setLoading(false);
      Swal.fire({
        position: "top",
        title: "Email o contraseña invalida. ¡Intentelo de nuevo!",
        background: "black",
        color: "#eff6ff",
        width: "230px",
        confirmButtonColor: "transparent",
        customClass: {
          title: "text-xs md:text-sm",
          confirmButton: "custom-confirm-button text-xs md:text-sm",
        },
      });
    } else {
      cleanForm();
    }
  }, [navigate, error, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        setTokenGoogle(user.accessToken);
        await dispatch(loginByGoogle(user.accessToken));
        navigate("/");
        Swal.fire({
          width: "230px",
          position: "top",
          title: "¡Ingreso exitoso!",
          background: "black",
          color: "#eff6ff",
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: "text-xs md:text-sm",
          },
        });
      }
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      Swal.fire({
        position: "top",
        title: "Error en el inicio de sesión con Google.",
        background: "black",
        color: "#eff6ff",
        width: "230px",
        confirmButtonColor: "transparent",
        customClass: {
          title: "text-xs md:text-sm",
          confirmButton: "custom-confirm-button text-xs md:text-sm",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "CLEAR_ERROR" });
    const action = e.nativeEvent.submitter.name;
    if (action === "emailLogin") {
      dispatch(
        loginByEmail({ email: user.email, password: user.password })
      ).then(() => setLoading(false));
    }
  };

  const cleanForm = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  return {
    user,
    token,
    tokenGoogle,
    loading,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};
