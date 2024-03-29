import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { AddCircleOutline } from '@material-ui/icons';
import _ from 'lodash';
import { InputPercent } from './mui/adorned-input';

export interface ScenarioOutcome {
  name?: string;
  description?: string;
  probabilityPct?: number;
  expectedReturnPct?: number;
}
const scenarioDataFields: readonly (keyof ScenarioOutcome)[] =
  [
    'name',
    'description',
    'probabilityPct',
    'expectedReturnPct',
  ] as const;

export const numericScenarioDataFields: readonly (keyof ScenarioOutcome)[] =
  ['probabilityPct', 'expectedReturnPct'] as const;

export interface Props extends ScenarioOutcome {
  useCustomStyling?: boolean;
  showErrors: boolean;
  updateCallback: (
    p: ScenarioOutcome | null,
    field: keyof ScenarioOutcome | null
  ) => void;
}

const ScenarioDetail = React.memo(
  ({
    name,
    description,
    probabilityPct,
    expectedReturnPct,
    useCustomStyling,
    showErrors,
    updateCallback,
  }: Props) => {
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fieldName = event.target
        .name as keyof ScenarioOutcome;
      const value = event.target.value;

      if (scenarioDataFields.includes(fieldName)) {
        const convert =
          numericScenarioDataFields.includes(fieldName);

        updateCallback(
          {
            name,
            description,
            probabilityPct,
            expectedReturnPct,
            [fieldName]: convert
              ? parseFloat(value)
              : value,
          },
          fieldName
        );
      } else {
        console.error(
          `unexpected field name: ${fieldName}`
        );
      }
    };
    const expectedReturnPctError =
      showErrors && typeof expectedReturnPct !== 'number';

    const probabilityPctError =
      showErrors && typeof probabilityPct !== 'number';

    const numOrBlank = (n: number | undefined) =>
      typeof n === 'number' ? _.round(n, 1) : '';
    return (
      <div
        className={classNames('scenario', {
          'lib-styling': !useCustomStyling,
        })}
      >
        <InputPercent
          title="likelihood of occurence from 0 - 100"
          label="Prob Pct*"
          labelProps={{ error: probabilityPctError }}
          inputProps={{
            name: 'probabilityPct',
            className: 'percent-input',
            required: true,
            value: numOrBlank(probabilityPct),
            error: probabilityPctError,
            onChange: handleChange,
          }}
        />
        <FormControl>
          <span
            title="Expected Payoff Pct: gain/loss expected for this scenario&#10;100 = doubling/getting back amount bet twice.&#10;0 = no gain/loss -- just return of amount bet&#10;-100 = losing amount bet."
          >
            <InputLabel error={expectedReturnPctError}>
              Exp Gain*
            </InputLabel>
            <Input
              name="expectedReturnPct"
              className="percent-input"
              required
              type="number"
              value={numOrBlank(expectedReturnPct)}
              error={expectedReturnPctError}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  %
                </InputAdornment>
              }
            />
          </span>
        </FormControl>
        <TextField
          label="Name"
          className="name"
          name="name"
          required
          value={name || ''}
          error={
            showErrors &&
            (typeof name !== 'string' || !name.trim())
          }
          onChange={handleChange}
        />
        <TextField
          label="Description"
          className="description"
          name="description"
          value={description || ''}
          onChange={handleChange}
        />
        <span
          title="delete outcome"
          className="delete-scenario"
        >
          <AddCircleOutline
            onClick={() => updateCallback(null, null)}
          />
        </span>
      </div>
    );
  }
);

export default ScenarioDetail;
