import { ScenarioSummary } from './scenario-chooser';

export const sampleScenarioSummaries: ScenarioSummary[] = [
  {
    title: 'Generous Coin Flip',

    scenarioDetails: [
      {
        name: 'heads',
        probabilityPct: 50,
        expectedReturnPct: 200,
      },
      {
        name: 'tails',
        probabilityPct: 50,
        expectedReturnPct: -100,
      },
    ],
  },
  {
    title: 'Double or Nothing',
    scenarioDetails: [
      {
        name: 'heads',
        probabilityPct: 50,
        expectedReturnPct: 100,
      },
      {
        name: 'tails',
        probabilityPct: 50,
        expectedReturnPct: -100,
      },
    ],
  },
  {
    title: 'Jelly Beans',

    scenarioDetails: [
      {
        name: 'black',
        probabilityPct: 70,
        expectedReturnPct: -100,
      },

      {
        name: 'blue',
        probabilityPct: 20,
        expectedReturnPct: 1000,
      },

      {
        name: 'red',
        probabilityPct: 10,
        expectedReturnPct: 3000,
      },
    ],
  },
];
