import React, { useState } from 'react';
import Scenario, { ScenarioData } from './scenario';
import { AddCircleOutline } from '@material-ui/icons';
import './kelly.scss';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

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

  const [canCalc, setCanCalc] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const addScenario = () => {
    setScenarios([...scenarios, {}]);
  };

  const validate = (scenarios: ScenarioData[]) => {
    const allGood = scenarios.every(
      (s) =>
        typeof s.probabilityPct === 'number' &&
        typeof s.expectedReturnPct === 'number' &&
        s.name
    );

    return allGood && scenarios.length > 0;
  };

  const updateScenario = (
    index: number,
    scenario: ScenarioData | null
  ) => {
    const [start, end] = [
      [...scenarios.slice(0, index)],
      [...scenarios.slice(index + 1)],
    ];
    const newScenarios = scenario
      ? [...start, scenario, ...end]
      : [...start, ...end];

    setScenarios(newScenarios);
    setCanCalc(validate(newScenarios));
  };

  const tryCalculate = () => {
    if (canCalc) {
      setShowErrors(false);
    } else {
      setShowErrors(true);
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
        <Button
          variant="outlined"
          onClick={tryCalculate}
          color={canCalc ? 'primary' : 'secondary'}
          title={
            canCalc
              ? 'ready'
              : `fix scenarios. ${
                  showErrors ? '' : ' click to see errors'
                }`
          }
        >
          Calculate
        </Button>
      </div>

      <ol className="scenarios-container">
        {scenarios.map((s, i) => (
          <li key={i}>
            <Scenario
              {...s}
              showErrors={showErrors}
              callback={updateScenario.bind(this, i)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default KellyUi;
