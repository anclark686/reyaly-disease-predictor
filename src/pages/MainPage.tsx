import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import PageCard from "../components/PageCard";

import reyalyLogo from "../assets/reyaly-logo.svg";
import barChartIcon from "../assets/bar-chart.png";
import informationIcon from "../assets/information.png";
import stethoscopeIcon from "../assets/stethoscope.png";

export function MainPage() {
  const theme = useTheme();

  return (
    <div className="content-container">
      <div className="top-main-container">
        <img src={reyalyLogo} alt="Reyaly Logo" />
        <div className="right-container">
          <Typography variant="h1" className="main-title">
            Reyaly Disease Predictor
          </Typography>
          <Typography variant="h2">
            Predicting Disease Risk with Machine Learning
          </Typography>
          <Typography variant="body1">
            An easy-to-use application that demonstrates supervised machine
            learning for predicting diseases based on provided symptoms. In the
            disease predictor, select symptoms from the dropdown and receive a
            predicted disease diagnosis along with a probability score.
            <br />
            <br />
            This application is intended to demonstrate how machine learning can
            identify patterns in healthcare data. Data can be viewed and
            analyzed in the data visualizations section. Data provided by{" "}
            <a href="https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset/data">
              Disease-Symptom Dataset
            </a>{" "}
            on Kaggle. This application combines data visualization (descriptive
            analysis) with machine learning predictions (non-descriptive
            analysis) to provide both insight and decision support.
          </Typography>
        </div>
      </div>

      <hr className="divider" />

      <div className="card-container">
        <PageCard
          icon={stethoscopeIcon}
          title="Disease Predictor"
          color={theme.palette.primary.main}
          link="/predictor"
        />

        <div className="bottom-two-cards">
          <PageCard
            icon={barChartIcon}
            title="Data Visualizations"
            color={theme.palette.primary.dark}
            link="/visualizations"
          />
          <PageCard
            icon={informationIcon}
            title="About"
            color={theme.palette.primary.light}
            link="/about"
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
