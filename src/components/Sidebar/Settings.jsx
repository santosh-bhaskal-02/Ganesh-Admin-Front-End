import React, { useState } from "react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    appName: "MyEcommerceApp",
    emailNotifications: true,
    darkMode: false,
    currency: "USD",
    logoUrl: "https://via.placeholder.com/150",
    paymentGateway: "Stripe",
    shippingMethod: "Standard Shipping",
    taxRate: 10,
    twoFactorAuth: false,
  });

  const handleToggle = (key) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleChange = (key, value) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div
      className={`min-h-screen ${
        settings.darkMode ? "bg-gray-900" : "bg-gray-100"
      } p-6`}
    >
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Admin Settings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Application Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-medium">
                  App Name:
                </label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => handleChange("appName", e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-medium">
                  Logo URL:
                </label>
                <input
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) => handleChange("logoUrl", e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-medium">
                  Currency:
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Payment Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-medium">
                  Payment Gateway:
                </label>
                <select
                  value={settings.paymentGateway}
                  onChange={(e) =>
                    handleChange("paymentGateway", e.target.value)
                  }
                  className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Razorpay">Razorpay</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-medium">
                  Tax Rate (%):
                </label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleChange("taxRate", e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Shipping Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-40 text-gray-700 font-medium">
                Shipping Method:
              </label>
              <select
                value={settings.shippingMethod}
                onChange={(e) => handleChange("shippingMethod", e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Standard Shipping">Standard Shipping</option>
                <option value="Express Shipping">Express Shipping</option>
                <option value="Free Shipping">Free Shipping</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-40 text-gray-700 font-medium">
                Two-Factor Authentication:
              </label>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle("twoFactorAuth")}
                className="h-5 w-5 text-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-40 text-gray-700 font-medium">
                Email Notifications:
              </label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                className="h-5 w-5 text-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => alert("Settings saved!")}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none transition duration-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
