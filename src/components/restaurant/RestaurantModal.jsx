import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getCommentsByRestaurant } from "../../redux/actions";
import CarouselImages from "./Carrousel";
import Swal from "sweetalert2";

const RestaurantModal = ({ isOpen, onClose, restaurant }) => {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments);
  const id = useSelector((state) => state.id);

  if (!isOpen) return null;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCPXN8HnP527MrOKcu-3QYvHypzzG-mh2I",
    id: "google-maps-script",
  });

  const desktopMapStyle = { width: "400px", height: "200px" };
  const mobileMapStyle = {
    width: "300px",
    height: "180px",
  };

  const center = {
    lat: restaurant?.location.latitude || 0,
    lng: restaurant?.location.longitude || 0,
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (comment && stars) {
      dispatch(
        createComment({
          comments: comment,
          stars,
          restaurant_id: restaurant.id,
          user_id: id,
        })
      ).then(() => {
        dispatch(getCommentsByRestaurant(restaurant.id));
      });
      Swal.fire({
        position: "top",
        text: "Comentario registrado correctamente",
        background: "transparent",
        color: "#eff6ff",
        width: "400px",
        confirmButtonColor: "transparent",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });

      setComment("");
      setStars("");
    }
  };

  useEffect(() => {
    dispatch(getCommentsByRestaurant(restaurant.id));
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-primary text-primary bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-neutral w-[350px] md:w-[800px] lg:w-[1000px] max-h-[90vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute  top-4 right-5 text-3xl text-primary hover:text-secondary"
        >
          ✖
        </button>
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div>
            <CarouselImages images={restaurant.images} />

            {isLoaded ? (
              <div className="border border-primary shadow-black shadow-md ">
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
            <div className="text-primary text-lg space-y-1.5">
              <h1>
                Restaurant: <span className="font-bold">{restaurant.name}</span>
              </h1>
              <p>
                Pedidos:
                <a
                  href={`https://wa.me/${restaurant.codArea}${
                    restaurant.phone
                  }?text=Hola%20${encodeURIComponent(
                    restaurant.name
                  )},%20quisiera%20hacer%20un%20pedido.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <i
                    className="fa fa-whatsapp mx-2 font-bold text-secondary"
                    aria-hidden="true"
                  ></i>
                  <span className="font-bold">
                    {`${restaurant.codArea} ${restaurant.phone}`}
                  </span>
                </a>
              </p>
              <p>
                Ofertas:
                <span className="font-bold mx-2">{restaurant.offers[0]}</span>
              </p>
              <p>Zona: {restaurant.zone}</p>
              <p>
                Ciudad:
                <span className="font-bold mx-2">{restaurant.city}</span>
              </p>
              <p>
                Pais:
                <span className="font-bold mx-2">{restaurant.country}</span>
              </p>
              <p>
                Lunes a Viernes:
                <span className="text-[16px] font-bold mx-2">
                  {restaurant.time.weekdays}
                </span>
                <br />
                Sabados:
                <span className="text-[16px] font-bold mx-2">
                  {restaurant.time.weekends}
                </span>
              </p>
              <p>
                <a
                  href={restaurant.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  {restaurant.web}
                </a>
              </p>
            </div>
            <div>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  placeholder="Escribe tu comentario"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-primary p-2 rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Calificación (1-5)"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  className="w-full mt-2 border border-primary p-2 rounded-md"
                  required
                  min="1"
                  max="5"
                />
                <button
                  type="submit"
                  className="mt-4 bg-primary text-neutral px-4 py-2 rounded-md hover:text-secondary"
                >
                  Enviar comentario
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
          <div className="max-h-[150px] overflow-y-auto border border-gray-950 p-4 rounded-md text-[12px]">
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

export default RestaurantModal;
