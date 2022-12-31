export default function median(times: number[]): number {
  const sorted = times.sort();
  const middle = times.length / 2;
  const halfIndex = Math.floor(middle);

  if (halfIndex === 0 || halfIndex % 2 !== 0) {
    return sorted[halfIndex];
  }

  return (sorted[halfIndex - 1] + sorted[halfIndex]) / 2.0;
}
