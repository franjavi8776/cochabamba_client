import {
  //! User
  GET_ALL_USER,
  CREATE_USER,
  UPDATE_USER,
  //! Login and logout
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  //! Restaurant
  GET_ALL_RESTAURANTS,
  GET_RESTAURANTS_BY_USER,
  GET_RESTAURANTS_BY_CATEGORY,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANT_STATUS,
  DELETE_RESTAURANT,
  //! Hotel
  GET_ALL_HOTELS,
  GET_HOTELS_BY_USER,
  GET_HOTELS_BY_CATEGORY,
  CREATE_HOTEL,
  UPDATE_HOTEL,
  UPDATE_HOTEL_STATUS,
  DELETE_HOTEL,
  //! Taxi
  ERROR_404,
  CLEAR_ERROR,
  GET_ALL_TAXIS,
  GET_TAXIS_BY_USER,
  GET_TAXIS_BY_CATEGORY,
  CREATE_TAXI,
  UPDATE_TAXI,
  UPDATE_TAXI_STATUS,
  DELETE_TAXI,
  //! Supermarket
  GET_ALL_SUPERMARKETS,
  GET_SUPERMARKETS_BY_USER,
  GET_SUPERMARKETS_BY_CATEGORY,
  CREATE_SUPERMARKET,
  UPDATE_SUPERMARKET,
  UPDATE_SUPERMARKET_STATUS,
  DELETE_SUPERMARKET,
  //! Gym
  GET_ALL_GYMS,
  GET_GYMS_BY_USER,
  GET_GYMS_BY_CATEGORY,
  CREATE_GYM,
  UPDATE_GYM,
  UPDATE_GYM_STATUS,
  DELETE_GYM,
  //! Tourism
  GET_ALL_TOURISMS,
  GET_TOURISMS_BY_USER,
  GET_TOURISMS_BY_CATEGORY,
  CREATE_TOURISM,
  UPDATE_TOURISM,
  UPDATE_TOURISM_STATUS,
  DELETE_TOURISM,
  //! Movie
  GET_ALL_MOVIES,
  GET_MOVIES_BY_USER,
  CREATE_MOVIE,
  UPDATE_MOVIE,
  UPDATE_MOVIE_STATUS,
  DELETE_MOVIE,
  //! Comment
  CREATE_COMMENT,
  GET_COMMENTS_BY_RESTAURANT,
  GET_COMMENTS_BY_TAXI,
  GET_COMMENTS_BY_HOTEL,
  GET_COMMENTS_BY_SUPERMARKET,
  GET_COMMENTS_BY_GYM,
  GET_COMMENTS_BY_TOURISM,
  GET_COMMENTS_BY_MOVIE,
  GET_ALL_EMERGENCIES,
  GET_EMERGENCIES_BY_USER,
  GET_EMERGENCIES_BY_CATEGORY,
  CREATE_EMERGENCY,
  UPDATE_EMERGENCY,
  UPDATE_EMERGENCY_STATUS,
  DELETE_EMERGENCY,
  GET_COMMENTS_BY_EMERGENCY,

  //! Error
} from "./actions";

const initialState = {
  //! User
  users: [],
  email: "",
  name: localStorage.getItem("name") || "",
  token: localStorage.getItem("token") || false,
  id: localStorage.getItem("id") || "",
  //! Restaurant
  restaurants: [],
  restaurantsByUser: [],
  restaurantsByCategory: [],
  //! Hotel
  hotels: [],
  hotelsByUser: [],
  hotelsByCategory: [],
  //! Taxi
  taxis: [],
  taxisByUser: [],
  taxisByCategory: [],
  //! Supermarket
  supermarkets: [],
  supermarketsByUser: [],
  supermarketsByCategory: [],
  //! Gym
  gyms: [],
  gymsByUser: [],
  gymsByCategory: [],
  //! Tourism
  tourisms: [],
  tourismsByUser: [],
  tourismsByCategory: [],
  //! Movie
  movies: [],
  moviesByUser: [],
  //! Emergency
  emergencies: [],
  emergenciesByUser: [],
  emergenciesByCategory: [],
  //! Comment
  comments: [],
  //! Error
  error: null,
  totalResults: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //! User
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
    //! Login and Logout
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
        token: false,
        name: "",
        id: "",
      };
    //! Restaurant
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
    //! Hotel
    case GET_ALL_HOTELS:
      return {
        ...state,
        hotels: action.payload.hotels,
        totalResults: action.payload.totalResults,
        hotelsByCategory: [],
        error: null,
      };
    case GET_HOTELS_BY_USER:
      return {
        ...state,
        hotelsByUser: action.payload,
      };
    case GET_HOTELS_BY_CATEGORY:
      return {
        ...state,
        hotelsByCategory: action.payload.hotels,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_HOTEL:
      return {
        ...state,
        hotels: [...state.hotels, action.payload],
      };
    case UPDATE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.map((hotel) =>
          hotel.id === action.payload.id ? action.payload : hotel
        ),
      };
    case UPDATE_HOTEL_STATUS: {
      const updatedHotelStatus = state.hotels.map((hotel) =>
        hotel.id === action.payload.id
          ? { ...hotel, isActive: action.payload.isActive }
          : hotel
      );
      const updatedHotelsByUserStatus = state.hotelsByUser.map((hotel) =>
        hotel.id === action.payload.id
          ? { ...hotel, isActive: action.payload.isActive }
          : hotel
      );
      return {
        ...state,
        hotels: updatedHotelStatus,
        hotelsByUser: updatedHotelsByUserStatus,
      };
    }
    case DELETE_HOTEL: {
      const updatedHotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
      const updatedHotelsByUser = state.hotelsByUser.filter(
        (hotel) => hotel.id !== action.payload
      );

      return {
        ...state,
        hotelsByUser: updatedHotelsByUser,
        hotels: updatedHotels,
      };
    }

    //! Taxi
    case GET_ALL_TAXIS:
      return {
        ...state,
        taxis: action.payload.taxis,
        totalResults: action.payload.totalResults,
        taxisByCategory: [],
        error: null,
      };
    case GET_TAXIS_BY_USER:
      return {
        ...state,
        taxisByUser: action.payload,
      };
    case GET_TAXIS_BY_CATEGORY:
      return {
        ...state,
        taxisByCategory: action.payload.taxis,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_TAXI:
      return {
        ...state,
        taxis: [...state.taxis, action.payload],
      };
    case UPDATE_TAXI:
      return {
        ...state,
        taxis: state.taxis.map((taxi) =>
          taxi.id === action.payload.id ? action.payload : taxi
        ),
      };
    case UPDATE_TAXI_STATUS: {
      const updatedTaxiStatus = state.taxis.map((taxi) =>
        taxi.id === action.payload.id
          ? { ...taxi, isActive: action.payload.isActive }
          : taxi
      );
      const updatedTaxisByUserStatus = state.taxisByUser.map((taxi) =>
        taxi.id === action.payload.id
          ? { ...taxi, isActive: action.payload.isActive }
          : taxi
      );
      return {
        ...state,
        taxis: updatedTaxiStatus,
        taxisByUser: updatedTaxisByUserStatus,
      };
    }
    case DELETE_TAXI: {
      const updatedTaxis = state.taxis.filter(
        (taxi) => taxi.id !== action.payload
      );
      const updatedTaxisByUser = state.taxisByUser.filter(
        (taxi) => taxi.id !== action.payload
      );

      return {
        ...state,
        taxisByUser: updatedTaxisByUser,
        taxis: updatedTaxis,
      };
    }

    //! Supermarket
    case GET_ALL_SUPERMARKETS:
      return {
        ...state,
        supermarkets: action.payload.supermarkets,
        totalResults: action.payload.totalResults,
        supermarketsByCategory: [],
        error: null,
      };
    case GET_SUPERMARKETS_BY_USER:
      return {
        ...state,
        supermarketsByUser: action.payload,
      };
    case GET_SUPERMARKETS_BY_CATEGORY:
      return {
        ...state,
        supermarketsByCategory: action.payload.supermarkets,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_SUPERMARKET:
      return {
        ...state,
        supermarkets: [...state.supermarkets, action.payload],
      };
    case UPDATE_SUPERMARKET:
      return {
        ...state,
        supermarkets: state.supermarkets.map((supermarket) =>
          supermarket.id === action.payload.id ? action.payload : supermarket
        ),
      };
    case UPDATE_SUPERMARKET_STATUS: {
      const updatedSupermarketStatus = state.supermarkets.map((supermarket) =>
        supermarket.id === action.payload.id
          ? { ...supermarket, isActive: action.payload.isActive }
          : supermarket
      );
      const updatedSupermarketsByUserStatus = state.supermarketsByUser.map(
        (supermarket) =>
          supermarket.id === action.payload.id
            ? { ...supermarket, isActive: action.payload.isActive }
            : supermarket
      );
      return {
        ...state,
        supermarkets: updatedSupermarketStatus,
        supermarketsByUser: updatedSupermarketsByUserStatus,
      };
    }
    case DELETE_SUPERMARKET: {
      const updatedSupermarket = state.supermarkets.filter(
        (supermarket) => supermarket.id !== action.payload
      );
      const updatedSupermarketsByUser = state.supermarketsByUser.filter(
        (supermarket) => supermarket.id !== action.payload
      );

      return {
        ...state,
        supermarketsByUser: updatedSupermarketsByUser,
        supermarkets: updatedSupermarket,
      };
    }
    //! Gym
    case GET_ALL_GYMS:
      return {
        ...state,
        gyms: action.payload.gyms,
        totalResults: action.payload.totalResults,
        gymsByCategory: [],
        error: null,
      };
    case GET_GYMS_BY_USER:
      return {
        ...state,
        gymsByUser: action.payload,
      };
    case GET_GYMS_BY_CATEGORY:
      return {
        ...state,
        gymsByCategory: action.payload.gyms,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_GYM:
      return {
        ...state,
        gyms: [...state.gyms, action.payload],
      };
    case UPDATE_GYM:
      return {
        ...state,
        gyms: state.gyms.map((gym) =>
          gym.id === action.payload.id ? action.payload : gym
        ),
      };
    case UPDATE_GYM_STATUS: {
      const updatedGymStatus = state.gyms.map((gym) =>
        gym.id === action.payload.id
          ? { ...gym, isActive: action.payload.isActive }
          : gym
      );
      const updatedGymsByUserStatus = state.gymsByUser.map((gym) =>
        gym.id === action.payload.id
          ? { ...gym, isActive: action.payload.isActive }
          : gym
      );
      return {
        ...state,
        gyms: updatedGymStatus,
        gymsByUser: updatedGymsByUserStatus,
      };
    }
    case DELETE_GYM: {
      const updatedGym = state.gyms.filter((gym) => gym.id !== action.payload);
      const updatedGymsByUser = state.gymsByUser.filter(
        (gym) => gym.id !== action.payload
      );

      return {
        ...state,
        gymsByUser: updatedGymsByUser,
        gyms: updatedGym,
      };
    }
    //! Tourism
    case GET_ALL_TOURISMS:
      return {
        ...state,
        tourisms: action.payload.tourisms,
        totalResults: action.payload.totalResults,
        tourismsByCategory: [],
        error: null,
      };
    case GET_TOURISMS_BY_USER:
      return {
        ...state,
        tourismsByUser: action.payload,
      };
    case GET_TOURISMS_BY_CATEGORY:
      return {
        ...state,
        tourismsByCategory: action.payload.tourisms,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_TOURISM:
      return {
        ...state,
        tourisms: [...state.tourisms, action.payload],
      };
    case UPDATE_TOURISM:
      return {
        ...state,
        tourisms: state.tourisms.map((tourism) =>
          tourism.id === action.payload.id ? action.payload : tourism
        ),
      };
    case UPDATE_TOURISM_STATUS: {
      const updatedTourismStatus = state.tourisms.map((tourism) =>
        tourism.id === action.payload.id
          ? { ...tourism, isActive: action.payload.isActive }
          : tourism
      );
      const updatedTourismsByUserStatus = state.tourismsByUser.map((tourism) =>
        tourism.id === action.payload.id
          ? { ...tourism, isActive: action.payload.isActive }
          : tourism
      );
      return {
        ...state,
        tourisms: updatedTourismStatus,
        tourismsByUser: updatedTourismsByUserStatus,
      };
    }
    case DELETE_TOURISM: {
      const updatedTourism = state.tourisms.filter(
        (tourism) => tourism.id !== action.payload
      );
      const updatedTourismsByUser = state.tourismsByUser.filter(
        (tourism) => tourism.id !== action.payload
      );

      return {
        ...state,
        tourismsByUser: updatedTourismsByUser,
        tourisms: updatedTourism,
      };
    }
    //! Movie
    case GET_ALL_MOVIES:
      return {
        ...state,
        movies: action.payload.movieTheater,
        totalResults: action.payload.totalResults,
        moviesByCategory: [],
        error: null,
      };
    case GET_MOVIES_BY_USER:
      return {
        ...state,
        moviesByUser: action.payload,
      };
    case CREATE_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case UPDATE_MOVIE_STATUS: {
      const updatedMovieStatus = state.movies.map((movie) =>
        movie.id === action.payload.id
          ? { ...movie, isActive: action.payload.isActive }
          : movie
      );
      const updatedMoviesByUserStatus = state.moviesByUser.map((movie) =>
        movie.id === action.payload.id
          ? { ...movie, isActive: action.payload.isActive }
          : movie
      );
      return {
        ...state,
        movies: updatedMovieStatus,
        moviesByUser: updatedMoviesByUserStatus,
      };
    }
    case DELETE_MOVIE: {
      const updatedMovie = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      const updatedMoviesByUser = state.moviesByUser.filter(
        (movie) => movie.id !== action.payload
      );

      return {
        ...state,
        moviesByUser: updatedMoviesByUser,
        movies: updatedMovie,
      };
    }
    //! Emergency
    case GET_ALL_EMERGENCIES:
      return {
        ...state,
        emergencies: action.payload.emergencies,
        totalResults: action.payload.totalResults,
        emergenciesByCategory: [],
        error: null,
      };
    case GET_EMERGENCIES_BY_USER:
      return {
        ...state,
        emergenciesByUser: action.payload,
      };
    case GET_EMERGENCIES_BY_CATEGORY:
      return {
        ...state,
        emergenciesByCategory: action.payload.emergencies,
        totalResults: action.payload.totalResults,
        error: null,
      };
    case CREATE_EMERGENCY:
      return {
        ...state,
        emergencies: [...state.emergencies, action.payload],
      };
    case UPDATE_EMERGENCY:
      return {
        ...state,
        emergencies: state.emergencies.map((emergency) =>
          emergency.id === action.payload.id ? action.payload : emergency
        ),
      };
    case UPDATE_EMERGENCY_STATUS: {
      const updatedEmergencyStatus = state.emergencies.map((emergency) =>
        emergency.id === action.payload.id
          ? { ...emergency, isActive: action.payload.isActive }
          : emergency
      );
      const updatedEmergenciesByUserStatus = state.emergenciesByUser.map(
        (emergency) =>
          emergency.id === action.payload.id
            ? { ...emergency, isActive: action.payload.isActive }
            : emergency
      );
      return {
        ...state,
        emergencies: updatedEmergencyStatus,
        emergenciesByUser: updatedEmergenciesByUserStatus,
      };
    }
    case DELETE_EMERGENCY: {
      const updatedEmergency = state.emergencies.filter(
        (emergency) => emergency.id !== action.payload
      );
      const updatedEmergenciesByUser = state.emergenciesByUser.filter(
        (emergency) => emergency.id !== action.payload
      );

      return {
        ...state,
        emergenciesByUser: updatedEmergenciesByUser,
        emergencies: updatedEmergency,
      };
    }
    //! Comment
    case CREATE_COMMENT: {
      const newComments = [...state.comments, action.payload];
      return {
        ...state,
        comments: newComments,
      };
    }
    case GET_COMMENTS_BY_RESTAURANT:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_HOTEL:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_TAXI:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_SUPERMARKET:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_GYM:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_TOURISM:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_MOVIE:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_BY_EMERGENCY:
      return {
        ...state,
        comments: action.payload,
      };

    //! Error
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

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
