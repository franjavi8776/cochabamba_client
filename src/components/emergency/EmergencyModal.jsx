import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getCommentsByEmergency } from "../../redux/actions";
import CarouselImages from "../carousel/Carrousel";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const EmergencyModal = ({ isOpen, onClose, emergency }) => {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByEmergency(emergency.id));
  }, [dispatch,emergency.id]);

  const comments = useSelector((state) => state.comments);
  const id = useSelector((state) => state.id);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    id: "google-maps-script",
  });

  if (!isOpen) return null;

  const desktopMapStyle = { width: "400px", height: "200px" };
  const mobileMapStyle = {
    width: "270px",
    height: "200px",
  };

  const center = {
    lat: emergency?.location.latitude || 0,
    lng: emergency?.location.longitude || 0,
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (comment && stars) {
      dispatch(
        createComment({
          comments: comment,
          stars,
          emergency_id: emergency.id,
          user_id: id,
        })
      ).then(() => {
        dispatch(getCommentsByEmergency(emergency.id));
      });
      Swal.fire({
        position: "top",
        title: "Comentario registrado!",
        background: "black",
        color: "#eff6ff",
        width: "230px",
        confirmButtonColor: "transparent",
        customClass: {
          title: "text-xs md:text-lg",
          confirmButton: "custom-confirm-button text-xs md:text-lg",
        },
      });

      setComment("");
      setStars("");
    }
  };

  return (
    <div className="fixed inset-0 bg-primary dark:bg-neutral text-primary  dark:text-neutral bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-neutral dark:bg-primary w-[320px] md:w-[800px] lg:w-[1000px] max-h-[90vh] p-6 rounded-lg shadow-lg relative overflow-y-auto border border-primary dark:border-secondary">
        <button
          onClick={onClose}
          className="absolute  top-4 right-5 text-3xl  hover:text-secondary"
        >
          ✖
        </button>
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div>
            <CarouselImages images={emergency.images} />

            {isLoaded ? (
              <div className="border border-primary dark:border-secondary">
                <GoogleMap
                  mapContainerStyle={
                    window.innerWidth <= 768 ? mobileMapStyle : desktopMapStyle
                  }
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </div>
            ) : (
              <p>Cargando mapa...</p>
            )}
          </div>
          <div>
            <div className="text-sm md:text-lg space-y-1 md:space-y-1.5">
              <h1>
                <small className="text-accent">Nombre:</small>{" "}
                <span>{emergency.name}</span>
              </h1>
              <p>
                <small className="text-accent">Pedidos:</small>
                <a
                  href={`https://wa.me/${emergency.codArea}${emergency.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <i
                    className="fa fa-whatsapp mx-2 font-bold text-secondary"
                    aria-hidden="true"
                  ></i>
                  <span>{`${emergency.codArea} ${emergency.phone}`}</span>
                </a>
              </p>
              <p>
                <small className="text-accent">Ofertas:</small>
                <span className="mx-2">{emergency.offers[0]}</span>
              </p>
              <p>
                <small className="text-accent">Zona:</small> {emergency.zone}
              </p>
              <p>
                <small className="text-accent">Ciudad:</small>
                <span className="mx-2">{emergency.city}</span>
              </p>
              <p>
                <small className="text-accent">Pais:</small>
                <span className="mx-2">{emergency.country}</span>
              </p>
              <p>
                <small className="text-accent">Lun-Vie:</small>
                <span className=" mx-2">{emergency.time.weekdays}</span>
                <br />
                <small className="text-accent">Sab-Dom:</small>
                <span className=" mx-2">{emergency.time.weekends}</span>
              </p>
              <p>
                <small className="text-accent">Web: </small>
                <a
                  href={emergency.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  {emergency.web}
                </a>
              </p>
            </div>
            <div>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  placeholder="Escribe tu comentario"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border text-primary border-primary dark:border-secondary p-2 rounded-md text-xs md:text-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Calificación (1-5)"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  className="w-full mt-2 text-primary border border-primary dark:border-secondary p-2 rounded-md text-xs md:text-lg"
                  required
                  min="1"
                  max="5"
                />
                <button
                  type="submit"
                  className="mt-4 bg-primary dark:bg-neutral text-neutral dark:text-primary px-4 py-2 rounded-md text-xs md:text-lg hover:text-secondary dark:hover:text-secondary border border-primary dark:border-secondary"
                >
                  Enviar comentario
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <h2 className="text-lg md:text-2xl font-bold mb-4">Comentarios</h2>
          <div className="max-h-[150px] overflow-y-auto border border-primary dark:border-secondary p-4 rounded-md text-[12px]">
            {comments.length > 0 &&
              comments.map((c) => (
                <div key={c.id}>
                  <p>
                    <span className="font-bold mr-3">{c.userName}</span>{" "}
                    {c.comments}
                  </p>
                  <span className="font-bold">⭐ {c.stars}</span>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

EmergencyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    codArea: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(PropTypes.string).isRequired,
    zone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    time: PropTypes.shape({
      weekdays: PropTypes.string.isRequired,
      weekends: PropTypes.string.isRequired,
    }).isRequired,
    web: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmergencyModal;
