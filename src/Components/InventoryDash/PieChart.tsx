import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

interface PieChartProps {
  data: { userName: string; quantity: number }[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  // Define a green color for the pie chart
  const GREEN_COLOR = "#4caf50";

  return (
    <div className="bg-gray-200 dark:bg-gray-700 h-auto rounded-lg p-4 flex flex-col ">
      <h4 className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Users Who Own This Product
      </h4>
      <div className="flex justify-center items-center">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="quantity"
            nameKey="userName"
            outerRadius={130}
            fill={GREEN_COLOR}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={GREEN_COLOR} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
