export function byteToHex(byte) {
  return byte.toString(16).padStart(2, '0');
}

export function byteToAscii(byte) {
  return byte > 31 && byte < 127 ? String.fromCharCode(byte) : '.';
}

export function formatAddress(offset) {
  const hexString = offset.toString(16);
  const pad = '000000';
  return `${pad.substring(0, pad.length - hexString.length)} ${hexString} :`;
}

export function buildItemData(bin, offsets) {
  const items = [];
  let gid = 0;

  offsets.forEach((section) => {
    let startIndex = section.start;

    if (section.sublist && section.sublist.length > 0) {
      const preSubBytes = bin.slice(section.start, section.sublist[0].start);
      preSubBytes.forEach((byte, index) => {
        items.push({
          iId: `${startIndex} ${index}`,
          gId: gid,
          hexString: byteToHex(byte),
          asciiChar: byteToAscii(byte),
          name: section.name,
          color: '',
        });
      });

      section.sublist.forEach((sub) => {
        const subBytes = bin.slice(sub.start, sub.end);
        subBytes.forEach((byte, index) => {
          items.push({
            iId: `${startIndex} ${index}`,
            gId: gid,
            hexString: byteToHex(byte),
            asciiChar: byteToAscii(byte),
            name: sub.name,
            color: '',
          });
        });
        startIndex += sub.end;
      });
    } else {
      const sectionBytes = bin.slice(section.start, section.end);
      sectionBytes.forEach((byte, index) => {
        items.push({
          iId: `${startIndex} ${index}`,
          gId: gid,
          hexString: byteToHex(byte),
          asciiChar: byteToAscii(byte),
          name: section.name,
          color: '',
        });
      });
    }

    gid += 1;
  });

  const endOfData = offsets[offsets.length - 1].end;
  bin.slice(endOfData).forEach((byte, index) => {
    items.push({
      iId: `${endOfData} ${index}`,
      gId: -1,
      hexString: byteToHex(byte),
      asciiChar: byteToAscii(byte),
      name: 'unlabeled',
      color: '',
    });
  });

  return items;
}

export function computeItemStyles(items, hoveredIndex) {
  if (hoveredIndex === null || hoveredIndex === undefined) {
    return items.map(() => 'item_disabled');
  }

  const hoveredGid = items[hoveredIndex].gId;

  if (hoveredGid === -1) {
    return items.map((item, i) => (i === hoveredIndex ? 'item_active' : 'item_disabled'));
  }

  return items.map((item, i) => {
    if (item.gId !== hoveredGid) return 'item_disabled';
    if (i === hoveredIndex) return 'item_active';
    return 'item_part_of_group';
  });
}

export function splitIntoRows(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 16) {
    const row = items.slice(i, i + 16);
    while (row.length < 16) {
      row.push({
        iId: -1,
        gId: -1,
        hexString: '.',
        asciiChar: '.',
        name: '',
        color: '',
        isPadding: true,
      });
    }
    rows.push(row);
  }
  return rows;
}

// --- Optimized API for large data ---

const UNLABELED_SENTINEL = { gId: -1, name: 'unlabeled', color: '' };

export function buildSectionIndex(offsets, binLength) {
  const sections = [];
  let gid = 0;

  offsets.forEach((section) => {
    if (section.sublist && section.sublist.length > 0) {
      if (section.start < section.sublist[0].start) {
        sections.push({
          start: section.start,
          end: section.sublist[0].start,
          gId: gid,
          name: section.name,
          color: section.color || '',
        });
      }
      section.sublist.forEach((sub) => {
        sections.push({
          start: sub.start,
          end: sub.end,
          gId: gid,
          name: sub.name,
          color: sub.color || '',
        });
      });
    } else {
      sections.push({
        start: section.start,
        end: section.end,
        gId: gid,
        name: section.name,
        color: section.color || '',
      });
    }
    gid += 1;
  });

  const lastEnd = offsets.length > 0 ? offsets[offsets.length - 1].end : 0;
  if (lastEnd < binLength) {
    sections.push({
      start: lastEnd,
      end: binLength,
      gId: -1,
      name: 'unlabeled',
      color: '',
    });
  }

  return sections;
}

export function lookupSection(sectionIndex, byteIndex) {
  let lo = 0;
  let hi = sectionIndex.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const sec = sectionIndex[mid];
    if (byteIndex < sec.start) {
      hi = mid - 1;
    } else if (byteIndex >= sec.end) {
      lo = mid + 1;
    } else {
      return sec;
    }
  }

  return UNLABELED_SENTINEL;
}

export function getStyleForByte(sectionIndex, hoveredIndex, hoveredGId, byteIndex) {
  if (hoveredIndex === null || hoveredIndex === undefined) {
    return 'item_disabled';
  }
  if (byteIndex === hoveredIndex) return 'item_active';
  if (hoveredGId === -1) return 'item_disabled';

  const byteSection = lookupSection(sectionIndex, byteIndex);
  return byteSection.gId === hoveredGId ? 'item_part_of_group' : 'item_disabled';
}

export function getRowCount(binLength) {
  return Math.ceil(binLength / 16) || 0;
}

export function getRowItems(bin, sectionIndex, rowIndex) {
  const startByte = rowIndex * 16;
  const items = [];

  for (let i = 0; i < 16; i += 1) {
    const byteIndex = startByte + i;
    if (byteIndex < bin.length) {
      const byte = bin[byteIndex];
      const section = lookupSection(sectionIndex, byteIndex);
      items.push({
        hexString: byteToHex(byte),
        asciiChar: byteToAscii(byte),
        name: section.name,
        color: section.color,
        gId: section.gId,
      });
    } else {
      items.push({
        hexString: '.',
        asciiChar: '.',
        name: '',
        color: '',
        gId: -1,
        isPadding: true,
      });
    }
  }

  return items;
}
