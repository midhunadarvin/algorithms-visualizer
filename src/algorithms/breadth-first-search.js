import { getUnvisitedNeighbors } from '../utils/grid.utils';
export function breadthFirstSearch(grid, startNode, endNode) {
    startNode.distance = 0;
    startNode.isVisited = true;
    const queue = [startNode];
    const visitedNodesInOrder = [startNode];

    let found = false;
    while (queue.length) {
        const node = queue.shift();
        const neighbors = getUnvisitedNeighbors(node, grid);
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].isWall)
                continue;
            const { row, col } = neighbors[i];
            grid[row][col].isVisited = true;
            grid[row][col].previousNode = node;
            visitedNodesInOrder.push(grid[row][col]);
            if (neighbors[i] === endNode) {
                found = true;
                break;
            }
            queue.push(grid[row][col]);
        }
        if (found) {
            break;
        }
    }
    return visitedNodesInOrder;
}
