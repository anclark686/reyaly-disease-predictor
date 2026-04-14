import Typography from "@mui/material/Typography";

import StyledTooltip from "../StyledTooltip";
import type { PrevalenceChartProps } from "../../utils/types";

const getBubbleColorAndSize = (count: number, maxCount: number) => {
  if (count === maxCount) return { color: "#020f1f", size: 55 };
  if (count <= 10) return { color: "#2e84a5", size: 10 };
  if (count <= 50) return { color: "#3fbfdf", size: 15 };
  if (count <= 100) return { color: "#7ae7c7", size: 20 };
  if (count <= 250) return { color: "#9eecd5", size: 25 };
  if (count <= 500) return { color: "#c5f0e3", size: 30 };
  if (count <= 750) return { color: "#bdf8f9", size: 35 };
  if (count <= 1000) return { color: "#5ce1e6", size: 40 };
  if (count <= 1200) return { color: "#0f766e", size: 45 };
  return { color: "#14465f", size: 50 };
};

function PrevalenceChart({ data }: PrevalenceChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <section className="visualization-card visualization-card-wide">
      <Typography variant="h4">Disease Prevalence</Typography>
      <Typography variant="body1" className="visualization-caption">
        <strong>Figure 5:</strong> The frequency of each disease in the dataset.
        This shows which diseases are most common and helps explain why some
        predictions may be more confident than others.{" "}
        <em>(Hover over bubbles for details)</em>
      </Typography>

      <div className="bubble-chart-container">
        {data.map((item) => {
          const { color, size } = getBubbleColorAndSize(item.count, maxCount);

          return (
            <StyledTooltip
              title={
                <>
                  <Typography
                    sx={{
                      color: "inherit",
                    }}
                  >
                    {`${item.disease}: `}
                  </Typography>

                  <Typography
                    sx={{
                      color: "inherit",
                    }}
                  >
                    <strong>{item.count} cases</strong>
                  </Typography>
                </>
              }
              key={item.disease}
            >
              <div
                className="disease-prevalence-bubble"
                style={{
                  backgroundColor: color,
                  width: size,
                  height: size,
                }}
              ></div>
            </StyledTooltip>
          );
        })}
      </div>

      <Typography variant="body1">Disease Count Ranges:</Typography>
      <div
        className="bubble-legend"
        style={{
          marginTop: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {[
          { range: "1-10", color: "#2e84a5", size: 10 },
          { range: "11-50", color: "#3fbfdf", size: 15 },
          { range: "51-100", color: "#7ae7c7", size: 20 },
          { range: "101-250", color: "#9eecd5", size: 25 },
          { range: "251-500", color: "#c5f0e3", size: 30 },
          { range: "501-750", color: "#bdf8f9", size: 35 },
          { range: "751-1000", color: "#5ce1e6", size: 40 },
          { range: "1001-1200", color: "#0f766e", size: 45 },
          { range: "1200+", color: "#14465f", size: 50 },
          { range: "Highest", color: "#020f1f", size: 55 },
        ].map((item) => (
          <div
            key={item.range}
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <div
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span className="bubble-legend-text">{item.range}</span>
          </div>
        ))}
      </div>

      <div className="chart-summary">
        <Typography variant="body1" className="visualization-caption">
          <strong>Legend:</strong> Bubble size and color indicate disease
          prevalence - larger, darker bubbles represent more common diseases.
          The diseases with the highest counts are those with the largest
          bubbles, indicating they are more prevalent in the dataset. This
          distribution helps explain why the model may be more confident
          predicting common diseases due to greater training data exposure.
        </Typography>
      </div>
    </section>
  );
}

export default PrevalenceChart;
