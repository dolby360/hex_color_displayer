import React from 'react';
import HexColorDisplay from '../index';
import { RAINBOW, WARM, COOL, EARTH } from './data/colorPalettes';

export default {
  title: 'HexColorDisplay/Features',
  component: HexColorDisplay,
  argTypes: {
    height: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
  },
};

const Template = (args) => <HexColorDisplay {...args} />;

// --- Color Palette: 16 sections x 8 bytes = 128 bytes, each with a different RAINBOW color ---
const colorBin = Array.from({ length: 128 }, (_, i) => i);
const colorOffsets = Array.from({ length: 16 }, (_, i) => ({
  start: i * 8,
  end: (i + 1) * 8,
  name: `Section ${String(i + 1).padStart(2, '0')}`,
  color: RAINBOW[i],
  sublist: [],
}));

export const ColorPalette = Template.bind({});
ColorPalette.args = { bin: colorBin, offsets: colorOffsets, height: 400 };
ColorPalette.storyName = 'Color Palette';

// --- Nested Sublists: 3 parents with multiple subsections each ---
const nestedBin = Array.from({ length: 96 }, (_, i) => (i * 7 + 0x20) % 128);
const nestedOffsets = [
  {
    start: 0,
    end: 32,
    name: 'File Metadata',
    color: WARM.orange,
    sublist: [
      { start: 0, end: 4, name: 'Magic Number', color: WARM.red },
      { start: 4, end: 8, name: 'Version', color: WARM.orange },
      { start: 8, end: 16, name: 'Timestamp', color: WARM.amber },
      { start: 16, end: 20, name: 'Author ID', color: WARM.yellow },
      { start: 20, end: 24, name: 'Checksum', color: WARM.pink },
      { start: 24, end: 32, name: 'Reserved', color: WARM.red },
    ],
  },
  {
    start: 32,
    end: 72,
    name: 'Data Payload',
    color: COOL.blue,
    sublist: [
      { start: 32, end: 36, name: 'Record Type', color: COOL.blue },
      { start: 36, end: 40, name: 'Record Length', color: COOL.cyan },
      { start: 40, end: 56, name: 'Record Data', color: COOL.teal },
      { start: 56, end: 72, name: 'Record Padding', color: COOL.indigo },
    ],
  },
  {
    start: 72,
    end: 96,
    name: 'Integrity Block',
    color: EARTH.green,
    sublist: [
      { start: 72, end: 76, name: 'Block Signature', color: EARTH.brown },
      { start: 76, end: 84, name: 'SHA-256 Hash', color: EARTH.green },
      { start: 84, end: 88, name: 'CRC-32', color: EARTH.lime },
      { start: 88, end: 92, name: 'HMAC Tag', color: EARTH.olive },
      { start: 92, end: 96, name: 'Footer', color: EARTH.sage },
    ],
  },
];

export const NestedSublists = Template.bind({});
NestedSublists.args = { bin: nestedBin, offsets: nestedOffsets, height: 400 };
NestedSublists.storyName = 'Nested Sublists';

// --- Unlabeled Gaps: offsets cover only first 16 bytes, rest is "unlabeled" ---
const gapBin = Array.from({ length: 64 }, (_, i) => (i + 0x41) % 128);
const gapOffsets = [
  {
    start: 0,
    end: 8,
    name: 'Known Header',
    color: WARM.red,
    sublist: [],
  },
  {
    start: 8,
    end: 16,
    name: 'Known Footer',
    color: COOL.blue,
    sublist: [],
  },
];

export const UnlabeledGaps = Template.bind({});
UnlabeledGaps.args = { bin: gapBin, offsets: gapOffsets, height: 400 };
UnlabeledGaps.storyName = 'Unlabeled Gaps';

// --- Mixed ASCII: printable, non-printable, and mixed bytes ---
const mixedBin = [
  // Row 1: All printable ASCII ("Hello, World!!!")
  0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x57,
  0x6F, 0x72, 0x6C, 0x64, 0x21, 0x21, 0x21, 0x20,
  // Row 2: All non-printable (0x00-0x0F) - shows as "." in dump
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
  // Row 3: Mixed - alternating printable and non-printable
  0x41, 0x00, 0x42, 0x01, 0x43, 0x02, 0x44, 0x03,
  0x7E, 0x80, 0x7D, 0x81, 0x7C, 0xFF, 0x7B, 0xFE,
];
const mixedOffsets = [
  {
    start: 0,
    end: 16,
    name: 'Printable ASCII',
    color: EARTH.green,
    sublist: [],
  },
  {
    start: 16,
    end: 32,
    name: 'Non-Printable (Control Chars)',
    color: WARM.red,
    sublist: [],
  },
  {
    start: 32,
    end: 48,
    name: 'Mixed Printable & Non-Printable',
    color: COOL.purple,
    sublist: [],
  },
];

export const MixedASCII = Template.bind({});
MixedASCII.args = { bin: mixedBin, offsets: mixedOffsets, height: 300 };
MixedASCII.storyName = 'Mixed ASCII';
