import React, { useState, useEffect } from 'react';
import ScenarioDetail, {
  numericScenarioDataFields,
  ScenarioOutcome,
} from './scenario-detail';
import { AddCircleOutline } from '@material-ui/icons';
import './kelly.scss';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import calcKellyBetSize from './calc/kelly-calc';
import { KellyResult } from './calc/kelly-types';
import _ from 'lodash';
import { replaceItem } from './utility';
import { ScenarioSummary } from './scenario-chooser';

require('react-dom');
const w = window as any;
w.React2 = require('react');
console.log('React Compare', w.React1 === w.React2);

interface Props {
  startScenarioOutcomes: ScenarioOutcome[];
  showHeader?: boolean;
  useCustomStyling?: boolean;
  saveCallback?: (
    summary: Omit<ScenarioSummary, 'title'>
  ) => void;
}

const getTotalProbabilityPct = (
  outcomes: ScenarioOutcome[]
) => _.sum(outcomes.map((s) => s.probabilityPct || 0)) || 0;

const validateSum100Pct = (outcomes: ScenarioOutcome[]) =>
  Math.abs(getTotalProbabilityPct(outcomes) - 100) < 0.01;

const outcomeErrorString = (
  outcomes: ScenarioOutcome[]
) => {
  const requiredFieldsValid = outcomes.reduce(
    (a, c) => ({
      probabilityPct:
        a.probabilityPct &&
        typeof c.probabilityPct === 'number',
      expectedReturnPct:
        a.expectedReturnPct &&
        typeof c.expectedReturnPct === 'number',
      name: a.name && !!c.name,
    }),
    {
      probabilityPct: true,
      expectedReturnPct: true,
      name: true,
    }
  );

  const totalProbabilityPct =
    getTotalProbabilityPct(outcomes);

  const errorStrings = [];
  if (!validateSum100Pct(outcomes)) {
    errorStrings.push(`Total probability should be 100% but is 
      ${_.round(totalProbabilityPct, 2)}%. 
      Can't calculate. Please update the probabilities.`);

    const requiredErrorStrings = {
      probabilityPct: 'Percent probability',
      expectedReturnPct: 'Expected return (percent)',
      name: 'Outcome name',
    };

    const enterErrStrings = Object.entries(
      requiredFieldsValid
    )
      .filter(([k, v]) => !v)
      .map(
        ([k]) =>
          `${
            requiredErrorStrings[
              k as keyof typeof requiredErrorStrings
            ]
          } is required, please enter a value.`
      );

    errorStrings.push(...enterErrStrings);

    return errorStrings.join(' ');
  }
};

const KellyEditor = ({
  startScenarioOutcomes: startScenario,
  showHeader,
  useCustomStyling,
  saveCallback,
}: Props) => {
  const [scenarios, setScenarios] = useState(startScenario);

  const [kellyResult, setKellyResult] = useState(
    null as KellyResult | null
  );
  const [outcomeErrString, setOutcomeErrString] = useState(
    outcomeErrorString(startScenario)
  );
  const [showErrors, setShowErrors] = useState(false);

  const [changeCounter, setChangeCounter] = useState(0);

  const doRecalc = () => setChangeCounter((s) => s + 1);

  useEffect(() => {
    setScenarios(startScenario);
    setOutcomeErrString(outcomeErrorString(startScenario));
    doRecalc();
    setKellyResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startScenario]);

  useEffect(() => {
    if (!outcomeErrString) {
      tryCalculate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCounter, outcomeErrString]);

  const addOutcome = () => {
    setScenarios([...scenarios, {}]);
    setKellyResult(null);
  };

  const updateScenario = (
    index: number,
    scenario: ScenarioOutcome | null,
    updateField: keyof ScenarioOutcome | null
  ) => {
    const newScenarios = replaceItem(
      scenarios,
      index,
      scenario
    );

    setScenarios(newScenarios);
    setOutcomeErrString(outcomeErrorString(newScenarios));

    if (
      numericScenarioDataFields.includes(updateField!) ||
      scenario === null
    ) {
      setKellyResult(null);
      doRecalc();
    }
  };

  const tryCalculate = () => {
    if (!outcomeErrString) {
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
      scenarioOutcomes: scenarios,
    });
  };

  return (
    <div
      className={classNames('kelly-editor-widget', {
        'lib-styling': !useCustomStyling,
      })}
    >
      {showHeader && (
        <Typography variant="h2">
          Multi Kelly Criterion Calculator
        </Typography>
      )}
      <div className="scenarioManager">
        <div className="results">
          {outcomeErrString && (
            <Typography color="secondary">
              {outcomeErrString}
            </Typography>
          )}
          {kellyResult && (
            <div>
              <Typography>
                kelly bet size: {kellyResult.betPct}%
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
          {saveCallback && (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={!!outcomeErrString}
            >
              Save
            </Button>
          )}
        </div>
      </div>

      <ol className="outcomes-container">
        {scenarios.map((s, i) => (
          <li key={i}>
            <ScenarioDetail
              {...s}
              showErrors={showErrors}
              updateCallback={updateScenario.bind(null, i)}
            />
          </li>
        ))}
      </ol>
      <span title="add outcome" className="add-outcome">
        <AddCircleOutline onClick={addOutcome} />
      </span>
    </div>
  );
};

export default KellyEditor;
