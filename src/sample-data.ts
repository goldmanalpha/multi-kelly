import { ScenarioSummary } from './scenario-chooser';

export const sampleScenarioSummaries: ScenarioSummary[] = [
  {
    title: 'Generous Coin Flip',

    scenarioOutcomes: [
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
    scenarioOutcomes: [
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

    scenarioOutcomes: [
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
  {
    title: 'stock',

    scenarioOutcomes: [
      {
        name: 'fraud',
        probabilityPct: 5,
        expectedReturnPct: -100,
        description:
          'Complete loss due to fraud: e.g. Enron, Luckin, Wirecard',
      },

      {
        name: 'big miss',
        probabilityPct: 10,
        expectedReturnPct: -50,
        description: 'something goes very wrong',
      },
      {
        name: 'miss neg',
        probabilityPct: 15,
        expectedReturnPct: -15,
        description: "expectations don't pan out",
      },
      {
        name: 'miss even',
        probabilityPct: 15,
        expectedReturnPct: 0,
        description: "expectations don't pan out",
      },

      {
        name: 'win',
        probabilityPct: 25,
        expectedReturnPct: 50,
        description: 'meets expectations',
      },

      {
        name: 'big win',
        probabilityPct: 20,
        expectedReturnPct: 100,
        description: 'exceeds expectations',
      },

      {
        name: 'huge win',
        probabilityPct: 10,
        expectedReturnPct: 200,
        description: 'far exceeds expectations',
      },
    ],
  },
];
