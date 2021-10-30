export const pickGradient = (
  start: Uint8ClampedArray,
  end: Uint8ClampedArray,
  slice: number,
  pos: number
): Uint8ClampedArray => {
  return start.map((startV, i) => startV + ((end[i] - startV) / slice) * pos);
};
export const getRankColor = (rank: number): Uint8ClampedArray => {
  return pickGradient(
    new Uint8ClampedArray([255, 189, 82]),
    new Uint8ClampedArray([37, 107, 148]),
    18,
    rank
  );
};
