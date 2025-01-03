import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import Swal from "sweetalert2";

import { logout, getRestaurantsByUser } from "../../redux/actions";
import { ThemeContext } from "../theme/ThemeContext";

import Category from "../category/Category";
import Footer from "../footer/Footer";
import HomeModal from "./HomeModal";
import CochabambaModal from "./CochabambaModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCochabamba, setIsModalCochabamba] = useState(false);
  const [center, setCenter] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [loading, setLoading] = useState(true);

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

  const categories = useMemo(
    () => [
      {
        name: "restaurant",
        image: "/restaurant.png",
        offsetX: -280,
        offsetY: -210,
      },
      { name: "hotel", image: "/hotel.png", offsetX: 280, offsetY: -210 },
      { name: "movie", image: "/cinema.png", offsetX: -280, offsetY: 210 },
      { name: "tourism", image: "/tourism.png", offsetX: 280, offsetY: 210 },
      { name: "hospital", image: "/hospital.png", offsetX: 0, offsetY: -210 },
      { name: "park", image: "/park.png", offsetX: 425, offsetY: 0 },
      { name: "disco", image: "/clubs.png", offsetX: -425, offsetY: 0 },
      {
        name: "supermarket",
        image: "/supermarket.png",
        offsetX: 0,
        offsetY: 210,
      },
    ],
    []
  );

  useEffect(() => {
    // Función para esperar que todas las imágenes carguen
    const loadImages = async () => {
      const imagePromises = categories.map(
        (category) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = category.image;
            img.onload = resolve;
            img.onerror = resolve; // Manejo de errores
          })
      );
      await Promise.all(imagePromises);
      setLoading(false);
    };

    loadImages();
  }, [categories]);

  const categoryStyles = (offsetX, offsetY) => {
    const isMobile = window.innerWidth < 768;
    const mobileOffsetMultiplier = 0.34;
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
      width: "230px",
      position: "top",
      title: "Deseas cerrar sesion ?",
      color: "#eff6ff",
      background: "black",
      showCancelButton: true,
      confirmButtonColor: "transparent",
      cancelButtonColor: "transparent",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        title: "text-xs md:text-sm",
        confirmButton: "custom-confirm-button text-xs md:text-sm",
        cancelButton: "custom-cancel-button text-xs md:text-sm",
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

  const handleModalCochabamba = () => {
    setIsModalCochabamba(true);
  };

  const handleClickRestaurants = () => {
    navigate("/restaurantsByUser");
  };

  const handleClickUser = () => {
    navigate("/register");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral dark:bg-primary">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor={darkMode ? "#72c0d1" : "#000000"}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100vh] text-primary bg-neutral dark:bg-primary dark:text-neutral">
      <div className="flex-1">
        <button
          onClick={toggleTheme}
          className="absolute bottom-10 left-5 p-1 md:p-2 rounded-full bg-primary dark:bg-neutral text-accent dark:text-secondary transition-colors duration-300 border border-secondary"
        >
          <i
            className={`fa ${
              darkMode === true ? "fa-moon-o" : "fa-sun-o"
            } text-sm md:text-lg`}
          ></i>
        </button>

        {!token ? (
          <Link
            to="/Login"
            className="absolute top-5 right-5 md:top-10 md:right-10"
          >
            <button className="text-sm md:text-lg  hover:text-secondary">
              Iniciar Sesion
              <i className="fa fa-sign-in ml-2 text-secondary"></i>
            </button>
          </Link>
        ) : (
          <>
            <div className="absolute top-5 right-5 ">
              <button onClick={handleClickUser}>
                <span className="mr-2 text-sm md:text-lg hover:text-secondary">
                  {firstName}
                </span>
                <i
                  className="fa fa-user text-sm md:text-lg text-secondary"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <div className="absolute top-16 right-5 text-sm  md:text-lg hover:text-secondary z-10">
              <button onClick={handleModalClick}>
                <span>Publica tu negocio</span>
                <i
                  className="fa fa-plus ml-2 text-sm md:text-lg  text-secondary"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            {restaurantsByUser.length > 0 && (
              <div className="absolute top-28 right-5 text-sm md:text-lg hover:text-secondary z-10">
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
                className="text-sm md:text-lg  hover:text-secondary"
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
          style={categoryStyles(0, 0)}
          className="w-[215px] md:w-[430px] lg:w-[600px]"
        >
          <button onClick={handleModalCochabamba}>
            <img src="logo.png" alt="logo" />
          </button>
        </h5>
        {categories.map((category, index) => (
          <div
            key={index}
            style={categoryStyles(category.offsetX, category.offsetY)}
          >
            <Category
              category={category.name}
              width={
                window.innerWidth < 768
                  ? "50px"
                  : window.innerWidth >= 768 && window.innerWidth < 1024
                  ? "110px"
                  : "130px"
              }
              icon={<img src={category.image} alt={category.name} />}
            />
          </div>
        ))}
      </div>
      <HomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CochabambaModal
        isOpen={isModalCochabamba}
        onClose={() => setIsModalCochabamba(false)}
      />

      <Footer />
    </div>
  );
};

export default Home;
