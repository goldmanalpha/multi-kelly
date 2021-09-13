import { fireEvent, render } from '@testing-library/react';
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

const renderIt = () =>
  render(
    <KellyEditor
      startScenarioOutcomes={testData().scenarioOutcomes}
    />
  );

describe('kelly editor', () => {
  it('renders / displays submitted scenario', () => {
    const { getByText, getByDisplayValue, container } =
      renderIt();

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

    expect(container).toMatchSnapshot();
  });

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

    expect(getByText(expectedError)).toBeVisible();
  });

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
