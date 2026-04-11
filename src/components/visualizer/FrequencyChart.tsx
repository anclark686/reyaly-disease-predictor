import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Typography } from "@mui/material";

import type { FrequencyChartProps } from "../../utils/types";

const chartColors = ["#2e84a5", "#3fbfdf", "#5CE1E6", "#7AE7C7", "#12877d"];

function FrequencyChart({ data }: FrequencyChartProps) {
  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Top Symptom Frequency</Typography>

      <Typography variant="body1" className="visualization-caption">
        Figure 1: The most common symptoms in the dataset, based on how often
        each symptom appears across all cases.
      </Typography>

      <div className="chart-container chart-container-large">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 32, left: 32, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4f6479" />
            <XAxis type="number" stroke="#020f1f" />
            <YAxis
              type="category"
              dataKey="symptom"
              width={140}
              stroke="#020f1f"
              tick={{ fontSize: 16 }}
            />
            <Tooltip />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`${entry.symptom}-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        <Typography variant="body1" className="visualization-caption">
          Sharp abdominal pain, vomiting, and headache appear most frequently
          across cases, suggesting that these symptoms are highly represented
          in the dataset. This may influence the model to favor diseases
          associated with these symptoms.
        </Typography>
      </div>
    </section>
  );
}

export default FrequencyChart;
