import axios from "axios";

import type {
  ModelConfidenceData,
  SymptomsResponse,
  ResultsResponse,
  VisualizationData,
} from "./types";

const DEFAULT_LOCAL_API_BASE_URL = "http://localhost:8000";
const DEFAULT_PRODUCTION_API_BASE_URL =
  "https://reyaly-disease-api-6134cc2769e3.herokuapp.com";

const configuredApiBaseUrl = process.env.BUN_PUBLIC_API_BASE_URL?.trim();

const API_BASE_URL =
  configuredApiBaseUrl && configuredApiBaseUrl.length > 0
    ? configuredApiBaseUrl
    : window.location.hostname.includes("localhost")
      ? DEFAULT_LOCAL_API_BASE_URL
      : DEFAULT_PRODUCTION_API_BASE_URL;

const API_TIMEOUT_MS = 30000;
const RETRY_DELAY_MS = 5000;
const WAKE_UP_MESSAGE =
  "The server may be waking up. Please wait a few seconds and try again.";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error: unknown) =>
  axios.isAxiosError(error) &&
  (error.code === "ECONNABORTED" || error.response?.status === 503);

const withWakeRetry = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (!shouldRetry(error)) {
      throw error;
    }

    await sleep(RETRY_DELAY_MS);
    return request();
  }
};

export const getSymptoms: () => Promise<SymptomsResponse> = async () => {
  try {
    const response = await withWakeRetry(() => api.get("/api/symptoms"));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(`Request timed out. ${WAKE_UP_MESSAGE}`);
      } else if (error.response?.status === 503) {
        throw new Error(
          `The backend is temporarily unavailable. ${WAKE_UP_MESSAGE}`,
        );
      } else if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else if (error.response?.status === 404) {
        throw new Error("Symptoms endpoint not found. Please contact support.");
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "Cannot connect to server. Please ensure the backend is running.",
        );
      } else {
        throw new Error(`Failed to fetch symptoms: ${error.message}`);
      }
    } else {
      throw new Error("An unexpected error occurred while fetching symptoms.");
    }
  }
};

export const predictDisease: (
  symptoms: string[],
) => Promise<ResultsResponse> = async (symptoms) => {
  try {
    const response = await api.post("/api/predict", { symptoms });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(`Prediction request timed out. ${WAKE_UP_MESSAGE}`);
      } else if (error.response?.status === 503) {
        throw new Error(
          `The backend is temporarily unavailable. ${WAKE_UP_MESSAGE}`,
        );
      } else if (error.response?.status === 500) {
        throw new Error(
          "Server error during prediction. Please try again later.",
        );
      } else if (error.response?.status === 400) {
        throw new Error(
          "Invalid symptoms data provided. Please check your input.",
        );
      } else if (error.response?.status === 404) {
        throw new Error(
          "Prediction endpoint not found. Please contact support.",
        );
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "Cannot connect to server. Please ensure the backend is running.",
        );
      } else {
        throw new Error(`Failed to predict disease: ${error.message}`);
      }
    } else {
      throw new Error("An unexpected error occurred during prediction.");
    }
  }
};

export const getVisualizationData: () => Promise<VisualizationData> =
  async () => {
    try {
      const response = await withWakeRetry(() =>
        api.get("/api/visualizations"),
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error(
            `Visualization request timed out. ${WAKE_UP_MESSAGE}`,
          );
        } else if (error.response?.status === 503) {
          throw new Error(
            `The backend is temporarily unavailable. ${WAKE_UP_MESSAGE}`,
          );
        } else if (error.response?.status === 500) {
          throw new Error("Server error while loading visualizations.");
        } else if (error.response?.status === 404) {
          throw new Error("Visualizations endpoint not found.");
        } else if (error.code === "ECONNREFUSED") {
          throw new Error(
            "Cannot connect to server. Please ensure the backend is running.",
          );
        } else {
          throw new Error(`Failed to fetch visualizations: ${error.message}`);
        }
      } else {
        throw new Error(
          "An unexpected error occurred while loading visualizations.",
        );
      }
    }
  };

export const getModelConfidenceData: () => Promise<ModelConfidenceData> =
  async () => {
    try {
      const response = await withWakeRetry(() =>
        api.get("/api/model-confidence"),
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error(
            `Confidence data request timed out. ${WAKE_UP_MESSAGE}`,
          );
        } else if (error.response?.status === 503) {
          throw new Error(
            `The backend is temporarily unavailable. ${WAKE_UP_MESSAGE}`,
          );
        } else if (error.response?.status === 500) {
          throw new Error("Server error while loading model confidence data.");
        } else if (error.response?.status === 404) {
          throw new Error("About endpoint not found.");
        } else if (error.code === "ECONNREFUSED") {
          throw new Error(
            "Cannot connect to server. Please ensure the backend is running.",
          );
        } else {
          throw new Error(
            `Failed to fetch model confidence data: ${error.message}`,
          );
        }
      } else {
        throw new Error(
          "An unexpected error occurred while loading model confidence data.",
        );
      }
    }
  };
