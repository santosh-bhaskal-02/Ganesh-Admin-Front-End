import React, { useState } from "react";
import {
  LayoutDashboard,
  SquarePlus,
  Users,
  PackageCheck,
  Truck,
  Bell,
  Settings,
  Menu,
  X,
  Layers,
  Package,
  Percent,
  Crown,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="">
      <div
        className={`h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white transition-all duration-300 
          shadow-lg ${isSidebarOpen ? "w-64" : "w-16"}`}>
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-900 p-2 rounded-lg md:hidden z-50">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <button onClick={toggleSidebar} className="hidden md:block">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/idols"
            icon={<Package size={20} />}
            text="Idols"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/add-idol"
            icon={<SquarePlus size={20} />}
            text="Add New Idol"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/add-category"
            icon={<Layers size={20} />}
            text="Add Category"
            isOpen={isSidebarOpen}
          />

          <SidebarItem
            to="/dashboard/users"
            icon={<Users size={20} />}
            text="Users"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/orders"
            icon={<PackageCheck size={20} />}
            text="Orders"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/deliveries"
            icon={<Truck size={20} />}
            text="Deliveries"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/delivery-charges"
            icon={<Percent size={18} />}
            text="Delivery & Tax"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/custom-idol"
            icon={<Crown size={18} />}
            text="Custom Idol"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/notifications"
            icon={<Bell size={20} />}
            text="Notifications"
            isOpen={isSidebarOpen}
          />

          <SidebarItem
            to="/dashboard/settings"
            icon={<Settings size={20} />}
            text="Settings"
            isOpen={isSidebarOpen}
          />
        </ul>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isOpen }) => {
  const path = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={` flex items-center space-x-4 text-gray-300 hover:bg-gray-700 p-3 rounded-lg transition-all 
        duration-200 ${path.pathname === to ? "bg-gray-600" : ""}`}>
        {icon}
        <span className={`${isOpen ? "block" : "hidden"} transition-all duration-300 `}>
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
