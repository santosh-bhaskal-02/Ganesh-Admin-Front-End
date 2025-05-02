import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AddIdol from "../Sidebar/Idol/AddIdol";
import EditIdol from "../Sidebar/Idol/EditIdol";
import AddCategory from "../Sidebar/Category/AddCategory";
import UsersList from "../Sidebar/User/UsersList";
import Notifications from "../Sidebar/Notifications";
import Settings from "../Sidebar/Settings";
import Orders from "../Sidebar/Order/Orders";
import Deliveries from "../Sidebar/Order/Deliveries";
import Dashboard from "./Dashboard/Dashboard";
import IdolCardsList from "../Sidebar/Idol/IdolCardsList";
import ErrorPage from "../Error/ErrorPage";
import Cookies from "js-cookie";
import UserDetails from "../Sidebar/User/UserDetails";
import AddAddress from "../Sidebar/User/Address/AddAddress";
import OrderDetails from "../Sidebar/Order/OrderDetails";
import TaxDeliveryCharges from "../Sidebar/Charges/TaxDeliveryCharges";
import CustomFormList from "../Sidebar/CustomForm/CustomFormList";
import CustomFormDetails from "../Sidebar/CustomForm/CustomFormDetails";

import Login from "../Auth/Login";

const SidebarRoutes = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("adminAuthToken");

  if (!authToken) {
    console.error("User is not authenticated. Redirecting to login...");

    return <Login />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full justify-center items-center">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/idols" element={<IdolCardsList />}></Route>
          <Route path="/add-idol" element={<AddIdol />}></Route>
          <Route path="/edit-idol/:idolId" element={<EditIdol />}></Route>
          <Route path="/add-category" element={<AddCategory />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/deliveries" element={<Deliveries />}></Route>
          <Route path="/users/user/:userId" element={<UserDetails />}></Route>
          <Route path="/users/user/edit-address/:userId" element={<AddAddress />}></Route>
          <Route
            path="/users/user/order-details/:orderId"
            element={<OrderDetails />}></Route>

          <Route path="/delivery-charges" element={<TaxDeliveryCharges />}></Route>
          <Route path="/custom-idol" element={<CustomFormList />}></Route>
          <Route path="/custom-idol/:formId" element={<CustomFormDetails />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SidebarRoutes;
