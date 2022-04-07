
```javascript
/**
 * 反转数字
 *
 * @param n 要反转的数字
 * @return 反转后的数字
 */
async function reverse(n) {
  return Number(
    n
      .toString()
      .split('')
      .reverse()
      .join('')
  );
}
export default class Test {
  // [1423,143,23,231,237,34,345,41]
  async test() {
    const num = 9;
    const array = [1423, 143, 1431, 23, 231, 237, 34, 345, 41];
    let tmp = 0;
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num - 1; j++) {
        if (array[j] > array[j + 1]) {
          tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
      }
    }
    return array;
  }
  /**
   * 输入一个数字n，求第一个大于该数字的回文数字
   * 例如: 输入:808 输出: 818
   * 例如: 输入:2133 输出: 2222
   */
  async test1(n) {
    /**
     * 1: 如果是小于9的个位数,直接+1输出
     * 2: 如果大于1位数,分为是偶数位还是奇数位
     * 2.1: 偶数位,平均拆分为两个数,把前面数反转, 比较 后面数是否大于反转的数,
     * 2.1.1: 小于,把后面的改为前面数反转
     * 2.1.2: 大于或等于:前面数+1,再反转+1的数.拼接
     * 2.2: 奇数位, 以中间数为中心,拆分两个数,比较前面数反转 是否大于后面数
     * 2.2.1: 大于,直接把反转后的数放到后面
     * 2.2.2: 小于或等于,也用用反转后的数,中间数+1
     */
    if (n < 9) return n + 1;
    if (n === 9) return 11;

    // 大于一位数
    const numLength = n.toString().length;
    // 当是偶数的时候
    if (numLength % 2 === 0) {
      // 如果长度是偶数,后几位是否大于前几位
      const start = n.toString().substr(0, numLength / 2);
      const end = n.toString().substr(numLength / 2, numLength / 2);
      // 把前面的数字反转
      let newStart = await reverse(start);
      // 如果反转后的数大于后几位数,直接应用反转的数,如果小于,钱几位数+1,反转前几位,拼接+1和反转后的数
      if (newStart > end) {
        return `${start}${newStart}`;
      } else {
        const start1 = Number(start) + 1;
        newStart = await reverse(start1);
        return `${start1}${newStart}`;
      }
    }
    if (numLength % 2 === 1) {
      // 截取长度
      const subLength = (numLength - 1) / 2;
      const start = Number(n.toString().substr(0, subLength));
      const end = Number(n.toString().substr(subLength + 1, subLength));
      let center = Number(n.toString().substr(subLength, 1));
      // 把前面的数反转
      const startReverse = await reverse(start);
      // 如果反转的数大于后面的数,直接把反转后的数放到后面
      if (startReverse > end) {
        return `${start}${center}${startReverse}`;
      } else {
        center += 1;
        return `${start}${center}${startReverse}`;
      }
    }
  }

  /**
   * 输入两个人的苹果个数的和与差，确定他们的苹果个数。
   * 输入：苹果的数量和，苹果的数量差
   * 输出：两人各自苹果的个数
   * @param sum
   * @param diff
   */
  async test2(sum, diff) {
    /**
     * x + y = 11;
     * x - y = 3;
     * x + y + x - y = 11+3(14)
     * 2x = 14
     * x = 7
     * y = 11 - 7 = 4
     */
    const x = (sum + diff) / 2;
    const y = sum - x;
    return {x, y};
  }

  /**
   * 设有n个正整数a1，a2，a3，a4……an，将它们拼接成一个字符串，要求这个字符串对应的数字最大。
   * 输入格式
   *  第一行让用户输入要拼接数字的个数n
   *  第二行让用户输入n个要拼接的数字
   * 输出格式
   *  输出能拼接出来的最大数字
   */
  async test3() {
    /**
     * 1: 找出最小长度的数
     * 1.1: 用最小长度数的长度和其他位数做比较,把比他大并且是相等的放到一个数组中,
     * 1.2: 如果有相同的比对第二个数,以此类推
     */
    // const num = 5;
    //
    // const num1 = 61;
    // const num2 = 4133;
    // const num3 = 451;
    // const num4 = 41;
    // const num5 = 45;
    // const array = [num1, num2, num3, num4, num5];
    let tmp = 0;
    // for (let i = 0; i < num; i++) {
    //   for (let j = 0; j < num - 1; j++) {
    //     if (array[j] > array[j + 1]) {
    //       tmp = array[j];
    //       array[j] = array[j + 1];
    //       array[j + 1] = tmp;
    //     }
    //   }
    // }
    // return array;
    const num = 9;
    const array = [1423, 143, 1431, 23, 231, 237, 34, 345, 41];
    /**
     * 1: 先把数字拆分成数组
     * 2: 按照首位数字排序,相同的放到一起并按照大小排序
     */
    /**
     * 1: 两个数做比较
     */
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num - 1; j++) {
        if (
          Number(`${array[j]}${array[j + 1]}`) <
          Number(`${array[j + 1]}${array[j]}`)
        ) {
          tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
      }
    }
    return array;
  }
}


```

```javascript
export default class Test {
  test() {
    const num = 6;
    const nums = [21, 213, 42, 212, 421, 60];
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num - 1; j++) {
        /**
         * 1: 比较的两个数都转成数组
         * 2: 两种情况, 两个数长度相等, 两个数长度不相等
         * 2.1: 长度相等: 从第一个数字依次比较,当第二个数字大于第一个数字
         */
        // 当前数
        const current = nums[j].toString().split('');
        // 下一个数
        const next = nums[j + 1].toString().split('');
        const arrayLength =
          current.length > next.length ? current.length : next.length;
        let tmp;
        for (let x = 0; x < arrayLength; x++) {
          const y = x + 1;
          // 当都有数的时候比较
          if (current.length >= y && next.length >= y) {
            console.log({
              x,
              current,
              next,
              c: current[x],
              n: next[x]
            });
            if (Number(current[x]) < Number(next[x])) {
              tmp = nums[j];
              nums[j] = nums[j + 1];
              nums[j + 1] = tmp;
              break;
            }
          }
        }
      }
    }
    return nums;
    return new Date();
  }
}

```