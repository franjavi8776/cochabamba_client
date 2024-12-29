import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsByUser,
  deleteRestaurant,
  updateIsActive,
} from "../../redux/actions";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
const RestaurantsByUser = () => {
  const id = useSelector((state) => state.id);
  const restaurantsByUser = useSelector((state) => state.restaurantsByUser);

  //console.log(restaurantsByUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRestaurantsByUser(id));
  }, [dispatch, id]);

  const handleDeleteRestaurant = (id) => {
    dispatch(deleteRestaurant(id));
    alert("Restaurant eleminado correctamente");
  };

  const handleUpdateRestaurant = (restaurantState) => {
    navigate("/restaurant_form", { state: { restaurantState } });
  };

  const handleToggleActive = (id) => {
    dispatch(updateIsActive(id));
  };

  return (
    <div className="w-full min-h-[100vh] bg-neutral dark:bg-primary text-primary ">
      <Navbar />
      <div className="overflow-x-auto">
        <table className="w-[1400px] min-h-[10vh] m-auto border-collapse text-center bg-neutral">
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsByUser;
