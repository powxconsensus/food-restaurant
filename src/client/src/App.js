import HomePage from "./pages/homepage/homepage";
import Header from "./component/header/header.component";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./component/footer/footer.component";
import Restaurant from "./pages/restaurant/restaurant";
import Member from "./pages/member/member.component";
import Cart from "./pages/cart/cart";
import AboutUs from "./pages/about-us/about-us.component";
import ContactUs from "./component/contact-us/contact-us.component";
import CheckOut from "./pages/checkout/checkout.component";
import Delivery from "./pages/delivery/delivery.component";
import CovidMeasures from "./pages/covid/covidMeasures.component";
import FoutZeroFour from "./component/404/404.component";
import Profile from "./pages/profile/profile.component";
import Admin from "./pages/admin/admin.component";
import ManageRestaurant from "./pages/manage-restaurant/manage-restaurant.component";
import RestaurantApplication from "./pages/restaurant-application-form/restaurant-application-form.component";
import ManageRestaurantById from "./pages/manage-resturant-by-ID/manage-resturant-by-ID.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/manage-restaurant" element={<ManageRestaurant />} />
        <Route
          path="/manage-restaurant/:restaurantId"
          element={<ManageRestaurantById />}
        />

        <Route
          path="/restaurant-application"
          element={<RestaurantApplication />}
        />
        <Route path="restaurant">
          <Route path=":id" element={<Restaurant />} />
        </Route>
        <Route path="/members" element={<Member />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/covid" element={<CovidMeasures />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/*" element={<FoutZeroFour />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
