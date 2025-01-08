import "./App.css";
import { ThemeProvider } from "./components/theme/ThemeContext";
import { Routes, Route } from "react-router";
import UserRegister from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Restaurant from "./components/restaurant/Restaurant";
import Hotel from "./components/hotel/Hotel";
import RestaurantForm from "./components/restaurant/RestaurantForm";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Emergency from "./components/emergency/Emergency";
import Gym from "./components/gym/Gym";
import Taxi from "./components/taxi/Taxi";
import Supermarket from "./components/supermarket/Supermarket";
import Tourism from "./components/tourism/Tourism";
import { useSelector } from "react-redux";
import HotelForm from "./components/hotel/HotelForm";
import UserPost from "./components/userPost/UserPost";
import TaxiForm from "./components/taxi/TaxiForm";
import SupermarketForm from "./components/supermarket/SupermarketForm";
import GymForm from "./components/gym/GymForm";
import TourismForm from "./components/tourism/TourismForm";
import MovieTheaterForm from "./components/movieTheater/MovieTheaterForm";
import MovieTheater from "./components/movieTheater/Movie";
import EmergencyForm from "./components/emergency/EmergencyForm";

function App() {
  const token = useSelector((state) => state.token);
  const isAuthenticated = token ? true : false;

  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/movieTheater" element={<MovieTheater />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/supermarket" element={<Supermarket />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route
            path="/restaurant_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RestaurantForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotel_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HotelForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/taxi_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TaxiForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supermarket_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SupermarketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gym_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GymForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tourism_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TourismForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movieTheater_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MovieTheaterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EmergencyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/User_post"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
