import { useState, useEffect, type ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

import { capitalize } from "../../utils/utils";
import type { ResultsContainerProps } from "../../utils/types";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ResultsContainer({
  results,
  symptoms,
  loading,
}: ResultsContainerProps) {
  const [value, setValue] = useState(0);
  const [confidenceMessage, setConfidenceMessage] = useState("");
  const [confidenceColor, setConfidenceColor] = useState("#020f1f");
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const findConfidenceMessage = () => {
    if (results) {
      if (results.confidence_percentage < 5) {
        setConfidenceColor("#db3f3f");
        return "This prediction has low confidence. Multiple conditions may match the selected symptoms.";
      } else if (results.confidence_percentage < 10) {
        setConfidenceColor("#a96c02");
        return "This prediction has moderate confidence. Consider reviewing the top alternative predictions.";
      } else {
        setConfidenceColor("#07845e");
        return "This prediction has relatively higher confidence compared to other possible conditions.";
      }
    }
    return "";
  };

  useEffect(() => {
    setConfidenceMessage(findConfidenceMessage());
  }, [results]);

  return (
    <div>
      <Typography variant="h2">Prediction Results</Typography>
      <div className="results-container">
        {loading ? (
          <div className="loading-container">
            <Typography variant="h3">Loading...</Typography>
            <br />
            <CircularProgress />
          </div>
        ) : results ? (
          <>
            <Typography variant="h3">Top Prediction</Typography>
            <Typography variant="body1" id="top-prediction">
              {capitalize(results.predicted_disease)} -{" "}
              {results.confidence_percentage}%
            </Typography>

            <Typography
              variant="body1"
              id="confidence-message"
              style={{ color: confidenceColor }}
            >
              {confidenceMessage}
            </Typography>

            <Typography variant="h4">Based on Selected Symptoms</Typography>
            <Typography variant="body1">
              {results.selected_symptoms
                .map((symptom) => symptoms[symptom])
                .join(", ")}
            </Typography>

            <Typography variant="h4">Top Three Predictions</Typography>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Top Predictions"
                  centered
                  sx={{
                    mb: 2,
                    backgroundColor: "#1a2332",
                    borderRadius: "5px",
                    "& .MuiTabs-indicator": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  className="custom-tabs"
                >
                  {results.top_predictions.map((prediction, index) => (
                    <Tab
                      key={`${prediction.disease}-tab-label-${index}`}
                      label={prediction.disease}
                      {...a11yProps(index)}
                      sx={{
                        color: "#ffffff",
                        "&.Mui-selected": {
                          color: theme.palette.primary.main,
                          fontWeight: "bold",
                        },
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                        fontSize: "1rem",
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
              {results.top_predictions.map((prediction, index) => (
                <CustomTabPanel
                  key={`${prediction.disease}-tab-panel-${index}`}
                  value={value}
                  index={index}
                >
                  <Typography variant="body1">
                    <strong>Disease Name:</strong>{" "}
                    {capitalize(prediction.disease)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Confidence:</strong> {prediction.percentage}%
                  </Typography>
                  {prediction.summary.summary.includes("https") ? (
                    <Typography variant="body1">
                      <strong>Click for More Info:</strong>{" "}
                      <a
                        href={prediction.summary.summary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {prediction.summary.summary}
                      </a>
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      <strong>Summary:</strong> {prediction.summary.summary}{" "}
                      <strong>Source:</strong> {prediction.summary.source}
                    </Typography>
                  )}
                  <br />
                  <Typography variant="body1">
                    <strong>
                      <em>Educational information only - not medical advice</em>
                    </strong>
                  </Typography>
                </CustomTabPanel>
              ))}
            </Box>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ResultsContainer;
