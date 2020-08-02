import { getUnvisitedNeighbors } from '../utils/grid.utils';
export function AstarSearch(grid, startNode, endNode) {
    // f(n) = g(n) + h(n)
    startNode.gScore = 0;
    startNode.hScore = 0;
    startNode.fScore = 0;

    const openSet = [startNode];
    const visitedNodesInOrder = [startNode];

    while (openSet.length) {
        let lowestIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[lowestIndex].fScore > openSet[i].fScore) {
                lowestIndex = i;
            }
        }
        const current = openSet[lowestIndex];
        if (current === endNode) {
            visitedNodesInOrder.push(current);
            break;
        }

        openSet.splice(lowestIndex, 1);
        visitedNodesInOrder.push(current);
        current.isVisited = true;

        let neighbors = getUnvisitedNeighbors(current, grid);
        neighbors = neighbors.filter((n) => !n.isWall);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            const tempGScore = current.gScore + 1;
            if (openSet.includes(neighbor)) {
                if (tempGScore < neighbor.gScore) {
                    neighbor.gScore = tempGScore;
                }
            } else {
                neighbor.gScore = tempGScore;
                openSet.push(neighbor);
            }

            neighbor.hScore = heuristic(neighbor, endNode);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;
            neighbor.previousNode = current;
        }
    }

    return visitedNodesInOrder;
}


function heuristic(nodeA, nodeB) {
    // find the manhattan distance
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}
