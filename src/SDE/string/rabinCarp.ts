// Given a string text and a string pattern, implement the Rabin-Karp algorithm to find the starting index of all occurrences of pattern in text. If pattern is not found, return an empty list.

// Example 1

// Input: text = "aba bca bca bab c", pattern = "abc"

// Output: [2, 5, 10]

// Expalanation : The pattern "abc" is found at indices 2, 5, and 10 in the text.

// Example 2

// Input: text = "hello", pattern = "ll"

// Output: [2]

// Explanation: The pattern "ll" is found at index 2 in the text.

// const rabinCarp1 = (text: string, pattern: string) => {
//   let i = 0;
//   let j = pattern.length;
//   let ans = [];
//   while (j <= text.length) {
//     let subString = text.substring(i, j);
//     if (subString === pattern) {
//       ans.push(i);
//     }
//     i++;
//     j++;
//   }
//   return ans
// };

const rabinCarp2 = (text: string, pattern: string) => {
  let common = "";
  let ans: number[] = [];


  for (let i = 0; i < text.length; i++) {
    if(common.length === pattern.length){
        if(common === pattern){
            ans.push(i - common.length)
        }
        
    }
  }
  return ans;
};

console.log(rabinCarp2("hello", "ll"));
