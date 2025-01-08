import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const HomeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center z-50 pt-5 bg-primary text-neutral dark:text-primary bg-opacity-50">
      <div className="bg-primary dark:bg-neutral w-[200px] h-[460px] md:w-[300px] md:h-[600px] p-6 rounded-lg shadow-sm shadow-neutral text-lg relative border border-secondary">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-2xl  hover:text-secondary"
        >
          ✖
        </button>
        <h1 className="text-center text-secondary text-lg md:text-xl">
          Escoge una categoria
        </h1>

        <div className="flex flex-wrap justify-center items-center mt-5 text-sm md:text-lg gap-2 md:gap-5 ">
          <button onClick={() => navigate("/restaurant_form")}>
            <p className="py-2 px-4 hover:text-secondary">Restaurant</p>
          </button>
          <button onClick={() => navigate("/hotel_form")}>
            <p className="py-2 px-4 hover:text-secondary">Hoteles</p>
          </button>
          <button onClick={() => navigate("/taxi_form")}>
            <p className="py-2 px-4 hover:text-secondary">Transporte</p>
          </button>
          <button onClick={() => navigate("/movieTheater_form")}>
            <p className="py-2 px-4 hover:text-secondary">Cines</p>
          </button>
          <button onClick={() => navigate("/supermarket_form")}>
            <p className="py-2 px-4 hover:text-secondary">Supermercados</p>
          </button>

          <button onClick={() => navigate("/gym_form")}>
            <p className="py-2 px-4 hover:text-secondary">Deportes</p>
          </button>
          <button onClick={() => navigate("/tourism_form")}>
            <p className="py-2 px-4 hover:text-secondary ">Turismo</p>
          </button>
          <button onClick={() => navigate("/emergency_form")}>
            <p className="py-2 px-4  hover:text-secondary">Emergencias</p>
          </button>
        </div>
      </div>
    </div>
  );
};
HomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HomeModal;
