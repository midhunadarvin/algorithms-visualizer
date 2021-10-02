import { Node } from "@/algorithms/interface/node";

export function getAllNodes(grid: Array<Array<Node>>): Array<Node> {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getUnvisitedNeighbors(
  node: Node,
  grid: Array<Array<Node>>
): Array<Node> {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: Node) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode!;
  }
  return nodesInShortestPathOrder;
}
