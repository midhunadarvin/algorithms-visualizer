export function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}