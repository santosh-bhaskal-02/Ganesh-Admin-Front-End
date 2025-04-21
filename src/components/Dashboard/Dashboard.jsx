import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Addidol from "../Sidebar/Addidol";
import EditIdol from "../Sidebar/EditIdol";
import AddCategory from "../Sidebar/AddCategory";
import UsersList from "../Sidebar/UsersList";
import Notifications from "../Sidebar/Notifications";
import Settings from "../Sidebar/Settings";
import Orders from "../Sidebar/Orders";
import Deliveries from "../Sidebar/Deliveries";
import HomeDashboard from "./homedashboard/HomeDashboard";
import IdolCardsList from "../Sidebar/IdolCardsList";
import ErrorPage from "../Error/ErrorPage";
import Cookies from "js-cookie";
import UserDetails from "../Sidebar/UserDetails";
import AddAddress from "../Address/AddAddress";
import OrderDetails from "../Sidebar/OrderDetails";
import TaxDeliveryCharges from "../Sidebar/TaxDeliveryCharges";
import CustomFormList from "../CustomForm/CustomFormList";
import CustomFormDetails from "../CustomForm/CustomFormDetails";

const Dashboard = () => {
  const authToken = Cookies.get("adminAuthToken");

  if (!authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full justify-center items-center">
        <Routes>
          <Route path="/" element={<HomeDashboard />}></Route>
          <Route path="/idols" element={<IdolCardsList />}></Route>
          <Route path="/Addidol" element={<Addidol />}></Route>
          <Route path="/edit_Idol/:idolId" element={<EditIdol />}></Route>
          <Route path="/AddCategory" element={<AddCategory />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/Notifications" element={<Notifications />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
          <Route path="/Orders" element={<Orders />}></Route>
          <Route path="/Deliveries" element={<Deliveries />}></Route>
          <Route path="/users/user/:userId" element={<UserDetails />}></Route>
          <Route path="/users/user/edit_address/:userId" element={<AddAddress />}></Route>
          <Route
            path="/users/user/order_details/:orderId"
            element={<OrderDetails />}></Route>

          <Route path="/tax_DeliveryCharges" element={<TaxDeliveryCharges />}></Route>
          <Route path="/Custom-idol" element={<CustomFormList />}></Route>
          <Route path="/Custom-idol/:formId" element={<CustomFormDetails />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
