"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { allData as usersData } from "../../../../public/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Mail,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  ShoppingBag,
} from "lucide-react";

import { User, Product } from "@/Components/UserDash/User";

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("@/Components/Map/Map"), { ssr: false });

const chartTypes = ["Bar Chart", "Pie Chart"];

const UserProfile = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const user: User | undefined = usersData.find(
    (user) => user.id === Number(userId)
  );

  // State management for selected chart type and data
  const [selectedChartType, setSelectedChartType] =
    useState<string>("Bar Chart");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            No user found with ID: {params.userId}
          </p>
        </div>
      </div>
    );
  }

  const center: [number, number] = [user.location.lat, user.location.lng];

  // Calculate total quantity and value
  const totalQuantity = user.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalValue = user.products.reduce(
    (acc, product) => acc + product.value * product.quantity,
    0
  );

  // Render chart based on selected type
  const renderChart = () => {
    if (!selectedProduct) return <p>Select a product to view the chart.</p>;

    const data = selectedProduct.data;

    if (selectedChartType === "Bar Chart") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" name="Quantity" />
            <Bar dataKey="value" fill="#82ca9d" name="Value" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (selectedChartType === "Pie Chart") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* User Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-between">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-2" />
                {user.email}
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5 mr-2" />
                Last Login: {user.lastLogin}
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <DollarSign className="w-5 h-5 mr-2" />
                Inventory Value: ${user.inventoryValue.toFixed(2)}
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                Location: {user.location.lat.toFixed(2)},{" "}
                {user.location.lng.toFixed(2)}
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2" />
                Registration Date: {user.registrationDate}
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Total Orders: {user.totalOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* User Analytics and Total Products Card Row */}
      <div className="flex space-x-4">
        {/* User Analytics Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-1">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Analytics</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={user.activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="loginCount"
                    stroke="#8884d8"
                    name="Login Count"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="engagementTime"
                    stroke="#82ca9d"
                    name="Engagement Time (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-1">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Total Products Overview
            </h3>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                Total Products: {user.products.length}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                {user.products.map((product) => (
                  <li key={product.id}>
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <span>
                        ${product.value.toFixed(2)} x {product.quantity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-lg font-semibold">
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Value: ${totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Select Chart Type</h3>
          <div className="flex space-x-4 mb-4">
            {chartTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${
                  selectedChartType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setSelectedChartType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Select Product</h3>
          {user.products.length > 0 ? (
            <div className="space-y-2">
              {user.products.map((product) => (
                <button
                  key={product.id}
                  className={`block w-full text-left px-4 py-2 rounded ${
                    selectedProduct === product
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No products found for this user.
            </p>
          )}
        </div>
        <div className="p-6 border-t dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Product Data Chart</h3>
          <div className="h-96">{renderChart()}</div>
        </div>
      </div>

      {/* Map Component */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">User Location</h3>
          <div className="h-96">
            <Map center={center} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
