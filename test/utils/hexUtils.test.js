import {
  byteToHex,
  byteToAscii,
  formatAddress,
  buildItemData,
  computeItemStyles,
  splitIntoRows,
  buildSectionIndex,
  lookupSection,
  getStyleForByte,
  getRowCount,
  getRowItems,
} from '../../src/utils/hexUtils';

describe('byteToHex', () => {
  test('converts 0 to "00"', () => {
    expect(byteToHex(0)).toBe('00');
  });

  test('converts 255 to "ff"', () => {
    expect(byteToHex(255)).toBe('ff');
  });

  test('converts 10 to "0a"', () => {
    expect(byteToHex(10)).toBe('0a');
  });

  test('converts 16 to "10"', () => {
    expect(byteToHex(16)).toBe('10');
  });
});

describe('byteToAscii', () => {
  test('printable character "a" (97)', () => {
    expect(byteToAscii(97)).toBe('a');
  });

  test('non-printable byte 0 returns "."', () => {
    expect(byteToAscii(0)).toBe('.');
  });

  test('byte 127 (DEL) returns "."', () => {
    expect(byteToAscii(127)).toBe('.');
  });

  test('byte 31 (control) returns "."', () => {
    expect(byteToAscii(31)).toBe('.');
  });

  test('byte 32 (space) returns " "', () => {
    expect(byteToAscii(32)).toBe(' ');
  });

  test('byte 126 (~) returns "~"', () => {
    expect(byteToAscii(126)).toBe('~');
  });
});

describe('formatAddress', () => {
  test('offset 0', () => {
    expect(formatAddress(0)).toBe('00000 0 :');
  });

  test('offset 16 (0x10)', () => {
    expect(formatAddress(16)).toBe('0000 10 :');
  });

  test('offset 256 (0x100)', () => {
    expect(formatAddress(256)).toBe('000 100 :');
  });
});

describe('buildItemData', () => {
  test('simple single section, no sublists', () => {
    const bin = [65, 66, 67];
    const offsets = [{ start: 0, end: 3, name: 'Header', color: '', sublist: [] }];
    const items = buildItemData(bin, offsets);

    expect(items).toHaveLength(3);
    expect(items[0].hexString).toBe('41');
    expect(items[0].asciiChar).toBe('A');
    expect(items[0].gId).toBe(0);
    expect(items[0].name).toBe('Header');
  });

  test('trailing unlabeled bytes get gId -1', () => {
    const bin = [65, 66, 67, 68, 69];
    const offsets = [{ start: 0, end: 3, name: 'Header', color: '', sublist: [] }];
    const items = buildItemData(bin, offsets);

    expect(items).toHaveLength(5);
    expect(items[3].gId).toBe(-1);
    expect(items[3].name).toBe('unlabeled');
    expect(items[4].gId).toBe(-1);
  });

  test('section with sublists', () => {
    const bin = [65, 66, 67, 68, 69, 70];
    const offsets = [{
      start: 0,
      end: 6,
      name: 'parent',
      color: '',
      sublist: [
        { start: 0, end: 3, name: 'sub1', color: '', sublist: [] },
        { start: 3, end: 6, name: 'sub2', color: '', sublist: [] },
      ],
    }];
    const items = buildItemData(bin, offsets);

    expect(items).toHaveLength(6);
    expect(items[0].gId).toBe(0);
    expect(items[5].gId).toBe(0);
    expect(items[0].name).toBe('sub1');
    expect(items[3].name).toBe('sub2');
  });

  test('multiple sections get incrementing gIds', () => {
    const bin = [65, 66, 67, 68];
    const offsets = [
      { start: 0, end: 2, name: 'sec1', color: '', sublist: [] },
      { start: 2, end: 4, name: 'sec2', color: '', sublist: [] },
    ];
    const items = buildItemData(bin, offsets);

    expect(items[0].gId).toBe(0);
    expect(items[1].gId).toBe(0);
    expect(items[2].gId).toBe(1);
    expect(items[3].gId).toBe(1);
  });
});

describe('computeItemStyles', () => {
  const items = [
    { gId: 0 }, { gId: 0 }, { gId: 0 },
    { gId: 1 }, { gId: 1 },
    { gId: -1 },
  ];

  test('no hover - all disabled', () => {
    const styles = computeItemStyles(items, null);
    expect(styles.every((s) => s === 'item_disabled')).toBe(true);
  });

  test('hover on group 0 item 1 - group highlights', () => {
    const styles = computeItemStyles(items, 1);
    expect(styles[0]).toBe('item_part_of_group');
    expect(styles[1]).toBe('item_active');
    expect(styles[2]).toBe('item_part_of_group');
    expect(styles[3]).toBe('item_disabled');
    expect(styles[4]).toBe('item_disabled');
    expect(styles[5]).toBe('item_disabled');
  });

  test('hover on unlabeled (gId -1) highlights only that item', () => {
    const styles = computeItemStyles(items, 5);
    expect(styles[5]).toBe('item_active');
    expect(styles.filter((s) => s !== 'item_disabled')).toHaveLength(1);
  });

  test('hover on group 1', () => {
    const styles = computeItemStyles(items, 3);
    expect(styles[0]).toBe('item_disabled');
    expect(styles[3]).toBe('item_active');
    expect(styles[4]).toBe('item_part_of_group');
  });
});

describe('splitIntoRows', () => {
  test('items fitting exactly in one row', () => {
    const items = Array.from({ length: 16 }, (_, i) => ({
      hexString: byteToHex(i),
      asciiChar: '.',
      gId: 0,
      name: 'test',
    }));
    const rows = splitIntoRows(items);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveLength(16);
  });

  test('17 items produces 2 rows, second padded to 16', () => {
    const items = Array.from({ length: 17 }, (_, i) => ({
      hexString: byteToHex(i),
      asciiChar: '.',
      gId: 0,
      name: 'test',
    }));
    const rows = splitIntoRows(items);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveLength(16);
    expect(rows[1]).toHaveLength(16);
    expect(rows[1][0].isPadding).toBeUndefined();
    expect(rows[1][1].isPadding).toBe(true);
  });

  test('empty items returns empty rows', () => {
    const rows = splitIntoRows([]);
    expect(rows).toHaveLength(0);
  });
});

// --- Tests for optimized API ---

describe('buildSectionIndex', () => {
  test('simple single section, no sublists', () => {
    const offsets = [{ start: 0, end: 3, name: 'Header', color: 'red', sublist: [] }];
    const index = buildSectionIndex(offsets, 3);

    expect(index).toHaveLength(1);
    expect(index[0]).toEqual({ start: 0, end: 3, gId: 0, name: 'Header', color: 'red' });
  });

  test('trailing unlabeled bytes produce an extra entry', () => {
    const offsets = [{ start: 0, end: 3, name: 'Header', color: '', sublist: [] }];
    const index = buildSectionIndex(offsets, 5);

    expect(index).toHaveLength(2);
    expect(index[1]).toEqual({ start: 3, end: 5, gId: -1, name: 'unlabeled', color: '' });
  });

  test('section with sublists flattens correctly', () => {
    const offsets = [{
      start: 0,
      end: 6,
      name: 'parent',
      color: '',
      sublist: [
        { start: 0, end: 3, name: 'sub1', color: 'blue', sublist: [] },
        { start: 3, end: 6, name: 'sub2', color: 'green', sublist: [] },
      ],
    }];
    const index = buildSectionIndex(offsets, 6);

    expect(index).toHaveLength(2);
    expect(index[0]).toEqual({ start: 0, end: 3, gId: 0, name: 'sub1', color: 'blue' });
    expect(index[1]).toEqual({ start: 3, end: 6, gId: 0, name: 'sub2', color: 'green' });
  });

  test('pre-sub gap is included when section.start < first sublist.start', () => {
    const offsets = [{
      start: 0,
      end: 6,
      name: 'parent',
      color: 'red',
      sublist: [
        { start: 2, end: 4, name: 'sub1', color: '', sublist: [] },
      ],
    }];
    const index = buildSectionIndex(offsets, 6);

    expect(index[0]).toEqual({ start: 0, end: 2, gId: 0, name: 'parent', color: 'red' });
    expect(index[1]).toEqual({ start: 2, end: 4, gId: 0, name: 'sub1', color: '' });
  });

  test('multiple sections get incrementing gIds', () => {
    const offsets = [
      { start: 0, end: 2, name: 'sec1', color: '', sublist: [] },
      { start: 2, end: 4, name: 'sec2', color: '', sublist: [] },
    ];
    const index = buildSectionIndex(offsets, 4);

    expect(index).toHaveLength(2);
    expect(index[0].gId).toBe(0);
    expect(index[1].gId).toBe(1);
  });

  test('empty offsets with data produces only unlabeled', () => {
    const index = buildSectionIndex([], 10);

    expect(index).toHaveLength(1);
    expect(index[0]).toEqual({ start: 0, end: 10, gId: -1, name: 'unlabeled', color: '' });
  });
});

describe('lookupSection', () => {
  const sectionIndex = [
    { start: 0, end: 3, gId: 0, name: 'sec0', color: '' },
    { start: 3, end: 6, gId: 0, name: 'sec0b', color: '' },
    { start: 10, end: 15, gId: 1, name: 'sec1', color: 'red' },
  ];

  test('byte at start of section', () => {
    expect(lookupSection(sectionIndex, 0).name).toBe('sec0');
    expect(lookupSection(sectionIndex, 3).name).toBe('sec0b');
    expect(lookupSection(sectionIndex, 10).name).toBe('sec1');
  });

  test('byte in middle of section', () => {
    expect(lookupSection(sectionIndex, 1).name).toBe('sec0');
    expect(lookupSection(sectionIndex, 12).name).toBe('sec1');
  });

  test('byte at last position of section (end - 1)', () => {
    expect(lookupSection(sectionIndex, 2).name).toBe('sec0');
    expect(lookupSection(sectionIndex, 14).name).toBe('sec1');
  });

  test('byte in gap between sections returns unlabeled sentinel', () => {
    const result = lookupSection(sectionIndex, 7);
    expect(result.gId).toBe(-1);
    expect(result.name).toBe('unlabeled');
  });

  test('byte beyond all sections returns unlabeled sentinel', () => {
    const result = lookupSection(sectionIndex, 100);
    expect(result.gId).toBe(-1);
  });
});

describe('getStyleForByte', () => {
  const sectionIndex = [
    { start: 0, end: 3, gId: 0, name: 'a', color: '' },
    { start: 3, end: 5, gId: 1, name: 'b', color: '' },
    { start: 5, end: 6, gId: -1, name: 'unlabeled', color: '' },
  ];

  test('no hover returns item_disabled', () => {
    expect(getStyleForByte(sectionIndex, null, null, 0)).toBe('item_disabled');
    expect(getStyleForByte(sectionIndex, undefined, null, 0)).toBe('item_disabled');
  });

  test('hovered byte returns item_active', () => {
    expect(getStyleForByte(sectionIndex, 1, 0, 1)).toBe('item_active');
  });

  test('same group as hovered returns item_part_of_group', () => {
    expect(getStyleForByte(sectionIndex, 1, 0, 0)).toBe('item_part_of_group');
    expect(getStyleForByte(sectionIndex, 1, 0, 2)).toBe('item_part_of_group');
  });

  test('different group returns item_disabled', () => {
    expect(getStyleForByte(sectionIndex, 1, 0, 3)).toBe('item_disabled');
    expect(getStyleForByte(sectionIndex, 1, 0, 4)).toBe('item_disabled');
  });

  test('hover on unlabeled (gId -1) highlights only that byte', () => {
    expect(getStyleForByte(sectionIndex, 5, -1, 5)).toBe('item_active');
    expect(getStyleForByte(sectionIndex, 5, -1, 0)).toBe('item_disabled');
    expect(getStyleForByte(sectionIndex, 5, -1, 3)).toBe('item_disabled');
  });
});

describe('getRowCount', () => {
  test('exact multiple of 16', () => {
    expect(getRowCount(16)).toBe(1);
    expect(getRowCount(32)).toBe(2);
  });

  test('non-multiple rounds up', () => {
    expect(getRowCount(1)).toBe(1);
    expect(getRowCount(17)).toBe(2);
    expect(getRowCount(33)).toBe(3);
  });

  test('zero length returns 0', () => {
    expect(getRowCount(0)).toBe(0);
  });
});

describe('getRowItems', () => {
  const bin = [65, 66, 67, 68, 69, 70];
  const offsets = [
    { start: 0, end: 3, name: 'sec1', color: '', sublist: [] },
    { start: 3, end: 6, name: 'sec2', color: 'red', sublist: [] },
  ];
  const sectionIndex = buildSectionIndex(offsets, bin.length);

  test('row 0 returns correct hex and ascii', () => {
    const row = getRowItems(bin, sectionIndex, 0);
    expect(row).toHaveLength(16);
    expect(row[0].hexString).toBe('41');
    expect(row[0].asciiChar).toBe('A');
    expect(row[0].name).toBe('sec1');
    expect(row[0].gId).toBe(0);
    expect(row[3].name).toBe('sec2');
    expect(row[3].gId).toBe(1);
    expect(row[3].color).toBe('red');
  });

  test('partial last row is padded to 16', () => {
    const row = getRowItems(bin, sectionIndex, 0);
    expect(row[5].hexString).toBe('46');
    expect(row[5].isPadding).toBeUndefined();
    expect(row[6].isPadding).toBe(true);
    expect(row[6].hexString).toBe('.');
    expect(row[15].isPadding).toBe(true);
  });

  test('matches buildItemData + splitIntoRows for same data', () => {
    const legacyItems = buildItemData(bin, offsets);
    const legacyRows = splitIntoRows(legacyItems);
    const newRow = getRowItems(bin, sectionIndex, 0);

    for (let i = 0; i < bin.length; i++) {
      expect(newRow[i].hexString).toBe(legacyRows[0][i].hexString);
      expect(newRow[i].asciiChar).toBe(legacyRows[0][i].asciiChar);
      expect(newRow[i].name).toBe(legacyRows[0][i].name);
      expect(newRow[i].gId).toBe(legacyRows[0][i].gId);
    }
  });
});
