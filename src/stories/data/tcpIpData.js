import { COOL } from './colorPalettes';

// HTTP GET request over TCP/IP with Ethernet frame
// Ethernet (14) + IPv4 (20) + TCP (20) + Payload (20) = 74 bytes

export const bin = [
  // Ethernet Header (14 bytes)
  // Destination MAC: ff:ff:ff:ff:ff:ff
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  // Source MAC: aa:bb:cc:dd:ee:01
  0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0x01,
  // EtherType: 0x0800 (IPv4)
  0x08, 0x00,

  // IPv4 Header (20 bytes)
  // Version (4) + IHL (5) = 0x45
  0x45,
  // DSCP + ECN
  0x00,
  // Total Length: 60
  0x00, 0x3C,
  // Identification
  0xAB, 0xCD,
  // Flags + Fragment Offset
  0x40, 0x00,
  // TTL: 64
  0x40,
  // Protocol: 6 (TCP)
  0x06,
  // Header Checksum
  0xA6, 0xEC,
  // Source IP: 192.168.1.100
  0xC0, 0xA8, 0x01, 0x64,
  // Destination IP: 93.184.216.34
  0x5D, 0xB8, 0xD8, 0x22,

  // TCP Header (20 bytes)
  // Source Port: 49152
  0xC0, 0x00,
  // Destination Port: 80 (HTTP)
  0x00, 0x50,
  // Sequence Number
  0x00, 0x00, 0x00, 0x01,
  // Acknowledgment Number
  0x00, 0x00, 0x00, 0x00,
  // Data Offset (5) + Reserved + Flags (SYN+ACK)
  0x50, 0x12,
  // Window Size: 65535
  0xFF, 0xFF,
  // Checksum
  0x7C, 0x29,
  // Urgent Pointer
  0x00, 0x00,

  // HTTP Payload (20 bytes)
  // "GET / HTTP/1.0\r\n\r\n" padded with 0x00
  0x47, 0x45, 0x54, 0x20, 0x2F, 0x20, 0x48, 0x54,
  0x54, 0x50, 0x2F, 0x31, 0x2E, 0x30, 0x0D, 0x0A,
  0x0D, 0x0A, 0x00, 0x00,
];

export const offsets = [
  {
    start: 0,
    end: 14,
    name: 'Ethernet Header',
    color: COOL.blue,
    sublist: [
      { start: 0, end: 6, name: 'Dest MAC (ff:ff:ff:ff:ff:ff)', color: COOL.blue },
      { start: 6, end: 12, name: 'Src MAC (aa:bb:cc:dd:ee:01)', color: COOL.cyan },
      { start: 12, end: 14, name: 'EtherType (IPv4)', color: COOL.teal },
    ],
  },
  {
    start: 14,
    end: 34,
    name: 'IPv4 Header',
    color: COOL.cyan,
    sublist: [
      { start: 14, end: 15, name: 'Version + IHL', color: COOL.cyan },
      { start: 15, end: 16, name: 'DSCP + ECN', color: COOL.cyan },
      { start: 16, end: 18, name: 'Total Length (60)', color: COOL.teal },
      { start: 18, end: 20, name: 'Identification', color: COOL.teal },
      { start: 20, end: 22, name: 'Flags + Fragment', color: COOL.blue },
      { start: 22, end: 23, name: 'TTL (64)', color: COOL.indigo },
      { start: 23, end: 24, name: 'Protocol (TCP)', color: COOL.indigo },
      { start: 24, end: 26, name: 'Header Checksum', color: COOL.purple },
      { start: 26, end: 30, name: 'Src IP (192.168.1.100)', color: COOL.blue },
      { start: 30, end: 34, name: 'Dst IP (93.184.216.34)', color: COOL.cyan },
    ],
  },
  {
    start: 34,
    end: 54,
    name: 'TCP Header',
    color: COOL.indigo,
    sublist: [
      { start: 34, end: 36, name: 'Src Port (49152)', color: COOL.indigo },
      { start: 36, end: 38, name: 'Dst Port (80)', color: COOL.purple },
      { start: 38, end: 42, name: 'Sequence Number', color: COOL.indigo },
      { start: 42, end: 46, name: 'Acknowledgment', color: COOL.purple },
      { start: 46, end: 48, name: 'Offset + Flags (SYN+ACK)', color: COOL.teal },
      { start: 48, end: 50, name: 'Window Size (65535)', color: COOL.blue },
      { start: 50, end: 52, name: 'Checksum', color: COOL.cyan },
      { start: 52, end: 54, name: 'Urgent Pointer', color: COOL.teal },
    ],
  },
  {
    start: 54,
    end: 74,
    name: 'HTTP Payload',
    color: COOL.purple,
    sublist: [],
  },
];
