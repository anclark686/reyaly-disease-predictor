import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import VisualizationSummary from "../components/visualizer/VisualizationSummary";
import FrequencyChart from "../components/visualizer/FrequencyChart";
import CorrelationChart from "../components/visualizer/CorrelationChart";
import CountChart from "../components/visualizer/CountChart";
import PrevalenceChart from "../components/visualizer/PrevalenceChart";
import CooccurenceChart from "../components/visualizer/CooccurenceChart";
import { getVisualizationData } from "../utils/api";
import type { VisualizationData } from "../utils/types";

function VisualizationsPage() {
  const [visualizationData, setVisualizationData] =
    useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVisualizations() {
      try {
        const data = await getVisualizationData();
        setVisualizationData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load visualization data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadVisualizations();
  }, []);

  return (
    <div className="content-container">
      <div className="top-main-container">
        <Typography variant="h1" className="main-title">
          Data Visualizations
        </Typography>
      </div>

      <div className="visualizations-page">
        <div className="instructions visualizations-intro">
          <Typography variant="body1">
            These charts show the structure of the symptom dataset and help
            explain how the prediction model behaves.
          </Typography>
        </div>

        {loading && (
          <div className="loading-container">
            <CircularProgress />
            <Typography variant="body1">Loading charts...</Typography>
          </div>
        )}

        {error && (
          <div className="visualizations-alert">
            <Alert severity="error">{error}</Alert>
          </div>
        )}

        {visualizationData && (
          <>
            <VisualizationSummary summary={visualizationData.summary} />

            <div className="visualization-grid">
              <FrequencyChart data={visualizationData.top_symptoms} />

              <CorrelationChart
                heatmap_symptoms={visualizationData.heatmap_symptoms}
                symptom_correlation_heatmap={
                  visualizationData.symptom_correlation_heatmap
                }
              />

              <CountChart data={visualizationData.symptom_count_distribution} />

              <CooccurenceChart
                data={visualizationData.disease_symptom_matrix}
                legends={visualizationData.disease_symptom_matrix_legends}
              />

              <PrevalenceChart data={visualizationData.disease_prevalence} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VisualizationsPage;
