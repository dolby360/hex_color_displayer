import { RAINBOW } from './colorPalettes';

export function generateRepeatingPattern(size) {
  return Array.from({ length: size }, (_, i) => i % 256);
}

export function generateManySections(count, sectionSize, colors) {
  const palette = colors || RAINBOW;
  const bin = generateRepeatingPattern(count * sectionSize);
  const offsets = Array.from({ length: count }, (_, i) => ({
    start: i * sectionSize,
    end: (i + 1) * sectionSize,
    name: `Field ${String(i + 1).padStart(3, '0')}`,
    color: palette[i % palette.length],
    sublist: [],
  }));
  return { offsets, bin };
}

export function generateBlocksWithSublists(blockCount, blockSize, subsPerBlock, colors) {
  const palette = colors || RAINBOW;
  const totalSize = blockCount * blockSize;
  const bin = generateRepeatingPattern(totalSize);
  const subSize = Math.floor(blockSize / subsPerBlock);

  const offsets = Array.from({ length: blockCount }, (_, b) => {
    const blockStart = b * blockSize;
    return {
      start: blockStart,
      end: blockStart + blockSize,
      name: `Block ${String(b + 1).padStart(2, '0')}`,
      color: palette[b % palette.length],
      sublist: Array.from({ length: subsPerBlock }, (__, s) => ({
        start: blockStart + s * subSize,
        end: blockStart + (s + 1) * subSize,
        name: `Block ${b + 1} / Sub ${s + 1}`,
        color: palette[(b * subsPerBlock + s) % palette.length],
      })),
    };
  });

  return { offsets, bin };
}
