"use client";
import React, { useState } from "react";
import { Product, User } from "../UserDash/User";
import { Edit, Trash2 } from "lucide-react"; // Make sure to import icons if used

interface InventoryDashProps {
  allData: User[];
}

const InventoryDash: React.FC<InventoryDashProps> = ({ allData }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
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
    // Implement add product logic here
  };

  const handleProductClick = (product: Product) => {
    // Implement product click logic here
    console.log("Product clicked:", product);
  };

  const handleEditProduct = (product: Product) => {
    // Implement edit product logic here
    console.log("Product clicked:", product);
  };

  const handleDeleteProduct = (productId: number) => {
    // Implement delete product logic here
    console.log("Product deleted:", productId);
  };

  // Flatten all products into a single array for table display
  const allProducts = allData.flatMap(user => user.products);

  // Count the number of users for each product
  const productUserCount = allProducts.reduce((acc, product) => {
    if (!acc[product.id]) {
      acc[product.id] = { ...product, userCount: 0 };
    }
    acc[product.id].userCount += 1;
    return acc;
  }, {} as Record<string, Product & { userCount: number }>);

  // Convert to array for rendering
  const productList = Object.values(productUserCount);

  // Apply filtering based on stock status
  const filteredByStockStatus = productList.filter(product => {
    switch (filterType) {
      case "in-stock":
        return product.quantity > 0;
      case "low-stock":
        return product.quantity <= 0 && product.quantity > -10; // Adjust threshold as needed
      case "out-of-stock":
        return product.quantity <= -10; // Adjust threshold as needed
      case "all":
      default:
        return true;
    }
  });

  // Apply sorting
  const sortedProducts = filteredByStockStatus.slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Apply search filtering
  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary data
  const totalProducts = filteredByStockStatus.length;
  const totalValue = filteredByStockStatus.reduce((sum, product) => sum + product.value * product.quantity, 0);

  const stockStatusCount = filteredByStockStatus.reduce(
    (acc, product) => {
      if (product.quantity > 0) {
        acc.inStock += 1;
      } else if (product.quantity === 0) {
        acc.lowStock += 1;
      } else {
        acc.outOfStock += 1;
      }
      return acc;
    },
    { inStock: 0, lowStock: 0, outOfStock: 0 }
  );

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
                onClick={() => handleSort("quantity")}
              >
                Quantity{" "}
                {sortColumn === "quantity" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("value")}
              >
                Value{" "}
                {sortColumn === "value" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("userCount")}
              >
                Number of Users{" "}
                {sortColumn === "userCount" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b dark:border-gray-700"
                >
                  <td
                    className="p-2 truncate text-black dark:text-gray-300 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </td>
                  <td className="p-2 text-black dark:text-gray-300">
                    {product.type}
                  </td>
                  <td className="p-2 text-black dark:text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="p-2 text-black dark:text-gray-300">
                    ${product.value.toFixed(2)}
                  </td>
                  <td className="p-2 text-black dark:text-gray-300">
                    {product.status}
                  </td>
                  <td className="p-2 text-black dark:text-gray-300">
                    {product.userCount}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDash;
