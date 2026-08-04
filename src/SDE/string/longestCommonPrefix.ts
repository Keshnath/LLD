// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".

// Example 1
// Input : str = ["flowers" , "flow" , "fly", "flight" ]
// Output : "fl"
// Explanation :
// All strings given in array contains common prefix "fl".
// Example 2

// Input : str = ["dog" , "cat" , "animal", "monkey" ]
// Output : ""

// Explanation :
// There is no common prefix among the given strings in array.


const LCP = (arr : string[])=>{
    let firstChar =arr[0]
    let ans = ""
    let n = arr.length
    for(let i = 1 ; i < n ; i++ ){
        let currentCh = arr[i]
        let common = ""
        let j = 0 
        while(j < firstChar.length && j < currentCh.length && firstChar[j] === currentCh[j] ){
            common += firstChar[j]
            j++
        }
        if(common === ""){
            break
        }
        ans = common
    }
    return ans
}

console.log(LCP(["flowers" , "flow" , "fly", "flight" ]))

