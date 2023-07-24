## 百元买百鸡
```js
  for (let x = 0; x <= 20; x++) {
    for (let y = 0; y <= 33; y++) {
      let z = 100 - x - y;
      if (5 * x + 3 * y + z / 3 === 100) {
        console.log(`公鸡数量：${x}，母鸡数量：${y}，小鸡数量：${z}`);
      }
    }
  }
```

## 冒泡排序
```js
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // 标记是否有交换，如果某一轮没有交换，说明数组已经有序，可以提前结束排序
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换两个元素的位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // 如果这一轮没有交换，说明数组已经有序，可以提前结束排序
        if (!swapped) {
            break;
        }
    }

    return arr;
}
// 示例用法：
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log(sortedArray); // [11, 12, 22, 25, 34, 64, 90]
```