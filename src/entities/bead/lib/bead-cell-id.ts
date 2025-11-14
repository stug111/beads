export type BeadCellId = `${number}:${number}`;

export function createBeadCellId(row: number, col: number): BeadCellId {
  return `${row}:${col}`;
}

export function parseBeadCellId(cellId: BeadCellId): [number, number] {
  const [row, col] = cellId.split(":").map(Number);
  return [row, col];
}
