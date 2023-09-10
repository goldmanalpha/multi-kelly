import React, { useEffect, useState } from 'react';
import KellyEditor from './kelly-editor';
import { sampleScenarioSummaries } from './sample-data';
import ScenarioChooser, {
  ScenarioSummary,
} from './scenario-chooser';
import { replaceItem } from './utility';

const App = () => {
  const [summaries, setSummaries] = useState(
    sampleScenarioSummaries
  );

  const [selectedSummaryIdx, setSelectedSummaryIdx] =
    useState(0);

  useEffect(() => {
    document.title = 'MultiKelly';
  }, []);

  const handleScenarioSelection = (index: number) => {
    setSelectedSummaryIdx(index);
  };

  const saveHandler = (
    summary: Omit<ScenarioSummary, 'title'>
  ) => {
    const fullSummary = {
      ...summaries[selectedSummaryIdx],
      scenarioOutcomes: summary.scenarioOutcomes,
    };

    const updatedArray = replaceItem(
      summaries,
      selectedSummaryIdx,
      fullSummary
    );
    setSummaries(updatedArray);
  };

  const selectedOutcomes =
    summaries[selectedSummaryIdx].scenarioOutcomes;
  return (
    <div>
      <KellyEditor
        showHeader={true}
        startScenarioOutcomes={selectedOutcomes}
        saveCallback={saveHandler}
      />
      <ScenarioChooser
        summaries={summaries}
        selectedCallback={handleScenarioSelection}
        selectedIndex={selectedSummaryIdx}
      />
    </div>
  );
};

export default App;
