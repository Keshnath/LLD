/*
Given a string s partition string s such that every substring of partition is palindrome. Return all possible palindrome partition of string s.

Example 1

Input : s = "aabaa"

Output : [ [ "a", "a", "b", "a", "a"] , [ "a", "a", "b", "aa"] , [ "a", "aba", "a"] , [ "aa", "b", "a", "a"] , [ "aa", "b", "aa" ] , [ "aabaa" ] ]

Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.

Example 2

Input : s = "baa"

Output : [ [ "b", "a", "a"] , [ "b", "aa" ] ]

Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.

*/

// let isPalindrome = (str: string, start: number, end: number) => {
//     while (start < end) {
//         if (str[start] !== str[end]) return false
//         start++
//         end--
//     }
//     return true
// }

// let ans00: string[][] = []

// let palindromeStr = (str: string, ind: number, n: number, ds: string[]) => {

//     if (ind === n) {
//         ans00.push([...ds])
//         return
//     }

//     for (let j = ind; j < n; j++) {
//         if (isPalindrome(str, ind, j)) {
//             let temp = str.slice(ind, j + 1)
//             ds.push(temp)
//             palindromeStr(str, j + 1, n, ds)
//             ds.pop()
//         }
//     }
// }

// palindromeStr("aabaaa", 0, "aabaaa".length, [])
// console.log(ans00)

/*
Given a grid of n x m dimension grid of characters board and a string word.The word can be created by assembling the letters of successively surrounding cells, whether they are next to each other vertically or horizontally. It is forbidden to use the same letter cell more than once.

Return true if the word exists in the grid otherwise false.


Example 1

Input : board = [ ["A", "B", "C", "E"] , ["S" ,"F" ,"C" ,"S"] , ["A", "D", "E", "E"] ] , word = "ABCCED"

Output : true

Explanation : The word is coloured in yellow.
*/

// let isWord = (
//   word: string,
//   grid: string[],
//   ind: number,
//   i: number,
//   j: number,
// ): boolean => {
//   if (ind === word.length) {
//     return true;
//   }

//   if (
//     i < 0 ||
//     j < 0 ||
//     i >= grid.length ||
//     j >= grid[0].length ||
//     word[ind] !== grid[i][j]
//   ) {
//     return false;
//   }

//   let temp = grid[i][j];
//   grid[i] = grid[i].substring(0, j) + "#" + grid[i].substring(j + 1);

//   let found = (
//     isWord(word, grid, ind + 1, i + 1, j) ||
//     isWord(word, grid, ind + 1, i, j + 1) ||
//     isWord(word, grid, ind + 1, i - 1, j) ||
//     isWord(word, grid, ind + 1, i, j - 1)
//   );
//     grid[i] = grid[i].substring(0, j) + temp + grid[i].substring(j + 1);
//   return found;
// };

// let help = (word: string, grid: string[]) => {
//   let row = grid.length;
//   let col = grid[0].length;
//   for (let i = 0; i < row; i++) {
//     for (let j = 0; j < col; j++) {
//       if (isWord(word, grid, 0, i, j)) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

// console.log(help("z", [
//   "ABCE",
//   "SFCS",
//   "ADEE",
// ]))

/*
Given a grid of dimensions n x n. A rat is placed at coordinates (0, 0) and wants to reach at coordinates (n-1, n-1).



Find all possible paths that rat can take to travel from (0, 0) to (n-1, n-1). The directions in which rat can move are 'U' (up) , 'D' (down) , 'L' (left) , 'R' (right).



The value 0 in grid denotes that the cell is blocked and rat cannot use that cell for travelling, whereas value 1 represents that rat can travel through the cell. If the cell (0, 0) has 0 value, then mouse cannot move to any other cell.



Note :

In a path no cell can be visited more than once.
If there is no possible path then return empty vector.

Example 1

Input : n = 4 , grid = [ [1, 0, 0, 0] , [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1] ]

Output : [ "DDRDRR" , "DRDDRR" ]

Explanation : The rat has two different path to reach (3, 3).

The first path is (0, 0) => (1, 0) => (2, 0) => (2, 1) => (3, 1) => (3, 2) => (3, 3).

The second path is (0,0) => (1,0) => (1,1) => (2,1) => (3,1) => (3,2) => (3,3).

*/

/*

let directions: string[][] = [];
let ratInMaze = (
  grid: number[][],
  i: number,
  j: number,
  n: number,
  ds: any,
) => {
  if (i === n - 1 && j === n - 1) {
    directions.push([...ds]);
    return;
  }
  if (i < 0 || j < 0 || i >= n || j >= n || grid[i][j] === 0) {
    return;
  }
  grid[i][j] = 0;
  ds.push("D");
  ratInMaze(grid, i + 1, j, n, ds);
  ds.pop();
  ds.push("U");
  ratInMaze(grid, i - 1, j, n, ds);
  ds.pop();
  ds.push("R");
  ratInMaze(grid, i, j + 1, n, ds);
  ds.pop();
  ds.push("L");
  ratInMaze(grid, i, j - 1, n, ds);
  ds.pop();
  grid[i][j] = 1;
};
let grid: number[][] = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
];
ratInMaze(grid, 0, 0, 4, []);
console.log(directions);

*/

/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words otherwise return false.
Note : The same word in dictionary can be used multiple times in segmentation.

Example 1
Input : 

Output : true
Explanation : Return true because "takeuforward" can be segmented as "take" , "u" , "forward".

Example 2
Input : s = "applepineapple" , wordDict = ["apple"]

Output : false
Explanation : Return false because "applepineapple" can be segmented as "apple" , "pine" , "apple" but here we do not have "pine" word in dictionary.

*/

// let isSegment = (
//   word: string,
//   dictionary: string[],
//   ind: number,
// ): boolean => {
//   if (ind === word.length) return true;
//   for(let i = 0 ; i < word.length ; i++){
//     let sub = word.slice(ind , i + 1)
//     if(dictionary.includes(sub)){
//       if(isSegment(word , dictionary , i+1)) return true
//     }
//   }
//   return false

// };

// let s = "applepineapple";
// let wordDict = ["apple" ,"pine"];

// console.log(isSegment(s, wordDict, 0));


/*
Create a program that fills in the blank cells in a Sudoku puzzle to solve it.
Every sudoku solution needs to follow to these guidelines:

1) In every row, the numbers 1 through 9 must appear exactly once.
2) In every column, the numbers 1 through 9 must appear exactly once.
3) In each of the grid's nine 3x3 sub-boxes, the numbers 1 through 9 must appear exactly once.
Empty cells are indicated by the '.' character.


Input : board = [ ["5", "3", ".", ".", "7", ".", ".", ".", "."] , ["6", ".", ".", "1", "9", "5", ".", ".", "."] , [".", "9", "8", ".", ".", ".", ".", "6", "."] , ["8", ".", ".", ".", "6", ".", ".", ".", "3"] , ["4", ".", ".", "8", ".", "3", ".", ".", "1"] , ["7", ".", ".", ".", "2", ".", ".", ".", "6"] , [".", "6", ".", ".", ".", ".", "2", "8", "."] , [".", ".", ".", "4", "1", "9", ".", ".", "5"] , [".", ".", ".", ".", "8", ".", ".", "7", "9"] ]
 [ [ ".", ".", ".", ".", ".", ".", "7", ".", ".", ], [ "7", ".", "5", ".", ".", ".", "9", ".", ".", ], [ ".", ".", ".", "9", "7", "5", "4", "3", "1", ], [ "9", ".", ".", ".", "4", "1", ".", ".", "7", ], [ ".", "5", ".", "8", ".", "7", "6", "4", ".", ], [ ".", "7", ".", ".", "2", ".", ".", ".", ".", ], [ ".", "4", ".", ".", ".", ".", ".", "6", "9", ], [ "1", "6", ".", "4", "3", ".", ".", ".", ".", ], [ ".", ".", ".", ".", "6", "2", "3", ".", "4", ] ]
*/






