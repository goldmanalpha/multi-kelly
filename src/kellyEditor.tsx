import React, { useState, useEffect } from 'react';
import Scenario, {
  numericScenarioDataFields,
  ScenarioData,
} from './scenario';
import { AddCircleOutline } from '@material-ui/icons';
import './kelly.scss';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import calcKellyBetSize from './calc/kelly-calc';
import { KellyResult } from './calc/kelly-types';
import _ from 'lodash';
import { replaceItem } from './utility';
import { ScenarioSummary } from './scenario-chooser';
interface Props {
  startScenario: ScenarioData[];
  showHeader: boolean;
  useCustomStyling?: boolean;
  saveCallback?: (
    summary: Omit<ScenarioSummary, 'title'>
  ) => void;
}

const validate = (scenarios: ScenarioData[]) => {
  const allGood = scenarios.every(
    (s) =>
      typeof s.probabilityPct === 'number' &&
      typeof s.expectedReturnPct === 'number' &&
      s.name
  );

  return allGood && scenarios.length > 0;
};

const KellyEditor = ({
  startScenario,
  showHeader,
  useCustomStyling,
  saveCallback,
}: Props) => {
  const [scenarios, setScenarios] = useState(startScenario);

  const [kellyResult, setKellyResult] = useState(
    null as KellyResult | null
  );
  const [canCalc, setCanCalc] = useState(
    validate(startScenario)
  );
  const [showErrors, setShowErrors] = useState(false);

  const [startCount, setStartCount] = useState(0);

  useEffect(() => {
    setScenarios(startScenario);
    const canCalc = validate(startScenario);
    setCanCalc(canCalc);
    setStartCount(startCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startScenario]);

  useEffect(() => {
    if (canCalc) {
      tryCalculate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCount]);

  const addScenario = () => {
    setScenarios([...scenarios, {}]);
  };

  const updateScenario = (
    index: number,
    scenario: ScenarioData | null,
    updateField: keyof ScenarioData | null
  ) => {
    const newScenarios = replaceItem(
      scenarios,
      index,
      scenario
    );

    setScenarios(newScenarios);
    setCanCalc(validate(newScenarios));

    if (numericScenarioDataFields.includes(updateField!)) {
      setKellyResult(null);
    }
  };

  const tryCalculate = () => {
    if (canCalc) {
      const newKellyResult = calcKellyBetSize(
        scenarios.map((s) => ({
          probability: s.probabilityPct! / 100,
          payoffReturn: s.expectedReturnPct! / 100,
        }))
      );

      setKellyResult(newKellyResult);

      setShowErrors(false);
    } else {
      setShowErrors(true);
    }
  };

  const handleSave = () => {
    saveCallback!({
      ...kellyResult,
      scenarioDetails: scenarios,
    });
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
        {kellyResult && (
          <div className="results">
            {saveCallback && (
              <Button onClick={handleSave}>Save</Button>
            )}
            <Typography>
              kelly bet percent: {kellyResult.betPct}
            </Typography>
            <Typography>
              expected return:{' '}
              {_.round(
                100 * (kellyResult.expectedPayoff - 1),
                1
              )}
              %
            </Typography>
          </div>
        )}
      </div>

      <ol className="scenarios-container">
        {scenarios.map((s, i) => (
          <li key={i}>
            <Scenario
              {...s}
              showErrors={showErrors}
              updateCallback={updateScenario.bind(this, i)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default KellyEditor;
