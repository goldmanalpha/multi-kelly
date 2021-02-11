import React, { useState } from 'react';
import KellyEditor from './kellyEditor';
import { sampleScenarioSummaries } from './sample-data';
import ScenarioChooser, {
  ScenarioSummary,
} from './scenario-chooser';
import { replaceItem } from './utility';

const App = () => {
  const [summaries, setSummaries] = useState(
    sampleScenarioSummaries
  );

  const [
    selectedSummaryIdx,
    setSelectedSummaryIdx,
  ] = useState(null as number | null);

  const handleScenarioSelection = (
    index: number | null
  ) => {
    setSelectedSummaryIdx(index);
  };

  const saveHandler = (
    summary: Omit<ScenarioSummary, 'title'>
  ) => {
    if (selectedSummaryIdx) {
      const fullSummary = {
        ...summaries[selectedSummaryIdx],
        summary,
      };

      setSummaries(
        replaceItem(
          summaries,
          selectedSummaryIdx,
          fullSummary
        )
      );
    } else {
      setSummaries([
        ...summaries,
        {
          title: new Date().toLocaleString(),
          ...summary,
        },
      ]);
    }
  };

  const startScenario =
    selectedSummaryIdx !== null
      ? summaries[selectedSummaryIdx].scenarioDetails
      : [];

  return (
    <div>
      <ScenarioChooser
        summaries={summaries}
        selectedCallback={handleScenarioSelection}
      />

      <KellyEditor
        showHeader={true}
        startScenario={startScenario}
        saveCallback={saveHandler}
      />
    </div>
  );
};

export default App;
