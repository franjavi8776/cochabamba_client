import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsByUser,
  deleteRestaurant,
  updateIsActive,
  getHotelsByUser,
  deleteHotel,
  updateIsActiveHotel,
  getTaxisByUser,
  deleteTaxi,
  updateIsActiveTaxi,
  getSupermarketsByUser,
  deleteSupermarket,
  updateIsActiveSupermarket,
  getTourismsByUser,
  deleteTourism,
  updateIsActiveTourism,
  getGymsByUser,
  deleteGym,
  updateIsActiveGym,
  getMovieTheatersByUser,
  deleteMovieTheater,
  updateIsActiveMovieTheater,
  getEmergenciesByUser,
  deleteEmergency,
  updateIsActiveEmergency,
} from "../../redux/actions";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RestaurantsByUser = () => {
  const id = useSelector((state) => state.id);
  const restaurantsByUser = useSelector((state) => state.restaurantsByUser);
  const hotelsByUser = useSelector((state) => state.hotelsByUser);
  const taxisByUser = useSelector((state) => state.taxisByUser);
  const supermarketsByUser = useSelector((state) => state.supermarketsByUser);
  const tourismsByUser = useSelector((state) => state.tourismsByUser);
  const gymsByUser = useSelector((state) => state.gymsByUser);
  const movieTheatersByUser = useSelector((state) => state.moviesByUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRestaurantsByUser(id));
    dispatch(getHotelsByUser(id));
    dispatch(getTaxisByUser(id));
    dispatch(getSupermarketsByUser(id));
    dispatch(getGymsByUser(id));
    dispatch(getTourismsByUser(id));
    dispatch(getMovieTheatersByUser(id));
  }, [dispatch, id]);

  const handleDeleteRestaurant = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteRestaurant(id));
      }
    });
  };

  const handleDeleteHotel = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteHotel(id));
      }
    });
  };

  const handleDeleteTaxi = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteTaxi(id));
      }
    });
  };

  const handleDeleteSupermarket = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteSupermarket(id));
      }
    });
  };

  const handleDeleteGym = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteGym(id));
      }
    });
  };

  const handleDeleteTourism = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteTourism(id));
      }
    });
  };

  const handleDeleteMovieTheater = (id) => {
    Swal.fire({
      width: "230px",
      position: "top",
      title: "Deseas eliminar?",
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
        dispatch(deleteMovieTheater(id));
      }
    });
  };

  const handleUpdateRestaurant = (restaurantState) => {
    navigate("/restaurant_form", { state: { restaurantState } });
  };

  const handleUpdateHotel = (hotelState) => {
    navigate("/hotel_form", { state: { hotelState } });
  };

  const handleUpdateTaxi = (taxiState) => {
    navigate("/taxi_form", { state: { taxiState } });
  };

  const handleUpdateSupermarket = (supermarketState) => {
    navigate("/supermarket_form", { state: { supermarketState } });
  };

  const handleUpdateGym = (gymState) => {
    navigate("/gym_form", { state: { gymState } });
  };

  const handleUpdateTourism = (tourismState) => {
    navigate("/tourism_form", { state: { tourismState } });
  };

  const handleUpdateMovieTheater = (movieTheaterState) => {
    navigate("/movieTheater_form", { state: { movieTheaterState } });
  };

  const handleToggleActive = (id) => {
    dispatch(updateIsActive(id));
  };

  const handleToggleActiveHotel = (id) => {
    dispatch(updateIsActiveHotel(id));
  };

  const handleToggleActiveTaxi = (id) => {
    dispatch(updateIsActiveTaxi(id));
  };

  const handleToggleActiveSupermarket = (id) => {
    dispatch(updateIsActiveSupermarket(id));
  };

  const handleToggleActiveGym = (id) => {
    dispatch(updateIsActiveGym(id));
  };

  const handleToggleActiveTourism = (id) => {
    dispatch(updateIsActiveTourism(id));
  };

  const handleToggleActiveMovieTheater = (id) => {
    dispatch(updateIsActiveMovieTheater(id));
  };

  return (
    <div className="w-full min-h-[100vh] bg-neutral dark:bg-primary text-primary ">
      <Navbar nameCategory="" />
      <div className="w-[95%] m-auto overflow-x-auto">
        <table className="w-[900px] md:w-[1400px] min-h-[10vh] m-auto border-collapse text-center bg-neutral text-xs md:text-lg">
          <thead className="border border-secondary text-neutral ">
            <tr className="bg-primary">
              <th className="w-[280px] ">Nombre</th>
              <th className="w-[100px]">Imagenes</th>
              <th className="w-[300px]">Ofertas</th>
              <th className="w-[80px]">CodArea</th>
              <th className="w-[120px]">Telefono</th>
              <th className="w-[150px]">Ciudad</th>
              <th className="w-[150px]">Pais</th>
              <th className="w-[100px]">Act/Des</th>
              <th className="w-[120px] flex justify-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="border border-secondary">
            {restaurantsByUser.map((restaurant) => (
              <tr
                key={restaurant.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{restaurant.name}</td>
                <td>
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{restaurant.offers[0]}</td>
                <td>{restaurant.codArea}</td>
                <td>{restaurant.phone}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActive(restaurant.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      restaurant.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {restaurant.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateRestaurant(restaurant);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteRestaurant(restaurant.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {hotelsByUser.map((hotel) => (
              <tr
                key={hotel.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{hotel.name}</td>
                <td>
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{hotel.offers[0]}</td>
                <td>{hotel.codArea}</td>
                <td>{hotel.phone}</td>
                <td>{hotel.city}</td>
                <td>{hotel.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveHotel(hotel.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      hotel.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {hotel.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateHotel(hotel);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteHotel(hotel.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {taxisByUser.map((taxi) => (
              <tr
                key={taxi.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{taxi.name}</td>
                <td>
                  <img
                    src={taxi.images[0]}
                    alt={taxi.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{taxi.offers[0]}</td>
                <td>{taxi.codArea}</td>
                <td>{taxi.phone}</td>
                <td>{taxi.city}</td>
                <td>{taxi.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveTaxi(taxi.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      taxi.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {taxi.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateTaxi(taxi);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteTaxi(taxi.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {supermarketsByUser.map((supermarket) => (
              <tr
                key={supermarket.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{supermarket.name}</td>
                <td>
                  <img
                    src={supermarket.images[0]}
                    alt={supermarket.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{supermarket.offers[0]}</td>
                <td>{supermarket.codArea}</td>
                <td>{supermarket.phone}</td>
                <td>{supermarket.city}</td>
                <td>{supermarket.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveSupermarket(supermarket.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      supermarket.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {supermarket.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateSupermarket(supermarket);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteSupermarket(supermarket.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {gymsByUser.map((gym) => (
              <tr
                key={gym.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{gym.name}</td>
                <td>
                  <img
                    src={gym.images[0]}
                    alt={gym.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{gym.offers[0]}</td>
                <td>{gym.codArea}</td>
                <td>{gym.phone}</td>
                <td>{gym.city}</td>
                <td>{gym.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveGym(gym.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      gym.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {gym.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateGym(gym);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteGym(gym.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tourismsByUser.map((tourism) => (
              <tr
                key={tourism.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{tourism.name}</td>
                <td>
                  <img
                    src={tourism.images[0]}
                    alt={tourism.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{tourism.offers[0]}</td>
                <td>{tourism.codArea}</td>
                <td>{tourism.phone}</td>
                <td>{tourism.city}</td>
                <td>{tourism.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveTourism(tourism.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      tourism.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {tourism.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateTourism(tourism);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteTourism(tourism.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {movieTheatersByUser.map((movieTheater) => (
              <tr
                key={movieTheater.id}
                className="border border-secondary odd:bg-secondary "
              >
                <td>{movieTheater.name}</td>
                <td>
                  <img
                    src={movieTheater.images[0]}
                    alt={movieTheater.name}
                    className="w-16 h-16 border border-primary rounded-md"
                  />
                </td>
                <td>{movieTheater.offers[0]}</td>
                <td>{movieTheater.codArea}</td>
                <td>{movieTheater.phone}</td>
                <td>{movieTheater.city}</td>
                <td>{movieTheater.country}</td>
                <td>
                  <button
                    onClick={() => {
                      handleToggleActiveMovieTheater(movieTheater.id);
                    }}
                    className={`py-2 px-4 rounded-md bg-primary ${
                      movieTheater.isActive ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {movieTheater.isActive ? (
                      <i className="fa fa-times"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleUpdateMovieTheater(movieTheater);
                    }}
                    className="py-2 px-2 bg-primary text-secondary rounded-xl mx-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteMovieTheater(movieTheater.id);
                    }}
                    className="py-2 px-2 bg-primary text-accent rounded-xl mx-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsByUser;
