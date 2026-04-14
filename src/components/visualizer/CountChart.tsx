import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CountChartProps } from "../../utils/types";

function CountChart({ data }: CountChartProps) {
  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Symptom Count per Case</Typography>
      <Typography variant="body1" className="visualization-caption">
        <strong>Figure 3:</strong> The number of symptoms present in each case.
        This gives context for how simple or complex a typical patient record
        is.
      </Typography>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4f6479" />
            <XAxis dataKey="symptomCount" stroke="#020f1f" />
            <YAxis stroke="#020f1f" />
            <Tooltip />
            <Bar dataKey="cases" fill="#2e84a5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        <Typography variant="body1" className="visualization-caption">
          Most cases contain between 4 and 6 symptoms, indicating moderate
          complexity per instance. This distribution helps explain why model
          confidence remains relatively low, as multiple diseases may share
          overlapping symptom combinations.
        </Typography>
      </div>
    </section>
  );
}

export default CountChart;
