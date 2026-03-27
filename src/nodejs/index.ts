// function fib(n:number):number {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }

// console.log("Start");

// setTimeout(() => {
//   console.log("Timer done ⏱️");
// }, 0);

// // heavy task
// const result = fib(40);
// console.log("Fib result:", result);

// console.log("End");

import {Worker} from 'worker_threads'

const worker = new Worker('./worker.ts' ,{
  execArgv: ['-r', 'ts-node/register'],
})
console.log("Start");

setTimeout(() => {
  console.log("Timer done ⏱️");
}, 0);
worker.postMessage(40)
worker.on('message' , (ans)=>{
    console.log(ans , "<<<<<")
})

console.log("End");