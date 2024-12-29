import axios from "axios";

export const GET_ALL_USER = "GET_ALL_USER";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const GET_COMMENTS_BY_RESTAURANT = "GET_COMMENTS_BY_RESTAURANT";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const GET_RESTAURANTS_BY_USER = "GET_RESTAURANTS_BY_USER";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
export const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";
export const UPDATE_RESTAURANT_STATUS = "UPDATE_RESTAURANT_STATUS";
export const GET_RESTAURANTS_BY_CATEGORY = "GET_RESTAURANTS_BY_CATEGORY";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const ERROR_404 = "ERROR_404";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_LOADING = "SET_LOADING";
export const UPDATE_USER = "UPDATE_USER";

//! dev
// const endpoint = "http://localhost:3000/";

//! prod
const endpoint = "https://cochabamba-server.vercel.app/";

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

export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
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

//! Comments

export const getCommentsByRestaurant = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}comments/${id}`);
    //console.log(data);
    dispatch({
      type: GET_COMMENTS_BY_RESTAURANT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

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
