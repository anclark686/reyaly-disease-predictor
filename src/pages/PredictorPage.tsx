import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import SymptomContainer from "../components/predictor/SymptomContainer";
import ResultsContainer from "../components/predictor/ResultsContainer";
import { getSymptoms } from "../utils/api";
import type { SymptomsMap, Results } from "../utils/types";

function PredictorPage() {
  const [symptoms, setSymptoms] = useState<SymptomsMap>({});
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const data = await getSymptoms();
        setSymptoms(data.symptoms);
      } catch (error) {
        console.error("Failed to load symptoms:", error);
        window.alert("Failed to load symptoms. Please try again later.");
      }
    };

    loadSymptoms();
  }, []);

  return (
    <div className="content-container">
      <div className="top-main-container">
        <Typography variant="h1" className="main-title">
          Disease Predictor
        </Typography>
      </div>
      <SymptomContainer
        symptoms={symptoms}
        setResults={setResults}
        setLoading={setLoading}
      />
      <hr className="divider" />
      {results || loading ? (
        <ResultsContainer
          results={results}
          symptoms={symptoms}
          loading={loading}
        />
      ) : null}
    </div>
  );
}

export default PredictorPage;
