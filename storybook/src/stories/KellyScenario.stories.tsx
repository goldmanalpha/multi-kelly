import React from 'react';
import { Scenario } from 'multi-kelly';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';

export default {
  title: 'Kelly/Table',
  component: Scenario,
} as Meta;

const Template: Story<any> = (
  args: ComponentProps<typeof Scenario>
) => <Scenario {...args} />;

export const Single = Template.bind({});
Single.args = {
  name: 'Fraud',
  description:
    'Complete loss due to fraud: e.g. Enron, Luckin, Wirecard',
  probabilityPct: 4,
  expectedReturnPct: 0,
};

export const Double = Template.bind({});
Double.args = {
  name: 'Double',
  description: 'Rosy Scenario',
  probabilityPct: 25,
  expectedReturnPct: 100,
};
