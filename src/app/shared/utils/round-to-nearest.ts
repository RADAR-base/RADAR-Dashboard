export function roundToNearest(value: number, interval: number): number {
  return Math.round(value / interval) * interval
}
