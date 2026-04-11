import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { predictDisease } from "../../utils/api";
import type { SymptomContainerProps } from "../../utils/types";

function SymptomContainer({ symptoms, setResults, setLoading }: SymptomContainerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddSymptom = (newSymptom: string) => {
    if (newSymptom && !selectedSymptoms.includes(newSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    }
  };

  const handleAutocompleteChange = (
    _: any,
    newValue: { key: string; value: string } | null,
  ) => {
    if (newValue) {
      handleAddSymptom(newValue.key);
      setInputValue("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const predict = async () => {
    try {
      setLoading(true);
      const result = await predictDisease(selectedSymptoms);
      setResults(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      window.alert("Prediction failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="symptom-container">
      <Typography variant="h2">Select Symptoms</Typography>

      <div className="instructions">
        <Typography variant="body1">
          Select and add one or more symptoms, then click "Predict" to see
          information about possible related diseases.
        </Typography>
        <br />
        <Typography variant="body1">
          <em>*Adding more symptoms may improve prediction accuracy.</em>
        </Typography>
      </div>

      <div className="symptom-list">
        {selectedSymptoms.length > 0 ? (
          selectedSymptoms.map((symptom) => (
            <div key={symptom} className="symptom-item-wrapper">
              <Typography variant="body1" className="symptom-item">
                {symptoms[symptom]}
              </Typography>
              <button
                type="button"
                className="symptom-remove-button"
                onClick={() => handleRemoveSymptom(symptom)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <Typography variant="body1">No symptoms selected</Typography>
        )}
      </div>
      <div className="add-symptom-container">
        <Autocomplete
          sx={{ minWidth: 350 }}
          options={Object.entries(symptoms)
            .filter(([key]) => !selectedSymptoms.includes(key))
            .map(([key, value]) => ({ key, value }))}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search symptoms..."
              variant="outlined"
            />
          )}
          onChange={handleAutocompleteChange}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          inputValue={inputValue}
          filterOptions={(options, { inputValue }) => {
            return options.filter((option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase()),
            );
          }}
          clearOnBlur
          value={null}
        />
      </div>

      <Button
        variant="contained"
        onClick={predict}
        size="large"
        disabled={selectedSymptoms.length === 0}
        sx={{ mt: 2 }}
      >
        Predict
      </Button>
    </div>
  );
}

export default SymptomContainer;
