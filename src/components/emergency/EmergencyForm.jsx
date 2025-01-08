import GoogleMap from "../googleMap/GoogleMap";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { createEmergency, updateEmergency } from "../../redux/actions";
import { useNavigate, useLocation } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";

const EmergencyForm = () => {
  const location = useLocation();
  const { emergencyState } = location.state || {};

  const [images, setImages] = useState([]);
  const [offerInput, setOfferInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [emergency, setEmergency] = useState({
    id: emergencyState?.id || null,
    name: emergencyState?.name || "",
    location: emergencyState?.location || {
      latitude: "",
      longitude: "",
    },
    images: emergencyState?.images
      ? emergencyState.images.map((image) =>
          typeof image === "string" ? { file: null, preview: image } : image
        )
      : [],
    offers: emergencyState?.offers || [],
    codArea: emergencyState?.codArea || "591",
    phone: emergencyState?.phone || "",
    city: emergencyState?.city || "",
    country: emergencyState?.country || "",
    web: emergencyState?.web || "",
    time: emergencyState?.time || {
      weekdays: "",
      weekends: "",
    },
    zone: emergencyState?.zone || "Central",
    categories: emergencyState?.categories || [],
    isActive: emergencyState?.isActive || true,
    user_id: emergencyState?.user_id || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.id);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    id: "google-maps-script",
  });

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergency({
      ...emergency,
      [name]: value,
    });
  };

  const handleAddOffer = () => {
    if (offerInput.trim() === "") return;
    setEmergency((prevState) => ({
      ...prevState,
      offers: [...prevState.offers, offerInput],
    }));
    setOfferInput("");
  };

  const handleRemoveOffer = (index) => {
    setEmergency((prevState) => {
      const updatedOffers = [...prevState.offers];
      updatedOffers.splice(index, 1);
      return { ...prevState, offers: updatedOffers };
    });
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() === "") return;
    setEmergency((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, categoryInput],
    }));
    setCategoryInput("");
  };

  const handleRemoveCategory = (index) => {
    setEmergency((prevState) => {
      const updatedCategories = [...prevState.categories];
      updatedCategories.splice(index, 1);
      return { ...prevState, categories: updatedCategories };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (emergency.images.length + files.length > 10) {
      alert("Solo puedes subir un máximo de 10 fotos.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);

    setEmergency((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setEmergency((prevState) => {
      const updatedImages = [...prevState.images];
      updatedImages.splice(index, 1);
      return { ...prevState, images: updatedImages };
    });
  };

  const cleanForm = () => {
    images.forEach((image) => URL.revokeObjectURL(image.preview));
    setImages([]);
    setEmergency({
      name: "",
      location: {
        latitude: "",
        longitude: "",
      },
      images: [],
      offers: [],
      codArea: "",
      phone: "",
      city: "",
      country: "",
      web: "",
      time: {
        weekdays: "",
        weekends: "",
      },
      zone: "Central",
      categories: [],
      isActive: true,
      user_id: "",
    });
  };

  const categoryOptions = [
    "Todos",
    "Bomberos",
    "Policia",
    "Hospitales",
    "SAR Bolivia",
    "Defensa Civil",
    "Cruz Roja",
    "Compañia de Servicios",
    "Ambulancias",
    "Farmacias",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingImages = emergency.images
      .filter((img) => !img.file)
      .map((img) => img.preview || img); // Filtra solo URLs

    const newImages = emergency.images.filter((img) => img.file);

    if (emergency.id) {
      dispatch(
        updateEmergency(
          emergency.id,
          { ...emergency, images: existingImages },
          newImages,
          id
        )
      );
      Swal.fire({
        position: "top",
        title: "Actualizado correctamente",
        icon: "success",
        color: "#f0f8ff",
        background: "black",
        showConfirmButton: false,
        width: "230px",
        timer: 1000,
        customClass: {
          title: "text-xs md:text-sm",
        },
      });
    } else {
      dispatch(createEmergency(emergency, newImages, id));
      Swal.fire({
        position: "top",
        title: "Registro Exitoso",
        icon: "success",
        color: "#f0f8ff",
        background: "black",
        showConfirmButton: false,
        width: "230px",
        timer: 1000,
        customClass: {
          title: "text-xs md:text-sm",
        },
      });
    }

    cleanForm();
    navigate("/emergency");
  };

  const handleCodArea = (value) => {
    setEmergency({
      ...emergency,
      codArea: value,
    });
  };

  const handleLocationChange = (newLocation) => {
    setEmergency((prevState) => ({
      ...prevState,
      location: newLocation,
    }));
  };

  return (
    <div className="min-h-[100vh] bg-neutral dark:bg-primary text-primary text-sm  md:text-xl flex flex-col">
      <Navbar nameCategory="" />
      <div className="m-auto mb-20">
        <form
          onSubmit={handleSubmit}
          className="w-[320px] md:w-[700px] lg:w-[900px] min-h-[700px] p-5 bg-neutral border border-secondary first-line:rounded-xl rounded-lg"
        >
          <h1 className="m-8 text-sm md:text-3xl text-center">
            Registro de Emergencias
          </h1>
          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[25%] p-1">Nombre:</label>
            <input
              autoComplete="off"
              name="name"
              value={emergency.name}
              onChange={handleChange}
              className="w-[75%] rounded-md p-1  border border-primary"
              type="text"
              id="name"
              required
            />
          </div>
          <label className="text-xs md:text-lg">
            Escoje tu direccion en el mapa:
          </label>
          <div className="w-[100%] h-[200px] mt-[10px]">
            {isLoaded ? (
              <GoogleMap
                location={{
                  latitude: String(emergency.location.latitude),
                  longitude: String(emergency.location.longitude),
                }}
                onLocationChange={handleLocationChange}
              />
            ) : (
              <div>Cargando mapa...</div>
            )}
          </div>
          <div className="w-[100%] flex flex-col md:flex-row mb-3 mt-3">
            <div className="w-[100%] md:w-[35%] flex mb-3 md:mb-0 text-xs md:text-lg">
              <label className="w-[60%] p-1">Codigo:</label>
              <PhoneInput
                country={"bo"}
                autoComplete="off"
                id="codArea"
                name="codArea"
                value={emergency.codArea}
                onChange={handleCodArea}
                type="text"
                className="w-[40%] rounded-md border border-black"
                inputStyle={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                  fontFamily: "'WinterTrendy', sans-serif",
                  fontSize: "16px",
                }}
                buttonStyle={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "blue",
                }}
                required
              />
            </div>
            <div className="w-[100%] md:w-[65%] flex text-xs md:text-lg">
              <label className="w-[35%]  md:ml-5 p-1">Whatsapp: </label>
              <input
                autoComplete="off"
                id="phone"
                name="phone"
                value={emergency.phone}
                onChange={handleChange}
                className="w-[65%] rounded-md p-1  border border-black"
                type="text"
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row mb-3">
            <div className="w-[100%] flex text-xs md:text-lg">
              <label className="w-[30%] p-1">Ciudad: </label>
              <input
                autoComplete="off"
                id="city"
                name="city"
                value={emergency.city}
                onChange={handleChange}
                className="w-[70%] rounded-md p-1  border border-black"
                type="text"
                required
              />
            </div>
            <div className="w-[100%] flex mt-3 md:mt-0 text-xs md:text-lg">
              <label className="w-[21%] md:ml-5 p-1">Pais:</label>
              <input
                autoComplete="off"
                id="country"
                name="country"
                value={emergency.country}
                onChange={handleChange}
                className="w-[79%] rounded-md p-1  border border-black"
                type="text"
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[30%] p-1">Sitio Web:</label>
            <input
              autoComplete="off"
              id="web"
              name="web"
              value={emergency.web}
              onChange={handleChange}
              className="w-[70%] rounded-md p-1  border border-black"
              type="url"
              placeholder="https://example.com"
            />
          </div>
          <div className="w-[100%] flex flex-col mb-3 text-xs md:text-lg">
            <div className="w-[100%] flex mb-3 ">
              <label className="w-[25%] p-1">Lun-Vie: </label>
              <input
                autoComplete="off"
                id="time-weekdays"
                name="time-weekdays"
                value={emergency.time.weekdays}
                onChange={(e) =>
                  setEmergency({
                    ...emergency,
                    time: { ...emergency.time, weekdays: e.target.value },
                  })
                }
                className="w-[75%] rounded-md p-1  border border-black"
                type="text"
                placeholder="9:00AM-2:00PM y 6:00PM-11:00PM"
              />
            </div>
            <div className="w-[100%] flex">
              <label className="w-[25%] p-1">Sab-Dom:</label>
              <input
                autoComplete="off"
                id="time-weekends"
                name="time-weekends"
                value={emergency.time.weekends}
                onChange={(e) =>
                  setEmergency({
                    ...emergency,
                    time: { ...emergency.time, weekends: e.target.value },
                  })
                }
                className="w-[75%] rounded-md p-1  border border-black"
                type="text"
                placeholder="9:00AM-2:00PM y 6:00PM-11:00PM"
              />
            </div>
          </div>
          <div className="w-[100%] flex mb-3 text-xs md:text-lg">
            <label className="w-[20%] p-1">Zona:</label>
            <select
              id="zone"
              name="zone"
              value={emergency.zone}
              onChange={handleChange}
              className="w-[80%] rounded-md p-1  border border-black"
            >
              <option value="Central">Centro</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
            </select>
          </div>
          <div className="w-[100%] flex justify-between mb-3 text-xs md:text-lg">
            <label className="w-[30%] pt-2 md:pt-0">Categorías:</label>
            <div className="w-[70%]">
              <select
                id="category"
                name="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="w-[74%] md:w-[87.5%] lg:w-[90%] py-2 rounded border border-primary"
              >
                <option value="" selected disabled>
                  Elije una o varias
                </option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddCategory}
                className="ml-2 px-4 py-2 bg-primary text-secondary rounded"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="w-[100%] mb-3 text-xs md:text-lg">
            <ul className="bg-secondary">
              {emergency.categories.map((category, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                    className=" px-4 py-2 bg-primary text-accent rounded"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-[100%] mb-3 text-xs md:text-lg">
            <label className="w-[22%] pt-2 md:pt-0">Ofertas:</label>
            <div className="flex items-center w-[78%] ">
              <input
                type="text"
                value={offerInput}
                onChange={(e) => setOfferInput(e.target.value)}
                placeholder="Ingresa tus ofertas"
                className="w-[91%] p-1 rounded  border border-black"
              />
              <button
                type="button"
                onClick={handleAddOffer}
                className="ml-2 px-4 py-2 bg-primary text-secondary rounded"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="w-[100%] text-xs md:text-lg">
            <ul className="bg-secondary">
              {emergency.offers.map((offer, index) => (
                <li key={index} className="flex justify-between w-[100%] mb-1">
                  <p className="">{offer}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveOffer(index)}
                    className="px-4 py-2 bg-primary text-accent rounded"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-22 flex items-center ">
            <div className="w-[40%] md:w-[20%] flex text-xs md:text-lg">
              <div className="file-input mt-3 ">
                <label htmlFor="file-upload" className="custom-file-upload">
                  Agregar Imagenes
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="w-[60%] md:w-[80%] flex flex-wrap gap-4 pl-10">
              {emergency.images.map((image, index) => (
                <div key={index} className="relative w-28 h-28">
                  <img
                    src={image.preview || image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md border border-primary"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-primary text-neutral hover:text-accent font-bold text-sm px-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 text-xs md:text-lg">
            <button
              className=" px-4 py-2 bg-primary rounded-md text-neutral border border-secondary hover:text-secondary"
              type="submit"
            >
              {emergencyState?.id ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmergencyForm;
