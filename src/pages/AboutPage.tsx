import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import AboutSummary from "../components/about/AboutSummary";
import ConfidenceChart from "../components/about/ConfidenceChart";
import SummarySquare from "../components/SummarySquare";
import highConfidenceImage from "../assets/higher_confidence.png";
import lowConfidenceImage from "../assets/lower_confidence.png";
import { getModelConfidenceData } from "../utils/api";
import type { ModelConfidenceData } from "../utils/types";

function AboutPage() {
  const [confidenceData, setConfidenceData] =
    useState<ModelConfidenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfidenceData() {
      try {
        const data = await getModelConfidenceData();
        setConfidenceData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load model confidence data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadConfidenceData();
  }, []);

  return (
    <div className="content-container">
      <div className="top-main-container">
        <Typography variant="h1" className="main-title">
          About Reyaly Disease Predictor
        </Typography>
      </div>

      <div className="about-page">
        <Typography variant="h2">How We Predict Diseases</Typography>
        <section className="about-hero">
          <Typography variant="body1">
            The application analyzes a selected symptom set and compares it
            against a multiclass machine learning model trained on symptom-based
            disease records (
            <a
              href="https://www.kaggle.com/datasets/ahmetmesut/disease-symptom"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kaggle Dataset
            </a>
            ). Because the model must distinguish between 773 possible diseases,
            it often spreads probability across several likely outcomes instead
            of giving one extremely high-confidence answer.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Prediction Confidence</Typography>
          <div className="confidence-section">
            <div className="about-image-container">
              <img src={lowConfidenceImage} alt="Low Confidence Prediction" />
            </div>
            <div className="confidence-text">
              <Typography variant="h4">
                Why the Live Confidence Looks Low
              </Typography>
              <Typography variant="body1">
                User-entered inputs in the interactive app may show lower
                confidence when only one or two symptoms are selected, since
                fewer symptoms provide less information for distinguishing among
                the 773 possible diseases. That is why the app returns the top
                three predictions instead of only one result. Showing multiple
                likely diseases gives the user a more honest and useful summary
                of what the model sees in the symptom pattern.
              </Typography>
            </div>
          </div>

          <div className="confidence-section">
            <div className="confidence-text">
              <Typography variant="h4">
                Predictions with Higher Confidence
              </Typography>
              <Typography variant="body1">
                When more symptoms are selected, the model has more information
                to work with, which can lead to higher confidence scores. As the
                symptom pattern becomes more specific, the model can narrow down
                which diseases are most likely. This helps explain why
                predictions based on broader or incomplete symptom sets often
                produce lower confidence values.
              </Typography>
              <Typography variant="body1">
                Higher confidence does not guarantee that a prediction is
                correct, but it does suggest that the selected symptoms more
                closely match a recognizable pattern in the training data.
              </Typography>
            </div>

            <div className="about-image-container">
              <img src={highConfidenceImage} alt="High Confidence Prediction" />
            </div>
          </div>
        </section>

        <section className="model-info">
          <Typography variant="h2">Model Information</Typography>
          <div className="model-info-container">
            <div className="model-info-text">
              <Typography variant="h4">Model Selection</Typography>
              <Typography variant="body1">
                The model used in this application is a Logistic Regression
                model. This model was chosen because it is a simple and
                effective model for multiclass classification problems. It is
                also computationally efficient and can handle a large number of
                features.
              </Typography>
              <Typography variant="body1">
                Another model that was considered was a Random Forest model.
                This model was ultimately not used because it was too complex
                for the dataset and did not provide better results than the
                Logistic Regression model.
              </Typography>
            </div>
            <div className="model-info-text">
              <Typography variant="h4">Confidence vs. Accuracy</Typography>
              <div className="confidence-accuracy">
                <SummarySquare
                  value={
                    confidenceData
                      ? `${confidenceData.summary.average_confidence}%`
                      : "--"
                  }
                  label="Avg. Confidence"
                />
                <SummarySquare
                  value={
                    confidenceData
                      ? `${confidenceData.summary.top_one_accuracy}%`
                      : "--"
                  }
                  label="Top-1 Accuracy"
                />
                <SummarySquare
                  value={
                    confidenceData
                      ? `${confidenceData.summary.top_three_accuracy}%`
                      : "--"
                  }
                  label="Top-3 Accuracy"
                />
              </div>
              <Typography variant="body1">
                The confidence score reflects how strongly the model favors its
                top prediction, while accuracy measures how often the correct
                disease is returned. Top-3 accuracy is especially important in
                this project because the application intentionally presents the
                three most likely diseases instead of only one result.
              </Typography>
            </div>
          </div>
        </section>

        {loading && (
          <div className="loading-container">
            <CircularProgress />
            <Typography variant="body1">Loading testing insights...</Typography>
          </div>
        )}

        {error && (
          <div className="visualizations-alert">
            <Alert severity="error">{error}</Alert>
          </div>
        )}

        {confidenceData && (
          <>
            <Typography variant="h2">Testing Insights</Typography>
            <br />
            <AboutSummary summary={confidenceData.summary} />

            <div className="about-data">
              <ConfidenceChart data={confidenceData.confidence_distribution} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AboutPage;
