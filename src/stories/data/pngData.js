import { WARM } from './colorPalettes';

// Real PNG file: 8-byte signature + IHDR chunk (25 bytes) + IDAT stub (20 bytes) + IEND (12 bytes)
// Total: 65 bytes

export const bin = [
  // PNG Signature (8 bytes)
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,

  // IHDR Chunk Length (4 bytes) = 13
  0x00, 0x00, 0x00, 0x0D,
  // IHDR Chunk Type (4 bytes) = "IHDR"
  0x49, 0x48, 0x44, 0x52,
  // Width (4 bytes) = 256
  0x00, 0x00, 0x01, 0x00,
  // Height (4 bytes) = 128
  0x00, 0x00, 0x00, 0x80,
  // Bit Depth (1 byte) = 8
  0x08,
  // Color Type (1 byte) = 2 (RGB)
  0x02,
  // Compression (1 byte)
  0x00,
  // Filter (1 byte)
  0x00,
  // Interlace (1 byte)
  0x00,
  // IHDR CRC (4 bytes)
  0x4E, 0x93, 0x42, 0xE9,

  // IDAT Chunk Length (4 bytes)
  0x00, 0x00, 0x00, 0x08,
  // IDAT Chunk Type (4 bytes) = "IDAT"
  0x49, 0x44, 0x41, 0x54,
  // IDAT Data (8 bytes - compressed pixel data stub)
  0x78, 0x9C, 0x62, 0x60, 0x00, 0x00, 0x00, 0x04,
  // IDAT CRC (4 bytes)
  0x00, 0x01, 0xAC, 0xC3,

  // IEND Chunk Length (4 bytes) = 0
  0x00, 0x00, 0x00, 0x00,
  // IEND Chunk Type (4 bytes) = "IEND"
  0x49, 0x45, 0x4E, 0x44,
  // IEND CRC (4 bytes)
  0xAE, 0x42, 0x60, 0x82,
];

export const offsets = [
  {
    start: 0,
    end: 8,
    name: 'PNG Signature',
    color: WARM.red,
    sublist: [],
  },
  {
    start: 8,
    end: 33,
    name: 'IHDR Chunk',
    color: WARM.orange,
    sublist: [
      { start: 8, end: 12, name: 'IHDR Length', color: WARM.orange },
      { start: 12, end: 16, name: 'IHDR Type', color: WARM.amber },
      { start: 16, end: 20, name: 'Width (256px)', color: WARM.yellow },
      { start: 20, end: 24, name: 'Height (128px)', color: WARM.yellow },
      { start: 24, end: 25, name: 'Bit Depth (8)', color: WARM.pink },
      { start: 25, end: 26, name: 'Color Type (RGB)', color: WARM.pink },
      { start: 26, end: 27, name: 'Compression', color: WARM.red },
      { start: 27, end: 28, name: 'Filter', color: WARM.red },
      { start: 28, end: 29, name: 'Interlace', color: WARM.red },
      { start: 29, end: 33, name: 'IHDR CRC', color: WARM.orange },
    ],
  },
  {
    start: 33,
    end: 53,
    name: 'IDAT Chunk',
    color: WARM.amber,
    sublist: [
      { start: 33, end: 37, name: 'IDAT Length', color: WARM.amber },
      { start: 37, end: 41, name: 'IDAT Type', color: WARM.yellow },
      { start: 41, end: 49, name: 'Compressed Data', color: WARM.pink },
      { start: 49, end: 53, name: 'IDAT CRC', color: WARM.amber },
    ],
  },
  {
    start: 53,
    end: 65,
    name: 'IEND Chunk',
    color: WARM.yellow,
    sublist: [
      { start: 53, end: 57, name: 'IEND Length (0)', color: WARM.yellow },
      { start: 57, end: 61, name: 'IEND Type', color: WARM.pink },
      { start: 61, end: 65, name: 'IEND CRC', color: WARM.red },
    ],
  },
];
