import {
  GET_ALL_USER,
  CREATE_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_ALL_RESTAURANTS,
  GET_COMMENTS_BY_RESTAURANT,
  CREATE_COMMENT,
  CREATE_RESTAURANT,
  GET_RESTAURANTS_BY_USER,
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANT_STATUS,
  GET_RESTAURANTS_BY_CATEGORY,
  ERROR_404,
  CLEAR_ERROR,
  UPDATE_USER,
} from "./actions";

const initialState = {
  users: [],
  email: "",
  name: localStorage.getItem("name") || "",
  token: localStorage.getItem("token") || null,
  id: localStorage.getItem("id") || "",
  restaurants: [],
  restaurantsByUser: [],
  restaurantsByCategory: [],
  comments: [],
  error: null,
  totalResults: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        name: state.id === action.payload.id ? action.payload.name : state.name,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("id", action.payload.id);
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        id: action.payload.id,
        error: null,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      return {
        ...state,
        email: "",
        token: null,
        name: "",
        id: "",
      };
    case GET_ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.restaurants,
        totalResults: action.payload.totalResults,
        restaurantsByCategory: [],
        error: null,
      };
    case GET_RESTAURANTS_BY_USER:
      return {
        ...state,
        restaurantsByUser: action.payload,
      };
    case GET_RESTAURANTS_BY_CATEGORY:
      return {
        ...state,
        restaurantsByCategory: action.payload.restaurants,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ERROR_404:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
      };
    case UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };
    case UPDATE_RESTAURANT_STATUS: {
      const updatedRestaurantStatus = state.restaurants.map((restaurant) =>
        restaurant.id === action.payload.id
          ? { ...restaurant, isActive: action.payload.isActive }
          : restaurant
      );
      const updatedRestaurantsByUserStatus = state.restaurantsByUser.map(
        (restaurant) =>
          restaurant.id === action.payload.id
            ? { ...restaurant, isActive: action.payload.isActive }
            : restaurant
      );
      return {
        ...state,
        restaurants: updatedRestaurantStatus,
        restaurantsByUser: updatedRestaurantsByUserStatus,
      };
    }
    case DELETE_RESTAURANT: {
      const updatedRestaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
      const updatedRestaurantsByUser = state.restaurantsByUser.filter(
        (restaurant) => restaurant.id !== action.payload
      );

      return {
        ...state,
        restaurantsByUser: updatedRestaurantsByUser,
        restaurants: updatedRestaurants,
      };
    }
    case GET_COMMENTS_BY_RESTAURANT:
      return {
        ...state,
        comments: action.payload,
      };
    case CREATE_COMMENT: {
      const newComments = [...state.comments, action.payload];
      return {
        ...state,
        comments: newComments,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
