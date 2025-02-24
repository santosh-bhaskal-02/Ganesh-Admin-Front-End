import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registered!", read: false },
    { id: 2, message: "Server is down for maintenance.", read: false },
    { id: 3, message: "Password changed successfully.", read: true },
  ]);

  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border-l-8 border-blue-500 
        transition-all duration-300 ease-in-out hover:border-green-500 hover:shadow-xl">
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">
          Notifications Management
        </h2>

        {/* Add Notification Button */}
        <div className="mb-4 flex justify-center md:justify-start">
          <button
            onClick={() => addNotification("A new notification added!")}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all 
            focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add New Notification
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center 
              ${notif.read ? "bg-gray-100" : "bg-blue-50"}`}
            >
              <div className="flex-1">
                <p className="text-gray-800 text-lg">{notif.message}</p>
                <p className="text-sm text-gray-500">{notif.read ? "Read" : "Unread"}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-all 
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all 
                  focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
