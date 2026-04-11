export type NavbarProps = {
  page: "home" | "about" | "predictor" | "visualizations";
  setPage: (page: "home" | "about" | "predictor" | "visualizations") => void;
};

export type PageCardProps = {
  icon: string;
  title: string;
  color: string;
  link: string;
};

export type SymptomsMap = {
  [key: string]: string;
};

export type SymptomsResponse = {
  symptoms: SymptomsMap;
};

export type SymptomContainerProps = {
  symptoms: SymptomsMap;
  setResults: (results: any) => void;
  setLoading: (loading: boolean) => void;
};

export type TopPrediction = {
  disease: string;
  probability: number;
  percentage: number;
  summary: {
    disease: string;
    summary: string;
    source: string;
  };
};

export type Results = {
  selected_symptoms: string[];
  symptom_count: number;
  predicted_disease: string;
  confidence: number;
  confidence_percentage: number;
  top_predictions: TopPrediction[];
};

export type ResultsResponse = {
  results: Results;
};

export type ResultsContainerProps = {
  results: Results | null;
  symptoms: SymptomsMap;
  loading: boolean;
};

export type VisualizationSummary = {
  total_cases: number;
  total_diseases: number;
  total_symptoms: number;
  average_symptoms_per_case: number;
};

export type SymptomFrequencyItem = {
  symptom: string;
  count: number;
};

export type SymptomCorrelationHeatmapCell = {
  xSymptom: string;
  ySymptom: string;
  correlation: number;
};

export type SymptomCountDistributionItem = {
  symptomCount: number;
  cases: number;
};

export type VisualizationData = {
  summary: VisualizationSummary;
  top_symptoms: SymptomFrequencyItem[];
  heatmap_symptoms: string[];
  symptom_correlation_heatmap: SymptomCorrelationHeatmapCell[];
  symptom_count_distribution: SymptomCountDistributionItem[];
};

export type ConfidenceDistributionItem = {
  rangeLabel: string;
  count: number;
  rangeStart: number;
  rangeEnd: number;
};

export type ModelConfidenceData = {
  summary: {
    average_confidence: number;
    median_confidence: number;
    max_confidence: number;
    top_one_accuracy: number;
    top_three_accuracy: number;
    test_case_count: number;
  };
  confidence_distribution: ConfidenceDistributionItem[];
};

export type AboutSummaryProps = {
  summary: {
    average_confidence: number;
    median_confidence: number;
    max_confidence: number;
    top_one_accuracy: number;
    top_three_accuracy: number;
    test_case_count: number;
  };
};

export type ConfidenceChartProps = {
  data: ConfidenceDistributionItem[];
};

export type VisualizationSummaryProps = {
  summary: VisualizationSummary;
};

export type FrequencyChartProps = {
  data: SymptomFrequencyItem[];
};

export type CorrelationChartProps = {
  heatmap_symptoms: string[];
  symptom_correlation_heatmap: SymptomCorrelationHeatmapCell[];
};

export type CountChartProps = {
  data: SymptomCountDistributionItem[];
};

export type SummarySquareProps = {
  value: number | string;
  label: string;
};
