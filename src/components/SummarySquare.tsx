import { Typography } from "@mui/material";

import type { SummarySquareProps } from "../utils/types";

function SummarySquare({ value, label }: SummarySquareProps) {
  return (
    <div className="visualization-summary-card">
      <Typography variant="h4">{value}</Typography>
      <Typography variant="body1">{label}</Typography>
    </div>
  );
}

export default SummarySquare;
