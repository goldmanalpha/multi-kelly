import React, { useState } from 'react';
import Scenario, { ScenarioData } from './scenario';
import { AddCircleOutline } from '@material-ui/icons';
import './kelly.scss';
import classNames from 'classnames';

interface Props {
  showHeader: boolean;
  useCustomStyling?: boolean;
}
const KellyUi = ({
  showHeader,
  useCustomStyling,
}: Props) => {
  const [scenarios, setScenarios] = useState(
    [] as ScenarioData[]
  );

  const addScenario = () => {
    setScenarios([...scenarios, {}]);
  };

  const updateScenario = (
    index: number,
    scenario: ScenarioData | null
  ) => {
    if (scenario) {
      setScenarios([
        ...scenarios.slice(0, index),
        scenario,
        ...scenarios.slice(index + 1),
      ]);
    } else {
      setScenarios([
        ...scenarios.slice(0, index),
        ...scenarios.slice(index + 1),
      ]);
    }
  };

  return (
    <div
      className={classNames('kelly-ui', {
        'lib-styling': !useCustomStyling,
      })}
    >
      {showHeader && (
        <h1>Multi Kelly Criterion Calculator</h1>
      )}
      <div className="scenarioManager">
        <span title="add scenario" className="add-scenario">
          <AddCircleOutline onClick={addScenario} />
        </span>
      </div>

      <ol className="scenarios-container">
        {scenarios.map((s, i) => (
          <li key={i}>
            <Scenario
              {...s}
              callback={updateScenario.bind(this, i)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default KellyUi;
