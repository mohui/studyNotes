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
## 
> PHP面试题狼与兔子，假设一座圆形的山, 山脚分布着N个山洞, 山洞与山洞形成一个圆环，
> 选择其中一个山洞作为起始, 兔子每天前进到l个洞, 狼每天前进到第k个洞 求多少天后, 兔子与狼在一个洞里
```
function gcd($a, $b) {
    while ($b != 0) {
        $temp = $b;
        $b = $a % $b;
        $a = $temp;
    }
    return $a;
}

function lcm($a, $b) {
    return ($a * $b) / gcd($a, $b);
}

function daysUntilMeet($l, $k, $N) {
    $diff = abs($l - $k);
    $lcm = lcm($N, $diff);
    return $lcm / $diff;
}

$l = 3;  // 兔子每天前进的洞数
$k = 4;  // 狼每天前进的洞数
$N = 10; // 山洞的总数

$days = daysUntilMeet($l, $k, $N);
echo "兔子和狼将在 $days 天后在一个洞里相遇。";
```
- 第二種
```
function daysUntilMeet($l, $k, $N) {
    $rabbit = 0;
    $wolf = 0;
    $days = 0;

    while (true) {
        if ($rabbit == $wolf && $days > 0) {
            return $days;
        }
        $rabbit = ($rabbit + $l) % $N;
        $wolf = ($wolf + $k) % $N;
        $days++;
    }
}

$l = 3;  // 兔子每天前进的洞数
$k = 4;  // 狼每天前进的洞数
$N = 10; // 山洞的总数

$days = daysUntilMeet($l, $k, $N);
echo "兔子和狼将在 $days 天后在一个洞里相遇。";
```

- 第三种(对了)
```
function daysUntilMeet($l, $k, $N){
 
    $rabbit = 0;
    $wolf = 0;
    $days = 0;
 
    while(true){
        $day++;
		echo "第".$day."天"."</br>";
 		//这里用的取余的方式将兔子和狼的步数重置，也可以用注释中的
	
		//$rabbit = ($rabbit + $l)%$N;
        //$wolf = ($wolf + $k) % $N;
		//echo "--------".$rabbit."----".$wolf."--------------"."</br>";
 
        $rabbit = $rabbit + $l;
        $wolf = $wolf + $k;
        if($rabbit / $N > 1) $rabbit = $rabbit - $N;
        if($wolf / $N > 1) $wolf = $wolf - $N;
 
        if($rabbit == $wolf) break;
    }
	echo $day;
 
    return $day;
}

$l = 3;  // 兔子每天前进的洞数
$k = 4;  // 狼每天前进的洞数
$N = 10; // 山洞的总数

$days = daysUntilMeet($l, $k, $N);

echo "兔子和狼将在 $days 天后在一个洞里相遇。";
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