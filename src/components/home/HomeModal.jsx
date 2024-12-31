import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const HomeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRestaurant = () => {
    navigate("/restaurant_form");
  };

  return (
    <div className="fixed inset-0  flex justify-center z-50 pt-5 bg-primary text-neutral dark:text-primary bg-opacity-50">
      <div className="bg-primary dark:bg-neutral w-[320px] md:w-[380px] h-[500px] md:h-[650px]  p-6 rounded-lg shadow-sm shadow-neutral text-lg relative border border-secondary">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-2xl  hover:text-secondary"
        >
          ✖
        </button>
        <h1 className="text-center text-secondary text-lg md:text-2xl">
          Escoge la categoria de tu negocio
        </h1>

        <div className="flex flex-wrap justify-center items-center mt-5 text-sm md:text-lg gap-5 ">
          <button onClick={handleRestaurant}>
            <p className="py-2 px-4 hover:text-secondary">Restaurant</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Hoteles</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Hospitales</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Turismo</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Diversion</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Cines</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Supermercados</p>
          </button>

          <button>
            <p className="py-2 px-4 hover:text-secondary">Electrodomesticos</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Ferreterias</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Cambio</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Museos</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary">Parques</p>
          </button>
          <button>
            <p className="py-2 px-4 hover:text-secondary ">Tiendas</p>
          </button>
          <button>
            <p className="py-2 px-4  hover:text-secondary">Peluquerias</p>
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
