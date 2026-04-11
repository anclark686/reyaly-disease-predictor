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

import type { ConfidenceChartProps } from "../../utils/types";

function ConfidenceChart({ data }: ConfidenceChartProps) {
  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Model Confidence on Test Cases</Typography>
      <Typography variant="body1" className="visualization-caption">
        Figure 4: Distribution of the model's top prediction confidence across
        the test set.
      </Typography>
      <div className="chart-container chart-container-large">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4f6479" />
            <XAxis dataKey="rangeLabel" stroke="#020f1f" interval={1} />
            <YAxis stroke="#020f1f" />
            <Tooltip
              formatter={(value) => [value, "Cases"]}
              labelFormatter={(label) => `Confidence range: ${label}`}
            />
            <Bar dataKey="count" fill="#2e84a5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        <Typography variant="body1">
          Most test-set predictions fall in the higher confidence ranges,
          indicating that the model is often very certain when evaluating
          complete symptom patterns from the dataset. However, user-entered
          predictions in the interactive app may show lower confidence when only
          one or two symptoms are selected, since fewer symptoms provide less
          information for distinguishing among 773 possible diseases.
        </Typography>
      </div>
    </section>
  );
}

export default ConfidenceChart;
