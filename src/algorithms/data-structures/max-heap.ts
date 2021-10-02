export class MaxHeap {
  private items: Array<number>;
  constructor() {
    this.items = [-1];
  }

  swap(i: number, j: number) {
    const temp = this.items[j];
    this.items[j] = this.items[i];
    this.items[i] = temp;
  }

  push(item: number) {
    let i = this.items.length;
    this.items.push(item);
    let parentIndex = Math.floor(i / 2);
    if (parentIndex < 1) parentIndex = 1;
    const pushedVal = this.items[i];
    while (i > 1 && this.items[parentIndex] < pushedVal) {
      this.swap(parentIndex, i);
      i = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
    }
    console.log(this.items);
  }

  pop() {
    let currentIndex = 1;
    let maxValue = this.items[currentIndex];
    const lastItem = this.items.pop();
    if (lastItem) {
      this.items[currentIndex] = lastItem;
    }

    let left = 2 * currentIndex;
    let right = 2 * currentIndex + 1;
    while (
      (this.items[left] && this.items[left] > this.items[currentIndex]) ||
      (this.items[right] && this.items[right] > this.items[currentIndex])
    ) {
      if (this.items[left] && this.items[right]) {
        if (
          this.items[left] > this.items[currentIndex] &&
          this.items[left] > this.items[right]
        ) {
          this.swap(left, currentIndex);
          currentIndex = left;
        } else if (
          this.items[right] > this.items[currentIndex] &&
          this.items[right] > this.items[left]
        ) {
          this.swap(right, currentIndex);
          currentIndex = right;
        }
      } else if (
        this.items[right] &&
        this.items[right] > this.items[currentIndex]
      ) {
        this.swap(right, currentIndex);
        currentIndex = right;
      } else if (
        this.items[left] &&
        this.items[left] > this.items[currentIndex]
      ) {
        this.swap(left, currentIndex);
        currentIndex = left;
      }
      left = 2 * currentIndex;
      right = 2 * currentIndex + 1;
    }
    return maxValue;
  }

  peek() {
    return this.items[1];
  }
}
