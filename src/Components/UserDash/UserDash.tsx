"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { X, Edit, Trash2 } from "lucide-react";

// Define a type for user
import { User } from "./User";
import { BlankData } from "./BlankData";

interface UserDashProps {
  usersData: User[];
}

const UserDash: React.FC<UserDashProps> = ({ usersData }) => {
  const router = useRouter(); // Initialize useRouter
  const [users, setUsers] = useState<User[]>(usersData);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<User>(BlankData);

  useEffect(() => {
    let filtered = users;

    if (filterType === "active") {
      filtered = users.filter((user) => user.status === "active");
    } else if (filterType === "inactive") {
      filtered = users.filter((user) => user.status === "inactive");
    } else if (filterType === "new") {
      filtered = users.filter((user) => user.status === "new");
    } else if (filterType === "high-value") {
      filtered = users.filter((user) => user.inventoryValue > 500);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastLogin.includes(searchTerm)
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterType]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status: string) => {
    setFilterType(status);
  };

  const handleUserClick = (user: User) => {
    router.push(`/UserDashboard/${user.id}`); // Redirect to user profile page with userId as a URL parameter
  };

  const handleAddUser = () => {
    setIsAdding(true);
    setUserForm(BlankData);
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setUserForm({ ...user });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSaveUser = () => {
    if (isAdding) {
      setUsers([...users, { ...userForm, id: Date.now() }]);
    } else if (isEditing) {
      setUsers(
        users.map((user) => (user.id === userForm.id ? userForm : user))
      );
    }
    setIsAdding(false);
    setIsEditing(false);
    setUserForm(BlankData);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setUserForm(BlankData);
  };

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <h2 className="text-2xl font-bold mb-6">User Management Dashboard</h2>

      {/* Filter and User Actions */}
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
              All Users
            </button>
            <button
              onClick={() => handleFilterChange("active")}
              className={`p-2 rounded-md ${
                filterType === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              Active Users
            </button>
            <button
              onClick={() => handleFilterChange("inactive")}
              className={`p-2 rounded-md ${
                filterType === "inactive"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              Inactive Users
            </button>
            <button
              onClick={() => handleFilterChange("new")}
              className={`p-2 rounded-md ${
                filterType === "new"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              New Users
            </button>
            <button
              onClick={() => handleFilterChange("high-value")}
              className={`p-2 rounded-md ${
                filterType === "high-value"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              } cursor-pointer`}
            >
              High-Value Users
            </button>
          </div>
          {/* Add User Button */}
          <button
            onClick={handleAddUser}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add User
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or last login..."
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* User List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">User List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="relative p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md flex flex-col items-center cursor-pointer"
                onClick={() => handleUserClick(user)} // Click to redirect
              >
                {/* Edit and Delete Buttons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h4 className="text-lg font-medium mb-2">{user.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Status: {user.status}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Inventory Value: ${user.inventoryValue}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Last Login: {user.lastLogin}
                </p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>

      {/* Add/Edit User Modal */}
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
                {isAdding ? "Add New User" : "Edit User"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 dark:text-gray-300 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
            >
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">User Information</h4>
                <label>
                  Name:
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Status Field */}
                <label>
                  Status:
                  <select
                    value={userForm.status}
                    onChange={(e) =>
                      setUserForm({ ...userForm, status: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="new">New</option>
                  </select>
                </label>

                {/* Inventory Value Field */}
                <label>
                  Inventory Value:
                  <input
                    type="number"
                    value={userForm.inventoryValue}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        inventoryValue: parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Last Login Field */}
                <label>
                  Last Login:
                  <input
                    type="date"
                    value={userForm.lastLogin}
                    onChange={(e) =>
                      setUserForm({ ...userForm, lastLogin: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Email Field */}
                <label>
                  Email:
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Image URL Field */}
                <label>
                  Image URL:
                  <input
                    type="text"
                    value={userForm.image}
                    onChange={(e) =>
                      setUserForm({ ...userForm, image: e.target.value })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    Latitude:
                    <input
                      type="number"
                      value={userForm.location.lat}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          location: {
                            ...userForm.location,
                            lat: parseFloat(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    />
                  </label>

                  <label>
                    Longitude:
                    <input
                      type="number"
                      value={userForm.location.lng}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          location: {
                            ...userForm.location,
                            lng: parseFloat(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    />
                  </label>
                </div>

                {/* Registration Date Field */}
                <label>
                  Registration Date:
                  <input
                    type="date"
                    value={userForm.registrationDate}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        registrationDate: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Total Orders Field */}
                <label>
                  Total Orders:
                  <input
                    type="number"
                    value={userForm.totalOrders}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        totalOrders: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </label>

                {/* Product Information Fields */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Product Information
                  </h4>
                  {userForm.products.map((product, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                      <h5 className="font-medium">Product {index + 1}</h5>
                      <label>
                        Product Name:
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].name = e.target.value;
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                      <label>
                        Product Type:
                        <input
                          type="text"
                          value={product.type}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].type = e.target.value;
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                      <label>
                        Product Value:
                        <input
                          type="number"
                          value={product.value}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].value = parseFloat(
                              e.target.value
                            );
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                      <label>
                        Product Quantity:
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].quantity = parseInt(
                              e.target.value
                            );
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                      <label>
                        Product SKU:
                        <input
                          type="text"
                          value={product.sku}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].sku = e.target.value;
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                      <label>
                        Product Status:
                        <input
                          type="text"
                          value={product.status}
                          onChange={(e) => {
                            const newProducts = [...userForm.products];
                            newProducts[index].status = e.target.value;
                            setUserForm({ ...userForm, products: newProducts });
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setUserForm({
                        ...userForm,
                        products: [
                          ...userForm.products,
                          {
                            id: Date.now(),
                            name: "",
                            type: "",
                            value: 0,
                            quantity: 0,
                            sku: "",
                            status: "",
                            data: []
                          },
                        ],
                      })
                    }
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Another Product
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDash;
