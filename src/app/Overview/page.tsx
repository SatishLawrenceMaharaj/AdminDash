"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
} from "recharts";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import { allData } from "../../../public/data";

type ProductType = "Jewelry" | "Tools" | "Furniture" | "HomeEntertainment";
import { User } from "@/Components/UserDash/User";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const [summaryData, setSummaryData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalInventoryValue: 0,
    totalOrders: 0,
  });
  const router = useRouter();
  const handleUserClick = (user: User) => {
    router.push(`/UserDashboard/${user.id}`); // Redirect to user profile page with userId as a URL parameter
  };

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilters, setTypeFilters] = useState<Record<ProductType, boolean>>({
    Jewelry: false,
    Tools: false,
    Furniture: false,
    HomeEntertainment: false,
  });
  const [valueRange, setValueRange] = useState([0, 1000]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const resetFilters = () => {
    setStatusFilter("all");
    setTypeFilters({
      Jewelry: false,
      Tools: false,
      Furniture: false,
      HomeEntertainment: false,
    });
    setValueRange([0, 1000]);
    setSelectedUser(null);
  };

  useEffect(() => {
    // Calculate totals from allData
    const totalUsers = allData.length;
    const totalProducts = allData.reduce(
      (acc, user) => acc + user.products.length,
      0
    );
    const totalInventoryValue = allData.reduce(
      (acc, user) => acc + user.inventoryValue,
      0
    );
    const totalOrders = allData.reduce(
      (acc, user) => acc + user.totalOrders,
      0
    );

    setSummaryData({
      totalUsers,
      totalProducts,
      totalInventoryValue,
      totalOrders,
    });
  }, []);

  // Filtered data based on filters
  const filteredData = allData.filter((user) => {
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }
    if (Object.values(typeFilters).some((isSelected) => isSelected)) {
      const hasProductType = user.products.some(
        (product) => typeFilters[product.type as ProductType]
      );
      if (!hasProductType) {
        return false;
      }
    }
    if (
      user.inventoryValue < valueRange[0] ||
      user.inventoryValue > valueRange[1]
    ) {
      return false;
    }
    if (selectedUser && user.id !== selectedUser.id) {
      return false;
    }
    return true;
  });

  // Prepare data for bar charts
  const salesData = filteredData.flatMap((user) =>
    user.products.map((product) => ({
      name: product.name,
      value: product.value,
    }))
  );

  const inventoryStatusData = filteredData.flatMap((user) =>
    user.products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
    }))
  );

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center p-2">
            <h3 className="text-md font-medium">Total Users</h3>
            <p className="text-xl font-bold">{summaryData.totalUsers}</p>
          </div>
          <div className="border-l border-gray-300 h-12 mx-2 dark:border-gray-700" />
          <div className="flex-1 text-center p-2">
            <h3 className="text-md font-medium">Total Products</h3>
            <p className="text-xl font-bold">{summaryData.totalProducts}</p>
          </div>
          <div className="border-l border-gray-300 h-12 mx-2 dark:border-gray-700" />
          <div className="flex-1 text-center p-2">
            <h3 className="text-md font-medium">Total Inventory Value</h3>
            <p className="text-xl font-bold">
              ${summaryData.totalInventoryValue}
            </p>
          </div>
          <div className="border-l border-gray-300 h-12 mx-2 dark:border-gray-700" />
          <div className="flex-1 text-center p-2">
            <h3 className="text-md font-medium">Total Orders</h3>
            <p className="text-xl font-bold">{summaryData.totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Column 1: Charts */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Product Sales</h2>
            <BarChart width={350} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Product Inventory Status
            </h2>
            <BarChart width={350} height={300} data={inventoryStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        {/* Column 2: Users */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between h-10">
              <h2 className="text-lg font-semibold mb-1">Choose a user</h2>
              <button
                className="p-1 bg-gray-200 dark:bg-gray-600 rounded-full"
                onClick={resetFilters}
              >
                <RefreshCcw color="currentColor" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {allData.map((user) => (
                <div
                  key={user.id}
                  className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer ${
                    selectedUser?.id === user.id ? "border border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 h-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-md font-medium mb-2">Filter by Status</h3>
                <div className="flex flex-col gap-2">
                  <label>
                    <input
                      type="radio"
                      name="statusFilter"
                      value="all"
                      checked={statusFilter === "all"}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    All
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="statusFilter"
                      value="active"
                      checked={statusFilter === "active"}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="statusFilter"
                      value="inactive"
                      checked={statusFilter === "inactive"}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    Inactive
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="statusFilter"
                      value="new"
                      checked={statusFilter === "new"}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    New
                  </label>
                </div>
              </div>
              <div className="col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Filter by Product Type
                </h3>
                <div className="flex flex-col space-y-2">
                  {Object.keys(typeFilters).map((type) => (
                    <label key={type}>
                      <input
                        type="checkbox"
                        checked={typeFilters[type as ProductType]}
                        onChange={() =>
                          setTypeFilters((prev) => ({
                            ...prev,
                            [type as ProductType]: !prev[type as ProductType],
                          }))
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Filter by Inventory Value Range
                </h3>
                <input
                  type="number"
                  className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  placeholder="Min Value"
                  value={valueRange[0]}
                  onChange={(e) =>
                    setValueRange([Number(e.target.value), valueRange[1]])
                  }
                />
                <input
                  type="number"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  placeholder="Max Value"
                  value={valueRange[1]}
                  onChange={(e) =>
                    setValueRange([valueRange[0], Number(e.target.value)])
                  }
                />
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="flex-1 flex gap-4" style={{ flex: "3 1 0" }}>
                <div
                  className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md "
                  style={{ flex: "3" }}
                >
                  <div className="md:col-span-1 h-80">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 h-full">
                      <h2 className="text-lg font-semibold mb-2">
                        User Locations
                      </h2>
                      <MapContainer
                        center={[40, 0]}
                        zoom={2}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {allData.map((user) => (
                          <Marker
                            key={user.id}
                            position={[user.location.lat, user.location.lng]}
                            eventHandlers={{
                              click: () => handleUserClick(user),
                            }}
                          >
                            <Popup>{user.name}</Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                </div>
                <div
                  className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md "
                  style={{ flex: "2" }}
                >
                  <h2 className="text-lg font-semibold mb-2">
                    Product Inventory Status
                  </h2>
                  <AreaChart
                    width={350}
                    height={300}
                    data={inventoryStatusData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="quantity"
                      stroke="#ee4747"
                      fill="#ee4747"
                    />
                  </AreaChart>
                </div>
              </div>

              <div className="flex-1 flex gap-4" style={{ flex: "2 1 0" }}>
                <div
                  className="flex-1 bg-white dark:bg-gray-800 p-3 pb-0 rounded-lg shadow-md h-52"
                  style={{ flex: "4" }}
                >
                  <h2 className="text-lg font-semibold mb-1">Product Demand</h2>
                  <PieChart width={300} height={160}>
                    <Tooltip />
                    <Pie
                      data={salesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#ce2989"
                      label
                    />
                  </PieChart>
                </div>

                <div
                  className="flex-1 bg-white dark:bg-gray-800 p-3 pb-0 rounded-lg shadow-md h-52"
                  style={{ flex: "6" }}
                >
                  <h2 className="text-lg font-semibold mb-1">Product Sales</h2>
                  <LineChart width={300} height={150} data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#c9c61b" />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
