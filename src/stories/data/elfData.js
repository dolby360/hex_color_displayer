import { EARTH } from './colorPalettes';

// Standard ELF64 header - 64 bytes
// Represents a typical Linux x86-64 executable

export const bin = [
  // e_ident[0..3]: Magic number
  0x7F, 0x45, 0x4C, 0x46,
  // e_ident[4]: Class = ELFCLASS64 (2)
  0x02,
  // e_ident[5]: Data = ELFDATA2LSB (1) little-endian
  0x01,
  // e_ident[6]: Version = EV_CURRENT (1)
  0x01,
  // e_ident[7]: OS/ABI = ELFOSABI_LINUX (3)
  0x03,
  // e_ident[8]: ABI Version
  0x00,
  // e_ident[9..15]: Padding (7 bytes)
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,

  // e_type: ET_EXEC (2) - Executable
  0x02, 0x00,
  // e_machine: EM_X86_64 (0x3E)
  0x3E, 0x00,
  // e_version: EV_CURRENT (1)
  0x01, 0x00, 0x00, 0x00,
  // e_entry: Entry point address (0x00401000)
  0x00, 0x10, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
  // e_phoff: Program header offset (0x40 = 64)
  0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // e_shoff: Section header offset (0x1A80)
  0x80, 0x1A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // e_flags
  0x00, 0x00, 0x00, 0x00,
  // e_ehsize: ELF header size (64)
  0x40, 0x00,
  // e_phentsize: Program header entry size (56)
  0x38, 0x00,
  // e_phnum: Number of program headers (9)
  0x09, 0x00,
  // e_shentsize: Section header entry size (64)
  0x40, 0x00,
  // e_shnum: Number of section headers (29)
  0x1D, 0x00,
  // e_shstrndx: Section name string table index (28)
  0x1C, 0x00,
];

export const offsets = [
  {
    start: 0,
    end: 16,
    name: 'ELF Identification',
    color: EARTH.brown,
    sublist: [
      { start: 0, end: 4, name: 'Magic (\\x7fELF)', color: EARTH.brown },
      { start: 4, end: 5, name: 'Class (64-bit)', color: EARTH.green },
      { start: 5, end: 6, name: 'Data (Little-Endian)', color: EARTH.green },
      { start: 6, end: 7, name: 'Version (Current)', color: EARTH.lime },
      { start: 7, end: 8, name: 'OS/ABI (Linux)', color: EARTH.lime },
      { start: 8, end: 9, name: 'ABI Version', color: EARTH.olive },
      { start: 9, end: 16, name: 'Padding', color: EARTH.sage },
    ],
  },
  {
    start: 16,
    end: 24,
    name: 'ELF Type & Machine',
    color: EARTH.green,
    sublist: [
      { start: 16, end: 18, name: 'Type (Executable)', color: EARTH.green },
      { start: 18, end: 20, name: 'Machine (x86-64)', color: EARTH.lime },
      { start: 20, end: 24, name: 'Version', color: EARTH.olive },
    ],
  },
  {
    start: 24,
    end: 48,
    name: 'ELF Addresses',
    color: EARTH.lime,
    sublist: [
      { start: 24, end: 32, name: 'Entry Point (0x401000)', color: EARTH.lime },
      { start: 32, end: 40, name: 'Program Header Offset', color: EARTH.olive },
      { start: 40, end: 48, name: 'Section Header Offset', color: EARTH.sage },
    ],
  },
  {
    start: 48,
    end: 64,
    name: 'ELF Sizes & Counts',
    color: EARTH.olive,
    sublist: [
      { start: 48, end: 52, name: 'Flags', color: EARTH.olive },
      { start: 52, end: 54, name: 'ELF Header Size (64)', color: EARTH.brown },
      { start: 54, end: 56, name: 'PH Entry Size (56)', color: EARTH.green },
      { start: 56, end: 58, name: 'PH Count (9)', color: EARTH.lime },
      { start: 58, end: 60, name: 'SH Entry Size (64)', color: EARTH.olive },
      { start: 60, end: 62, name: 'SH Count (29)', color: EARTH.sage },
      { start: 62, end: 64, name: 'SH String Index (28)', color: EARTH.brown },
    ],
  },
];
