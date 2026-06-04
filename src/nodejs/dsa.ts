// var letterCombinations = function(digits: string): string[] {
//     if (digits.length === 0) return [];

//     let map = new Map<string, string>([
//         ["2", "abc"],
//         ["3", "def"],
//         ["4", "ghi"],
//         ["5", "jkl"],
//         ["6", "mno"],
//         ["7", "pqrs"],
//         ["8", "tuv"],
//         ["9", "wxyz"]
//     ]);

//     let ans: string[] = [];

//     const fn = (index: number, path: string) => {
//         // base case
//         if (index === digits.length) {
//             ans.push(path);
//             return;
//         }

//         let letters = map.get(digits[index])!;

//         for (let ch of letters) {
//             fn(index + 1, path + ch);
//         }
//     };

//     fn(0, "");
//     return ans;
// };

// console.log(letterCombinations("2"));

// class Person {
//   protected name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class Employee extends Person {
//   getName() {
//     return this.name; // accessible because protected
//   }
// }

// const emp = new Employee("John");
// console.log(emp.getName());


/*
ABC

  abc
  acb 
  bac
  bca
  cab
  cba
  a -> a
  ab -> ab , ba 


*/

// let comb: string[] = [];

// let combination = (s: string[], ind: number) => {
//   if (ind === s.length) {
//     comb.push(s.join(""));
//     return;
//   }

//   for (let i = ind; i < s.length; i++) {
//     // choose
//     [s[i], s[ind]] = [s[ind], s[i]];

//     // explore
//     combination(s, ind + 1);

//     // backtrack (VERY IMPORTANT)
//     [s[i], s[ind]] = [s[ind], s[i]];
//   }
// };

// combination(["a", "b", "c"], 0);
// console.log(comb);

class A {
  protected value = 10;
}

class B extends A {
  value = 20;
}

const obwj = new B();
console.log(obwj.value);