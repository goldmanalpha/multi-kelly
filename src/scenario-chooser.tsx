import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ScenarioData } from './scenario';

export interface ScenarioSummary {
  title: string;
  betPct?: number;
  expectedPayoff?: number;
  scenarioDetails: ScenarioData[];
}

interface Props {
  summaries: ScenarioSummary[];

  selectedCallback: (
    scenarioSummary: number | null
  ) => void;
}

const scenarioDetailsUi = (data: ScenarioData[]) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right" title="probability">
              Prob
            </TableCell>
            <TableCell align="right" title="expected gain">
              Exp
            </TableCell>
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              <TableCell>{d.name}</TableCell>
              <TableCell align="right">
                {d.probabilityPct}
              </TableCell>
              <TableCell align="right">
                {d.expectedReturnPct}
              </TableCell>
              <TableCell>{d.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ScenarioChooser = ({
  summaries,
  selectedCallback,
}: Props) => {
  const [selectedIdx, setSelectedIdx] = useState(
    null as number | null
  );

  const handleClick = (index: number) => {
    const selecting = index !== selectedIdx;
    const value = selecting ? index : null;
    setSelectedIdx(value);
    selectedCallback(value);
  };

  return (
    <TableContainer
      component={Paper}
      className="lib-styling scenario-chooser-list"
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell title="kelly bet percent">
              Bet Pct
            </TableCell>
            <TableCell title="expected payoff">
              Exp
            </TableCell>
            <TableCell>scenarios</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaries.map((sum, i) => (
            <TableRow
              key={i}
              onClick={() => handleClick(i)}
              selected={selectedIdx === i}
            >
              <TableCell component="th" scope="row">
                {sum.title}
              </TableCell>
              <TableCell>{sum.betPct}</TableCell>
              <TableCell>{sum.expectedPayoff}</TableCell>

              <TableCell>
                {scenarioDetailsUi(sum.scenarioDetails)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScenarioChooser;
