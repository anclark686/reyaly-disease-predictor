import SummarySquare from "../SummarySquare";
import type { AboutSummaryProps } from "../../utils/types";

function AboutSummary({ summary }: AboutSummaryProps) {
  return (
    <div className="visualization-summary-grid">
      <SummarySquare value={`${summary.average_confidence}%`} label="Average Confidence" />
      <SummarySquare value={`${summary.median_confidence}%`} label="Median Confidence" />
      <SummarySquare value={`${summary.max_confidence}%`} label="Highest Confidence" />
      <SummarySquare value={summary.test_case_count.toLocaleString()} label="Test Cases" />
    </div>
  );
}

export default AboutSummary;
