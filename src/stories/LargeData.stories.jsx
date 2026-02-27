import React from 'react';
import HexColorDisplay from '../index';
import { RAINBOW } from './data/colorPalettes';
import { generateRepeatingPattern, generateManySections } from './data/generators';

export default {
  title: 'HexColorDisplay/Performance',
  component: HexColorDisplay,
  argTypes: {
    height: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
  },
};

const Template = (args) => <HexColorDisplay {...args} />;

// --- 1KB: 4 sections of 256 bytes ---
const bin1KB = generateRepeatingPattern(1024);
const offsets1KB = Array.from({ length: 4 }, (_, i) => ({
  start: i * 256,
  end: (i + 1) * 256,
  name: `Block ${String.fromCharCode(65 + i)}`,
  color: RAINBOW[i * 4],
  sublist: [],
}));

export const OneKB = Template.bind({});
OneKB.args = { bin: bin1KB, offsets: offsets1KB, height: 400 };
OneKB.storyName = '1KB Data';

// --- 10KB: 10 sections of 1024 bytes ---
const bin10KB = generateRepeatingPattern(10240);
const offsets10KB = Array.from({ length: 10 }, (_, i) => ({
  start: i * 1024,
  end: (i + 1) * 1024,
  name: `Segment ${String(i).padStart(2, '0')}`,
  color: RAINBOW[i % RAINBOW.length],
  sublist: [],
}));

export const TenKB = Template.bind({});
TenKB.args = { bin: bin10KB, offsets: offsets10KB, height: 600 };
TenKB.storyName = '10KB Data';

// --- 64KB: 16 sections of 4096 bytes ---
const bin64KB = generateRepeatingPattern(65536);
const offsets64KB = Array.from({ length: 16 }, (_, i) => ({
  start: i * 4096,
  end: (i + 1) * 4096,
  name: `Region ${String(i).padStart(2, '0')}`,
  color: RAINBOW[i],
  sublist: [],
}));

export const SixtyFourKB = Template.bind({});
SixtyFourKB.args = { bin: bin64KB, offsets: offsets64KB, height: 600 };
SixtyFourKB.storyName = '64KB Data';

// --- Many Sections: 256 sections of 8 bytes = 2048 bytes ---
const manyResult = generateManySections(256, 8);

export const ManySections = Template.bind({});
ManySections.args = { bin: manyResult.bin, offsets: manyResult.offsets, height: 600 };
ManySections.storyName = 'Many Sections';
