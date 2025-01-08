import axios from "axios";

//! USERS
export const GET_ALL_USER = "GET_ALL_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
//! LOGIN AND LOGOUT
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
//! RESTAURANTS
export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const GET_RESTAURANTS_BY_USER = "GET_RESTAURANTS_BY_USER";
export const GET_RESTAURANTS_BY_CATEGORY = "GET_RESTAURANTS_BY_CATEGORY";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";
export const UPDATE_RESTAURANT_STATUS = "UPDATE_RESTAURANT_STATUS";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
//! HOTEL
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_HOTELS_BY_USER = "GET_HOTELS_BY_USER";
export const GET_HOTELS_BY_CATEGORY = "GET_HOTELS_BY_CATEGORY";
export const CREATE_HOTEL = "CREATE_HOTEL";
export const UPDATE_HOTEL = "UPDATE_HOTEL";
export const UPDATE_HOTEL_STATUS = "UPDATE_HOTEL_STATUS";
export const DELETE_HOTEL = "DELETE_HOTEL";
//! TAXI
export const GET_ALL_TAXIS = "GET_ALL_TAXIS";
export const GET_TAXIS_BY_USER = "GET_TAXIS_BY_USER";
export const GET_TAXIS_BY_CATEGORY = "GET_TAXIS_BY_CATEGORY";
export const CREATE_TAXI = "CREATE_TAXI";
export const UPDATE_TAXI = "UPDATE_TAXI";
export const UPDATE_TAXI_STATUS = "UPDATE_TAXI_STATUS";
export const DELETE_TAXI = "DELETE_TAXI";
//! SUPERMARKET
export const GET_ALL_SUPERMARKETS = "GET_ALL_SUPERMARKETS";
export const GET_SUPERMARKETS_BY_USER = "GET_SUPERMARKETS_BY_USER";
export const GET_SUPERMARKETS_BY_CATEGORY = "GET_SUPERMARKETS_BY_CATEGORY";
export const CREATE_SUPERMARKET = "CREATE_SUPERMARKET";
export const UPDATE_SUPERMARKET = "UPDATE_SUPERMARKET";
export const UPDATE_SUPERMARKET_STATUS = "UPDATE_SUPERMARKET_STATUS";
export const DELETE_SUPERMARKET = "DELETE_SUPERMARKET";
//! GYM
export const GET_ALL_GYMS = "GET_ALL_GYMS";
export const GET_GYMS_BY_USER = "GET_GYMS_BY_USER";
export const GET_GYMS_BY_CATEGORY = "GET_GYMS_BY_CATEGORY";
export const CREATE_GYM = "CREATE_GYM";
export const UPDATE_GYM = "UPDATE_GYM";
export const UPDATE_GYM_STATUS = "UPDATE_GYM_STATUS";
export const DELETE_GYM = "DELETE_GYM";
//! TOURISM
export const GET_ALL_TOURISMS = "GET_ALL_TOURISMS";
export const GET_TOURISMS_BY_USER = "GET_TOURISMS_BY_USER";
export const GET_TOURISMS_BY_CATEGORY = "GET_TOURISMS_BY_CATEGORY";
export const CREATE_TOURISM = "CREATE_TOURISM";
export const UPDATE_TOURISM = "UPDATE_TOURISM";
export const UPDATE_TOURISM_STATUS = "UPDATE_TOURISM_STATUS";
export const DELETE_TOURISM = "DELETE_TOURISM";
//! MOVIE
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const GET_MOVIES_BY_USER = "GET_MOVIES_BY_USER";
export const CREATE_MOVIE = "CREATE_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const UPDATE_MOVIE_STATUS = "UPDATE_MOVIE_STATUS";
export const DELETE_MOVIE = "DELETE_MOVIE";
//! EMERGENCY
export const GET_ALL_EMERGENCIES = "GET_ALL_EMERGENCIES";
export const GET_EMERGENCIES_BY_USER = "GET_EMERGENCIES_BY_USER";
export const GET_EMERGENCIES_BY_CATEGORY = "GET_EMERGENCIES_BY_CATEGORY";
export const CREATE_EMERGENCY = "CREATE_EMERGENCY";
export const UPDATE_EMERGENCY = "UPDATE_EMERGENCY";
export const UPDATE_EMERGENCY_STATUS = "UPDATE_EMERGENCY_STATUS";
export const DELETE_EMERGENCY = "DELETE_EMERGENCY";
//! COMMENTS
export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS_BY_RESTAURANT = "GET_COMMENTS_BY_RESTAURANT";
export const GET_COMMENTS_BY_HOTEL = "GET_COMMENTS_BY_HOTEL";
export const GET_COMMENTS_BY_TAXI = "GET_COMMENTS_BY_TAXI";
export const GET_COMMENTS_BY_SUPERMARKET = "GET_COMMENTS_BY_SUPERMARKET";
export const GET_COMMENTS_BY_GYM = "GET_COMMENTS_BY_GYM";
export const GET_COMMENTS_BY_TOURISM = "GET_COMMENTS_BY_TOURISM";
export const GET_COMMENTS_BY_MOVIE = "GET_COMMENTS_BY_MOVIE";
export const GET_COMMENTS_BY_EMERGENCY = "GET_COMMENTS_BY_EMERGENCY";

//! ERROR
export const ERROR_404 = "ERROR_404";
export const CLEAR_ERROR = "CLEAR_ERROR";

//! ENDPOINT
const API_URL = import.meta.env.VITE_API_URL;

//! dev
// const endpoint = "http://localhost:3000/";

//! prod
const endpoint = API_URL;

//! users
export const getUsers = () => async (dispatch) => {
  const { data } = await axios.get(`${endpoint}users`);
  try {
    dispatch({
      type: GET_ALL_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${endpoint}users`, user);

    dispatch({
      type: CREATE_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${endpoint}users/${id}`, user);

    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

//! login and logout
export const loginByEmail = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${endpoint}login`, user);
    //console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    if (error.response.status === 401) {
      dispatch({
        type: ERROR_404,
        payload: "Restaurantes no encontrados",
      });
    }
  }
};

export const loginByGoogle = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}google`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    //console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
  }
};

//! Restaurants
export const getAllRestaurants =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}restaurants?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_RESTAURANTS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getRestaurantsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}restaurants/${id}`);
    //console.log(data);

    dispatch({
      type: GET_RESTAURANTS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantsByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}restaurants/categories?${query}&page=${page}&limit=${limit}`
      );

      //console.log(data);
      dispatch({
        type: GET_RESTAURANTS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Restaurantes no encontrados",
        });
      }
    }
  };

export const createRestaurant =
  (restaurant, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", restaurant.name);
      formData.append("location", JSON.stringify(restaurant.location));
      formData.append("offers", JSON.stringify(restaurant.offers));
      formData.append("codArea", restaurant.codArea);
      formData.append("phone", restaurant.phone);
      formData.append("city", restaurant.city);
      formData.append("country", restaurant.country);
      formData.append("web", restaurant.web);
      formData.append("time", JSON.stringify(restaurant.time));
      formData.append("zone", restaurant.zone);
      formData.append("categories", JSON.stringify(restaurant.categories));
      formData.append("user_id", userId);

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });

      const { data } = await axios.post(`${endpoint}restaurants`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log(data);
      dispatch({
        type: CREATE_RESTAURANT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateRestaurant =
  (restaurantId, restaurant, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", restaurant.name);
      formData.append("location", JSON.stringify(restaurant.location));
      formData.append("offers", JSON.stringify(restaurant.offers));
      formData.append("codArea", restaurant.codArea);
      formData.append("phone", restaurant.phone);
      formData.append("city", restaurant.city);
      formData.append("country", restaurant.country);
      formData.append("web", restaurant.web);
      formData.append("time", JSON.stringify(restaurant.time));
      formData.append("zone", restaurant.zone);
      formData.append("categories", JSON.stringify(restaurant.categories));
      formData.append("user_id", userId);

      console.log(restaurant.images);

      restaurant.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}restaurants/${restaurantId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_RESTAURANT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActive = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}restaurants/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_RESTAURANT_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRestaurant = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}restaurants/${id}`);
    dispatch({
      type: DELETE_RESTAURANT,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

//! Hotels

export const getAllHotels =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}hotels?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getHotelsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}hotels/${id}`);
    //console.log(data);

    dispatch({
      type: GET_HOTELS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getHotelsByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}hotels/categories?${query}&page=${page}&limit=${limit}`
      );

      //console.log(data);
      dispatch({
        type: GET_HOTELS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Hoteles no encontrados",
        });
      }
    }
  };

export const createHotel = (hotel, images, userId) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", hotel.name);
    formData.append("location", JSON.stringify(hotel.location));
    formData.append("offers", JSON.stringify(hotel.offers));
    formData.append("codArea", hotel.codArea);
    formData.append("phone", hotel.phone);
    formData.append("city", hotel.city);
    formData.append("country", hotel.country);
    formData.append("web", hotel.web);
    formData.append("time", JSON.stringify(hotel.time));
    formData.append("zone", hotel.zone);
    formData.append("categories", JSON.stringify(hotel.categories));
    formData.append("user_id", userId);

    images.forEach((image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        formData.append("images", image.file);
      } else {
        console.error("No es un archivo válido:", image);
      }
    });

    const { data } = await axios.post(`${endpoint}hotels`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log(data);
    dispatch({
      type: CREATE_HOTEL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateHotel =
  (hotelId, hotel, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", hotel.name);
      formData.append("location", JSON.stringify(hotel.location));
      formData.append("offers", JSON.stringify(hotel.offers));
      formData.append("codArea", hotel.codArea);
      formData.append("phone", hotel.phone);
      formData.append("city", hotel.city);
      formData.append("country", hotel.country);
      formData.append("web", hotel.web);
      formData.append("time", JSON.stringify(hotel.time));
      formData.append("zone", hotel.zone);
      formData.append("categories", JSON.stringify(hotel.categories));
      formData.append("user_id", userId);

      console.log(hotel.images);

      hotel.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}hotels/${hotelId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_HOTEL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveHotel = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}hotels/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_HOTEL_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteHotel = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}hotels/${id}`);
    dispatch({
      type: DELETE_HOTEL,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

//! Taxi
export const getAllTaxis =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}taxis?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_TAXIS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getTaxisByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}taxis/${id}`);
    //console.log(data);

    dispatch({
      type: GET_TAXIS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getTaxisByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}taxis/categories?${query}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_TAXIS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Transporte no encontrado",
        });
      }
    }
  };

export const createTaxi = (taxi, images, userId) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", taxi.name);
    formData.append("location", JSON.stringify(taxi.location));
    formData.append("offers", JSON.stringify(taxi.offers));
    formData.append("codArea", taxi.codArea);
    formData.append("phone", taxi.phone);
    formData.append("city", taxi.city);
    formData.append("country", taxi.country);
    formData.append("web", taxi.web);
    formData.append("time", JSON.stringify(taxi.time));
    formData.append("zone", taxi.zone);
    formData.append("categories", JSON.stringify(taxi.categories));
    formData.append("user_id", userId);

    images.forEach((image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        formData.append("images", image.file);
      } else {
        console.error("No es un archivo válido:", image);
      }
    });

    const { data } = await axios.post(`${endpoint}taxis`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log(data);
    dispatch({
      type: CREATE_TAXI,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTaxi =
  (taxiId, taxi, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", taxi.name);
      formData.append("location", JSON.stringify(taxi.location));
      formData.append("offers", JSON.stringify(taxi.offers));
      formData.append("codArea", taxi.codArea);
      formData.append("phone", taxi.phone);
      formData.append("city", taxi.city);
      formData.append("country", taxi.country);
      formData.append("web", taxi.web);
      formData.append("time", JSON.stringify(taxi.time));
      formData.append("zone", taxi.zone);
      formData.append("categories", JSON.stringify(taxi.categories));
      formData.append("user_id", userId);

      //console.log(taxi.images);

      taxi.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(`${endpoint}taxis/${taxiId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log("data", data);
      dispatch({
        type: UPDATE_TAXI,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveTaxi = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}taxis/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_TAXI_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaxi = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}taxis/${id}`);
    dispatch({
      type: DELETE_TAXI,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

//! Supermarket
export const getAllSupermarkets =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}supermarkets?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_SUPERMARKETS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getSupermarketsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}supermarkets/${id}`);
    //console.log(data);

    dispatch({
      type: GET_SUPERMARKETS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSupermarketsByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}supermarkets/categories?${query}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_SUPERMARKETS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Supermercados no encontrados",
        });
      }
    }
  };

export const createSupermarket =
  (supermarket, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", supermarket.name);
      formData.append("location", JSON.stringify(supermarket.location));
      formData.append("offers", JSON.stringify(supermarket.offers));
      formData.append("codArea", supermarket.codArea);
      formData.append("phone", supermarket.phone);
      formData.append("city", supermarket.city);
      formData.append("country", supermarket.country);
      formData.append("web", supermarket.web);
      formData.append("time", JSON.stringify(supermarket.time));
      formData.append("zone", supermarket.zone);
      formData.append("categories", JSON.stringify(supermarket.categories));
      formData.append("user_id", userId);

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });

      const { data } = await axios.post(`${endpoint}supermarkets`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log(data);
      dispatch({
        type: CREATE_SUPERMARKET,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateSupermarket =
  (supermarketId, supermarket, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", supermarket.name);
      formData.append("location", JSON.stringify(supermarket.location));
      formData.append("offers", JSON.stringify(supermarket.offers));
      formData.append("codArea", supermarket.codArea);
      formData.append("phone", supermarket.phone);
      formData.append("city", supermarket.city);
      formData.append("country", supermarket.country);
      formData.append("web", supermarket.web);
      formData.append("time", JSON.stringify(supermarket.time));
      formData.append("zone", supermarket.zone);
      formData.append("categories", JSON.stringify(supermarket.categories));
      formData.append("user_id", userId);

      supermarket.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}supermarkets/${supermarketId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_SUPERMARKET,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveSupermarket = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${endpoint}supermarkets/isActive/${id}`
    );
    //console.log("data", data);
    dispatch({
      type: UPDATE_SUPERMARKET_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSupermarket = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}supermarkets/${id}`);
    dispatch({
      type: DELETE_SUPERMARKET,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};
//! Gym
export const getAllGyms =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}gyms?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_GYMS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getGymsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}gyms/${id}`);
    //console.log(data);

    dispatch({
      type: GET_GYMS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getGymsByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}gyms/categories?${query}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_GYMS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Deportes no encontrados",
        });
      }
    }
  };

export const createGym = (gym, images, userId) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", gym.name);
    formData.append("location", JSON.stringify(gym.location));
    formData.append("offers", JSON.stringify(gym.offers));
    formData.append("codArea", gym.codArea);
    formData.append("phone", gym.phone);
    formData.append("city", gym.city);
    formData.append("country", gym.country);
    formData.append("web", gym.web);
    formData.append("time", JSON.stringify(gym.time));
    formData.append("zone", gym.zone);
    formData.append("categories", JSON.stringify(gym.categories));
    formData.append("user_id", userId);

    images.forEach((image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        formData.append("images", image.file);
      } else {
        console.error("No es un archivo válido:", image);
      }
    });

    const { data } = await axios.post(`${endpoint}gyms`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log(data);
    dispatch({
      type: CREATE_GYM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateGym = (gymId, gym, images, userId) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", gym.name);
    formData.append("location", JSON.stringify(gym.location));
    formData.append("offers", JSON.stringify(gym.offers));
    formData.append("codArea", gym.codArea);
    formData.append("phone", gym.phone);
    formData.append("city", gym.city);
    formData.append("country", gym.country);
    formData.append("web", gym.web);
    formData.append("time", JSON.stringify(gym.time));
    formData.append("zone", gym.zone);
    formData.append("categories", JSON.stringify(gym.categories));
    formData.append("user_id", userId);

    gym.images.forEach((image) => {
      if (typeof image === "string") {
        formData.append("existingImages", image);
      }
    });

    images.forEach((image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        formData.append("images", image.file);
      } else {
        console.error("No es un archivo válido:", image);
      }
    });
    for (let pair of formData.entries()) {
      console.log("data", pair[0] + ": " + pair[1]);
    }

    const { data } = await axios.put(`${endpoint}gyms/${gymId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log("data", data);
    dispatch({
      type: UPDATE_GYM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateIsActiveGym = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}gyms/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_GYM_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGym = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}gyms/${id}`);
    dispatch({
      type: DELETE_GYM,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};
//! Tourism
export const getAllTourisms =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}tourisms?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_TOURISMS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getTourismsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}tourisms/${id}`);

    dispatch({
      type: GET_TOURISMS_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getTourismsByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}tourisms/categories?${query}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_TOURISMS_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Deportes no encontrados",
        });
      }
    }
  };

export const createTourism = (tourism, images, userId) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", tourism.name);
    formData.append("location", JSON.stringify(tourism.location));
    formData.append("offers", JSON.stringify(tourism.offers));
    formData.append("codArea", tourism.codArea);
    formData.append("phone", tourism.phone);
    formData.append("city", tourism.city);
    formData.append("country", tourism.country);
    formData.append("web", tourism.web);
    formData.append("time", JSON.stringify(tourism.time));
    formData.append("zone", tourism.zone);
    formData.append("categories", JSON.stringify(tourism.categories));
    formData.append("user_id", userId);

    images.forEach((image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        formData.append("images", image.file);
      } else {
        console.error("No es un archivo válido:", image);
      }
    });

    const { data } = await axios.post(`${endpoint}tourisms`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log(data);
    dispatch({
      type: CREATE_TOURISM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTourism =
  (tourismId, tourism, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", tourism.name);
      formData.append("location", JSON.stringify(tourism.location));
      formData.append("offers", JSON.stringify(tourism.offers));
      formData.append("codArea", tourism.codArea);
      formData.append("phone", tourism.phone);
      formData.append("city", tourism.city);
      formData.append("country", tourism.country);
      formData.append("web", tourism.web);
      formData.append("time", JSON.stringify(tourism.time));
      formData.append("zone", tourism.zone);
      formData.append("categories", JSON.stringify(tourism.categories));
      formData.append("user_id", userId);

      tourism.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}tourisms/${tourismId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_TOURISM,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveTourism = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}tourisms/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_TOURISM_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTourism = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}tourisms/${id}`);
    dispatch({
      type: DELETE_TOURISM,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};
//! MovieTheater
export const getAllMovieTheaters =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}movieTheaters?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_MOVIES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getMovieTheatersByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}movieTheaters/${id}`);
    //console.log(data);

    dispatch({
      type: GET_MOVIES_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createMovieTheater =
  (movieTheater, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", movieTheater.name);
      formData.append("location", JSON.stringify(movieTheater.location));
      formData.append("offers", JSON.stringify(movieTheater.offers));
      formData.append("codArea", movieTheater.codArea);
      formData.append("phone", movieTheater.phone);
      formData.append("city", movieTheater.city);
      formData.append("country", movieTheater.country);
      formData.append("web", movieTheater.web);
      formData.append("time", JSON.stringify(movieTheater.time));
      formData.append("zone", movieTheater.zone);
      formData.append("user_id", userId);

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });

      const { data } = await axios.post(`${endpoint}movieTheaters`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log(data);
      dispatch({
        type: CREATE_MOVIE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateMovieTheater =
  (movieTheaterId, movieTheater, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", movieTheater.name);
      formData.append("location", JSON.stringify(movieTheater.location));
      formData.append("offers", JSON.stringify(movieTheater.offers));
      formData.append("codArea", movieTheater.codArea);
      formData.append("phone", movieTheater.phone);
      formData.append("city", movieTheater.city);
      formData.append("country", movieTheater.country);
      formData.append("web", movieTheater.web);
      formData.append("time", JSON.stringify(movieTheater.time));
      formData.append("zone", movieTheater.zone);
      formData.append("user_id", userId);

      movieTheater.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}movieTheaters/${movieTheaterId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_MOVIE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveMovieTheater = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${endpoint}movieTheaters/isActive/${id}`
    );
    //console.log("data", data);
    dispatch({
      type: UPDATE_MOVIE_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovieTheater = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}movieTheaters/${id}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};
//! Emergency
export const getAllEmergencies =
  (search = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}emergencies?search=${search}&page=${page}&limit=${limit}`
      );
      //console.log(data);
      dispatch({
        type: GET_ALL_EMERGENCIES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getEmergenciesByUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}emergencies/${id}`);

    dispatch({
      type: GET_EMERGENCIES_BY_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getEmergenciesByCategory =
  (categories, page, limit) => async (dispatch) => {
    try {
      const query = categories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      const { data } = await axios.get(
        `${endpoint}emergencies/categories?${query}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_EMERGENCIES_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: ERROR_404,
          payload: "Emergencias no encontrados",
        });
      }
    }
  };

export const createEmergency =
  (emergency, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", emergency.name);
      formData.append("location", JSON.stringify(emergency.location));
      formData.append("offers", JSON.stringify(emergency.offers));
      formData.append("codArea", emergency.codArea);
      formData.append("phone", emergency.phone);
      formData.append("city", emergency.city);
      formData.append("country", emergency.country);
      formData.append("web", emergency.web);
      formData.append("time", JSON.stringify(emergency.time));
      formData.append("zone", emergency.zone);
      formData.append("categories", JSON.stringify(emergency.categories));
      formData.append("user_id", userId);

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });

      const { data } = await axios.post(`${endpoint}emergencies`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log(data);
      dispatch({
        type: CREATE_EMERGENCY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateEmergency =
  (emergencyId, emergency, images, userId) => async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("name", emergency.name);
      formData.append("location", JSON.stringify(emergency.location));
      formData.append("offers", JSON.stringify(emergency.offers));
      formData.append("codArea", emergency.codArea);
      formData.append("phone", emergency.phone);
      formData.append("city", emergency.city);
      formData.append("country", emergency.country);
      formData.append("web", emergency.web);
      formData.append("time", JSON.stringify(emergency.time));
      formData.append("zone", emergency.zone);
      formData.append("categories", JSON.stringify(emergency.categories));
      formData.append("user_id", userId);

      emergency.images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      images.forEach((image) => {
        if (image.file instanceof File || image.file instanceof Blob) {
          formData.append("images", image.file);
        } else {
          console.error("No es un archivo válido:", image);
        }
      });
      for (let pair of formData.entries()) {
        console.log("data", pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.put(
        `${endpoint}tourisms/${emergencyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("data", data);
      dispatch({
        type: UPDATE_EMERGENCY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateIsActiveEmergency = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${endpoint}emergencies/isActive/${id}`);
    //console.log("data", data);
    dispatch({
      type: UPDATE_EMERGENCY_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmergency = (id) => async (dispatch) => {
  try {
    await axios.delete(`${endpoint}emergencies/${id}`);
    dispatch({
      type: DELETE_EMERGENCY,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

//! Comments
export const createComment = (comment) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${endpoint}comments`, comment);
    //console.log(data);
    dispatch({
      type: CREATE_COMMENT,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsByRestaurant = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/restaurant/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_RESTAURANT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByHotel = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/hotel/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_HOTEL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByTaxi = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/taxi/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_TAXI,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsBySupermarket = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/supermarket/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_SUPERMARKET,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByGym = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/gym/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_GYM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByTourism = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/tourism/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_TOURISM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByMovieTheater = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/movieTheater/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_MOVIE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByEmergency = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/emergency/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_EMERGENCY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

//! Error
export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
};
