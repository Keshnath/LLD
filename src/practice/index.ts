/*
Given an array of integers nums of unique elements. Return all possible subsets (power set) of the array.



Do not include the duplicates in the answer.


Example 1

Input : nums = [1, 2, 3]

Output : [ [ ] , [1] , [2] , [1, 2] , [3] , [1, 3] , [2, 3] , [1, 2 ,3] ]

Example 2

Input : nums = [1, 2]

Output : [ [ ] , [1] , [2] , [1,2] ]
 */

let ans: number[][] = []

let fn = (arr: number[], i: number, ds: number[])=>{

    if( i === arr.length){
        ans.push([...ds])
        return 
    }

    ds.push(arr[i])
    fn(arr , i + 1 , ds)
    ds.pop()
    fn(arr , i + 1 , ds)

}

fn([1,2,3] , 0 , [])
console.log(ans)

