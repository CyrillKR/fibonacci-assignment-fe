export default function recursiveFibonacci(n, memo = {}) {
  if (memo[n]) {
    return memo[n];
  }
  if (n < 3) return 1;
  memo[n] = recursiveFibonacci(n - 1, memo) + recursiveFibonacci(n - 2, memo);

  return memo[n];
}

export function forLoopFibonacci(n) {
  let prev = 0;
  let next = 1;
  let current = prev + next;

  for (let i = 0; i < n; i++) {
    current = prev + next;
    prev = next;
    next = current;
  }

  return current;
}
