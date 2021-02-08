import React from 'react';
import { KellyUi } from 'multi-kelly';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Kelly/Table',
  component: KellyUi,
} as Meta;

const Template: Story<any> = () => <KellyUi />;

export const Single = Template.bind({});
Single.args = {};

export const Double = Template.bind({});
Double.args = {};
