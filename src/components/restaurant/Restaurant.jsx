import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurants,
  getRestaurantsByCategory,
} from "../../redux/actions";
import RestaurantModal from "./RestaurantModal";

const roundStars = (stars) => {
  if (stars > 4.5) {
    return 5;
  } else if (stars > 4) {
    return 4.5;
  } else if (stars > 3.5) {
    return 4;
  } else if (stars > 3) {
    return 3.5;
  } else if (stars > 2.5) {
    return 3;
  } else if (stars > 2) {
    return 2.5;
  } else if (stars > 1.5) {
    return 2;
  } else if (stars > 1) {
    return 1.5;
  } else {
    return 1;
  }
};

const renderStars = (stars) => {
  const roundedStars = roundStars(stars);
  const fullStars = Math.floor(roundedStars);
  const halfStars = roundedStars % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const starArray = [
    ...Array(fullStars).fill("fa fa-star"),
    ...Array(halfStars).fill("fa fa-star-half-o"),
    ...Array(emptyStars).fill("fa fa-star-o"),
  ];

  return starArray.map((starClass, index) => (
    <i key={index} className={`${starClass}`} />
  ));
};

const Restaurant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);
  const totalResults = useSelector((state) => state.totalResults);
  const restaurantsByCategory = useSelector(
    (state) => state.restaurantsByCategory
  );
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllRestaurants(searchTerm, page, limit));
  }, [dispatch, searchTerm, page]);

  let totalPages = Math.ceil(totalResults / limit);

  const pagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleClickCategory = (category) => {
    dispatch({ type: "CLEAR_ERROR" });

    if (category === "Todos") {
      setPage(1);
      dispatch(getAllRestaurants(searchTerm, page, limit));
    } else {
      dispatch(getRestaurantsByCategory([category], 1, limit));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="w-full min-h-[100vh] text-primary bg-neutral dark:bg-primary dark:text-neutral">
      <Navbar nameCategory="Restaurantes" />
      <div className="w-[70vw] m-auto mt-10 flex  flex-wrap justify-center gap-5 pb-10 ">
        <div className="w-[50%]">
          <input
            type="search"
            placeholder="buscar por nombre de restaurant"
            className="w-full px-4 py-2 rounded-md text-primary border border-black dark:border-secondary"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-[80%] lg:w-full lg:h-20  flex flex-wrap gap-5 justify-center lg:justify-between text-md lg:text-xl ">
          {[
            "Todos",
            "Churrasqueria",
            "Polleria",
            "Salteñerias",
            "Americana",
            "Mexicana",
            "Alitas",
            "Rapida",
            "Cochabambina",
            "Mariscos",
          ].map((category) => (
            <button
              key={category}
              onClick={() => handleClickCategory(category)}
              className="hover:text-secondary"
            >
              {category}
            </button>
          ))}
        </div>

        {error ? (
          <div className="text-center text-3xl mt-20">{error}</div>
        ) : (
          <>
            {(restaurantsByCategory.length > 0
              ? restaurantsByCategory
              : restaurants
            ).length > 0 ? (
              (restaurantsByCategory.length > 0
                ? restaurantsByCategory
                : restaurants
              ).map((restaurant) => (
                <div
                  onClick={() => handleRestaurantClick(restaurant)}
                  key={restaurant.id}
                  className="w-[400px] h-[200px] bg-primary text-neutral dark:bg-neutral dark:text-primary rounded-lg overflow-hidden border border-secondary cursor-pointer"
                >
                  <img
                    key={restaurant.id}
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-full h-[150px] object-cover object-center"
                  />
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-xl m-3">{restaurant.name}</h1>
                    <p className="m-3 ">
                      {restaurant.averageStars ? (
                        renderStars(restaurant.averageStars)
                      ) : (
                        <small>Sin Puntación</small>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-3xl mt-20">
                Restaurantes no encontrados
              </div>
            )}
          </>
        )}
        <div className="w-full flex justify-center items-center mt-5 gap-5 text-lg lg:text-2xl">
          {totalResults > limit &&
            pagesArray.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`pagination-hover-line ${
                  pageNumber === page
                    ? "text-secondary"
                    : "text-primary dark:text-neutral"
                }`}
              >
                {pageNumber}
              </button>
            ))}
        </div>
      </div>
      {isModalOpen && selectedRestaurant && (
        <RestaurantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          restaurant={selectedRestaurant}
        >
          <button onClick={() => setIsModalOpen(false)}>X</button>
        </RestaurantModal>
      )}
    </div>
  );
};

export default Restaurant;
