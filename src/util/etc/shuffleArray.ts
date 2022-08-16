export default function shuffleArray<T extends any[]>(arr: T): T {
  const shuffled: T = [] as unknown as T;
  arr = [...arr] as T;
  while (arr.length > 0) {
    const pickIdx = Math.floor(Math.random() * arr.length);
    shuffled.push(arr[pickIdx]);
    arr.splice(pickIdx, 1);
  }
  return shuffled;
}
