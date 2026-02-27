import React from 'react';
import HexColorDisplay from '../index';
import { WARM, COOL } from './data/colorPalettes';

export default {
  title: 'HexColorDisplay/Overview',
  component: HexColorDisplay,
  argTypes: {
    height: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
  },
};

const Template = (args) => <HexColorDisplay {...args} />;

// "Hello, HexColorDisplay! This package visualizes binary data with colors!!"
const defaultBin = [
  0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x48,
  0x65, 0x78, 0x43, 0x6F, 0x6C, 0x6F, 0x72, 0x44,
  0x69, 0x73, 0x70, 0x6C, 0x61, 0x79, 0x21, 0x20,
  0x54, 0x68, 0x69, 0x73, 0x20, 0x70, 0x61, 0x63,
  0x6B, 0x61, 0x67, 0x65, 0x20, 0x76, 0x69, 0x73,
  0x75, 0x61, 0x6C, 0x69, 0x7A, 0x65, 0x73, 0x20,
  0x62, 0x69, 0x6E, 0x61, 0x72, 0x79, 0x20, 0x64,
  0x61, 0x74, 0x61, 0x20, 0x77, 0x69, 0x74, 0x68,
  0x20, 0x63, 0x6F, 0x6C, 0x6F, 0x72, 0x73, 0x21,
  0x21, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
];

const defaultOffsets = [
  {
    start: 0,
    end: 24,
    name: 'Greeting Header',
    color: WARM.orange,
    sublist: [
      { start: 0, end: 7, name: 'Greeting (Hello, )', color: WARM.red },
      { start: 7, end: 22, name: 'Package Name', color: WARM.orange },
      { start: 22, end: 24, name: 'Punctuation', color: WARM.amber },
    ],
  },
  {
    start: 24,
    end: 56,
    name: 'Message Body',
    color: COOL.blue,
    sublist: [
      { start: 24, end: 48, name: 'Description', color: COOL.blue },
      { start: 48, end: 56, name: 'Subject', color: COOL.cyan },
    ],
  },
  {
    start: 56,
    end: 73,
    name: 'Footer',
    color: WARM.pink,
    sublist: [
      { start: 56, end: 71, name: 'Closing Text', color: WARM.pink },
      { start: 71, end: 73, name: 'Exclamation', color: WARM.red },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  bin: defaultBin,
  offsets: defaultOffsets,
  height: 400,
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  bin: [],
  offsets: [],
  height: 200,
};
EmptyData.storyName = 'Empty Data';

export const SingleRow = Template.bind({});
SingleRow.args = {
  bin: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F],
  offsets: [{
    start: 0, end: 16, name: 'Full Row (0x00-0x0F)', color: COOL.teal, sublist: [],
  }],
  height: 200,
};
SingleRow.storyName = 'Single Row';

export const Minimal = Template.bind({});
Minimal.args = {
  bin: [0x48, 0x69, 0x21],
  offsets: [{
    start: 0, end: 3, name: 'Message (Hi!)', color: WARM.yellow, sublist: [],
  }],
  height: 200,
};
