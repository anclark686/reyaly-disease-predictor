import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import type { TooltipProps } from "@mui/material/Tooltip";

import type { CorrelationChartProps } from "../../utils/types";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "#020f1f",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(16),
    border: "1px solid #dadde9",
    textAlign: "center",
  },
}));

function getHeatmapColor(correlation: number) {
  const intensity = Math.abs(correlation);

  if (correlation >= 0.75) return "#2e84a5";
  if (correlation >= 0.5) return "#3fbfdf";
  if (correlation >= 0.25) return "#5CE1E6";
  if (correlation > -0.25) return intensity < 0.05 ? "#f8fafc" : "#dbf9fe";
  if (correlation > -0.5) return "#7AE7C7";
  if (correlation > -0.75) return "#12877d";
  return "#0f766e";
}

function CorrelationChart({
  heatmap_symptoms,
  symptom_correlation_heatmap,
}: CorrelationChartProps) {
  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Symptom Correlation Heatmap</Typography>
      <Typography variant="body1" className="visualization-caption">
        Figure 2: Correlation between the most frequent symptoms in the dataset.
        Darker cells indicate symptoms that tend to appear together more often.
      </Typography>
      <div className="heatmap-wrapper">
        <div className="heatmap-corner" />
        <div
          className="heatmap-axis heatmap-axis-top"
          style={{
            gridTemplateColumns: `repeat(${heatmap_symptoms.length}, minmax(0, 1fr))`,
          }}
        >
          {heatmap_symptoms.map((symptom) => (
            <div
              key={`top-${symptom}`}
              className="heatmap-axis-label heatmap-axis-label-top"
              title={symptom}
            >
              {symptom}
            </div>
          ))}
        </div>

        <div className="heatmap-axis heatmap-axis-left">
          {heatmap_symptoms.map((symptom) => (
            <div
              key={`left-${symptom}`}
              className="heatmap-axis-label heatmap-axis-label-left"
              title={symptom}
            >
              {symptom}
            </div>
          ))}
        </div>

        <div
          className="heatmap-grid"
          style={{
            gridTemplateColumns: `repeat(${heatmap_symptoms.length}, minmax(0, 1fr))`,
          }}
        >
          {symptom_correlation_heatmap.map((cell) => (
            <StyledTooltip
              key={`${cell.xSymptom}-${cell.ySymptom}`}
              title={
                <>
                  <Typography
                    sx={{
                      color: "inherit",
                    }}
                  >
                    {`${cell.ySymptom} vs ${cell.xSymptom}: `}
                  </Typography>
                  <strong>{cell.correlation.toFixed(3)}</strong>
                </>
              }
              arrow
              placement="top"
            >
              <div
                className="heatmap-cell"
                style={{ backgroundColor: getHeatmapColor(cell.correlation) }}
              >
                {cell.correlation.toFixed(2)}
              </div>
            </StyledTooltip>
          ))}
        </div>

        <div className="heatmap-legend">
          <span>Weak / none</span>
          <div className="heatmap-legend-bar" />
          <span>Strong positive</span>
        </div>
      </div>

      <div className="chart-summary">
        <Typography variant="body1" className="visualization-caption">
          Most symptom correlations are weak, indicating that symptoms tend to
          occur independently rather than in strong clusters. However, moderate
          correlations (e.g., nausea and vomiting) suggest certain symptom
          groupings that may assist the model in classification.
        </Typography>
      </div>
    </section>
  );
}

export default CorrelationChart;
