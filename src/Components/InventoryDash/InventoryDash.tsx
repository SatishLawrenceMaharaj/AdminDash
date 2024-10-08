"use client";
import React, { useState, useCallback } from "react";
import { Product, User } from "../UserDash/User";
import { Edit, Eye, Trash2, X } from "lucide-react";
import Chart from "./Chart";
import PieChart from "./PieChart";
import { BlankData } from "./BlankData";

interface InventoryDashProps {
  allData: User[];
}

const InventoryDash: React.FC<InventoryDashProps> = ({ allData }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [productForm, setProductForm] = useState<Product>(BlankData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // State for managing products
  const [products, setProducts] = useState<Product[]>(() =>
    allData.flatMap((user) => user.products)
  );

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setIsAdding(true);
    setProductForm(BlankData);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsViewing(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setProductForm({ ...product });
  };

  const handleSaveProduct = () => {
    if (isAdding) {
      if (selectedUser) {
        // Add product to selected user
        const newProduct = { ...productForm, id: Date.now() };
        setProducts((prevProducts) => [...prevProducts, newProduct]);

        // Add the product to the selected user's product list
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === newProduct.id
              ? { ...product, users: [...(product.users || []), selectedUser] }
              : product
          )
        );
      }
    } else if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === productForm.id ? productForm : product
        )
      );
    }
    setIsAdding(false);
    setIsEditing(false);
    setProductForm(BlankData);
    setSelectedUser(null); // Reset selected user
  };
  const handleDeleteProduct = useCallback((productId: number) => {
    // Remove the product from the state
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    console.log("Product deleted:", productId);
  }, []);

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSelectedUser(null);
    setIsViewing(false);
    setSelectedProduct(null);
  };

  // Count the number of users for each product
  const productUserCount = products.reduce((acc, product) => {
    if (!acc[product.id]) {
      acc[product.id] = { ...product, userCount: 0 };
    }
    acc[product.id].userCount += 1;
    return acc;
  }, {} as Record<string, Product & { userCount: number }>);

  // Convert to array for rendering
  const productList = Object.values(productUserCount);

  // Apply filtering based on stock status
  const filteredByStockStatus = React.useMemo(
    () =>
      productList.filter((product) => {
        switch (filterType) {
          case "in-stock":
            return product.quantity > 10;
          case "low-stock":
            return product.quantity <= 10 && product.quantity > 0;
          case "out-of-stock":
            return product.quantity <= 0;
          case "all":
          default:
            return true;
        }
      }),
    [filterType, productList]
  );

  // Apply sorting
  const sortedProducts = React.useMemo(
    () =>
      filteredByStockStatus.slice().sort((a, b) => {
        if (sortColumn) {
          const aValue = a[sortColumn as keyof typeof a];
          const bValue = b[sortColumn as keyof typeof b];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
          } else if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
        }
        return 0;
      }),
    [filteredByStockStatus, sortColumn, sortDirection]
  );

  // Apply search filtering
  const filteredProducts = React.useMemo(
    () =>
      sortedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [sortedProducts, searchTerm]
  );

  // Calculate summary data
  const totalProducts = filteredByStockStatus.length;
  const totalValue = filteredByStockStatus.reduce(
    (sum, product) => sum + product.value * product.quantity,
    0
  );

  // Calculate stock status counts
  const stockStatusCount = React.useMemo(
    () => ({
      inStock: filteredProducts.filter((p) => p.quantity > 10).length,
      lowStock: filteredProducts.filter(
        (p) => p.quantity <= 10 && p.quantity > 0
      ).length,
      outOfStock: filteredProducts.filter((p) => p.quantity <= 0).length,
    }),
    [filteredProducts]
  );

  // Get users for selected product
  const usersForProduct = selectedProduct
    ? allData.flatMap((user) =>
        user.products.find((p) => p.id === selectedProduct.id) ? user : []
      )
    : [];

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <h2 className="text-2xl font-bold mb-6">Inventory Dashboard</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-semibold">Total Inventory Value</h3>
          <p>${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-semibold">Stock Status</h3>
          <p>In Stock: {stockStatusCount.inStock}</p>
          <p>Low Stock: {stockStatusCount.lowStock}</p>
          <p>Out of Stock: {stockStatusCount.outOfStock}</p>
        </div>
      </div>

      {/* Filter and Product Actions */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          {/* Filter Buttons */}
          <div className="flex space-x-4 flex-grow">
            <button
              onClick={() => handleFilterChange("all")}
              className={`p-2 rounded-md ${
                filterType === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              All Products
            </button>
            <button
              onClick={() => handleFilterChange("in-stock")}
              className={`p-2 rounded-md ${
                filterType === "in-stock"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              In Stock
            </button>
            <button
              onClick={() => handleFilterChange("low-stock")}
              className={`p-2 rounded-md ${
                filterType === "low-stock"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              Low Stock
            </button>
            <button
              onClick={() => handleFilterChange("out-of-stock")}
              className={`p-2 rounded-md ${
                filterType === "out-of-stock"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              Out of Stock
            </button>
          </div>
          {/* Add Product Button */}
          <button
            onClick={handleAddProduct}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Product
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or SKU..."
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Product List */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("type")}
              >
                Type{" "}
                {sortColumn === "type" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("value")}
              >
                Value{" "}
                {sortColumn === "value" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                Quantity{" "}
                {sortColumn === "quantity" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("userCount")}
              >
                User Count{" "}
                {sortColumn === "userCount" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b dark:border-gray-700">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.type}</td>
                <td className="p-2">${product.value.toFixed(2)}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.userCount}</td>
                <td className="p-2 flex space-x-2">
                  <button
                    onClick={() => handleProductClick(product)}
                    className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for Adding/Editing Product */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-500 backdrop-blur-sm z-40"></div>

          {/* Modal content */}
          <div
            className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-1/2 h-[90vh] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {isAdding ? "Add Product" : "Edit Product"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 dark:text-gray-300 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form>
              <div className="space-y-4">
                <label className="block mb-4">
                  <span className="text-gray-700 dark:text-gray-300">
                    Select User
                  </span>
                  <select
                    value={selectedUser ? selectedUser.id : ""}
                    onChange={(e) =>
                      setSelectedUser(
                        allData.find(
                          (user) => user.id === parseInt(e.target.value, 10)
                        ) || null
                      )
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select a user</option>
                    {allData.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </label>
                {/* Name Field */}
                <label className="block">
                  Name:
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Type Field */}
                <label className="block">
                  Type:
                  <input
                    type="text"
                    value={productForm.type}
                    onChange={(e) =>
                      setProductForm({ ...productForm, type: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Value Field */}
                <label className="block">
                  Value:
                  <input
                    type="number"
                    value={productForm.value}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        value: parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Quantity Field */}
                <label className="block">
                  Quantity:
                  <input
                    type="number"
                    value={productForm.quantity}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* SKU Field */}
                <label className="block">
                  SKU:
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) =>
                      setProductForm({ ...productForm, sku: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Status Field */}
                <label className="block">
                  Status:
                  <select
                    value={productForm.status}
                    onChange={(e) =>
                      setProductForm({ ...productForm, status: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="in stock">In Stock</option>
                    <option value="low stock">Low Stock</option>
                    <option value="out of stock">Out of Stock</option>
                  </select>
                </label>

                <div className="flex space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {isAdding ? "Add Product" : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product View Modal */}
      {isViewing && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-800 backdrop-blur-sm z-40"></div>

          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 h-[90vh] overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Product Details
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 dark:text-gray-300 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Value:</strong> ${selectedProduct.value.toFixed(2)}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>SKU:</strong> {selectedProduct.sku}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Chart data={selectedProduct.data} />
              </div>
              <div className="flex-1">
                <PieChart
                  data={usersForProduct.map((user) => ({
                    userName: user.name,
                    quantity: user.products.find(
                      (p) => p.id === selectedProduct.id
                    )!.quantity,
                  }))}
                />
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="mt-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDash;
