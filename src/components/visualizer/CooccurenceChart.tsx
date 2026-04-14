import Typography from "@mui/material/Typography";

import StyledTooltip from "../StyledTooltip";
import type { ComparisonChartProps } from "../../utils/types";

const getHeatmapColor = (correlation: number) => {
  if (correlation <= -74) return "#0f766e";
  if (correlation <= -49) return "#7ae7c7";
  if (correlation <= -24) return "#9eecd5";
  if (correlation <= -4) return "#c5f0e3";
  if (correlation >= 74) return "#2e84a5";
  if (correlation >= 49) return "#3fbfdf";
  if (correlation >= 24) return "#5ce1e6";
  if (correlation >= 4) return "#bdf8f9";
  return Math.abs(correlation) < 4 ? "#f8fafc" : "#dbf9fe"; // Near zero
};

function CooccurenceChart({ data, legends }: ComparisonChartProps) {
  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Disease-Symptom Co-occurrence Matrix</Typography>
      <Typography variant="body1" className="visualization-caption">
        <strong>Figure 4:</strong> Percentage of patients with each disease
        (rows) who also present with each symptom (columns). Darker cells
        indicate higher co-occurrence rates between diseases and symptoms.
      </Typography>
      <div className="heatmap-wrapper">
        <div className="heatmap-corner" />
        <div
          className="heatmap-axis heatmap-axis-top"
          style={{
            gridTemplateColumns: `repeat(${legends.symptoms.length}, minmax(0, 1fr))`,
          }}
        >
          {legends.symptoms.map((symptom) => (
            <div
              key={`top-${symptom}`}
              className="heatmap-axis-label heatmap-axis-label-top"
              title={symptom}
            >
              {symptom}
            </div>
          ))}
        </div>

        <div
          className="heatmap-axis heatmap-axis-left"
          style={{
            gridTemplateRows: `repeat(${legends.diseases.length}, minmax(54px, 1fr))`,
          }}
        >
          {legends.diseases.map((disease) => (
            <div
              key={`left-${disease}`}
              className="heatmap-axis-label heatmap-axis-label-left"
              title={disease}
            >
              {disease}
            </div>
          ))}
        </div>

        <div
          className="heatmap-grid"
          style={{
            gridTemplateColumns: `repeat(${legends.symptoms.length}, minmax(0, 1fr))`,
          }}
        >
          {data.map((matrixItem) => (
            <StyledTooltip
              key={`${matrixItem.symptom}-${matrixItem.disease}`}
              title={
                <>
                  <Typography
                    sx={{
                      color: "inherit",
                    }}
                  >
                    {`${matrixItem.disease} vs ${matrixItem.symptom}: `}
                  </Typography>
                  <strong>{matrixItem.percentage}%</strong>
                </>
              }
              arrow
              placement="top"
            >
              <div
                className="heatmap-cell"
                style={{
                  backgroundColor: getHeatmapColor(matrixItem.percentage),
                  color:
                    matrixItem.percentage >= 75 || matrixItem.percentage <= -75
                      ? "white"
                      : "inherit",
                }}
              >
                {matrixItem.percentage.toFixed(1)}%
              </div>
            </StyledTooltip>
          ))}
        </div>

        <div className="heatmap-legend">
          <span>Weak/ No correlation</span>
          <div className="cooccurence-heatmap-legend-bar" />
          <span>Strong positive correlation</span>
        </div>
      </div>

      <div className="chart-summary">
        <Typography variant="body1" className="visualization-caption">
          This matrix reveals which symptoms are most strongly associated with
          each disease. High co-occurrence percentages help identify key
          diagnostic indicators and symptom patterns that the model likely uses
          for disease classification.
        </Typography>
      </div>
    </section>
  );
}

export default CooccurenceChart;
