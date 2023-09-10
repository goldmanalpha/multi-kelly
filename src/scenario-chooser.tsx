import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ScenarioOutcome } from './scenario-detail';

export interface ScenarioSummary {
  title: string;
  betPct?: number;
  expectedPayoff?: number;
  scenarioOutcomes: ScenarioOutcome[];
}

interface Props {
  summaries: ScenarioSummary[];

  selectedCallback: (scenarioSummary: number) => void;
  selectedIndex: number;
}

const scenarioDetailsUi = (data: ScenarioOutcome[]) => {
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
  selectedIndex,
}: Props) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleClick = (index: number) => {
    setIsSelecting(false);
    selectedCallback(index);
  };

  const toggleSelecting = () => {
    setIsSelecting((s) => !s);
  };

  const SingleSummaryUi = ({
    index,
  }: {
    index: number;
  }) => {
    const summary = summaries[index];
    return (
      <div className="scenario-chooser-widget">
        {!isSelecting && (
          <>
            <Typography variant="h4" component="h2">
              Selected Scenario
            </Typography>
            <TableContainer
              component={Paper}
              className="lib-styling scenario-chooser-list"
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>scenarios</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    <TableCell component="th" scope="row">
                      {summary.title}
                    </TableCell>
                    <TableCell>
                      {scenarioDetailsUi(
                        summary.scenarioOutcomes
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleSelecting}
            >
              Select a scenario
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <SingleSummaryUi index={selectedIndex} />

      {isSelecting && (
        <TableContainer
          component={Paper}
          className="lib-styling scenario-chooser-list"
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>scenarios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="outer-container">
              {summaries.map((sum, i) => (
                <TableRow
                  key={i}
                  onClick={() => handleClick(i)}
                  selected={(selectedIndex || 0) === i}
                >
                  <TableCell component="th" scope="row">
                    {sum.title}
                  </TableCell>

                  <TableCell>
                    {scenarioDetailsUi(
                      sum.scenarioOutcomes
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ScenarioChooser;
