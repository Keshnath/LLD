import {parentPort} from 'worker_threads'
function fib(n:number):number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
parentPort?.on('message' , (val)=>{
    const ans =  fib(val)
    parentPort?.postMessage(ans)
})