// Given a string s, return the longest palindromic substring in s.

// A palindromic substring is a contiguous sequence of characters within the string that reads the same forward and backward.
// Example 1

// Input: s = "babad"
// Output: "bab"

// Explanation:
// Both "bab" and "aba" are valid palindromic substrings of length 3. Return either.

// Example 2
// Input: s = "cbbd"
// Output: "bb"
// Explanation:

// The longest palindrome is "bb" of length 2.

const isPalindrome = (str: string) => {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

// const longestPalindrome = (str: string) => {
//   let ans = "";
//   let n = str.length;
//   for (let i = 0; i < n; i++) {
//     let word = str[i];
//     for (let j = i + 1; j < n; j++) {
//         word += str[j]
//         if ( word.length > ans.length &&  isPalindrome(word)) {
//           ans = word

//       }
//     }
//   }
//   return ans
// };

const longestPalindrome = (str: string) => {
  let ans = "";
  let n = str.length;
  const expand = (left: number, right: number) => {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      if (right - left + 1 > ans.length) {
        ans = str.slice(left, right + 1);
      }

      left--;
      right++;
    }
  };
  for(let i = 0 ; i < n ; i++){
    expand(i , i )
    expand(i , i + 1)
  }
  return ans;
};

console.log(longestPalindrome("cbbd"));
