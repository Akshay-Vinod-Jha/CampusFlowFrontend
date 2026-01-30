/**
 * CategoryChart Component
 * Bar chart showing events by category
 */

import { Card } from "../ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const CategoryChart = ({
  data = [],
  title = "Events by Category",
  height = 300,
}) => {
  // Default mock data if none provided
  const chartData =
    data.length > 0
      ? data
      : [
          { category: "Technical", events: 24, participants: 456 },
          { category: "Cultural", events: 18, participants: 389 },
          { category: "Sports", events: 15, participants: 312 },
          { category: "Workshop", events: 28, participants: 523 },
          { category: "Seminar", events: 12, participants: 278 },
          { category: "Other", events: 8, participants: 145 },
        ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium text-neutral-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
              <p className="text-sm text-neutral-600">Category distribution</p>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="category"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "14px" }} iconType="rect" />
            <Bar
              dataKey="events"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              name="Events"
            />
            <Bar
              dataKey="participants"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Participants"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryChart;
