export type BeadCellId = `${number}:${number}`;

export function createBeadCellId(row: number, col: number): BeadCellId {
  return `${row}:${col}`;
}
