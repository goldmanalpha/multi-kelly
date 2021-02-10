import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { AddCircleOutline } from '@material-ui/icons';

export interface ScenarioData {
  name?: string;
  description?: string;
  probabilityPct?: number;
  expectedReturnPct?: number;
}
const scenarioDataFields: readonly (keyof ScenarioData)[] = [
  'name',
  'description',
  'probabilityPct',
  'expectedReturnPct',
] as const;

const numericScenarioDataFields: readonly (keyof ScenarioData)[] = [
  'probabilityPct',
  'expectedReturnPct',
] as const;

export interface Props extends ScenarioData {
  useCustomStyling?: boolean;
  callback: (p: ScenarioData | null) => void;
}

const Scenario = React.memo(
  ({
    name,
    description,
    probabilityPct,
    expectedReturnPct,
    useCustomStyling,
    callback,
  }: Props) => {
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fieldName = event.target
        .name as keyof ScenarioData;
      const value = event.target.value;

      if (scenarioDataFields.includes(fieldName)) {
        const convert = numericScenarioDataFields.includes(
          fieldName
        );

        callback({
          name,
          description,
          probabilityPct,
          expectedReturnPct,
          [fieldName]: convert ? parseFloat(value) : value,
        });
      } else {
        console.error(
          `unexpected field name: ${fieldName}`
        );
      }
    };

    return (
      <div
        className={classNames('scenario', {
          'lib-styling': !useCustomStyling,
        })}
      >
        <FormControl>
          <Tooltip title="likelihood of occurence from 0 - 100">
            <span>
              <InputLabel htmlFor="pct-probility">
                Prob Pct
              </InputLabel>
              <Input
                name="probabilityPct"
                className="percent-input"
                required
                type="number"
                value={probabilityPct || ''}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    %
                  </InputAdornment>
                }
              />
            </span>
          </Tooltip>
        </FormControl>
        <FormControl>
          <span title="Expected Payoff Pct: gain/loss expected for this scenario&#10;100 = doubling/getting back amount bet twice.&#10;0 = no gain/loss -- just return of amount bet&#10;-100 = losing amount bet.">
            <InputLabel>Exp Gain</InputLabel>
            <Input
              name="expectedReturnPct"
              className="percent-input"
              required
              type="number"
              value={expectedReturnPct || ''}
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
          title="delete scenario"
          className="delete-scenario"
        >
          <AddCircleOutline
            onClick={() => callback(null)}
          />
        </span>
      </div>
    );
  }
);

export default Scenario;
