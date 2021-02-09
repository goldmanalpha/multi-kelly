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

import './scenario.scss';

export interface Props {
  name?: string;
  description?: string;
  probabilityPct?: number;
  expectedReturnPct?: number;
  useCustomStyling?: boolean;
  callback?: (p: Partial<Props>) => void;
}

const Scenario = ({
  name,
  description,
  probabilityPct,
  expectedReturnPct,
  useCustomStyling,
  callback,
}: Props) => {
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
              className="percent-input"
              id="pct-probility"
              required
              type="number"
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
        <Tooltip title="Expected Payoff Pct: gain/loss expected for this scenario&#10;100 = doubling/getting back amount bet twice.&#10;0 = losing amount bet.">
          <span>
            <InputLabel>Exp Gain</InputLabel>
            <Input
              id="pct-payoff"
              className="percent-input"
              required
              type="number"
              endAdornment={
                <InputAdornment position="end">
                  %
                </InputAdornment>
              }
            />
          </span>
        </Tooltip>
      </FormControl>
      <TextField label="Name" className="name" />
      <TextField
        label="Description"
        className="description"
      />
    </div>
  );
};

export default Scenario;
