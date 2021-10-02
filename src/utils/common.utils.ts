export function swap(arr: Array<any>, i: number, j: number) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
