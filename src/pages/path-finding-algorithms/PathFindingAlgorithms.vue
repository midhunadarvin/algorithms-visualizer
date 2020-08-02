<template>
  <div class="flex flex-column flex-auto">
    <div class="flex-auto">
      <md-card>
        <md-card-content class="pb0">
          <PathFindingOptionsBar
            v-bind:mode="mode"
            v-bind:running="running"
            v-on:algorithm-change="setAlgorithm"
            v-on:mode-change="setMode"
            v-on:reset-button-click="reset"
            v-on:action-button-click="start"
            v-on:clear-walls-button-click="clearWalls"
          />
        </md-card-content>
      </md-card>
      <div
        class="grid-container"
        v-on:mousedown.prevent="setMouseDown"
        v-on:mouseup.prevent="setMouseUp"
      >
        <div class="grid-row" v-for="(row, i) of nodes" v-bind:key="i">
          <div
            class="grid-item"
            v-for="(node, j) of row"
            v-bind:class="{
              path: node.isPath,
              wall: node.isWall,
              visited: node.type === 'visited' 
            }"
            v-bind:key="j"
            v-on:click.prevent="nodeClick(i, j)"
            v-on:mousedown.prevent="dragStart(i, j)"
            v-on:mouseenter.prevent="drag(i, j)"
            v-on:mouseup.prevent="dragEnd(i, j)"
          >
            <md-icon v-if="node.isStart">flag</md-icon>
            <md-icon v-if="node.isEnd">home</md-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PathFindingOptionsBar from "../../components/PathFindingOptionsBar";
import { dijkstra } from "../../algorithms/dijikstra";
import { breadthFirstSearch } from "../../algorithms/breadth-first-search";
import { depthFirstSearch } from "../../algorithms/depth-first-search";
import { AstarSearch } from "../../algorithms/a-star-search";
import { delay } from "../../utils/common.utils";
import { getNodesInShortestPathOrder } from "../../utils/grid.utils";

const previousPoint = {
  start: { x: 8, y: 7 },
  end: { x: 30, y: 7 },
};

async function animateAlgorithm(visitedNodes, shortestPath, nodes) {
  for (let i = 0; i < visitedNodes.length; i++) {
    visitedNodes[i].type = "visited";
    await delay(30);
  }
  if (shortestPath[shortestPath.length - 1].isEnd) {
    for (let i = 0; i < shortestPath.length; i++) {
      nodes[shortestPath[i].row][shortestPath[i].col].isPath = true;
      nodes[shortestPath[i].row].splice(shortestPath[i].col, 1, {
        ...nodes[shortestPath[i].row][shortestPath[i].col],
      });
      await delay(30);
    }
  }
}

export default {
  name: "DijkstraAlgorithm",
  components: {
    PathFindingOptionsBar,
  },
  data() {
    return {
      previousPoint: previousPoint,
      running: false,
      mouseDown: false,
      mode: "wall",
      algorithm: "dijkstra",
      nodes: this.createNodes(),
    };
  },
  methods: {
    async start() {
      this.running = true;
      const startNode = this.nodes[this.previousPoint["start"].y][
        this.previousPoint["start"].x
      ];
      const endNode = this.nodes[this.previousPoint["end"].y][
        this.previousPoint["end"].x
      ];
      startNode.distance = 0;
      let visitedNodesInOrder;
      switch (this.algorithm) {
        case "dijkstra":
          visitedNodesInOrder = dijkstra(this.nodes, startNode, endNode);
          break;
        case "breadth-first":
          visitedNodesInOrder = breadthFirstSearch(
            this.nodes,
            startNode,
            endNode
          );
          break;
        case "depth-first":
          visitedNodesInOrder = depthFirstSearch(
            this.nodes,
            startNode,
            endNode
          );
          break;
        case "a-star-search":
          visitedNodesInOrder = AstarSearch(this.nodes, startNode, endNode);
          break;
      }
      const shortestPath = getNodesInShortestPathOrder(
        visitedNodesInOrder[visitedNodesInOrder.length - 1]
      );
      await animateAlgorithm(visitedNodesInOrder, shortestPath, this.nodes);
      this.running = false;
    },
    reset() {
      this.running = false;
      this.clearPaths();
    },
    setMode(mode) {
      this.mode = mode;
    },
    setAlgorithm(algorithm) {
      this.algorithm = algorithm;
    },
    createNodes() {
      return Array.from({ length: 15 }, (item, i) => {
        item = Array.from({ length: 40 }, (item, j) => {
          let type = "normal";
          return {
            type,
            isStart:
              i === previousPoint["start"].y && j === previousPoint["start"].x,
            isEnd: i === previousPoint["end"].y && j === previousPoint["end"].x,
            distance: Infinity,
            col: j,
            row: i,
          };
        });
        return item;
      });
    },
    clearPaths() {
      this.nodes = Array.from({ length: 15 }, (item, i) => {
        item = Array.from({ length: 40 }, (item, j) => {
          let type = "normal";
          let isWall = false;
          if (this.nodes[i][j].isWall) {
            type = "wall"
            isWall = true;
          }
          return {
            type,
            isStart:
              i === this.previousPoint["start"].y &&
              j === this.previousPoint["start"].x,
            isEnd:
              i === this.previousPoint["end"].y &&
              j === this.previousPoint["end"].x,
            distance: Infinity,
            col: j,
            row: i,
            isWall
          };
        });
        return item;
      });
      this.nodes = [...this.nodes];
    },
    clearWalls() {
      this.clearPaths();
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < this.nodes[i].length; j++) {
          if (this.nodes[i][j].isWall) {
            this.nodes[i][j].isWall = false;
            this.nodes[i][j].type = "normal";
          }
        }
      }
      this.nodes = [...this.nodes];
    },
    setMouseDown() {
      this.mouseDown = true;
    },
    setMouseUp() {
      this.mouseDown = false;
    },
    updateNode(i, j, type) {
      const node = this.nodes[i][j];
      if (type === "start" && node.type === "normal") {
        const previousStartNode = this.nodes[this.previousPoint["start"].y][
          this.previousPoint["start"].x
        ];
        previousStartNode.isStart = false;
        this.nodes[this.previousPoint["start"].y].splice(
          this.previousPoint["start"].x,
          1,
          previousStartNode
        );
        node.isStart = true;
        this.previousPoint["start"] = { x: j, y: i };
      } else if (type === "end") {
        const previousEndNode = this.nodes[this.previousPoint["end"].y][
          this.previousPoint["end"].x
        ];
        previousEndNode.isEnd = false;
        this.nodes[this.previousPoint["end"].y].splice(
          this.previousPoint["end"].x,
          1,
          previousEndNode
        );
        node.isEnd = true;
        this.previousPoint["end"] = { x: j, y: i };
      } else if (
        type === "wall" &&
        node.type === "normal" &&
        !node.isStart &&
        !node.isEnd
      ) {
        node.isWall = true;
      } else if (type === "normal" && node.isWall) {
        node.isWall = false;
      }
      this.nodes[i].splice(j, 1, node);
    },
    nodeClick(i, j) {
      if (this.mode === "wall" && !this.running) {
        this.updateNode(i, j, this.mode);
      }
    },
    dragStart(i, j) {
      if (this.mode === "wall" && !this.running) {
        this.dragging = true;
        this.updateNode(i, j, this.mode);
      }
    },
    drag(i, j) {
      if (this.mouseDown && !this.running) {
        if (this.dragging && this.nodes[i][j].status !== this.mode) {
          this.updateNode(i, j, this.mode);
        }
      } else {
        this.dragging = false;
      }
    },
    dragEnd(i, j) {
      if (this.mode === "wall" && !this.running) {
        if (this.dragging) {
          this.dragging = false;
        }
      }
      if (
        this.mode === "normal" &&
        this.nodes[i][j].type !== "normal" &&
        !this.running
      ) {
        this.updateNode(i, j, this.mode);
      } else if (this.nodes[i][j].type === "normal" && !this.running) {
        this.updateNode(i, j, this.mode);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  padding: 10px;
}
.grid-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, 2.5%);
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
  -ms-user-select: none;
  user-select: none;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 10px;
  text-align: center;
  min-height: 38px;
  transition: all 0.3s ease;
}
.grid-item.wall {
  background-color: #4d4d4d;
  animation: pulse 0.3s linear 1;
}
.grid-item.visited {
  background-color: #72a8ff;
  animation: visiting 0.5s linear 1;
}

.grid-item.visited.path {
  background-color: #ed5aed;
}

@keyframes pulse {
  25% {
    transform: scale(0.2);
  }
  75% {
    transform: scale(0.8);
  }
}

@keyframes visiting {
  25% {
    background-color: rgb(115, 250, 185);
  }
  75% {
    background-color: #72a8ff;
  }
}
</style>