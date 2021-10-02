export interface Node {
  row: number;
  col: number;
  distance: number;
  isVisited?: boolean;
  previousNode?: Node;
  gScore?: number;
  hScore?: number;
  fScore?: number;
}
