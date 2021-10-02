/**
 * MinHeap Implementation
 *
 * A minheap is complete binary tree which has the minimum value always as it's root.
 * It will always return the minimum value in the data structure in O(1) time complexity.
 * The insertion into the minheap will take O(logN) time complexity.
 *
 * At any index i in the array, to get the left and right nodes
 * leftNodeIndex = (2 * i) + 1
 * rightNodeIndex = (2 * i) + 2
 *
 * At any index i in the array, to get it's parent node
 * parentIndex = floor( i / 2 )
 */
export class MinHeap {
  private items: Array<number>;
  constructor() {
    this.items = [-1];
  }

  swap(i: number, j: number) {
    const temp = this.items[j];
    this.items[j] = this.items[i];
    this.items[i] = temp;
  }

  /* Insert operation */
  push(item: number) {
    let currentIndex = this.items.length;
    // Add the new item at the end of the array
    this.items.push(item);

    // Get the parent node index --> floor(currentIndex / 2)
    let parentIndex = Math.floor(currentIndex / 2);
    if (parentIndex < 1) parentIndex = 1;

    const pushedVal = this.items[currentIndex];
    while (currentIndex > 1 && this.items[parentIndex] > pushedVal) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
    }
  }

  pop() {
    let currentIndex = 1;
    let maxValue = this.items[currentIndex];
    if (this.items.length > 1) {
      const lastItem: number = this.items.pop() as number;
      this.items[currentIndex] = lastItem;

      let left = 2 * currentIndex;
      let right = 2 * currentIndex + 1;

      while (
        (this.items[left] && this.items[left] < this.items[currentIndex]) ||
        (this.items[right] && this.items[right] < this.items[currentIndex])
      ) {
        if (this.items[left] && this.items[right]) {
          if (
            this.items[left] < this.items[currentIndex] &&
            this.items[left] < this.items[right]
          ) {
            this.swap(left, currentIndex);
            currentIndex = left;
          } else if (
            this.items[right] < this.items[currentIndex] &&
            this.items[right] < this.items[left]
          ) {
            this.swap(right, currentIndex);
            currentIndex = right;
          }
        } else if (
          this.items[right] &&
          this.items[right] < this.items[currentIndex]
        ) {
          this.swap(right, currentIndex);
          currentIndex = right;
        } else if (
          this.items[left] &&
          this.items[left] < this.items[currentIndex]
        ) {
          this.swap(left, currentIndex);
          currentIndex = left;
        }
        left = 2 * currentIndex;
        right = 2 * currentIndex + 1;
      }

      return maxValue;
    }
  }

  peek() {
    return this.items[1];
  }
}
