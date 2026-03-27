/*
Given an array nums of n integers. Return array of sum of all subsets of the array nums.
Output can be returned in any order.

Example 1

Input : nums = [2, 3]

Output : [0, 2, 3, 5]

Explanation :

When no elements is taken then Sum = 0.

When only 2 is taken then Sum = 2.

When only 3 is taken then Sum = 3.

When element 2 and 3 are taken then sum = 2+3 = 5.

Example 2

Input : nums = [5, 2, 1]

Output : [0, 1, 2, 3, 5, 6, 7, 8]

Explanation :

When no elements is taken then Sum = 0.

When only 5 is taken then Sum = 5.

When only 2 is taken then Sum = 2.

When only 1 is taken then Sum = 1.

When element 2 and 1 are taken then sum = 2+1 = 3.

Now your turn!

*/

let sumArr: number[] = [];

let subset = (start: number, arr: number[], s: number): void => {
  if (start === arr.length) {
    sumArr.push(s);
    return;
  }
  subset(start + 1, arr, s + arr[start]);
  subset(start + 1, arr, s);
};

subset(0, [5, 2, 1], 0);
console.log(sumArr, "<<<");
