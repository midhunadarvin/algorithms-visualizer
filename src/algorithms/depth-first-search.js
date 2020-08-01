import { getUnvisitedNeighbors } from '../utils/grid.utils';
export function depthFirstSearch(grid, startNode, endNode) {
    startNode.distance = 0;
    startNode.isVisited = true;
    const stack = [startNode];
    const visitedNodesInOrder = [startNode];

    let found = false;
    while (stack.length) {
        const node = stack[stack.length - 1];
        let neighbors = getUnvisitedNeighbors(node, grid);
        neighbors = neighbors.filter(n => !n.isWall);
        if (neighbors.length) {
            const { row, col } = neighbors[0];
            grid[row][col].isVisited = true;
            grid[row][col].previousNode = node;
            visitedNodesInOrder.push(grid[row][col]);
            if (neighbors[0] === endNode) {
                found = true;
                break;
            }
            stack.push(grid[row][col]);
        } else {
            stack.pop();
        }
        if (found) {
            break;
        }
    }
    return visitedNodesInOrder;
}
