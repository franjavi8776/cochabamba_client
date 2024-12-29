import "./App.css";
import { ThemeProvider } from "./components/theme/ThemeContext";
import { Routes, Route } from "react-router";
import UserRegister from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Restaurant from "./components/restaurant/Restaurant";
import Hospitals from "./components/hospital/Hospitals";
import Hotel from "./components/hotel/Hotel";
import RestaurantForm from "./components/restaurant/RestaurantForm";
import RestaurantsByUser from "./components/restaurant/RestaurantsByUser";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import University from "./components/university/University";
import Emergency from "./components/emergency/Emergency";
import Store from "./components/store/Store";
import Disco from "./components/disco/Disco";
import Park from "./components/park/Park";
import Gym from "./components/gym/Gym";
import Taxi from "./components/taxi/Taxi";
import Rent from "./components/rent/Rent";
import Movie from "./components/movieTheater/Movie";
import Supermarket from "./components/supermarket/Supermarket";
import Tourism from "./components/tourism/Tourism";
import Delivery from "./components/delivery/Delivery";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/hospital" element={<Hospitals />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/university" element={<University />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/store" element={<Store />} />
          <Route path="/disco" element={<Disco />} />
          <Route path="/park" element={<Park />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/supermarket" element={<Supermarket />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route
            path="/restaurant_form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RestaurantForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurantsByUser"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RestaurantsByUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
