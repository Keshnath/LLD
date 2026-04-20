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

/*
A valid parentheses string is defined by the following rules:
It is the empty string "".
If A is a valid parentheses string, then so is "(" + A + ")".
If A and B are valid parentheses strings, then A + B is also valid.
A primitive valid parentheses string is a non-empty valid string that cannot be split into two or more non-empty valid parentheses strings.
Given a valid parentheses string s, consider its primitive decomposition: s = P1 + P2 + ... + Pk, where Pi are primitive valid parentheses strings.
Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.
Example 1
Input: s = "((()))"
Output: "(())"
Explanation:
The input string is a single primitive: "((()))".
Removing the outermost layer yields: "(())".
Example 2
Input: s = "()(()())(())"
Output: "()()()"
Explanation:
Primitive decomposition: "()" + "(()())" + "(())"
After removing outermost parentheses: "" + "()()" + "()"
Final result: "()()()".
*/

// let removeOuterParentheses = (s: string): string => {
//     let ans = ""
//     let count = 0
//     let isFound = false
//     let ind = 0
//     for(let i = 0 ; i < s.length ; i++){
//       if(s[i] === "("){
//         if(!isFound){
//           isFound = true
//           ind = i
//         }
//         count++
//       }else{
//         count--
//       }
//       if(count === 0 ){
//         ans += s.substring(ind+1 , i)
//         isFound = false
//       }
//     }
//     return ans
// }

// console.log(removeOuterParentheses("((()))"))

/*
Given an input string, containing upper-case and lower-case letters, digits, and spaces( ' ' ). A word is defined as a sequence of non-space characters. The words in s are separated by at least one space.
Return a string with the words in reverse order, concatenated by a single space.
Example 1
Input: s = "welcome to the jungle"
Output: "jungle the to welcome"
Explanation: The words in the input string are "welcome", "to", "the", and "jungle". Reversing the order of these words gives "jungle", "the", "to", and "welcome". The output string should have exactly one space between each word.
Example 2
Input: s = " amazing coding skills "
Output: "skills coding amazing"
Explanation: The input string has leading and trailing spaces, as well as multiple spaces between the words "amazing", "coding", and "skills". After trimming the leading and trailing spaces and reducing the multiple spaces between words to a single space, the words are "amazing", "coding", and "skills". Reversing the order of these words gives "skills", "coding", and "amazing". The output string should not have any leading or trailing spaces and should have exactly one space between each word.
*/

// let reverseString = (s: string): string => {
//   let ans = "";
//   let i = s.length - 1;
//   while(i >= 0){
//     while(i >= 0 && s[i] === " "){
//       i--
//     }
//     if(i < 0) break
//     let j = i
//     while(i >= 0 && s[i] != " "){
//       i--
//     }
//     ans += s.substring(i , j+1)
//   }

//   return ans;
// };

// console.log(reverseString(" welcome to the jungle "))

/*
Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".
Example 1
Input : str = ["flowers" , "flow" , "fly", "flight" ]
Output : "fl"
Explanation :
All strings given in array contains common prefix "fl".
Example 2
Input : str = ["dog" , "cat" , "animal", "monkey" ]
Output : ""
Explanation :
There is no common prefix among the given strings in array.
*/

// let longestCommonPre = (arr: string[]): string => {
//   let ans = "";
//   let ch = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//       let inch = arr[i];
//       let j = 0;
//       let c = ""
//       while( (j < ch.length && j < inch.length) &&  ch[j] === inch[j]){
//         c+=ch[j]
//         j++
//       }
//       ans = c
//   }
//   return ans;
// };

// console.log(longestCommonPre(["dog" , "dat" , "animal", "monkey" ]));

/*
Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
Example 1
Input : s = "egg" , t = "add"
Output : true
Explanation :
The 'e' in string s can be replaced with 'a' of string t.
The 'g' in string s can be replaced with 'd' of t.
Hence all characters in s can be replaced to get t.
Example 2
Input : s = "apple" , t = "bbnbm"
Output : false
Explanation :
Strings are matched index by index.
At index 0, 'a' maps to 'b'.
At index 1, 'p' also maps to 'b'.
This is invalid because two different characters (a and p) cannot map to the same character (b) in a one-to-one mapping.
Therefore, no valid mapping exists and the output is false.
*/

// let isomorphic = (s:string , t : string)=>{
//   if(s.length < t.length || s.length > t.length) return false
//   let mapS = new Map()
//   let mapT = new Map()
//   for(let i = 0 ; i< t.length ; i++ ){
//     if(mapT.has(t[i]) && mapT.get(t[i]) !== s[i]){
//       return false
//     }
//     if(mapS.has(s[i]) && mapS.get(s[i])!==t[i]) return false

//     mapS.set(s[i] , t[i])
//     mapT.set(t[i] , s[i])
//   }
//   return true
// }

// console.log(isomorphic("aa" ,"ab" ))

/*
Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
A shift on s consists of moving the leftmost character of s to the rightmost position.
For example, if s = "abcde", then it will be "bcdea" after one shift.
Example 1
Input : s = "abcde" , goal = "cdeab"
Output : true
Explanation :
After performing 2 shifts we can achieve the goal string from string s.
After first shift the string s is => bcdea
After second shift the string s is => cdeab.
Example 2
Input : s = "abcde" , goal = "adeac"
Output : false
Explanation :
Any number of shift operations cannot convert string s to string goal.
*/

// let canForm = (s : string , goal : string):boolean=>{
//   if(s.length !== goal.length) return false
//   let temp = s + s
//   return temp.includes(goal)
// }
// console.log(canForm("abcde" , "adeac" ))

/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
Example 1
Input : s = "anagram" , t = "nagaram"
Output : true
Explanation :
We can rearrange the characters of string s to get string t as frequency of all characters from both strings is same.
Example 2
Input : s = "dog" , t = "cat"
Output : false
Explanation :
We cannot rearrange the characters of string s to get string t as frequency of all characters from both strings is not same.
*/

// let anagram = (s : string , t : string)=>{

//   if(s.length !== t.length) return false
//   let freq = new Array(256).fill(0)

//   for(let i = 0 ; i < s.length ; i++){
//     let ch1 = s[i].charCodeAt(0)
//     let ch2 = t[i].charCodeAt(0)
//     freq[ch1] += 1
//     freq[ch2] -= 1
//   }
//   for(let i of freq){
//     if(i !== 0){
//       return false
//     }
//   }
//   return true
// }
// console.log(anagram("aa" , "dd"))

/*
You are given a string s. Return the array of unique characters, sorted by highest to lowest occurring characters.
If two or more characters have same frequency then arrange them in alphabetic order.
Example 1
Input : s = "tree"
Output : ['e', 'r', 't' ]
Explanation :
The occurrences of each character are as shown below :
e --> 2
r --> 1
t --> 1.
The r and t have same occurrences , so we arrange them by alphabetic order.
Example 2
Input : s = "raaaajj"
Output : ['a' , 'j', 'r' ]
Explanation :
The occurrences of each character are as shown below :
a --> 4
j --> 2
r --> 1
*/

// let sortChar = (s: string) => {
//   let map = new Map();
//   for (let ch of s) {
//     map.set(ch, (map.get(ch) || 0) + 1);
//   }

//   let arr = Array.from(map.entries())
//   arr.sort((a , b)=>{
//     if (b[1] !== a[1]) {
//       return b[1] - a[1]; // higher freq first
//     }
//     return a[0].localeCompare(b[0]); // alphabetical
//   })

// };

// console.log(sortChar("tree"));

/*
A string s is a valid parentheses string (VPS) if it meets the following conditions:
It only contains digits 0-9, arithmetic operators +, -, *, /, and parentheses (, ).
The parentheses are balanced and correctly nested.
Your task is to compute the maximum nesting depth of parentheses in s. The nesting depth is the highest number of parentheses that are open at the same time at any point in the string.
Example 1
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: The deepest nested sub-expression is ((8)/4), which has 3 layers of parentheses.
Example 2
Input: s = "(1)+((2))+(((3)))"
Output: 3
Explanation: The digit '3' is enclosed in 3 pairs of parentheses.
*/

// let validParanethesis = (s : string)=>{
//   let depth = 0
//   let maxDepth = 0
//   for(let b of s){
//     if(b === "("){
//       depth++
//       maxDepth = Math.max(depth , maxDepth)
//     }else if(b === ")"){
//       depth--
//     }else{
//       continue
//     }
//   }
//   return maxDepth
// }

// console.log(validParanethesis("(1)+((2))+(((3)))"))

/*
Roman numerals are represented by seven different symbols:
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000
Roman numerals are typically written from largest to smallest, left to right. However, in specific cases, a smaller numeral placed before a larger one indicates subtraction.
The following subtractive combinations are valid:
I before V (5) and X (10) → 4 and 9
X before L (50) and C (100) → 40 and 90
C before D (500) and M (1000) → 400 and 900
Given a Roman numeral, convert it to an integer.
Example 1
Input: s = "III"
Output: 3
Explanation: III = 1 + 1 + 1 = 3
Example 2
Input: s = "XLII"
Output: 42
Explanation: XL = 40, II = 2 → 40 + 2 = 42
*/

// let romanToInt = (s: string) => {
//   let map: Record<string, number> = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
//   };
//   let sum = 0;
//   for (let i = 0 ; i < s.length ; i++) {
//     let curr = map[s[i]]
//     let next = map[s[i+1]]
//     if (next && curr < next) {
//       sum -= curr
//     } else {
//       sum += curr;
//     }
//   }
//   return sum;
// };

// console.log(romanToInt("MCM"));

/*
First, ignore any leading whitespace characters ' ' until the first non-whitespace character is found.
Check the next character to determine the sign. If it’s a '-', the number should be negative. If it’s a '+', the number should be positive. If neither is found, assume the number is positive.
Read the digits and convert them into a number. Stop reading once a non-digit character is encountered or the end of the string is reached. Leading zeros should be ignored during conversion.
The result should be clamped within the 32-bit signed integer range: [-2147483648, 2147483647]. If the computed number is outside this range, return -2147483648 if the number is less than -2147483648, or return 2147483647 if the number is greater than 2147483647.
Finally, return the computed number after applying all the above steps.
Example 1
Input: s = " -12345"
Output: -12345
Explanation:
Ignore leading whitespaces.
The sign '-' is encountered, indicating the number is negative.
Digits 12345 are read and converted to -12345.
Example 2
Input: s = "4193 with words"
Output: 4193
Explanation:
Read the digits 4193 and stop when encountering the first non-digit character (w).
*/

// let atoi = (s: string): number => {
//   let i = 0;
//   let sign = 1;
//   let n = s.length;
//   let ans = 0;
//   while (i < n && s[i] === " ") {
//     i++;
//   }
//   if (i < n && (s[i] === "+" || s[i] === "-")) {
//     if (s[i] === "-") sign = -1;
//     i++;
//   }
//   while(i < n && s[i] >= "0" && s[i] <= "9"){
//     let num = +s[i]
//     ans = ans * 10 + num
//     i++
//   }
//   return sign * ans;
// };

// console.log(atoi(" -012345  a"));

/*
Given a string s, return the longest palindromic substring in s.
A palindromic substring is a contiguous sequence of characters within the string that reads the same forward and backward.
Example 1
Input: s = "babad"
Output: "bab"
Explanation:
Both "bab" and "aba" are valid palindromic substrings of length 3. Return either.
Example 2
Input: s = "cbbd"
Output: "bb"
Explanation:
The longest palindrome is "bb" of length 2.
*/

// let isPalindrome = (s: string) => {
//   let l = 0, r = s.length - 1;
//   while (l < r) {
//     if (s[l] !== s[r]) return false;
//     l++;
//     r--;
//   }
//   return true;
// };

// let longestPalendrome = (s: string) => {
//   let ans = "";

//   for (let i = 0; i < s.length; i++) {
//     for (let j = i; j < s.length; j++) {
//       let ss = s.slice(i, j + 1);

//       if (isPalindrome(ss) && ss.length > ans.length) {
//         ans = ss;
//       }
//     }
//   }
//   return ans;
// };

// console.log(longestPalendrome("cbbd"))

// let expans = (l: number, r: number, s: string) => {
//   while (l >= 0 && r < s.length && s[l] === s[r]) {
//     l--;
//     r++;
//   }
//   return s.slice(l + 1, r);
// };

// let palindrome = (s: string) => {
//   let ans = "";
//   for (let i = 0; i < s.length; i++) {
//     let even = expans(i, i + 1, s);
//     let odd = expans(i, i, s);

//     if (odd.length > ans.length) ans = odd;
//     if (even.length > ans.length) ans = even;
//   }
//   return ans
// };

// console.log(palindrome("cbbssdsd"))

/*
The beauty of a string is defined as the difference between the frequency of the most frequent character and the least frequent character (excluding characters that do not appear) in that string.
Given a string s, return the sum of beauty values of all possible substrings of s.
Example 1
Input: s = "xyx"
Output: 1
Explanation: The substrings with non-zero beauty are:
- "xyx" → frequencies: x:2, y:1 → beauty = 2 - 1 = 1
- "xy" → x:1, y:1 → beauty = 0
- "yx" → y:1, x:1 → beauty = 0
- "x" or "y" → beauty = 0
Total sum = 1 (from "xyx") = 1
Example 2
Input: s = "aabcbaa"
Output: 17
Explanation: Various substrings such as "aabc", "bcba", etc., have non-zero beauty values. Summing all gives 17.
*/

// let beauty = (s: string) => {
//   let map = new Map<string, number>();
//   for (let ch of s) {
//     map.set(ch, (map.get(ch) || 0) + 1);
//   }
//   let sum = 0
//   map.forEach((v)=>{
//     sum += v
//   })
//   return sum
// };

// let substring = (s: string) => {
//   let ans = 0
//   for(let i = 0 ; i < s.length ; i++){
//     for (let j = i ; j < s.length ; j++){
//       let ss = s.slice(i , j+1)
//       console.log("🚀 ~ substring ~ ss:", ss)
//       ans += beauty(ss)
//     }
//   }
//   return ans
// };

// console.log(substring("xyx"))

/*
Given a string, S. Find the length of the longest substring without repeating characters.
Example 1
Input : S = "abcddabac"
Output : 4
Explanation : The answer is "abcd" , with a length of 4.
Example 2
Input : S = "aaabbbccc"
Output : 2
Explanation : The answers are "ab" , "bc". Both have maximum length 2.
*/

// let nonRepeatingSubstring = (s: string) => {
//   let map = new Map<string, number>();
//   let i = 0;
//   let j = 0;
//   let n = s.length;
//   let ans = 0;
//   while (j < n || i < n) {
//     if (map.has(s[j])) {
//       i = Math.max(i ,map.get(s[j])! + 1);
//     }
//     ans = Math.max(ans, j - i + 1 );
//     map.set(s[j], j);
//     j++;
//   }
//   return ans;
// };

// console.log(nonRepeatingSubstring("aaabbbccc"));

/*
Given a binary array nums and an integer k, flip at most k 0's.
Return the maximum number of consecutive 1's after performing the flipping operation.
Example 1
Input : nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0] , k = 3
Output : 10
Explanation : The maximum number of consecutive 1's are obtained only if we flip the 0's present at position 3, 4, 5 (0 base indexing).
The array after flipping becomes [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0].
The number of consecutive 1's is 10.
Example 2
Input : nums = [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1] , k = 3
Output : 9
Explanation : The underlines 1's are obtained by flipping 0's in the new array.
[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1].
The number of consecutive 1's is 9.
[0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]
*/

// let maxConsecutiveOnes = (arr: number[], k: number) => {
//   let i = 0;
//   let n = arr.length;
//   let ans = 0;
//   let zeros = 0 
//   for (let j = 0; j < n; j++) {
//     if(arr[j] === 0){
//       zeros++
//     }
//     while(zeros > k){
//       if(arr[i] === 0){
//       zeros--
//       }

//       i++
//     }
//     ans = Math.max(ans , j - i +1 )

//   }
//   return ans;
// };

// console.log(
//   maxConsecutiveOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 3),
// );


