const bs = (n :number, m:number ):number=>{
    let low = 1;
    let high = Math.floor(m/2);
    while(low <= high){
        let mid = Math.floor((low + high)/2)
        let pow = Math.pow(mid , n)
        if(pow === m){
            return mid
        }else if(pow > m){
            high = mid - 1
        }else{
            low = mid + 1
        }

    }
    return -1


    
}

const ans = bs(3, 16)
console.log("🚀 ~ ans:", ans)
