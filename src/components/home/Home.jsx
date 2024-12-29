import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { logout, getRestaurantsByUser } from "../../redux/actions";
import { ThemeContext } from "../theme/ThemeContext";

import Category from "../category/Category";
import Footer from "../footer/Footer";
import HomeModal from "./HomeModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [center, setCenter] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const token = useSelector((state) => state.token);
  const name = useSelector((state) => state.name);
  const id = useSelector((state) => state.id);

  const restaurantsByUser = useSelector((state) => state.restaurantsByUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getRestaurantsByUser(id));
    }
  }, [dispatch, token, id]);

  const categoryStyles = (offsetX, offsetY) => {
    const isMobile = window.innerWidth < 768;
    const mobileOffsetMultiplier = 0.38;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const tabletOffsetMultiplier = 0.7;
    return {
      position: "absolute",
      left: `${
        center.x +
        (isMobile
          ? offsetX * mobileOffsetMultiplier
          : isTablet
          ? offsetX * tabletOffsetMultiplier
          : offsetX)
      }px`,
      top: `${
        center.y +
        (isMobile
          ? offsetY * mobileOffsetMultiplier
          : isTablet
          ? offsetY * tabletOffsetMultiplier
          : offsetY)
      }px`,
      transform: "translate(-50%, -50%)",
    };
  };

  let firstName;
  if (token) {
    firstName =
      name.split(" ")[0][0].toUpperCase() + name.split(" ")[0].slice(1);
  }

  const handleLogout = () => {
    Swal.fire({
      position: "top",
      title: "Estás seguro?",
      text: "Deseas cerrar sesión?",
      color: "#eff6ff",
      background: "transparent",
      showCancelButton: true,
      confirmButtonColor: "transparent",
      cancelButtonColor: "transparent",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  const handleClickRestaurants = () => {
    navigate("/restaurantsByUser");
  };

  const handleClickUser = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-[100vh] text-primary bg-neutral dark:bg-primary dark:text-neutral">
      <div className="flex-1">
        <button
          onClick={toggleTheme}
          className="absolute bottom-10 left-5 p-2 rounded-full bg-primary dark:bg-neutral text-accent dark:text-secondary transition-colors duration-300 border border-secondary"
        >
          <i
            className={`fa ${darkMode === true ? "fa-moon-o" : "fa-sun-o"}`}
          ></i>
        </button>

        {!token ? (
          <Link to="/Login" className="absolute top-10 right-10">
            <button className="text-lg  hover:text-secondary">
              Iniciar Sesion
              <i className="fa fa-sign-in ml-2 text-secondary"></i>
            </button>
          </Link>
        ) : (
          <>
            <div className="absolute top-5 right-5 ">
              <button onClick={handleClickUser}>
                <span className="mr-2 text-lg hover:text-secondary">
                  {firstName}
                </span>
                <i
                  className="fa fa-user text-lg text-secondary"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <div className="absolute top-16 right-5  text-lg hover:text-secondary z-10">
              <button onClick={handleModalClick}>
                <span>Publica tu negocio</span>
                <i
                  className="fa fa-plus ml-2 text-lg  text-secondary"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            {restaurantsByUser.length > 0 && (
              <div className="absolute top-28 right-5 text-lg hover:text-secondary z-10">
                <button onClick={handleClickRestaurants}>
                  <span>Revisa tus anuncios</span>
                  <i
                    className="fa fa-eye ml-2 text-secondary"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            )}

            <div className="absolute bottom-10 right-5">
              <button
                onClick={handleLogout}
                className="  text-lg  hover:text-secondary"
              >
                Cerrar sesion
                <i
                  className="fa fa-sign-out text-secondary ml-2 "
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </>
        )}
        <h5
          style={categoryStyles(0, -20)}
          className="w-[260px] md:w-[450px] lg:w-[650px]"
        >
          <img src="logo.png" alt="logo" />
        </h5>
        <div style={categoryStyles(-280, -290)}>
          <Category
            category="restaurant"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="restaurant.png" alt="restaurant" />}
          />
        </div>
        <div style={categoryStyles(280, -290)}>
          <Category
            category="hotel"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="hotel.png" alt="hotel" />}
          />
        </div>
        <div style={categoryStyles(-280, 290)}>
          <Category
            category="movie"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="cinema.png" alt="cinema" />}
          />
        </div>
        <div style={categoryStyles(280, 290)}>
          <Category
            category="tourism"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="tourism.png" alt="tourism" />}
          />
        </div>
        <div style={categoryStyles(0, -290)}>
          <Category
            category="hospital"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="hospital.png" alt="hospital" />}
          />
        </div>
        <div style={categoryStyles(450, 0)}>
          <Category
            category="park"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="park.png" alt="park" />}
          />
        </div>
        <div style={categoryStyles(-450, 0)}>
          <Category
            category="disco"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="clubs.png" alt="clubs" />}
          />
        </div>
        <div style={categoryStyles(0, 290)}>
          <Category
            category="supermarket"
            width={
              window.innerWidth < 768
                ? "65px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "110px"
                : "140px"
            }
            icon={<img src="supermarket.png" alt="supermarket" />}
          />
        </div>
        <div style={categoryStyles(-140, -205)}>
          <Category
            category="university"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="university.png" alt="university" />}
          />
        </div>
        <div style={categoryStyles(140, -205)}>
          <Category
            category="store"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="shopping.png" alt="shopping" />}
          />
        </div>
        <div style={categoryStyles(-140, 205)}>
          <Category
            category="gym"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="gym.png" alt="gym" />}
          />
        </div>
        <div style={categoryStyles(140, 205)}>
          <Category
            category="taxi"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="taxi.png" alt="taxi" />}
          />
        </div>
        <div style={categoryStyles(-430, -205)}>
          <Category
            category="emergency"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="emergency.png" alt="emergencias" />}
          />
        </div>
        <div style={categoryStyles(430, -205)}>
          <Category
            category="delivery"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="calendary.png" alt="calendario" />}
          />
        </div>
        <div style={categoryStyles(-430, 205)}>
          <Category
            category="university"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="university.png" alt="universidades" />}
          />
        </div>
        <div style={categoryStyles(430, 205)}>
          <Category
            category="rent"
            width={
              window.innerWidth < 768
                ? "50px"
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? "70px"
                : "100px"
            }
            icon={<img src="rent.png" alt="alquileres" />}
          />
        </div>
      </div>
      <HomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Footer />
    </div>
  );
};

export default Home;
