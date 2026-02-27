import { WARM, COOL } from './colorPalettes';

// ZIP file containing "hello.txt" with content "Hello World!\n"
// Local File Header (30 + 9 filename) + Data (13) + Central Dir (46 + 9) + EOCD (22) = 129 bytes

const filename = [0x68, 0x65, 0x6C, 0x6C, 0x6F, 0x2E, 0x74, 0x78, 0x74]; // "hello.txt"
const fileData = [0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21, 0x0A]; // "Hello World!\n"

export const bin = [
  // === Local File Header (39 bytes) ===
  // Signature
  0x50, 0x4B, 0x03, 0x04,
  // Version needed (2.0)
  0x14, 0x00,
  // General purpose flags
  0x00, 0x00,
  // Compression method (0 = stored)
  0x00, 0x00,
  // Last mod time
  0x6D, 0x79,
  // Last mod date
  0x54, 0x57,
  // CRC-32
  0xD7, 0x87, 0xBB, 0x0E,
  // Compressed size (13)
  0x0D, 0x00, 0x00, 0x00,
  // Uncompressed size (13)
  0x0D, 0x00, 0x00, 0x00,
  // Filename length (9)
  0x09, 0x00,
  // Extra field length (0)
  0x00, 0x00,
  // Filename: "hello.txt"
  ...filename,

  // === File Data (13 bytes) ===
  ...fileData,

  // === Central Directory Header (55 bytes) ===
  // Signature
  0x50, 0x4B, 0x01, 0x02,
  // Version made by
  0x1E, 0x03,
  // Version needed
  0x14, 0x00,
  // General purpose flags
  0x00, 0x00,
  // Compression method (stored)
  0x00, 0x00,
  // Last mod time
  0x6D, 0x79,
  // Last mod date
  0x54, 0x57,
  // CRC-32
  0xD7, 0x87, 0xBB, 0x0E,
  // Compressed size
  0x0D, 0x00, 0x00, 0x00,
  // Uncompressed size
  0x0D, 0x00, 0x00, 0x00,
  // Filename length (9)
  0x09, 0x00,
  // Extra field length
  0x00, 0x00,
  // Comment length
  0x00, 0x00,
  // Disk number start
  0x00, 0x00,
  // Internal attributes
  0x01, 0x00,
  // External attributes
  0x00, 0x00, 0xA4, 0x81,
  // Relative offset of local header
  0x00, 0x00, 0x00, 0x00,
  // Filename: "hello.txt"
  ...filename,

  // === End of Central Directory Record (22 bytes) ===
  // Signature
  0x50, 0x4B, 0x05, 0x06,
  // Disk number
  0x00, 0x00,
  // Disk with central dir
  0x00, 0x00,
  // Entries on this disk
  0x01, 0x00,
  // Total entries
  0x01, 0x00,
  // Central dir size (55)
  0x37, 0x00, 0x00, 0x00,
  // Central dir offset (52)
  0x34, 0x00, 0x00, 0x00,
  // Comment length
  0x00, 0x00,
];

export const offsets = [
  {
    start: 0,
    end: 39,
    name: 'Local File Header',
    color: WARM.orange,
    sublist: [
      { start: 0, end: 4, name: 'LFH Signature (PK\\x03\\x04)', color: WARM.red },
      { start: 4, end: 6, name: 'Version Needed (2.0)', color: WARM.orange },
      { start: 6, end: 8, name: 'General Flags', color: WARM.orange },
      { start: 8, end: 10, name: 'Compression (Stored)', color: WARM.amber },
      { start: 10, end: 14, name: 'Last Modified', color: WARM.yellow },
      { start: 14, end: 18, name: 'CRC-32', color: WARM.pink },
      { start: 18, end: 22, name: 'Compressed Size (13)', color: WARM.red },
      { start: 22, end: 26, name: 'Uncompressed Size (13)', color: WARM.red },
      { start: 26, end: 28, name: 'Filename Length (9)', color: WARM.orange },
      { start: 28, end: 30, name: 'Extra Field Length (0)', color: WARM.orange },
      { start: 30, end: 39, name: 'Filename (hello.txt)', color: WARM.amber },
    ],
  },
  {
    start: 39,
    end: 52,
    name: 'File Data',
    color: WARM.yellow,
    sublist: [],
  },
  {
    start: 52,
    end: 107,
    name: 'Central Directory',
    color: COOL.blue,
    sublist: [
      { start: 52, end: 56, name: 'CD Signature (PK\\x01\\x02)', color: COOL.blue },
      { start: 56, end: 58, name: 'Version Made By', color: COOL.cyan },
      { start: 58, end: 60, name: 'Version Needed', color: COOL.cyan },
      { start: 60, end: 62, name: 'General Flags', color: COOL.teal },
      { start: 62, end: 64, name: 'Compression (Stored)', color: COOL.teal },
      { start: 64, end: 68, name: 'Last Modified', color: COOL.indigo },
      { start: 68, end: 72, name: 'CRC-32', color: COOL.purple },
      { start: 72, end: 76, name: 'Compressed Size', color: COOL.blue },
      { start: 76, end: 80, name: 'Uncompressed Size', color: COOL.blue },
      { start: 80, end: 82, name: 'Filename Length (9)', color: COOL.cyan },
      { start: 82, end: 84, name: 'Extra Field Length', color: COOL.cyan },
      { start: 84, end: 86, name: 'Comment Length', color: COOL.teal },
      { start: 86, end: 88, name: 'Disk Number', color: COOL.teal },
      { start: 88, end: 90, name: 'Internal Attributes', color: COOL.indigo },
      { start: 90, end: 94, name: 'External Attributes', color: COOL.indigo },
      { start: 94, end: 98, name: 'Local Header Offset', color: COOL.purple },
      { start: 98, end: 107, name: 'Filename (hello.txt)', color: COOL.blue },
    ],
  },
  {
    start: 107,
    end: 129,
    name: 'End of Central Directory',
    color: COOL.purple,
    sublist: [
      { start: 107, end: 111, name: 'EOCD Signature (PK\\x05\\x06)', color: COOL.purple },
      { start: 111, end: 113, name: 'Disk Number', color: COOL.indigo },
      { start: 113, end: 115, name: 'Disk w/ Central Dir', color: COOL.indigo },
      { start: 115, end: 117, name: 'Entries This Disk (1)', color: COOL.teal },
      { start: 117, end: 119, name: 'Total Entries (1)', color: COOL.teal },
      { start: 119, end: 123, name: 'Central Dir Size (55)', color: COOL.cyan },
      { start: 123, end: 127, name: 'Central Dir Offset (52)', color: COOL.cyan },
      { start: 127, end: 129, name: 'Comment Length (0)', color: COOL.blue },
    ],
  },
];
