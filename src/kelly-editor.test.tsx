import {
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import KellyEditor from './kelly-editor';
import React from 'react';

const testData = () => ({
  title: 'test: Generous Coin Flip',

  scenarioOutcomes: [
    {
      name: 'test: heads',
      probabilityPct: 22,
      expectedReturnPct: 225,
    },
    {
      name: 'test: tails',
      probabilityPct: 78,
      expectedReturnPct: -99,
    },
  ],
});

const titleText = 'Multi Kelly Criterion Calculator';

let lastRenderResult: RenderResult;

const renderIt = (useCallback: boolean = false) =>
  (lastRenderResult = render(
    <KellyEditor
      startScenarioOutcomes={testData().scenarioOutcomes}
      saveCallback={useCallback ? () => {} : undefined}
    />
  ));

describe('kelly editor', () => {
  const simpleDisplay = (useCallback: boolean) => {
    const { getByText, getByDisplayValue, container } =
      renderIt(useCallback);

    const title = getByText(titleText);

    expect(title).toBeVisible();

    let elementTests = 0;
    testData().scenarioOutcomes.forEach((so) => {
      const ancestorListItem = getByDisplayValue(
        so.name
      ).closest('li');

      Object.values(so).forEach((v) => {
        const element = getByDisplayValue(v);
        expect(element).toBeVisible();

        // on same row:
        expect(element.closest('li')).toBe(
          ancestorListItem
        );
        elementTests++;
      });
    });

    expect(elementTests).toBe(6);
  };
  it('renders / displays submitted scenario -- without save button', () => {
    simpleDisplay(false);

    expect(lastRenderResult.queryByText('Save')).toBeNull();
    expect(lastRenderResult.container).toMatchSnapshot();
  });

  it('renders / displays submitted scenario -- with save button', () => {
    simpleDisplay(true);

    expect(
      lastRenderResult.queryByText('Save')
    ).toBeDefined();
    expect(lastRenderResult.container).toMatchSnapshot();
  });

  const errorChecks = (
    modifier: string = '',
    it: (name: string, fn: () => void) => void = global.it
  ) =>
    describe(`errors ${modifier}`, () => {
      it("shows error when percentages don't add to 100", () => {
        const expectedError =
          "Total probability should be 100% but is 99%. Can't calculate. Please update the probabilities.";
        const { getByText, getByDisplayValue } = renderIt();

        const inputProbability = getByDisplayValue('22');

        fireEvent.change(inputProbability, {
          target: { value: '21' },
        });

        expect(getByText(expectedError)).toBeVisible();
      });

      it('shows error when name is missing', () => {
        const expectedError =
          'Outcome name is required, please enter a value.';

        const { getByText, getByDisplayValue } = renderIt();

        const name = getByDisplayValue('test: heads');

        fireEvent.change(name, {
          target: { value: '' },
        });

        expect(getByText(expectedError)).toBeVisible();
      });

      it('shows both name and percent errors', () => {
        const expectedError =
          "Total probability should be 100% but is 99%. Can't calculate. Please update the probabilities. Outcome name is required, please enter a value.";
        const { getByText, getByDisplayValue } = renderIt();

        const name = getByDisplayValue('test: heads');

        fireEvent.change(name, {
          target: { value: '' },
        });
        const inputProbability = getByDisplayValue('22');

        fireEvent.change(inputProbability, {
          target: { value: '21' },
        });
      });
    });

  // errorChecks(
  //   'set save button disabled',
  //   (name: string, fun: Function) => {
  //     it(`${name}`, () => {
  //       fun();

  //       const savebutton =
  //         lastRenderResult.getByDisplayValue('Save');
  //       expect(savebutton).toBeDisabled();
  //     });
  //   }
  // );

  it('hides the title when requested', () => {
    const { queryByText } = render(
      <KellyEditor
        startScenarioOutcomes={testData().scenarioOutcomes}
        showHeader={false}
      />
    );

    expect(queryByText(titleText)).toBeNull();
  });
});
