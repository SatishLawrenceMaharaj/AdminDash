import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
  } from "recharts";
  import React from "react";
  
  interface ChartProps {
    data: { name: string; quantity: number; value: number }[];
    userData: { userName: string; totalValue: number }[]; // New prop for total value per user
  }
  
  const Chart: React.FC<ChartProps> = ({ data, userData }) => {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 h-auto rounded-lg p-4">
        <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
          Total Inventory Value
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={userData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="userName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalValue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
  
        <h4 className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">
          Product Quantity and Value Over Time
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default Chart;
  