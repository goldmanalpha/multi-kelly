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
    summaries[selectedSummaryIdx].scenarioDetails;
  return (
    <div>
      <ScenarioChooser
        summaries={summaries}
        selectedCallback={handleScenarioSelection}
        selectedIndex={selectedSummaryIdx}
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
