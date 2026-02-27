import React from 'react';
import HexColorDisplay from '../index';
import { bin as pngBin, offsets as pngOffsets } from './data/pngData';
import { bin as tcpBin, offsets as tcpOffsets } from './data/tcpIpData';
import { bin as elfBin, offsets as elfOffsets } from './data/elfData';
import { bin as zipBin, offsets as zipOffsets } from './data/zipData';

export default {
  title: 'HexColorDisplay/File Formats',
  component: HexColorDisplay,
  argTypes: {
    height: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
  },
};

const Template = (args) => <HexColorDisplay {...args} />;

export const PNGHeader = Template.bind({});
PNGHeader.args = { bin: pngBin, offsets: pngOffsets, height: 400 };
PNGHeader.storyName = 'PNG Header';

export const TCPIPPacket = Template.bind({});
TCPIPPacket.args = { bin: tcpBin, offsets: tcpOffsets, height: 400 };
TCPIPPacket.storyName = 'TCP/IP Packet';

export const ELFHeader = Template.bind({});
ELFHeader.args = { bin: elfBin, offsets: elfOffsets, height: 400 };
ELFHeader.storyName = 'ELF Header';

export const ZIPFile = Template.bind({});
ZIPFile.args = { bin: zipBin, offsets: zipOffsets, height: 500 };
ZIPFile.storyName = 'ZIP File';
