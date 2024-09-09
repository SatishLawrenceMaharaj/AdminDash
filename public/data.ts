export const allData = [
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
      { date: "2024-09-05", loginCount: 5, engagementTime: 120 },
      { date: "2024-09-06", loginCount: 3, engagementTime: 75 },
    ],
    products: [
      {
        id: 1,
        name: "Luxury Watch",
        type: "Jewelry",
        value: 500,
        quantity: 5,
        sku: "JEWL-001",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 30, value: 400 },
          { name: "Feb", quantity: 45, value: 300 },
          { name: "Mar", quantity: 35, value: 200 },
          { name: "Apr", quantity: 55, value: 500 },
          { name: "May", quantity: 65, value: 600 },
          { name: "Jun", quantity: 40, value: 400 },
        ],
      },
      {
        id: 2,
        name: "Diamond Necklace",
        type: "Jewelry",
        value: 1000,
        quantity: 2,
        sku: "JEWL-002",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 10, value: 1000 },
          { name: "Feb", quantity: 8, value: 800 },
          { name: "Mar", quantity: 12, value: 1200 },
          { name: "Apr", quantity: 5, value: 500 },
          { name: "May", quantity: 7, value: 700 },
          { name: "Jun", quantity: 6, value: 600 },
        ],
      },
    ],
    userData: { userName: "John Doe", totalValue: 1500 },
  },
  {
    id: 2,
    name: "Jane Smith",
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
    products: [
      {
        id: 3,
        name: "Power Drill",
        type: "Tools",
        value: 250,
        quantity: 10,
        sku: "TOOL-001",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 15, value: 375 },
          { name: "Feb", quantity: 20, value: 500 },
          { name: "Mar", quantity: 18, value: 450 },
          { name: "Apr", quantity: 22, value: 550 },
          { name: "May", quantity: 19, value: 475 },
          { name: "Jun", quantity: 14, value: 350 },
        ],
      },
      {
        id: 4,
        name: "Cordless Screwdriver",
        type: "Tools",
        value: 150,
        quantity: 7,
        sku: "TOOL-002",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 20, value: 300 },
          { name: "Feb", quantity: 22, value: 330 },
          { name: "Mar", quantity: 25, value: 375 },
          { name: "Apr", quantity: 18, value: 270 },
          { name: "May", quantity: 23, value: 345 },
          { name: "Jun", quantity: 17, value: 255 },
        ],
      },
    ],
    userData: { userName: "Jane Smith", totalValue: 2000 },
  },
  {
    id: 3,
    name: "Satish Maharaj",
    status: "active",
    inventoryValue: 800,
    lastLogin: "2024-09-05",
    email: "satish.maharaj@example.com",
    image: "https://via.placeholder.com/150",
    location: { lat: 40.7128, lng: -74.006 }, // New York City
    registrationDate: "2021-09-08",
    totalOrders: 67,
    activityData: [
      { date: "2024-09-04", loginCount: 6, engagementTime: 160 },
      { date: "2024-09-05", loginCount: 4, engagementTime: 100 },
    ],
    products: [
      {
        id: 5,
        name: "Sofa Set",
        type: "Furniture",
        value: 1200,
        quantity: 3,
        sku: "FURN-001",
        status: "low stock",
        data: [
          { name: "Jan", quantity: 5, value: 6000 },
          { name: "Feb", quantity: 4, value: 4800 },
          { name: "Mar", quantity: 6, value: 7200 },
          { name: "Apr", quantity: 7, value: 8400 },
          { name: "May", quantity: 8, value: 9600 },
          { name: "Jun", quantity: 6, value: 7200 },
        ],
      },
      {
        id: 6,
        name: "Dining Table",
        type: "Furniture",
        value: 800,
        quantity: 1,
        sku: "FURN-002",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 2, value: 1600 },
          { name: "Feb", quantity: 1, value: 800 },
          { name: "Mar", quantity: 3, value: 2400 },
          { name: "Apr", quantity: 2, value: 1600 },
          { name: "May", quantity: 1, value: 800 },
          { name: "Jun", quantity: 2, value: 1600 },
        ],
      },
    ],
    userData: { userName: "Sam Wilson", totalValue: 2500 },
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
    products: [
      {
        id: 7,
        name: "Home Theater System",
        type: "Home Entertainment",
        value: 2000,
        quantity: 2,
        sku: "ENT-001",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 3, value: 6000 },
          { name: "Feb", quantity: 4, value: 8000 },
          { name: "Mar", quantity: 2, value: 4000 },
          { name: "Apr", quantity: 3, value: 6000 },
          { name: "May", quantity: 5, value: 10000 },
          { name: "Jun", quantity: 2, value: 4000 },
        ],
      },
      {
        id: 8,
        name: "4K TV",
        type: "Home Entertainment",
        value: 1500,
        quantity: 1,
        sku: "ENT-002",
        status: "in stock",
        data: [
          { name: "Jan", quantity: 1, value: 1500 },
          { name: "Feb", quantity: 2, value: 3000 },
          { name: "Mar", quantity: 1, value: 1500 },
          { name: "Apr", quantity: 2, value: 3000 },
          { name: "May", quantity: 3, value: 4500 },
          { name: "Jun", quantity: 1, value: 1500 },
        ],
      },
    ],
    userData: { userName: "Lucy Brown", totalValue: 1000 },
  },
];
