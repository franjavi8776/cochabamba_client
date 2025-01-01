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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const error = useSelector((state) => state.error);

  //console.log(error);

  useEffect(() => {
    if (token) {
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
      }).then(() => navigate("/"));
    }

    if (error) {
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
  }, [navigate, token, error]);

  useEffect(() => {
    if (tokenGoogle) {
      dispatch(loginByGoogle(tokenGoogle));
    }
  }, [tokenGoogle, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
      setTokenGoogle(user.accessToken);
      dispatch(loginByGoogle(user.accessToken));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });
    const action = e.nativeEvent.submitter.name;
    if (action === "emailLogin") {
      dispatch(loginByEmail({ email: user.email, password: user.password }));
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
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};
