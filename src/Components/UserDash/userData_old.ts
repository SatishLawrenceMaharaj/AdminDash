export const usersData = [
  {
    id: 1,
    name: "John Doe",
    status: "active",
    inventoryValue: 600,
    lastLogin: "2024-09-06",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    registrationDate: "2023-06-15",
    totalOrders: 45,
    activityData: [
      { date: "2024-09-04", loginCount: 5, engagementTime: 120 },
      { date: "2024-09-06", loginCount: 3, engagementTime: 75 },
    ],
  }, 
  {
    id: 2,
    name: "Jdn Smith",
    status: "inactive",
    inventoryValue: 300,
    lastLogin: "2024-09-01",
    email: "jane.smith@example.com",
    image: "https://via.placeholder.com/150",
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    registrationDate: "2022-11-22",
    totalOrders: 23,
    activityData: [
      { date: "2024-08-30", loginCount: 2, engagementTime: 50 },
      { date: "2024-09-01", loginCount: 1, engagementTime: 30 },
    ],
  },
  {
    id: 3,
    name: "Sam Wilson",
    status: "active",
    inventoryValue: 800,
    lastLogin: "2024-09-05",
    email: "sam.wilson@example.com",
    image: "https://via.placeholder.com/150",
    location: { lat: 40.7128, lng: -74.0060 }, // New York City
    registrationDate: "2021-09-08",
    totalOrders: 67,
    activityData: [
      { date: "2024-09-04", loginCount: 6, engagementTime: 160 },
      { date: "2024-09-05", loginCount: 4, engagementTime: 100 },
    ],
  },
  {
    id: 4,
    name: "Lucy Brown",
    status: "new",
    inventoryValue: 1200,
    lastLogin: "2024-09-03",
    email: "lucy.brown@example.com",
    image: "https://via.placeholder.com/150",
    location: { lat: 41.8781, lng: -87.6298 }, // Chicago
    registrationDate: "2024-08-01",
    totalOrders: 10,
    activityData: [
      { date: "2024-09-02", loginCount: 4, engagementTime: 90 },
      { date: "2024-09-03", loginCount: 3, engagementTime: 65 },
    ],
  },
];
