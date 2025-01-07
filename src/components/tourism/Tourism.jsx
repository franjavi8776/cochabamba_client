import Navbar from "../navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../theme/ThemeContext";
import { getAllTourisms, getTourismsByCategory } from "../../redux/actions";
import TourismModal from "./TourismModal";

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

const Tourism = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTourism, setSelectedTourism] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 12;

  const { darkMode } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const tourisms = useSelector((state) => state.tourisms);

  const totalResults = useSelector((state) => state.totalResults);

  const tourismsByCategory = useSelector((state) => state.tourismsByCategory);

  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllTourisms(searchTerm, page, limit)).then(() =>
      setLoading(false)
    );
  }, [dispatch, searchTerm, page]);

  let totalPages = Math.ceil(totalResults / limit);

  const pagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const handleTourismClick = (tourism) => {
    setSelectedTourism(tourism);
    setIsModalOpen(true);
  };

  const handleClickCategory = (category) => {
    setPage(1);
    if (category === "Todos") {
      dispatch(getAllTourisms(searchTerm, page, limit));
    } else {
      dispatch(getTourismsByCategory([category], page, limit));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
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
    <div className="w-full min-h-[100vh] text-primary bg-neutral dark:bg-primary dark:text-neutral">
      <Navbar nameCategory="Turismo" />
      <div className="w-[85vw] md:w-[70vw] m-auto mt-10 flex  flex-wrap justify-center gap-5 pb-10 ">
        <div className="w-full md:w-[50%] text-xs md:text-lg">
          <input
            type="search"
            placeholder="buscar por nombre..."
            className="w-full px-4 py-2 rounded-md text-primary border border-black dark:border-secondary"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full md:w-[80%] lg:w-full lg:h-32  flex flex-wrap gap-5 justify-center lg:justify-between text-xs lg:text-xl ">
          {["Todos", "Museos", "Parques", "Aventura", "Discotecas"].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleClickCategory(category)}
                className="hover:text-secondary"
              >
                {category}
              </button>
            )
          )}
        </div>

        {error ? (
          <div className="text-center text-3xl mt-20">{error}</div>
        ) : (
          <>
            {(tourismsByCategory.length > 0 ? tourismsByCategory : tourisms)
              .length > 0 ? (
              (tourismsByCategory.length > 0
                ? tourismsByCategory
                : tourisms
              ).map((tourism) => (
                <div
                  onClick={() => handleTourismClick(tourism)}
                  key={tourism.id}
                  className="w-[400px] h-[200px] bg-primary text-neutral dark:bg-neutral dark:text-primary rounded-lg overflow-hidden border border-secondary cursor-pointer"
                >
                  <img
                    key={tourism.id}
                    src={tourism.images[0]}
                    alt={tourism.name}
                    className="w-full h-[150px] object-cover object-center"
                  />
                  <div className="flex justify-between items-center">
                    <h1 className="text-sm md:text-xl m-3">{tourism.name}</h1>
                    <p className="m-3">
                      {tourism.averageStars ? (
                        renderStars(tourism.averageStars)
                      ) : (
                        <small className="text-accent">Sin Puntacion</small>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg md:text-3xl mt-20">
                Turismo no encontrado
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
      {isModalOpen && selectedTourism && (
        <TourismModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourism={selectedTourism}
        >
          <button onClick={() => setIsModalOpen(false)}>X</button>
        </TourismModal>
      )}
    </div>
  );
};

export default Tourism;
