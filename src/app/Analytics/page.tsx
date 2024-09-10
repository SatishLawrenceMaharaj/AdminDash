"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Download as DownloadIcon,
  MapPin as MapIcon,
} from "lucide-react";
import { Tab } from "@headlessui/react";
import Papa from "papaparse";

import { allData } from "../../../public/data";
import MapModal from "@/Components/Map/UserLocationMap";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6699",
  "#FFCC00",
];

const AnalyticsPage = () => {
  const [showMap, setShowMap] = useState(false); // State to handle map visibility

  // Aggregate data for charts and tabs
  const users = allData;
  const activityData = users.flatMap((user) =>
    user.activityData.map((activity) => ({
      name: user.name,
      date: activity.date,
      loginCount: activity.loginCount,
      engagementTime: activity.engagementTime,
    }))
  );

  const productSales = users.flatMap((user) =>
    user.products.flatMap((product) =>
      product.data.map((item) => ({
        product: product.name,
        month: item.name,
        quantity: item.quantity,
        value: item.value,
      }))
    )
  );

  const inventoryStatus = users.flatMap((user) =>
    user.products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      value: product.value,
    }))
  );

  const userSummaryData = users.map((user) => ({
    name: user.name,
    inventoryValue: user.inventoryValue,
  }));

  const totalOrdersData = users.map((user) => ({
    name: user.name,
    totalOrders: user.totalOrders,
  }));

  const lastLoginData = users.map((user) => ({
    name: user.name,
    lastLogin: new Date(user.lastLogin).toLocaleDateString(),
  }));

  const totalValueData = users.map((user) => ({
    name: user.name,
    totalValue: user.inventoryValue,
  }));

  // Calculate summary metrics
  const totalUsers = users.length;
  const totalProducts = users.flatMap((user) => user.products).length;
  const totalInventoryValue = users.reduce(
    (acc, user) => acc + user.inventoryValue,
    0
  );
  const totalOrders = users.reduce((acc, user) => acc + user.totalOrders, 0);

  // Function to download data as CSV
  const downloadCSV = (
    data: unknown[] | Papa.UnparseObject<unknown>,
    filename: string
  ) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleMapClick = () => {
    setShowMap(true); // Show the map when the MapIcon is clicked
  };
  const closeMapModal = () => setShowMap(false);
  return (
    <>
      {/* Summary Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pl-8 pr-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Users
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{totalUsers}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{totalProducts}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Inventory Value
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            ${totalInventoryValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Orders
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{totalOrders}</p>
        </div>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* First Column: Charts */}
        <div className="md:col-span-2 flex flex-col space-y-8">
          {/* Activity Data Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <LineChartIcon className="text-blue-500 mr-2" />
              Activity Data
            </h2>
            <button
              onClick={() => downloadCSV(activityData, "activity_data.csv")}
              className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <DownloadIcon />
            </button>
            <div className="flex-1 flex items-center justify-center">
              <LineChart width={400} height={300} data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loginCount" stroke="#8884d8" />
                <Line
                  type="monotone"
                  dataKey="engagementTime"
                  stroke="#82ca9d"
                />
              </LineChart>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row xl:flex-col 2xl:space-x-8 space-y-8 2xl:space-y-0">
            {/* Product Sales Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col relative flex-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <BarChartIcon className="text-green-500 mr-2" />
                Product Sales
              </h2>
              <button
                onClick={() => downloadCSV(productSales, "product_sales.csv")}
                className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <DownloadIcon />
              </button>
              <div className="flex-1 flex items-center justify-center">
                <BarChart width={400} height={300} data={productSales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </div>
            </div>

            {/* Inventory Status Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col relative flex-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <PieChartIcon className="text-red-500 mr-2" />
                Inventory Status
              </h2>
              <button
                onClick={() =>
                  downloadCSV(inventoryStatus, "inventory_status.csv")
                }
                className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <DownloadIcon />
              </button>
              <div className="flex-1 flex items-center justify-center">
                <PieChart width={400} height={300}>
                  <Pie
                    data={inventoryStatus}
                    dataKey="quantity"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    fill="#8884d8"
                    label
                  >
                    {inventoryStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        </div>

        {/* Second Column with Tabs */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Tab.Group>
            <Tab.List className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              <Tab
                as="button"
                className="py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
              >
                User Summary
              </Tab>
              <Tab
                as="button"
                className="py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
              >
                Total Orders
              </Tab>
              <Tab
                as="button"
                className="py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
              >
                Last Login
              </Tab>
              <Tab
                as="button"
                className="py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
              >
                Total Value
              </Tab>
            </Tab.List>
            <Tab.Panels>
              {/* User Summary Panel */}
              <Tab.Panel className="p-4 relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <BarChartIcon className="text-yellow-500 mr-2" />
                  User Summary
                </h2>
                <button
                  onClick={() =>
                    downloadCSV(userSummaryData, "user_summary.csv")
                  }
                  className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <DownloadIcon />
                </button>
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Inventory Value: ${user.inventoryValue.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>

              {/* Total Orders Panel */}
              <Tab.Panel className="p-4 relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <BarChartIcon className="text-yellow-500 mr-2" />
                  Total Orders
                </h2>
                <button
                  onClick={() =>
                    downloadCSV(totalOrdersData, "total_orders.csv")
                  }
                  className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <DownloadIcon />
                </button>
                <ul className="space-y-4">
                  {totalOrdersData.map((user) => (
                    <li
                      key={user.name}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Total Orders: {user.totalOrders}
                      </p>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>

              {/* Last Login Panel */}
              <Tab.Panel className="p-4 relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <LineChartIcon className="text-blue-500 mr-2" />
                  Last Login
                </h2>
                <button
                  onClick={() => downloadCSV(lastLoginData, "last_login.csv")}
                  className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <DownloadIcon />
                </button>
                <ul className="space-y-4">
                  {lastLoginData.map((user) => (
                    <li
                      key={user.name}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Last Login: {user.lastLogin}
                      </p>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>

              {/* Total Value Panel */}
              <Tab.Panel className="p-4 relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <BarChartIcon className="text-yellow-500 mr-2" />
                  Total Value
                </h2>
                <button
                  onClick={() => downloadCSV(totalValueData, "total_value.csv")}
                  className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <DownloadIcon />
                </button>
                <ul className="space-y-4">
                  {totalValueData.map((user) => (
                    <li
                      key={user.name}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Total Value: ${user.totalValue.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      {/* Floating Map Button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg shadow-md"
          onClick={handleMapClick}
        >
          <MapIcon className="text-blue-500" />
          <span>Show User Locations</span>
        </button>
      </div>

      {/* Map Modal */}
      <MapModal isOpen={showMap} onClose={closeMapModal} />
    </>
  );
};

export default AnalyticsPage;
