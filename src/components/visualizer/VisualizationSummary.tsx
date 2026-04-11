import SummarySquare from "../SummarySquare";
import type { VisualizationSummaryProps } from "../../utils/types";

function VisualizationSummary({ summary }: VisualizationSummaryProps) {
  return (
    <div className="visualization-summary-grid">
      <SummarySquare value={summary.total_cases.toLocaleString()} label="Total Cases" />
      <SummarySquare value={summary.total_diseases} label="Disease Classes" />
      <SummarySquare value={summary.total_symptoms} label="Symptom Features" />
      <SummarySquare value={summary.average_symptoms_per_case} label="Average Symptoms per Case" />
    </div>
  );
}

export default VisualizationSummary;